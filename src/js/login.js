var $name=$("#user_name"),
	$password=$("#user_password"),
	$authcode=$("#user_authcode"),
	$rand_code=$(".rand_code"),
	$inp_remember=$("#inp_remember"),
	$inp_submit=$("#inp_submit");
//建立一个标志用来记录是否全部选项已完成
var flag=false;
//验证用户名
$name.blur(function(){
	var $user_name=$name.val(),
		$user_cookie=$.cookie("user")?$.cookie("user"):"";
		if($user_cookie==""){
			
		}else{
			$user_cookie=JSON.parse($user_cookie);
			if(!($user_name in $user_cookie)){
				alert("用户名不存在");
			}
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
		a=random_code(),
		b=random_code(),
		c=random_code(),
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
		alert("验证码错误");
	}else{
		flag=true;
	}
})
$inp_submit.click(function(){
	var $user_name=$name.val(),
		$user_password=$password.val(),
		$user_authcode=$authcode.val(),
		$user_cookie=$.cookie("user");
	$user_cookie=JSON.parse($user_cookie);
	if(!($user_password==$user_cookie[$user_name]._password)){
				alert("用户名和密码不匹配");
	}else{
		if(flag==true){
			alert("成功");
			location.href="index.html";
			$user_cookie[$user_name]._status="true";
			$.cookie("user",JSON.stringify($user_cookie),{expires:7,path:"/"});
		}else{
			
		}
	}
			
	
		
})



