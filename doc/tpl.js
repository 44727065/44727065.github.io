var tpl = {
    meta: {
        template: [
            '<pre><code class="html">',
            '一、HTML页面结构/',
            '< meta name = "viewport" content = "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" / >',
            '// width设置viewport宽度，为一个正整数，或字符串 device-width',
            '// height   设置viewport高度，一般设置了宽度，会自动解析出高度，可以不用设置',
            '// initial-scale    默认缩放比例，为一个数字，可以带小数',
            '// minimum-scale    允许用户最小缩放比例，为一个数字，可以带小数',
            '// maximum-scale    允许用户最大缩放比例，为一个数字，可以带小数',
            '// user-scalable    是否允许手动缩放',
            '</code></pre>'
        ].join('<br />')
    },
    js_meta: {
        template: [
            '<pre><code class="html">',
            'var phoneWidth =  parseInt(window.screen.width);',
            'var phoneScale = phoneWidth/640;',
            'var ua = navigator.userAgent;',
            'if (/Android (\d+\.\d+)/.test(ua)){',
            'var version = parseFloat(RegExp.$1);',
            'if(version>2.3){',
            '    document.write(&#039; < meta name = "viewport"',
            content = "width=640, minimum-scale = '+phoneScale+', 'maximum-scale = '+phoneScale+', target-densitydpi=device-dpi" > ');',
            '}else{',
            'document.write(&#039; < meta name = "viewport"            content = "width=640, target-densitydpi=device-dpi" > &#039;);',
            '}',
            '} else {',
            'document.write(&#039; < meta name = "viewport" content = "width=640, user-scalable=no, target-densitydpi=device-dpi" > &#039;);',
            '}',
            '</code></pre>'
        ].join('<br />')
    },
    basic_meta: {
        template: [
            '<pre><code class="html">',
            '<!-- 设置缩放 -->',
            '< meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui" />',
            '<!-- 可隐藏地址栏，仅针对IOS的Safari（注：IOS7.0版本以后，safari上已看不到效果） -->',
            '< meta name="apple-mobile-web-app-capable" content="yes" />',
            '<!-- 仅针对IOS的Safari顶端状态条的样式（可选default/black/black-translucent ） -->',
            '< meta name="apple-mobile-web-app-status-bar-style" content="black" />',
            '<!-- IOS中禁用将数字识别为电话号码/忽略Android平台中对邮箱地址的识别 -->',
            '< meta name="format-detection"content="telephone=no, email=no" />',
            '</code></pre>'
        ].join("<br />")
    },
    other_meta: {
        template: [
            '<pre><code class="html">',
            '<!-- 启用360浏览器的极速模式(webkit) -->',
            '< meta name="renderer" content="webkit">',
            '<!-- 避免IE使用兼容模式 -->',
            '< meta http-equiv="X-UA-Compatible" content="IE=edge">',
            '<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->',
            '< meta name="HandheldFriendly" content="true">',
            '<!-- 微软的老式浏览器 -->',
            '< meta name="MobileOptimized" content="320">',
            '<!-- uc强制竖屏 -->',
            '< meta name="screen-orientation" content="portrait">',
            '<!-- QQ强制竖屏 -->',
            '< meta name="x5-orientation" content="portrait">',
            '<!-- UC强制全屏 -->',
            '< meta name="full-screen" content="yes">',
            '<!-- QQ强制全屏 -->',
            '< meta name="x5-fullscreen" content="true">',
            '<!-- UC应用模式 -->',
            '< meta name="browsermode" content="application">',
            '<!-- QQ应用模式 -->',
            '< meta name="x5-page-mode" content="app">',
            '<!-- windows phone 点击无高光 -->',
            '< meta name="msapplication-tap-highlight" content="no">',
            '</code></pre>'
        ].join("<br />")
    },
    font_en: {
        template: [
            '<pre><code class="html">',
            '@ --------------------------------------中文字体的英文名称',
            '@ 宋体      SimSun',
            '@ 黑体      SimHei',
            '@ 微信雅黑   Microsoft Yahei',
            '@ 微软正黑体 Microsoft JhengHei',
            '@ 新宋体    NSimSun',
            '@ 新细明体  MingLiU',
            '@ 细明体    MingLiU',
            '@ 标楷体    DFKai-SB',
            '@ 仿宋     FangSong',
            '@ 楷体     KaiTi',
            '@ 仿宋_GB2312  FangSong_GB2312',
            '@ 楷体_GB2312  KaiTi_GB2312  ',
            '@',
            '@ 说明：中文字体多数使用宋体、雅黑，英文用Helvetica',

            'body {',
            'font - family: Microsoft Yahei, SimSun, Helvetica;',
            '}',
            '</code></pre>'
        ].join("<br />")
    },
    tel_msm_mailto: {
        template: [
            '<pre><code class="html">',
            '// 一、打电话',
            '<a href="tel:0755-10086">打电话给:0755-10086</a>',
            '//  二、发短信，winphone系统无效',
            '<a href="sms:10086">发短信给: 10086</a>',
            '// 三、写邮件',
            '//注：在添加这些功能时，第一个功能以"?"开头，后面的以"&"开头',
            '//1.普通邮件',
            '<a href="mailto:863139978@qq.com">点击我发邮件</a>',
            '//2.收件地址后添加?cc=开头，可添加抄送地址（Android存在兼容问题）',
            '<a href="mailto:863139978@qq.com?cc=zhangqian0406@yeah.net">点击我发邮件</a>',
            '//3.跟着抄送地址后，写上&bcc=,可添加密件抄送地址（Android存在兼容问题）',
            '<a href="mailto:863139978@qq.com?cc=zhangqian0406@yeah.net&bcc=384900096@qq.com">点击我发邮件</a>',
            '//4.包含多个收件人、抄送、密件抄送人，用分号(;)隔开多个邮件人的地址',
            '<a href="mailto:863139978@qq.com;384900096@qq.com">点击我发邮件</a>',
            '//5.包含主题，用?subject=',
            '<a href="mailto:863139978@qq.com?subject=邮件主题">点击我发邮件</a>',
            '//6.包含内容，用?body=;如内容包含文本，使用%0A给文本换行 ',
            '<a href="mailto:863139978@qq.com?body=邮件主题内容%0A腾讯诚信%0A期待您的到来">点击我发邮件</a>',
            '//7.内容包含链接，含http(s)://等的文本自动转化为链接',
            '<a href="mailto:863139978@qq.com?body=http://www.baidu.com">点击我发邮件</a>',
            '//8.内容包含图片（PC不支持）',
            '<a href="mailto:863139978@qq.com?body=<img src=&#039;images / 1. jpg & #039 />">点击我发邮件</a>',
            '//9.完整示例',
            '<a href= "mailto:863139978@qq.com;384900096@qq.com?cc=zhangqian0406@yeah.net&bcc=993233461@qq.com&subject=[邮件主题]&body=腾讯诚邀您参与%0A%0Ahttp://www.baidu.com%0A%0A<img src=&#039images / 1. jpg &#039 />">点击我发邮件</a>',
            '</code></pre>'
        ].join("<br />")
    },
    touch: {
        template: [
            '<pre><code class="html">',
            '/* 当用户手指放在移动设备在屏幕上滑动会触发的touch事件 */',
            '// 以下支持webkit',
            'touchstart——当手指触碰屏幕时候发生。不管当前有多少只手指',
            'touchmove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动',
            'touchend——当手指离开屏幕时触发',
            'touchcancel——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用',
            '//TouchEvent说明：',
            'touches：屏幕上所有手指的信息',
            'targetTouches：手指在目标区域的手指信息',
            'changedTouches：最近一次触发该事件的手指信息',
            'touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息',
            '//参数信息(changedTouches[0])',
            'clientX、clientY在显示区的坐标',
            'target：当前元素',
            '//事件响应顺序',
            'ontouchstart  > ontouchmove  > ontouchend > onclick',
            '// 以下支持winphone 8',
            'MSPointerDown——当手指触碰屏幕时候发生。不管当前有多少只手指',
            'MSPointerMove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用css的html{-ms-touch-action: none;}可以阻止默认况的发生：阻止页面滚动',
            'MSPointerUp——当手指离开屏幕时触发',
            '</code></pre>'
        ].join("<br />")
    },
    click: {
        template: [
            '<pre><code class="html">',
            '<p>说明：移动设备上的web网页是有300ms延迟的，玩玩会造成按钮点击延迟甚至是点击失效。</p>',
            '<p>以下是历史原因，来源一个公司内一个同事的分享：</p>',
            '<p>2007年苹果发布首款iphone上IOS系统搭载的safari为了将适用于PC端上大屏幕的网页能比较好的展示在手机端上，使用了双击缩放(double tap to zoom)的方案，比如你在手机上用浏览器打开一个PC上的网页，你可能在看到页面内容虽然可以撑满整个屏幕，但是字体、图片都很小看不清，此时可以快速双击屏幕上的某一部分，你就能看清该部分放大后的内容，再次双击后能回到原始状态。</p>',

            '<p>双击缩放是指用手指在屏幕上快速点击两次，iOS 自带的 Safari 浏览器会将网页缩放至原始比例。</p>',

            '<p>原因就出在浏览器需要如何判断快速点击上，当用户在屏幕上单击某一个元素时候，例如跳转链接<a href="#"></a>，此处浏览器会先捕获该次单击，但浏览器不能决定用户是单纯要点击链接还是要双击该部分区域进行缩放操作，所以，捕获第一次单击后，浏览器会先Hold一段时间t，如果在t时间区间里用户未进行下一次点击，则浏览器会做单击跳转链接的处理，如果t时间里用户进行了第二次单击操作，则浏览器会禁止跳转，转而进行对该部分区域页面的缩放操作。那么这个时间区间t有多少呢？在IOS safari下，大概为300毫秒。这就是延迟的由来。造成的后果用户纯粹单击页面，页面需要过一段时间才响应，给用户慢体验感觉，对于web开发者来说是，页面js捕获click事件的回调函数处理，需要300ms后才生效，也就间接导致影响其他业务逻辑的处理。</p>',

            '<p>//解决方案：</p>',
            '<p>fastclick可以解决在手机上点击事件的300ms延迟</p>',
            '<p>zepto的touch模块，tap事件也是为了解决在click的延迟问题</p>',
            '</code></pre>'
        ].join("<br />")
    },
    retina: {
        template: [
            '<pre><code class="html">',
            '//例如图片宽高为：200px*200px，那么写法如下',
            '.css{width:100px;height:100px;background-size:100px 100px;}',
            '//其它元素的取值为原来的1/2，例如视觉稿40px的字体，使用样式的写法为20px',
            '.css{font-size:20px}',
            '//image-set设计Rentina背景图',
            'image-set,webkit私有属性，也是CSS4的属性，为解决Rentina屏幕下的图像而生。',
            '.css {',
            '    background: url(images/bg.jpg) no-repeat center;',
            '    background: -webkit-image-set(',
            '    url(images/bg.jpg) 1x,     //支持image-set普通屏',
            '    url(images/bg-2x.jpg) 2x); //支持image-set的Rentinan',
            '</code></pre>'
        ].join("<br />")
    },
    highlight: {
        template: [
            '<pre><code class="html">',
            '/ios用户点击一个链接，会出现一个半透明灰色遮罩, 如果想要禁用，可设置-webkit-tap-highlight-color的alpha值为0去除灰色半透明遮罩；',
            '//android用户点击一个链接，会出现一个边框或者半透明灰色遮罩, 不同生产商定义出来额效果不一样，可设置-webkit-tap-highlight-color的alpha值为0去除部分机器自带的效果；',
            '//winphone系统,点击标签产生的灰色半透明背景，能通过设置<meta name="msapplication-tap-highlight" content="no">去掉；',
            '//特殊说明：有些机型去除不了，如小米2。对于按钮类还有个办法，不使用a或者input标签，直接用div标签',
            'a,button,input,textarea { ',
            '    -webkit-tap-highlight-color: rgba(0,0,0,0); ',
            '    -webkit-user-modify:read-write-plaintext-only; //-webkit-user-modify有个副作用，就是输入法不再能够输入多个字符',
            '}   ',
            '// 也可以 ',
            '* { -webkit-tap-highlight-color: rgba(0,0,0,0); }',
            '//winphone下',
            '< meta name="msapplication-tap-highlight" content="no">',
            '</code></pre>'
        ].join("<br />")
    },
    form: {
        template: [
            '<pre><code class="html">',
            '//一、使用appearance改变webkit浏览器的默认外观',
            'input, select {',
            '    -webkit - appearance: none;',
            '    appearance: none;',
            '}',
            '//二、winphone下，使用伪元素改变表单元素默认外观',
            '//1.禁用select默认箭头，::-ms-expand修改表单控件下拉箭头，设置隐藏并使用背景图片来修饰',
            'select::-ms - expand {',
            '    display: none;',
            '}',
            '//2.禁用radio和checkbox默认样式，::-ms-check修改表单复选框或单选框默认图标，设置隐藏并使用背景图片来修饰',
            'input[type = radio]::-ms - check,',
            'input[type = checkbox]::-ms - check {',
            '    display: none;',
            '}',
            '//3.禁用pc端表单输入框默认清除按钮，::-ms-clear修改清除按钮，设置隐藏并使用背景图片来修饰',
            'input[type = text]::-ms - clear,',
            'input[type = tel]::-ms - clear,',
            'input[type = number]::-ms - clear {',
            '    display: none;',
            '}',
            '</code></pre>'
        ].join("<br />")
    },
    rem: {
        template: [
            '<pre><code class="html">',
            '// 如需适配多种移动设备，建议使用rem。以下为参考值：',
            'html { font-size: 62.5%; }   //10*16 = 62.5%',
            '//设置12px字体   这里注意在rem前要加上对应的px值，解决不支持rem的浏览器的兼容问题，做到优雅降级',
            'body { font-size:12px; font-size:1.2rem; }',
            '</code></pre>'
        ].join("<br />")
    },
    tips: {
        template: [
            '<pre><code class="html">',
            '//去掉webkit的滚动条——display: none;',
            '//其他参数',
            '::-webkit-scrollba //滚动条整体部分',
            '::-webkit-scrollbar-thumb   //滚动条内的小方块',
            '::-webkit-scrollbar-track   //滚动条轨道',
            '::-webkit-scrollbar-button  //滚动条轨道两端按钮',
            '::-webkit-scrollbar-track-piece  //滚动条中间部分，内置轨道',
            '::-webkit-scrollbar-corner       //边角，两个滚动条交汇处',
            '::-webkit-resizer            //两个滚动条的交汇处上用于通过拖动调整元素大小的小控件',
            '// 禁止长按链接与图片弹出菜单',
            'a,img { -webkit-touch-callout: none }    ',
            '// 禁止ios和android用户选中文字',
            'html,body {-webkit-user-select:none; user-select: none; }',
            '// 改变输入框placeholder的颜色值',
            '::-webkit-input-placeholder { /* WebKit browsers */',
            'color: #999; }',
            ':-moz-placeholder { /* Mozilla Firefox 4 to 18 */',
            'color: #999; }',
            '::-moz-placeholder { /* Mozilla Firefox 19+ */',
            'color: #999; }',
            ':-ms-input-placeholder { /* Internet Explorer 10+ */',
            'color: #999; }',
            'input:focus::-webkit-input-placeholder{ color:#999; }',
            '// android上去掉语音输入按钮',
            'input::-webkit-input-speech-button {display: none}',
            '// 阻止windows Phone的默认触摸事件',
            '/*说明：winphone下默认触摸事件事件使用e.preventDefault是无效的，可通过样式来禁用，如：*/',
            'html { -ms-touch-action:none; } //禁止winphone默认触摸事件',
            '</code></pre>'
        ].join("<br />")
    },
    input: {
        template: [
            '<pre><code class="html">',
            '//取消input在ios下，输入的时候英文首字母的默认大写',
            '<input autocapitalize="off" autocorrect="off" />',
            '</code></pre>'
        ].join("<br />")
    },
    upload: {
        template: [
            '<pre><code class="html">',
            '//IOS有拍照、录像、选取本地图片功能，部分Android只有选择本地图片功能。Winphone不支持',
            '<input type="file" accept="images/*" />',
            '<input type="file" accept="video/*" />',
            '</code></pre>'
        ].join("<br />")
    },
    orient: {
        template: [
            '<pre><code class="html">',
            '//JS处理',
            'function orientInit(){',
            'var orientChk = document.documentElement.clientWidth > document.documentElement.clientHeight ? "landscape" : "portrait";',
            'if (orientChk == "lapdscape") {',
            '    //这里是横屏下需要执行的事件',
            '} else {',
            '    //这里是竖屏下需要执行的事件',
            '}',
            '}',

            'orientInit();',
            'window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {',
            'setTimeout(orientInit, 100);',
            '}, false)',

            '//CSS处理',
            '//竖屏时样式',
            '@media all and(orientation: portrait) {}',
            '//横屏时样式',
            '@media all and(orientation: landscape) {}',
            '</code></pre>'
        ].join("<br />")
    },
    audio_video: {
        template: [
            '<pre><code class="html">',
            '//音频，写法一',
            '<audio src="music/bg.mp3" autoplay loop controls>你的浏览器还不支持哦</audio>',
            '//音频，写法二',
            '<audio controls="controls"> ',
            '    <source src="music/bg.ogg" type="audio/ogg"></source>',
            '    <source src="music/bg.mp3" type="audio/mpeg"></source>',
            '    优先播放音乐bg.ogg，不支持在播放bg.mp3',
            '</audio> ',
            '//JS绑定自动播放（操作window时，播放音乐）',
            '$(window).one("touchstart", function(){',
            '    music.play();',
            '})',

            '//微信下兼容处理',
            'document.addEventListener("WeixinJSBridgeReady", function () {',
            '    music.play();',
            '}, false);',

            '//小结',
            '//1.audio元素的autoplay属性在IOS及Android上无法使用，在PC端正常',
            '//2.audio元素没有设置controls时，在IOS及Android会占据空间大小，而在PC端Chrome是不会占据任何空间',
            '</code></pre>'
        ].join("<br />")
    },
    motion: {
        template: [
            '<pre><code class="html">',
            '// 运用HTML5的deviceMotion，调用重力感应事件',
            'if(window.DeviceMotionEvent){',
            '    document.addEventListener("devicemotion", deviceMotionHandler, false)',
            '}',

            'var speed = 30;',
            'var x = y = z = lastX = lastY = lastZ = 0;',
            'function deviceMotionHandler(eventData){',
            '    var acceleration = event.accelerationIncludingGravity;',
            '    x = acceleration.x;',
            '    y = acceleration.y;',
            '    z = acceleration.z;',
            '    if(Math.abs(x-lastX)>speed || Math.abs(y-lastY)>speed || Math.abs(z-lastZ)>speed ){',
            '        //这里是摇动后要执行的方法',
            '        yaoAfter();',
            '    }',
            '    lastX = x;',
            '    lastY = y;',
            '    lastZ = z;',
            '}',
            'function yaoAfter(){',
            '    //do something',
            '}',
            '</code></pre>'
        ].join("<br />")
    },
    fixed: {
        template: [
            '<pre><code class="html">',
            '//fixed定位',
            '//1.ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位',
            '//2.android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位',
            '//3.ios4下不支持position:fixed',
            '//解决方案：使用[Iscroll](http://cubiq.org/iscroll-5)，如：',
            '&lt;div id="wrapper"&gt;',
            '        &lt;ul&gt;',
            '               &lt;li&gt;&lt;/li&gt;',
            '               .....',
            '        &lt;/ul&gt;',
            '&lt;/div&gt;',
            '&lt;script src="iscroll.js"&gt;&lt;/script&gt;',
            '&lt;script&gt;',
            '    var myscroll;',
            '    function loaded(){',
            '        myscroll=new iScroll("wrapper");',
            '    }',
            '    window.addEventListener("DOMContentLoaded",loaded,false);',
            '&lt;/script&gt;',


            '//position定位',
            '//Android下弹出软键盘弹出时，影响absolute元素定位',
            '//解决方案:',
            "var ua = navigator.userAgent.indexOf('Android ');",
            'if(ua>-1){',
            "    $('.ipt').on('focus', function(){",
            "        $('.css').css({'visibility':'hidden'})",
            "    }).on('blur', function(){",
            "        $('.css').css({'visibility':'visible'})",
            "    })",
            '}',
            '</code></pre>'
        ].join("<br />")
    },
    airplay: {
        template: [
            '<pre><code class="html">',
            '<!--',
            '1.ios7+支持自动播放',
            '2.支持Airplay的设备（如：音箱、Apple TV)播放',
            'x-webkit-airplay="true" ',
            '3.播放视频不全屏',
            'webkit-playsinline="true" ',
            '-->',
            '< video x-webkit-airplay="true" webkit-playsinline="true" preload="auto" autoplay src="http://"></video>',
            '</code></pre>'
        ].join("<br />")
    },
    device: {
        template: [
            '<pre><code class="html">',
            'function deviceType(){',
            'var ua = navigator.userAgent;',
            'var agent = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];',
            'for(var i=0; i<len,len = agent.length; i++){',
            '    if(ua.indexOf(agent[i])>0){',
            '        break;',
            '    }',
            '}',
            '}',
            'deviceType();',
            'window.addEventListener("resize ", function(){',
            '    deviceType();',
            '})',
            '</code></pre>'
        ].join("<br />")
    },
    isweixin: {
        template: [
            '<pre><code class="html">',
            'function isWeixin(){',
            'var ua = navigator.userAgent.toLowerCase();',
            'if(ua.match(/MicroMessenger/i)=="micromessenger"){',
            '    return true;',
            '}else{',
            '    return false;',
            '}',
            '}',
            '</code></pre>'
        ].join("<br />")
    },
    android_bug: {
        template: [
            '<pre><code class="html">',
            '//1.@-webkit-keyframes 需要以0%开始100%结束，0%的百分号不能去掉',
            '//2.after和before伪类无法使用动画animation',
            '//3.border-radius不支持%单位，如要兼容，可以给radius设置一下较大的值',
            '//4.translate百分比的写法和scale在一起会导致失效，例如：',
            '-webkit-transform: translate(-50%,-50%) scale(-0.5, 1)',
            '//1.三星 Galaxy S4中自带浏览器不支持border-radius缩写',
            '//2.同时设置border-radius和背景色的时候，背景色会溢出到圆角以外部分',
            '//3.部分手机(如三星)，a链接支持鼠标:visited事件，也就是说链接访问后文字变为紫色',
            '//4.android无法同时播放多音频audio',
            '</code></pre>'
        ].join("<br />")
    },
    transform: {
        template: [
            '<pre><code class="html">',
            '.css {',
            '-webkit-transform-style: preserve-3d;',
            '-webkit-backface-visibility: hidden;',
            '-webkit-perspective: 1000;',
            '}',
            '</code></pre>'
        ].join("<br />")
    },
    translate3d: {
        template: [
            '<pre><code class="html">',
            '//目前，像Chrome/Filefox/Safari/IE9+以及最新版本Opera都支持硬件加速，当检测到某个DOM元素应用了某些CSS规则时就会自动开启，从而解决页面闪白，保证动画流畅。',
            '.css {',
            '    -webkit-transform: translate3d(0,0,0);',
            '    -moz-transform: translate3d(0,0,0);',
            '    -ms-transform: translate3d(0,0,0);',
            '    transform: translate3d(0,0,0);',
            '}',
            '</code></pre>'
        ].join("<br />")
    },
    optimize: {
        template: [
            '<pre><code class="html">',
            '//1.禁止使用iframe（阻塞父文档onload事件）',
            '//2.禁止使用gif图片实现loading效果（降低CPU消耗，提升渲染性能）',
            '//使用CSS3代码代替JS动画；',
            '//开启GPU加速；',
            '//使用base64位编码图片(不小图而言，大图不建议使用)',
            '    // 对于一些小图标，可以使用base64位编码，以减少网络请求。但不建议大图使用，比较耗费CPU。小图标优势在于：',
            '    //1.减少HTTP请求；',
            '    //2.避免文件跨域；',
            '    //3.修改及时生效；',
            '</code></pre>'
        ].join("<br />")
    }


}
