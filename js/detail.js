//search 搜索提示
var $search_txt=$(".src-search"),
//通过script标签跨域访问百度的搜索接口
    $head=$("head"),
    $searchCT=$(".searchCT"),
    $body=$("body");
//创建一个ul
	$searchCT.append(`<ul class="hint"></ul>`);	
var SearchCallback=function(obj){
	//console.log(obj.s);
	var arr=obj.s,
		len=arr.length,
		i=0;
	$ul=$(".hint")	
	$ul.html("");//每次都清空
	for(;i<len;i++){
		var $li=$("<li>");
		$li.html(arr[i]);
		$li.appendTo(".hint");
	}
	
	//创建一个li当点击关闭时删除ul
	$("<li>",{
		style:"text-align:right;cursor:pointer",
		text:"关闭",
		click:function(){
//			$searchCT.remove(".hint")
//			delete(".hint");
			$ul.html("");
		}
	}).appendTo(".hint")
}
var index=0;//用来记录li的下标
$search_txt.keyup(function(e){
	var value=$(this).val();
	var e=e||window.event,
		code=e.keyCode||e.which;
		switch(code){
			case 40:
			move();
			index++;
			break;
			case 38:
			move();
			index--;
			break;
			default:$head.append(`<script src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=SearchCallback&wd=${value}"></script>`);
	}
})
//控制li的移动
function move(){
	$lis=$(".hint li");
	var len=$lis.length;
	if(index<0){
		index=len-2;
	}else if(index>len-2){
		index=0;
	}
	$lis.eq(index).siblings("li").css("background","none");
	/*$lis.each(function(){
		$(this).css("background","")
	})*/
	$lis.eq(index).css({"background":"#ccc"});
	$search_txt.val($lis.eq(index).text());
}

//下拉菜单的显示
var $navL=$(".navL"),
	$all_kind=$(".all-kind");//下拉菜单
$navL.mouseover(function(){
	$all_kind.css("display","block");
})
$navL.mouseout(function(){
	$all_kind.css("display","none");
})


//列表页物品的加载到放大镜
var list_data=location.href;
	list_data=list_data.split("?");
	list_data=list_data[1].split("&");
var list_id=list_data[0],
	list_url=list_data[1],
	list_value=list_data[2],
	$g_small=$(".glass img"),
	$glassBImg=$(".glassBig img"),
	$g_liImgs=$(".glassLB ul li img");
$g_small.attr({"src":list_url});	
$glassBImg.attr({"src":list_url});
$g_liImgs.eq(0).attr({"src":list_url});


//放大镜
//实现镜子的拖拽
var $glass=$(".glass"),
	$show=$(".show"),
	$glassBig=$(".glassBig");
$glass.mouseenter(function(e){
		/*x=e.pageX-$glass.offset().left-87.5,//jq中的offset始终是相对于文档的偏移量与父元素的定位无关
		y=e.pageY-$glass.offset().top-87.5;
		$show.css({"left":x,"top":y});*/
		$show.css("display","block");
		$glassBig.css("display","block");
	$(document).mousemove(function(e2){
			mx=e2.pageX-$glass.offset().left-87.5,
			my=e2.pageY-$glass.offset().top-87.5;
			//边界的设置
			if(mx<0){
				mx=0;
			}else if(mx>175){
				mx=175;
			}
			if(my<0){
				my=0;
			}else if(my>175){
				my=175;
			}
		$show.css({"left":mx,"top":my});
		$glassBImg.css({"left":-mx*2,"top":-my*2}                                                                                                               );
	})
	$glass.mouseleave(function(){
		$show.css("display","none");
		$glassBig.css("display","none");
	})
})

//实现点击按钮切换放大镜内的图片；
var $g_btnL=$(".g_btnL"),
	$g_btnR=$(".g_btnR"),
	$g_lis=$(".glassLB ul li"),
	$g_big=$(".glassBig img"),
	g_index=0;
//给第一个按钮加上样式
$g_lis.eq(0).css({"border":"1px solid green"});	
$g_btnR.click(function(){
	g_index++;
	if(g_index==4){
		g_index=3;
	}
	$g_lis.eq(g_index).siblings("li").css({"border":"1px solid #ddd"})
	$g_lis.eq(g_index).css({"border":"1px solid green"});
	$g_small.attr({"src":$g_liImgs.eq(g_index).attr("src")});
	$g_big.attr({"src":$g_liImgs.eq(g_index).attr("src")});
})
$g_btnL.click(function(){
	g_index--;
	if(g_index==-1){
		g_index=0;
	}
	$g_lis.eq(g_index).siblings("li").css({"border":"1px solid #ddd"})
	$g_lis.eq(g_index).css({"border":"1px solid green"});
	$g_small.attr({"src":$g_liImgs.eq(g_index).attr("src")});
	$g_big.attr({"src":$g_liImgs.eq(g_index).attr("src")});
})


