var yomibox = document.getElementById("yomibox");
var oFuture = new Date();	
	oFuture.setHours(0,0,0,0);
	DownTick();
	setInterval(DownTick,1000);
	
function DownTick(){
	var oNow = new Date();
	var total = parseInt((oFuture.getTime() - oNow.getTime())/1000);
	
	var Day = parseInt(total/86400);
	total %= 86400;
	var Hour = parseInt(total/3600);
	total %= 3600;
	var Min = parseInt(total/60);
	total %= 60;
	var S = total;
	
	var str =  Hour + ':' + Min + ':' + S;
	yomibox.innerHTML = str;	
}