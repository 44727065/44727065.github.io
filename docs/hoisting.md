# 他会输出啥
## var 会变量提升就好
```javascript
  var name = 'World!';
    (function() {
        if(typeof name === 'undefined') {
            var name = 'Jack'; // var 定义的变量会被提升
            console.log('Goodbye, ' + name);
        } else {
            console.log('Hello, ' + name);
        }
    })();
```
