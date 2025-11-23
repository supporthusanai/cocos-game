import { _decorator, Component } from 'cc';
import { NetworkManager } from '../network/NetworkManager';
import { IGameRoom, IPlayer, ICard, IGameAction, GameActionType } from '../types/GameTypes';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  private static instance: GameManager;

  private networkManager: NetworkManager;
  private currentRoom: IGameRoom | null = null;
  private localPlayer: IPlayer | null = null;

  onLoad() {
    if (GameManager.instance) {
      this.node.destroy();
      return;
    }
    GameManager.instance = this;

    this.networkManager = NetworkManager.getInstance();
    this.networkManager.connect();

    this.setupNetworkCallbacks();
  }

  public static getInstance(): GameManager {
    return GameManager.instance;
  }

  private setupNetworkCallbacks(): void {
    this.networkManager.onGameUpdate((room: IGameRoom) => {
      this.currentRoom = room;
      this.updateGameState(room);
    });
  }

  public createRoom(username: string): void {
    this.networkManager.createRoom(username, (room: IGameRoom) => {
      this.currentRoom = room;
      this.localPlayer = room.players[0];
      console.log('Room created:', room.id);
    });
  }

  public joinRoom(roomId: string, username: string): void {
    this.networkManager.joinRoom(roomId, username, (room: IGameRoom) => {
      this.currentRoom = room;
      this.localPlayer = room.players.find(p => p.username === username) || null;
      console.log('Joined room:', room.id);
      this.updateGameState(room);
    });
  }

  public playCard(cardId: string): void {
    if (!this.currentRoom || !this.localPlayer) return;

    const action: IGameAction = {
      type: GameActionType.PLAY_CARD,
      playerId: this.localPlayer.id,
      cardId
    };

    this.networkManager.sendGameAction(this.currentRoom.id, action);
  }

  public attackTarget(attackerCardId: string, targetId: string): void {
    if (!this.currentRoom || !this.localPlayer) return;

    const action: IGameAction = {
      type: GameActionType.ATTACK,
      playerId: this.localPlayer.id,
      cardId: attackerCardId,
      targetId
    };

    this.networkManager.sendGameAction(this.currentRoom.id, action);
  }

  public endTurn(): void {
    if (!this.currentRoom || !this.localPlayer) return;

    const action: IGameAction = {
      type: GameActionType.END_TURN,
      playerId: this.localPlayer.id
    };

    this.networkManager.sendGameAction(this.currentRoom.id, action);
  }

  private updateGameState(room: IGameRoom): void {
    console.log('Game state updated:', room);
  }

  public getCurrentRoom(): IGameRoom | null {
    return this.currentRoom;
  }

  public getLocalPlayer(): IPlayer | null {
    return this.localPlayer;
  }

  onDestroy() {
    if (this.networkManager) {
      this.networkManager.disconnect();
    }
  }
}
