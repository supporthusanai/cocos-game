# Cocos Creator 场景搭建指南

## 问题：界面是空的

如果你在 Cocos Creator 中看到空白界面，这是因为还需要手动创建场景和 UI 组件。

## 快速开始步骤

### 第一步：创建登录场景

1. **创建场景**
   - 在 Cocos Creator 资源管理器中，右键点击 `assets/scenes` 文件夹
   - 选择 "新建" → "Scene"
   - 命名为 `LoginScene`

2. **创建 Canvas**
   - 在层级管理器中，右键点击根节点
   - 选择 "创建" → "2D 对象" → "Canvas"
   - Canvas 会自动包含一个 Camera

3. **创建 UI 容器**
   - 右键点击 Canvas 节点
   - 选择 "创建" → "创建空节点"
   - 命名为 `UIRoot`

4. **添加标题**
   - 右键点击 UIRoot
   - 选择 "创建" → "2D 对象" → "Label"
   - 命名为 `TitleLabel`
   - 在属性检查器中：
     - String: "卡牌游戏"
     - Font Size: 48
     - Color: 设置为你喜欢的颜色
     - Position: X=0, Y=200

5. **添加用户名输入框**
   - 右键点击 UIRoot
   - 选择 "创建" → "UI 组件" → "EditBox"
   - 命名为 `UsernameInput`
   - 在属性检查器中：
     - Placeholder: "请输入用户名"
     - Position: X=0, Y=50
     - Content Size: Width=300, Height=50

6. **添加房间ID输入框**
   - 同上，创建另一个 EditBox
   - 命名为 `RoomIdInput`
   - Placeholder: "输入房间ID（加入时需要）"
   - Position: X=0, Y=-20
   - Content Size: Width=300, Height=50

7. **添加创建房间按钮**
   - 右键点击 UIRoot
   - 选择 "创建" → "UI 组件" → "Button"
   - 命名为 `CreateRoomBtn`
   - Position: X=-100, Y=-100
   - 展开按钮节点，选择子节点 Label
   - 修改 String 为 "创建房间"

8. **添加加入房间按钮**
   - 同上，创建另一个 Button
   - 命名为 `JoinRoomBtn`
   - Position: X=100, Y=-100
   - Label String: "加入房间"

9. **添加 GameManager 脚本**
   - 在层级管理器中，右键点击根节点
   - 选择 "创建" → "创建空节点"
   - 命名为 `GameManager`
   - 在属性检查器中，点击 "添加组件"
   - 选择 "自定义组件" → "GameManager"

10. **添加 LoginScene 脚本**
    - 选中 Canvas 节点
    - 在属性检查器中，点击 "添加组件"
    - 选择 "自定义组件" → "LoginScene"
    - 将对应的节点拖拽到脚本属性中：
      - Username Input → UsernameInput 节点
      - Room Id Input → RoomIdInput 节点
      - Create Room Btn → CreateRoomBtn 节点
      - Join Room Btn → JoinRoomBtn 节点

11. **保存场景**
    - Ctrl+S (Windows/Linux) 或 Cmd+S (Mac)

### 第二步：创建游戏场景

1. **创建场景**
   - 在 `assets/scenes` 文件夹中创建新场景
   - 命名为 `GameScene`

2. **创建基础结构**
   - 创建 Canvas（同上）
   - 在 Canvas 下创建以下节点结构：

```
Canvas
├── PlayerInfo（空节点，Position: Y=300）
│   ├── HealthLabel（Label，String: "生命值: 30"）
│   └── ManaLabel（Label，String: "法力值: 1/1"）
├── OpponentInfo（空节点，Position: Y=-300）
│   ├── HealthLabel（Label，String: "生命值: 30"）
│   └── ManaLabel（Label，String: "法力值: 1/1"）
├── HandContainer（空节点，Position: Y=150）
├── PlayerFieldContainer（空节点，Position: Y=0）
├── OpponentFieldContainer（空节点，Position: Y=-150）
├── TurnInfo（Label，String: "回合信息"，Position: Y=250）
└── EndTurnBtn（Button，Label: "结束回合"，Position: X=350, Y=250）
```

3. **添加 GameScene 脚本**
   - 选中 Canvas 节点
   - 添加组件 → GameScene
   - 将各个节点拖拽到对应的脚本属性中

4. **添加 GameManager（如果还没有）**
   - 创建空节点 GameManager
   - 添加 GameManager 脚本组件

5. **保存场景**

### 第三步：创建卡牌预制体

1. **创建卡牌节点**
   - 在任意场景中，创建一个 Sprite 节点
   - 命名为 `CardPrefab`
   - Content Size: Width=120, Height=160

2. **添加子节点**
   在 CardPrefab 下创建以下结构：

```
CardPrefab（Sprite，添加背景色）
├── NameLabel（Label，Position: Y=60）
├── AttackLabel（Label，Position: X=-40, Y=-60）
├── DefenseLabel（Label，Position: X=40, Y=-60）
├── CostLabel（Label，Position: X=-50, Y=70）
└── DescriptionLabel（Label，Position: Y=0，Font Size: 12）
```

3. **添加 CardNode 脚本**
   - 选中 CardPrefab 根节点
   - 添加组件 → CardNode
   - 将各个 Label 节点拖拽到对应属性

4. **创建预制体**
   - 将 CardPrefab 节点从层级管理器拖拽到 `assets/prefabs` 文件夹
   - 删除场景中的临时节点

### 第四步：配置项目设置

1. **设置启动场景**
   - 菜单：项目 → 项目设置
   - 在 "启动场景" 中选择 `LoginScene`

2. **配置场景列表**
   - 在项目设置中，找到 "场景列表"
   - 添加 LoginScene 和 GameScene

### 第五步：测试运行

1. **点击顶部的 "预览" 按钮**
2. **在浏览器中测试**

## 简化方案：最小可运行版本

如果上面的步骤太复杂，可以先创建一个最简单的测试场景：

### 超简单版本（5分钟完成）

1. 创建 LoginScene 场景
2. 添加一个 Canvas
3. 在 Canvas 下添加一个 Label，显示 "游戏加载中..."
4. 添加 GameManager 组件
5. 保存并预览

然后打开浏览器控制台，看看网络连接是否正常。

## 遇到问题？

### 脚本组件找不到
- 检查 TypeScript 文件是否有编译错误
- 在 Cocos Creator 中刷新资源（右键资源管理器 → 刷新）

### 预览时报错
- 打开浏览器开发者工具（F12）查看错误信息
- 确保后端服务器已启动

### 想要更详细的教程
- 查看 Cocos Creator 官方文档：https://docs.cocos.com/creator/manual/
- 搜索 "Cocos Creator UI 搭建教程"

## 下一步

创建好场景后，你就可以：
1. 启动后端服务器（`cd server && npm run dev`）
2. 在 Cocos Creator 中预览游戏
3. 测试创建房间、加入房间等功能

如果你想要一个可以直接导入的完整项目，我可以帮你创建场景的 JSON 配置文件。
