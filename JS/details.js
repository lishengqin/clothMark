$(function(){
    var goodsId = window.location.search.split("=")[1];
    var viewsrc=[];
    var bigviewsrc=[];
    var imgpl=[];//图片评论信息
    var pl=[];
    var firstcolor="";
    var nowdata=[];//存储后台所有的信息
    //提问分页
    var tw_pagenum=3//每页显示数量
    var que_res=null;//提问所有的信息
    var tw_n=1; //当前页码 
    var tw_pages; //共有多少页 
    //评论
    var pl_pagenum=4
    var pl_res=null;
    var pl_n=1;
    var pl_pages;                    
    $.ajax({
        url:"../JSON/detail.json",
        type:"get",
        success:function(data){
            $.each(data,function(i){
                if(data[i]["goodsId"]==goodsId){
                    nowdata.push(data[i])
                }
            })
             $.each(nowdata,function(i,item){
                firstcolor=item["goodName"].split(" ").slice(-1);
            })
            loader();   
        }
    })
//锚点
    $(".anchor a").click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top-46},1000);
    });
//图片选择
    $(".thumbnail").on("mouseover","li",function(){
        $(".thumbnail li").css("border","1px solid #B4B4B4");
        $(".thumbnail span").css("border","1px solid #fff");
        $(this).find("span").css("border","1px solid #a10000");
        $(this).css("border","1px solid #a10000");
        $(".view img").attr("src",viewsrc[$(this).index()]);
        $(".bigview img").attr("src",bigviewsrc[$(this).index()])
    })
//缩略图翻页
    $(".up").click(function(){
         $(".down").css("border-color","#a10000 transparent")
        var t=$(".thumbnail").position().top;
        if(t){
            $(".thumbnail").animate({"top":t+83+"px"}, 100)
        }
        if(t+83==0){
           $(".up").css("border-color","#ccc transparent")
        }
    })
    $(".down").click(function(){
        $(".up").css("border-color","#a10000 transparent")
        var num=$(".thumbnail").children().length;
        var t=$(".thumbnail").position().top;
        if(-t!=(num-5)*83){
            $(".thumbnail").animate({"top":t-83+"px"}, 100)
        }
        if(-(t-83)==(num-5)*83){
             $(".down").css("border-color","#ccc transparent")
        }
    })
//放大镜+吸顶
    $(".view").hover(function(){
        $(".bigview").css("display","block");
        $(".mark").css("display","block");
    },function(){
        $(".bigview").css("display","none");
        $(".mark").css("display","none");
    })
    $(".glass").mousemove(function(event){
        var e = event||window.event;
        var l=e.offsetX-$(".mark").width()/2;
        var t=e.offsetY-$(".mark").height()/2;
        var maxl=$(".glass").width()-$(".mark").width();
        var maxt=$(".glass").height()-$(".mark").height();
        if(l<0){
            l=0;
        }
        if(l>maxl){
            l=maxl;
        }
        if(t<0){
            t=0;
        }
        if(t>maxt){
            t=maxt;
        }
        $(".mark").css({"left":l,"top":t});
        var bx=l/maxl;
        var by=t/maxt;
        var imgw=$(".bigview img").width();
        var imgh=$(".bigview img").height();
        var bvw=$(".bigview").width();
        var bvh=$(".bigview").height();
        $(".bigview img").css({"left":-(imgw-bvw)*bx,"top":-(imgh-bvh)*by})
    })
    $(window).scroll(function(event) {
        var st=$(window).scrollTop();
        var bvt=$(".bigview").offset().top;
        var glt=$(".goods_l").offset().top;
        if(st>150&&st<670){
            $(".bigview").css("top",(90+st)-glt)
        }else if(st<150){
           $(".bigview").css("top",-80)
        }
        if(st>670){
            $("#xiding").css("display","block");
        }else {
           $("#xiding").css("display","none");
        }
    });
//选择颜色
    $(".selectColor").on("click",".color",function(){
        firstcolor=$(this).find("p").html();
        loader();
    })
