var username=sessionStorage.getItem('username');
var useraddr=sessionStorage.getItem('useraddr');
var img_url="http://47.92.37.168/supermarket/img/";
var num_cart=0;
var total_price=0;
var flag_tab=true;
//点击天猫超市展开，收起商品列表
$('.shop-top').click(function(){
	if (flag_tab) {
		$('.main').hide();
	} else{
		$('.main').show();
	}
	flag_tab=!flag_tab;
})
//获取购物车产品数量
$.ajax({
	type:"get"
	,url:"http://47.92.37.168/supermarket/data/get_commodity_car.php"//查看购物车
	,async:true
	,data:{
		'user_phone':username
	}
	,dataType:"jsonp"
	,jsonp:"callback"
	,success:function(data){
		console.log(data);
		num_cart=data.length;
		if (data) {
			$(data).each(function(){
				$('.main').append("<div class='shop-content' id="+this.commodity_id+"><span class='icon'></span><div class='shop-content-img'><img src='' /></div><div class='shop-content-center'><div class='shop-content-center-top'><p>"+"【天猫超市】"+"</p></div><input type='button' value='-' class='subtract' /><div class='shop-content-center-bottom2' contenteditable='true'>"+this.count+"</div><input type='button' value='+' class='plus' /></div><div class='shop-content-right'><p>数量x<span class='pro_num'>"+this.count+"</span></p><p>￥<span class='pro_price'>"+9+"</span></p><img src='../img/shop_2.png' class='pro_delete' id="+this.commodity_id+" /></div></div>");
				//获取产品图片、名称、单价
				var index=$(data).index(this);
				//console.log(this.commodity_id);//39、40、55、31
				getData(this.commodity_id,index);//发送ajax请求是按顺序发送的
			});
			//当产品数量为1时，减按钮为白色
			$('.shop-content-center-bottom2').each(function(){
				if ($(this).text()==1) {
					$(this).prev().addClass('bg_sub');
				}
			})
		}
	}
});
//获取产品图片、名称、单价的函数
function getData (pro_id,index) {
	$.ajax({
		type:"get"
		,url:"http://47.92.37.168/supermarket/data/get_commodity_info.php"
		,async:true
		,data:{
			'id':pro_id
		}
		,dataType:"jsonp"
		,jsonp:"callback"
		,success:function(data){//接收到的数据缺不是原来的顺序，随机的39 0,55 2,40 1,31 3
//			console.log(pro_id,data);
			$('.shop-content-img').eq(index).children('img').attr('src',img_url+data.img);
			$('.shop-content-center-top').eq(index).children('p').text('【天猫超市】 '+data.name);
			$('.pro_price').eq(index).attr('price',data.price);
			$('.pro_num').eq(index).attr('weight',parseFloat(data.weight));
			//获取单个商品总价
			$('.pro_price').eq(index).text( ($('.pro_num').eq(index).text()*data.price).toFixed(2) );
			//获取购物车商品总价
			getTotalPrice();
		}
	});
}

//计算购物车商品总价函数
function getTotalPrice () {
	total_price=0;
	var total_weight=0;
	$('.pro_price.selected').each(function(){
		total_price+=Number($(this).text());
		total_weight+= $(this).parent().prev().children('span').attr('weight')*$(this).parent().prev().children('span').text();
	})
	total_price=total_price.toFixed(2);
	total_weight=total_weight.toFixed(2);
	$('.total_price').text("￥"+total_price);
	$('.total_weight').text(total_weight+"kg");
}

var flag_all=true;
var num_total=num_cart;
$(window).load(function(){
	fn_span();
})
//封装函数-全选
function fn_span () {
	$('.shop-content>span').each(function(){
		if (!$(this).hasClass('active')) {
			flag_all=false;
		}
	})
	if (flag_all==false) {
		$('.shop-top>span').addClass('active');
    	$('.shop-content>span').addClass('active');
    	$('.shop-footer>span').addClass('active');
    	num_total=num_cart;
    	$('#get_result').addClass('bg_pay');
    	$('.pro_price').addClass('selected');
	} else{
		$('.shop-top>span').removeClass('active');
    	$('.shop-content>span').removeClass('active');
    	$('.shop-footer>span').removeClass('active');
    	num_total=0;
    	$('#get_result').removeClass('bg_pay');
    	$('.pro_price').removeClass('selected');
	}
	$('#get_result span').text(num_total);
	getTotalPrice();//获取购物车商品总价
	flag_all=true;
}
//点击顶部全选
$('.shop-top>span').click(function(){
	stopPro();//阻止冒泡
	fn_span();
})
//点击底部全选
$('.shop-footer>span').click(function(){
	fn_span();
})
//点击列表项
$(document).on('click','.shop-content>span',function(){
	var index=$('.shop-content>span').index(this);
	if (!$(this).hasClass('active')) {
		$(this).addClass('active');
		$('.pro_price').eq(index).addClass('selected');
		num_total++;
	} else{
		$(this).removeClass('active');
		$('.pro_price').eq(index).removeClass('selected');
		num_total--;
	}
	if (num_total==0) {
		$('#get_result').removeClass('bg_pay');//结算按钮样式
	}else{
		$('#get_result').addClass('bg_pay');
	}
	$('#get_result span').text(num_total);
	$('.shop-content>span').each(function(){
		if (!$(this).hasClass('active')) {
			flag_all=false;
		}
	})
	if (flag_all==false) {
		$('.shop-top>span').removeClass('active');
		$('.shop-footer>span').removeClass('active');
	} else{
		$('.shop-top>span').addClass('active');
		$('.shop-footer>span').addClass('active');
	}
	flag_all=true;
	getTotalPrice();
})
//删除产品
var pro_id=0;
var _this=null;
$(document).on('click','.pro_delete',function(){
	$('.overlay').css('display','block');
	$('.confirm').css({'opacity':'1','transform':'scale(1)'});
	pro_id=$(this).attr('id');
	_this=$(this);
})
//删除商品时点击确定按钮
$('.confirm_ok').click(function(){
	//删除数据表里的商品
	$.ajax({
		type:"get"
		,url:"http://47.92.37.168/supermarket/data/my_commodity_delete_car.php"
		,async:true
		,data:{
			'commodity_id':pro_id,
			'user_phone':username
		}
		,dataType:"jsonp"
		,jsonp:"callback"
		,success:function(data){
			console.log(data);
			if (data[0].msg=='success') {
				_this.parents('.shop-content').animate({'opacity':'0'},300,function(){
					_this.parents('.shop-content').remove();//删除页面上此栏产品
					getTotalPrice();//获取购物车商品总价
				});
				num_cart--;//商品的个数减一
				num_total--;//获取购物车商品数量
				if (num_total==0) {
					$('#get_result').removeClass('bg_pay');
					$('.shop-top>span').removeClass('active');
    				$('.shop-footer>span').removeClass('active');
				}
				$('#get_result span').text(num_total);
			}
		}
	});
	$('.overlay').css('display','none');
	$('.confirm').css({'opacity':'0','transform':'scale(0)'});
})
//删除商品时点击取消按钮
$('.confirm_cancel').click(function(){
	$('.overlay').css('display','none');
	$('.confirm').css({'opacity':'0','transform':'scale(0)'});
})

