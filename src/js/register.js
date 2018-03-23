//判断用户名是否合法
//不能小于三位
//只能为数字字母下划线
//判断是否已被注册
//设一个标志判断是否所有内容都正确
//var flag="";
var flag=[0,0,0,0,0,0];
var $name=$("#user_name"),
	$name_notice=$(".name_notice");
$name.blur(function(){
	var user_name=$name.val(),
		name_test=/^\w[A-z]+\w+$/;
//		name_space=/\s/;
	//判断是否被注册过
	var user_obj=$.cookie("user")?$.cookie("user"):"";
		if(user_obj==""){
			
		}else{
			user_obj=JSON.parse(user_obj);
			if($name.val() in user_obj){
				$name_notice.text("该用户名已被注册");
				$name_notice.css("color","red");
			}
		}
	if(user_name.length<3){
		$name_notice.text("用户名长度不能少于3个字符");
		$name_notice.css("color","red");
	}else if(!name_test.test(user_name)){
		$name_notice.text("含有非法字符");
		$name_notice.css("color","red");
	}else{
		if(name_test.test(user_name)){
		$name_notice.text("可以注册");
		$name_notice.css("color","green");
		flag[0]=1;
		}else{
		$name_notice.text("用户名只能为数字字母下划线，且必须含有字母");
		$name_notice.css("color","red");
		}
	}
	
})
//初始密码强度为0；
var $strengths=$(".password_strength p");
	$strengths.addClass("borderO");
//判断密码是否合法
//至少得有六个字符
var $password=$("#user_password"),
	$password_notice=$(".password_notice");
$password.blur(function(){
	//初始密码强度为0；
	$strengths.addClass("borderO");
	
	var $user_password=$password.val();
	if($user_password.length<6){
		$password_notice.text("密码不能少于6个字符")
		$password_notice.css("color","red");
	}else{
		$password_notice.text("可以注册")
		$password_notice.css("color","green");
		flag[1]=1;
		//密码强度
		var u=$user_password;
		if(/([a-z]|\d|[A-Z])/.test(u)){
			$strengths.eq(0).removeClass("borderO");
		}
		if(/([a-z]{3,}|[A-Z]{3,})/.test(u)){
			$strengths.eq(1).removeClass("borderO");
		}
		if(/[a-z]{3,}[A-Z]{3,}\d+/.test("aaaAAA")){
			$strengths.eq(2).removeClass("borderO");
		}
	}
})
//确认密码
var $confirm=$("#confirm_password"),
	$confirm_notice=$(".confirm_notice");
$confirm.blur(function(){
	var $confirm_password=$confirm.val();
	if($confirm_password.length<6){
		$confirm_notice.text("两次密码必须相同");
		$confirm_notice.css("color","red");
	}else{
		$confirm_notice.text("可以注册")
		$confirm_notice.css("color","green");
		flag[2]=1;
		//密码强度？
	}
})	
//手机号只能为11位
var $phone=$("#user_phone"),
	$phone_notice=$(".phone_notice");
$phone.blur(function(){
	var $user_phone=$phone.val();
	if($user_phone.length==11){
		$phone_notice.text("");
		flag[3]=1;
	}else{
		$phone_notice.text("手机号必须为11位");
		$phone_notice.css("color","red");
	}
})
//验证码
//产生随机数字字母
var code_arr=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
function random_code(){
	var n=Math.floor(Math.random()*62),
		code=code_arr[n];
		return code;
}
//随机颜色
function random_color(){
	var r=Math.floor(Math.random()*256),
		g=Math.floor(Math.random()*256),
		b=Math.floor(Math.random()*256);
	return "rgba("+r+","+g+","+b+","+0.5+")";	
}
var $rand_code=$(".rand_code"),//h2中的
	$refresh=$("#refresh"),//刷新按钮
	a=random_code(),
	b=random_code(),
	c=random_code(),
	d=random_code();
$rand_code.text(a+" "+b+" "+c+" "+d);
$rand_code.css("background",random_color());
	
$refresh.click(function(){
		a=random_code();
		b=random_code();
		c=random_code();
		d=random_code();
$rand_code.text(a+" "+b+" "+c+" "+d);
$rand_code.css("background",random_color());
})
//判断验证码是否可用
var $authcode=$("#user_authcode"),//input
	$authcode_notice=$(".authcode_notice");
$authcode.blur(function(){
	$user_authcode=$authcode.val();
	$rand_txt=a+b+c+d;
	if(!($user_authcode==$rand_txt)){
		$authcode_notice.text("验证码不正确");
		$authcode_notice.css("color","red");
	}else{
		$authcode_notice.text("");
		flag[4]=1;
	}
})

//当点击提交按钮时判断以上内容是否全部正确
$submit_inp=$("#submit_inp");
$submit_inp.click(function(){
	//判断是否已同意用户协议
var $agreement_inp=$("#agreement_inp"),
	$agreement_val=$agreement_inp.prop("checked");
if($agreement_val==true){
	flag[5]=1;
}
var sum=flag[0]+flag[1]+flag[2]+flag[3]+flag[4]+flag[5];
//若全部正确则存入cookie;
if(sum===6){
	//判断是否存过该cookie
	var $user_cookie=$.cookie("user")?$.cookie("user"):"";
	if($user_cookie){
		$user_cookie=JSON.parse($user_cookie);
		$user_cookie[$name.val()]={
			"id":$name.val(),
			"_password":$password.val(),
			"_status":"false"
		}
	}else{
		$user_cookie={};
		$user_cookie[$name.val()]={
			"id":$name.val(),
			"_password":$password.val(),
			"_status":"false"
		};
	}
	$.cookie("user",JSON.stringify($user_cookie),{expires:7,path:"/"})
	alert("注册成功");	
}else{
	alert("请完成以上内容");
}
})
$(function(){
	$name.val("");
	$phone.val("");
	$authcode.val("");
	//$agreement_inp.attr({checked:"checked"});
	//alert($agreement_inp.prop("checked"));
	//alert(typeof(undefined)=="string");
});

























































































