# Cocos Creator 客户端配置指南

## 问题：socket.io-client 模块找不到

如果遇到 `Module "socket.io-client" not found` 错误，这是因为 Cocos Creator 不支持直接使用 npm 包。

## 解决方案

### 方案 1：使用 CDN（推荐用于 Web 构建）

1. 在 Cocos Creator 项目设置中配置自定义 index.html

2. 使用项目根目录的 `index.html` 文件，该文件已包含 Socket.IO CDN：

```html
<!-- Socket.IO Client Library -->
<script src="https://cdn.socket.io/4.6.1/socket.io.min.js" crossorigin="anonymous"></script>
```

3. **在 Cocos Creator 中配置**：
   - 打开 Cocos Creator
   - 菜单：项目 -> 项目设置 -> 构建发布
   - 勾选 "使用自定义 web 模板"
   - 将 `index.html` 复制到构建模板目录

### 方案 2：下载并引入本地文件

1. 下载 Socket.IO 客户端文件：

```bash
cd client
curl -o assets/scripts/libs/socket.io.min.js https://cdn.socket.io/4.6.1/socket.io.min.js
```

2. 在 Cocos Creator 中：
   - 选中 `socket.io.min.js` 文件
   - 在属性检查器中勾选 "导入为插件"
   - 勾选 "全局导出"

### 方案 3：使用原生 WebSocket（需要修改服务器）

如果不想使用 Socket.IO，可以改用原生 WebSocket，但需要同时修改服务器代码。

## Web 预览配置

### 方法 1：Cocos Creator 内置预览

1. 在 Cocos Creator 中打开项目
2. 点击顶部工具栏的"预览"按钮
3. 确保浏览器控制台没有 Socket.IO 相关错误

### 方法 2：构建到 Web

1. 菜单：项目 -> 构建发布
2. 选择平台：Web Mobile 或 Web Desktop
3. 配置构建选项
4. 点击"构建"
5. 构建完成后在 `build/web-mobile` 或 `build/web-desktop` 目录运行

## 启动本地 HTTP 服务器

构建后需要通过 HTTP 服务器运行（不能直接打开 index.html）：

```bash
# 进入构建目录
cd build/web-mobile

# 使用 Python 启动服务器
python3 -m http.server 8080

# 或使用 Node.js
npx http-server -p 8080
```

然后在浏览器打开 `http://localhost:8080`

## 配置服务器地址

在 `assets/scripts/network/NetworkManager.ts` 中修改：

```typescript
private serverUrl: string = 'http://localhost:3000';  // 改为你的服务器地址
```

## 常见问题

### Q: 预览时提示 "io is not defined"
A: 确保已正确引入 Socket.IO 库，并且在构建设置中启用了自定义模板。

### Q: 连接服务器失败
A:
1. 检查服务器是否已启动（`cd server && npm run dev`）
2. 检查服务器地址是否正确
3. 检查浏览器控制台的 CORS 错误

### Q: Cocos Creator 编辑器中的类型错误
A: NetworkManager.ts 中使用了 `declare const io: any;`，这会消除类型错误，运行时会从 CDN 加载。

## 开发流程

1. 启动后端服务器：
```bash
cd server
npm install
npm run dev
```

2. 打开 Cocos Creator 并加载 client 项目

3. 在编辑器中预览或构建到 Web 平台

4. 开始游戏开发！

## 原生平台（iOS/Android）

对于原生平台构建，需要：

1. 下载 Socket.IO 客户端库到本地
2. 在构建设置中配置为插件
3. 或者考虑使用原生 WebSocket 替代 Socket.IO
