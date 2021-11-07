---
title: NodeJs开发（二）
date: 2021-01-20 21:40:33
categories: IT
tags: IT，Web,Node
toc: true
thumbnail: http://cdn.kunkunzhang.top/nodejs.png
---

Javascript第八篇，NodeJs第二篇，注重Node后端开发。

<!--more-->

## Node运行原理

### 运行原理

Node.js 被分为了四层，分别是 `应用层`、`V8引擎层`、`Node API层` 和 `LIBUV层`。

应用层： 即 JavaScript 交互层，常见的就是 Node.js 的模块，比如 http，fs

V8引擎层： 即利用 V8 引擎来解析JavaScript 语法，进而和下层 API 交互

NodeAPI层： 为上层模块提供系统调用，一般是由 C 语言来实现，和操作系统进行交互 。

LIBUV层： 是跨平台的底层封装，实现了 事件循环、文件操作等，是 Node.js 实现异步的核心

### 事件循环

node事件循环与浏览器循环是不同的

当Node.js启动时会初始化`event loop`, 每一个`event loop`都会包含按如下顺序六个循环阶段：

1.**`timers` 阶段**: 这个阶段执行 `setTimeout(callback)` 和 `setInterval(callback)` 预定的 callback, timer指定一个下限时间而不是准确时间，在达到这个下限时间后执行回调。在指定时间过后，timers会尽可能早地执行回调，但系统调度或者其它回调的执行可能会延迟它们。

2.**`I/O callbacks` 阶段**: 此阶段执行某些系统操作的回调，例如TCP错误的类型。 例如，如果TCP套接字在尝试连接时收到 ECONNREFUSED，则某些* nix系统希望等待报告错误。 这将操作将等待在==I/O回调阶段==执行;

3.**`idle, prepare` 阶段**: 仅node内部使用;

4.**`poll` 阶段**: 

获取新的I/O事件, 例如操作读取文件等等，适当的条件下node将阻塞在这里;

如果 poll 队列不空，event loop会遍历队列并同步执行回调，直到队列清空或执行的回调数到达系统上限；

如果 poll 队列为空，则发生以下两件事之一：

如果代码已经被setImmediate()设定了回调, event loop将结束 poll 阶段进入 check 阶段来执行 check 队列（里面的回调 callback）。

如果代码没有被setImmediate()设定回调，event loop将阻塞在该阶段等待回调被加入 poll 队列，并立即执行。setImmediate() 实际上是一个特殊的timer，跑在event loop中一个独立的阶段。它使用`libuv`的API 来设定在 poll 阶段结束后立即执行回调。

5.**`check` 阶段**: 执行 `setImmediate()` 设定的callbacks，check阶段在poll阶段之后;

6.**`close callbacks` 阶段**: 比如 `socket.on(‘close’, callback)` 的callback会在这个阶段执行;如果一个 socket 或 handle 被突然关掉，close事件将在这个阶段被触发，否则将通过process.nextTick()触发

日常开发的绝大部分异步任务都在timers、poll、check这3个阶段处理的

### Node事件循环与浏览器事件循环的区别

在浏览器环境中，microtask任务队列是每个macrotask执行完之后执行，而在Nodejs中microtask在事件循环的各个阶段之间执行



### setimmediate与settimeout

两者非常相似，区别在于调用时机不同：

setimmediate设计在poll阶段完成时执行，即check阶段；

setTimeout设计在poll阶段为空闲时，且设定事件达到后执行，但它在timer阶段执行

但当二者在异步i/o callback内部调用时，总是先执行setimmediate，再执行setTimeout

```javascript
setTimeout(function(){
  console.log('timeout')
},0);

setImmediate(function() {
  console.log('immediate')
})
//setTimeout可能先执行也可能后执行
const fs = require('fs')

fs.readFile(_filename,()=>{
  setTimeout(function(){
    console.log('timeout')
  },0);

	setImmediate(function() {
    console.log('immediate')
  })
})
//setImmediate总是先于setTimeout
```

