# 聚合搜索平台 "SearchHub" 开发任务

- [x] 需求分析与技术方案设计 <!-- id: 0 -->
- [x] 项目初始化 (Vite + React) <!-- id: 1 -->
- [x] 核心功能开发：搜索引擎路由逻辑 <!-- id: 2 -->
- [x] UI/UX 设计与实现 (毛玻璃、动态背景) <!-- id: 3 -->
- [x] (可选) Firebase 集成：同步用户偏好/历史 <!-- id: 4 -->
- [x] 验证与发布 <!-- id: 5 -->

## 迭代优化 (Iteration 2)

### 1. 解决“只打开一个窗口” (浏览器拦截)
*   **原因**：浏览器的安全机制会拦截代码连续弹出的新标签页。
*   **解决方案**：
    *   **代码层**：在 `onSearch` 中添加检测逻辑，如果 `window.open` 返回 null，说明被拦截。
    *   **UI层**：添加一个醒目的“引导弹窗”，教用户在地址栏点击“始终允许显示弹窗”。(这是多窗口应用的必经之路)。

### 2. 解决“需要登录” (平台限制)
*   **原因**：小红书、微博等平台在 Web 端的反爬策略，强制要求浏览者有登录 Cookie。
*   **解决方案**：
    *   **无法绕过**：这是大厂的硬性限制。
    *   **优化体验**：在页面底部增加“平台状态检查”栏，提示用户“建议在浏览器保持登录”。
### 3. "装在手机上" (PWA + 部署)
*   **目标**：将网页变成手机可安装的 App (图标出现在桌面，全屏运行)。
*   **方案**：Progressive Web App (PWA) 技术。
    *   **图标配置**：添加 `manifest.json`，定义 App 名字、图标、启动画面。
    *   **离线能力**：使用 `vite-plugin-pwa` 配置 Service Worker。
    *   **发布上线**：使用 Firebase Hosting 将网站发布到公网，手机通过链接访问并添加。

## 部署上线 (Deployment)
- [x] 配置 vite-plugin-pwa <!-- id: 8 -->
- [x] 初始化 Firebase Hosting <!-- id: 9 -->
- [x] 构建并部署到公网 (firebase deploy) <!-- id: 10 -->

## 移动端体验优化 (Iteration 3)
- [x] 移动端性能优化 (移除高消耗毛玻璃，提升流畅度) <!-- id: 11 -->
- [x] 小红书移动端链接修复 (寻找更兼容的 Web 接口) <!-- id: 12 -->
- [ ] (可选) 添加“APP/网页”优先模式开关 <!-- id: 13 -->

## Vercel 部署 (New)
- [x] 创建 GitHub 远程仓库 (Rolling-0112/SearchHub) <!-- id: 14 -->
- [x] 推送代码到 GitHub <!-- id: 15 -->
- [x] Vercel 导入并部署 <!-- id: 16 -->
- [x] 验证 Vercel 部署结果 (URL: https://search-hub-iota.vercel.app/) <!-- id: 17 -->

## GitHub Pages 部署 (中国大陆可访问方案)
- [x] 配置 Vite base path (通过构建参数覆盖) <!-- id: 18 -->
- [x] 创建 GitHub Actions 自动部署脚本 <!-- id: 19 -->
- [x] 推送更改并触发构建 <!-- id: 20 -->
- [x] 验证 GitHub Pages 访问 (URL: https://Rolling-0112.github.io/SearchHub/) <!-- id: 21 -->

## 紧急修复 (Hotfix)
- [x] 修复小红书移动端 404 问题 (V4: 最终方案 - 唤醒原生 APP) <!-- id: 22 -->
- [x] 新增哔哩哔哩移动端 APP 唤醒支持 (V3.4) <!-- id: 24 -->
- [x] 同步部署修复补丁到 Firebase Hosting (已确认更新) <!-- id: 23 -->