//选择尺码
    $(".selectSize ul").on("mouseover","li",function(){
        $(this).css("border","1px solid #a10000");
    })
    $(".selectSize ul").on("mouseout","li",function(){
        if(!$(this).find("span").prop("class")){
            $(this).css("border","1px solid #C8C8C8");
        }
    })
    $(".selectSize ul").on("click","li",function(){
        $(".selectSize ul li").css("border","1px solid #C8C8C8");
        $(".selectSize ul li p").css("border","1px solid #fff");
        $(".selectSize span").attr("class","")
        $(this).css("border","1px solid #a10000");
        $(this).find("p").css("border","1px solid #a10000");
        $(this).find("span").attr("class","onchecked");
        $(".selectsize").html("，"+$(this).find("p").html());
        $(".error").css("display","none")
    })
//选择数量
    var selnum=1;
    $("#selnum").change(function(){
        selnum=Number($(this).val());
    });

//评论选择
    $("#allpl").click(function(){
        $(".new input:not(#allpl)").prop("checked",false)
        pl_n=1;
        load_img(pl_res)
        pl_pages=Math.ceil(pl_res.length/pl_pagenum);  // 页数
        append_li(pl_pages);
        $(".tishi").eq(0).html("")
    })
    $("#picpl").click(function(){
        $(".new input:not(#picpl)").prop("checked",false)
        pl_n=1;
        load_img(imgpl)
        pl_pages=Math.ceil(imgpl.length/pl_pagenum);  // 页数
        append_li(pl_pages);
        $(".tishi").eq(0).html("")
    })
