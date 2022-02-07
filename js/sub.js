$(document).ready(function(){    
    control_mouse();
    cursor();
    scroll();
    menu();  
    sectionTop();  
    about();
    portfolio_view();
    portfolio_slide();
    $("html, body").animate({scrollTop:0},100);  
});

let aboutDone = false;


function control_mouse(){
    $(document).bind("contextmenu", function(e){return false;});  // 마우스 우 클릭 금지
    $(document).bind('selectstart', function() {return false;}); // 드래그 클릭 금지
}

function cursor(){
        var $default = parseInt(Math.random()*12)+1;
        var $pointer = parseInt(Math.random()*12)+1;
        var $pointer_go = parseInt(Math.random()*4)+1;
        $("html").css("cursor","url('images/cursor_" + $default  + ".svg') 0 0, auto");
        pointer(".menu");
        pointer(".navigation img");
        pointer(".pagination ul"); 
        pointer(".portfolio .view_wrap > div .cancel");
        pointer_go("header h1 a");
        pointer_go(".menu_box a");
        pointer_go(".portfolio .slide_wrap .img_wrap img");
        pointer_go(".btn");
        function pointer($target){
            $($target).mouseenter(function(){
                $("html").css("cursor","url('images/cursor_pointer_" + $pointer  + ".svg') 15 15, auto");
            }); 
            $($target).mouseleave(function(){
                $("html").css("cursor","url('images/cursor_" + $default  + ".svg') 0 0, auto");
            }); 
        }
        function pointer_go($target){
            $($target).mouseenter(function(){
                $($target).css("cursor","url('images/cursor_go_" + $pointer_go  + ".svg') 0 0, auto");
            }); 
            $($target).mouseleave(function(){
                $("html").css("cursor","url('images/cursor_" + $default  + ".svg') 0 0, auto");
            }); 
        }
}

var $moved = true;
var $stop = true;
function scroll(){    
    //  [ 섹션 스크롤 이벤트 ]
    var elm = "section";
    $(elm).each(function (index) {
        // 개별적으로 Wheel 이벤트 적용
        $(this).on("mousewheel DOMMouseScroll", function (e) {
            if($stop){                            
                if($moved){
                    $moved = false;
                    e.preventDefault();
                    var delta = 0;
                    if (!event) event = window.event;
                    if (event.wheelDelta) {
                        delta = event.wheelDelta / 120;
                        if (window.opera) delta = -delta;
                    } 
                    else if (event.detail)
                        delta = -event.detail / 3;
                    var moveTop = $(window).scrollTop();
                    var elmSelecter = $(elm).eq(index);
                    // 마우스휠을 위에서 아래로
                    if (delta < 0) {
                        if ($(elmSelecter).next() != undefined) {
                            try{
                                moveTop = $(elmSelecter).next().offset().top;
                            }catch(e){}
                        }
                    // 마우스휠을 아래에서 위로
                    } else {
                        if ($(elmSelecter).prev() != undefined) {
                            try{
                                moveTop = $(elmSelecter).prev().offset().top;
                            }catch(e){}
                        }
                    }                 
                    // 화면 이동 
                    $("html,body").stop().animate({
                        scrollTop: moveTop + 'px'
                    }, {
                        duration: 500, complete: function () {
                        $moved = true;                        
                        }
                    });

                }
            }
        });
    });
}

function menu(){
    $(".menu").click(function(){
        $(".menu").toggleClass("active");        
        $(".menu_box").toggleClass("active");        
    });
   
    $(".menu_box nav li a.menuA").click(function(e){
        e.preventDefault();   
        var $navId = $(this).parent("li").attr("id");
        var $sectionOffset = $("." + $navId).offset().top;
        $(".menu_box").css("display","none");  
        setTimeout(function(){
            $("html").animate({scrollTop:$sectionOffset});
            $(".menu").removeClass("active"); 
            $(".menu_box").removeClass("active"); 
            $(".menu_box").css("display","block"); 
        },100);
    });

    $(".menu_box nav li img").mouseenter(function(){
        $(this).attr("src","images/nav_JLH.png");        
    });
    $(".menu_box nav li img").mouseleave(function(){
        $(this).attr("src","images/nav_JLH_bk.png");
    });
}

function sectionTop(){      
    $(window).scroll(function(){
        var moveTop = $(window).scrollTop();
        var $skillsOffset = $(".skills").offset().top;
        var $portfolioOffset = $(".portfolio").offset().top;
        var $contactOffset = $(".contact").offset().top;
        
        if(moveTop == 0){
            if(aboutDone==false)
            $stop = false;
        }
        if($skillsOffset == moveTop){
            skills();
        }if($portfolioOffset == moveTop){
            portfolio();
        }if($contactOffset == moveTop){
            contact();
        } 
    });
}

