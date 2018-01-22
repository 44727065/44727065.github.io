# Node WebPack Vue 前端架构

## 都是啥
Node 是一javascript V8 引擎，用 js 写后端应用和服务。
Webpack 是打包工具
Vue 是前端开发 MVVM 的框架
## 本地代码跑起来需要啥
### 安装 node
安装node.js，Node.js安装包及源码下载地址为：https://nodejs.org/en/download/。
## 默认已经安装 npm （npm 是包管理工具 https://www.npmjs.com/）
命令行查看当前 npm 版本
```shell
$ npm -v
```
但是 npm 的包文件都在海外，速度会很慢，可以使用淘宝定制的 cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:
```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
这样就可以使用 cnpm 命令来安装模块了：
```
cnpm install [name]
```
### vue-cli 安装一下(咱们的项目你不用安装，因为你不需要创建 vue 项目，你是 clone 下来的)
```
npm install -g vue-cli
```
### 将 git 库中的代码拉下来
```
git clone http://192.168.200.93/elion/ioc-fe.git
cd ioc-fe
git checkout -b 0.1 origin/0.1
```
### 项目的依赖包并没有在git库里，所以你要安装一下项目的相关 npm 包
```
cnpm install
```
### 现在你就可以在本地使用 node 服务开启本地开发环境了
```
npm run start
```
成功了会提示你服务在 http://localhost:8080 端口打开了

## 调试页面找哪里
Vue 中的模块都是独立文件的，比如我们调整首页顶部那几个卡片形式的东西，可以在 `src/comp/home/topdash/topdash.vue` 找到具体的业务模块。


## Vue 的数据驱动
和以往相比通过操作获取 dom 操作页面属性的方法， MVVM 使用数据驱动的方式，当数据改变了，不用重新获取dom 通过 innerHTML 方法重写内部内容，但是所有的数据必须在检测的队列里面，检测的队列就是 vue 实例的 data 属性里面的值。
```javascript
export default {
    data(){
        // 这里面的值都会被监测，有改变的话会被更新到页面视图中
        a: {},
        b: {}
    }
```
## 项目使用的是 axios 通过 ES6的 promise 的方法请求数据，你只需要关注 methods 里面带 *Api 的方法
如下：
```javascript
methods:{
    // 获取水的 API
    getWaterDataApi(callback){
        //获取数据的方法
        this.$axios.get('/api/airStation/',{
            id:1
        }).then((res)=>{
            if(typeof callback == 'function'){
            callback(res);
            }
        }).catch((err)=>{
            // 发生错误的情况
            console.log(err);
        })
    },
    // 水的数据格式化
    waterDataFormat(){
        this.getWaterDataApi(function(res){
            // 这样子就修改了视图里面的数据了
            // 如果有些数据不合适，你就需要处理一下
            this.a = res.a;
            this.b = res.b;
        })
    }
}
```









