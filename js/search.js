var img_url="http://47.92.37.168/supermarket/img/";
var username=sessionStorage.getItem('username');
var aData=[];
//friter 综合、热销、价格切换
var show_len =$(".tm-filter ul li").length;
for (var i=0;i<show_len;i++) {
	$(".tm-filter ul li").eq(i).on('touchstart',function(){
		for (var i=0;i<show_len;i++) {
			$(".tm-filter ul li").eq(i).removeClass('cur').children().children().css('background','#5E646E');
		}
		$(this).addClass('cur').children().children().css('background','white');
	})
}
//点击底部购物车按钮，跳到购物车页面
$('.cart').click(function(){
	if (username) {
		location.href="shopping.html";
	} else{
		location.href="login.html";
	}
})
//点击商品购物车按钮，添加商品
$(document).on('click','.rt',function(e){
	stopPro(e);//阻止冒泡
	var _this=$(this);
	if (username) {
		$.ajax({
			type:"get"
			,url:"http://47.92.37.168/supermarket/data/my_commodity_car.php"
			,async:true
			,data:{
				'user_phone':username,
				'commodity_id':$(this).attr('id'),
				'count':1
			}
			,dataType:"jsonp"
			,jsonp:"callback"
			,success:function(data){
				console.log(data);
				if (data.msg=='success') {
					//图片移动效果
					var left=$('.cart').offset().left;//底部购物车距离文档左侧的距离
					var top=$('.cart').offset().top;//底部购物车距离文档顶部的距离
					$('body').append("<img class='addImg' src='"+_this.parents('.list-product').find('.fig-img img').attr('src')+"' />");
					$('.addImg').css({'left':_this.offset().left+'px','top':_this.offset().top+'px'});
					$('.addImg').animate({'left':left+'px','top':top+'px'},500,function(){
						$('.addImg').remove();
					})
				}
			}
		});
	} else{
		location.href="login.html";
	}
})
//点击商品图片或者名称跳到商品详情页面
$(document).on('click','.fig-img',function(){
	sessionStorage.setItem("pro_id",this.id);
})
$(document).on('click','.list-txt a',function(){
	sessionStorage.setItem("pro_id",this.id);
})
//点击input，弹出搜索界面
$('.search-k').click(function(){
	$('.searchBox').css('display','block');
	$('.search').focus();//搜索框获取焦点
})
//点击取消按钮，关闭搜索界面
$('.close_searchBox').click(function(){
	$('.searchBox').css('display','none');
})
//点击删除按钮时，本身消失，提示消失
$('.reset').click(function(){
	$(this).css('display','none');
	$('.list').empty();
})
//获取sb_menu的高度
$('.sb_menu').height($('.searchBox').height()-$('.sb_search').height());
//生成商品历史记录
var history_record=localStorage.getItem("history");
if (history_record) {
	var Json=JSON.parse(history_record);
	for (key in Json) {
		$('.history_list').append("<li>"+Json[key]+"</li>");
	}
}
//点击历史记录的删除按钮时，删除页面上的元素，并且本地储存中的数据也删除
$('#history_delete').click(function(){
	$('.history_list').empty();
	localStorage.removeItem("history");
})
var strdomin="";
//搜索框输入内容时
$('.search').keyup(function(){
	if ($(this).val()=='') {
		$('.reset').css('display','none');
	} else{
		$('.reset').css('display','block');
	}
	strdomin=$.trim($(this).val());
	var qsData={
		'wd':strdomin,
		'p':'3',
		'cb':'ShowDiv',
		't':'1324113456725'
	};
	$.ajax({
		type:"get"
		,url:"http://suggestion.baidu.com/su"
		,async:false
		,data:qsData
		,dataType:"jsonp"
		,jsonp:"jsoncallback"
		,jsonpCallback:"ShowDiv"
		,timeout:5000
		,success:function(data){
			console.log(data);
			var arr=data.s;
			$('.list').empty();
			if (arr) {
				for (var i=0;i<arr.length;i++) {
					$('.list').append("<li>"+arr[i]+"</li>");//百度指数
					if (i%2==0) {
						$('.list li').eq(i).addClass('border_right');
					}
				}
			}
		}
	});
})
//刷新页面直接展示商品
show(sessionStorage.getItem("pro_name"));
//点击提交按钮
$('.tijiao').click(function(){
	show(strdomin);
})
//点击历史记录中的商品时，生成商品列表
$(document).on('click','.history_list li',function(){
	var pro_name=$(this).text();
	show(pro_name);
})
function show (pro_str) {
	if (!pro_str) {
		return;
	}
	$('.all-list-ul').empty();
	$('#synthesize').addClass('cur').siblings().removeClass('cur');
	$('.searchBox').css('display','none');
	$('#search').val(pro_str);
	sessionStorage.setItem("pro_name",pro_str);
	$.ajax({
		type:"get"
		,url:"http://47.92.37.168/supermarket/data/getcommditybykw.php"
		,async:true
		,data:{
			'kw':pro_str
		}
		,dataType:"jsonp"
		,jsonp:"callback"
		,success:function(data){
			aData=data;
			console.log(data);
			if (data) {
				$('.noresult').css('display','none');
				$('.all-list-ul').css('display','block');
				$(data).each(function(){
					$('.all-list-ul').append("<li class='list-product'><a href='details.html' id='"+this.id+"' class='fig-img'><img src='"+img_url+this.img+"' /></a><div class='fig-text'><div class='list-txt'><a href='details.html' id='"+this.id+"'>"+this.name+"</a></div><div class='list-price clear'><div class='lt'><p>月销量"+$(this).attr('count')+"件</p><strong>¥"+this.price+"</strong><s>¥"+(Number(this.price)+30).toFixed(2)+"</s></div><button class='rt' id='"+this.id+"'><span class='icon-cart'></span></button></div></div></li>");
				});
				if (!localStorage.getItem("history")) {
					localStorage.setItem("history",'{"a":"'+pro_str+'"}');
				}else{
					var str=localStorage.getItem("history");
					var json=JSON.parse(str);
					var num=0;
					var item=null;
					for (key in json) {
						if (key.length>num) {
							num=key.length;
							item=key;
						}
						if (json[key]==pro_str) {//如果json里有查找的商品名，则不往json里添加数据
							return;
						}
					}
					json[item+1]=pro_str;
					str=JSON.stringify(json);
					console.log(str);
					localStorage.setItem("history",str);
				}
				var history_record=localStorage.getItem("history");
				var Json=JSON.parse(history_record);
				$('.history_list').empty();
				for (key in Json) {
					$('.history_list').append("<li>"+Json[key]+"</li>");//显示历史记录
				}
			}else{
				$('.noresult').css('display','block');
				$('.all-list-ul').css('display','none');
				$('.noresult span').text(pro_str);
			}
		}
	});
}

