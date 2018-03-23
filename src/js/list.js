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

//下拉菜单的显示
var $navL=$(".navL"),
	$all_kind=$(".all-kind");//下拉菜单
$navL.mouseover(function(){
	$all_kind.css("display","block");
})
$navL.mouseout(function(){
	$all_kind.css("display","none");
})


//list_content内容的加载
$list_content=$(".list_content ul");
$.getJSON("list.json",function(data){
		$(data.list1).each(function(ind,obj){
			$list_content.append(`
				<li><a href="detail.html?${obj.id}&${obj.url}&${obj.value}">
				<img src="${obj.url}" alt="" />
				<h2>￥${obj.value}</h2>
				<p>${obj.explain}</p>
				<h4>
					<i></i>
					<span>美鲜自营</span>
				</h4>
				<div class="li_hover">
					<h5><i></i><span>肉禽蛋品</span></h5>
					<h6><span>肉制品</span><i></i></h6>
				</div>
				</a></li>
			`)
		})
})
//按照价格排序
$h_value=$(".h_value");
$h_value.click(function(){
	$list_content.html("");
	$.getJSON("list.json",function(data){
		data.list1=data.list1.sort(function(a,b){
			return parseInt(a.value)>parseInt(b.value);
		})
		$(data.list1).each(function(ind,obj){
			$list_content.append(`
				<li><a href="detail.html">
				<img src="${obj.url}" alt="" />
				<h2>￥${obj.value}</h2>
				<p>${obj.explain}</p>
				<h4>
					<i></i>
					<span>美鲜自营</span>
				</h4>
				<div class="li_hover">
					<h5><i></i><span>肉禽蛋品</span></h5>
					<h6><span>肉制品</span><i></i></h6>
				</div>
				</a></li>
			`)
		})
})
})





//contentR内容的加载
$contentR=$(".contentR ul");
$.getJSON("list.json",function(data){
		$(data.contentR).each(function(ind,obj){
			$contentR.append(`
				<li><a href="#">
					<img src="${obj.url}" alt="" />
					<p>${obj.explain}</p>
					<h5>￥${obj.value}元</h5>
					</a>
				</li>
			`)
		})
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
})