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
//banner轮播
var $banner=$(".bannerR"),
	$bU=$banner.children("ul"),
	$bO=$banner.find("ol"),
	$bUlis=$bU.children("li"),
	$bOlis=$bO.find("li"),
	bIndex=0;
	//hover移动图片
	$bOlis.each(function(ind,li){
		$(this).mouseover(function(){
			//$bU.css({left:ind*-960});
			$bU.stop();
			$bU.animate({left:ind*-960},500);
			bIndex=ind;
			//清除其他ol的li
			$bOlis.eq(ind).siblings("li").removeClass("olLi-hover");
			$bOlis.eq(ind).addClass("olLi-hover");
		})
	})
	//先给第一个Ol的li加上class
	$bOlis.eq(0).addClass("olLi-hover");
	//图片的自动轮播
	function autoplay(){
		bIndex++;
		//让下标也跟着动起来
		/*var ind=bIndex;
		if(ind==6){
			ind=0;
		}*/
		
		$bU.animate({left:bIndex*-960},500,function(){
			if(bIndex==6){
				bIndex=0;
				$bU.css("left","0");
			}
		})
		var ind=bIndex;
		if(ind==6){//这里存在异步执行的问题；
			ind=0;
		}
		$bOlis.eq(ind).siblings("li").removeClass("olLi-hover");
		$bOlis.eq(ind).addClass("olLi-hover");
	}
	var bTimer=setInterval(autoplay,1500);
	//鼠标移入时停止自动轮播
	$bU.mouseover(function(){
		clearInterval(bTimer);
	})
	$bOlis.mouseover(function(){
		clearInterval(bTimer);
	})
	//鼠标离开时开始轮播；
	$bU.mouseout(function(){
		bTimer=setInterval(autoplay,1000);
	})
	$bOlis.mouseout(function(){
		bTimer=setInterval(autoplay,1000);
	})
//discount的选项卡效果
var $dis_select=$(".dis-select"),
	$dis_contents=$(".disB"),
	$a_hovers=$(".dis-select li a");
	//给第一个加上class
	$a_hovers.eq(0).addClass("li-a-hover");
	$dis_contents.eq(0).addClass("dis-block");
	//选项卡效果
var len=$a_hovers.length;
$a_hovers.each(function(ind,a){
	$(a).mouseover(function(){
		$a_hovers.removeClass("li-a-hover");
		$dis_contents.removeClass("dis-block");
		$a_hovers.eq(ind).addClass("li-a-hover");
		//随着选项的变化改变dis_content
		$dis_contents.eq(ind).addClass("dis-block");
	})
	
})	
//导入discout的第二个列表页
$.getJSON("Xuanxiang.json",function(data){
		var $ul=$("<ul>");
		var dataArr=data.list1;
		$(dataArr).each(function(ind,obj){
			var $li=$("<li>"),
				$a=$("<a>"),
				$img=$("<img src='"+obj.url+"'>");
				$img.appendTo($a);
				$a.appendTo($li);
				$li.appendTo($ul);
		})
		$ul.appendTo(".discountBTwo");
});
//导入discout的第三个列表页
$.getJSON("Xuanxiang.json",function(data){
		var $ul=$("<ul>");
		var dataArr=data.list2;
		$(dataArr).each(function(ind,obj){
			$(`
				<li>
					<a href="#">
						<img src="${obj.url}" alt="">
						<div>${obj.name}</div>
						<p>${obj.value}</p>			
					</a>
				</li>
			`).appendTo($ul);
		})
		$ul.appendTo(".discountBThree");
});
//导入discout的第四个列表页
$.getJSON("Xuanxiang.json",function(data){
		var $ul=$("<ul>");
		var dataArr=data.list3;
		$(dataArr).each(function(ind,obj){
			$(`
				<li>
					<a href="#">
						<img src="${obj.url}" alt="">
						<div>${obj.name}</div>
						<p>${obj.value}</p>			
					</a>
				</li>
			`).appendTo($ul);
		})
		$ul.appendTo(".discountBFour");
});
//导入discout的第五个列表页
$.getJSON("Xuanxiang.json",function(data){
		var $ul=$("<ul>");
		var dataArr=data.list4;
		$(dataArr).each(function(ind,obj){
			$(`
				<li>
					<a href="#">
						<img src="${obj.url}" alt="">
						<div>${obj.name}</div>
						<p>${obj.value}</p>			
					</a>
				</li>
			`).appendTo($ul);
		})
		$ul.appendTo(".discountBFive");
});
//floor选项卡效果
var $floor_select=$("#meat-select"),
	$ul_contents=$(".floor-BRs"),
	$fa_hovers=$("#meat-select li a");
	//给第一个加上class
	$fa_hovers.eq(0).addClass("fa-hover");
	$ul_contents.eq(0).addClass("floor-block");
	//选项卡效果
