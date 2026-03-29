# 3D 翻页电子书 (3D FlipBook)

一个零依赖、开箱即用的 3D 仿真翻页电子书项目。基于 [StPageFlip](https://github.com/nicklassandell/StPageFlip) 开源库构建，支持 GitHub Pages 一键部署。

## 预览效果

- 逼真的 3D 翻页动画
- 支持鼠标拖拽 / 点击 / 键盘翻页
- 移动端触摸滑动翻页
- 内置引流浮窗（可配置微信号/二维码）
- 全屏阅读模式
- 响应式布局，适配所有设备

## 快速开始

### 1. 替换页面图片

将你的电子书页面图片放入 `images/` 文件夹，命名为 `page1.jpg`、`page2.jpg`、`page3.jpg` ...

推荐图片尺寸：**550 x 733 像素**（A4比例）

### 2. 修改配置文件

打开 `js/config.js`，修改以下内容：

```javascript
const BOOK_CONFIG = {
    title: "你的书名",
    subtitle: "你的副标题",

    // 按顺序填入你的页面图片路径
    pages: [
        "images/page1.jpg",
        "images/page2.jpg",
        "images/page3.jpg",
        // ...
    ],

    // 引流设置
    cta: {
        enabled: true,
        showAfterPage: 3,          // 翻到第几页显示
        wechatId: "你的微信号",     // 你的微信号
        qrcodeImage: "",            // 或填入二维码图片路径
    },
};
```

### 3. 部署到 GitHub Pages

1. Fork 或 clone 本仓库
2. 进入仓库 Settings → Pages
3. Source 选择 `main` 分支，目录选 `/ (root)`
4. 保存后等待几分钟，即可通过 `https://你的用户名.github.io/3d-flipbook/` 访问

### 4. 获取分享链接

部署成功后，你将获得一个永久有效的在线阅读链接，可以：
- 发送给闲鱼买家
- 嵌入到公众号文章
- 生成二维码分享

## 项目结构

```
3d-flipbook/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── config.js       # ⭐ 配置文件（主要修改这个）
│   ├── app.js          # 核心逻辑
│   └── page-flip.browser.js  # 翻页引擎
├── images/             # 页面图片目录
│   ├── page1.jpg
│   ├── page2.jpg
│   └── ...
└── README.md
```

## 配置说明

| 配置项 | 说明 | 默认值 |
|:---|:---|:---|
| `title` | 书名 | AI 副业实操手册 |
| `subtitle` | 副标题 | - |
| `cover.image` | 封面图片路径（留空用默认渐变） | 空 |
| `pages` | 页面图片路径数组 | - |
| `cta.enabled` | 是否启用引流浮窗 | true |
| `cta.showAfterPage` | 翻到第几页显示浮窗 | 3 |
| `cta.wechatId` | 微信号 | - |
| `cta.qrcodeImage` | 二维码图片路径 | 空 |
| `appearance.width` | 书页宽度 | 550 |
| `appearance.height` | 书页高度 | 733 |
| `appearance.flipDuration` | 翻页动画时长(ms) | 800 |

## 许可证

MIT License - 免费使用，无任何限制。
