function $ (ele) {
	return document.querySelector(ele);
}
var oldX,newX,index = 0,index2=0,timer = null,allDot=$('.banner_dot').children;
var needW=$('.banner').clientWidth;
$('.banner').addEventListener('touchstart',function(e){
	e.preventDefault();
	clearInterval(timer);
	if(index == 0){
		$('.banner_ul').insertBefore($('.banner_ul').children[$('.banner_ul').children.length-1],$('.banner_ul').children[0]);
		$('.banner_ul').children[index+1].style.transition = '0s';
		$('.banner_ul').children[index+1].style.transform ='translateX('+(-needW)+'px)';
		$('.banner_ul').children[index].style.transition = '0s';
		$('.banner_ul').children[index].style.transform ='translateX('+(-needW)+'px)';
		index++;
	}
	if(index == $('.banner_ul').children.length-1){
		$('.banner_ul').appendChild($('.banner_ul').children[0]);
		$('.banner_ul').children[index-1].style.transition = '0s';
		$('.banner_ul').children[index-1].style.transform ='translateX('+((-index+1)*needW)+'px)';
		$('.banner_ul').children[index].style.transition = '0s';
		$('.banner_ul').children[index].style.transform ='translateX('+((-index+1)*needW)+'px)'
		index--;
	}
	newX = oldX = e.touches[0].clientX;
	$('.banner_ul').children[index-1] && ($('.banner_ul').children[index-1].style.transition = '0s');
	$('.banner_ul').children[index].style.transition = '0s';
	$('.banner_ul').children[index+1] && ($('.banner_ul').children[index+1].style.transition = '0s');

},false);
$('.banner').addEventListener('touchmove',function(e){
	e.preventDefault();
	newX = e.touches[0].clientX;
	var needX2 = newX - oldX;
	$('.banner_ul').children[index].style.transform='translate('+((needX2)+(-index*needW))+'px)';
	$('.banner_ul').children[index+1] && ($('.banner_ul').children[index+1].style.transform='translate('+((needX2)+(-index*needW))+'px)');
	$('.banner_ul').children[index-1] && ($('.banner_ul').children[index-1].style.transform='translate('+((needX2)+(-index*needW))+'px)');

},false);
$('.banner').addEventListener('touchend',function(e){
	e.preventDefault();
	var needX = newX - oldX;
	if(needX > 60){
		$('.banner_ul').children[index].style.transition = '0.3s';
		$('.banner_ul').children[index-1] && ($('.banner_ul').children[index-1].style.transition = '0.3s');
		$('.banner_ul').children[index].style.transform ='translateX('+(needW+(-index*needW))+'px)';
		$('.banner_ul').children[index-1] && ($('.banner_ul').children[index-1].style.transform ='translateX('+(needW+(-index*needW))+'px)');
		index--;
		index2--;
		if (index2==-1) index2=allDot.length-1;
		for (var i=0;i<allDot.length;i++) {
			allDot[i].className='';
		}
		allDot[index2].className='bg';
	}
	else if(needX < 60 && needX > -60){
		$('.banner_ul').children[index].style.transition = '0.3s';
		$('.banner_ul').children[index].style.transform ='translateX('+((-needW)+((-index+1)*needW))+'px)';
		$('.banner_ul').children[index+1].style.transition = '0.3s';
		$('.banner_ul').children[index+1].style.transform ='translateX('+((-needW)+((-index+1)*needW))+'px)';
		$('.banner_ul').children[index-1].style.transition = '0.3s';
		$('.banner_ul').children[index-1].style.transform ='translateX('+((-needW)+((-index+1)*needW))+'px)';
	}
	else{
		$('.banner_ul').children[index].style.transition = '0.3s';
		$('.banner_ul').children[index+1] && ($('.banner_ul').children[index+1].style.transition = '0.3s');

		$('.banner_ul').children[index].style.transform ='translateX('+((-needW)+(-index*needW))+'px)';
		$('.banner_ul').children[index+1] && ($('.banner_ul').children[index+1].style.transform ='translateX('+((-needW)+(-index*needW))+'px)');
		index++;
		index2++;
		if(index2==allDot.length) index2=0;
		for (var i=0;i<allDot.length;i++) {
			allDot[i].className='';
		}
		allDot[index2].className='bg';
	}
	clearInterval(timer);
	timer = setInterval(toLeft,2000);
},false);

timer = setInterval(toLeft,2000);
function toLeft(){
	if(index == $('.banner_ul').children.length-1){
		$('.banner_ul').appendChild($('.banner_ul').children[0]);
		$('.banner_ul').children[index-1].style.transition = '0s';
		$('.banner_ul').children[index-1].style.transform ='translateX('+((-index+1)*needW)+'px)';
		$('.banner_ul').children[index].style.transition = '0s';
		$('.banner_ul').children[index].style.transform ='translateX('+((-index+1)*needW)+'px)'
		index--;
	}
	$('.banner_ul').children[index+1] && ($('.banner_ul').children[index+1].style.transition = '0s');
	$('.banner_ul').children[index+1] && ($('.banner_ul').children[index+1].style.transform ='translateX('+((-needW)+((-index+1)*needW))+'px)');

	setTimeout(function (){
		$('.banner_ul').children[index].style.transition = '0.3s';
		$('.banner_ul').children[index+1] && ($('.banner_ul').children[index+1].style.transition = '0.3s');

		$('.banner_ul').children[index].style.transform ='translateX('+((-needW)+(-index*needW))+'px)';
		$('.banner_ul').children[index+1] && ($('.banner_ul').children[index+1].style.transform ='translateX('+((-needW)+(-index*needW))+'px)');
		index++;
		index2++;
		if(index2==allDot.length) index2=0;
		for (var i=0;i<allDot.length;i++) {
			allDot[i].className='';
		}
		allDot[index2].className='bg';
	},0)
}
