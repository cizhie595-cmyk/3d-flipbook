/**
 * ============================================
 *   3D翻页电子书 - 配置文件
 *   只需修改此文件即可自定义你的电子书
 * ============================================
 */

const BOOK_CONFIG = {

    // ========== 书籍基本信息 ==========
    title: "AI 副业实操手册",
    subtitle: "从零开始，用AI打造你的第二收入",

    // ========== 封面设置 ==========
    cover: {
        title: "AI 副业\n实操手册",
        subtitle: "2026 全新升级版",
        author: "编著：AI研究院",
        // 如果设置了图片，将使用图片作为封面（留空则用默认渐变封面）
        image: ""
    },

    // ========== 封底设置 ==========
    backCover: {
        text: "感谢阅读",
        cta: "添加微信领取完整版",
        // 如果设置了图片，将使用图片作为封底
        image: ""
    },

    // ========== 页面内容 ==========
    // 将你的图片放入 images/ 文件夹，然后在这里按顺序填入文件名
    // 支持 jpg, png, webp 格式
    pages: [
        "images/page1.jpg",
        "images/page2.jpg",
        "images/page3.jpg",
        "images/page4.jpg",
        "images/page5.jpg",
        "images/page6.jpg",
        // 继续添加更多页面...
        // "images/page7.jpg",
        // "images/page8.jpg",
    ],

    // ========== 引流设置 ==========
    cta: {
        enabled: true,                    // 是否启用引流浮窗
        showAfterPage: 3,                 // 翻到第几页后显示浮窗
        icon: "🎁",                       // 浮窗图标
        title: "免费领取完整版",            // 浮窗标题
        description: "添加微信获取配套资料", // 浮窗描述
        wechatId: "your_wechat_id",       // 你的微信号
        // 如果有二维码图片，放入images文件夹并填写路径
        qrcodeImage: ""
    },

    // ========== 外观设置 ==========
    appearance: {
        // 书籍尺寸（单位px，会自动响应式缩放）
        width: 550,
        height: 733,
        // 是否显示页码
        showPageNumber: true,
        // 翻页动画时长（毫秒）
        flipDuration: 800,
        // 是否显示阴影
        showShadow: true,
        // 背景粒子数量（0为关闭）
        particleCount: 30,
    }
};
