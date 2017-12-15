javascript `Array` 对象是用于构造数组的全局对象；它是高阶的、类似于列表的对象。
## 创建数组
```
let fruits = ['Apple','Bannana','Melon'];
console.log(fruits.length);
```
## 通过索引访问数组元素
```javascript
let first = fruits[0];
// Apple

let last = fruits[fruits.length - 1];
// Banana
```
JavaScript 数组的索引值（index）从0开始，即数组第一个元素的索引值为0。最后一个元素的索引值等于该数组的长度减1（Array.length -1）。
```javascript
var arr = ['this is the first element', 'this is the second element'];
console.log(arr[0]);              // logs 'this is the first element'
console.log(arr[1]);              // logs 'this is the second element'
console.log(arr[arr.length - 1]); // logs 'this is the last element'
```
数组中的元素像一个对象以索引为属性名,元素为属性值，或者arr=['a','b']有点像arrObj={0:'a',1:'b'},一个对象的属性是可以通过"."来访问,但是使用下面这样使用会抛出语法错误，因为属性名称是非法的：
```javascript
console.log(arr.0); // a syntax error
```
## 遍历数组
```javascript
fruits.forEach(function (item, index, array) {
    console.log(item, index);
});
// Apple 0
// Banana 1
```
## 添加元素到数组的末尾
```javascript
var newLength = fruits.push("Orange");
// ["Apple", "Banana", "Orange"]
```
## 删除数组末尾的元素
```javascript
let last = fruits.pop();
// remove Orange (from the end)

// ["Apple", "Banana"];
```
## 删除数组最前面（头部）的元素
```javascript
let first = fruits.shift();
// remove Apple from the front

// ["Banana"];
```
## 添加到数组的前面（头部）
```javascript
let newLength = fruits.unshift("Strawberry");
// add to the front

// ["Strawberry", "Banana"];
```
## 找到某个元素在数组中的索引
```javascript
fruits.push('Mango');
// ["Strawberry", "Banana", "Mango"]

let index = fruits.indexOf("Banana");
// 1
```
## 通过索引删除某个元素
```javascript
let removedItem = fruits.splice(pos, 1);
// this is how to remove an item

// ["Strawberry", "Mango"]
```
## 从一个索引位置删除多个元素
```javascript
let vegetables = ['Cabbage', 'Turnip', 'Radish', 'Carrot'];
console.log(vegetables);

// ["Cabbage", "Turnip", "Radish", "Carrot"]

let pos = 1, n = 2;

let removedItems = vegetables.splice(pos, n);

// this is how to remove items,
// n defines the number of items to be removed,
// from that position(pos) onward to the end of array.

console.log(vegetables);
// ["Cabbage", "Carrot"] (the original array is changed)

console.log(removedItems);
// ["Turnip", "Radish"]
```
## 复制一个数组
```javascript
var shallowCopy = fruits.slice();
// this is how to make a copy

// ["Strawberry", "Mango"]
```
