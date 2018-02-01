var username=sessionStorage.getItem('username');
$('.telephone').val(username);
//点击登录按钮
$('#login').click(function(){
	var telephone=$('.telephone').val();
	var password=$('.password').val();
	if (telephone!='' && password!='') {
		$.ajax({
			type:"post"
			,url:"http://47.92.37.168/supermarket/data/login.php"
			,async:true
			,data:{
				user_phone:telephone,
				user_pass_word:password
			}
			,dataType:"jsonp"
			,jsonp:"callback"
			,jsonpCallback:"success_JsonpCallback"
			,success:function(data){
				console.log(data);
				alert(11)
				if (data.msg=='success') {
					sessionStorage.setItem('username',telephone);
					sessionStorage.setItem('useraddr',data.info.user_addr);
					location.href="../index.html";
				} else if(data.msg=='error'){
					$('.notLogin').css('display','block');
					$('.reminder p').text(data.reason);
				}
			}
			,error:function(){
				alert('error!');
			}
		});
	}
})
//点击确定按钮
$('#btn').click(function(){
	$('.notLogin').css('display','none');
})