var flag_arrow=true;
//点击综合按钮
$('#synthesize').click(function(){
	flag_arrow=true;
	fn_create(aData);
})
//点击热销按钮
$('#hot_sale').click(function(){
	flag_arrow=true;
	var arr=aData.concat([]);
	arr.sort(function(a,b){
		a=a.count;
		b=b.count;
		return b-a;
	});
	fn_create(arr);
})
//点击价格按钮
$('#price').click(function(){
	var arr=aData.concat([]);
	if (flag_arrow==true) {
		$('#price').removeClass('down').addClass('up');
		arr.sort(function(a,b){
			a=a.price;
			b=b.price;
			return a-b;
		});
	} else{
		$('#price').removeClass('up').addClass('down');
		arr.sort(function(a,b){
			a=a.price;
			b=b.price;
			return b-a;
		});
	}
	fn_create(arr);
	flag_arrow=!flag_arrow;
})
//生成商品列表的函数
function fn_create (arr) {
	$('.all-list-ul').empty();
	$(arr).each(function(){
		$('.all-list-ul').append("<li class='list-product'><a href='details.html' id='"+this.id+"' class='fig-img'><img src='"+img_url+this.img+"' /></a><div class='fig-text'><div class='list-txt'><a href='details.html' id='"+this.id+"'>"+this.name+"</a></div><div class='list-price clear'><div class='lt'><p>月销量"+$(this).attr('count')+"件</p><strong>¥"+this.price+"</strong><s>¥"+(Number(this.price)+30).toFixed(2)+"</s></div><button class='rt' id='"+this.id+"'><span class='icon-cart'></span></button></div></div></li>");
	});
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
