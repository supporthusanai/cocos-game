# Cocos Creator 构建运行指南

## 问题根源

Cocos Creator 编辑器预览环境无法正确加载 CDN 的 Socket.IO 库，导致 WebSocket 连接失败。

## 解决方案：构建后运行

### 方法 1：最小化场景 + 构建运行

#### 步骤 1：在 Cocos Creator 中创建最简场景

1. **打开 Cocos Creator**
2. **资源管理器** → 右键 `assets/scenes` → 新建 → Scene
3. **命名**为 `TestScene`
4. **双击打开**场景
5. 会自动创建 Canvas 和 Camera - **保持默认即可**
6. **保存**场景 (Ctrl+S)

#### 步骤 2：添加 GameManager

1. **层级管理器** → 右键 Canvas → 创建空节点
2. 命名为 `GameManagerNode`
3. **选中** GameManagerNode
4. **属性检查器** → 添加组件 → 自定义脚本 → 搜索 `GameManager`
5. 点击添加

#### 步骤 3：设置启动场景

1. 菜单：**项目 → 项目设置**
2. **启动场景** → 选择 `TestScene`
3. 点击"应用"

#### 步骤 4：构建项目

1. 菜单：**项目 → 构建发布**
2. **发布平台**：Web Mobile
3. **构建路径**：默认 `build`
4. 点击 **"构建"** 按钮
5. 等待构建完成

#### 步骤 5：添加 Socket.IO 支持

构建完成后：

```bash
# 复制 index.html 到构建目录
cp /home/user/cocos-game/client/index.html /home/user/cocos-game/client/build/web-mobile/
```

或者手动：
1. 找到 `client/build/web-mobile/index.html`
2. 打开编辑
3. 在 `<head>` 标签中添加：
```html
<script src="https://cdn.socket.io/4.6.1/socket.io.min.js"></script>
```

#### 步骤 6：运行

```bash
cd /home/user/cocos-game/client/build/web-mobile
python3 -m http.server 8080
```

然后在浏览器打开：`http://localhost:8080`

## 方法 2：下载 Socket.IO 到本地

如果 CDN 不稳定，可以下载到本地：

```bash
# 下载 Socket.IO
cd /home/user/cocos-game/client/assets/scripts/libs
curl -o socket.io.min.js https://cdn.socket.io/4.6.1/socket.io.min.js
```

然后在 Cocos Creator 中：
1. 选中 `socket.io.min.js`
2. 属性检查器：
   - 勾选 "导入为插件"
   - 勾选 "在 Web 平台加载"

## 当前服务器状态检查

```bash
# 检查服务器是否运行
curl http://localhost:3000/health

# 如果没运行，启动服务器
cd /home/user/cocos-game/server
npm run dev
```

## 预期结果

构建运行后：
1. 打开浏览器控制台 (F12)
2. 应该看到 "Connected to server"
3. 不应该有 "Invalid frame header" 错误

## 常见问题

### Q: 构建后还是连接不上？
A: 检查：
1. 服务器是否运行在 3000 端口
2. 浏览器控制台是否有其他错误
3. Socket.IO 脚本是否正确加载

### Q: 能否在编辑器预览？
A: Cocos Creator 3.x 的编辑器预览对外部库支持不好，建议构建后运行。

### Q: 需要完整的 UI 吗？
A: 不需要！只要 GameManager 组件在场景中，就能连接服务器。可以通过浏览器控制台测试功能。

## 测试连接

构建运行后，在浏览器控制台输入：

```javascript
// 测试创建房间
const gm = window['GameManager']
if (gm) {
  gm.getInstance().createRoom('TestPlayer')
}
```

## 下一步

连接成功后，可以逐步添加 UI：
1. EditBox（输入框）
2. Button（按钮）
3. Label（显示信息）

但先确保网络连接正常！
