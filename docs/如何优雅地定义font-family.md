今早看到有这么一段字体设置，感觉很漂亮，随手搜索了一下
```css
12px/1.5 -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif
考虑到各个系统的问题

```
下面看看各个字体的对应
```css
// System Font            // https://www.webkit.org/blog/3709/using-the-system-font-in-web-content/
-apple-system,            // OSX ^10.11 & iOS ^9  San Francisco & 苹方

// English First
"Helvetica Neue",         // OSX
"Arial",                  // Win "Helvetica"
//" Segoe UI",            // Win ^8

// Chinese Fallback
"PingFang SC",            // OSX ^10.11 & iOS ^9  苹方（华康信凭黑）
"Hiragino Sans GB",       // OSX ^10.6            冬青黑体
"STHeiti",                // OSX <10.6  & iOS <9  华文黑体
"Microsoft YaHei",        // Win                  微软雅黑
"Microsoft JhengHei",     // Win                  微软正黑
"Source Han Sans SC",     // SourceHan - begin    思源黑体
"Noto Sans CJK SC",
"Source Han Sans CN",
"Noto Sans SC",
"Source Han Sans TC",
"Noto Sans CJK TC",       // SourceHan - end
"WenQuanYi Micro Hei",    // Linux                文泉驿微米黑
SimSun,                   // Win old              中易宋体
sans-serif;               // System Fallback
```
```css
font-family: -apple-system, BlinkMacSystemFont,
    “Segoe UI”, “Roboto”, “Oxygen”,
    “Ubuntu”, “Cantarell”, “Fira Sans”,
    “Droid Sans”, “Helvetica Neue”, sans-serif;
```
- `-apple-system` targets San Francisco in Safari on Mac OS X and iOS, and it targets Neue Helvetica and Lucida Grande on older versions of Mac OS X. It properly selects between San Francisco Text and San Francisco Display depending on the text’s size.
- `BlinkMacSystemFont` is the equivalent for Chrome on Mac OS X.
## The second grouping is for known system UI fonts:
- `Segoe UI` targets Windows and Windows Phone.
- `Roboto` targets Android and newer Chrome OS’. It is deliberately listed after Segoe UI so that if you’re an Android developer on Windows and have Roboto installed, Segoe UI will be used instead.
- `Oxygen` targets KDE, Ubuntu targets… well, you can guess, and Cantarell targets GNOME. This is beginning to feel futile because some Linux distributions have many of these fonts.
- `Fira Sans` targets Firefox OS.
- `Droid Sans` targets older versions of Android.
Note that we don’t specify San Francisco by name. On both iOS and Mac OS X, San Francisco isn’t obviously accessible, but rather exists as a “hidden” font.
We also don’t specify San Francisco using .SFNSText-Regular, the internal PostScript name for San `Francisco` on Mac OS X. It only works in Chrome and is less versatile than BlinkMacSystemFont.
The third grouping is our fallback fonts:
`Helvetica Neue` targets pre-El Capitan versions of Mac OS X. It is listed close to the end because it’s a popular font on other non-El Capitan computers.
`sans-serif` is the default `sans-serif` fallback font.
详解：https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/
