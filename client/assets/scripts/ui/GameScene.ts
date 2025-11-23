import { _decorator, Component, Node, Prefab, instantiate, Label } from 'cc';
import { GameManager } from '../managers/GameManager';
import { CardNode } from './CardNode';
import { IPlayer, ICard } from '../types/GameTypes';

const { ccclass, property } = _decorator;

@ccclass('GameScene')
export class GameScene extends Component {
  @property(Node)
  handContainer: Node = null!;

  @property(Node)
  playerFieldContainer: Node = null!;

  @property(Node)
  opponentFieldContainer: Node = null!;

  @property(Prefab)
  cardPrefab: Prefab = null!;

  @property(Label)
  playerHealthLabel: Label = null!;

  @property(Label)
  playerManaLabel: Label = null!;

  @property(Label)
  opponentHealthLabel: Label = null!;

  @property(Label)
  opponentManaLabel: Label = null!;

  @property(Label)
  turnInfoLabel: Label = null!;

  private gameManager: GameManager | null = null;

  start() {
    this.gameManager = GameManager.getInstance();

    if (!this.gameManager) {
      console.error('GameManager not initialized. Please add GameManager component to the scene.');
      return;
    }
  }

  update(deltaTime: number) {
    this.updateUI();
  }

  private updateUI(): void {
    if (!this.gameManager) return;

    const room = this.gameManager.getCurrentRoom();
    const localPlayer = this.gameManager.getLocalPlayer();

    if (!room || !localPlayer) return;

    this.updatePlayerInfo(localPlayer);
    this.updateHand(localPlayer.hand);
    this.updateField(localPlayer.field, this.playerFieldContainer);

    const opponent = room.players.find(p => p.id !== localPlayer.id);
    if (opponent) {
      this.updateOpponentInfo(opponent);
      this.updateField(opponent.field, this.opponentFieldContainer);
    }

    const currentPlayer = room.players[room.currentTurn];
    if (this.turnInfoLabel) {
      this.turnInfoLabel.string = currentPlayer.id === localPlayer.id
        ? '你的回合'
        : '对手的回合';
    }
  }

  private updatePlayerInfo(player: IPlayer): void {
    if (this.playerHealthLabel) {
      this.playerHealthLabel.string = `生命值: ${player.health}`;
    }
    if (this.playerManaLabel) {
      this.playerManaLabel.string = `法力值: ${player.mana}/${player.maxMana}`;
    }
  }

  private updateOpponentInfo(player: IPlayer): void {
    if (this.opponentHealthLabel) {
      this.opponentHealthLabel.string = `生命值: ${player.health}`;
    }
    if (this.opponentManaLabel) {
      this.opponentManaLabel.string = `法力值: ${player.mana}/${player.maxMana}`;
    }
  }

  private updateHand(cards: ICard[]): void {
    if (!this.handContainer || !this.cardPrefab) return;

    this.handContainer.removeAllChildren();

    cards.forEach(card => {
      const cardNode = instantiate(this.cardPrefab);
      const cardComponent = cardNode.getComponent(CardNode);
      if (cardComponent) {
        cardComponent.setCardData(card);
      }
      this.handContainer.addChild(cardNode);
    });
  }

  private updateField(cards: ICard[], container: Node): void {
    if (!container || !this.cardPrefab) return;

    container.removeAllChildren();

    cards.forEach(card => {
      const cardNode = instantiate(this.cardPrefab);
      const cardComponent = cardNode.getComponent(CardNode);
      if (cardComponent) {
        cardComponent.setCardData(card);
      }
      container.addChild(cardNode);
    });
  }

  public onEndTurnClick(): void {
    if (this.gameManager) {
      this.gameManager.endTurn();
    }
  }
}
