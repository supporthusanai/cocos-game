import { _decorator, Component, EditBox, Button, director } from 'cc';
import { GameManager } from '../managers/GameManager';

const { ccclass, property } = _decorator;

@ccclass('LoginScene')
export class LoginScene extends Component {
  @property(EditBox)
  usernameInput: EditBox = null!;

  @property(EditBox)
  roomIdInput: EditBox = null!;

  @property(Button)
  createRoomBtn: Button = null!;

  @property(Button)
  joinRoomBtn: Button = null!;

  private gameManager: GameManager | null = null;

  start() {
    this.gameManager = GameManager.getInstance();

    if (!this.gameManager) {
      console.error('GameManager not initialized. Please add GameManager component to the scene.');
      return;
    }

    if (this.createRoomBtn) {
      this.createRoomBtn.node.on('click', this.onCreateRoom, this);
    }

    if (this.joinRoomBtn) {
      this.joinRoomBtn.node.on('click', this.onJoinRoom, this);
    }
  }

  private onCreateRoom(): void {
    if (!this.gameManager || !this.usernameInput) return;

    const username = this.usernameInput.string.trim();
    if (!username) {
      console.error('请输入用户名');
      return;
    }

    this.gameManager.createRoom(username);

    setTimeout(() => {
      director.loadScene('GameScene');
    }, 500);
  }

  private onJoinRoom(): void {
    if (!this.gameManager || !this.usernameInput || !this.roomIdInput) return;

    const username = this.usernameInput.string.trim();
    const roomId = this.roomIdInput.string.trim();

    if (!username || !roomId) {
      console.error('请输入用户名和房间ID');
      return;
    }

    this.gameManager.joinRoom(roomId, username);

    setTimeout(() => {
      director.loadScene('GameScene');
    }, 500);
  }
}
