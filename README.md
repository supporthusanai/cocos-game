# 卡牌游戏项目

一个基于 Cocos Creator + TypeScript + Node.js + MongoDB + Redis 的多人卡牌对战游戏。

## 项目结构

```
cocos-game/
├── server/          # 后端服务器
│   ├── src/
│   │   ├── config/      # 配置文件（数据库连接等）
│   │   ├── models/      # 数据模型（User, Card）
│   │   ├── controllers/ # 控制器（Auth, Card）
│   │   ├── services/    # 业务逻辑（Game, Card）
│   │   ├── routes/      # API 路由
│   │   ├── socket/      # WebSocket 处理
│   │   ├── types/       # TypeScript 类型定义
│   │   └── index.ts     # 服务器入口
│   ├── package.json
│   └── tsconfig.json
│
└── client/          # 前端客户端
    ├── assets/
    │   ├── scripts/
    │   │   ├── managers/    # 游戏管理器
    │   │   ├── network/     # 网络通信
    │   │   ├── ui/          # UI 组件
    │   │   └── types/       # 类型定义
    │   ├── scenes/          # 游戏场景
    │   ├── resources/       # 资源文件
    │   └── prefabs/         # 预制体
    ├── package.json
    └── tsconfig.json
```

## 技术栈

### 后端
- **Node.js**: JavaScript 运行时
- **TypeScript**: 类型安全的 JavaScript 超集
- **Express**: Web 框架
- **Socket.IO**: 实时双向通信
- **MongoDB**: NoSQL 数据库
- **Mongoose**: MongoDB ODM
- **Redis**: 内存数据库，用于缓存和会话管理
- **JWT**: 用户认证

### 前端
- **Cocos Creator**: 游戏引擎
- **TypeScript**: 类型安全的游戏脚本
- **Socket.IO Client**: 与服务器实时通信

## 功能特性

### 已实现功能

#### 后端
- ✅ 用户注册和登录系统
- ✅ JWT 身份验证
- ✅ 卡牌数据管理
- ✅ 游戏房间创建和加入
- ✅ 实时对战逻辑
- ✅ WebSocket 通信
- ✅ MongoDB 数据持久化
- ✅ Redis 会话缓存

#### 前端
- ✅ 登录场景
- ✅ 游戏主场景
- ✅ 卡牌显示组件
- ✅ 网络管理器
- ✅ 游戏状态管理
- ✅ 实时对战界面

### 游戏玩法

1. **卡牌类型**
   - 生物卡：有攻击力和防御力的单位
   - 法术卡：产生即时效果
   - 装备卡：提升生物属性

2. **卡牌稀有度**
   - 普通（Common）
   - 稀有（Rare）
   - 史诗（Epic）
   - 传奇（Legendary）

3. **游戏流程**
   - 玩家创建或加入房间
   - 双方各抽取5张初始手牌
   - 回合制对战
   - 使用法力值打出卡牌
   - 攻击对手的生物或英雄
   - 率先将对手生命值降至0者获胜

## 安装和运行

### 前置要求
- Node.js 18+
- MongoDB
- Redis
- Cocos Creator 3.8+

### 后端安装

```bash
cd server
npm install
cp .env.example .env
# 编辑 .env 文件配置数据库连接
npm run dev
```

### 前端安装

```bash
cd client
npm install
# 使用 Cocos Creator 打开项目目录
```

### 环境配置

在 `server/.env` 文件中配置：

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/card-game
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## API 文档

### REST API

#### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

#### 卡牌相关
- `GET /api/cards` - 获取所有卡牌
- `GET /api/cards/:cardId` - 获取指定卡牌

### WebSocket 事件

#### 客户端 -> 服务器
- `createRoom` - 创建游戏房间
- `joinRoom` - 加入游戏房间
- `gameAction` - 发送游戏操作

#### 服务器 -> 客户端
- `roomCreated` - 房间创建成功
- `gameStart` - 游戏开始
- `gameUpdate` - 游戏状态更新
- `error` - 错误信息

## 游戏机制

### 核心规则
- 初始生命值：30
- 初始法力值：1
- 每回合法力值上限+1（最大10）
- 每回合抽1张牌
- 初始手牌：5张

### 卡牌属性
- **名称**: 卡牌名称
- **类型**: 生物/法术/装备
- **攻击力**: 造成的伤害
- **防御力**: 承受伤害的能力
- **费用**: 打出卡牌消耗的法力值
- **稀有度**: 决定卡牌的强度和获取难度

## 开发计划

### 待实现功能
- [ ] 完整的卡牌收集系统
- [ ] 卡包开启功能
- [ ] 套牌构建系统
- [ ] 排行榜
- [ ] 好友系统
- [ ] 更多卡牌和效果
- [ ] 音效和动画
- [ ] AI 对手

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
