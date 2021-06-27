---
title: NodeJs开发（四） 
date: 2021-1-22 22:41:33
categories: IT
tags: IT，Web
toc: true
thumbnail: http://cdn.kunkunzhang.top/koajs.jpeg
---

万万万万万万没想到会来到第七篇，第七篇写Koa框架及Eggjs

<!--more-->

## koa

### 简介/安装

Koa是一个类似于Express的Web开发框架，创始人也是同一个人。它的主要特点是，使用了ES6的Generator函数，进行了架构的重新设计。也就是说，Koa的原理和内部结构很像Express，但是语法和内部结构进行了升级。

官方[faq](https://github.com/koajs/koa/blob/master/docs/faq.md#why-isnt-koa-just-express-40)有这样一个问题：”为什么koa不是Express 4.0？“，回答是这样的：”Koa与Express有很大差异，整个设计都是不同的，所以如果将Express 3.0按照这种写法升级到4.0，就意味着重写整个程序。所以，我们觉得创造一个新的库，是更合适的做法。“

一个Koa应用就是一个对象，包含了一个middleware数组，这个数组由一组Generator函数组成。这些函数负责对HTTP请求进行各种加工，比如生成缓存、指定代理、请求重定向等等。

初始化文件夹

```javascript
npm init
```

安装koa

```shell
npm install koa
```

最简单的demo

```javascript
const Koa = require('koa')
const app = new Koa()

app.ues(async (ctx,next)=>{
   ctx.response.body = "我是吴彦祖"
})

app.listen(3333,()=>{
   console.log('server is running')
})
```

### 核心概念

ctx：koa将node的request和response对象封装进ctx，得到ctx.request、cox.response。特别的，ctx将常用的属性做了进一步简化，可以由ctx直接访问，如ctx.request,url可以简化为ctx.request

next：next参数将处理的控制权转交下一个中间件，响应结束时再由中间件逐层传递回来，也是著名的洋葱模型

request对象：表示HTTP请求。

response对象：表示HTTP回应。

ctx对象的属性：

- request：指向Request对象
- response：指向Response对象
- req：指向Node的request对象
- res：指向Node的response对象
- app：指向App对象
- state：用于在中间件传递信息。



request对象的属性：

(1) this.request.header：返回一个对象，包含所有HTTP请求的头信息。也可以写成`this.request.headers`。

(2) this.request.method：返回HTTP请求的方法，该属性可读写。

(3)this.request.length:返回HTTP请求的Content-Length属性，取不到值，则返回undefined。

(4)this.request.path:返回HTTP请求的路径，该属性可读写。

(5)this.request.href:返回HTTP请求的完整路径，包括协议、端口和url。

(6)this.request.querystring:返回HTTP请求的查询字符串，不含问号。该属性可读写。

(7)this.request.ip:返回发出HTTP请求的IP地址。

(8)this.request.fresh:返回一个布尔值，表示缓存是否代表了最新内容。通常与If-None-Match、ETag、If-Modified-Since、Last-Modified等缓存头，配合使用。

(9)this.request.query:返回一个对象，包含了HTTP请求的查询字符串。如果没有查询字符串，则返回一个空对象。该属性可读写。

(10)this.request.host:返回HTTP请求的主机（含端口号）。

(11)this.request.hostname:返回HTTP的主机名（不含端口号）。

(12)this.request.search:返回HTTP请求的查询字符串，含问号。该属性可读写。

(13)this.request.type:返回HTTP请求的Content-Type属性。

(14)this.request.charset:返回HTTP请求的字符集。

(15)this.request.protocol:返回HTTP请求的协议，https或者http。

(16)this.request.secure:返回一个布尔值，表示当前协议是否为https。

(17)this.request.is(types…):返回指定的类型字符串，表示HTTP请求的Content-Type属性是否为指定类型。

(18)this.request.accepts(types):检查HTTP请求的Accept属性是否可接受，如果可接受，则返回指定的媒体类型，否则返回false。

(19)this.request.acceptsEncodings(encodings):该方法根据HTTP请求的Accept-Encoding字段，返回最佳匹配，如果没有合适的匹配，则返回false。

(20)this.request.acceptsCharsets(charsets):该方法根据HTTP请求的Accept-Charset字段，返回最佳匹配，如果没有合适的匹配，则返回false。

(21)this.request.acceptsLanguages(langs):该方法根据HTTP请求的Accept-Language字段，返回最佳匹配，如果没有合适的匹配，则返回false。

(22)this.request.socket:返回HTTP请求的socket。

(23)this.request.get(field):返回HTTP请求指定的字段。

response对象的属性：

(1)this.response.header：返回HTTP回应的头信息。

(2)this.response.socket：返回HTTP回应的socket。

(3)this.response.status:返回HTTP回应的状态码。默认情况下，该属性没有值。该属性可读写，设置时等于一个整数。

(4)this.response.message：返回HTTP回应的状态信息。该属性与`this.response.message`是配对的。该属性可读写。

(5)this.response.length:返回HTTP回应的Content-Length字段。该属性可读写，如果没有设置它的值，koa会自动从this.request.body推断。

(6)this.response.body: 返回HTTP回应的信息体。该属性可读写，它的值可能有以下几种类型。

 字符串：Content-Type字段默认为text/html或text/plain，字符集默认为utf-8，Content-Length字段同时设定。
二进制Buffer：Content-Type字段默认为application/octet-stream，Content-Length字段同时设定。
Stream：Content-Type字段默认为application/octet-stream。
JSON对象：Content-Type字段默认为application/json。
null（表示没有信息体）

(7)this.response.get(field):返回HTTP回应的指定字段。

(8)this.response.set():设置HTTP回应的指定字段。

(9)this.response.remove(field):移除HTTP回应的指定字段。

(10)this.response.is(types…):该方法类似于`this.request.is()`，用于检查HTTP回应的类型是否为支持的类型。

它可以在中间件中起到处理不同格式内容的作用。

(11)this.response.redirect(url, [alt]):该方法执行302跳转到指定网址。如果redirect方法的第一个参数是back，将重定向到HTTP请求的Referrer字段指定的网址，如果没有该字段，则重定向到第二个参数或“/”网址。

(12)this.response.attachment([filename]):该方法将HTTP回应的Content-Disposition字段，设为“attachment”，提示浏览器下载指定文件。

(13)this.response.headerSent：该方法返回一个布尔值，检查是否HTTP回应已经发出。

(14)this.response.lastModified：该属性以Date对象的形式，返回HTTP回应的Last-Modified字段（如果该字段存在）。该属性可写。

(15)this.response.etag:该属性设置HTTP回应的ETag字段。

(16)this.response.vary(field):该方法将参数添加到HTTP回应的Vary字段。

### 中间件

Koa的中间件很像Express的中间件，也是对HTTP请求进行处理的函数，但是必须是一个Generator函数。而且，Koa的中间件是一个级联式（Cascading）的结构，也就是说，属于是层层调用，第一个中间件调用第二个中间件，第二个调用第三个，以此类推。上游的中间件必须等到下游的中间件返回结果，才会继续执行，这点很像递归。

中间件通过当前应用的use方法注册。

`app.use`方法的参数就是中间件，它是一个Generator函数，最大的特征就是function命令与参数之间，必须有一个星号。Generator函数的参数next，表示下一个中间件。





### 洋葱模型

实例

```javascript
//打印时间戳
module.exports = function() {
    return async function(ctx, next) {
        console.log("next前，打印时间戳:", new Date().getTime())
        await next()
        console.log("next后，打印时间戳:", new Date().getTime())
    }
}

//打印路由
module.exports = function() {
    return async function(ctx, next) {
        console.log("next前，打印url:", ctx.url)
        await next()
        console.log("next后，打印url:", ctx.url)
    }
}

//使用中间件
const Koa = require('koa')
const app = new Koa()

const logTime = require('./middleware/logTime')
const logUrl = require('./middleware/logUrl')

// logTime
app.use(logTime())

// logUrl
app.use(logUrl())

// response
app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000)
```

#### 源码koa-compose

koa中比较重要的点：

1. context的保存和传递
2. 中间件的管理和next的实现

1.app.listen使用了this.callback()来生成node的httpServer的回调函数。

```javascript
listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args);
}
```

中间件引擎

```javascript
callback() {
    const fn = compose(this.middleware); // 核心：中间件的管理和next的实现
    
    if (!this.listeners('error').length) this.on('error', this.onerror);
    
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res); // 创建ctx
      return this.handleRequest(ctx, fn);
    };
    
    return handleRequest;
}
```

使用compose函数处理中间件。compose中有`dispatch`函数，它将遍历整个`middleware`，然后将`context`和`dispatch(i + 1)`传给`middleware`中的方法。

```javascript
function compose (middleware) {
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```



### 路由

使用koa-router处理URL

安装

```shell
npm i koa-router --save 
```

实例

```javascript
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router')

//写法1，一个路由对象
const router = new Router();

router.get('/',async (ctx,next)=>{
  ctx.body = 'index页'
})

router.get('/',async (ctx,next)=>{
  ctx.body = 'index页'
})

app.use(router.routes())
app.listen(3333,()=>{
  console.log("server is running")
})
//写法2，建立不同路由对象然后一起装载,嵌套路由
let oneRouter = new Router();
let twoRouter = new Router();

oneRouter.get('/',async(ctx,next)=>{
   ctx.body = "onerouter 页"
})

twoRouter.get('/',async(ctx,next)=>{
   ctx.body = 'tworouter页'
}).get('/home',async(ctx,next)=>{
   ctx.body = 'home页'
})

let indexRouter = new Router();
indexRouter.use('/one',oneRouter.routes(),oneRouter.allowedMethods())
indexRouter.use('/two',twoRouter.routes(),twoRouter.allowedMethods())

app
  .use(indexRouter.routes())
  .use(indexRouter.allowedMethods())

app.listen(3333,()=>{
   console.log('server')
})
```

### 处理请求

使用koa-router处理请求，如get、post

post请求使用koa-bodyparser处理body中的数据

```shell
npm i koa-bodyparser --save
```



```javascript
const Koa = require('koa');
const app = new Koa()
const Router.= require ('koa-router')
const router = new Router()

//get请求
router.get('/data',async(ctx,next)=>{
  let url = ctx.url;
  
  let data = ctx.request.query;//查询的的对象
  let dataQuery = ctx.request.querystring; // 查询的字符串
})

//restful风格api，get请求
router.get('data/:id',async(ctx,next)=>{
   let data = ctx.params;
})

//post请求
router.post('/post/result',async (ctx,next)=>{
    let {name,num} = ctx.request.body
    
    if(name && num ){
     ctx.body = "${name} ${num}"
    }
})
```

### cookie、session操作koa-session

koa可以直接操作cookie

```javascript
router.post('/post/result',async(ctx,next)=>{
		let {name,num} = ctx.request.body
    
    if(name && num ){
      ctx.body = "${name} ${num}"
      ctx.cookies.set(
        'xunleiCode',num,
        {
          domain:'localhost',  //写cookie所在的域名
          path:'/post/result',  //写cookie所在的路径
          maxAge: 10 * 60 * 1000; //cookie有效时长
          expires: new Date('2018-09-17'); //cookie失效时间
          httpOnly:false, //是否只用于http请求中获取
          overwrite： false， //是否允许重写
        }
      )
    }
})
```

安装koa-session

```javascript
npm i koa-session
```

实例

```javascript
const session = require('koa-session')

app.keys = ['some secret hurr'];
const CONFIG = {
  key:"koa:sess",  //默认cookie为koa：sess
  maxAge: 86400000,// 过期时间，默认为1天
  overwrite: true, // 是否可以重写
  httpOnly: true,  //cookie是否只有服务端可以访问
  signed:true,     //签名默认为true
  rolling:false,   //在每次请求时重新设置cookie，重置cookie过期时间
  renew:false,     //刷新session当session接近失效
}
app.use(session(CONFIG,app));
```



### CSRF攻击koa-csrf

CSRF攻击是指用户的session被劫持，用来冒充用户的攻击。

koa-csrf插件用来防止CSRF攻击。原理是在session之中写入一个秘密的token，用户每次使用POST方法提交数据的时候，必须含有这个token，否则就会抛出错误。

```javascript
var koa = require('koa');
var session = require('koa-session');
var csrf = require('koa-csrf');
var route = require('koa-route');

var app = module.exports = koa();

app.keys = ['session key', 'csrf example'];
app.use(session(app));

app.use(csrf());

app.use(route.get('/token', token));
app.use(route.post('/post', post));

function* token () {
  this.body = this.csrf;
}

function* post() {
  this.body = {ok: true};
}

app.listen(3000);
```

POST请求含有token，可以是以下几种方式之一，koa-csrf插件就能获得token。

- 表单的_csrf字段
- 查询字符串的_csrf字段
- HTTP请求头信息的x-csrf-token字段
- HTTP请求头信息的x-xsrf-token字段

### 数据压缩koa-compress

koa-compress模块可以实现数据压缩。

```javascript
app.use(require('koa-compress')())
app.use(function* () {
  this.type = 'text/plain'
  this.body = fs.createReadStream('filename.txt')
})
```

### koa-connect

安装

```shell
npm install koa-connect
```

使用

```javascript
import k2c from 'koa2-connect'
import httpProxy from 'http-proxy-middleware'

async function proxyHandler(ctx:Context,next:any){
  const nebulaProxy = k2c(
    httpProxy({
      target: 'http://localhost:8000',
      pathRewrite:{
        '/api-nebula':'/api'
      }
      changeOrigin: True,
    }) 
  )
}
```



### 源码

koa2有四个核心文件：application.js、context.js、request.js、response.js。

application.js：application.js是koa的入口文件，它向外导出了创建class实例的构造函数，它继承了events，这样就会赋予框架事件监听和事件触发的能力。application还暴露了一些常用的api，比如toJSON、listen、use等等。

Context.js：这部分就是koa的应用上下文ctx,其实就一个简单的对象暴露，里面的重点在delegate，这个就是代理，这个就是为了开发者方便而设计的，比如我们要访问ctx.repsponse.status但是我们通过delegate，可以直接访问ctx.status访问到它。

Request.js、Response.js ： 这两部分就是对原生的res、req的一些操作了，大量使用es6的get和set的一些语法，去取headers或者设置headers、还有设置body等等

基于此，如果要实现koa框架需要四个模块：

- 封装node http server、创建Koa类构造函数
- 构造request、response、context对象
- 中间件机制和剥洋葱模型的实现
- 错误捕获和错误处理





https://github.com/airuikun/blog/issues/2

## eggjs

web应用离不开session、视图模版、路由、文件上传、日志管理，这些koa都不提供，需要自行去官方的中间件网站去找，100个人可能有100种搭配

而eggjs是基于koajs，解决了上述问题，将社区最佳实践整合进koajs，并且将多进程启动、开发时的热更新等问题一并解决，对开发者很友好，开箱即是最佳/较佳配置

### 目录结构

`app/router.js`:用于配置URL路由规则

`app/controller/**`:用于解析用户的输入，处理返回相应的结果

`app/service/**`:用于编写业务逻辑层，可选

`app/middleware/**`:用于编写中间件，

`app/public/**`:用于放置静态资源

`app/extend/**`:用于框架的扩展

`config/config.{env}.js`:用于编写配置文件

`config/plugin.js`:用于配置需要加载的文件

`test/**`:用于单元测试

`app.js`和`agent.js`:用于自定义的初始化工作

### 内置对象

eggjs继承了koa的application、context、request、response对象，并且扩展了一些新的全局对象，controller、service、logger、config、helper

每个controller下面都有以下属性：

ctx：当前请求的context实例

app：应用的application实例

config：应用的配置

service：应用所有的service

logger：为当前controller封装的logger对象

推荐从egg对象上获取controller基类，也可以从app实例上获取

```javascript
//从egg上获取
const Controller = require('egg').Controller
class USerController extends Controller {

}
module.exports = UserController;
//从app上获取
module.exports = app => {
  return class UserController extends app.controller{
    
  };
}
```

Service基类与controller基类基本相同，获取方式也相同



### 路由Router

Router的请求用来描述URL与具体承担执行动作的controller的关系，框架约定了`app/router.js`文件用于统一所有路由规则

路由定义时需指定：

1.请求方法/请求动作，包括head、options、get、post、delete、put、patch、redirect等

2.路由名称，给路由设定一个别名

3.中间件，在router里可以配置多个中间件，**串联执行**

4.控制器，指定路由映射到具体到控制器上

特别地，Restful风格的CRUD的路由配置如下

```javascript
module.exports = app =>{
   const { router,controller} = app;
   router.resources('posts','/api/posts',controller.posts);
   router.resources('users','/api/v1/users',controller.v1.users)
}
```





### 控制器controller

控制器与路由对应，实现控制器的服务

```javascript
//router.js
module.exports = app =>{
  const {router,controller} = app;
  router.get('/user/:id',controller.user.info);
}
//controller,user.js
class UserController extends Controller {
  async info(){
    const { ctx } = this;
    ctx.body = {
      name:`hello ${ctx.params.id}`,
    }
  }
}
```



### 服务(service)

service是复杂场景下用于做业务逻辑封装的一个抽象层，有利于：

1.保持controller的逻辑更加简洁

2.保持业务逻辑的独立性，抽象出来的service可以被多个controller重复调用

3.将逻辑与展现分离，更容易编写测试用例

使用场景：

复杂数据的处理，如需要查数据库、按一定规则计算或者计算完成之后更新到数据库

调用第三方的服务时

定义service

```javascript
//app/service/user.js
const Service = require('egg').Service

Class UserService extends Service{
   async find(uid){
     const user = await this.ctx.db.query('select * from user where uid = ?',uid);
     return user;
   }
}

module.exports = UserService
```

在controller中调用对应的service

```javascript
const Controller = require('egg').Controller;
class UserController extends Controller {
  async info(){
    const { ctx } = this;
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId)
  }
}
module.exports = UserController;
```

### 中间件

我们约定中间件是一个放置在`app/middleware`目录下的单独文件，它接受两个参数，

Options:中间件的配置，框架会将config传递进来

app:当前应用application的实例

中间件实例

```javascript
//app/middleware/gzip.js
const isJSON = require('koa-js-json');
const zli = require('zlib')

module.exports = options =>{
  return async function gzip(ctx,next){
    await next();
    
    let body = ctx.body;
    if(!body) return;
    
    const stream = zlib.createGzip();
    ctx.body = stream;
    ctx.set('Content-Encoding','gzip')
  }
}
```

在单个router中或者全局实例化和挂载

```javascript
//单个路由加载
module.exports = app =>{
  const gzip = app.middleware.gzip({ threshold:1024 });
  app.router.get('/needgzip',gzip,app.controller.handler);
}
```

全局加载

```javascript
//config.default.js
module.exports = {
  middleware:[gzip],
  gzip:{
    threshold:1024,
  }
}
```

### 插件

koa的中间件系统有其固有的缺点：

1.中间件的顺序不可固定，使用先后顺序的不同，结果可能有天壤之别

2.有些功能是与请求无关的，如定时任务、消息订阅，中间件处理起来麻烦

3.初始化逻辑复杂，需要在应用启动的时候完成

一个插件就像一个mini的应用，有service，中间件，配置等，没有路由和controller，没有plugin

插件一般提供npm的方式安装

```shell
npm i egg-mysql --save
```

在package.json中引入依赖

```json
{
  "dependencies":{
    "egg-mysql":"^3.0.0"
  }
}
```

在plugin.js中声明

```javascript
exports.mysql = {
  enable:true;
  package:'egg-dev',
}
```

### 定时任务

有一些任务是需要定时运行的，比如

1.定时上报任务状态

2.定时从远程接口更新本地缓存

3.定时进行文件切割、文件删除等

所有的定时任务放在`app/schedule`目录下，每一个文件都是独立的定时任务，可以配置定时任务的属性和要执行的方法

比如，定义一个更新远程数据到内存缓存的定时任务

```javascript
//app/schedule/update_cache.js
const Subscription = require('egg').Subscription

class UpdayeCache extends Subscription {
  static get schedule(){
    return {
      interval:'1m',
      type:'all',
    };
  }
  
  async subscribe(){
    const res = await this.ctx.curl('http://www.api.com/cache',{
      dataType: 'json'
    });
    this.ctx.app.cache = res.data;
  }
}

module.exports = UpdateCache;
```



## midwayjs


