$(document).ready(function(){
    control_mouse();
    cursor();
    tit();
    menu();
});

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
    pointer_go(".btn a");
    pointer_go(".menu_box a");
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

function tit(){
    $("main .tit").addClass("active");
    $(".popup").fadeIn();
    setTimeout(function(){
        $(".first_tit").css("opacity","0");
        setTimeout(function(){
            $(".last_tit").addClass("active");            
        },2000);
    },3000);
    ani()
}

function ani(){
    setTimeout(function(){
        $(".ani_wrap .ani").addClass("active");
        setInterval(function(){
            $(".ani_wrap .ani").removeClass("active");
            setTimeout(function(){
                $(".ani_wrap .ani").addClass("active");
            },500);
        },23500);
    },8000);
}

function menu(){
    $(".menu").click(function(){
        $(".menu_box").toggleClass("active");
    });

    $(".menu_box nav li img").mouseenter(function(){
        $(this).attr("src","images/nav_JLH.png");        
    });
    $(".menu_box nav li img").mouseleave(function(){
        $(this).attr("src","images/nav_JLH_bk.png");
    });
}