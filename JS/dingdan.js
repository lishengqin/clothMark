if(!localStorage.getItem("username")||JSON.parse(localStorage.getItem("username"))==""){
	$("<p style='text-align:center;line-height:50px;color:#a10;font-size:30px;'>！您目前还没有登陆，<a href='login.html' style='color:#a10'>请前往登陆吧！</a></p>").appendTo($(".con"))	
}else{
	var username=JSON.parse(localStorage.getItem("username"));
	var arr=JSON.parse(localStorage.getItem("Goods"));
	var ding=[];
	$.each(arr,function(n){
		if(username==arr[n].username){
			if(arr[n].ding){
				ding=arr[n].ding
			}
		}
	}) 
	if(ding.length!=0){
		$.each(ding,function(n){
			var buy=[];//商品
			$('<div class="every"><div class="title">订单总额：<span class="money"></span><span class="time"></span></div><div class="goods_list_title"><p>商品名称</p><p>尺码</p><p>单价</p><p>数量</p><p>小计</p></div><ul class="goods_list goods_list_title"></ul><ul class="type"><li>支付方式：<span class="zhi"></span></li><li>配送方式：<span class="pei"></span></li></ul><div class="person"><p>收货人：<span class="name"></span><span class="phone"></span></p><p>收获地址：<span class="address"></span></p></div></div>').appendTo($(".con"));
			var forma=ding[n][ding[n].length-1];
			for(var i=0;i<ding[n].length-1;i++){
				buy.push(ding[n][i])
			}
			var money_res=0;
			$.each(buy,function(ss,val){
				$('<li><p>'+val.goodName+' </p><p>'+val.size+'</p><p>'+val.price+'</p><p>'+val.count+'</p><p>'+val.res+'</p></li>').appendTo($(".goods_list").eq(n));
				money_res+=parseFloat(val.res);
				$(".money").eq(n).html("￥"+money_res.toFixed(2)+"元")
			})
			$(".time").eq(n).html(forma.time)
			$(".phone").eq(n).html(forma.address.phone)
			$(".name").eq(n).html(forma.address.name)
			$(".zhi").eq(n).html(forma.zhi)
			$(".pei").eq(n).html(forma.pei)
			$(".address").eq(n).html(forma.address.di)
		})	
	}else{
		$("<p style='text-align:center;line-height:50px;color:#a10;font-size:30px;'>！您目前还没有订单，<a href='index.html' style='color:#a10'>请前往商城购物吧！</a></p>").appendTo($(".con"))		
	}
}	
		
		