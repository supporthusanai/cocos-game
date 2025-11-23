# 卡牌游戏客户端

基于 Cocos Creator 的卡牌游戏客户端。

## ⚠️ 重要提示

如果遇到 `Module "socket.io-client" not found` 错误，请查看 [SETUP.md](./SETUP.md) 文件获取详细的配置说明。

## 目录结构

```
client/
├── assets/
│   ├── scripts/
│   │   ├── managers/        # 管理器
│   │   │   └── GameManager.ts       # 游戏管理器
│   │   ├── network/         # 网络通信
│   │   │   └── NetworkManager.ts    # 网络管理器
│   │   ├── ui/              # UI 组件
│   │   │   ├── LoginScene.ts        # 登录场景
│   │   │   ├── GameScene.ts         # 游戏场景
│   │   │   └── CardNode.ts          # 卡牌节点组件
│   │   └── types/           # 类型定义
│   │       └── GameTypes.ts         # 游戏类型
│   ├── scenes/              # 场景文件
│   ├── resources/           # 资源文件
│   └── prefabs/             # 预制体
├── package.json
├── tsconfig.json
└── project.json
```

## 技术要求

- Cocos Creator 3.8+
- Node.js 18+

## 安装

```bash
npm install
```

## Socket.IO 配置（重要！）

Cocos Creator 不支持直接使用 npm 的 `socket.io-client` 包。需要通过以下方式之一引入：

### 快速方法：使用 CDN

项目已包含 `index.html` 文件，其中引入了 Socket.IO CDN：

```html
<script src="https://cdn.socket.io/4.6.1/socket.io.min.js"></script>
```

**在 Cocos Creator 中配置**：
1. 打开 Cocos Creator
2. 菜单：项目 -> 项目设置 -> 构建发布
3. 找到 "自定义 Web 模板" 选项并配置

详细步骤请查看 [SETUP.md](./SETUP.md)

## 使用 Cocos Creator 打开项目

1. 启动 Cocos Creator 3.8+
2. 选择"打开项目"
3. 选择 `client` 目录
4. 等待项目加载完成
5. 配置 Socket.IO（见上方说明）

## 核心组件

### GameManager
游戏核心管理器，负责：
- 网络连接管理
- 游戏状态管理
- 游戏房间管理
- 游戏操作处理

### NetworkManager
网络通信管理器，负责：
- WebSocket 连接
- 消息发送和接收
- 网络事件处理

### LoginScene
登录场景，包含：
- 用户名输入
- 创建房间
- 加入房间

### GameScene
游戏主场景，包含：
- 玩家手牌显示
- 战场卡牌显示
- 生命值和法力值显示
- 回合信息显示

### CardNode
卡牌显示组件，显示：
- 卡牌名称
- 攻击力/防御力
- 费用
- 描述

## 配置服务器地址

在 `NetworkManager.ts` 中修改服务器地址：

```typescript
private serverUrl: string = 'http://localhost:3000';
```

## 场景说明

### 登录场景（LoginScene）
玩家输入用户名，可以选择创建房间或加入已有房间。

### 游戏场景（GameScene）
显示游戏对战界面，包括：
- 自己的手牌区域
- 自己的战场区域
- 对手的战场区域
- 玩家和对手的状态信息
- 结束回合按钮

## 游戏操作

1. **打出卡牌**: 点击手牌区域的卡牌
2. **攻击**: 点击战场上的己方卡牌，再点击目标
3. **结束回合**: 点击结束回合按钮

## 开发注意事项

1. 确保服务器正在运行
2. 检查服务器地址配置正确
3. 在 Cocos Creator 中预览或构建项目
4. WebSocket 连接需要服务器支持

## 构建发布

1. 在 Cocos Creator 中选择"项目" -> "构建发布"
2. 选择目标平台（Web、iOS、Android 等）
3. 配置构建选项
4. 点击"构建"按钮
5. 构建完成后可以发布或调试
