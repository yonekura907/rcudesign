$(function(){

    // ------------------------------------
    // scroll fade
    // ------------------------------------

    var winH = $(window).height();
    //
    var worksContainer = $('.works-container');
    // console.log('worksContainer' + worksContainer);

    var worksContainerTop = worksContainer.offset().top;
    // console.log('worksContainerTop' + worksContainerTop);
    var worksFadePoint = worksContainerTop - winH;

    var newsContainer = $('.news-container');
    var newsContainerTop = newsContainer.offset().top;
    var newsFadePoint = newsContainerTop - winH;



    $(window).on('scroll',function(){
        var dy = $(this).scrollTop();
        // console.log(dy);

        if(dy >= worksFadePoint){
            worksContainer.find('section').addClass('fade-in');
        }
        if(dy >= newsFadePoint){
            newsContainer.find('section').addClass('fade-in');
        }
    });





    // ------------------------------------
    // slide show
    // ------------------------------------

    var currentIndex = -1;
    var slideShow= $('#slide-show');
    var slidePaging = $('#slide-paging');
    var slideLength = slideShow.find('li').length;

    var timer;

    changeSlide(0);

    function changeSlide(newIndex){

        if (currentIndex === newIndex) {
            return;
        }

        if(timer){
            clearTimeout(timer)
            timer = null;
        }

        if(currentIndex >= 0){
            slideShow.find('li:eq('+currentIndex+')').animate({opacity:0},1000);
        }
        slideShow.find('li:eq('+newIndex+')').animate({opacity:1},1000);

        currentIndex = newIndex;


        slidePaging.find('li').each(function(index){
            $(this).removeClass('selected');
            if(index == currentIndex){
                $(this).addClass('selected');
            }
        })


        timer = setTimeout(nextIndex, 4000);
    }

    function nextIndex(){
        var newIndex = currentIndex + 1;
        if(newIndex >=  slideLength){
            newIndex = 0;
        }
        changeSlide(newIndex);
    }


    slidePaging.find('li').each(function(index){
        $(this).on('click',function(){
            changeSlide(index);
        })
    });



    // ------------------------------------
    // resoponsive nav
    // ------------------------------------
    $(window).on('resize',function(){

        var windowWidth = $(window).width();

        if(windowWidth > 767){

            $('.mobile-menu, .mobile-close').css('display','none');
            $('.works, .news, footer').css('display','block');
            $('header nav').removeClass('fadein').css('display','block');

        } else {
            $('.mobile-menu, .mobile-close').css('display','block');
            $('header nav').css('display','none');
        }

    });


    $('.mobile-menu').on('click',function(){
        $('header nav').css('display','block').addClass('fade-in');
        $(this).css('display','none');
        $('.works, .news, footer').css('display','none');
    });
    $('.mobile-close').on('click',function(){
        $('header nav').removeClass('fadein').css('display','none');
        $('.mobile-menu').css('display','block');
        $('.works, .news, footer').css('display','block');
    });

    function pcNav(){

    }

    function mobileNav(){

    }

});
