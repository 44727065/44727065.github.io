
`Uncaught SyntaxError: Illegal return statement`
```javascript
if(condition1){
        return "string1";
    }else if(condition2){
        return "string2";
    }else{
        return "string3";
}
```
会出现 `SyntaxError: Illegal return statement`;
javascript中的return是只能放在function中的，换句话说把上面的if/else if/else放进一个function就解决了
```javascript
if(condition1){
    (function(){
        return "string1";
    })()
}else if(condition2){
    return "string2";
}else{
    return "string3";
}
```
