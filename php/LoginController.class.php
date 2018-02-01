<?php
class LoginController{
	public function login(){//控制登录
		$data=$_POST;
		$user=$data['username'];
		$pass=$data['password'];
		$model=new ModelController();
		$result=$model->query_sql("SELECT * FROM login WHERE username='{$user}'");
		if (empty($result)) {
			echo ajax_return(303,'用户名不存在！','');
		} else {
			$arr=$result[0];
			$pass=$this->md($pass);
			if ($arr['password']==$pass) {
				echo ajax_return(200,'登录成功！',$arr);
			} else {
				echo ajax_return(303,'密码不正确！','');
			}
		}
	}
	public function sign(){//控制注册
		$data=$_POST;
		$user=$data['username'];
		$pass=$data['password'];
		$model=new ModelController();
		$result=$model->query_sql("SELECT * FROM login WHERE username='{$user}'");
		if (empty($result)) {		
			$pass=$this->md($pass);
			$res=$model->exec_insert("INSERT INTO login(username,password) VALUES('{$user}','{$pass}')");
			if ($res) {
				echo ajax_return(200,'注册成功！','');
			} else {
				echo ajax_return(400,'注册失败！','');
			}	
		} else {
			echo ajax_return(303,'用户名已存在！','');
		}
	}
	public function md($con){//密码加密
		$result=md5(md5($con).'beicai');
		return $result;
	}
	public function find(){//查找用户名是否存在
		$data=$_POST;
		$user=$data['username'];
		$model=new ModelController();
		$result=$model->query_sql("SELECT * FROM login WHERE username='{$user}'");
		if (empty($result)) {		
			echo ajax_return(200,'用户名可用！','');
		} else {
			echo ajax_return(303,'用户名已存在！','');
		}
	}
}