### process.nextTick

这个函数是独立于Event Loop之外的，有自己的队列，当每个阶段完成时，如果存在nextTick队列就清空队列中的所有回调函数，并且优先于其他microtask执行



## 常用方法

### sleep函数

阻塞主线程，

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

await sleep(5000);
```





## 功能模块

### commander.js

前端开发node cli 必备技能。

安装

```shell
npm install commander
```

api

```javascript
var program = require('commander');
 
program
    .name("intl helper");
    .version('0.0.1')
    .parse(process.argv);
    
//执行结果：
node index.js -V
 
0.0.1
//如果希望程序响应-v选项而不是-V选项，
//只需使用与option方法相同的语法将自定义标志传递给version方法
program
  .version('0.0.1', '-v, --version')
```

commander.js中命令行有两种可变性，一个叫做`option`，意为选项。一个叫做`command`，意为命令。

常用api

`version`

用法： `.version('x.y.z')`

用于设置命令程序的版本号，

`option`

用户：`.option('-n, --name <name>', 'your name', 'GK')`

- 第一个参数是选项定义，分为短定义和长定义。用|，,， 连接。
  - 参数可以用`<>`或者`[]`修饰，前者意为必须参数，后者意为可选参数。
- 第二个参数为选项描述
- 第三个参数为选项参数默认值，可选。

`command`

用法：`.command('init <path>', 'description')`

- `command`的用法稍微复杂，原则上他可以接受三个参数，第一个为命令定义，第二个命令描述，第三个为命令辅助修饰对象。
- 第一个参数中可以使用`<>`或者`[]`修饰命令参数
- 第二个参数可选。
  - 当没有第二个参数时，commander.js将返回`Command`对象，若有第二个参数，将返回原型对象。
  - 当带有第二个参数，并且没有显示调用`action(fn)`时，则将会使用子命令模式。
  - 所谓子命令模式即，`./pm`，`./pm-install`，`./pm-search`等。这些子命令跟主命令在不同的文件中。
- 第三个参数一般不用，它可以设置是否显示的使用子命令模式。

`description`

用法：`.description('command description')`

用于设置命令的描述

用法：`.action(fn)`

用于设置命令执行的相关回调。`fn`可以接受命令的参数为函数形参，顺序与`command()`中定义的顺序一致。

`parse`

用法：`program.parse(process.argv)`

此api一般是最后调用，用于解析`process.argv`。

`outputHelp`

用法：`program.outputHelp()`

一般用于未录入参数时自动打印帮助信息。

### inquire

`Inquirer.js`可以理解成就是给输入命令行的用户提供一个好看的界面，提供一下功能：

- 有错误反馈；
- 向用户提问；
- 解析输入；
- 校验回答；
- 能在用户输入的时候提供友好的提示。

安装

```shell
yarn add inquirer --save-dev
```

Inquirer 提供`prompt`对象，该对象中提供配置项，`then`会在用户回答完所有问题后执行，`catch`则是报出异常：

prompt是一个对象数组，对象主要包含以下几种配置：

type： 类型，主要类型有input、number、confirm、list、rawlist、expand、checkbox、password、editor；

name：可以理解成当前回答的变量名；

message：问题描述；

default：问题的默认值；

choice：问题选项；

validate：回答的校验器；

filter：回答的过滤器；

transformer：接收用户输入，回答散列和选项标志，并返回一个转换后的值显示给用户。

when：是否应该问这个问题

PageSize：控制选项显示的个数，就是是否当前最多显示多少个选项，如果超过则需要向下才能显示更多；

prefix：更改默认的前缀消息。

suffix：更改默认后缀消息。

askAnswered：如果答案已经存在，就必须提出问题。

loop：是否启用列表循环。

```javascript
var inquirer = require('inquirer');
inquirer.prompt([
  {
    type: 'list',
    name: 'preset',
    message: 'Please pick a preset:',
    choices: ['default(babel, eslint)', 'Manually select feature'],
    filter: function(val){
      return val.toLowerCase();
    }
  },
  {
    type: 'input',
    name: 'key',
    message: "input the text key:",
  },
  {
  type: 'checkbox',
  name: 'features',
  message: 'Checkout the feature needed for you project:',
  choices: [{
    name: 'Babel',
  }, {
    name: 'TypeScript',
  },{
    name: 'Progressive Web App (PWA) Support',
  }, {
    name: 'Router',
  },{
    name: 'Vuex',
  }, {
    name: 'CSS Pre-processors',
  }, {
    name: 'Linter / Formatter',
  }, {
    name: 'Unit Testing',
  }, {
    name: 'E2E Testing',
  }],
  pageSize: 9,
  validate: function(answer){
    if(answer.length < 1){
      return 'You must choose at least one topping.';
    }

    return true;
  }
}]).then(answers => {
  console.log(JSON.stringify(answers, null, '  '));
}).catch(error => {
  console.log(error);
})
```

### chalk

`chalk` 包的作用是修改控制台中字符串的样式，包括：

1. 字体样式(加粗、隐藏等)
2. 字体颜色
3. 背景颜色

使用

```javascript
const chalk = require('chalk');
console.log(chalk.red.bold.bgWhite('Hello World'));
```



### process

[progress ](https://www.npmjs.com/package/progress)是现在最常用的 `npm` 包用来渲染进度条。

```shell
npm install --save progress
```

使用

```javascript
var ProgressBar = require('progress');

