import { io, Socket } from 'socket.io-client';
import { IGameRoom, IGameAction } from '../types/GameTypes';

export class NetworkManager {
  private static instance: NetworkManager;
  private socket: Socket | null = null;
  private serverUrl: string = 'http://localhost:3000';

  private constructor() {}

  public static getInstance(): NetworkManager {
    if (!NetworkManager.instance) {
      NetworkManager.instance = new NetworkManager();
    }
    return NetworkManager.instance;
  }

  public connect(): void {
    if (this.socket?.connected) return;

    this.socket = io(this.serverUrl, {
      transports: ['websocket'],
      reconnection: true
    });

    this.setupListeners();
  }

  private setupListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('error', (error: any) => {
      console.error('Socket error:', error);
    });
  }

  public createRoom(username: string, callback: (room: IGameRoom) => void): void {
    if (!this.socket) return;

    this.socket.emit('createRoom', { username });
    this.socket.once('roomCreated', callback);
  }

  public joinRoom(roomId: string, username: string, callback: (room: IGameRoom) => void): void {
    if (!this.socket) return;

    this.socket.emit('joinRoom', { roomId, username });
    this.socket.once('gameStart', callback);
  }

  public sendGameAction(roomId: string, action: IGameAction): void {
    if (!this.socket) return;

    this.socket.emit('gameAction', { roomId, action });
  }

  public onGameUpdate(callback: (room: IGameRoom) => void): void {
    if (!this.socket) return;

    this.socket.on('gameUpdate', callback);
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
