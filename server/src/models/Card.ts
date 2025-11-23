import mongoose, { Schema, Document } from 'mongoose';
import { CardType, CardRarity } from '../types';

export interface ICardModel extends Document {
  cardId: string;
  name: string;
  type: CardType;
  attack: number;
  defense: number;
  cost: number;
  rarity: CardRarity;
  imageUrl: string;
  description: string;
}

const CardSchema = new Schema({
  cardId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: Object.values(CardType),
    required: true
  },
  attack: {
    type: Number,
    default: 0
  },
  defense: {
    type: Number,
    default: 0
  },
  cost: {
    type: Number,
    required: true
  },
  rarity: {
    type: String,
    enum: Object.values(CardRarity),
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  }
});

export default mongoose.model<ICardModel>('Card', CardSchema);
