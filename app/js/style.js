/*
 * @Author: A
 * @Date:   2021-06-30 14:08:32
 * @Last Modified by:   A
 * @Last Modified time: 2022-01-06 10:51:59
 */
/*===========加载静态资源==========*/
var mainfest = [
    {
        src: "../images/dir-ani.png",
    },
    {
        src: "../images/fixed-footer.png",
    },
    {
        src: "../images/CS.png",
    },
    {
        src: "../images/ani/miya.png",
    },
    {
        src: "../images/ani/sprites.png",
    },
    {
        src: "../images/ani/star.png",
    },
    {
        src: "../images/bg1.jpg",
    },
    {
        src: "../images/cen-btns.png",
    },
    {
        src: "../images/left-long1.png",
    },
    {
        src: "../images/right-long1.png",
    },
    {
        src: "../images/right-long2.png",
    },
    {
        src: "../images/waves-bg.png",
    },
    {
        src: "../images/ani-logo.png",
    },
];

let length = mainfest.length;
let images = new Array(); // 定义一个数组容器，用来存储预加载完成的图片
let loadEl = document.querySelector('.loading');

function preloadImg() {
    let count = 0; // 计算器，计算加载了多少图片
    for (let i = 0; i < length; i++) {
        images[i] = new Image();
        images[i].src = `${mainfest[i].src}`;
        // 谷歌浏览器高版本支持大部分ES6，所以这里就不用字符串拼接了。
        // console.log(i)
        images[i].onload = function () {
            count++;
            if (count === length) {
                console.log('加载完成');
                // shuangjie.$pageLoad.addClass('hide').next().removeClass('hide')
                $('.loading').hide();
                $('.loadend').removeClass('hide');

                $.getScript('js/lib/fcanvas.js', function () { });

                $(".map .time_line").mCustomScrollbar({
                    setTop: '-201px',
                    callbacks: {
                        whileScrolling: function () {
                            console.log(Math.abs(this.mcs.top));

                            if (Math.abs(this.mcs.top) >= 0) {
                                $('.time_line dl:nth-child(1)').addClass('active').siblings().removeClass('active');
                                $('.showtime li:nth-child(1)').addClass('curr').siblings().removeClass('curr');
                            }
                            if (Math.abs(this.mcs.top) >= 100) {
                                $('.time_line dl:nth-child(2)').addClass('active').siblings().removeClass('active');
                                $('.showtime li:nth-child(2)').addClass('curr').siblings().removeClass('curr');
                            }

                            if (Math.abs(this.mcs.top) >= 200) {
                                $('.time_line dl:nth-child(3)').addClass('active').siblings().removeClass('active');
                                $('.showtime li:nth-child(3)').addClass('curr').siblings().removeClass('curr');
                            }
                            if (Math.abs(this.mcs.top) >= 300) {
                                $('.time_line dl:nth-child(4)').addClass('active').siblings().removeClass('active');
                                $('.showtime li:nth-child(4)').addClass('curr').siblings().removeClass('curr');
                            }
                            if (Math.abs(this.mcs.top) >= 375) {
                                $('.time_line dl:nth-child(5)').addClass('active').siblings().removeClass('active');
                                $('.showtime li:nth-child(5)').addClass('curr').siblings().removeClass('curr');
                            }

                            if (Math.abs(this.mcs.top) >= 450) {
                                $('.time_line dl:nth-child(6)').addClass('active').siblings().removeClass('active');
                                $('.showtime li:nth-child(6)').addClass('curr').siblings().removeClass('curr');
                            }
                        }
                    }
                });

                // 滚动加载动画
                AOS.init();
                // 滚动视差
                var images = document.querySelectorAll('.parallax-long');
                new simpleParallax(images, {
                    delay: .6,
                    transition: 'cubic-bezier(0,0,0,1)',
                    orientation: 'up',
                    scale: 2,
                    overflow: true,
                });

            } else {
                $(".progress span").text(`${Math.round(count / length * 100)}` + '%');

                // console.log(images[i].src);
            }
        }
    }
}

