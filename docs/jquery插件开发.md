# jQuery 插件开发的三种方式
- 1. $.extend() 来扩展 jQuery
- 2. $.fn 向jQuery 添加新的方法
- 3. $.widget() 应用 jQuery UI 的部件工厂方式创建

通常用第二种方式创建，第三种方式开发更高级的 jQuery 部件，该模块开发出来的部件带有很多 jQuery 内建的特性。
## 第一种方式
```javascript
    $.extend({
        sayHello: function(name){
            console.log('Hello ' + (name ? name : 'Alon') + ' !');
        }
    })
    $.sayHello();
    $.sayHello('Carlos')
```
 上面就是通过 $.extend() 向 jQuery 添加了一个 sayHello 函数，然后通过 $ 直接调用.

 ## 第二种开发
 基本就是往 $.fn 上面添加一个方法，名字是我们的插件名称。然后我们的插件代码就在这个方法里面展开。
比如我们将页面中的所有链接颜色转化成红色，则可以这样写插件。
```javascript
    $.fn.myPlugin = function(){
        // 在这里，this 指的是用 jQuery 选中的元素
        // example: $('a),则 this = $('a')
        this.css('color','red');
    }
```
在插件名字定义的这个函数内部，this指代的是我们在调用该插件时，用jQuery 选择器选中的元素，一般是一个jQuery 类型的集合。并且这个集合已经是 jQuery 包装类型了，也就是说不用再用美元符号包装了／
所以上面的代码，我们在 this 身上调用 jQuery 的 css 方法，也就相当于在调用 $('a').css();
```html
<ul>
    <li><a href="">链接地址1</a></li>
    <li><a href="">链接地址2</a></li>
    <li><a href="">链接地址3</a></li>
    <li><a href="">链接地址4</a></li>
</ul>
<p>这里的内容不受影响</p>
```
```javascript
    $(function(){
        $('ul a').myPlugin();
    })
```
插件代码里处理每个具体的元素，而不是一个集合进行处理，这样我们就可以针对每个元素进行相应的操作。
我们知道 this 指代 jQuery 选择器返回的集合，那么通过调用 jQuery 的 .each() 方法就可以处理合集中的每个元素了，但此刻要注意的是，在 each 方法内部，this 指代的是普通 dom 元素了，因此如果调用 jQuery方法就需要用 $ 来重新包装一下。
下面就是遍历链接的真实地址，将href加到后面
```html
<ol>
    <li><a href="http://varhi.com">这里是一些内容1</a></li>
    <li><a href="http://varhi.com">这里是一些内容2</a></li>
    <li><a href="http://varhi.com">这里是一些内容3</a></li>
    <li><a href="http://varhi.com">这里是一些内容4</a></li>
</ol>
```
```javascript
$.fn.myPlugin1 = function(){
    // 在这里，this 指的是用 jQuery 选中的元素
    this.css('color','green');
    this.each(function(){
        // 对每个元素进行操作
        $(this).append(' ' + $(this).attr('href'));
    })
}

$(function(){
    $('ol a').myPlugin1();
})
```
### 支持链式调用
jQuery 一个非常优雅的特性是支持链式调用，选择好 Eom 元素后可以不断地调用其他方法。
要想让插件不打破这种链式调用，只需 return 一下即可。
```javascript
$.fn.myPlugin1 = function() {
    //在这里面,this指的是用jQuery选中的元素
    this.css('color', 'green');
    return this.each(function() {
        //对每个元素进行操作
        $(this).append(' ' + $(this).attr('href'));
    })
}
```
### 让插件接收参数
一个强劲的插件可以让使用者随意定制，尽量提供合适的参数。
插件可以使用调用时传入的参数，也可以在插件中给出默认的值。
在处理插件参数的接收上，通常使用 jQuery 的 extend 方法，上面也提到过，但那是给 extend 方法传递参数的情况下，这个对象会合并到 jQuery 身上，所以我们就可以在 jQuery 身上调用新合并对象里包含的方法。当给extend 方法合并一个以上的参数时，他会将所有参数对象合并到第一个里。同时，如果对象中有同名属性，合并的时候后面的会覆盖前面的。
我们可以在插件里定义一个保存插件参数默认值的对象，同时将接收来的参数对象合并到默认对象上，最后就实现了用户指定了值的参数使用指定的值，未指定的参数使用插件默认值。
```html
<dl>
    <dt><a href="">aaaa</a></dt>
    <dd><a href="">bbbb</a></dd>
</dl>
```
```javascript
$.fn.myPlugin2 = function(options){
    var defaults = {
        'color' : 'blue',
        'fontSize' : '20px'
    };
    var settings = $.extend(defaults, options);
    return this.css({
        'color' : settings.color,
        'fontSize' : settings.fontSize
    })
}

$(function(){
    $('dl a').myPlugin2();
})
$(function(){
    $('dl a').myPlugin2({
        'color':'purple',
        'fontSize' : '30px'
    });
})
```
### 保护好默认参数
上面代码调用 extend 时会将 defaults 的值改变，这样不好，因为它作为插件因有一些东西维持原样，另外就是如果你在后续代码中还要使用这些默认值的话，当你再次访问它时它已经被用户传进来的参数更改了。
一个好的办法是讲一个新的空对象作为 $.extend 的第一个参数，defaults 和用户传递的参数对象紧随气候，这样做的好处是将所有值被合并到这个空对象上，保护了插件里面的值。
```html
<div>
    <p><span>这里是一些文字</span></p>
</div>
```
```javascript
$.fn.myPlugin3 = function(options){
    var defaults = {
        'color' : 'red',
        'fontSize' : '18px'
    }
    var settings = $.extend({},defaults,options);
    console.log(settings);
    return this.css({
        'color' : settings.color,
        'fontSize' : settings.fontSize
    })
}

$(function(){
    $('div span').myPlugin3();
})
$(function(){
    $('div span').myPlugin3({
        'color':'orange',
        'fontSize' :'10px'
    });
})
```
## 面向对象的插件开发
如果将需要的重要变量定义到对象的属性上，函数变成对象的方法，当我们需要的时候通过对象来获取，一来方便管理，二来不会影响外部命名空间，因为这些变量名和方法名都在对象内部。
接上面的例子，我们可以将这个插件抽象称一个美化页面的对象。
```javascript
// 定义 Beautifier 的构造函数
var Beautifier = function(ele,opt){
    this.$element = ele;
    this.defaults = {
        'color' : 'red',
        'fontSize' : '12px',
        'textDecoration' : 'none'
    },
    this.options = $.extend( {} , this.defaults , opt );
}

// 定义 beautifier 的方法

Beautifier.prototype = {
    beautify : function(){
        return this.$element.css({
            'color' : this.options.color,
            'fontSize' : this.options.fontSize,
            'textDecoration' : this.textDecoration
        })
    }
}
// 在插件中使用 Beautifier 对象
$.fn.myPlugin4 = function(options){
    //  创建 Beautifier 的实体
    var beautifier = new Beautifier(this,options);
    // 调用其方法
    return beautifier.beautify();
}
```
通过上面的改造，我们的代码变得更加面向对象了，也更好维护和理解，以后要加新功能新方法，只需要向对象添加新变量及方法即可，然后在插件实例化后调用。
## 关于命名空间
### 用自调用匿名函数包裹你的代码
javascript 中无法用花括号方便的创建作用域，但函数却可以形成一个作用域，域内的代码是无法被外界访问的。如果我们将代码放入一个函数中，那么将不会污染全局命名空间，同时不会和别的代码冲突。
如上面我们定义了一个 Beautifier 全局变量，它会被附到 window　对象上，为了防止这种事情发生，我们在保持原来代码不变，我们将所有代码用自调用匿名函数包裹。
```javascript
(function() {
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            'color': 'red',
            'fontSize': '12px',
            'textDecoration': 'none'
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Beautifier.prototype = {
        beautify: function() {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        }
    }
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
        //调用其方法
        return beautifier.beautify();
    }
})();
```
这样做的好处，也就是上面所阐述的那样，另一个好处就是，自调用匿名函数里面的代码会在第一时间执行，页面准备好过后，上面的代码就将插件准备好了，以方便在后面的代码中使用插件。
到目前为止似乎接近完美，如果在考虑到其他一些因素，比如我们会讲这段代码放到页面后，前面别人谢的代码没有用分号结尾，活着前面的代码将window、undefined等这些系统变量或者关键字修改掉了，正好我们又在自己的代码里面进行了使用，那结果也是不可预测的，这不是我们想要的。
### 将系统变量以变量形式传递到插件内部
看看下面的代码，会出现什么结果？
```javascript
    var foo = function(){
        // 别人的代码
    } // 注意这里没有用分号结尾

    // 开始我们的代码
    ;(function(){ // 前面增加分号修正
        // 我们的代码
        alert('有没有执行到这里');
    })() // jquery插件.html:236 Uncaught TypeError: (intermediate value)(...) is not a function
```
同时，将系统变量以参数形式传递到插件内部也是不错的选择。
```javascript
;(function($,window,document,undefined){
    //我们的代码。。
    //blah blah blah...
})(jQuery,window,document);
```
而至于这个undefined，稍微有意思一点，为了得到没有被修改的undefined，我们并没有传递这个参数，但却在接收时接收了它，因为实际并没有传，所以‘undefined’那个位置接收到的就是真实的'undefined'了。是不是有点hack的味道，值得细细体会的技术，当然不是我发明的，都是从前人的经验中学习。
所以最后我们的插件成了这样：
```javascript
;(function($, window, document,undefined) {
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            'color': 'red',
            'fontSize': '12px',
            'textDecoration': 'none'
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Beautifier.prototype = {
        beautify: function() {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        }
    }
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
        //调用其方法
        return beautifier.beautify();
    }
})(jQuery, window, document);
```
## 关于变量定义及命名
现在谈谈关于变量及方法等的命名，没有硬性规定，但为了规范，遵循一些约定还是很有必要的。

