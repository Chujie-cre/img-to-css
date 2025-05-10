<div align="center">
  <h1>图片转CSS | Image to CSS</h1>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/styled--components-5.x-DB7093?style=flat-square&logo=styled-components" alt="styled-components" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License" />
</div>

<p align="center">一款强大的在线图片处理工具集，支持图片转CSS、图片编辑以及格式转换功能</p>

<div align="center">
  <a href="./README_EN.md">English</a> | 简体中文
</div>

## 🌟 功能特点

- **图片转CSS**：将图片转换为纯CSS代码，使用box-shadow属性
- **图片转Base64**：转换图片为Base64编码，方便在网页中嵌入使用
- **图片编辑器**：提供多种滤镜和预设效果
  - 调整亮度、对比度、饱和度等参数
  - 应用多种滤镜效果
  - 预设风格：黑白、复古、冷色调等
- **格式转换**：支持多种图片格式互转
  - 支持JPEG、PNG、WEBP、GIF、BMP等格式
  - 可调整质量和大小
  - 显示压缩效果和文件大小比较

## 📸 功能展示

### 界面样式
![图片转CSS示例](http://find.kingdomofown.cn/wp-content/uploads/2025/05/屏幕截图-2025-05-10-143237.png)

### 图片转CSS
![图片编辑器示例](http://find.kingdomofown.cn/wp-content/uploads/2025/05/1-1.png)

### 图片编辑
![格式转换示例](http://find.kingdomofown.cn/wp-content/uploads/2025/05/2-1.png)

## 🚀 快速开始

### 在线体验

访问 [http://img.kingdomofown.cn](http://img.kingdomofown.cn) 立即体验所有功能。

### 本地安装

1. 克隆仓库
```bash
git clone https://github.com/Chujie-cre/img-to-css.git
cd img-to-css
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm start
```

4. 构建生产版本
```bash
npm run build
```

## 💻 技术栈

- **前端框架**：React
- **路由**：React Router
- **样式**：styled-components
- **工具库**：
  - canvas-image-utils - 图片处理
  - tinycolor2 - 颜色处理
  - lodash - 实用工具函数

## 🔧 项目结构

```
img-to-css/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── EditorNavButton.jsx - 图片工具导航按钮
│   │   ├── Features.jsx - 功能介绍模块
│   │   ├── FormatConverter.jsx - 格式转换组件
│   │   └── ImageEditor.jsx - 图片编辑器组件
│   ├── app.jsx - 主应用组件
│   └── index.js - 入口文件
└── package.json
```

## 🔍 特性详解

### 图片转CSS

将图片转换为纯CSS代码，通过box-shadow属性创建像素级图片复制。适合创建不依赖图片资源的CSS艺术作品。

### 图片编辑器

提供多种图片编辑功能，包括：

- 基本调整：亮度、对比度、饱和度和灰度
- 特效：模糊、色相旋转、复古和反转
- 预设效果：黑白、复古风格、暖色调、冷色调和戏剧效果
- 支持下载编辑后的图片

### 格式转换器

支持多种图片格式互转，具有以下功能：

- 格式支持：JPEG、PNG、WEBP、GIF和BMP
- 高级选项：质量调整和尺寸调整
- 文件大小比较：显示转换前后的文件大小对比
- 直观的压缩率统计

## 📝 TODO

- [ ] 添加更多图片编辑功能（裁剪、旋转等）
- [ ] 支持批量处理多张图片
- [ ] 添加更多预设效果
- [ ] 支持更多图片格式

## 🤝 贡献指南

欢迎通过以下方式贡献本项目：

1. Fork 本仓库
2. 创建新分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📜 开源许可

本项目采用 MIT 许可证 - 详情参见 [LICENSE](LICENSE) 文件

## 👏 致谢

- [雏结](https://king.kingdomofown.cn) - 项目开发与设计
- 所有开源库的贡献者

---

<div align="center">
  <sub>Made with ❤️ by <a href="https://kingdomofown.cn">Kingdom of Own</a></sub>
</div> 
