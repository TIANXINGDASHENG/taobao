function option_lb (oBox,oBox_l,n) {
	var oldX,newX,index = n,timer = null;
	var needW=oBox.clientWidth;
	console.log(needW);
	oBox.addEventListener('touchstart',function(e){
//		e.preventDefault();
		if(index == 0){
			oBox_l.insertBefore(oBox_l.children[oBox_l.children.length-1],oBox_l.children[0]);
			oBox_l.children[index+1].style.transition = '0s';
			oBox_l.children[index+1].style.transform ='translateX('+(-needW)+'px)';
			oBox_l.children[index].style.transition = '0s';
			oBox_l.children[index].style.transform ='translateX('+(-needW)+'px)';
			index++;
		}
		if(index == oBox_l.children.length-1){
			oBox_l.appendChild(oBox_l.children[0]);
			oBox_l.children[index-1].style.transition = '0s';
			oBox_l.children[index-1].style.transform ='translateX('+((-index+1)*needW)+'px)';
			oBox_l.children[index].style.transition = '0s';
			oBox_l.children[index].style.transform ='translateX('+((-index+1)*needW)+'px)'
			index--;
		}
		newX = oldX = e.touches[0].clientX;
		oBox_l.children[index-1] && (oBox_l.children[index-1].style.transition = '0s');
		oBox_l.children[index].style.transition = '0s';
		oBox_l.children[index+1] && (oBox_l.children[index+1].style.transition = '0s');
	
	},false);
	
	oBox.addEventListener('touchmove',function(e){
//		e.preventDefault();
		newX = e.touches[0].clientX;
		var needX2 = newX - oldX;
		oBox_l.children[index].style.transform='translate('+((needX2)+(-index*needW))+'px)';
		oBox_l.children[index+1] && (oBox_l.children[index+1].style.transform='translate('+((needX2)+(-index*needW))+'px)');
		oBox_l.children[index-1] && (oBox_l.children[index-1].style.transform='translate('+((needX2)+(-index*needW))+'px)');
	},false);
	
	oBox.addEventListener('touchend',function(e){
//		e.preventDefault();
		var needX = newX - oldX;
		if(needX > 60){
			oBox_l.children[index].style.transition = '0.3s';
			oBox_l.children[index-1] && (oBox_l.children[index-1].style.transition = '0.3s');
			oBox_l.children[index].style.transform ='translateX('+(needW+(-index*needW))+'px)';
			oBox_l.children[index-1] && (oBox_l.children[index-1].style.transform ='translateX('+(needW+(-index*needW))+'px)');
			index--;
			num=index;
			start=0;
			flag_update=true;
			map(num+'');//改变classify的值
			$('.pro_lb').animate({'marginLeft':-num*16+'rem'},500,function(){
				$('.list').empty();
			});
			getData(start,classify);
		}
		else if(needX < 60 && needX > -60){
			oBox_l.children[index].style.transition = '0.3s';
			oBox_l.children[index].style.transform ='translateX('+((-needW)+((-index+1)*needW))+'px)';
			oBox_l.children[index+1].style.transition = '0.3s';
			oBox_l.children[index+1].style.transform ='translateX('+((-needW)+((-index+1)*needW))+'px)';
			oBox_l.children[index-1].style.transition = '0.3s';
			oBox_l.children[index-1].style.transform ='translateX('+((-needW)+((-index+1)*needW))+'px)';
		}
		else{
			oBox_l.children[index].style.transition = '0.3s';
			oBox_l.children[index+1] && (oBox_l.children[index+1].style.transition = '0.3s');
			oBox_l.children[index].style.transform ='translateX('+((-needW)+(-index*needW))+'px)';
			oBox_l.children[index+1] && (oBox_l.children[index+1].style.transform ='translateX('+((-needW)+(-index*needW))+'px)');
			index++;
			num=index;
			start=0;
			flag_update=true;
			map(num+'');//改变classify的值
			$('.pro_lb').animate({'marginLeft':-num*16+'rem'},500,function(){
				$('.list').empty();
			});
			getData(start,classify);
		}
	},false);
}
