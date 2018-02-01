/*获取元素*/
/*$()->获取id,单个元素等……有单一性*/
/*_()->获取class,多个元素等……有多一性*/
function _o(ele){
	return document.querySelector(ele);
}
function _(ele){
	return document.querySelectorAll(ele);
}
/*封装拖拽函数*/
/*oneself->当前元素,x->求出当前长的减去短的鼠标坐标X,y->求出当前长的减去短的鼠标坐标Y*/
function oDraafting(oneself,x,Max,div3,div4){
    document.onmousemove=function(e){
    	var ev=e||event; 
    	var maxX=Max.offsetWidth-oneself.offsetWidth;
    	var ol=ev.clientX-x;
    	if (ol<0) {ol=0;}
    	if (ol>maxX) {ol=maxX;}
    	console.log(ol/maxX);
    	div4.style.top=-(div4.offsetHeight-div3.offsetHeight)*(ol/maxX)+'px';
    	
        oneself.style.left=(ol)+'px';
    }
}