var $aboutBg = true;

function about(){
    $stop = false;
    var j = 10;    
    $(".about .intro .first_text").addClass("active");
    setTimeout(function(){
        $(".about .intro .icon_scroll").addClass("active");
    },3000);
    $("body").on("mousewheel", function (event) {
        if($aboutBg){
            var $mousewheel = event.originalEvent.wheelDelta;
            if($mousewheel == -120){
                j--;                
            }if($mousewheel == 120){
                j++;
            };     
            $(".about .intro .bg").css("left",(j)*10 + "%");
            if(j == -12){
                $(".about .intro .first_text").removeClass("active");
                $aboutBg = false;
                setTimeout(function(){
                    $(".about .intro .last_text").addClass("active");
                    setTimeout(function(){
                        $(".about .intro .img_box").addClass("active");
                        setTimeout(function(){
                            $(".about .intro").addClass("active");
                            setTimeout(function(){
                                $(".about .intro").css("display","none");
                                $(".about .career").addClass("active");
                                $stop = true;
                                aboutDone = true;
                            },1000)
                        },4000)  
                    },2500)    
                },3000)      
            } 
        }
    });
    $(".about .career .left .img_box img").mouseenter(function(){
        $(this).attr("src","images/about_02.png");
    });
    $(".about .career .left .img_box img").mouseleave(function(){
         $(this).attr("src","images/about_01.png");
    });
}

function skills(){
    $stop = true;
    var k = 1;
    setTimeout(function(){
        $(".skills .tit").addClass("active");
        setTimeout(function(){
            $(".skill .program h3").addClass("active");
            setTimeout(function(){
                setInterval(function(){
                    $(".skills .skill .graph span:nth-child(" + k + ")").addClass("active");
                    if(k < 25){
                        k++;
                    }
                },120);
            },500);
        },1000);        
    },500);
}

var i = 0;
function portfolio(){
    $stop = true;
    setTimeout(function(){
        $(".portfolio .text_wrap .slide").eq(i).addClass("active");
        $(".portfolio .img_wrap .slide").eq(i).addClass("active");
        $(".pagination ul li").eq(i).addClass("active");
    },500);
}

function portfolio_slide(){
    var $length = $(".portfolio .img_wrap .slide").length;
    
    for(j = 0; j < $length; j++){
        $(".portfolio .pagination ul").append("<li>page"+(j+1)+"</li>");
    }      
    
    $(".navigation .prev").click(function(){
        if(i == 0){
            i = $length-1;
        }else{
            i--;
        }        
        slideActive();
    });
    $(".navigation .next").click(function(){
        if(i == $length-1){
            i = 0;
        }else{
            i++;
        }        
        slideActive();
    });

    $(".pagination ul li").click(function(){
        var $index = $(this).index();
        i = $index;
        slideActive();
    });

    function slideActive(){
        $(".portfolio .text_wrap .slide").removeClass("active");
        $(".portfolio .text_wrap .slide").eq(i).addClass("active");
        $(".portfolio .img_wrap .slide").stop().fadeOut();
        $(".portfolio .img_wrap .slide").eq(i).stop().fadeIn();
        $(".pagination ul li").removeClass("active");
        $(".pagination ul li").eq(i).addClass("active");           
    }
}

function portfolio_view(){
    $(".portfolio .slide_wrap .btn").click(function(){
        var $viewId = $(this).parent().parent().attr("id");  
        $(".view_wrap").animate({scrollTop:0},10);      
        $(".portfolio .view_wrap ."+ $viewId).addClass("active");
        $(".portfolio .view_wrap").css("display","block");
        $stop = false;
        
    });
    $(".portfolio .view_wrap > div .cancel").click(function(){        
        $(".portfolio .view_wrap").css("display","none");
        $(".portfolio .view_wrap div").removeClass("active");
        $stop = true;
    });

    
}

function contact(){
    $stop = true;
    setTimeout(function(){
        $(".contact .tit").addClass("active");
        setTimeout(function(){
            $(".contact .info div").addClass("active");
        },1000);        
    },500);
    
    setTimeout(function(){
        $(".ani_wrap .ani").addClass("active");
        setInterval(function(){
            $(".ani_wrap .ani").removeClass("active");
            setTimeout(function(){
                $(".ani_wrap .ani").addClass("active");
            },1000);
        },24000);
    },2800);
}