变量定义：好的做法是把将要使用的变量名用一个var关键字一并定义在代码开头，变量名间用逗号隔开。原因有二：

- 一是便于理解，知道下面的代码会用到哪些变量，同时代码显得整洁且有规律，也方便管理，变量定义与逻辑代码分开；
- 二是因为JavaScript中所有变量及函数名会自动提升，也称之为JavaScript的Hoist特性，即使你将变量的定义穿插在逻辑代码中，在代码解析运行期间，这些变量的声明还是被提升到了当前作用域最顶端的，所以我们将变量定义在一个作用域的开头是更符合逻辑的一种做法。当然，再次说明这只是一种约定，不是必需的。
变量及函数命名 一般使用驼峰命名法（CamelCase），即首个单词的首字母小写，后面单词首字母大写，比如resultArray，requestAnimationFrame。对于常量，所有字母采用大写，多个单词用下划线隔开，比如WIDTH=100，BRUSH_COLOR='#00ff00'。当变量是jQuery类型时，建议以$开头，开始会不习惯，但经常用了之后会感觉很方便，因为可以很方便地将它与普通变量区别开来，一看到以$开头我们就知道它是jQuery类型可以直接在其身上调用jQuery相关的方法，比如var $element=$('a'); 之后就可以在后面的代码中很方便地使用它，并且与其他变量容易区分开来。

