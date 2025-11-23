import { _decorator, Component, Label, Sprite, Node } from 'cc';
import { ICard } from '../types/GameTypes';

const { ccclass, property } = _decorator;

@ccclass('CardNode')
export class CardNode extends Component {
  @property(Label)
  nameLabel: Label = null!;

  @property(Label)
  attackLabel: Label = null!;

  @property(Label)
  defenseLabel: Label = null!;

  @property(Label)
  costLabel: Label = null!;

  @property(Label)
  descriptionLabel: Label = null!;

  @property(Sprite)
  cardImage: Sprite = null!;

  private cardData: ICard | null = null;

  public setCardData(card: ICard): void {
    this.cardData = card;
    this.updateDisplay();
  }

  private updateDisplay(): void {
    if (!this.cardData) return;

    if (this.nameLabel) {
      this.nameLabel.string = this.cardData.name;
    }

    if (this.attackLabel) {
      this.attackLabel.string = this.cardData.attack.toString();
    }

    if (this.defenseLabel) {
      this.defenseLabel.string = this.cardData.defense.toString();
    }

    if (this.costLabel) {
      this.costLabel.string = this.cardData.cost.toString();
    }

    if (this.descriptionLabel) {
      this.descriptionLabel.string = this.cardData.description;
    }
  }

  public getCardData(): ICard | null {
    return this.cardData;
  }

  public onClick(): void {
    console.log('Card clicked:', this.cardData?.name);
  }
}
