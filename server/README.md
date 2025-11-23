# 卡牌游戏服务器

## 目录结构

```
server/
├── src/
│   ├── config/          # 配置文件
│   │   └── database.ts  # MongoDB 和 Redis 连接配置
│   ├── models/          # 数据模型
│   │   ├── User.ts      # 用户模型
│   │   └── Card.ts      # 卡牌模型
│   ├── controllers/     # 控制器
│   │   ├── AuthController.ts  # 认证控制器
│   │   └── CardController.ts  # 卡牌控制器
│   ├── services/        # 业务逻辑
│   │   ├── GameService.ts     # 游戏逻辑服务
│   │   └── CardService.ts     # 卡牌服务
│   ├── routes/          # 路由
│   │   └── index.ts     # API 路由定义
│   ├── socket/          # WebSocket
│   │   └── gameSocket.ts      # 游戏 WebSocket 处理
│   ├── types/           # 类型定义
│   │   └── index.ts     # TypeScript 接口和枚举
│   └── index.ts         # 服务器入口文件
├── package.json
├── tsconfig.json
└── .env.example
```

## 安装依赖

```bash
npm install
```

## 配置环境变量

复制 `.env.example` 为 `.env` 并配置：

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/card-game
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## 运行

### 开发模式
```bash
npm run dev
```

### 生产模式
```bash
npm run build
npm start
```

## API 端点

### 认证
- `POST /api/auth/register` - 注册新用户
- `POST /api/auth/login` - 用户登录

### 卡牌
- `GET /api/cards` - 获取所有卡牌
- `GET /api/cards/:cardId` - 获取指定卡牌

### 健康检查
- `GET /health` - 服务器健康状态

## WebSocket 事件

### 接收事件
- `createRoom` - 创建游戏房间
- `joinRoom` - 加入游戏房间
- `gameAction` - 执行游戏操作

### 发送事件
- `roomCreated` - 房间创建成功
- `gameStart` - 游戏开始
- `gameUpdate` - 游戏状态更新
- `error` - 错误消息

## 数据模型

### User（用户）
- username: 用户名
- email: 邮箱
- password: 密码（加密存储）
- level: 等级
- experience: 经验值
- coins: 金币
- ownedCards: 拥有的卡牌
- decks: 套牌列表

### Card（卡牌）
- cardId: 卡牌ID
- name: 名称
- type: 类型（生物/法术/装备）
- attack: 攻击力
- defense: 防御力
- cost: 费用
- rarity: 稀有度
- description: 描述
