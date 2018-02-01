//选项卡切换
var oDivs=_o('#div').children.length;
var aDivs=_o('#div').children;
var sDiv=_('.yi');
for(var i=0;i<oDivs;i++){
	(function(x){
		aDivs[x].onclick=function(){
			for(var j=0;j<oDivs;j++){
				aDivs[j].className='';
				aDivs[j].children[0].className='';
				sDiv[j].style.display='none';
			}
			this.className='diva';
			this.children[0].className='divs';
			sDiv[x].style.display='block';
		}
	})(i)
}
//获取商品详情
var pro_id=sessionStorage.getItem('pro_id');
var username=sessionStorage.getItem('username');
var img_url="http://47.92.37.168/supermarket/img/";
var start=0;
var flag_update=true;
$.ajax({
	type:"get"
	,url:"http://47.92.37.168/supermarket/data/get_commodity_info.php"
	,async:true
	,data:{
		id:pro_id
	}
	,dataType:"jsonp"
	,jsonp:"callback"
	,complete:function(){
		//获取好评、中评、差评数量
		$.ajax({
			type:"get"
			,url:"http://47.92.37.168/supermarket/data/get_commodity_evluate.php"
			,async:true
			,data:{
				commodity_id:pro_id
			}
			,dataType:"jsonp"
			,jsonp:"callback"
			,complete:function(){
				//获取用户名和评价信息
				getData(pro_id,start);
			}
			,success:function(data){
				console.log(data);
				var good=0;
				var center=0;
				var bad=0;
				$('.data_num_span').text(data.length);//获取评价总数
				$(data).each(function(){
					if (this.evaluate=='1') {
						good++;
					}else if(this.evaluate=='2'){
						center++;
					}else if(this.evaluate=='3'){
						bad++;
					}
				})
				$('.good_evaluate span').text(good);
				$('.center_evaluate span').text(center);
				$('.bad_evaluate span').text(bad);
			}
		});
	}
	,success:function(data){
		console.log(data);
		$('.data_img').attr('src',img_url+data.img);
		$('.data_name').text('【天猫超市】 '+data.name);
		$('.data_price').text(data.price);
		if (data.privilege=='yes') {
			$('.data_privilege').css('display','block');
		} else{
			$('.data_privilege').css('display','none');
		}
		$('.data_count').text('月销量 '+data.count+'件');
	}
});

//获取评价信息函数
function getData (pro_id,start) {
	$.ajax({
		type:"get"
		,url:"http://47.92.37.168/supermarket/data/get_commodity_evluate_info.php"
		,async:true
		,data:{
			'commodity_id':pro_id,
			'start':start
		}
		,dataType:"jsonp"
		,jsonp:"callback"
		,success:function(data){
			console.log(data);
			if (data) {
				$(data).each(function(){
					$('#evaluate').append("<div class='data_evaluate'><div class='data_evaluate_user'><span>"+this.user_name+"</span><span>2017-04-09</span></div><p class='data_evaluate_info'>"+this.evaluate_info+"</p><img src='../img/lao.jpg' /></div>")
				})
				if (data.length<4) {
					flag_update=false;
				}
			} else{
				flag_update=false;
			}
		}
	});
}
//向上滑动更新数据
$(document).on('touchend',function(e){
	if ( $(this).scrollTop()==$(this).height()-$(window).height() && flag_update ) {
		start+=4;
		getData(pro_id,start);
	}
})
//好评、中评、差评点击切换
$('.data_evaluate_num>div').click(function(){
	$(this).addClass('bgcolor').siblings().removeClass('bgcolor');
})



//加入购物车
$('#add_cart').click(function(){
	if (username) {
		$.ajax({
			type:"get"
			,url:"http://47.92.37.168/supermarket/data/my_commodity_car.php"
			,async:true
			,data:{
				'user_phone':username,
				'commodity_id':pro_id,
				'count':1
			}
			,dataType:"jsonp"
			,jsonp:"callback"
			,success:function(data){
				console.log(data);
				if (data.msg=='success') {
					//图片移动效果
					$('body').append("<img class='addImg' src='"+$('.data_img').attr('src')+"' />");
					var start_l=$('#add_cart').offset().left+$('#add_cart').width()/2-$('.addImg').width()/2;
					var start_t=$('#add_cart').offset().top+$('#add_cart').height()/2-$('.addImg').height()/2;
					var end_l=$('.cart').offset().left+$('.cart').width()/2-$('.addImg').width()/2;//距离文档左侧的距离
					var end_t=$('.cart').offset().top+$('.cart').height()/2-$('.addImg').height()/2;//距离文档顶部的距离
					$('.addImg').css({'left':start_l+'px','top':start_t+'px'});
					$('.addImg').animate({'left':end_l+'px','top':end_t+'px'},1000,function(){
						$('.addImg').remove();
					})
				}
			}
		});
	} else{
		location.href="login.html";
	}
})
//点击购物车按钮，跳到购物车页面
$('.cart').click(function(){
	if (username) {
		location.href="shopping.html";
	} else{
		location.href="login.html";
	}
})