//详情页选项效果
$h4s=$(".goods_buy h4");
$h4s.eq(0).css({"border":"1px solid #008000","background":"url(../images/untreated_06.jpg) no-repeat right bottom"});
$h4s.click(function(){
	$(this).siblings("h4").css({"border":"1px solid #ddd","background":"none"});
	$(this).css({"border":"1px solid #008000","background":"url(../images/untreated_06.jpg) no-repeat right bottom"});
})

var $buy_num=$(".buy-num"),
	$time_num=1;//用来记录input改变的商品数量；

//货物数量
var $num=$("#num"),
	$num_btnL=$("#num_btnL"),
	$num_btnR=$("#num_btnR");
$num_btnL.click(function(){
	var num_val=$num.val();
	if(num_val<2){
		num_val=2;
	}
	$num.val(--num_val);
	$time_num=num_val;
})
$num_btnR.click(function(){
	var num_val=$num.val();
	$num.val(++num_val);
	$time_num=num_val;
})
$num.blur(function(){
	var num_val=$num.val();
	if(num_val<1){
		$num.val(1);
	}
	$time_num=parseInt(num_val);
})

//加入购物车动画
var $goods_btnR=$("#goods_btnR");
$goods_btnR.click(function(e){
	//将货物存入cookie
	var $user_goods=$.cookie("goods")?$.cookie("goods"):"";
	if($user_goods){
		$user_goods=JSON.parse($user_goods);
	}else{
		$user_goods={};
	}
	//判断物品是否存过
	if(list_id in $user_goods){
		$user_goods[list_id].num+=$time_num;
		$buy_num.text($user_goods[list_id].num);
	}else{
		if($time_num>1){//解决直接加数字只能加一个商品进购物车的缺陷
			$user_goods[list_id]={
			"id":list_id,
			"url":list_url,
			"value":list_value,
			"num":$time_num
			}
			$buy_num.text($user_goods[list_id].num);
		}else{
			$user_goods[list_id]={
			"id":list_id,
			"url":list_url,
			"value":list_value,
			"num":1
			}
		}
		
	}
	$.cookie("goods",JSON.stringify($user_goods),{expires:7,path:"/"})
	
	//克隆一个新的图片
	var $ImgClone=$g_liImgs.eq(0).clone(),
		x=e.pageX-50,
		y=e.pageY-50;
	$ImgClone.css({"position":"absolute","top":x,"left":y,"width":"100px","height":"100px"});
	$ImgClone.appendTo("body");
	//添加抛物线飞向购物车的动画
			$ImgClone.fly({
					start : {
						top : e.clientX,
						left : e.clientY
					},
					end :{
						top : $(".buy-cart").offset().top,
					left : $(".buy-cart").offset().left,
					width:0,
					height:0
				},
				autoPlay : true,
				onEnd : function(){
					//正则
					/*let re = /\d+/g;
					let num = parseInt($('.buy-num').text().match(re));
							console.log(num);
					$(".buy-num").text(++num);*/
					$ImgClone.remove();
				}
				});
})














































//erweima的弹出效果
var $erweima=$(".a-erweima"),
	$erweiImg=$erweima.find("img");
	$erweima.hover(function(){//当鼠标移入图片时仍然在a标签里
//		$erweiImg.stop();
//		console.log('a');
		$erweiImg.stop();
		$erweiImg.animate({"right":"32px"},500);
	},function(){
		$erweiImg.stop();
		$erweiImg.animate({"right":"-186px"},500);
	})

//注销按钮
function exit(obj){
	var $pre_user=$.cookie("user");
	$pre_user=JSON.parse($pre_user);
	$pre_user[obj]._status="false";
	$.cookie("user",JSON.stringify($pre_user),{expires:7,path:"/"});
	location.reload();
}
$(function(){
	//实现登录后加载页面时将登录的用户名放到头部
	var $pre_user=$.cookie("user");
	
	if($pre_user==undefined){

	}else{
		$pre_user=JSON.parse($pre_user);
//		console.log($pre_user);
		for(var obj in $pre_user){
			if($pre_user[obj]._status=="true"){
				$(".topL").html(`<span>${$pre_user[obj].id},欢迎光临美鲜冻品商城</span><a href="#" onclick="exit('${obj}')">注销<a>`);
				
			}
		}
	}
	
	//清除input中num的数量
	$("#num").val("1");
	//加载购物车中的商品数量
	var buy_num=$(".buy-num"),
		num=0;
	var user_goods=$.cookie("goods");
	if(user_goods==undefined){
		
	}else{
		user_goods=JSON.parse(user_goods);
		$.each(user_goods,function(ind,obj){
				num+=obj.num;
		})
		buy_num.text(num);
	}
	
})