引号的使用：既然都扯了这些与插件主题无关的了，这里再多说一句，一般HTML代码里面使用双引号，而在JavaScript中多用单引号，比如下面代码所示：
```javascript
var name = 'Wayou';
document.getElementById(‘example’).innerHTML = '< a href="http: //wayouliu.duapp.com/">'+name+'</a>'; //href=".." HTML中保持双引号，JavaScript中保持单引号
```
一方面，HTML代码中本来就使用的是双引号，另一方面，在JavaScript中引号中还需要引号的时候，要求我们单双引号间隔着写才是合法的语句，除非你使用转意符那也是可以的。再者，坚持这样的统一可以保持代码风格的一致，不会出现这里字符串用双引号包着，另外的地方就在用单引号。

## 代码混淆与压缩
进行完上面的步骤，已经小有所成了。或许你很早就注意到了，你下载的插件里面，一般都会提供一个压缩的版本一般在文件名里带个'min'字样。也就是minified的意思，压缩浓缩后的版本。并且平时我们使用的jQuery也是官网提供的压缩版本，jquery.min.js。

这里的压缩不是指代码进行功能上的压缩，而是通过将代码里面的变量名，方法函数名等等用更短的名称来替换，并且删除注释（如果有的话）删除代码间的空白及换行所得到的浓缩版本。同时由于代码里面的各种名称都已经被替代，别人无法阅读和分清其逻辑，也起到了混淆代码的作用。

### 压缩的好处
源码经过混淆压缩后，体积大大减小，使代码变得轻量级，同时加快了下载速度，两面加载变快。比如正常jQuery v1.11.0的源码是276kb，而压缩后的版本仅94.1kb！体积减小一半还多。这个体积的减小对于文件下载速度的提升不可小觑。
经过压缩混淆后，代码还能阅读嘛？当然不能，所以顺带还起到了代码保护的作用。当然只是针对你编写了一些比较酷的代码又不想别人抄袭的情况。对于jQuery社区，这里本身就是开源的世界，同时JavaScript这东西其实也没什么实质性方法可以防止别人查看阅读你的代码，毕竟有混淆就有反混淆工具，这里代码压缩更多的还是上面提到的压缩文件的作用，同时一定程度上防止别人抄袭。

