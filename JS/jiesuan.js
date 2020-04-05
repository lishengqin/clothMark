$(function(){
	var key="Goods";
	var arr1=[];
	if(localStorage.getItem(key)){
		var arr1=JSON.parse(localStorage.getItem(key));
	}
	var key1="username";
	var username=JSON.parse(localStorage.getItem(key1));
//欢迎登陆		 
	$(".huan").html("您好,"+username);
		$("#exit").click(function(){
		var value=JSON.stringify("");
		localStorage.setItem(key1,value);
		window.close();
		window.open("index.html");
	})
// 钱和数量
	function money(){
		var ss=0;
		var mm=0;
		$(".che").each(function(i){
			if($(".che").eq(i).prop("checked")==true){				
				ss+=parseInt($(".che").parents("ul").find(".num").eq(i).val());
				mm+=parseFloat($(".che").parents("ul").find(".num").eq(i).parent().next().html());
			}			
		})
		$("#sz").html(ss+"件");
		$("#mz").html("￥"+mm.toFixed(2));
	}
// 加入购物车的物品
	var obj={};
	obj.username=username;
	var arr=[];
	if(arr1.length!=0){
		for(var i=0;i<arr1.length;i++){
			if(arr1[i].username==username){
				obj=arr1[i];
				arr=arr1[i].message;
				arr1.splice(i,1);	
			}
		}
	}
// 初始化的插入页面
	if(arr.length==0){
		$("#All").removeAttr("checked");
		$('<p style="text-align:center;font-size:40px;color:#a10;width:100%;font-weight:600;">您的购物车没有商品！</p>').appendTo($("#content"))
	}else{
		for(var i=0;i<arr.length;i++){
			var oul=$("<ul></ul>");
			oul.attr("class","goods");
			var oli=$("<li class='lsq_te'></li>");
			oli.html("<input type='checkbox' class='che' checked>");
			oli.appendTo(oul);		
			for(j in arr[i]){
				if(j=="img"){
					var s=$('<li class="lsq_te"><img src="'+arr[i].img+'" alt="" /></li>');
					s.appendTo(oul);
				}
				else if(j=="count"){
					var oli=$("<li></li>");
					oli.html('<input type="button" value="-" class="sub"><input type="text" value='+arr[i][j]+' class="num" readonly="readonly"><input type="button" value="+" class="add">');
					oli.appendTo(oul);
				}else{
					var oli=$("<li></li>");
					oli.html(arr[i][j]);
					oli.appendTo(oul);
				}			
			}
			var oli=$("<li></li>")
			var oa=$("<a href='javascript:;'>删除</a>");
			oa.appendTo(oli);
			oli.appendTo(oul);
			oul.appendTo($("#content"));
		}
	}
	money();

//这是数量加减
	$(".add").on("click",function(){
		var i=$(this).index(".add");
		var num=$(".num").eq(i).val();
		num++;
		$(".num").eq(i).val(num);			
		var pri=$(this).parent().prev().html();
		var resu=(num*pri).toFixed(2);
		$(this).parent().next().html(resu);
		arr[i].count=num;
		arr[i].res=resu;
		obj.message=arr;
		for(var s=0;s<arr1.length;s++){
			if(arr1[s].username==username){
				arr1.splice(s,1);	
			}
		}
		arr1.push(obj);
		var value=JSON.stringify(arr1);
		localStorage.setItem(key,value);
		money();
	})
// 数量减
	$(".sub").on("click",function(){
		var i=$(this).index(".sub")
		var num=$(".num").eq(i).val();
		num--;
		if(num<1){
			num=1;
		}
		$(".num").eq(i).val(num);
		var pri=$(this).parent().prev().html();
		var resu=(num*pri).toFixed(2);
		$(this).parent().next().html(resu);
		arr[i].count=num;
		arr[i].res=resu;
		obj.message=arr;
		for(var s=0;s<arr1.length;s++){
			if(arr1[s].username==username){
				arr1.splice(s,1);	
			}
		}
		arr1.push(obj);
		var value=JSON.stringify(arr1);
		localStorage.setItem(key,value);
		money();
	})
//删除点击事件
	$("a").click(function(){
		var i=$(this).parents("ul").index();
		var n=arr.length;			
		arr.splice(i,1);
		obj.message=arr;
		for(var s=0;s<arr1.length;s++){
			if(arr1[s].username==username){
				arr1.splice(s,1);	
			}
		}
		arr1.push(obj);
		var value=JSON.stringify(arr1);
		localStorage.setItem(key,value);
		$(this).parents("ul").remove();
		money();
		if($(".che:lt("+n+"):checked").length==$(".che").length){
			 $("#All").prop("checked",true);
		}
		if(arr.length==0){
			$('<p style="text-align:center;font-size:40px;color:#a10;width:100%;font-weight:600;">您的购物车没有商品！</p>').appendTo($("#content"));
			$("#All").prop("checked",false);
		}		
	})
//全选框
	$("#All").click(function(){
		if($(this).prop("checked")){
			$("input[type='checkbox']").prop("checked",true);
		}else{
			$("input[type='checkbox']").prop("checked",false);
		}
	})
	$("input[type='checkbox']").click(function(){
		$(".tishi").css("display","none")
		money();
		var i=arr.length;
		if($(this).prop("checked")==false){
			$("#All").prop("checked",false);
		}else if($(".che:lt("+i+"):checked").length==$(".che").length){
			$("#All").prop("checked",true);
		}
	})
//继续购物
	$("#cont").click(function(){
		window.location.href="index.html";
	})
//提价订单
	$("#suan").click(function(){
		var lsq_arr=JSON.parse(localStorage.getItem("Goods"));
		var need_obj={};
		var buy=[];
		var name=JSON.parse(localStorage.getItem("username"));
		var name_index=-1;
		$.each(lsq_arr,function(n){
			if(lsq_arr[n].username==name){
				need_arr=lsq_arr[n];
				name_index=n;
			}
		})
		var mes_arr=need_arr.message;
		$.each($(".che"),function(n){
			if($(".che").eq(n).prop("checked")==true){
				buy.push(mes_arr[n])
			}
		})
		if(buy.length!=0){
			$(".tishi").css("display","none")
			need_arr.buy=buy;
			lsq_arr[name_index]=need_arr;
			localStorage.setItem("Goods",JSON.stringify(lsq_arr));
			window.location.href="buy.html";
		}else{
			$(".tishi").css("display","block")
		}	
	})	
})