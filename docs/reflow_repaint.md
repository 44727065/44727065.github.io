# 页面的重绘与回流及优化
首先要清楚页面呈现的具体过程：
1. 浏览器把获取到的HTML代码解析成1个DOM树，HTML中的每个tag都是DOM树中的1个节点，根节点就是我们常用的document对象。DOM树里包含了所有HTML标签，包括display:none隐藏，还有用JS动态添加的元素等。
2. 浏览器把所有样式(用户定义的CSS和用户代理)解析成样式结构体，在解析的过程中会去掉浏览器不能识别的样式，比如IE会去掉-moz开头的样式，而FF会去掉_开头的样式。
3. DOM Tree 和样式结构体组合后构建render tree, render tree类似于DOM tree，但区别很大，render tree能识别样式，render tree中每个NODE都有自己的style，而且 render tree不包含隐藏的节点 (比如display:none的节点，还有head节点)，因为这些节点不会用于呈现，而且不会影响呈现的，所以就不会包含到 render tree中。注意 visibility:hidden隐藏的元素还是会包含到 render tree中的，因为visibility:hidden 会影响布局(layout)，会占有空间。根据CSS2的标准，render tree中的每个节点都称为Box (Box dimensions)，理解页面元素为一个具有填充、边距、边框和位置的盒子。
4. 一旦render tree构建完毕后，浏览器就可以根据render tree来绘制页面了。如下图
![](../images/flow.jpg)
## 回流与重绘
1. 当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。
2. 当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘。
注意：回流必将引起重绘，而重绘不一定会引起回流。 我们需要明白，页面若发生回流则需要付出很高的代价。
### 回流何时发生：
当页面布局和几何属性改变时就需要回流。下述情况会发生浏览器回流：
1. 添加或者删除可见的DOM元素；
2. 元素位置改变；
3. 元素尺寸改变——边距、填充、边框、宽度和高度
4. 内容改变——比如文本改变或者图片大小改变而引起的计算值宽度和高度改变；
5. 页面渲染初始化；
6. 浏览器窗口尺寸改变——resize事件发生时；
## 聪明的浏览器
```javascript
var s = document.body.style;
s.padding = "2px"; // 回流+重绘
s.border = "1px solid red"; // 再一次 回流+重绘
s.color = "blue"; // 再一次重绘
s.backgroundColor = "#ccc"; // 再一次 重绘
s.fontSize = "14px"; // 再一次 回流+重绘
// 添加node，再一次 回流+重绘
document.body.appendChild(document.createTextNode('abc!'));
```
从上个实例代码中可以看到几行简单的JS代码就引起了6次左右的回流、重绘。而且我们也知道回流的花销也不小，如果每句JS操作都去回流重绘的话，浏览器可能就会受不了。所以很多浏览器都会优化这些操作，浏览器会维护1个队列，把所有会引起回流、重绘的操作放入这个队列，等队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会flush队列，进行一个批处理。这样就会让多次的回流、重绘变成一次回流重绘。
虽然有了浏览器的优化，但有时候我们写的一些代码可能会强制浏览器提前flush队列，这样浏览器的优化可能就起不到作用了。当你请求向浏览器请求一些 style信息的时候，就会让浏览器flush队列，比如：
1. offsetTop, offsetLeft, offsetWidth, offsetHeight
2. scrollTop/Left/Width/Height
3. clientTop/Left/Width/Height
4. width,height
5. 请求了getComputedStyle(), 或者 IE的 currentStyle
当你请求上面的一些属性的时候，浏览器为了给你最精确的值，需要flush队列，因为队列中可能会有影响到这些值的操作。即使你获取元素的布局和样式信息跟最近发生或改变的布局信息无关，浏览器都会强行刷新渲染队列。
## 如何减少回流、重绘
减少回流、重绘其实就是需要减少对render tree的操作（合并多次多DOM和样式的修改），并减少对一些style信息的请求，尽量利用好浏览器的优化策略。具体方法有：
### 1. 直接改变className，如果动态改变样式，则使用cssText（考虑没有优化的浏览器）
```javascript
// 不好的写法
var left = 1;
var top = 1;
el.style.left = left + "px";
el.style.top = top + "px";
// 比较好的写法
el.className += " className1";

// 不好的写法
left: " + left + "px;
top: " + top + "px;";
// 比较好的写法
el.style.cssText += ";
```
### 2. 让要操作的元素进行”离线处理”，处理完后一起更新
a) 使用DocumentFragment进行缓存操作,引发一次回流和重绘；
```javascript
//不好的写法（模式中所说的反模式）
var p, t;
p = document.creatElement('p');
t = document.creatTextNode('fist paragraph');
p.appendChild(t);
document.body.appendChild(p);  //将引起一次回流

p = document.creatElement('p');
t = document.creatTextNode('second paragraph');
p.appendChild(t);
document.body.appendChild(p);  //将再引起一次回流

//好的写法
var p, t, frag;
frag = document.creatDocumentFragment();
p = document.creatElement('p');
t = document.creatTextNode('fist paragraph');
p.appendChild(t);
farg.appendChild(p);

p = document.creatElement('p');
t = document.creatTextNode('second paragraph');
p.appendChild(t);
farg.appendChild(p);

document.body.appendChild(frag);    //相比前面的方法，这里仅仅引起一次回流，倘若页面里有很多这样的操作，利用文档随便将会提升很多
```
b) 使用display:none技术，只引发两次回流和重绘; ( 只是减少重绘和回流的次数，display：none 是会引起重绘并回流，相对来说，visibility: hidden只会引起重绘 )
c) 使用cloneNode(true or false) 和 replaceChild 技术，引发一次回流和重绘；
```javascript
//建立克隆镜像
var oldNode = document.getElementById('target'),
      clone = oldNode.cloneNode(true);   //深复制


//   处理克隆对象的操作....

//完成后
oldNode.parentNode.replaceChild(clone,oldNode);
```
### 3. 不要经常访问会引起浏览器flush队列的属性，如果你确实要访问，利用缓存
```javascript
//BAD WAY
for(循环) {
el.style.left = el.offsetLeft + 5 + "px";
el.style.top = el.offsetTop + 5 + "px";
}

// 这样写好点
var left = el.offsetLeft,
top = el.offsetTop,
s = el.style;
for (循环) {
    left += 10;
    top += 10;
    s.left = left + "px";
    s.top = top + "px";
}
```
### 4. 让元素脱离动画流，减少回流的Render Tree的规模




