import { v4 as uuidv4 } from 'uuid';
import Card from '../models/Card';
import { ICard, CardType, CardRarity } from '../types';

class CardService {
  async initializeCards(): Promise<void> {
    const count = await Card.countDocuments();
    if (count > 0) {
      console.log('Cards already initialized');
      return;
    }

    const starterCards = [
      {
        cardId: 'card_001',
        name: '火焰法师',
        type: CardType.CREATURE,
        attack: 3,
        defense: 2,
        cost: 3,
        rarity: CardRarity.COMMON,
        description: '一个掌握火焰魔法的法师'
      },
      {
        cardId: 'card_002',
        name: '冰霜骑士',
        type: CardType.CREATURE,
        attack: 4,
        defense: 4,
        cost: 5,
        rarity: CardRarity.RARE,
        description: '身披冰霜铠甲的骑士'
      },
      {
        cardId: 'card_003',
        name: '圣光牧师',
        type: CardType.CREATURE,
        attack: 1,
        defense: 4,
        cost: 3,
        rarity: CardRarity.COMMON,
        description: '能够治疗友军的牧师'
      },
      {
        cardId: 'card_004',
        name: '暗影刺客',
        type: CardType.CREATURE,
        attack: 5,
        defense: 2,
        cost: 4,
        rarity: CardRarity.EPIC,
        description: '隐藏在暗影中的致命刺客'
      },
      {
        cardId: 'card_005',
        name: '龙族守卫',
        type: CardType.CREATURE,
        attack: 6,
        defense: 6,
        cost: 7,
        rarity: CardRarity.LEGENDARY,
        description: '强大的龙族战士'
      },
      {
        cardId: 'card_006',
        name: '火球术',
        type: CardType.SPELL,
        attack: 4,
        defense: 0,
        cost: 2,
        rarity: CardRarity.COMMON,
        description: '造成4点伤害'
      },
      {
        cardId: 'card_007',
        name: '治疗术',
        type: CardType.SPELL,
        attack: 0,
        defense: 0,
        cost: 2,
        rarity: CardRarity.COMMON,
        description: '恢复5点生命值'
      },
      {
        cardId: 'card_008',
        name: '传奇之剑',
        type: CardType.EQUIPMENT,
        attack: 3,
        defense: 1,
        cost: 3,
        rarity: CardRarity.RARE,
        description: '为装备者增加3点攻击力'
      }
    ];

    await Card.insertMany(starterCards);
    console.log('Cards initialized successfully');
  }

  async getAllCards(): Promise<ICard[]> {
    const cards = await Card.find();
    return cards.map(card => this.convertToICard(card));
  }

  async getCardById(cardId: string): Promise<ICard | null> {
    const card = await Card.findOne({ cardId });
    return card ? this.convertToICard(card) : null;
  }

  async getStarterDeck(): Promise<ICard[]> {
    const allCards = await this.getAllCards();
    const deck: ICard[] = [];

    const commonCards = allCards.filter(c => c.rarity === CardRarity.COMMON);
    for (let i = 0; i < 20; i++) {
      const card = commonCards[i % commonCards.length];
      deck.push({ ...card, id: uuidv4() });
    }

    const rareCards = allCards.filter(c => c.rarity === CardRarity.RARE);
    for (let i = 0; i < 8; i++) {
      const card = rareCards[i % rareCards.length];
      deck.push({ ...card, id: uuidv4() });
    }

    const epicCards = allCards.filter(c => c.rarity === CardRarity.EPIC);
    for (let i = 0; i < 2; i++) {
      if (epicCards.length > 0) {
        const card = epicCards[i % epicCards.length];
        deck.push({ ...card, id: uuidv4() });
      }
    }

    return deck;
  }

  private convertToICard(card: any): ICard {
    return {
      id: uuidv4(),
      name: card.name,
      type: card.type,
      attack: card.attack,
      defense: card.defense,
      cost: card.cost,
      rarity: card.rarity,
      imageUrl: card.imageUrl,
      description: card.description
    };
  }
}

export default new CardService();
