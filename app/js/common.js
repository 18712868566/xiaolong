/*wlo:Cflower*/
var logg = null;
var dialog;
if (!dialog) dialog = {};
var flagPC = true;
dialog = {
    //关闭  document.location.reload()
    closeDiv: function () {
        $("body").css("position", "relative");
        $("#alertInfo").stop(true, true).animate({
            "top": "-100%",
            "opacity": "0"
        }, "fast", function () {
            $("#maskLayer,#alertInfo").remove().hide();
        });
    },
    //
    maskLayer: function () {
        $("#maskLayer,#alertInfo").remove();
        var maskLayer = "<div id='maskLayer'></div>";
        var alertInfo = "<div id='alertInfo'><span class='close'>关闭</span></div>";
        $("body").append(maskLayer, alertInfo);
        $('.wrap').addClass('row');
        $("#maskLayer").height('100%').show();
    },
    //显示提示信息框
    showInfo: function (alertHtml) {
        dialog.maskLayer();
        // $("body").css({'position':'fixed','width':'100%'});
        var _winH = $(window).height(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┐
        var _scrollTop = $(document).scrollTop(); //　　　　　　　　　　　      ├→
        $("#alertInfo").append(alertHtml).show(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┘
        var _thisDomWidth = $("#alertInfo").outerWidth();
        var _thisDomHeight = $("#alertInfo").outerHeight();
        var topD = parseInt(_scrollTop + (_winH - _thisDomHeight) / 2);
        var mL = parseInt(_thisDomWidth / 2);
        if (_thisDomHeight >= _winH) {
            topD = _scrollTop;
            if (_scrollTop + _thisDomHeight >= $(document).height()) {
                topD = $(document).height() - _thisDomHeight;
            };
            $("#alertInfo").css("position", "absolute");
        } else {
            topD = (_winH - _thisDomHeight) / 2;
            $("#alertInfo").css("position", "fixed");
        };
        $("#alertInfo").css({
            "margin-left": "-" + mL + "px"
        }).stop(true, true).animate({
            "top": topD + "px",
            "margin-left": "-" + mL + "px",
            "opacity": "1"
        }, "fast");
    },
    //改变窗口大小时改变弹出层的位置
    alertInfoPo: function () {
        var _winHResize = $(window).height();
        var _scrollTopResize = $(document).scrollTop();
        var _thisDomWidthResize = $("#alertInfo").outerWidth();
        var _thisDomHeightResize = $("#alertInfo").outerHeight();
        var topResize = parseInt(_scrollTopResize + (_winHResize - _thisDomHeightResize) / 2);
        if (topResize >= $("body").height() - _thisDomHeightResize) {
            _scrollTopResize = $("body").height() - _thisDomHeightResize;
            topResize = _scrollTopResize - (_winHResize - _thisDomHeightResize) / 2;
        };
        if (_thisDomHeightResize >= _winHResize) {
            topResize = _scrollTopResize;
            if (_scrollTopResize + _thisDomHeightResize >= $(document).height()) {
                topResize = $(document).height() - _thisDomHeightResize;
            };
            $("#alertInfo").css("position", "absolute");
        } else {
            topResize = (_winHResize - _thisDomHeightResize) / 2;
            $("#alertInfo").css("position", "fixed");
        };
        $("html,body").stop(true, true).animate({
            scrollTop: _scrollTopResize
        });
        $("#alertInfo").stop(true, true).animate({
            "top": topResize + "px",
            "margin-left": "-" + (_thisDomWidthResize / 2) + "px"
        })
        $("#maskLayer").height($("body").height());
    },
    //视频弹窗
    alertVideo: function (videoUrl) {
        dialog.showInfo(
            "<div class='pop_warp popVideo'>" +
            "<div class='before dialog-iframe'>"
            // +"<embed src='"+videoUrl+"' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' wmode='opaque'>"
            +
            "<iframe border='0' marginwidth='0' framespacing='0' marginheight='0' src='" + videoUrl + "' frameborder='0' noresize='scrolling='no' width='100%' height='100%' vspale='0' id='iframe' name='iframe' allowfullscreen></iframe>" +
            // + '<video src="' + videoUrl + '" autoplay="autoplay" playsinline="" webkit-playsinline="" x5-playsinline="" controls="controls"></video>' +
            "</div>" +
            "</div>")
    },
    // commin soon
    alertMooinSoon: function () {
        dialog.showInfo(`<div class="pop pop_fblogin">
            <div class="borbox commin_soon">
            </div>
        </div>`)
    },
    // 小狐狸登录
    alertMetaMask: function () {
        dialog.showInfo(`<div class="pop pop_fblogin">
            <div class="borbox meta_mask">
                <p class="btn-mmeta-mask">  </p>

                <span class="icon icon_xy " data-type='1'> </span>
                <a href="javascript:;" class="btn tips_xy">Accept Terms of Service</a>
            </div>
        </div>`)
    },
    // 不支持小狐狸插件
    alertDownBrowser: function () {
        dialog.showInfo(`<div class="pop pop_fblogin">
            <div class="borbox down_browser">
                <div class="down_wrap">
                    <a href="https://www.google.cn/chrome/" class="btn btn_browser" target="_blank"> chrome </a>
                    <a href="https://www.firefox.com/" class="btn btn_browser" target="_blank"> ff </a>
                    <a href="https://brave.com/" class="btn  btn_browser" target="_blank"> br </a>
                    <a href="https://www.microsoft.com/en-us/edge" class="btn btn_browser" target="_blank"> edge </a>
                </div>
            </div>
        </div>`)
    },
    // 未下载小狐狸
    alertDownMetaMask: function () {
        dialog.showInfo(`<div class="pop pop_fblogin">
            <div class="borbox down-meta-mask">
                <a href="https://metamask.io/"  target="_blank" class="btn btn-down-meta-mask">  </a>
            </div>
        </div>`)
    },
    // 不是BSC 网络
    alertBSC: function () {
        dialog.showInfo(`<div class="pop pop_fblogin">
            <div class="borbox down-bsc">
                <a href="javascript:;" class="btn btn-open-bsc">  </a>
            </div>
        </div>`)
    }

}