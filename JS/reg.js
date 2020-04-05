$(function(){
	var arr=[0,0,0,0,0,0];
//获得验证码
	getYan();
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
		$(".poma").html(arr2.join(""));
	}
	$(".poma").click(function(){
		getYan();
		check();
	})
//1判断验证码是否正确
	$("#num").blur(check);
	function check(){
		if($("#num").val()!=$(".poma").html()){
			$(".shi").eq(0).css("display","block");
			arr[0]=0;
		}else{
			$(".shi").eq(0).css("display","none");
			arr[0]=1;
		}
	}

//2获得手机验证码
	$("#tel").blur(function(){
		var  lsq_arr;
	  	var  index=-1;
	  	if(!/^1(3|4|5|7|8)\d{9}$/.test($(this).val())){
	  		arr[1]=0;
	  		$(".shi").eq(1).html("!请输入正确的手机号").css("display","block")
	  	}else if(localStorage.getItem("userformation")){
			lsq_arr=JSON.parse(localStorage.getItem("userformation"));
			for(var i=0;i<lsq_arr.length;i++){
				if(lsq_arr[i].username==$(this).val()){
		  			index=i
				}
			}
			if(index!=-1){
				$(".shi").eq(1).html("!该用户已被注册").css("display","block")
		  		arr[1]=0;
			}else{
	  			$(".shi").eq(1).css("display","none")
	  			$("#getma").click(function(){	
	  				var timer=null;	
	  				var num=10;	
					timer=setInterval(function(){
						$("#getma").off("click")
						num--;
						$("#getma").html(num+"秒后重新获得");
						if(num<0){
							$("#getma").html("获取短信验证码");
							clearInterval(timer);
						}
					},1000)
				})
	  			arr[1]=1
			}
	 	}else{
	 		$(".shi").eq(1).css("display","none")
	  		$("#getma").click(function(){
	  			var timer=null;
				var num=10;
				timer=setInterval(function(){
					$("#getma").off("click")					
					num--;
					$("#getma").html(num+"秒后重新获得");
					if(num<0){
						$("#getma").html("获取短信验证码");
						clearInterval(timer);
					}
				},1000)
			})
	  		arr[1]=1
	  	}	
	})
//3判断手机验证码
	$("#phonema").blur(function(){
		if(!$(this).val()){
			$(".shi").eq(2).css("display","block");$(".shi").eq(2).css("display","block");
			arr[2]=0
		}else{
			$(".shi").eq(2).css("display","none");
			arr[2]=1
		}
	})
//4设定登录密码
	$("#setmi").blur(function(){
		var setmi=$("#setmi").val();
		var reg=/^[0-9a-zA-Z]{6,10}$/;
		if(!reg.test(setmi)){
			$(".shi").eq(3).css("display","block");
			arr[3]=0
		}else{
			$(".shi").eq(3).css("display","none");
			arr[3]=1
		}
	})
//5判断第二次输入密码是否一致
	$("#twomi").blur(function(){
		var setmi=$("#setmi").val();
		if($(this).val()!=setmi){
			$(".shi").eq(4).css("display","block");
			arr[4]=0
		}else{
			$(".shi").eq(4).css("display","none");
			arr[4]=1
		}
	})
//6判断是否读了条款
	$(".xuan").click(function(){
		if($("input[type='checkbox']").prop("checked")){
			$(".shi").eq(5).css("display","none");
			arr[5]=1
		}else{
			$(".shi").eq(5).css("display","block");
			arr[5]=0
		}
	})
//注册成功
	var array=[];
	var key="userformation";
	//判断，当重开网页是添加信息不会覆盖之前的
    var oldlocal=JSON.parse(localStorage.getItem(key));
    if(localStorage.getItem(key)){
    	for(var i=0;i<oldlocal.length;i++){
    	array.push(oldlocal[i]);
        }
    }
	$("#reg").click(function(){
		var sum=0;
		$.each(arr,function(n){
			sum+=arr[n];
			if(arr[n]==0){
				$(".shi").eq(n).css("display","block")
			}else{
				$(".shi").eq(n).css("display","none")
			}
		})
		if(sum==arr.length){
				var tel=$("#tel").val();
				var pass=$("#setmi").val();
				var obj={username:tel,password:pass};
				var key1="username";
				var val=JSON.stringify(tel);
					localStorage.setItem(key1,val);
				array.push(obj);
				var value=JSON.stringify(array);
				localStorage.setItem(key,value);
				document.location.href="index.html";	
		}		
	})

})