//据颜色读数据
    function loader(){
        //清空
        $(".up").css("display","none");
        $(".down").css("display","none");
        viewsrc=[];
        bigviewsrc=[];
        imgpl=[]
        $(".thumbnail").html("");
        $(".color").remove();
        $(".lsq_type").html("")
        $(".selectSize ul").html("");
        $(".view img").remove();
        $(".yhts ul").html("");
        $(".pics").html("");
        $(".hotgoods ul").html("");
        $(".allpl").html("");
        $(".allque").html("");
        $("#lsq_title").html("");
        $.each(nowdata,function(i,item){
            //插入商品名
            $(".lsq_type").html(item["type"]);
            var href=item["href"];
            $(".lsq_type").attr("href","list.html?"+href);
            var lsq_str=item["goodName"].split(" ").slice(0,-1).join(" ");
            $(".goodName").eq(1).html(lsq_str);
            $("#lsq_title").html(lsq_str)
            $.each(item["info"],function(n,val){
            //插入颜色种类
                $("<div class='color' title='"+val["color"]+"'><div class='blankbd'><span style='background: url("+val["spsrc"]+") no-repeat 0 "+(-n*36)+"px;'></span><p>"+val["color"]+"</p><b class=''></b></div></div>").appendTo($(".selectColor"))
            //插入首选信息
                if(firstcolor==val["color"]){
                    $(".selectName").html(firstcolor);
                    $(".goodsNum").html(val["goodsNum"])
                //商品名
                    $(".goodName").eq(2).html(item["goodName"].split(" ").slice(0,-1).join(" ")+" "+val["color"]);
                    $(".goodName").eq(2).attr("title",item["goodName"].split(" ").slice(0,-1).join(" ")+" "+val["color"])
                    $(".goodName").eq(0).html(item["goodName"].split(" ").slice(0,-1).join(" ")+" "+val["color"]);
                    $(".goodName").eq(0).attr("title",item["goodName"].split(" ").slice(0,-1).join(" ")+" "+val["color"])
                //价格
                    $("#price").html(val["price"]);
                //颜色
                    $(".color").eq(n).css("border","1px solid #a10000")
                    $(".color").eq(n).find(".blankbd").css("border","1px solid #a10000");
                    $(".color").eq(n).find("b").attr("class","onchecked")
                //尺码
                    for(var j=0;j<val["size"].length;j++){
                        $("<li><p>"+val["size"][j]+"</p><span class=''></span></li>").appendTo($(".selectSize ul"));
                    }
                //缩略小图
                    for(var j=0;j<val["thumsrc"].length;j++){
                        if(j==0){
                            $('<li style="border:1px solid #a10000"><span style="border:1px solid #a10000"><img src="'+val["thumsrc"][j]+'" id="img"></span></li>').appendTo($(".thumbnail"));
                        }else{
                            $('<li><span><img src="'+val["thumsrc"][j]+'"></span></li>').appendTo($(".thumbnail"));
                        }
                        if(j>4){
                            $(".up").css("display","block");
                            $(".down").css("display","block");
                        }
                    }
                //预览中图
                    for(var j=0;j<val["view"].length;j++){
                        viewsrc.push(val["view"][j]);
                        if(j==0){
                             $('<img src="'+val["view"][j]+'" title="'+val["goodName"]+'">').appendTo($(".view"));
                        }
                    }
                //大图
                    for(var j=0;j<val["bigview"].length;j++){
                        if(j==0){
                            $(".bigview img").attr("src",val["bigview"][j])
                        }
                        bigviewsrc.push(val["bigview"][j]);
                    }
                //优惠信息
                    for(var j=0;j<val["youhui"].length;j++){
                        $("<li>"+val["youhui"][j]+"</li>").appendTo(".yhts ul")
                    }
                //产品描述
                    for(var j=0;j<val["pics"].length;j++){
                        $("<img src="+val["pics"][j]+">").appendTo($(".pics"))
                    }
                //推荐产品
                    for(var j=0;j<val["tuijian"].length;j++){
                       $("<li><a href='javascript:;'><img src='"+val["tuijian"][j]["src"]+"' title='"+val["tuijian"][j]["goodname"]+"'></a><h3><a href='javascript:;'>"+val["tuijian"][j]["goodname"]+"</a></h3><p>"+val["tuijian"][j]["price"]+"</p></li>").appendTo($(".hotgoods ul"))
                    }
                }
        })
    //评论  
        var imgplnum=0;
        pl_res=item["pingjia"];
        $.each(pl_res,function(n,val){
            if(val["img"][0]){
                imgplnum++;
                imgpl.push(val);
            }
            $("#plnum").html(n+1);
            $("#picPlnum").html(imgplnum);
        })
        pl_pages=Math.ceil(pl_res.length/pl_pagenum);  // 页数
        append_li(pl_pages);
        load_img(pl_res)
    //提问
        que_res=item["question"];
        var twnum=que_res.length;
        $("#twnum").html(twnum);
        tw_pages = Math.ceil(twnum/tw_pagenum);  // 页数
        $(".lsq_sum").html(tw_pages)
        load_question()                                      
        })
    }
// 提问分页
    function load_question(){
        $(".allque").html("")
        for (var n =tw_pagenum*(tw_n-1) ; n <tw_pagenum*tw_n; n++) {
            if(n<que_res.length){
                $("<div class='question'><div class='userque'><span class='Q'>Q</span><span>"+que_res[n]["userid"]+"："+que_res[n]["msg"]+"</span><div class='tw_fr'><span>"+que_res[n]["date"]+"</span><a href='javascript:;'>我要回复（0）</a></div></div><div class='adminask'><span class='A'>A</span><p class='ask'>"+que_res[n]["ask"]+"</p></div></div>").appendTo($(".allque"))        
            }
        } 
        $(".lsq_num").html(tw_n);       
    }
//下键
    $(".next2").click(function(){
        tw_n++;
        if(tw_n>tw_pages){
            tw_n=tw_pages;
            $(".tishi").eq(1).html("！已经是最后一页")
        }else{
            $(".tishi").eq(1).html("") 
        }
        load_question()
    })
// 上键
    $(".prebtn").click(function(){
        tw_n--;
        if(tw_n<1){
            tw_n=1;
            $(".tishi").eq(1).html("！已经是第一页")
        }else{
            $(".tishi").eq(1).html("") 
        }
        load_question()
    })
