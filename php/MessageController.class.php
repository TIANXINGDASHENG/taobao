<?php
class MessageController{
	public function publish(){//插入数据
		$data=$_POST;
		$title=$data['title'];
		$content=$data['content'];
		$time1=date("Y-m-d h:i:s");
		$uid=$data['uid'];
		//var_dump($data);
		$model=new ModelController();
		$result=$model->exec_insert("INSERT INTO message(title,content,time1,uid) VALUES('{$title}','{$content}','{$time1}','{$uid}')");
		if ($result) {
			echo ajax_return(200,'发布成功！','');
		} else {
			echo ajax_return(303,'发布失败！','');
		}
	}
	public function show(){//获取数据表所有数据并展示在页面上
		$data=$_POST;
		$uid=$data['uid'];
		$model=new ModelController();
		$result=$model->query_sql("SELECT * FROM message WHERE uid='{$uid}'");	
		echo ajax_return(200,'接收成功！',$result);
	}
	public function delete(){//删除数据
		$data=$_POST;
		$id=$data['id'];
		$model=new ModelController();
		$model->exec_delete("DELETE FROM message WHERE id='{$id}'");
	}
	public function update(){//获取要修改的数据行
		$data=$_POST;
		$id=$data['id'];
		$model=new ModelController();
		$result=$model->query_sql("SELECT * FROM message WHERE id='{$id}'");
		echo ajax_return(200,'找到数据！',$result);
	}
	public function save(){//将修改后的数据保存
		$data=$_POST;
		$id=$data['id'];
		$title=$data['title'];
		$content=$data['content'];
		$time1=date("Y-m-d h:i:s");
		$model=new ModelController();
		$result=$model->exec_update("UPDATE message SET title='{$title}',content='{$content}',time1='{$time1}' WHERE id='{$id}'");
		if ($result) {
			echo ajax_return(200,'修改成功！','');
		} else {
			echo ajax_return(303,'修改失败！','');
		}
	}
}