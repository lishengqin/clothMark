$(function(){
//判断用那种方式登录
	$(".right2").on("click","li",function(){
		var i=$(this).index();
		$(this).attr("class","ac");
		$(this).siblings("li").removeAttr("class");
		if(i==0){
			$(".right3").css("display","block");
			$(".right4").css("display","none");
		}if(i==1){
			getYan();
			$(".right4").css("display","block");
			$(".right3").css("display","none");
		}
	})
//判断第一种方式输入框是否为空
	$(".mes").blur(function(){
		var i=$(this).index(".mes");
		if(!$(this).val()){
			$(".tishi").eq(i).css("display","block");
		}else{
			$(".tishi").eq(i).css("display","none");
		}
	})

//判断第一种方式是否登录成功
	$("#login").click(function(){
		$.each($(".mes"),function(i){
			if(!$(".mes").eq(i).val()){
				$(".tishi").eq(i).css("display","block");				
			}
		})
		if($(".mes").eq(0).val()&&$(".mes").eq(1).val()){
			var key="userformation";
			var arr=JSON.parse(localStorage.getItem(key));
			var mes1=$(".mes").eq(0).val();
			var mes2=$(".mes").eq(1).val();
			var s=-1;
			$.each(arr,function(i){
				if(mes1==arr[i].username&&mes2==arr[i].password){
					s=i;
				}
			})
			if(s==-1){
				$(".tishi").eq(2).html("！用户名或密码输入错误");
				$(".tishi").eq(2).css("display","block");
			}else{
				$(".tishi").eq(2).html("");
				var key1="username";
				var value=JSON.stringify(mes1);
				localStorage.setItem(key1,value);
				window.location.href="index.html";
			}
		}
	})
//判断第二种方式
	//获得手机验证码
	$("#getY").click(function(){
		clearInterval(timer);
		var phone=$("#phone").val();		
		var reg=/^1(3|4|5|7|8)\d{9}$/;
		if(!reg.test(phone)){
			$(".ti").eq(0).css("display","block");										
		 }else if(isNaN(phone)){
		 	$(".ti").eq(0).css("display","block");	
		 }else if(phone.length!=11){
		 	$(".ti").eq(0).css("display","block");	
		 }else{
		 	$(".ti").eq(0).css("display","none");
		 	var num=10;
		 	var timer=null;
		 	timer=setInterval(function(){
		 		num--;
		 		$("#getY").html(num+"秒后重新获得");
		 		$("#getY").css("color","#cca");
		 		$("#getY").off("click");
		 		if(num<0){
		 			$("#getY").html("获取短信验证码");
		 			clearInterval(timer);
		 			$("#getY").css("color","#b52024");
		 		}
		 	},1000)
		 }		 
	})
//获得四位随机验证码
	function getYan(){
		var arr=[];
		var arr1=[];
		var arr2=[];
		for(var i=48;i<=57;i++){
			arr.push(i);
		}
		for(var i=65;i<=90;i++){
			arr.push(i);
		}
		for(var i=0;i<arr.length;i++){
			var str=String.fromCharCode(arr[i]);
			arr1.push(str);
		}
		for(var i=0;i<4;i++){
			var a=parseInt(Math.random()*36);
			var b=arr1[a];
			arr2.push(b);
		}
		$("#ma").html(arr2.join(""));
	}
//看不清再来一次
	$(".again").click(function(){
		getYan();
		check();
	})
//判断验证码是否正确
	$("#yan").blur(check);
	function check(){
		if($("#yan").val()!=$("#ma").html()){
			$(".ti").eq(1).css("display","block");
		}else{
			$(".ti").eq(1).css("display","none");
		}
	}
//判断手机验证码
	$("#phonema").blur(function(){
		if(!$(this).val()){
			$(".ti").eq(2).css("display","block");
		}else{
			$(".ti").eq(2).css("display","none");
		}
	})
//判断第二种方式能否登录
	$("#login").click(function(){
		var Ar=[];
		var Br=[];
		var num=$(".ha").length;		
		$.each($(".ha"),function(i){
			if(!$(".ha").eq(i).val()){
				$(".ti").eq(i).css("display","block");
				Ar[i]=0;			
			}else{
				Ar[i]=1;
			}
		})
		var res=0;
		$.each(Ar,function(i){
			res+=Ar[i];
		})
		var reb=0;
		$.each($(".ha"),function(i){
			if($(".ti").eq(i).css("display")=="none"){
				Br[i]=1;
			}else{
				Br[i]=0;
			}
		})
		$.each(Br,function(i){
			reb+=Br[i];
		})
		if(res==num&&reb==num){
			var message=$("#phone").val();
			var key1="username";
			var value=JSON.stringify(message);
			localStorage.setItem(key1,value);
			window.location.href="index.html";
		}		
	})
})