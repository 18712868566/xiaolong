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
                // console.log('加载完成');
                // shuangjie.$pageLoad.addClass('hide').next().removeClass('hide')
                $('.loading').hide();
                $('.loadend').removeClass('hide');

                $(".map .time_line").mCustomScrollbar({
                    setTop: '-301px',
                    callbacks: {
                        whileScrolling: function () {
                            // console.log(Math.abs(this.mcs.top));
                            if (Math.abs(this.mcs.top) >= 0) {
                                $('.time_line dl:nth-child(1)').addClass('active').siblings().removeClass('active');
                                $('.showtime li:nth-child(1)').addClass('curr').siblings().removeClass('curr');
                            }
                            if (Math.abs(this.mcs.top) >= 100) {
                                $('.time_line dl:nth-child(2)').addClass('active').siblings().removeClass('active');
                                $('.showtime li:nth-child(2)').addClass('curr').siblings().removeClass('curr');
                            }

                            if (Math.abs(this.mcs.top) >= 250) {
                                $('.time_line dl:nth-child(3)').addClass('active').siblings().removeClass('active');
                                $('.showtime li:nth-child(3)').addClass('curr').siblings().removeClass('curr');
                            }
                            if (Math.abs(this.mcs.top) >= 400) {
                                $('.time_line dl:nth-child(4)').addClass('active').siblings().removeClass('active');
                                $('.showtime li:nth-child(4)').addClass('curr').siblings().removeClass('curr');
                            }
                            if (Math.abs(this.mcs.top) >= 700) {
                                $('.time_line dl:nth-child(5)').addClass('active').siblings().removeClass('active');
                                $('.showtime li:nth-child(5)').addClass('curr').siblings().removeClass('curr');
                            }

                            if (Math.abs(this.mcs.top) >= 850) {
                                $('.time_line dl:nth-child(6)').addClass('active').siblings().removeClass('active');
                                $('.showtime li:nth-child(6)').addClass('curr').siblings().removeClass('curr');
                            }
                        }
                    }
                });
            } else {
                $(".progress span").text(`${Math.round(count / length * 100)}` + '%');
            }
        }
    }
}

preloadImg();
/*==============资源加载完毕===========*/

$(function () {
    //关闭
    $(document).on("click", "#alertInfo .close,.close,.confirm,.pop-comm .pop_close,.pop_close_maskLayer,.pop_sjz", dialog.closeDiv);

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
    // 滚动加载动画
    AOS.init();




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


    $(document).on('click', '.nav-target a,.llss a:nth-child(1),.llss a:nth-child(2),.llss a:nth-child(3)', function (event) {
        // event.preventDefault();
        let _index = $(this).index();


        const h1 = $('.page2').offset().top;
        const h2 = $('.page3').offset().top;
        const h3 = $('.page4').offset().top;
        console.log(h1)
        if (_index == 0) {
            $('.menu_nav_list').slideUp();

            $("html,body").animate({
                "scrollTop": 0
            }, 300); //滚动到指定位置
        }
        if (_index == 1) {
            $('.menu_nav_list').slideUp();

            $("html,body").animate({
                "scrollTop": h1
            }, 300); //滚动到指定位置
        }
        if (_index == 2) {
            $('.menu_nav_list').slideUp();

            $("html,body").animate({
                "scrollTop": h2
            }, 300); //滚动到指定位置
        }
    });

    // 滚动到底部
    $(document).on('click', '.btn-move-list .btn:nth-child(3),.llss .btn:nth-child(9)', function (event) {

        $('.menu_nav_list').slideUp();

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