//确定键
    $(".btnCon button ").click(function(){
        var tw_inp=$(".lsq_input").val();
        if(isNaN(tw_inp)||tw_inp<1||tw_inp>tw_pages||tw_inp%1!=0){
           $(".tishi").eq(1).html("！请先输入正确的页数")  
        }else{
           $(".tishi").eq(1).html("");
           tw_n=tw_inp;
           load_question()
        } 
    })
//评论
    //页
    function append_li(n){
        $("#pl_list").html("")
        for (var i =1; i<=n; i++) {
            if(i==1){
                $("<li class='pl_active'>"+i+"</li>").appendTo($("#pl_list"))
            }else{
               $("<li>"+i+"</li>").appendTo($("#pl_list")) 
            }
        }
    }
    //内容
    function load_img(res){
        $(".allpl").html("");
        for (var i =pl_pagenum*(pl_n-1) ; i <pl_pagenum*pl_n; i++) {
            if(i<res.length){ 
                $(" <div class='pl'><div class='content'><div class='con_fl'><p>"+res[i]["msg"]+"</p><ul></ul><p class='date'>"+res[i]["date"]+"</p></div><div class='con_fr'><p>颜色："+res[i]["info"]["颜色"]+"<span></span></p><p>尺码："+res[i]["info"]["尺码"]+"</p><p>身高："+res[i]["info"]["身高"]+"</p><p>体重："+res[i]["info"]["体重"]+"</p><p class='pingjia'>"+res[i]["info"]["评价"]+"</p></div></div><div class='user'><a href='javascript:;' style='margin-left:10px;'>"+res[i]["userid"]+"</a><div class='vip' style='background:url("+res[i]["vipsrc"]+") no-repeat 0 "+res[i]["vip"]*(-14)+"px'></div></div></div>").appendTo($(".allpl"));
                if(res[i]["img"][0]){
                    for(var j=0;j<res[i]["img"].length;j++){
                        $("<li><img src='"+res[i]["img"][j]+"'></li>").appendTo($(".con_fl ul").eq(i-(pl_n-1)*pl_pagenum))
                    }
                }      
            }
        }
    }
    //页点击
    $("#pl_list").click(function(event){
        var e=event||window.event;
        pl_n=event.target.innerHTML
        if($("#picpl").prop("checked")==true){
            load_img(imgpl)
        }else{
            load_img(pl_res)
        }
        $(".tishi").eq(0).html("")
        $(this).children().removeClass("pl_active");
        $(this).children().eq(pl_n-1).addClass("pl_active")
    })
    //下键
    $(".next1").click(function(){
        pl_n++;
        if($("#picpl").prop("checked")==true){
            if(pl_n>pl_pages){
                pl_n=pl_pages;
                $(".tishi").eq(0).html("!已经是最后一页了")
            }else{
                $(".tishi").eq(0).html("")
            }
            load_img(imgpl)
        }else{
            if(pl_n>pl_pages){
                pl_n=pl_pages;
                $(".tishi").eq(0).html("!已经是最后一页了")
            }else{
                $(".tishi").eq(0).html("")
            }
            load_img(pl_res)
        }
        $("#pl_list").children().removeClass("pl_active");
        $("#pl_list").children().eq(pl_n-1).addClass("pl_active")
    })
//加入购买
    function lsq_add(){
        var arr1=JSON.parse(localStorage.getItem("Goods"));
        var username=JSON.parse(localStorage.getItem("username"));
        var arr=[];
        var shu=0;
        var qian=0;
        for(var i=0;i<arr1.length;i++){
            if(arr1[i].username==username){
                arr=arr1[i].message;
            }
        }
        $.each(arr,function(n,val){
            shu+=val.count;
            qian+=Number(val.res);
        })
        $(".lsq_shu").html(shu);
        $(".lsq_qian").html("￥"+qian.toFixed(2));
        $(".buy_box").css("display","block")
    }
    $(".close").click(function(){
        $(".buy_box").css("display","none")
    })
    
