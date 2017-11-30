表面上看，setTimeout 只能应用在 on-off 方式的动作上，通过创建一个函数循环重复调用setTimeout，以实现重复的操作
```javascript
showTime();
function showTime(){
    var today = new Date();
    console.log('This time is :' + today.toString());
    setTimeout('showTime()',10000);// 函数执行方法不带引号能跑死浏览器
}

setInterval(showNewTime,1000); //MAC IE 5对此不支持,谁在乎
//setInterval('showNewTime()',1000);
function showNewTime(){
    var today = new Date();
    console.log('This time is ' + today.toString());
}
```
这两种方法可能看起来非常像，而且显示的结果也会很相似，不过两者的最大区别就是，setTimeout方法不会每隔5秒钟就执行一次showTime函数，它是在每次调用setTimeout后过5秒钟再去执行showTime函数。这意味着如果showTime函数的主体部分需要2秒钟执行完，那么整个函数则要每7秒钟才执行一次。而setInterval却没有被自己所调用的函数所束缚，它只是简单地每隔一定时间就重复执行一次那个函数。
**如果要求在每隔一个固定的时间间隔后就精确地执行某动作，那么最好使用setInterval，而如果不想由于连续调用产生互相干扰的问题，尤其是每次函数的调用需要繁重的计算以及很长的处理时间，那么最好使用setTimeout。**
## 函数指针的使用
两个计时函数中的第一个参数是一段代码的字符串，其实该参数也可以是一个函数指针。
如果用函数指针作为setTimeout和setInterval函数的第二个参数，那么它们就可以去执行一个在别处定义的函数了：
```javascript
setTimeout(showTime, 500);
function showTime(){
    var today = new Date();
    console.log("The time is: " + today.toString());
}
```
另外，匿名函数还可以声明为内联函数:
```javascript
setTimeout(function(){var today = new Date();alert("The time is: " + today.toString());}, 500);
```
如果对计时函数不加以处理，那么setInterval将会持续执行相同的代码，一直到浏览器窗口关闭，或者用户转到了另外一个页面为止。不过还是有办法可以终止setTimeout和setInterval函数的执行。
```html
<div id="stopInterval">停止</div>
```html
```javascript
var intervalProcess = setInterval("console.log('GOAL!')", 3000);
var stopInterval = document.getElementById("stopInterval");
stopInterval.addEventListener("click", stopGoal, false);
function stopGoal(){
    clearInterval(intervalProcess);
}
```
只要点击了stopInterval，不管是什么时候点击，intervalProcess都会被取消掉，以后都不会再继续反复执行intervalProcess。如果在超时时间段内就取消setTimeout，那么这种终止效果也可以在setTimeout身上实现，具体实现如下：
```html
<div id="stopTimeout">停止</div>
```
```javascript
var timeoutProcess = setTimeout("alert('GOAL!')", 3000);
var stopTimeout = document.getElementById("stopTimeout");
addEventListener(stopTimeout, "click", stopGoal, false);
function stopGoal()
{
   clearTimeout(timeoutProcess);
}
```
[转自：](http://www.cnblogs.com/qiantuwuliang/archive/2009/06/20/1507304.html)
