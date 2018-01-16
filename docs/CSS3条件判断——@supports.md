# CSS3条件判断——@supports
CSS3条件判断，听起来“不明觉厉”,如果你对CSS稍为熟悉一点的话，你会发现CSS中的“@media”就是条件判断之一。是的，在CSS3的条件判断规范文档中包含了两个部分，其一是“@media”规则，主要用来“根据媒体属性区分样式表”(特别是在Responsive设计中，发挥的作用更是强大)；其二是“@supports”规则，主要用来代替前面常用的Modernizr库，在不支持CSS3的浏览器下实现渐进增强式设计。换句话来说，@supports可以让我们在不支持CSS3属性的浏览器下配上单独的样式，看起来很强大，那具体如何使用呢？我们今天一起简单的来学习一下：

## @supports起源
众所周知，不同的浏览器（不管是现代浏览器还是老版本的IE浏览器）对Web页面的解析都是不一样，为了让Web页面在这些浏览器下渲染达到基本一致的情况，给用户更好的体验，我们必须为他们写不同的样式代码。
不同特征的检测方法我们早期都是依赖于javascript来检测，后来通过第三方js库Modernizr来完成。但这样真的有用吗？除了要懂怎么检测之外，我们还需要了解更多的浏览器解析机制，这样一来对于我们前端人员来说就是“没办法”。还好CSS3 Conditional Rules Module Level 3推出了“@supports”条件判断规则，它充许我们可以根据浏览器对CSS特性的支持情况来定义不同的样式。这对我们来说是非常重要。

## @supports语法规则
要想更好的使用@supports，我们有必要先从其语法开始入手，只有知道了怎么用，我们才能更好的去用。
```javascript
@supports <条件规则> {
  /* 特殊样式规则 */
}
```
@supports中的“条件规则”可以声明一条或者几个由不同的逻辑运算符相结合的声明（比如说，非（not），或（or），与（and）等）。而且还可以使用括号来确定其操作的优先级关系。
最简单的条件表达式是一个CSS声明，一个CSS属性名，后面加上一个属性值，属性名与属性值之前用分号隔开，比如：
```javascript
(display:flex)
```
我们来看一个简单的例子：
```javascript
@supports (display:flex) {
  section { display: flex }
  ...
}
```
上面这段代码的意思是：如果浏览器支持“display:flex”属性，那么在“section”元素上就运用“display:flex”样式。

@supports还可以根据不同的逻辑运算符相结合，具有不同的语法规则，接下来我们一起来细化一下@supports的语法规则，以及使用细节。

## 基本属性的检查
正如前面的示例一样，你可以使用CSS的基本属性来进行检查：
```javascript
@supports (display: flex) {
  div { display: flex; }
}
```
这种是@supports最基本的使用规则。
## not逻辑声明——排除
@supports可以使用not逻辑声明，主要作用是，在不支持新特性时，可以提供备用样式。换过来也可以理解，如果你的浏览器不支持@supports条件判断中的样式，你可以通过@supports为浏览器提供一种备用样式，如：
```javascript
@supports not (display: flex){
  #container div{float:left;}
}
```
上面的代码表示的是，如果你的浏览器不支持“display:flex”属性，那么你可以使用“float:left”来替代。著作权归作者所有。
## and逻辑声明——联合（与）
@supports的条件判断中也可以使用“and”逻辑声明。用来判断是否支持多个属性。例如：
```javascript
@supports (column-width: 20rem) and (column-span: all) {
  div { column-width: 20rem }
  div h2 { column-span: all }
  div h2 + p { margin-top: 0; }
  ...
}
```
上面的代码表示的是，如果你的浏览器同时支持“column-width:20rem”和“column-span:all”两个条件，浏览器将会调用下面的样式：
```javascript
div { column-width: 20rem }
div h2 { column-span: all }
div h2 + p { margin-top: 0; }
...
```
反之，如果不同时支持这两个条件，那么浏览器将不会调用这部分样式。
注：多个and边接并不需要使用括号：
```javascript
@supports (display: table-cell) and (display: list-item) and (display:run-in){
  /*样式*/
}
```
## or逻辑声明——or(或)
@supports除了“not”和“and”逻辑声明之外，还可以使用“or”逻辑声明。主要用来判断浏览器是否支持某一CSS特性。也就是说，可以使用“or”逻辑声明，同时专声明多个条件，只要其中一个条件成立就会启用@supports中的样式：
```javascript
@supports (display: -webkit-flex) or (display: -moz-flex) or (display: flex) {
  section {
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    …
  }
}
```
上面的例子是@supports中“or”运用场景之一。flex在opera和IE10中不需要前缀，而在其他的现代浏览器中还是需要浏览器厂商的前缀，通过上面的使得，浏览器支持“flex”属性就会调用下面的样式：
```javascript
section {
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
  …
}
```
上面是有关于@supports的几种语法的使用规则介绍，在使用这几种规则时，有几点需要特别注意：
## “or”和“and”混用
在@supports中“or”和“and”混用时，必须使用括号（）来区分其优先级：
```javascript
@supports ((transition-property: color) or (animation-name: foo)) and (transform: rotate(10deg)) {
  // ...
}
@supports (transition-property: color) or ((animation-name: foo) and (transform: rotate(10deg))) {
  // ...
}
```
以前两种写法优先级计算并不一样。
## 只有一条表达式时必须用括号（）
在@supports中，如果条件判断表达式只有一条，那么这条表达式必须使用括号包起来：
```javascript
@supports (display: flex) {
  // ...
}
```
## 浏览器兼容性
通过上面对@supports的语法介绍，大家都知道这个属性对于做一些渐进增加式样式，或者浏览器的兼容性特别方便，但浏览器本身对其的兼容性如何呢？我们一起来看Caniuse.com提供的兼容性表格：
## CSS.supports
这篇规范里还提到了一个DOM API，即CSS.supports()，它是作为@supports的另一种形式出现的，供JavaScript调用来获得CSS属性的支持情况。顺便提一句，window.CSS这个命名空间将会包含多个CSS相关的常用方法（可以想想作为开发者来说，你需要哪些方法？）。
```javascript
// 方法1
if (CSS.supports("display", "flex")) {
  // do something relying on flexbox
}
// 方法2
if (CSS.supports("(display: flex) and (display: grid)")) {
  // do something relying on flexbox and grid layout

```
主流浏览器已经或者正在支持@supports，这对我们来说是好消息。
使用@supports的好处
我们为什么要用@supports，它比起Modernizr来说有什么优势呢？
1、 速度
@supports采用浏览器本地方法实现、速度更快、效率更高。
2、效率
避免引入JavaScript库，让开发更简单快捷；另外因为不需要加载JavaScript库，能减少HTTP请求量和服务器流量。
3、 功能
@supports支持多种逻辑操作符，可以很好的满足各种需求。
方案的选择
那我们该何时使用Modernizr呢？
1、 浏览器不支持CSS.supports()和@supports时；
2、 需要用它来判断HTML5的支持情况时（其实你也可以自己手写这部分代码）。
@suppprts in Action
实际上，Modernizr自身也在计划未来使用@supports来替代自身的检测方法。
所以，现在你就应该立即使用@supports，正确的步骤是先检测是否支持CSS.supports()和@supports，如果不支持，再加载Modernizr，这样你的网站从始至终会有一个很好的兼容性。下面是实现代码：
```javascript
if ( !(window.supportsCSS || (window.CSS && window.CSS.supports) )) load_modernizr();
```



