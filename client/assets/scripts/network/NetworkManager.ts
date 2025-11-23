import { IGameRoom, IGameAction } from '../types/GameTypes';

// 声明全局 io 对象（通过 CDN 引入）
declare const io: any;

export class NetworkManager {
  private static instance: NetworkManager;
  private socket: any = null;
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

    // 检查 io 是否已加载
    if (typeof io === 'undefined') {
      console.error('Socket.IO client library not loaded. Please include it in index.html');
      return;
    }

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
