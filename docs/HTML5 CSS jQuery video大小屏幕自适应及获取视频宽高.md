# HTML5/CSS/jQuery video大小屏幕自适应及获取视频宽高
如何让 Video 的大小能够满屏（适应父容器div），就是通过判断高度、宽度，使之能够到达全屏的效果。

## 通过 CSS 定义 Video 的宽高
```css
video {
    height: 100%;
    width: 100%;
    display: block;
}
```
## 获取宽高比例等比放大
我们通过 `Video` 标签可以获得 `Video` 的 `videoHeight` 和 `videoHeight` 属性获得原始高度和宽度（媒体本身）。
```javascript
function getVideoInfo () {
    var video = $('video');
    var videoH = video[0].videoHeight;
    var videoW = video[0].videoWidth;
    console.log("Height: " + video[0].videoHeight + ", Width: " + video[0].videoWidth);
    console.log("Height: " + videoH + ", Width: " + videoW);
    var videoRatio = videoH / videoW;
    console.log(videoRatio);
    window.onresize = function() {
        if (video.height() / video.width() > videoRatio) {
            console.log('Width:' + video.width() + ' Height: ' + (video.width() * videoRatio));
        } else {
            console.log('Width:' + video.height() / videoRatio + ' Height: ' + video.height());
        }
    }
}
```
通过 `window.resize` 可以监听窗口的变化，大小变化来判断值，当然这块最好使用 函数节流，提升性能。