//购买
    $(".nowbuy").click(function(){
        var username=JSON.parse(localStorage.getItem("username"));
        if(!$(".selectsize").html()){
             $(".error").eq(0).css("display","block");
        }else if(!username){
            $(".error").eq(1).css("display","block");
        }else{
            var arr=[];//最的数组
            var key ="Goods";
            var obj1={};//对象老大
            obj1.username=username;
            obj1.message=[];
            obj1.address=[];
            obj1.ding=[];
            var oldlocal=JSON.parse(localStorage.getItem(key));
            if(localStorage.getItem(key)){
                for(var i=0;i<oldlocal.length;i++){
                    if(oldlocal[i].username==username){
                        obj1.message=oldlocal[i].message;
                        if(oldlocal[i].address){
                            obj1.address=oldlocal[i].address;
                        }
                        if(oldlocal[i].ding){
                            obj1.ding=oldlocal[i].ding;
                        }
                    }else{
                        arr.push(oldlocal[i]);
                    }
                 }
            }
            var obj={};
            obj.img=$("#img").attr("src");
            obj.goodName=$(".goodName").html();
            obj.size=$(".selectsize").html().slice(1);
            obj.price=$("#price").html();
            obj.count=selnum;
            obj.res=(($("#price").html())*selnum).toFixed(2);
            if(!localStorage.getItem(key)){
                obj1.message.push(obj);
                arr.push(obj1);
                var value=JSON.stringify(arr);
                localStorage.setItem(key,value);
                window.location.href="jiesuan.html";
            }else{
                if(obj1.message.length!=0){
                    var old=obj1.message;
                    var flag=0;
                    for(var i=0;i<old.length;i++){
                        if(old[i].goodName==obj.goodName&&old[i].size==obj.size){
                            old[i].count= Number(old[i].count)+Number(obj.count);
                            old[i].res=(Number(old[i].count)*Number(old[i].price)).toFixed(2);
                                // obj1.message=old;
                            flag=1;
                        }else{
                            flag=0;
                        }
                    }
                    if(flag==0){
                        obj1.message.push(obj);
                        arr.push(obj1);
                        //去重
                        var whatarr1=[]
                        for (var i = 0; i < obj1.message.length; i++) {
                            whatarr1.push(String(obj1.message[i].goodName)+String(obj1.message[i].size))
                        }
                        var whatarr2=[]
                        var whatarr3=[]
                        for (var i = 0; i < whatarr1.length; i++) {
                            if (whatarr2.indexOf(whatarr1[i])==-1) {
                                 whatarr2.push(whatarr1[i])
                            }
                            else{
                                whatarr3.push(i)
                            }
                        }
                        if (whatarr3.length!=0) {
                            for (var i = 0; i < whatarr3.length; i++) {
                                obj1.message.splice(whatarr3[i],1)
                            }
                        }
                        var value=JSON.stringify(arr);
                        localStorage.setItem(key,value);
                        window.location.href="jiesuan.html";
                        return;
                    }else{
                        arr.push(obj1);
                        var value=JSON.stringify(arr);
                        localStorage.setItem(key,value);
                        window.location.href="jiesuan.html";
                    }
                }else{
                    obj1.message.push(obj);
                    arr.push(obj1);
                    var value=JSON.stringify(arr);
                    localStorage.setItem(key,value);
                    window.location.href="jiesuan.html";
                }
            }
        }
    })
