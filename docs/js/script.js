// DOMの読み込み
$(function(){

    // グローバル変数 -----------------------------------------
    // windowの幅と高さ
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    // navの高さ
    var navContainerTop = $('.nav-container').offset().top;
    // console.log('navContainerTop: ' + navContainerTop);


    // Slide Show -----------------------------------------
    var slideShow = $('#slide-show');
    // liの数
    var slideLength = slideShow.find('li').length;
    var slidePaging = $('#slide-paging');
    // 現状の番号
    var currentIndex = -1;
    // 時間を制御する変数
    var timer;

    changeSlide(0); // 関数の実行


    // 画像を切り替える関数
    function changeSlide(newIndex){
        // 現在の番号は飛ばすように（押せないように）
        if(currentIndex === newIndex){
            return; // ここで終わり
        }
        // 一旦タイマーを停止
        if(timer){
            clearTimeout(timer);
            timer = null; // timerの値を空にする
        }

        if(currentIndex >= 0){
            // 現在表示している写真を１秒でopacity:０にする
            slideShow.find('li:eq('+currentIndex+')').removeClass('slide-in');
        }
        // 次の写真（newIndex）を１秒でopacity:1にする
        slideShow.find('li:eq('+ newIndex +')').addClass('slide-in');
        currentIndex = newIndex; //自分の番号を次の番号に更新

        // ページングの指定
        slidePaging.find('li').each(function(index){
            $(this).removeClass('selected');
            if(index == currentIndex){
                $(this).addClass('selected');
            }
        });
        // タイマー
        timer = setTimeout(nextIndex, 4000);

    }

    // 番号を進める関数
    function nextIndex(){
        var newIndex = currentIndex + 1; // 次の番号
        if(newIndex >= slideLength){
            newIndex = 0;
        }
        changeSlide(newIndex);
    }

    // クリックイベント
    slidePaging.find('li').each(function(index){
        $(this).on('click',function(){
            // liの押した番号をchangeSlideに渡す
            changeSlide(index);
        });
    });


    // スクロールイベント  -----------------------------------------
    $(window).on('scroll',function(){

        // 上からのスクロール値
        var dy = $(this).scrollTop();
        console.log('dy: ' + dy);


        // ------------------------
        // Nav
        // ------------------------
        // PCのサイズのみ
        if(windowWidth > 767){
            // もしdyがnavContainerTop以上になったら
            if(dy >= navContainerTop){
                $('header nav').addClass('nav-fixed');
            } else {
                $('header nav').removeClass('nav-fixed');
            }
        }


        // ------------------------
        // Scroll Fade
        // ------------------------
        $('.fade-in').each(function(){
            var fadeInEl = $(this).offset().top;
            if(dy >= fadeInEl - windowHeight + 100){
                $(this).addClass('scroll-in');
            }
        });
    });


    // windowをリサイズしたら
    $(window).on('resize',function(){
        console.log('リサイズ');
        windowWidth = $(window).width();

        if(windowWidth > 767){
            // PC
        } else {
            // Mobile
        }
    });



    // ------------------------------
    // Responsive Navi
    // ------------------------------
    $('.mobile-menu').on('click',function(){
        $('header nav').addClass('mobile-menu-open');
        console.log('mobile on');
    });
    $('.mobile-close').on('click',function(){
        $('header nav').removeClass('mobile-menu-open');
    });

    $('.nav-container ul').find('li:eq(2)').on('click',function(evt){
        evt.preventDefault();
        console.log('worksをクリック');
        $('html, body').animate({scrollTop: worksContainerTop-200},500);
    });

});
