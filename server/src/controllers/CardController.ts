import { Request, Response } from 'express';
import CardService from '../services/CardService';

class CardController {
  async getAllCards(req: Request, res: Response): Promise<void> {
    try {
      const cards = await CardService.getAllCards();
      res.json({ cards });
    } catch (error) {
      res.status(500).json({ error: '获取卡牌失败' });
    }
  }

  async getCardById(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const card = await CardService.getCardById(cardId);

      if (!card) {
        res.status(404).json({ error: '卡牌不存在' });
        return;
      }

      res.json({ card });
    } catch (error) {
      res.status(500).json({ error: '获取卡牌失败' });
    }
  }
}

export default new CardController();
