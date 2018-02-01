var username=sessionStorage.getItem('username');
var pro_id=sessionStorage.getItem('pro_id');
var consignee_name=sessionStorage.getItem('consignee_name');
var img_src=sessionStorage.getItem('img_src');
var img_url="http://47.92.37.168/supermarket/img/";
var oImg=_o('#anonymity').children[0];
var aSpan=_o('#anonymity').children[2];
var oFFoN=true;
var evaluate_level=0;

$('.img_icon').attr('src',img_src);
oImg.onclick=function(){
	if(oFFoN){
		oImg.src='../img/xianze1.png';
		aSpan.innerHTML='你的评价能帮助其他的小伙伴哟';
	}else{
		oImg.src='../img/xianze2.png';
		aSpan.innerHTML='你写的评价会是以匿名的形式展现';
	}
  	oFFoN=!oFFoN;
}
//点击好评时
$('.good_evaluate').click(function(){
	evaluate_level=1;
	$(this).css('color','#ff5302');
	$(this).children('img').attr('src','../img/haoping1.png');
	$('.other_evaluate').css('color','#aaa');
	$('.other_evaluate').children('img').attr('src','../img/yiban2.png');
})
//点击其他评论时
$('.other_evaluate').each(function(){
	$(this).click(function(){
		if ($(this).hasClass('middle_evaluate')) {
			evaluate_level=2;
		} else if($(this).hasClass('bad_evaluate')){
			evaluate_level=3;
		}
		$('.other_evaluate').css('color','#aaa');
		$(this).css('color','#ff5302');
		$('.other_evaluate').children('img').attr('src','../img/yiban2.png');
		$(this).children('img').attr('src','../img/yiban1.png');
		$('.good_evaluate').css('color','#aaa');
		$('.good_evaluate').children('img').attr('src','../img/haoping2.png');
	})
})
//发布评价
$('#footer').click(function(){
	var evaluate_info=$('.evaluate_info').text();
	if (evaluate_level==0) {
		$('.prompt').text('请在好评、中评、差评中选择一个');
		$('.prompt').show(1,function(){
			setTimeout(function(){
				$('.prompt').hide(1);
			},2000);
		});
		return;
	}
	if (evaluate_info=='') {
		$('.prompt').text('抱歉，评价内容不能为空哦');
		$('.prompt').show(1,function(){
			setTimeout(function(){
				$('.prompt').hide(1);
			},2000);
		});
		return;
	}
	$.ajax({
		type:"get"
		,url:"http://47.92.37.168/supermarket/data/evaluate.php"
		,async:true
		,data:{
			'evaluate':evaluate_level,
			'commodity_id':pro_id,
			'user_name':consignee_name,
			'evaluate_info':evaluate_info,
			'user_phone':username
		}
		,dataType:"jsonp"
		,jsonp:"callback"
		,success:function(data){
			console.log(data);
			if (data&&data[0].msg=='success') {
				$('.prompt').text('恭喜您，发表评价成功');
				$('.prompt').show(1,function(){
					setTimeout(function(){
						$('.prompt').hide(1);
						location.href="order.html";
					},2000);
				});
			}
		}
	});
})
//五分好评
$('.star_num>img').click(function(){
	var index=$('.star_num>img').index(this);
//	console.log(index);
	switch (index%5){
		case 0:$(this).parent().next().text('很不满意');
			break;
		case 1:$(this).parent().next().text('不满意');
			break;
		case 2:$(this).parent().next().text('一般');
			break;
		case 3:$(this).parent().next().text('满意');
			break;
		case 4:$(this).parent().next().text('很满意');
			break;
	}
	$(this).parent().children().attr('src','../img/star_white.png');
	$(this).attr('src','../img/star_red.png');
	$(this).prevAll().attr('src','../img/star_red.png');
})
//
