1. 块级作用域
(1) ** let 取代 var **
    防止不经意生成的全局变量
    不会有变量提升，更容易理解，符合先声明后使用的原则。
(2) ** 全局变量和线程安全 **
    在 let 和 const 之间，建议先使用 const，尤其在全局环境，不应该设置变量，只应该设置常量。
    const 的优点
    1. 提醒阅读程序的人，这个变量不应该更改。
    2. const 比较符合函数式编程思想，运算不会改变值，只是新建值，这样有利于将来的分布式运算
    3. javascript 编译器会对 const 进行优化，所以多使用 const ，有利于提高程序的运行效率，也就是 let 和 const 的本质区别，其实是编译器内部的处理不同。
    所有的函数都应该设置为常量。
2. 字符串
静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。
 ```javascript
 // bad
const a = "foobar";
const b = 'foo' + a + 'bar';

// acceptable
const c = `foobar`;

// good
const a = 'foobar';
const b = `foo${a}bar`;
const c = 'foobar';
 ```
 3. 结构赋值
使用数组成员对变量赋值时，优先使用解构赋值。
```javascript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```
函数的参数如果是对象的成员，优先使用解构赋值。
```javascript
// bad
function getFullName(user){
    const firstName = user.firstName;
    const lastName = user.lastName;
}
// good
function getFullName(obj){
    const {firstName,lastName} = obj
}
//best
function getFullName({firstName,lastName}){

}
```
如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
```javascript
// bad
function processInput(input){
    return [left,right,top,bottom]
}
// good
function processInput(input){
    return {left,right,top,bottom};
}
const {left, right} = processInput(input);
```
4. 对象
单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
```javascript
// bad
const a = {k1:1,k2:2,};
const b = {
    k1:1,
    k2:2
}
//good
const a = {k1:1,k2:2};
const b = {
    k1:1,
    k2:2,
}
```
对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性无法避免，要使用 `Object.assign()`方法
```javascript
// bad
const a = {};
a.x = 3;

// if reshape unavoidable
const a = {};
Object.assign(a, { x:3 });
//good
const a = { x:null };
a.x =3
```
如果对象的属性是动态的，可以在创造对象的时候，使用属性表达式。
```javascript
// bad
const obj = {
    id : 5,
    name : 'San Francisco',
}
Obj[getKey['enabled']] = true;
// good
const obj = {
    id : 5,
    name : 'San Francisco',
    [getKey('enabled')] : true
}
```
上面代码中，对象 `obj` 的最后一个属性名，需要计算得到。这时最好采用属性表达式，在新建 `obj` 的时候，将属性与其它属性定义在一起。这样以来，属性就在一个地方定义了。
另外，对象属性和方法，尽可能采用简洁表达法，这样易于描述和书写。
```javascript
var ref = `some value`;

// bad
const atom = {
    ref : ref,
    value : 1,
    addValue : function (value){
        return atom.value + value;
    }
}

// good
const atom = {
    ref,
    value : 1,
    addValue(value){
        return atom.value + value;
    }
}
```
5. 数组
使用扩展运算符（...）拷贝数组。
```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;
for(i = 0;i < len; i++){
    itemsCopy[i] = items[i]
}
// good
const itemsCopy = [...items];
```
使用 Array.from 方法，将类似数组的对象转为数组。
```javascript
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```
6. 函数
立即执行函数尽可能写成箭头函数的形式。
```javascript
(() => {
    console.log('Welcome to the Internet.');
})();
```
那些需要函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 `this` 。
```javascript
// bad
[1,2,3].map(function(x){
    return x * x;
})
// good
[1,2,3].map((x) => {
    return x * x;
})
//bset
[1,2,3].map((x) = > x * x)
```
箭头函数取代 `Function.prototype.bind` ,不应用 self／_this/that 绑定 `this`
```javascript
// bad
const self = this;
const boundMethod = function(...params){
    return method.apply(self,params);
}
// acceptable
const boundMethod = method.bind(this);

// best
const boundMethod = (...params) => method.apply(this, params); // 没懂
```
简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，函数较多，还是应该采用传统的函数写法。
所有的配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。
```javascript
// bad
function divide(a, b, option = false){

}
// good
function divide(a, b, { option = false} = {}) // 没懂
```
不要在函数体内使用 `arguments` 变量，使用 `rest` 运算符（...）代替。因为 `rest` 运算符显式表明你想要获取参数，而且 `arguments` 时一个类数组的对象，而 rest 运算符可以提供一个真正的数组。
```javascript
// bad
function concatenateAll(){
    const args = Array.prototype.slice.call(arguments);
    return args.join('');
}
// good
function concatenateAll(...args){
    return args.join('');
}
```
使用默认值语法设置函数参数的默认值。
```javascript
// bad
function handleThings(opts){
    opts = opts || {}
}
// good
function handleThings(opts = {}){
    // ...
}
```
7. Map 结构
注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。如果只是区分 key:value 的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。
```javascript
let map = new Map(arr);

for (let key of map.keys()){
    console.log(key);
}

for (let value of map.value()){
    console.log(value);
}

for (let item of map.entries()){
    console.log(item);
}
```
8. Class
总是使用 Class,取代需要 prototype 的操作。因为 Class 的语法更简洁，更易于理解。
```javascript
// bad
function Queue(contents = []) {
  this._queue = [...contents];
}
Queue.prototype.pop = function() {
  const value = this._queue[0];
  this._queue.splice(0, 1);
  return value;
}

// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }
  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}
```
使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险。
```javascript
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function() {
  return this._queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}
```
9. 模块
首先，Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。使用`import`取代`require`。
```javascript
// bad
const moduleA = require('moduleA');
const func1 = moduleA.func1;
const func2 = moduleA.func2;

// good
import { func1, func2 } from 'moduleA';
```
使用`export`取代`module.exports`。
```javascript
// commonJS的写法
var React = require('react');

var Breadcrumbs = React.createClass({
  render() {
    return <nav />;
  }
});

module.exports = Breadcrumbs;

// ES6的写法
import React from 'react';

class Breadcrumbs extends React.Component {
  render() {
    return <nav />;
  }
};

export default Breadcrumbs;
```
如果模块只有一个输出值，就使用`export default`，如果模块有多个输出值，就不使用`export default`，`export default`与普通的`export`不要同时使用。
不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（`export default`）。
```javascript
// bad
import * as myObject from './importModule';

// good
import myObject from './importModule';
```
如果模块默认输出一个函数，函数名的首字母应该小写。
```javascript
function makeStyleGuide() {
}

export default makeStyleGuide;
```
如果模块默认输出一个对象，对象名的首字母应该大写。
```javascript
const StyleGuide = {
  es6: {
  }
};

export default StyleGuide;
```
10. ESLint 的使用
