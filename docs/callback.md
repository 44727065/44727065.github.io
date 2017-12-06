A callback is a function that is passed as an argument to another function and is executed after its parent function has completed。
回调函数就是一个参数，将这个函数作为参数传到另一个函数里面，当那个函数执行完之后，再执行传进去的这个函数。这个过程就叫做回调。
主函数的事先干完，回头再调用传进来的那个函数。
举个例子：
我现在出发，到了通知你”
这是一个异步的流程，“我出发”这个过程中（函数执行），“你”可以去做任何事，“到了”（函数执行完毕）“通知你”（回调）进行之后的流程
1. 基本方法
```javascript
//定义主函数，回调函数作为参数
function A(callback) {
    callback();
    console.log('我是主函数');
}

//定义回调函数
function B(){
    setTimeout("console.log('我是回调函数')", 3000);//模仿耗时操作
}

//调用主函数，将函数B传进去
A(B);
```
```javascript
function doSomething(callback) {
// …
// Call the callback
callback('stuff', 'goes', 'here');
}
function foo(a, b, c) {
// I'm the callback
alert(a + " " + b + " " + c);
}
doSomething(foo);
```
或者匿名函数
```javascript
function dosomething(damsg, callback){
  alert(damsg);
  if(typeof callback == "function")
  callback();
 }
dosomething("回调函数", function(){
  alert("和 jQuery 的 callbacks 形式一样!");
 });
```
上面的代码中，我们先定义了主函数和回调函数，然后再去调用主函数，将回调函数传进去。
定义主函数的时候，我们让代码先去执行callback()回调函数，但输出结果却是后输出回调函数的内容。这就说明了主函数不用等待回调函数执行完，可以接着执行自己的代码。所以一般回调函数都用在耗时操作上面。比如ajax请求，比如处理文件等。

2. 高级方法
使用javascript的call方法
```javascript
function Thing(name) {
this.name = name;
}
Thing.prototype.doSomething = function(callback) {
// Call our callback, but using our own instance as the context
callback.call(this);
}

function foo() {
alert(this.name);
}

var t = new Thing('Joe');
t.doSomething(foo); // Alerts "Joe" via `foo`
```
传参数
```javascript
function Thing(name) {
this.name = name;
}
Thing.prototype.doSomething = function(callback, salutation) {
// Call our callback, but using our own instance as the context
callback.call(this, salutation);
}
function foo(salutation) {
alert(salutation + " " + this.name);
}
var t = new Thing('Joe');
t.doSomething(foo, 'Hi'); // Alerts "Hi Joe" via `foo`

```
使用 javascript 的 apply 传参数
```javascript
function Thing(name) {
this.name = name;
}
Thing.prototype.doSomething = function(callback) {
// Call our callback, but using our own instance as the context
callback.apply(this, ['Hi', 3, 2, 1]);
}
function foo(salutation, three, two, one) {
alert(salutation + " " + this.name + " – " + three + " " + two + " " + one);
}
var t = new Thing('Joe');
t.doSomething(foo); // Alerts "Hi Joe – 3 2 1" via `foo`
```
例子
//假如提供的数据源是一整数,为某学生的分数,当num<=0,由底层处理,当n>0时由高层处理.
//将下面这个函数拷贝下来存盘为1.js
```javascript
function f(num,callback){
 if(num<0) {
 alert("调用低层函数处理!");
 alert("分数不能为负,输入错误!");
 }else if(num==0){
  alert("调用低层函数处理!");
 alert("该学生可能未参加考试！");
 }else{
 alert("调用高层函数处理!");
 callback();
 }
}
```
//将下面这个test.html文件存盘与1.js在一个目录下：
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<script src="1.js" type="text/javascript"></script>
<title>无标题文档</title>
<script type="text/javascript">
 function test(){
  var p=document.getElementById("pp");
 pp.innerText="";
  var num=document.getElementById("score").value;
 f(num,function(){ //匿名高层处理函数
 if(num<60) alert("未及格！");
 else if(num<=90) alert("该生成绩优良！");
 else alert("该生成绩优秀!"); })
 pp.innerText="by since1978 qq558064!"
 }
</script>
</head>

<body>
<p>
回调函数示例:当学生成绩score<=0分时候，由底层处理；当score>0时，由高层处理。
</p>
请输入学生成绩<input type="text" id="score">
<input type="button" onClick="test()" value=" 看看结果">
<p id="pp"></p>
</body>
</html>
```
```javascript
//模拟查找页面中的dom节点，将查找到的节点存在数组里面统一返回
  //此函数只用于查找不对dom节点做任何的逻辑处理
  var findNodes = function(){
   var i = 100000;//大量的循环，
   var nodes = [];//用于存储找到的dom节点
   var found;
   while(i){
    i -=1;
    nodes.push(found);
   }
   return nodes;
  }

  //将查找找到的dom节点全部隐藏
  var hide = function(nodes){
   var i = 0,
    max = nodes.length;
   for(;i<max;i++){
//findNodes后面有括号代表立即执行，先执行findNodes()然后执行hide()< hide(findNodes()); 执行函数 } ;
nodes[i].style.display="none"
}

上面的方法是低效的，以为hide()必须再次遍历有findNodes()返回的数组节点，如何避免这种多余的循环呢。
  我们不能直接在findNodes中对查询到的节点进行隐藏（这样检索就可修改逻辑耦合了），那么他就不再是一个通用函数了。
  解决方法是用回调模式，可以将节点隐藏逻辑以回调函数方式传递给findNodes()并委托其执行

//重构findNodes以接受一个回调函数
   var findNodes = fucntion(callback){
    var i = 100000,
     nodes = [],
     found;
    //检查回调函数是否可用调用的
    if(typeof callback !== 'function'){
     callback = false;
    }
    while(i){
     i -= 1;
     if(callback){
      callback(found);
     }
     nodes.push(found);
    }
    return nodes;
   }

   //回调函数
   var hide = function(node){
    node.style.display = 'none ';
   }
   //找到后续节点并在后续执行中对其进行隐藏
 findNodes(hide);//先执行findNodes然后执行hide，当然回调函数也可以在调用主函数时创建：findNodes(function(node){node.style.display = 'none';});

```