// 加入购物车
    $(".addbuycar").click(function(){
        var username=JSON.parse(localStorage.getItem("username"));
        if(!$(".selectsize").html()){
            $(".error").eq(0).css("display","block");
        }else if(!username){
            $(".error").eq(1).css("display","block");
        }else{
            var arr=[];//最的数组
            var key ="Goods";
            var obj1={};//对象老大
            obj1.username=username;
            obj1.message=[];
            obj1.address=[];
             obj1.ding=[];
            var oldlocal=JSON.parse(localStorage.getItem(key));
            if(localStorage.getItem(key)){
                    for(var i=0;i<oldlocal.length;i++){
                        if(oldlocal[i].username==username){
                            obj1.message=oldlocal[i].message;
                            if(oldlocal[i].address){
                                obj1.address=oldlocal[i].address;
                            }
                            if(oldlocal[i].ding){
                                obj1.ding=oldlocal[i].ding;
                            }
                        }else{
                            arr.push(oldlocal[i]);
                        }
                    }
                 }
            var obj={};
            obj.img=$("#img").attr("src");
            obj.goodName=$(".goodName").html();
            obj.size=$(".selectsize").html().slice(1);
            obj.price=$("#price").html();
            obj.count=selnum;
            obj.res=(($("#price").html())*selnum).toFixed(2);
            if(!localStorage.getItem(key)){
                obj1.message.push(obj);
                arr.push(obj1);
                var value=JSON.stringify(arr);
                localStorage.setItem(key,value);
                lsq_add();
                head()
            }else{
                if(obj1.message.length!=0){
                    var old=obj1.message;
                    var flag=0;
                    for(var i=0;i<old.length;i++){
                        if(old[i].goodName==obj.goodName&&old[i].size==obj.size){
                            old[i].count= Number(old[i].count)+Number(obj.count);
                            old[i].res=(Number(old[i].count)*Number(old[i].price)).toFixed(2);
                            flag=1;
                        }else{
                            flag=0;
                            }
                    }
                    if(flag==0){
                        obj1.message.push(obj);
                        arr.push(obj1);
                        //去重
                        var whatarr1=[]
                        for (var i = 0; i < obj1.message.length; i++) {
                            whatarr1.push(String(obj1.message[i].goodName)+String(obj1.message[i].size))
                        }
                        var whatarr2=[]
                        var whatarr3=[]
                        for (var i = 0; i < whatarr1.length; i++) {
                            if (whatarr2.indexOf(whatarr1[i])==-1) {
                                whatarr2.push(whatarr1[i])
                            }
                            else{
                                whatarr3.push(i)
                            }
                        }
                        if (whatarr3.length!=0) {
                            for (var i = 0; i < whatarr3.length; i++) {
                                obj1.message.splice(whatarr3[i],1)
                            }
                        }
                        var value=JSON.stringify(arr);
                        localStorage.setItem(key,value);
                        lsq_add();
                        head()
                        return;
                    }else{
                        arr.push(obj1);
                        var value=JSON.stringify(arr);
                        localStorage.setItem(key,value);
                        lsq_add();
                        head()
                    }
                }else{
                    obj1.message.push(obj);
                    arr.push(obj1);
                    var value=JSON.stringify(arr);
                    localStorage.setItem(key,value);
                    lsq_add();
                    head()
                }
            }
        }
    })