var len=$fa_hovers.length;
$fa_hovers.each(function(ind,a){
	$(a).mouseover(function(){
		$fa_hovers.removeClass("fa-hover");
		$ul_contents.removeClass("floor-block");
		$fa_hovers.eq(ind).addClass("fa-hover");
		//随着选项的变化改变dis_content
		$ul_contents.eq(ind).addClass("floor-block");
	})
	
})
//floor-meat第二个页面
$.getJSON("Xuanxiang.json",function(data){
		var $ul=$(".floorOne");
		var dataArr=data.list5;
		$(dataArr).each(function(ind,obj){
			$(`
				<li>
					<a href="#">
						<img src="${obj.url}" alt="">
						<div>${obj.name}</div>
						<p>${obj.value}</p>			
					</a>
				</li>
			`).appendTo($ul);
		})
		
});

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
	
	
//预售区轮播
var $pre_ul=$(".presaleBL ul"),
    $pre_btnR=$(".presaleBL .p-btnR"),
    $pre_btnL=$(".presaleBL .p-btnL"),
    $pre_BL=$(".presaleBL");
    pre_Index=0;
//点击移动
$pre_btnR.click(function(){
	pre_Index++;
	if(pre_Index>3){
		$pre_ul.css("left","0px");
		pre_Index=1;
	}
	$pre_ul.stop(true);
	$pre_ul.animate({left:pre_Index*-960},500,function(){
		if(pre_Index==3){
			pre_Index=0;
			$pre_ul.css("left","0");
		}
	});
})
$pre_btnL.click(function(){
	pre_Index--;
	if(pre_Index<0){
		console.log(pre_Index);
		$pre_ul.css("left","-2880px");
		pre_Index=2;
	}
	$pre_ul.stop(true);
	$pre_ul.animate({left:pre_Index*-960},500,function(){
		if(pre_Index==0){
			pre_Index=3;
			$pre_ul.css("left","-2880px");
		}
	});
})
//自动轮播
function pre_autoplay(){
	pre_Index++;
	if(pre_Index>3){
		$pre_ul.css("left","0px");
		pre_Index=1;
	}
	$pre_ul.animate({left:pre_Index*-960},500,function(){
		if(pre_Index==3){
			pre_Index=0;
			$pre_ul.css("left","0");
		}
	});
}
var pre_timer=setInterval(pre_autoplay,1500);
$pre_BL.mouseover(function(){
	clearInterval(pre_timer);
})
/*$pre_btnR.mouseover(function(){
	clearInterval(pre_timer);
})
$pre_btnL.mouseover(function(){
	clearInterval(pre_timer);
})*/
$pre_BL.mouseout(function(){
	pre_timer=setInterval(pre_autoplay,1500);
})
/*$pre_btnR.mouseout(function(){
	pre_timer=setInterval(pre_autoplay,1500);
})
$pre_btnL.mouseout(function(){
	pre_timer=setInterval(pre_autoplay,1500);
})*/
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
})
































































































