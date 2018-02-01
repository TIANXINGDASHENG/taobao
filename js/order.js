var username=sessionStorage.getItem('username');
var img_url="http://47.92.37.168/supermarket/img/";
//点击返回按钮
$('.back').click(function(){
	window.location.href='personal.html';
})
//点击选项卡
$('.nav li').click(function () {
	$(this).addClass('current').siblings().removeClass('current');
})
//切换选项卡下面的ul，div
$('.all').click(function(){
	$('.order_list').css('display','block').siblings().css('display','none');
})
$('.waitPay').click(function(){
	$('.order').css('display','block').siblings().css('display','none');
})
$('.waitSend').click(function(){
	$('.order').css('display','block').siblings().css('display','none');
})
$('.waitConfirm').click(function(){
	$('.order').css('display','block').siblings().css('display','none');
})
$('.waitRate').click(function(){
	$('.order_list').css('display','block').siblings().css('display','none');
})
//点击随便逛逛，跳到主页
$('.order_stroll').click(function(){
	window.location.href='../index.html';
})
//生成全部订单
var arr_id=[];
var num=0;
$.ajax({
	type:"get"
	,url:"http://47.92.37.168/supermarket/data/get_commodity_order.php"
	,async:true
	,data:{
		'user_phone':username
	}
	,dataType:"jsonp"
	,jsonp:"callback"
	,success:function(data){
		console.log(data);
		$(data).each(function(){
			$('.order_list').append('<li><div class="seller"><img src="../img/icon_tianmao.png" class="icon_tianmao"/><a href="javascript:;" class="store_name"><span>店铺名称</span><span class="icon-right"></span></a><div class="state"><p class="state_success">交易成功</p></div></div><div class="content" json='+JSON.stringify(this)+'><img src="" class="content_img"/><p class="content_info"></p><div class="content_price"><p class="price">￥<span></span></p><p class="nums">x<span>'+this.count+'</span></p></div></div><div class="total"><span>共<span class="commodity_num">'+this.count+'</span>件商品</span><span>合计：<b class="total_price"></b></span><span>（含运费<b>￥0.00</b>）</span></div><div class="dispose_order"><div class="evaluate_order" id='+this.commodity_id+' consignee_name='+this.user_name+'>评价</div><div class="remove_order" id='+this.commodity_id+' time='+this.order_time+'>删除订单</div></div></li>');
			arr_id.push(this.commodity_id);
		});
//		console.log(arr_id);
		getProDetails(arr_id[num]);
	}
});
//获取商品图片、名称、单价的函数
function getProDetails(pro_id) {
	$.ajax({
		type:"get"
		,url:"http://47.92.37.168/supermarket/data/get_commodity_info.php"
		,async:true
		,data:{
			'id':pro_id
		}
		,dataType:"jsonp"
		,jsonp:"callback"
		,success:function(data){
			console.log(data);
			$('.content_img').eq(num).attr('src',img_url+data.img);
			$('.content_info').eq(num).text(data.name);
			$('.price span').eq(num).text(data.price);
			$('.total_price').eq(num).text("￥"+(data.price*$('.commodity_num').eq(num).text()).toFixed(2));
			num++;
			if(num==arr_id.length) return;
			getProDetails(arr_id[num]);//用递归函数来获取商品详情
		}
	});
}

var _this=null;
//点击删除订单
$(document).on('click','.remove_order',function(){
	$(document).bind('touchmove',function(e){
		preDef(e);
	});
	$('.over_lay').css('display','block');
	$('.confirm').css('display','block');
	_this=$(this);
})

//点击取消按钮
$('.cancel').click(function(){
	$('.over_lay').css('display','none');
	$('.confirm').css('display','none');
	$(document).unbind('touchmove');
})
//点击确定按钮
$('.ok').click(function(){
	$('.over_lay').css('display','none');
	$('.confirm').css('display','none');
	$.ajax({
		type:"get"
		,url:"http://47.92.37.168/supermarket/data/my_commodity_delete_order.php"
		,async:true
		,data:{
			'order_time':_this.attr('time'),//删除此订单的条件——订单时间
			'commodity_id':_this.attr('id'),//删除此订单的条件——商品id
			'user_phone':username//删除此订单的条件——账号
		}
		,dataType:"jsonp"
		,jsonp:"callback"
		,success:function(data){
			console.log(data);
			if (data[0].msg=='success') {
				_this.parents('li').remove();
				$('.over_lay').show(1,function(){
					setTimeout(function(){
						$('.over_lay').hide();
					},2000);
				});
				$('.delete_success').show(1,function(){
					setTimeout(function(){
						$('.delete_success').hide();
						$(document).unbind('touchmove');
					},2000);
				});
			}
		}
	});
})
//点击评价订单
$(document).on('click','.evaluate_order',function(){
	sessionStorage.setItem('pro_id',$(this).attr('id'));
	sessionStorage.setItem('consignee_name',$(this).attr('consignee_name'));
	sessionStorage.setItem('img_src',$(this).parents('li').find('.content .content_img').attr('src'));
	location.href="evaluate.html";
})


//点击商品图片跳转到订单详情页面
$(document).on('click','.content_img',function(){
	sessionStorage.setItem('order_details',$(this).parent().attr('json'));
	location.href="order_details.html";
})
//点击商品名跳转到订单详情页面
$(document).on('click','.content_info',function(){
	sessionStorage.setItem('order_details',$(this).parent().attr('json'));
	location.href="order_details.html";
})

//取消默认事件
function preDef (evt) {
	var e=evt||window.event;
	if (e.preventDefault) {
		e.preventDefault();
	} else{
		e.returnValue=false;
	}
}