// 购买
    // $(".nowbuy").click(function(){
    //     var username=JSON.parse(localStorage.getItem("username"));
    //     if(!$(".selectsize").html()){
    //          $(".error").eq(0).css("display","block");
    //     }else if(!username){
    //         $(".error").eq(1).css("display","block");
    //     }else{
    //         if(localStorage.getItem("Goods")){
    //         arr=JSON.parse(localStorage.getItem("Goods"));
    //         }else{
    //             arr=[];
    //         }
    //         var img=$("#img").attr("src");
    //         var goodName=$(".goodName").html();
    //         var size=$(".selectsize").html().slice(1);
    //         var price=$("#price").html();
    //         var count=selnum;
    //         var res=(($("#price").html())*selnum).toFixed(2);
    //         var obj={};
    //         var is_new=0;//判断是否为新用户
    //         var index1=0;
    //         var index2=[];
    //         $.each(arr,function(n){
    //             if(username==arr[n].username){
    //                 obj=arr[n];
    //                 is_new=1;
    //                 index1=n;
    //             }
    //         })
    //         // 新用户 0
    //         if(is_new==0){
    //             obj.username=username;
    //             obj.message=[{img:img,goodName:goodName,size:size,price:price,count:count,res:res}];
    //             arr.push(obj);
    //             localStorage.setItem("Goods",JSON.stringify(arr));
    //             window.location.href="jiesuan.html";
    //         }else{
    //             arr.splice(index1,1)
    //             // 有用户 1
    //             var message=obj.message;
    //             var is_good=0;//判断是否有该商品
    //             var good=[];
    //             var good_obj={};
    //             $.each(message,function(n){
    //                 if(goodName==message[n].goodName){
    //                     good.push(message[n]);
    //                     is_good=1;
    //                     index2.push(n);
    //                  }
    //             })
    //             //有用户 没该商品
    //             if(is_good==0){
    //                 good_obj={img:img,goodName:goodName,size:size,price:price,count:count,res:res}
    //                 message.push(good_obj);
    //                 obj.message=message;
    //                 arr.push(obj);
    //                 localStorage.setItem("Goods",JSON.stringify(arr));
    //                 window.location.href="jiesuan.html";
    //             }else{
    //                 //有用户 有该商品
    //                 var is_chong=0;//是否重复
    //                 var sn=0;
    //                 $.each(good,function(n){
    //                     if(size==good[n].size){
    //                         good_obj=good[n];
    //                         is_chong=1;
    //                         sn=n;
    //                     }
    //                 })  
    //                 if(is_chong==1){
    //                     message.splice(index2[sn],1);
    //                     good_obj.count=Number(good_obj.count)+Number(count);
    //                     good_obj.res=(($("#price").html())*good_obj.count).toFixed(2);
    //                     message.push(good_obj);
    //                     obj.message=message;
    //                     arr.push(obj);
    //                     localStorage.setItem("Goods",JSON.stringify(arr));
    //                     window.location.href="jiesuan.html";
    //                 }else{
    //                     var good_newobj={};
    //                     good_newobj={img:img,goodName:goodName,size:size,price:price,count:count,res:res}
    //                     message.push(good_newobj);
    //                     obj.message=message;
    //                     arr.push(obj);
    //                     localStorage.setItem("Goods",JSON.stringify(arr));
    //                     window.location.href="jiesuan.html";
    //                 }
    //             }
    //         } 
    //     }        
    // })

   // 加入购物车
    // $(".addbuycar").click(function(){
    //     var username=JSON.parse(localStorage.getItem("username"));
    //     if(!$(".selectsize").html()){
    //          $(".error").eq(0).css("display","block");
    //     }else if(!username){
    //         $(".error").eq(1).css("display","block");
    //     }else{
    //         if(localStorage.getItem("Goods")){
    //         arr=JSON.parse(localStorage.getItem("Goods"));
    //         }else{
    //             arr=[];
    //         }
    //         var img=$("#img").attr("src");
    //         var goodName=$(".goodName").html();
    //         var size=$(".selectsize").html().slice(1);
    //         var price=$("#price").html();
    //         var count=selnum;
    //         var res=(($("#price").html())*selnum).toFixed(2);
    //         var obj={};
    //         var is_new=0;//判断是否为新用户
    //         var index1=0;
    //         var index2=[];
    //         $.each(arr,function(n){
    //             if(username==arr[n].username){
    //                 obj=arr[n];
    //                 is_new=1;
    //                 index1=n;
    //             }
    //         })
    //         // 新用户 0
    //         if(is_new==0){
    //             obj.username=username;
    //             obj.message=[{img:img,goodName:goodName,size:size,price:price,count:count,res:res}];
    //             arr.push(obj);
    //             localStorage.setItem("Goods",JSON.stringify(arr));
    //             lsq_add()
    //             head()
    //         }else{
    //             arr.splice(index1,1)
    //             // 有用户 1
    //             var message=obj.message;
    //             var is_good=0;//判断是否有该商品
    //             var good=[];
    //             var good_obj={};
    //             $.each(message,function(n){
    //                 if(goodName==message[n].goodName){
    //                     good.push(message[n]);
    //                     is_good=1;
    //                     index2.push(n);
    //                  }
    //             })
    //             //有用户 没该商品
    //             if(is_good==0){
    //                 good_obj={img:img,goodName:goodName,size:size,price:price,count:count,res:res}
    //                 message.push(good_obj);
    //                 obj.message=message;
    //                 arr.push(obj);
    //                 localStorage.setItem("Goods",JSON.stringify(arr));
    //                 lsq_add()
    //                 head()
    //             }else{
    //                 //有用户 有该商品
    //                 var is_chong=0;//是否重复
    //                 var sn=0;
    //                 $.each(good,function(n){
    //                     if(size==good[n].size){
    //                         good_obj=good[n];
    //                         is_chong=1;
    //                         sn=n;
    //                     }
    //                 })  
    //                 if(is_chong==1){
    //                     message.splice(index2[sn],1);
    //                     good_obj.count=Number(good_obj.count)+Number(count);
    //                     good_obj.res=(($("#price").html())*good_obj.count).toFixed(2);
    //                     message.push(good_obj);
    //                     obj.message=message;
    //                     arr.push(obj);
    //                     localStorage.setItem("Goods",JSON.stringify(arr));
    //                     lsq_add()
    //                     head()
    //                 }else{
    //                     var good_newobj={};
    //                     good_newobj={img:img,goodName:goodName,size:size,price:price,count:count,res:res}
    //                     message.push(good_newobj);
    //                     obj.message=message;
    //                     arr.push(obj);
    //                     localStorage.setItem("Goods",JSON.stringify(arr));
    //                     lsq_add()
    //                     head()
    //                 }
    //             }
    //         } 
    //     }
    // })
    function head(){
        var key="Goods";
        var arr1=JSON.parse(localStorage.getItem(key));
        var key1="username";
        var username=JSON.parse(localStorage.getItem(key1));
        var arr=[];
        var lsq_indexxx=-1;
        if(localStorage.getItem(key)){
            for(var i=0;i<arr1.length;i++){
                if(arr1[i].username==username){
                    arr=arr1[i].message;
                    lsq_indexxx=i;
                }
            }
            if(arr.length==0){
                $(".num").html("0");
                $(".gounum").html("您的购物车中没有任何商品！")
            }else{
                $(".gounum").html("");
                var span=$("<span class='have'>最近加入的商品：</span>");
                span.appendTo($(".gounum"));
                var div=$("<div id='lie'></div>");
                div.appendTo($(".gounum"));
                var num=0;
                var str="";
                var sum=0;
                $.each(arr,function(i){
                    str+='<li><img src="'+arr[i].img+'" alt=""><p>'+arr[i].goodName+'<br/>￥<span class="price">'+arr[i].price+'</span> X <span class="count">'+arr[i].count+'</span></p><a href="javascript:;" class="del">删除</a></li>';
                    sum+=parseInt(arr[i].res);
                    num+=parseInt(arr[i].count);

                })
                $("#lie").html(str);
                var odiv=$('<div id="cur"><span>共计(未计算销售折扣)</span><b class="mon">￥'+sum.toFixed(2)+'</b><a href="jiesuan.html" class="see">查看购物车(<i class="num" id="woquni" style="color:white">'+num+'</i>件)</a></div>');
                odiv.appendTo($(".gounum"));
                $(".num").html(num);
                $(".del").click(function(){
                    var i=$(this).index(".del"); 
                    arr.splice(i,1);
                    if(arr.length==0){
                        $(".num").html("0");
                        $(".gounum").html("您的购物车中没有任何商品！")
                    }
                     arr1[lsq_indexxx].message=arr;
                     var value=JSON.stringify(arr1);
                        localStorage.setItem(key,value);
                    $(this).parent("li").remove();
                    var nnum=0;
                    var rres=0;
                    $.each(arr,function(i){
                        nnum+=Number(arr[i].count);
                        rres+=Number(arr[i].res);
                    })
                    $(".num").html(nnum);
                    $(".mon").html(rres);
                })
            }
        }else{
                $(".num").html("0");
                $(".gounum").html("您的购物车中没有任何商品！")
        }
    }
    $(".lsq_head").load("head.html");
    $(".lsq_foot").load("foot.html");
})

