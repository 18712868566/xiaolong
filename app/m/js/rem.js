/* rem */
/*$(window).on("load resize", function() {
    refreshRem();
});

function refreshRem() {
    var width = $(window).width();
    // 按照640比例可以直接用设计图尺寸除100
    if (width > 750) {
        width = 750;
        $("body,#wrap").css("max-width", "750px");
    };
    if (width < 320) width = 320;
    var rem = Math.floor(width / 750 * 100);
    $("html").css("font-size", rem);
}*/

//designWidth:设计稿的实际宽度值，需要根据实际设置
//maxWidth:制作稿的最大宽度值，需要根据实际设置
//这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
;
(function (designWidth, maxWidth) {
    var doc = document,
        win = window,
        docEl = doc.documentElement,
        remStyle = document.createElement("style"),
        tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;

        // console.log('width===' + width)
        maxWidth = maxWidth || 750;
        width > maxWidth && (width = maxWidth);
        var rem = width * 100 / designWidth;

        if (width < 1200 && width > 750) {
            remStyle.innerHTML = 'html{font-size:' + rem * 2 + 'px;}';
        } else if (width < 750) {
            remStyle.innerHTML = 'html{font-size:' + rem * 2.5 + 'px;}';

        } else {
            remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';

        }
    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        var wrap = doc.createElement("div");
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();

    win.addEventListener("resize", function () {
        clearTimeout(tid); //防止执行两次
        var width = docEl.getBoundingClientRect().width;
        console.log(width)
        tid = setTimeout(refreshRem, 100);
    }, false);

    win.addEventListener("pageshow", function (e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 100);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "16px";
    } else {
        doc.addEventListener("DOMContentLoaded", function (e) {
            doc.body.style.fontSize = "16px";
        }, false);
    }
})(2560, 2560);



