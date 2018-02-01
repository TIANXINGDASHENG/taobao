<?php
//数组转化成json的方法
function ajax_return ($code,$message,$data){
	$result=array('code'=>$code,'message'=>$message,'data'=>$data);
	return json_encode($result);
}
//跳转页面函数
function href($message,$url){
	$str=<<<STR
	<script>
	alert("$message");
	window.location.href="$url";
	</script>
STR;
echo $str;
}
//魔术函数
function __autoload($classname){
	include_once $classname.".class.php";
}