var bar = new ProgressBar(':bar', { total: 10 });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    console.log('\ncomplete\n');
    clearInterval(timer);
  }
}, 100);
```



### http-proxy-middleware包

http-proxy-middleware用于把请求转发到其他服务器的中间件

安装

```shell
npm install --save-dev http-proxy-middleware
```

使用

```javascript
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware';

app.use(
	'/api-metrics/*',
  createProxyMiddleware({
    target: '192.168.8.8:9090',
    pathRewrite: {
			'api-metrics': '/api/v1',
    },
    changeOrigin: true,
  })
)
```



### history fallback包



```javascript
import history from 'connect-history-api-fallback'
import express from 'express'

const app = express()

app.use(history())
```





### 文件包

安装

```shell
npm install fs-extra
```

文件包可以替代原生的node fs模块，实现更强大的文件处理功能。

导入

```javascript
const fs = require('fs-extra')
```

异步拷贝文件

```javascript
// Async with promises:
fs.copy('/tmp/myfile', '/tmp/mynewfile')
  .then(() => console.log('success!'))
  .catch(err => console.error(err))

// Sync:
try {
  fs.copySync('/tmp/myfile', '/tmp/mynewfile')
  console.log('success!')
} catch (err) {
  console.error(err)
}
```





### node-rsa

在node中使用rsa算法

安装

```shell
npm install node-rsa
```

使用

```javascript
const NodeRSA = require("node-rsa")

const key = new NodeRSA({ b:2048 }) //2048 密钥长度
ket.setOptions({ encryptionSchema: 'pkcs1' }); //指定加密格式，不改格式的话可能会报错


```



### pino

安装

```shell
npm install pino
```

使用

```javascript
const logger = require('pino')()

logger.info('hello world')

const child = logger.child({ a: 'property' })
child.info('hello child!')
```





### 转码包

node默认支持utf8、base64、binary，如果要请求或处理GBK或者Gb2312页面或文件就需要转码

安装iconv-lite

```shell
npm install iconv-lite --save 
```

引入

```javascript
const iconv = require('iconv-lite')
```

在原来的输出语句中加入解码函数就可以

```javascript
console.log('stdout'+iconv.decode(data,'GBK'))
```



### Graphql

安装依赖

```js
npm install apollo-server@2.13.1 graphql@14.6.0  type-graphql@0.17.6
```

引入

```js
import "reflect-metadata"
import {buildSchema,ObjectType,Field,ID,Resolver,Query} from "type-graphql";
import {ApolloServer} from "apollo-server";
```

后端定义schema和resolver

```js
@ObjectType()
class Post{
    @Field(type => ID)
    id: string;

