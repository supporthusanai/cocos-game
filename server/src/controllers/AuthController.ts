import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        res.status(400).json({ error: '用户名或邮箱已存在' });
        return;
      }

      const user = new User({ username, email, password });
      await user.save();

      const token = this.generateToken(user._id.toString());

      res.status(201).json({
        message: '注册成功',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          level: user.level,
          coins: user.coins
        }
      });
    } catch (error) {
      res.status(500).json({ error: '注册失败' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ error: '邮箱或密码错误' });
        return;
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(401).json({ error: '邮箱或密码错误' });
        return;
      }

      const token = this.generateToken(user._id.toString());

      res.json({
        message: '登录成功',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          level: user.level,
          coins: user.coins
        }
      });
    } catch (error) {
      res.status(500).json({ error: '登录失败' });
    }
  }

  private generateToken(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
  }
}

export default new AuthController();
