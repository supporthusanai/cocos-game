import { v4 as uuidv4 } from 'uuid';
import { redisClient } from '../config/database';
import { IGameRoom, IPlayer, ICard, GameStatus, IGameAction, GameActionType } from '../types';
import CardService from './CardService';

class GameService {
  private gameRooms: Map<string, IGameRoom> = new Map();

  async createRoom(playerId: string, username: string): Promise<IGameRoom> {
    const roomId = uuidv4();
    const deck = await CardService.getStarterDeck();

    const player: IPlayer = {
      id: playerId,
      username,
      health: 30,
      mana: 1,
      maxMana: 1,
      deck: [...deck],
      hand: [],
      field: [],
      graveyard: []
    };

    const room: IGameRoom = {
      id: roomId,
      players: [player],
      currentTurn: 0,
      status: GameStatus.WAITING,
      createdAt: new Date()
    };

    this.gameRooms.set(roomId, room);
    await this.saveRoomToRedis(room);

    return room;
  }

  async joinRoom(roomId: string, playerId: string, username: string): Promise<IGameRoom | null> {
    const room = this.gameRooms.get(roomId) || await this.loadRoomFromRedis(roomId);

    if (!room || room.players.length >= 2) {
      return null;
    }

    const deck = await CardService.getStarterDeck();
    const player: IPlayer = {
      id: playerId,
      username,
      health: 30,
      mana: 1,
      maxMana: 1,
      deck: [...deck],
      hand: [],
      field: [],
      graveyard: []
    };

    room.players.push(player);
    room.status = GameStatus.PLAYING;

    this.initializeGame(room);
    this.gameRooms.set(roomId, room);
    await this.saveRoomToRedis(room);

    return room;
  }

  private initializeGame(room: IGameRoom): void {
    room.players.forEach(player => {
      this.shuffleDeck(player.deck);
      for (let i = 0; i < 5; i++) {
        this.drawCard(player);
      }
    });
  }

  private shuffleDeck(deck: ICard[]): void {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  private drawCard(player: IPlayer): ICard | null {
    if (player.deck.length === 0) return null;
    const card = player.deck.pop()!;
    player.hand.push(card);
    return card;
  }

  async performAction(roomId: string, action: IGameAction): Promise<IGameRoom | null> {
    const room = this.gameRooms.get(roomId) || await this.loadRoomFromRedis(roomId);
    if (!room) return null;

    const player = room.players.find(p => p.id === action.playerId);
    if (!player) return null;

    switch (action.type) {
      case GameActionType.DRAW_CARD:
        this.drawCard(player);
        break;

      case GameActionType.PLAY_CARD:
        if (action.cardId) {
          this.playCard(player, action.cardId);
        }
        break;

      case GameActionType.ATTACK:
        if (action.cardId && action.targetId) {
          this.performAttack(room, player, action.cardId, action.targetId);
        }
        break;

      case GameActionType.END_TURN:
        this.endTurn(room, player);
        break;
    }

    await this.saveRoomToRedis(room);
    return room;
  }

  private playCard(player: IPlayer, cardId: string): boolean {
    const cardIndex = player.hand.findIndex(c => c.id === cardId);
    if (cardIndex === -1) return false;

    const card = player.hand[cardIndex];
    if (card.cost > player.mana) return false;

    player.mana -= card.cost;
    player.hand.splice(cardIndex, 1);
    player.field.push(card);

    return true;
  }

  private performAttack(room: IGameRoom, attacker: IPlayer, attackerCardId: string, targetId: string): void {
    const attackerCard = attacker.field.find(c => c.id === attackerCardId);
    if (!attackerCard) return;

    const opponent = room.players.find(p => p.id !== attacker.id);
    if (!opponent) return;

    const targetCard = opponent.field.find(c => c.id === targetId);

    if (targetCard) {
      targetCard.defense -= attackerCard.attack;
      attackerCard.defense -= targetCard.attack;

      if (targetCard.defense <= 0) {
        const index = opponent.field.indexOf(targetCard);
        opponent.field.splice(index, 1);
        opponent.graveyard.push(targetCard);
      }

      if (attackerCard.defense <= 0) {
        const index = attacker.field.indexOf(attackerCard);
        attacker.field.splice(index, 1);
        attacker.graveyard.push(attackerCard);
      }
    } else {
      opponent.health -= attackerCard.attack;
      if (opponent.health <= 0) {
        room.status = GameStatus.FINISHED;
      }
    }
  }

  private endTurn(room: IGameRoom, player: IPlayer): void {
    room.currentTurn = (room.currentTurn + 1) % room.players.length;
    const nextPlayer = room.players[room.currentTurn];

    nextPlayer.maxMana = Math.min(nextPlayer.maxMana + 1, 10);
    nextPlayer.mana = nextPlayer.maxMana;
    this.drawCard(nextPlayer);
  }

  private async saveRoomToRedis(room: IGameRoom): Promise<void> {
    await redisClient.set(`room:${room.id}`, JSON.stringify(room), {
      EX: 3600
    });
  }

  private async loadRoomFromRedis(roomId: string): Promise<IGameRoom | null> {
    const data = await redisClient.get(`room:${roomId}`);
    return data ? JSON.parse(data) : null;
  }

  getRoom(roomId: string): IGameRoom | undefined {
    return this.gameRooms.get(roomId);
  }
}

export default new GameService();
