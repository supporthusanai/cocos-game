export interface ICard {
  id: string;
  name: string;
  type: CardType;
  attack: number;
  defense: number;
  cost: number;
  rarity: CardRarity;
  imageUrl?: string;
  description: string;
}

export enum CardType {
  CREATURE = 'creature',
  SPELL = 'spell',
  EQUIPMENT = 'equipment'
}

export enum CardRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary'
}

export interface IPlayer {
  id: string;
  username: string;
  health: number;
  mana: number;
  maxMana: number;
  deck: ICard[];
  hand: ICard[];
  field: ICard[];
  graveyard: ICard[];
}

export interface IGameRoom {
  id: string;
  players: IPlayer[];
  currentTurn: number;
  status: GameStatus;
  createdAt: Date;
}

export enum GameStatus {
  WAITING = 'waiting',
  PLAYING = 'playing',
  FINISHED = 'finished'
}

export interface IGameAction {
  type: GameActionType;
  playerId: string;
  cardId?: string;
  targetId?: string;
}

export enum GameActionType {
  DRAW_CARD = 'draw_card',
  PLAY_CARD = 'play_card',
  ATTACK = 'attack',
  END_TURN = 'end_turn'
}
