# Cocos Creator 快速配置指南

## 当前问题

1. ❌ WebSocket 连接失败
2. ❌ 场景文件未创建
3. ❌ UI 组件未配置

## 解决方案：手动创建场景

### 第一步：创建登录场景

1. **在 Cocos Creator 中**：
   - 资源管理器 → 右键 `assets/scenes` 文件夹
   - 选择 "新建" → "Scene"
   - 命名为 `LoginScene`
   - 双击打开场景

2. **创建 UI 结构**：

在层级管理器中，创建以下结构：

```
Scene
├── Canvas
│   ├── Camera
│   └── GameManagerNode (空节点)
│       └── 添加组件: GameManager
└── UIRoot (空节点)
    ├── TitleLabel (Label)
    │   └── 文本: "卡牌游戏"
    ├── UsernameInput (EditBox)
    │   └── Placeholder: "请输入用户名"
    ├── RoomIdInput (EditBox)
    │   └── Placeholder: "输入房间ID（加入时需要）"
    ├── CreateRoomBtn (Button)
    │   └── Label: "创建房间"
    └── JoinRoomBtn (Button)
        └── Label: "加入房间"
```

3. **添加 LoginScene 脚本**：
   - 选中 UIRoot 节点
   - 属性检查器 → 添加组件 → 自定义脚本 → LoginScene
   - 将对应的节点拖拽到脚本属性中：
     - Username Input → UsernameInput
     - Room Id Input → RoomIdInput
     - Create Room Btn → CreateRoomBtn
     - Join Room Btn → JoinRoomBtn

4. **保存场景** (Ctrl+S)

### 第二步：配置项目设置

1. **设置为启动场景**：
   - 菜单：项目 → 项目设置
   - 启动场景 → 选择 LoginScene

### 第三步：解决 Socket.IO 问题

**方式 1：构建后运行（推荐）**

1. 菜单：项目 → 构建发布
2. 选择平台：Web Mobile
3. 构建后路径：`build/web-mobile`
4. 点击"构建"
5. 构建完成后，将 `client/index.html` 复制到 `build/web-mobile/` 目录
6. 用本地服务器运行：

```bash
cd build/web-mobile
python3 -m http.server 8080
# 或
npx http-server -p 8080
```

7. 浏览器打开 `http://localhost:8080`

**方式 2：使用插件脚本**

如果想在编辑器中预览，需要将 Socket.IO 作为插件引入。

### 详细创建步骤

#### 创建 Canvas
1. 层级管理器右键 → 创建 → 2D 对象 → Canvas

#### 创建 GameManager
1. 右键 Canvas → 创建空节点 → 命名为 GameManagerNode
2. 选中 GameManagerNode → 属性检查器 → 添加组件 → 自定义脚本 → GameManager

#### 创建 UI 元素

**Label（标题）**：
1. 右键 Canvas → 创建 → 2D 对象 → Label
2. 命名为 TitleLabel
3. 属性：
   - String: "卡牌游戏"
   - Font Size: 48
   - Position: (0, 200, 0)

**EditBox（输入框）**：
1. 右键 Canvas → 创建 → UI 组件 → EditBox
2. 第一个命名为 UsernameInput
   - Placeholder: "请输入用户名"
   - Position: (0, 50, 0)
   - ContentSize: (300, 50)

3. 第二个命名为 RoomIdInput
   - Placeholder: "输入房间ID"
   - Position: (0, -20, 0)
   - ContentSize: (300, 50)

**Button（按钮）**：
1. 右键 Canvas → 创建 → UI 组件 → Button
2. 第一个命名为 CreateRoomBtn
   - Position: (-100, -100, 0)
   - 子节点 Label 文本: "创建房间"

3. 第二个命名为 JoinRoomBtn
   - Position: (100, -100, 0)
   - 子节点 Label 文本: "加入房间"

### 最快的方式：我可以帮你生成场景配置

如果手动创建太麻烦，我可以生成场景的 JSON 配置文件，你可以直接导入。

需要吗？
