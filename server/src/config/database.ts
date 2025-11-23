import mongoose from 'mongoose';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/card-game';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.warn('Warning: Running without MongoDB. Some features may not work.');
    // Don't exit in development mode
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    reconnectStrategy: false  // 禁用自动重连
  }
});

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
    console.log('Redis connected successfully');
  } catch (error) {
    console.error('Redis connection error:', error);
    console.warn('Warning: Running without Redis. Using in-memory storage.');
    // Don't exit in development mode
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

redisClient.on('error', (err) => console.error('Redis Client Error', err));
