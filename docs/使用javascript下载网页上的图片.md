# 使用javascript下载网页上的图片
```javascript
function downloadImage(src) {
    var a = $("<a></a>").attr("href", src).attr("download", "img.png").appendTo("body");

    a[0].click();
    a.remove();
}
/* IE下可以通过转换为canvas，然后通过msSaveBlob方法保存图片 */
function downloadImage(src) {
    var canvas = document.createElement('canvas');
    var img = document.createElement('img');
    img.onload = function(e) {
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, img.width, img.height);
        window.navigator.msSaveBlob(canvas.msToBlob(),'image.jpg');
    }
    img.src = src;
}
```
