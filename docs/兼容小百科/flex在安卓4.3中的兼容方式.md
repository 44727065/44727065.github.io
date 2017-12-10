# flex在安卓4.3中的兼容方式
在实际使用中发现flex对于安卓系统的较低版本（<4.3）中还是有一些兼容问题的，除了用相应的浏览器前缀外还需要加上width属性。
```css
.foo {
    display: box;              /* OLD - Android 4.4- */
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;

    -webkit-box-flex: 0 0 34.4%;      /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 0 0 34.4%;         /* OLD - Firefox 19- */
    -webkit-flex: 0 0 34.4%;          /* Chrome */
    -ms-flex: 0 0 34.4%;              /* IE 10 */
    flex: 0 0 34.4%;

    /*For Android 4.3*/
    width: 34.4%;

    /* 09版 */
    -webkit-box-lines: multiple;
    /* 12版 */
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;

    /* 09版 */
    -webkit-box-align: center;
    /* 12版 */
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;

    /* 09版 */
    -webkit-box-pack: center;
    /* 12版 */
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    justify-content: center;
}
```
附录：
[flex教程：](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)
[flex使用实例：](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
[flex兼容性：](http://caniuse.com/#search=flex)
