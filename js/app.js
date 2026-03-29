/**
 * 3D翻页电子书 - 核心逻辑
 */
(function () {
    const C = BOOK_CONFIG;
    const container = document.getElementById("flipbook");

    // ========== 1. 初始化背景粒子 ==========
    function initParticles() {
        const el = document.getElementById("particles");
        const count = C.appearance.particleCount || 30;
        for (let i = 0; i < count; i++) {
            const p = document.createElement("div");
            p.className = "particle";
            const size = Math.random() * 6 + 2;
            p.style.width = size + "px";
            p.style.height = size + "px";
            p.style.left = Math.random() * 100 + "%";
            p.style.animationDuration = Math.random() * 15 + 10 + "s";
            p.style.animationDelay = Math.random() * 10 + "s";
            el.appendChild(p);
        }
    }

    // ========== 2. 构建页面DOM ==========
    function buildPages() {
        // 封面
        const coverDiv = document.createElement("div");
        coverDiv.className = "page page-cover";
        coverDiv.setAttribute("data-density", "hard");
        if (C.cover.image) {
            coverDiv.innerHTML = `<div class="page-content"><img src="${C.cover.image}" alt="封面"></div>`;
            coverDiv.className = "page";
        } else {
            coverDiv.innerHTML = `
                <div class="cover-decoration"></div>
                <div class="cover-title">${C.cover.title.replace(/\n/g, "<br>")}</div>
                <div class="cover-subtitle">${C.cover.subtitle}</div>
                <div class="cover-decoration"></div>
                <div class="cover-author">${C.cover.author}</div>
            `;
        }
        container.appendChild(coverDiv);

        // 内容页
        C.pages.forEach(function (src, idx) {
            const pageDiv = document.createElement("div");
            pageDiv.className = "page";
            const pageNum = idx + 1;
            const side = pageNum % 2 === 1 ? "right" : "left";
            pageDiv.innerHTML = `
                <div class="page-content">
                    <img src="${src}" alt="第${pageNum}页" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:#ccc;font-size:14px;\\'>图片加载失败<br>${src}</div>'">
                </div>
                ${C.appearance.showPageNumber ? `<div class="page-number ${side}">${pageNum}</div>` : ""}
            `;
            container.appendChild(pageDiv);
        });

        // 封底
        const backDiv = document.createElement("div");
        backDiv.className = "page page-back-cover";
        backDiv.setAttribute("data-density", "hard");
        if (C.backCover.image) {
            backDiv.innerHTML = `<div class="page-content"><img src="${C.backCover.image}" alt="封底"></div>`;
            backDiv.className = "page";
        } else {
            backDiv.innerHTML = `
                <div class="back-text">${C.backCover.text}</div>
                <div class="back-cta">${C.backCover.cta}</div>
            `;
        }
        container.appendChild(backDiv);
    }

    // ========== 3. 计算响应式尺寸 ==========
    function calcSize() {
        const maxW = window.innerWidth * 0.88;
        const maxH = window.innerHeight - 180;
        const ratio = C.appearance.width / C.appearance.height;
        let w = C.appearance.width;
        let h = C.appearance.height;

        if (w > maxW) { w = maxW; h = w / ratio; }
        if (h > maxH) { h = maxH; w = h * ratio; }

        return { width: Math.floor(w), height: Math.floor(h) };
    }

    // ========== 4. 初始化翻页引擎 ==========
    let pageFlip = null;

    function initFlipBook() {
        const size = calcSize();

        pageFlip = new St.PageFlip(container, {
            width: size.width,
            height: size.height,
            size: "fixed",
            minWidth: 280,
            minHeight: 373,
            maxWidth: C.appearance.width,
            maxHeight: C.appearance.height,
            showCover: true,
            mobileScrollSupport: true,
            maxShadowOpacity: C.appearance.showShadow ? 0.5 : 0,
            flippingTime: C.appearance.flipDuration,
            usePortrait: true,
            startZIndex: 0,
            autoSize: true,
            drawShadow: C.appearance.showShadow,
            startPage: 0,
            clickEventForward: true,
            useMouseEvents: true,
            swipeDistance: 30,
        });

        pageFlip.loadFromHTML(document.querySelectorAll(".page"));

        // 总页数
        const totalPages = C.pages.length + 2; // +封面+封底
        document.getElementById("page-total").textContent = totalPages;

        // 翻页事件
        pageFlip.on("flip", function (e) {
            const current = e.data + 1;
            document.getElementById("page-current").textContent = current;

            // 引流浮窗逻辑
            if (C.cta.enabled && current >= C.cta.showAfterPage) {
                showCTA();
            }
        });
    }

    // ========== 5. 控制按钮 ==========
    function bindControls() {
        document.getElementById("btn-prev").addEventListener("click", function () {
            if (pageFlip) pageFlip.flipPrev();
        });

        document.getElementById("btn-next").addEventListener("click", function () {
            if (pageFlip) pageFlip.flipNext();
        });

        // 键盘翻页
        document.addEventListener("keydown", function (e) {
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                if (pageFlip) pageFlip.flipPrev();
            }
            if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
                if (pageFlip) pageFlip.flipNext();
            }
        });

        // 全屏
        document.getElementById("btn-fullscreen").addEventListener("click", function () {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });

        // 窗口大小变化
        let resizeTimer;
        window.addEventListener("resize", function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if (pageFlip) {
                    const size = calcSize();
                    pageFlip.updateFromHtml(document.querySelectorAll(".page"));
                }
            }, 300);
        });
    }

    // ========== 6. 引流浮窗 ==========
    let ctaShown = false;

    function showCTA() {
        if (ctaShown) return;
        ctaShown = true;

        const ctaEl = document.getElementById("cta-float");
        // 更新内容
        ctaEl.querySelector(".cta-icon").textContent = C.cta.icon;
        ctaEl.querySelector(".cta-text strong").textContent = C.cta.title;
        ctaEl.querySelector(".cta-text p").textContent = C.cta.description;

        const wechatEl = ctaEl.querySelector("#cta-wechat");
        if (C.cta.qrcodeImage) {
            wechatEl.innerHTML = `<img src="${C.cta.qrcodeImage}" alt="二维码" style="width:120px;height:120px;display:block;margin:0 auto;">`;
        } else {
            wechatEl.innerHTML = `<span>微信号: <strong>${C.cta.wechatId}</strong></span>`;
        }

        ctaEl.classList.add("show");
    }

    document.getElementById("cta-close").addEventListener("click", function () {
        document.getElementById("cta-float").classList.remove("show");
    });

    // ========== 7. 设置页面标题 ==========
    function setTitles() {
        document.getElementById("book-title").textContent = C.title;
        document.getElementById("book-subtitle").textContent = C.subtitle;
        document.title = C.title + " - 3D翻页电子书";
    }

    // ========== 启动 ==========
    function init() {
        setTitles();
        initParticles();
        buildPages();
        initFlipBook();
        bindControls();
    }

    // DOM Ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
