$(document).ready(function(){
	var n=0;//当前播放的
	var time=null;
// 下
	function next(){
		n++;
		if(n==$(".lsq_pic li").length){
			n=1;
			$('.lsq_box').css({left:0});
		}else if(n==$(".lsq_pic li").length-1){
			$(".lsq_page li").eq(0).addClass("active").siblings().removeClass("active")
		}
	    $('.lsq_box').stop().animate({left:-n*1200},500);
	    $(".lsq_page li").eq(n).addClass("active").siblings().removeClass("active")
	}
	$(".next").click(function(){
		next();
	})
// 上
	function prev(){
		n--;
		if(n<0){
			n=$(".lsq_pic li").length-2;
			$('.lsq_box').css({left:-(n+1)*1200});
		}
	    $('.lsq_box').stop().animate({left:-n*1200},500);
	    $(".lsq_page li").eq(n).addClass("active").siblings().removeClass("active")
	}
	$(".prev").click(function(){
		prev();
	})
// 自动轮播
	time=setInterval(next,2000);
	$(".box").hover(
		function(){
			clearInterval(time);
		},function(){
			time=setInterval(next,2000);
		}
	)
// 分页
	$(".lsq_page li").click(function(){
		n=$(this).index();
		$('.lsq_box').stop().animate({left:-n*1200},500);
		$(this).addClass("active").siblings().removeClass("active");
	})


//返回顶部
    $("#fanhui").click(function(){
    	$("html,body").animate({"scrollTop":"0"},300)
    })


	$("#tou").load("head.html");
    $("#di").load("foot.html");

     
})
