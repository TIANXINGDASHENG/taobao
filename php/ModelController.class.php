<?php
class ModelController{
	public $dsn="mysql:host=localhost;dbname=beicai";
	public $username="root";
	public $password="";
	public static $pdo;
	function __construct(){
		self::$pdo=new Pdo($this->dsn,$this->username,$this->password);//连接数据库
		self::$pdo->query("SET NAMES UTF8");//解决中文乱码
		self::$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);//处理报错信息
	}
	public function query_sql($quy){
		$result=self::$pdo->query($quy);//查找数据，获得结果集
		$row=$result->fetchAll(PDO::FETCH_ASSOC);//变成数组
		return $row;
	}
	public function exec_insert($ins){
		$result=self::$pdo->exec($ins);//添加数据
		return $result;
	}
	public function exec_delete($del){
		$result=self::$pdo->exec($del);//删除数据
		return $result;
	}
	public function exec_update($upd){
		$result=self::$pdo->exec($upd);//修改数据
		return $result;
	}
}