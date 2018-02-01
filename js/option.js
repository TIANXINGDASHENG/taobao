$(document).ready(function(){

	var scrollTop = scrollTop2 =null; //滚去的距离
	var img_url="http://47.92.37.168/supermarket/img/";//后台获取图片数据 的前缀拼接
	var username=sessionStorage.getItem('username');//缓存 获取用户名
	var num=sessionStorage.getItem('num');// 缓存 获取选项 index 值
	var classify=null;// 选项 种类
	var start=0; // 开始获取的数据
	var flag_update=true; // 默认状态下向后台请求发送请求
	map(num);
	//根据缓存中的index  确定选项
	function map(num){
		switch (num){
			case '0':
			classify='muying';
				break;
			case '1':
			classify='lingshi';
				break;
			case '2':
			classify='jiushui';
				break;
			case '3':
			classify='liangyou';
				break;
			case '4':
			classify='meirong';
				break;
			case '5':
			classify='jingxuan';
				break;
			case '6':
			classify='jiaqing';
				break;
			case '7':
			classify='jiayong';
				break;
			case '8':
			classify='shengxian';
				break;
			case '9':
			classify='jiayong';
				break;
		}
	}
	//获取后台数据
	// $('.list-product').scrollLeft((num-3)*70);
	$('.nav_main a').eq(num).addClass('current');//给点击的那一选项 加下划线
	 $('.pro_lb').css('margin-left',-16*num+'rem');
	getData(start,classify);
	function getData (start,classify) {
		$.ajax({
			 type:"post"
			,url:"http://47.92.37.168/supermarket/data/get_commodity.php"
			,async:true
			,data:{
				'start':start,
				'classify':classify
			}
			// ,dataType:"jsonp"
			// ,jsonp:"callback"
			,success:function(data){
				console.log(data);
				if (data) {
			 		for (var i=0;i<data.length;i++) {
						$('.list').eq(num).append("<li id="+data[i].id+"><a href='javascript:;'><img src="+img_url+data[i].img+" class='list_img' /><div class='list_main'><p class='list_title'>"+data[i].name+"</p><div class='list_info'><p class='list_sales'>月销"+data[i].count+"件</p><p class='list_price'>￥"+data[i].price+"</p><button class='icon_btn'><span class='icon-cart'></span></button></div></div></a></li>");
					}
					var aLi=$('.list').eq(num).children();
					for (var i=0;i<aLi.length;i++) {
						if (i%2==0) {
							aLi.eq(i).addClass('border_right');
						}
					}
					if(data.length<4){
						flag_update=false;
					}
				} else{
					flag_update=false;
				}
			}
		});
	}
	//导航栏滚动效果
	$(document).on('touchstart',function(e){
		scrollTop=$(document).scrollTop();
	})
	$(document).on('touchmove',function(e){
		scrollTop2=$(document).scrollTop();
		if ( scrollTop2 > scrollTop ) {
			$('.header-top').css({'top':'-45px','transition':'1s'});
			$('.list-product').css('transition','1s').css('top','0px');
		}else{
			$('.header-top').css({'top':'0px','transition':'1s'});
			$('.list-product').css('transition','1s').css('top','45px');
		}
	});
	//向上滑动更新数据
	$(document).on('touchend',function(e){
		if ( $(this).scrollTop()==$(this).height()-$(window).height() && flag_update ) {
			start+=4;
			getData(start,classify);
		}
	})
	//向左滑动切换数据
	// option_lb($('.pro'),$('.pro_lb'));
	
	//点击导航菜单
	$('.nav_main li').click(function(ev){
		var e=ev||window.event;
		if (e.clientX<60) {
			$('.list-product').scrollLeft($('.list-product').scrollLeft()-70);
		}
		if (e.clientX>$(window).width()-60) {
			$('.list-product').scrollLeft($('.list-product').scrollLeft()+70);
		}
		start=0;
		flag_update=true;
		$('.nav_main a').removeClass('current');
		$(this).children('a').addClass('current');
		num=$(this).index();
		map(num+'');//改变classify的值
		$('.pro_lb').animate({'marginLeft':-num*16+'rem'},500,function(){
			$('.list').empty();
		});
		getData(start,classify);
		//console.log(e.clientX,$(window).width(),$(this).index(),$('.list-product').scrollLeft());
	})
	//点击产品跳转到详情页
	$(document).on('click','.list li',function(){
		sessionStorage.setItem('pro_id',$(this).attr('id'));
		location.href="details.html";
	})
	//点击商品购物车按钮，把产品加入购物车
	$(document).on('click','.icon_btn',function(e){
		stopPro(e);//阻止冒泡
//		var left=$('.cart').offset().left;//距离文档左侧的距离
//		var top=$('.cart').offset().top;//距离文档顶部的距离
		var _this=$(this);
		if (username) {
			$.ajax({
				type:"get"
				,url:"http://47.92.37.168/supermarket/data/my_commodity_car.php"
				,async:true
				,data:{
					'user_phone':username,
					'commodity_id':$(this).parents('li').attr('id'),
					'count':1
				}
				,dataType:"jsonp"
				,jsonp:"callback"
				,success:function(data){
					console.log(data);
					if (data.msg=='success') {
						//图片移动效果
						var left=$('.cart').offset().left;//距离文档左侧的距离
						var top=$('.cart').offset().top;//距离文档顶部的距离
						$('body').append("<img class='addImg' src='"+_this.parents('a').find('.list_img').attr('src')+"' />");
						$('.addImg').css({'left':_this.offset().left+'px','top':_this.offset().top+'px'});
						$('.addImg').animate({'left':left+'px','top':top+'px'},1000,function(){
							$('.addImg').remove();
						})
					}
				}
			});
		} else{
			location.href="login.html";
		}
	})
	//左右滑屏函数
// 	function option_lb (oBox,oBox_l) {
// 		var oldX,newX,oldY,newY;
// 		var needW=oBox.clientWidth;
// 		var flag_lb=true;
// 		var flag_lbX=false;
// 		var flag_lbY=false;
// 		oBox.on('touchstart',function(e){
// //			console.log(e);
// 			newX = oldX = e.originalEvent.touches[0].clientX;
// 			newY = oldY = e.originalEvent.touches[0].clientY;
// 			flag_lb=true;
// 			flag_lbX=false;
// 			flag_lbY=false;
// 		});
//
// 		oBox.on('touchmove',function(e){
// 			newX = e.originalEvent.touches[0].clientX;
// 			newY = e.originalEvent.touches[0].clientY;
// 			var needX2 = newX - oldX;
// 			var needY2 = newY - oldY;
// 			if (flag_lb) {
// 				if (Math.abs(needY2)/Math.abs(needX2)>0.577) {//30deg
// 					flag_lbY=true;
// 				}
// 				else if (Math.abs(needY2)/Math.abs(needX2)<0.577) {
// 					flag_lbX=true;
// 				}
// 				flag_lb=false;
// 			}
// 			if (flag_lbX) {
// 				preDef(e);//阻止默认事件，document的上下移动
// 				$('.pro_lb').css({'marginLeft':-num*16+needX2/40+'rem'});
// 			}
// 		});
//
// 		oBox.on('touchend',function(e){
// 			var needX = newX - oldX;
// 			if (flag_lbX) {
// 				if(needX > 60){//向右滑动
// 					num--;
// 					if(num==-1){
// 						num=0;
// 						$('.pro_lb').animate({'marginLeft':-num*16+'rem'},500);
// 						return;
// 					}
// 					$('.list-product').scrollLeft($('.list-product').scrollLeft()+70*(num-5));
// 					$('.nav_main a').removeClass('current');
// 					$('.nav_main a').eq(num).addClass('current');
// 					$('.pro_lb').animate({'marginLeft':-num*16+'rem'},500,function(){
// 						$('.list').empty();
// 					});
// 					start=0;
// 					flag_update=true;
// 					map(num+'');//改变classify的值
// 					getData(start,classify);
// 				}
// 				else if(needX < 60 && needX > -60){
// 					$('.pro_lb').animate({'marginLeft':-num*16+'rem'},500);
// 				}
// 				else if(needX<-60){//向左滑动
// 					num++;
// 					if(num==10){
// 						num=9;
// 						$('.pro_lb').animate({'marginLeft':-num*16+'rem'},500);
// 						return;
// 					}
// 					$('.list-product').scrollLeft($('.list-product').scrollLeft()+70*(num-3));
// 					$('.nav_main a').removeClass('current');
// 					$('.nav_main a').eq(num).addClass('current');
// 					$('.pro_lb').animate({'marginLeft':-num*16+'rem'},500,function(){
// 						$('.list').empty();
// 					});
// 					start=0;
// 					flag_update=true;
// 					map(num+'');//改变classify的值
// 					getData(start,classify);
// 				}
// 			}
// 		});
// 	}
	//点击顶部购物车按钮，跳到购物车页面
	$('.cart').click(function(){
		if (username) {
			location.href="shopping.html";
		} else{
			location.href="login.html";
		}
	})
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
//阻止冒泡的函数
function stopPro (evt) {
	var e=evt||window.event;
	if (e.stopPropagation) {
		e.stopPropagation();//w3c阻止冒泡方法
	} else{
		e.cancelBubble=true;//IE阻止冒泡方法
	}
}