    @Field()
    created: Data;

    @Field()
    content: String;
}

@Resolver(Post)
class PostResolver {
    @Query(returns => [Post])
    async posts(): Promise<Post[]>{
        return [
           {
              id:"0",
              created: new Date(),
              content:'aaa'
            },
            {
              id:"1",
              created: new Date(),
              content:'bbb'
            },
            {
              id:"2",
              created: new Date(),
              content:'ccc'
            },
        ]
    }
}
```

运行项目，在localhost:4444打开graphql的playground进行测试

### 剪贴板的使用

使用第三方包，安装

```js
npm install clipboard-polyfill
```

引用

```js
import clipboard from "clipboard-polyfill"
```

实例

```js
clipboard.writeText("this");
clipboard.readText().then(console.log,console.error);
```

### 终端二维码

qrcode-terminal

安装

```shell
npm install -D qrcode-terminal
```

使用

```javascript
const qrcode = require('qrcode-terminal')

const url = 'https:www.baidu.com'

qrcode.generate(url,{small:true},(qrcode)=> {
  console.log(qrcode)
})
```



### 判断设备信息

使用navigator对象

```js
export function checkdevice() {
  var browser = {
    versions: (function() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        //移动终端浏览器版本信息
        trident: u.indexOf("Trident") > -1, //IE内核
        presto: u.indexOf("Presto") > -1, //opera内核
        webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
        gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
        iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf("iPad") > -1, //是否iPad
        webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
      };
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  };

  if (browser.versions.mobile) {
    //判断是否是移动设备打开。browser代码在下面
    // 此时为移动端打开.跳转到移动站
    // if(window.location.href.indexOf("ooo0o.com/mobile") != -1){
    //     return;
    // }else {
    //     window.location.href = "https://www.ooo0o.com/mobile"
    // }

    var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      //在微信中打开
      if (browser.versions.ios) {
        return "weixinios";
      } else {
        return "weixin";
      }
    } else if (browser.versions.android) {
      //是否在安卓浏览器打开

      // alert('安卓手机中打开的');
      /*window.location.href="https://jushizhibo.com/android/app-release.apk";*/
      // window.open('https://jushizhibo.com/android/app-release.apk','_self')
      return "anzhuo";
    } else if (browser.versions.ios) {
      //是否在IOS浏览器打开
      // alert('IOS中打开的');
      /*window.location.href="https://www.baidu.com";*/
      // window.open('transparentfactory://xiangqingye','_self')
      return "ios";
    }
  } else {
    //此时是非移动端,则跳转PC站
    // alert('PC中打开的');
    // if(window.location.href.indexOf("ooo0o.com/mobile") != -1){
    //     window.location.href = "https://www.ooo0o.com"
    // }
    return "pc";
  }
}
```

使用时导入

```js
import {checkdevice}  from 'checkdevice.js'
```

### 七牛云的使用

安装七牛包

```node
npm install qiniu
```

新建文件，设置七牛云参数

```js
var bucket='',
var imageUrl='',
var accessKey = '',
var secretKey = '',
var mac = new qiniu.auth.digest.Mac(accessKey,secretKey);

var option={
    scope:bucket,
}
var putPolicy= new qiniu.rs.PutPolicy(option)
var uploadToken = putPolicy.uploadToken(mac);
```

上传代码

```js
var config = new qiniu.conf.Config()

