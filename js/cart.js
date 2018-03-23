
//购物车商品的加载
var user_goods=$.cookie("goods"),
	$cart_blank=$(".cart_blank"),
	$cart_list=$(".cart_list");
if(user_goods==undefined||user_goods=="{}"){
	$cart_blank.css("display","block");
}else{
	user_goods=JSON.parse(user_goods);
	var goods_index=-1;
	$.each(user_goods,function(ind,obj){
		goods_index++;
		$(`
			<li class="${goods_index}">
				<div class="inp1">
					<input type="checkbox"  />
				</div>
				<div class="img1">
					<img src="${obj.url}"/>
				</div>
				<h3 class="h_txt">孚德 鸡大大（全熟） BBQ风味烤翅 1.2kg/袋 8袋/箱</h3>	
				<h3>单袋</h3>	
				<h3 class="unit_price">￥${obj.value}</h3>
				<h3>
					<input type="button" value="-" class="btn_cut"/>
					<input type="text" class="cart_count" value="${obj.num}" id="${obj.id}"/>
					<input type="button" value="+" class="btn_add"/>
				</h3>
				<h3 class="h_color">￥${obj.value*obj.num}</h3>
				<h3 class="delete">删除</h3>
			</li>
		`).appendTo($cart_list);
		
	})
}

//全选按钮的功能
var $select_all=$("#select_all"),
	$check_inps=$(".inp1 input");
$select_all.click(function(){
if($select_all.prop("checked")==true){
	$check_inps.prop({"checked":true});
}else {
	$check_inps.prop({"checked":false});
}
})

//购物车,数量的控制
var $cart_counts=$(".cart_count"),
	$btn_cuts=$(".btn_cut"),
	$btn_adds=$(".btn_add"),
	$unit_prices=$(".unit_price"),//单价
	$total_prices=$(".h_color");//总价

//让按钮对应每一个商品		
$btn_cuts.click(function(){
	var ind=$(this).parents("li").attr("class");
	var num_val=$cart_counts.eq(ind).val();
	if(num_val<2){
		num_val=2;
	}
	$cart_counts.eq(ind).val(--num_val);
	//货物的价格
	var unit_price=parseFloat($unit_prices.eq(ind).text().slice(1));
	$total_prices.eq(ind).text("￥"+(num_val*unit_price).toFixed(1));
	//修改对象里的数量值
	var id=$cart_counts.eq(ind).attr("id");
		user_goods[id].num=num_val;
	//将修改后的价格保存进cookie
	$.cookie("goods",JSON.stringify(user_goods),{expires:7,path:"/"});
})
$btn_adds.click(function(){
	var ind=$(this).parents("li").attr("class");
	var num_val=$cart_counts.eq(ind).val();
	$cart_counts.eq(ind).val(++num_val);
	//货物的价格
	var unit_price=parseFloat($unit_prices.eq(ind).text().slice(1));
	$total_prices.eq(ind).text("￥"+(num_val*unit_price).toFixed(1));
	//修改对象里的数量值
	var id=$cart_counts.eq(ind).attr("id");
	console.log($cart_counts.eq(ind));
		//user_goods[id].num=num_val;
	//将修改后的价格保存进cookie
	$.cookie("goods",JSON.stringify(user_goods),{expires:7,path:"/"});
})
$cart_counts.blur(function(){
	var ind=$(this).parents("li").attr("class");
	var num_val=$cart_counts.eq(ind).val();
	if(num_val<1){
		$cart_counts.eq(ind).val(1);
		num_val=1;
	}
	//货物的价格
	var unit_price=parseFloat($unit_prices.eq(ind).text().slice(1));
	$total_prices.eq(ind).text("￥"+(num_val*unit_price).toFixed(1));
	//修改对象里的数量值
	var id=$cart_counts.eq(ind).attr("id");
		user_goods[id].num=num_val;
	//将修改后的价格保存进cookie
	$.cookie("goods",JSON.stringify(user_goods),{expires:7,path:"/"});
})

//删除按钮的功能
var $deletes=$(".delete");
$deletes.click(function(){
	var ind=$(this).parents("li").attr("class");
	//修改对象里的数量值
	var id=$cart_counts.eq(ind).attr("id");
		delete user_goods[id];
	//将修改后的价格保存进cookie
	$.cookie("goods",JSON.stringify(user_goods),{expires:7,path:"/"});
	var $li=$(this).parents("li")
	/*$(".cart_list")[0].removeChild($li[0]);*/
	$li.remove();
	$cart_blank.css("display","block");
})




































/*$btn_cuts.click(function(){
	var num_val=$cart_counts.val();
	if(num_val<2){
		num_val=2;
	}
	$cart_counts.val(--num_val);
	//货物的价格
	var unit_price=parseFloat($unit_prices.text().slice(1));
	$total_price.text("￥"+(num_val*unit_price).toFixed(1));
	//将修改后的价格保存进cookie
	$.cookie("goods",)
})
$btn_adds.click(function(){
	var num_val=$cart_counts.val();
	$cart_counts.val(++num_val);
	//货物的价格
	var unit_price=parseFloat($unit_prices.text().slice(1));
	$total_price.text("￥"+(num_val*unit_price).toFixed(1));
})
$cart_counts.blur(function(){
	var num_val=$cart_counts.val();
	if(num_val<1){
		$cart_counts.val(1);
		num_val=1;
	}
	//货物的价格
	var unit_price=parseFloat($unit_prices.text().slice(1));
	$total_price.text("￥"+(num_val*unit_price).toFixed(1));
})
*/























































