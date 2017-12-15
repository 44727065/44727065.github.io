# 扩展、密封和冻结。
## 扩展对象
    - Object.preventExtensions
    - Object.isExtensible
## 密封对象
    - Object.seal
    - Object.isSealed
## 冻结对象
    - Object.freeze
    - Object.isFrozen

1. Object.preventExtensions
阻止对象扩展，让一个对象变的不可扩展，也就是永远不能再添加新的属性
```javascript
'use strict'
let obj = {name:'Alon'};
Object.preventExtensions(obj);
//obj.age = 10; // 严格模式下会报错
delete obj.name; // 不可扩展，但是可删除
console.log(obj);
```
2. Object.seal
让一个对象密封，并返回被密封后的对象。密封对象是指那些不能添加新的属性，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性，但可以修改已有属性的值的对象。
```javascript
let obj1 = {name:'Alon',age:24};
// 密封
Object.seal(obj1);
// 不能添加新属性
// obj1.age = 24;
obj1.name = 'Carlos';
//delete obj1['name']; // 不可删除
console.log(obj1['name']); // 不可删除
// Object.defineProperty(obj1,'name',{
//     value: 100,
//     configurable: true,
//     writable: true,
//     enumerable: true
// }) // 能修改已有属性的可枚举性、可配置性、可写性
console.log(Object.isSealed(obj1));
```
3. Object.freeze
Object.freeze 冻结整个对象，不能修改已有的属性、新增、删除、修改已有属性的可枚举性、可配置性、可写性的对象。就是对象永远不可变。
```javascript
let obj3 = {name:'alon'};
Object.freeze(obj3);
// obj3.name = 'Carlos';// 均不可操作
```
4. 测试三种状态的关系
```javascript
let preventExtensionsObj = Object.preventExtensions({name:'preventExtensions'});
console.log(Object.isExtensible(preventExtensionsObj));
console.log(Object.isSealed(preventExtensionsObj));
console.log(Object.isFrozen(preventExtensionsObj));

let sealObj = Object.seal({name:'Alon'})
console.log(Object.isExtensible(sealObj));// 也是不可被扩展的
console.log(Object.isSealed(sealObj));
console.log(Object.isFrozen(sealObj));

let freezeObj = Object.freeze({name:'Alon'})
console.log(Object.isExtensible(freezeObj));// 也是不可被扩展的
console.log(Object.isSealed(freezeObj)); // frozen 的肯定是 sealed
console.log(Object.isFrozen(freezeObj));
```
控制范围

