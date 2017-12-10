onclick是绑定事件 (告诉浏览器在鼠标点击的时候要做什么)
click是触发事件 (模拟了鼠标点击操作)
click 是方法；
onclick是事件；
执行click就是模拟鼠标点击，同时会触发onclick事件。
```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		 <script src="js/jquery/jquery.min.js"></script>
		 <script>
			 $(document).ready(function(){
				 $(".title").click(function(){
					 var id=$(this).data("id");
					 var name=$(this).data("name");
					 alert("Id: "+id+" ; Name: "+name);});
			 });

			 function onClick(e){
				 var id=e.getAttribute("data-id");
				var name=e.getAttribute("data-name");
				 alert("Id: "+id+" ; Name: "+name);
			 }
		 </script>
	</head>
	<body>
		<div class="title" data-id="1" data-name="Microsoft">Click Me</div>
		<div id="add" data-id="2" data-name="Google" onclick="onClick(this)">Click Me</div>
	</body>
</html>

```
