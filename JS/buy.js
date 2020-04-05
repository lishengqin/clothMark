$(function(){
	var provinceList=[];//选择地区
	var provinceIndex;//选择地区
	var ti=[0,0,0];//判断能否提交
	var tishi=[0,0,0,0];//判断能否提交
	var h=$(document).height();
	$(".write_box").height(h);
//地址初始化
	var username=JSON.parse(localStorage.getItem("username"));
	var arr1=JSON.parse(localStorage.getItem("Goods"));
	var obj={};
	var address=[];
	var buy=[];
	var mes=[];
// 有地址，放进页面
	function lsq_address(){
		var lsq_indexx=-1;
		if(localStorage.getItem("Goods")){
			$.each(arr1,function(n){
				if(arr1[n].username==username){
					obj=arr1[n];
					buy=obj.buy;
					mes=obj.message;
					lsq_indexx=n;
				}
			})
			arr1[lsq_indexx]=obj;
			localStorage.setItem("Goods",JSON.stringify(arr1));
			if(obj.address){
				if(obj.address.length!=0){
					$(".have_list").html("")
					address=obj.address;
					$.each(address,function(n){
						if(n>=3){
							$(".show_more").css("display","inline-block")
						}else{
							$(".show_more").css("display","none")
						}
						$('<li><p class="have_name">'+address[n].name+'</p><p>'+address[n].tel+'</p><p>'+address[n].addr+'</p><p>'+address[n].moreaddr+'</p><button class="edit">编辑</button><button class="delete">删除</button></li>').appendTo($(".have_list"))
					})
					$(".have_list li").eq(0).addClass("have_active").siblings().removeClass("have_active")
					$(".have").css("display","block");
					$(".none").css("display","none");
					// h3高度
					$.each($(".lsq_for"),function(n){
						var h=$(".for_right").eq(n).height();
						$(".for_left").eq(n).css("lineHeight",h+"px")
					})
			 	}else{
			 		$.each($(".lsq_for"),function(n){
						var h=$(".lsq_for").eq(n).height();
						$(".for_left").eq(n).css("lineHeight",h+"px")
					})
					$(".have").css("display","none");
					$(".none").css("display","block");
			 	}
			}	
			//插入商品
			var money_res=0;
			$(".goods_list").html("")
			$.each(buy,function(n,val){
				$('<li><p>'+val.goodName+' </p><p>'+val.size+'</p><p>'+val.price+'</p><p>'+val.count+'</p><p>'+val.res+'</p></li>').appendTo($(".goods_list"));
				money_res+=parseFloat(val.res);
				$(".money").html("￥"+money_res.toFixed(2)+"元")
			})
			if($(".have_list").children().length==0){
				$(".my_money").html("￥0.00")
			}else{
				$(".my_money").html("￥"+money_res.toFixed(2)+"元")
			}
		}
	}
	lsq_address();	
//编辑
//地区的ajax
	$.ajax({
		type:"get",
		url:"../JSON/province.json",
		dataType: 'JSON',
		success:function(data){
			provinceList=data;
			$(".province").focus(function(){
		    	$(this).html('<option value="">请选择省份</option>');
		    	for(var i=0;i<provinceList.length;i++){
		    	    $("<option>"+provinceList[i].name+"</option>").appendTo($(this))
		        }	       
		    })
		    $(".province").change( function(event){
		    	$(".city").html('<option value="">请选择城市</option>');
		    	$(".area").html('<option value="">请选择地区</option>');
		    	var str=$(this).val();
		    	provinceIndex=$(this).get(0).selectedIndex-1;
		    	if(!str){
		    		$(".di").css("display","none");
		    	}else{
		    		$(".di").eq(0).html(str).css("display","inline-block").siblings($(".di")).css("display","none")
		    	}
		    	if(provinceIndex>=0){
		    		var citys=provinceList[provinceIndex].cityList;
		    		for(var i=0;i<citys.length;i++){
		    			$("<option>"+citys[i].name+"</option>").appendTo($(".city"))
		    		}
		    	}else{
		    		$(".city").html('<option value="">请选择城市</option>');
		    		$(".area").html('<option value="">请选择地区</option>');
		    	}	
		    })
		    $(".city").change(function(){
		    	$(".area").html('<option value="">请选择地区</option>');
		    	var cityIndex=$(this).get(0).selectedIndex-1;
		    	var str=$(this).val();
		    	if(!str){
		    		$(".di").eq(1).css("display","none");
		    		$(".di").eq(2).css("display","none");
		    	}else{
		    		$(".di").eq(1).html(str).css("display","inline-block");
		    		$(".di").eq(2).css("display","none");
		    	}
		    	if(cityIndex>=0){
		    		var areas=provinceList[provinceIndex].cityList[cityIndex].areaList;
		    		for(var i=0;i<areas.length;i++){
		    			$("<option>"+areas[i]+"</option>").appendTo($(".area"))
		    		}
		    	}else{
		    		$(".area").html('<option value="">请选择地区</option>');
		    	}		    	
		    })
		    $(".area").change(function(){
		    	var str=$(this).val();
		    	if(!str){
		    		$(".di").eq(2).css("display","none");
		    	}else{
		    		$(".di").eq(2).html(str).css("display","inline-block");
		    	}
		    })
		}
	})
// 收获地址提示
	var flag=[1,1,1];
	$(".local").blur(function(){
		var i=$(this).index();
		var str=$(this).val();
		flag[i]=0;
		if(!str){
			$(".ti").eq(i).css("display","inline-block");
			ti[i]=0;
			$(".ti").parent().css("height","26px");
		}else{
			$(".ti").eq(i).css("display","none");
			ti[i]=1;
			var sum=0;
			var su=0;
			$.each(ti,function(n){
				sum+=ti[n]
			})
			$.each(flag,function(n){
				su+=flag[n]
			})
			if(sum==3||su!=0){
				$(".ti").parent().css("height","0px");
			}else{
				$(".ti").parent().css("height","26px");
			}
		}
	})
//姓名
	$(".name").blur(function(){
		if(!$(this).val()){
			$(".tishi").eq(0).css("display","inline-block");
			tishi[0]=0;
		}else{
			$(".tishi").eq(0).css("display","none");
			tishi[0]=1;
		}
	})
//详细地址
	$(".address").blur(function(){
		$.each(ti,function(n){
			if(ti[n]==0){
				$(".ti").eq(n).css("display","inline-block");
				$(".ti").parent().css("height","26px");
				flag[n]=0;
			}
		})
		if(!$(this).val()){
			$(".tishi").eq(1).css("display","inline-block");
			tishi[1]=0;
		}else{
			$(".tishi").eq(1).css("display","none");
			tishi[1]=1;
		}
	})
//邮政编码
	$(".zheng").blur(function(){
		var reg=/^[1-9]\d{5}$/;
		if(!reg.test($(this).val())){
			$(".tishi").eq(2).css("display","inline-block");
			tishi[2]=0;
		}else{
			$(".tishi").eq(2).css("display","none");
			tishi[2]=1;
		}
	})
	$(".tel").blur(function(){
		var reg=/^1[3|4|5|8][0-9]\d{4,8}$/;
		if(!reg.test($(this).val())){
			$(".tishi").eq(3).css("display","inline-block");
			tishi[3]=0;
		}else{
			$(".tishi").eq(3).css("display","none");
			tishi[3]=1;
		}
	})
//编辑框初始化
	function write_load(){
		$(".name").val("");
		$(".province").html('<option value="">请选择省份</option>');
		$(".city").html('<option value="">请选择城市</option>');
		$(".area").html('<option value="">请选择地区</option>');
		$(".di").html("").css("display","none");
		$(".address").val("");
		$(".zheng").val("");
		$(".tel").val("");
		$(".tishi").css("display","none");
		$(".ti").css("display","none")
		ti=[0,0,0];
		tishi=[0,0,0,0];
	}
//编辑出现(添加)
	var lsq_flag=0;
	$(".none").click(function(){
		$(".write_box").css("display","block");
		lsq_flag=0;
	})
	$(".add_new").click(function(){
		$(".write_box").css("display","block");
		lsq_flag=0;
	})
//编辑出现(每个编辑按钮)
	var edit_index;//修改的下标
	$(".have").on("click",".edit",function(e){
		e.stopPropagation();
		$(".write_box").css("display","block");
		lsq_flag=1;
		edit_index=$(this).index(".edit");
	})
//删除收获地址
	$(".have").on("click",".delete",function(e){
		e.stopPropagation();
		var dele_index=$(this).index(".delete");
		var bool=confirm("您确定删除第"+Number(dele_index+1)+"个收获地址吗？");
		if(bool){
			address.splice(dele_index,1);
			$(".have li").eq(dele_index).remove();
			obj.address=address;
			lsq_address();
		}
	})
//关闭编辑
	$(".close").click(function(){
		write_load();
		$(".write_box").css("display","none");
	})
// 提交
	$(".sure").click(function(){
		var sum1=0;
		var sum2=0;
		for(var i=0;i<tishi.length;i++){
			sum1+=tishi[i];
			if(sum1!=tishi.length&tishi[i]==0){
				$(".tishi").eq(i).css("display","inline-block");
			}
		}
		for(var i=0;i<ti.length;i++){
			sum2+=ti[i];
			if(sum2!=ti.length&ti[i]==0){
				$(".ti").eq(i).css("display","inline-block");
				$(".ti").parent().css("height","26px");
				flag[i]=0;
			}
		}
		if(sum1==tishi.length&&sum2==ti.length){
			var name=$(".name").val();
			var tel=$(".tel").val();
			var di="";
			$.each($(".di"),function(n){
				di+=$(".di").eq(n).html()+" ";
			})
			var moreaddr=$(".address").val()+"("+$(".zheng").val()+")";
			write_load();
			 $(".write_box").css("display","none");
			if(lsq_flag==0){
				address.unshift({"name":name,"tel":tel,"addr":di,"moreaddr":moreaddr});
				obj.address=address;
				lsq_address();
			}else if(lsq_flag==1){
				var newobj={"name":name,"tel":tel,"addr":di,"moreaddr":moreaddr};
				address[edit_index]=newobj;
				obj.address=address;
				lsq_address();
			}
		}
	})
//显示更多
var show=true;
	$(".show_more").click(function(){
		if(show){
			$(".have_list").css("height","auto");
			$(".for_left").eq(0).css("lineHeight",$(".lsq_for").eq(0).height()+"px");
			$(this).html("《 取消更多");
			show=false;
		}else{
			$(".have_list").css("height","220px");
			$(".for_left").eq(0).css("lineHeight",$(".for_right").eq(0).height()+"px");
			$(this).html("《 显示更多");
			show=true;
		}
					
	})
//选择
	$(".have").on("click","li",function(){
		$(this).addClass("have_active").siblings().removeClass("have_active")
	})
	$(".have_pei li").click(function(){
		$(this).addClass("have_active").siblings().removeClass("have_active")
	})	
	$(".have_zhi li").click(function(){
		$(this).addClass("have_active").siblings().removeClass("have_active")
	})
//提交订单
	$(".buy-btn").click(function(){
		if($(".have_list").children().length==0){
			$("html,body").animate({"scrollTop":"0px"},1000)
		}else{
			var lsq_index=[];
			for(var i=0;i<buy.length;i++){
				for(var j=0;j<mes.length;j++){
					if(mes[j].goodName==buy[i].goodName&&mes[j].size==buy[i].size){
						lsq_index.push(j)
					}
				}
			}
			for(var n=0;n<lsq_index.length;n++){
				mes[lsq_index[n]]=1;
			}
			for(var m=0;m<mes.length;m++){
				if(mes[m]==1){
					mes.splice(m,1);
					m=-1;
				}
			}
			var username=JSON.parse(localStorage.getItem("username"));
			var arrr=JSON.parse(localStorage.getItem("Goods"));
			var cb_adress=$(".have_list .have_active p");
			function z(n){
				if(n<10){
					return "0"+n
				}else{
					return n
				}
			}
			var my=new Date();
			var time=my.getFullYear()+"-"+z(my.getMonth()+1)+"-"+z(my.getDate())+" "+z(my.getHours())+":"+z(my.getMinutes())+":"+z(my.getSeconds())
			var lsq_obj={pei:$(".have_pei .have_active").html(),zhi:$(".have_zhi .have_active").html(),time:time,address:{name:$(cb_adress).eq(0).html(),phone:$(cb_adress).eq(1).html(),di:$(cb_adress).eq(2).html()+" "+$(cb_adress).eq(3).html()}}
			buy.push(lsq_obj);
			$.each(arrr,function(n){
				if(arrr[n].username==username){
					arrr[n].message=mes;
						arrr[n].ding.unshift(buy);
				}
			})
			localStorage.setItem("Goods",JSON.stringify(arrr))
			window.location.href="success.html"
		}
	})
})