//点击加按钮
$(document).on('click','.plus',function(){
	$(this).siblings('.subtract').removeClass('bg_sub');
	var num=$(this).prev().text();
	var index=$('.plus').index(this);
	num++;
	$(this).prev().text(num);
	$('.pro_num').eq(index).text(num);
	$('.pro_price').eq(index).text( (num*$('.pro_price').eq(index).attr('price')).toFixed(2) );
	getTotalPrice();//获取购物车商品总价
	setCount(num,$(this));
})
//点击减按钮
$(document).on('click','.subtract',function(){
	var num=$(this).next().text();
	var index=$('.subtract').index(this);
	if(num==1){
		return;
	}
	num--;
	if(num==1){
		$(this).addClass('bg_sub');
	}
	$(this).next().text(num);
	$('.pro_num').eq(index).text(num);
	$('.pro_price').eq(index).text( (num*$('.pro_price').eq(index).attr('price')).toFixed(2) );
	getTotalPrice();//获取购物车商品总价
	setCount(num,$(this));	
})
//点击加减修改数据库数据-函数
function setCount (num,_this) {
	$.ajax({
		type:"get"
		,url:"http://47.92.37.168/supermarket/data/my_commodity_update_car.php"
		,async:true
		,data:{
			'user_phone':username,
			'commodity_id':_this.parents('.shop-content').attr('id'),
			'count':num
		}
		,dataType:"jsonp"
		,jsonp:"callback"
		,success:function(data){
			console.log(data);
		}
	});
}
//产品数量获取焦点时得到商品数量
var commodity_num=0;
var reg_cn=/^[1-9][0-9]*$/;
$(document).on('focus','.shop-content-center-bottom2',function(){
	commodity_num=$(this).text();
})
//产品数量失去焦点时改变前后台数据
$(document).on('blur','.shop-content-center-bottom2',function(){
	var index=$('.shop-content-center-bottom2').index(this);
	if ( reg_cn.test($(this).text()) ) {
		$('.pro_price').eq(index).text( ($(this).text()*$('.pro_price').eq(index).attr('price')).toFixed(2) );
		$('.pro_num').eq(index).text( $(this).text() );
		getTotalPrice();//购物车总价也要变
		//改变数据库的数据
		setCount($(this).text(),$(this));
	} else{
		$(this).text(commodity_num);
	}
	if ($(this).text()==1) {
		$('.subtract').addClass('bg_sub');
	}else{
		$('.subtract').removeClass('bg_sub');
	}
})


//点击结算按钮，跳转到结算页面
$('#get_result').click(function(){
	if ($(this).hasClass('bg_pay')) {
		if (useraddr) {
			var arr=useraddr.split('-');
			var num=0;
			$('.shop-content').each(function(){
				if ( $(this).children('.icon').hasClass('active') ) {
					$.ajax({
						type:"get"
						,url:"http://47.92.37.168/supermarket/data/my_commodity_order.php"
						,async:true
						,data:{
							'commodity_id':$(this).attr('id'),//单品id
							'user_phone':username,//账号
							'count':$(this).find('.shop-content-right .pro_num').text(),//单品数量
							'user_name':arr[3],//收货人姓名
							'user_addr':arr[0]+arr[1]+arr[2],//收货地址
							'consignee_phone':arr[4]//收货人手机号
						}
						,dataType:"jsonp"
						,jsonp:"callback"
						,success:function(data){
							console.log(data);
							if (data[0].msg=='success') {
								num++;
								if (num==num_total) {
									sessionStorage.setItem('total_price',total_price);
									location.href="account_success.html";
								}
							}
						}
					});
				}
			})
		}else{
			location.href="address.html";
		}
	}
})

//点击搜索天猫超市跳转到搜索页面
$('.shop-header-center').click(function(){
	location.href="search.html";
})

//阻止冒泡的函数
function stopPro (evt) {
	var e=evt||window.event;
	if (e.stopPropagation) {
		e.stopPropagation();//w3c阻止冒泡方法
	} else{
		e.cancelBubble=true;//IE阻止冒泡方法
	}
}

