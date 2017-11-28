# 如何实现数组去重
## 最简单的数组去重方法
```javascript
  Array.prototype.unique = function(){
        // 保存
        var result = [];
        this.forEach(
            // 比较临时数组里面有没有这个值
            function(v){
                if(result.indexOf(v) < 0){
                    result.push(v);
                }
            }
        );
        return result;
    }
    console.log([1,1,2,3,3,4,6].unique());
```
