var reg_phone=/^1[34578]\d{9}$/;
var reg_pass=/^[\w-`=\\\[\];',./~!@#$%^&*()_+|{}:">?]{6,}$/;
var flag_phone=false;
var flag_pass=false;
//手机号码失去焦点
$('.telephone').blur(function(){
	var telephone=$(this).val();
	if (telephone=='') {
		$('.tele_reminder').text('请输入手机号');
		flag_phone=false;
	} else if(reg_phone.test(telephone)){
		$('.tele_reminder').text('格式正确');
		flag_phone=true;
	} else{
		$('.tele_reminder').text('格式错误');
		flag_phone=false;
	}
})
//密码失去焦点
$('.password').blur(function(){
	var password=$(this).val();
	if (password=='') {
		$('.pass_reminder').text('请输入密码');
		flag_pass=false;
	} else if(reg_pass.test(password)){
		$('.pass_reminder').text('格式正确');
		flag_pass=true;
	} else{
		$('.pass_reminder').text('格式错误');
		flag_pass=false;
	}
})
$('.telephone').focus(function(){
	$('.reminder').text('');
})
//点击注册按钮
$('.footer').click(function(){
	var phone=$('.telephone').val();
	var pass=$('.password').val();
	if (flag_phone&&flag_pass) {
		$.ajax({
			type:"post"
			,url:"http://47.92.37.168/supermarket/data/register.php"
			,async:true
			,data:{
				'user_phone':phone,
				'user_pass_word':pass
			}
			,dataType:"jsonp"
			,jsonp:"callback"
			,jsonpCallback:"success_JsonpCallback"
			,success:function(data){
				console.log(data);
				alert(11)
				if (data.msg=='success') {
					sessionStorage.setItem('username',phone);
//					alert('注册成功！');
					location.href="login.html";
				} else if(data.msg=='error'){
					$('.reminder').text(data.reason);
				}
			}
			,error:function(){
				alert('error!');
			}
		})
	}
})