config.zone= qiniu.zone.Zone_z0;//选择七牛云的机房
//是否使用https、是否使用cdn加速
config.usehttpsDomain=true;
config.useCdnDomain = true;

var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
var key = '';

formUploader.putFile(uploadToken,key,path.resolve(pathName),putExtra,function(respErr,respBody,respInfo){
       if(resqErr){
         throw respErr;
       }
       if(respInfo.statusCode == 200){
       console.log(respBody);
       }else{
           console.log(respInfo.statusCode);
           console.log(respBody)
       }                                                   });

```

https://segmentfault.com/a/1190000017064729

### 发邮件

导入模块Nodemailer

```node
npm install nodemailer
```

使用方法(包官网https://nodemailer.com/)

```js
//引入包
const nodemailer = require("nodemailer");

//创建邮件请求对象（qq邮箱、163邮箱或其他）
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",//邮箱服务器
    port: 587,（端口号）
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // 账号
      pass: testAccount.pass // 你的邮箱服务器请求密码
    }
  });
  //所发送的邮件信息
  let mailobj={
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  }
  //发送邮件
  transporter.sendMail(mailobj);


```

### MD5加密包

Js-md5



### http爬虫



### node应用打包可执行文件

pkg可以将node项目打包为一个单独的可执行文件，在未安装nodejs的机器上运行。支持win、linux等多系统

```shell
npm install pkg --save-dev
```





### Node应用部署Docker 

Docker允许你以应用程序所有的依赖打包成一个标准化的单元，这被称为一个容器，对于应用开发而言，一个容器就是一个蜕化到最基础的linux操作系统，一个镜像是你加载到容器中的软件

在node app应用的目录下新建一个Dockerfile，编辑这个文件

```dockerfile
#从Docker站点获取相关镜像
From node:12
#在镜像中创建一个文件夹存放应用程序代码，这将是应用程序工作的目录
WORKDIR /usr/src/app
#安装应用程序的所有依赖
COPY package*.json ./

RUN npm install 
#在Docker镜像中使用COPY命令绑定你的应用程序
COPY . .
#定义映射端口，如应用程序的端口为8080，则与docker的镜像做映射
EXPOSE 8080
#最后要定义运行时的CMD命令来运行应用程序，这里使用node serverjs启动服务器
CMD ["node","server.js"]
```

在dockerfile的同一个文件夹下创建.dockerignore文件，带有以下内容

```dockerfile
node_modules
npm-debug.log
```

这将避免本地模块和调试日志被拷贝进入你的Docker镜像中，不会把镜像中安装的模块覆盖

准备好之后就可以使用命令行构建和运行镜像

进入dockerfile所在的目录，运行命令构建镜像

```shell
docker build -t <username>/node-web-app
```

构建之后就可以显示或者运行镜像

```dockerfile
docker images
```

使用-d模式以分离模式运行docker容器，使得容器在后台自助运行

开关符-p在容器中把一个公共端口导向到私有的端口

```shell
docker run -p 49160:8080 -d <username>/node-web-app
```

## Node常见问题汇总



### npm ERR! Maximum call stack size exceeded

解决方法：全局更新npm

```node
npm install npm -g
```

### core-js

warning react-native > create-react-class > fbjs > core-js@1.2.7: core-js@<2.6.8 is no longer maintained. Please, upgrade to core-js@3 or at least to actual version of core-js@2

旧包不在维护，安装新包，自动卸载旧版本

```node
npm install --save core-js@^3
```

注意：警告可能是由于你所安装的新包在使用旧版本的依赖所导致的警告，但是如果不是你自己开发的，你不能更改包的源码和依赖项，所以这种情况忽略警告吧

## 学习资源

node问答：https://github.com/jimuyouyou/node-interview-questions

https://javascript.ruanyifeng.com/

https://markpop.github.io/2014/10/29/NodeJs%E6%95%99%E7%A8%8B/

node包讲解：https://github.com/chyingp/nodejs-learning-guide