preloadImg();
/*==============资源加载完毕===========*/

$(function () {
    //关闭
    $(document).on("click", "#alertInfo .close,.close,.confirm,.pop-comm .pop_close,.pop_close_maskLayer,.pop_sjz", dialog.closeDiv);
    $(document).on('click', '.btn_yello', function () {
        // layer.msg('Coming Soon!');
        dialog.alertMooinSoon();
    });

    $(document).on('click', '.nav-target .btn-move-on', function (event) {
        event.preventDefault();
        $(this).removeClass('btn-move-on').addClass('btn-move-off');
        $('.btn-move-list').stop().animate({
            'height': '1.85rem'
        }, 500);
    })

    $(document).on('click', '.nav-target .btn-move-off', function (event) {
        event.preventDefault();
        $(this).removeClass('btn-move-off').addClass('btn-move-on');
        $('.btn-move-list').stop().animate({
            'height': '0'
        }, 500);
    })


    // 首屏kv动画
    $('#wrap').parallax();


    // 龙 tab 划过
    $('.dragon_tab p').hover(function () {
        let _index = $(this).index();
        $('.dragon_tab p').eq(_index).find('span').stop().animate({ 'opacity': '1' }, 300);
        $('.dragon_tab p').eq(_index).find('.after').stop().animate({
            'width': '1rem'
        }, 300, function () {
            $('.dragon_tab p').eq(_index).find('b').stop().animate({
                'opacity': '1'
            }, 300);
        });
    }, function () {
        let _index = $(this).index();
        $('.dragon_tab p').eq(_index).find('b').stop().animate({
            'opacity': '0'
        }, 0, function () {
            $('.dragon_tab p').eq(_index).find('.after').stop().animate({
                'width': '0rem'
            }, 0);
            $('.dragon_tab p').eq(_index).find('span').stop().animate({ 'opacity': '0' }, 0)
        });
    })

    // 3D 龙渲染
    let long1 = $('.long1').ThreeSixty({
        totalFrames: 29,
        endFrame: 29,
        framerate: 25,
        currentFrame: 1,
        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: '../images/long/huo/',
        filePrefix: 'huo',  // 设置文件前缀
        zeroPadding: true, // 补0 1-9
        disableSpin: false, // 禁止自动旋转
        ext: '.png', // 文件后缀
        height: '12.58rem',
        width: '10.26rem',
        autoplayDirection: -1, // 旋转方向
        navigation: false, // 控制导航
        onReady: function () {
            // 自动播放
            long1.play();
        }
    });
    let long2 = $('.long2').ThreeSixty({
        totalFrames: 29,
        endFrame: 29,
        framerate: 50,
        currentFrame: 1,
        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: '../images/long/feng/',
        filePrefix: 'feng',  // 设置文件前缀
        zeroPadding: true,
        ext: '.png',
        height: '12.58rem',
        width: '10.26rem',
        autoplayDirection: -1, // 旋转方向
        disableSpin: false,
        onReady: function () {
            // 自动播放
            long2.play();
        }
    });
    let long3 = $('.long3').ThreeSixty({
        totalFrames: 33,
        endFrame: 33,
        framerate: 50,
        currentFrame: 1,
        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: '../images/long/shui/',
        filePrefix: 'shui',  // 设置文件前缀
        zeroPadding: true,
        ext: '.png',
        height: '12.58rem',
        width: '10.26rem',
        autoplayDirection: -1, // 旋转方向
        disableSpin: false,
        onReady: function () {
            // 自动播放
            long3.play();
        }
    });
    let long4 = $('.long4').ThreeSixty({
        totalFrames: 19,
        endFrame: 19,
        framerate: 30,
        currentFrame: 1,
        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: '../images/long/di/',
        filePrefix: 'di',  // 设置文件前缀
        zeroPadding: true,
        ext: '.png',
        height: '12.58rem',
        width: '10.26rem',
        autoplayDirection: -1, // 旋转方向
        disableSpin: false,
        onReady: function () {
            // 自动播放
            long4.play();
        }
    });
    let long5 = $('.long5').ThreeSixty({
        totalFrames: 24,
        endFrame: 24,
        framerate: 25,
        currentFrame: 1,
        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: '../images/long/an/',
        filePrefix: 'an',  // 设置文件前缀
        zeroPadding: true,
        ext: '.png',
        height: '12.58rem',
        width: '10.26rem',
        autoplayDirection: -1, // 旋转方向
        disableSpin: false, onReady: function () {
            // 自动播放
            long5.play();
        }
    });
    let long6 = $('.long6').ThreeSixty({
        totalFrames: 29,
        endFrame: 29,
        framerate: 50,
        currentFrame: 1,
        imgList: '.threesixty_images',
        progress: '.spinner',
        imagePath: '../images/long/guang/',
        filePrefix: 'guang',  // 设置文件前缀
        zeroPadding: true,
        ext: '.png',
        height: '12.58rem',
        width: '10.26rem',
        autoplayDirection: -1, // 旋转方向
        disableSpin: false,
        onReady: function () {
            // 自动播放
            long6.play();
        }
    });


    // 龙模型切换
    argumentsTabs('.dragon_tab p', '.dragonaire-show .show');

    //返回顶部
    $(document).on('click', '.btn_goTop', function (event) {
        event.preventDefault();
        $("html,body").animate({
            "scrollTop": 0
        }, 300); //滚动到指定位置
    });

    $('.fixed_nav').hover(function () {
        $('.btn_close').show();
        $('.fnav-list').stop().animate({
            height: '3.6rem',
            opacity: 1
        }, 600)
    }, function () {
        $('.btn_close').hide();
        $('.fnav-list').stop().animate({
            height: '0',
            opacity: 0
        }, 600)
    });



    // 移动端打开导航
    $(document).on('click', '.icon_btn_open', function (event) {
        event.preventDefault();
        $('.menu_nav_list').slideDown();
    });

    // 移动端关闭导航
    $(document).on('click', '.btn_close_menu', function (event) {
        event.preventDefault();
        $('.menu_nav_list').slideUp();
    });


    $(document).on('click', '.nav-target a', function (event) {
        // event.preventDefault();
        let _index = $(this).index();

        const h1 = $('.page2').offset().top;
        const h2 = $('.page3').offset().top;
        const h3 = $('.page4').offset().top;
        console.log(h1)
        if (_index == 0) {
            $("html,body").animate({
                "scrollTop": 0
            }, 300); //滚动到指定位置
        }
        if (_index == 1) {
            $("html,body").animate({
                "scrollTop": h1
            }, 300); //滚动到指定位置
        }
        if (_index == 2) {
            $("html,body").animate({
                "scrollTop": h2
            }, 300); //滚动到指定位置
        }
    });

    // 滚动到底部
    $(document).on('click', '.btn-move-list .btn:nth-child(3)', function (event) {

        let h = $('.footer').offset().top;
        $("html,body").animate({
            "scrollTop": h
        }, 800); //滚动到指定位置
    });
});



function argumentsTabs(tabList, tabbox, index = 0) {

    var $div_li = $(tabList);
    $div_li.click(function () {
        $(this).addClass('curr').siblings().removeClass('curr');
        var index = $div_li.index(this);
        // console.log('index-===' + index)
        $(tabbox).eq(index).addClass("curr").show().siblings().removeClass("curr").hide();
    }).eq(index).click();
};

$(window).scroll(function (event) {
    var scrollT = $(window).scrollTop();
    // console.log(scrollT)
    if (scrollT >= 20) {
        $('nav').addClass('curr')
    } else {
        $('nav').removeClass('curr')

    }

    if (scrollT >= 400) {
        $('.btn_goTop').removeClass('animate__fadeOutDown').addClass(' animate__fadeInUp');
    } else {
        $('.btn_goTop').removeClass('animate__fadeInUp').addClass('animate__fadeOutDown');
    }
});




