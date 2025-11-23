import { Server, Socket } from 'socket.io';
import GameService from '../services/GameService';
import { IGameAction } from '../types';

export const setupGameSocket = (io: Server): void => {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    socket.on('createRoom', async (data: { username: string }) => {
      try {
        const room = await GameService.createRoom(socket.id, data.username);
        socket.join(room.id);
        socket.emit('roomCreated', room);
      } catch (error) {
        socket.emit('error', { message: '创建房间失败' });
      }
    });

    socket.on('joinRoom', async (data: { roomId: string; username: string }) => {
      try {
        const room = await GameService.joinRoom(data.roomId, socket.id, data.username);
        if (!room) {
          socket.emit('error', { message: '房间不存在或已满' });
          return;
        }

        socket.join(room.id);
        io.to(room.id).emit('gameStart', room);
      } catch (error) {
        socket.emit('error', { message: '加入房间失败' });
      }
    });

    socket.on('gameAction', async (data: { roomId: string; action: IGameAction }) => {
      try {
        const room = await GameService.performAction(data.roomId, data.action);
        if (room) {
          io.to(data.roomId).emit('gameUpdate', room);
        }
      } catch (error) {
        socket.emit('error', { message: '游戏操作失败' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
