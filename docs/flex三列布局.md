# Flex 布局一看

# 三列等高布局
```html
<style>
.container{
    display: flex;
    background: #f0f0f0;
    flex-wrap: wrap; /*　文字超出会换行 */
    justify-content: space-between; /* 对齐方式 */
    }
.container div{
    /* 子容器根据内容自己适应 */
}
</style>
<div class="container">
    <div>left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left left </div>
    <div>center</div>
    <div>right</div>
</div>
```
## 三列弹性布局然后增加个小动画
```html
<style>
    .container_1{
        display: flex;
        flex-direction: row;
    }
    .container_1 div{
        flex: 1 1 auto;
        width:30px;
        -webkit-transition: width 0.7s ease-out;
        transition: width 0.7s ease-out;
    }
    .container_1 div:nth-child(1){background:#009246}
    .container_1 div:nth-child(2){background:#F1F2F1}
    .container_1 div:nth-child(3){background:#CE2B37}
    .container_1 div:hover{
        width:200px;
    }
</style>
<div class="container_1">
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
</div>
```
![详情看这里](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
