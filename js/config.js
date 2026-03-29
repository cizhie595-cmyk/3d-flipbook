/**
 * ============================================
 *   3D翻页电子书 - 配置文件
 *   只需修改此文件即可自定义你的电子书
 * ============================================
 */

const BOOK_CONFIG = {

    // ========== 书籍基本信息 ==========
    title: "2026 AI赚钱指南",
    subtitle: "7条已验证的AI副业路径，从零到月入过万",

    // ========== 封面设置 ==========
    cover: {
        title: "2026\nAI赚钱指南",
        subtitle: "7条已验证的AI副业路径",
        author: "从零到月入过万的实操手册",
        image: ""
    },

    // ========== 封底设置 ==========
    backCover: {
        text: "感谢阅读",
        cta: "添加微信领取完整工具包",
        image: ""
    },

    // ========== 页面内容 ==========
    pages: [
        "images/page1.jpg",
        "images/page2.jpg",
        "images/page3.jpg",
        "images/page4.jpg",
        "images/page5.jpg",
        "images/page6.jpg",
        "images/page7.jpg",
        "images/page8.jpg",
        "images/page9.jpg",
        "images/page10.jpg",
        "images/page11.jpg",
        "images/page12.jpg",
        "images/page13.jpg",
        "images/page14.jpg",
        "images/page15.jpg",
        "images/page16.jpg",
        "images/page17.jpg",
        "images/page18.jpg",
        "images/page19.jpg",
        "images/page20.jpg",
    ],

    // ========== 引流设置 ==========
    cta: {
        enabled: true,
        showAfterPage: 3,
        icon: "🎁",
        title: "免费领取完整工具包",
        description: "添加微信获取AI赚钱配套资料",
        wechatId: "your_wechat_id",
        qrcodeImage: ""
    },

    // ========== 外观设置 ==========
    appearance: {
        width: 550,
        height: 733,
        showPageNumber: true,
        flipDuration: 800,
        showShadow: true,
        particleCount: 30,
    }
};
