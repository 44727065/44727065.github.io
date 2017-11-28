# 原生Js实现ajax的原理
Ajax 的全称是Asynchronous JavaScript and XML，其中，Asynchronous 是异步的意思，它有别于传统web开发中采用的同步的方式。

Ajax的原理简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。

XMLHttpRequest是ajax的核心机制，它是在IE5中首先引入的，是一种支持异步请求的技术。简单的说，也就是javascript可以及时向服务器提出请求和处理响应，而不阻塞用户。达到无刷新的效果。

XMLHttpRequest这个对象的属性有：
 - onreadystatechang    每次状态改变所触发事件的事件处理程序。
 - responseText    从服务器进程返回数据的字符串形式。
 - responseXML    从服务器进程返回的DOM兼容的文档数据对象。
 - status    从服务器返回的数字代码，比如常见的404（未找到）和200（已就绪）
 - status Text    伴随状态码的字符串信息
 - readyState    对象状态值
  - 1 0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）
  - 1 (初始化) 对象已建立，尚未调用send方法
  - 2 (发送数据) send方法已调用，但是当前的状态及http头未知
  - 3 (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误，
  - 4 (完成) 数据接收完毕,此时可以通过通过responseXml和responseText获取完整的回应数据
```script
ajax({
    url: "./TestXHR.aspx",              //请求地址
    type: "POST",                       //请求方式
    data: { name: "super", age: 20 },        //请求参数
    dataType: "json",
    success: function (response, xml) {
        // 此处放成功后执行的代码
    },
    fail: function (status) {
        // 此处放失败后执行的代码
    }
});

function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);

    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    }

    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}
//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace("."));
    return arr.join("&");
}
```
## Jsonp (JSON with Padding)
Jsonp：(JSON with Padding)是一种跨域请求方式。主要原理是利用了script 标签可以跨域请求的特点，由其 src 属性发送请求到服务器，服务器返回 js 代码，网页端接受响应，然后就直接执行了，这和通过 script 标签引用外部文件的原理是一样的。JSONP由两部分组成：回调函数和数据，回调函数一般是由网页端控制，作为参数发往服务器端，服务器端把该函数和数据拼成字符串返回。
## pjax
pjax：pjax是一种基于ajax+history.pushState的新技术，该技术可以无刷新改变页面的内容，并且可以改变页面的URL。（关键点：可以实现ajax无法实现的后退功能）pjax是ajax+pushState的封装，同时支持本地存储、动画等多种功能。目前支持jquery、qwrap、kissy等多种版本。
