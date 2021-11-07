---
title: NodeJs开发（一）
date: 2021-01-20 21:40:33
categories: IT
tags: IT，Web,Node
toc: true
thumbnail: http://cdn.kunkunzhang.top/nodejs.png
---

Javascript第六篇，NodeJs第一篇，注重Node后端开发。

<!--more-->

## 初始化Node文件夹

初始化文件夹

```node
npm init -y
```

初始化文件夹后生成pacakge.json文件

*nodemon*用来监视node.js应用程序中的任何更改并自动重启服务,非常适合用在开发环境中。

安装nodemon

```node
npm i -g nodemon
npm run serve  //运行服务器
```

package.json中dependency是全局使用的依赖

 dev_dependcy只在开发时用的依赖，打包后不会上传，使用npm install -D 安装



## http创建服务器与客户端

创建服务器

```javascript
var http = require('http');

http.createServer(function (request, response) {
    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```

创建客户端

```javascript
var http = require('http');
 
// 用于请求的选项
var options = {
   host: 'localhost',
   port: '8080',
   path: '/index.html'  
};
 
// 处理响应的回调函数
var callback = function(response){
   // 不断更新数据
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      // 数据接收完成
      console.log(body);
   });
}
// 向服务端发送请求
var req = http.request(options, callback);
req.end();
```

服务端处理get、post请求

```javascript

```

服务端安全退出：

api: Server.close()



## Fs读取文件夹、文件

Node由fs模块提供读写文件服务。基本上是POSIX文件操作命令的简单包装

基本上所有的与文件相关的操作都与fs核心模块有关

导入fs模块

```javascript
var fs = require('fs')
```

fs模块常用的方法：读文件、写文件、追加写入文件、文件拷贝、创建目录

读写文件

```javascript
//读、写文件
var readme = fs.readFileSync("readme.txt","utf8");//同步读文件

var readme = fs.readFile("readme.txt","utf8",function(err,data){
    if(!err){
      console.log(data);
    }
});

fs.writeFileSync("writeme.txt","readme")
fs.writeFile('writeme.txt',data,function(){

})
```

追加写入文件

```javascript

```

拷贝文件、删除文件

```javascript

fs.copyFileSync("3.txt","4.txt")  //同步拷贝
//异步拷贝，带回调函数
fs.copyFile("3.txt","4.txt",()=>{
  console.log(2)
})

//删除文件
fs.unlink('input.txt', function(err) {
   if (err) {
       return console.error(err);
   }
});
```

创建目录

```javascript
//创建、读取、移除目录
fs.mkdir('',function(){

})
fs.readdir('',function(){

})
fs.rmdir('')
```

识别文件、目录类型

```javascript
//识别文件、目录类型
fs.stat('',function(){
stats.isFile()
stats.isDirectory()
})
```

### Stream

stream（流）是一种抽象的数据结构。流可以把文件资源拆分成小块，一块一块的运输，资源就像水流一样进行传输，减轻服务器压力。

stream可以分为四类：

可读 Readable，有两个状态：paused、flowing。

可写 Writable，两个重要事件：drain、finish。

可读可写（双向）Duplex

可读可写（变化）Transform

可读流有两个状态 paused 和 flowing。

可读流默认处于 paused 态，一旦添加 data 事件监听，它就变为 flowing 态。删掉 data 事件监听，paused 态。

```js
// 默认处于 paused 态
const stream = fs.createReadStream('./big_file.txt')
stream.pipe(response)
stream.pause(); // 暂停
setTimeout(() => {
  // 恢复
  stream.resume()
}, 3000)
```

用管道pipe连接两个不同的流，管道可以分为两个事件，监听data，stream1一有数据就传给stream2，监听 end 事件，当 stream1 停了，就停掉 stream2

```js
stream1.on('data', (chunk) => {
	stream2.write(chunk)
})

stream1.on('end', () => {
	stream2.end()
})
```

https://juejin.im/post/5f1c508ff265da22ff546dca#heading-25

### Buffer

JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。

但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

stream转buffer

```javascript
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    let buffers = []
    stream.on('error', reject);
    stream.on('data',(data)=> buffers.push(data));
    stream.on('end', () => resolve(Buffer.concat(buffers)))
  })
}
```

buffer转stream

```javascript
let Duplex = require('stream').Duplex;

function bufferToStream(buffer) {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream
}
```



https://juejin.im/post/6845166891401478158

## OS操作

```javascript
os.tmpdir()//返回操作系统的默认临时文件夹
os.hostname()//返回操作系统的主机名
os.release()//返回操作系统的发行版本,字符串
os.type()//返回操作系统名，
os.uptime()//返回上次重新启动之后操作系统的运行时间，单位为秒
os.totalmem()//返回系统总内存量，单位字节
os.freemem()//返回系统空闲内存量，单位字节
os.arch()//返回操作系统的CPU架构
os.cpus()//返回数组对象，包含每个CPU的信息
os.networkInterfaces()//返回系统上可用的网络接口的详细信息
os.userInfo() //返回包含当前username、uid、gid、shell和homedir的对象
os.platform() //返回Nodejs的编译平台，如darwin、freebsd、linux、openbsd、win32等
```



## 路径操作

```javascript
var path = require("path");

//获取文件夹路径
path.dirname(p)
//获取文件名
path.basename(p[, ext])
//获取文件后缀名
path.extname(p)
//将路径转化为数组
path.parse(filepath)
//绝对路径相对路径转化
path.resolve([from ...], to)//转化为绝对路径
path.relative(from, to)//转化为相对路径
```

## 核心工具函数

util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心 JavaScript 的功能 过于精简的不足。

```javascript
const util = require('util');
```

**util.inherits(constructor, superConstructor)** 是一个实现对象间原型继承的函数。JavaScript 的面向对象特性是基于原型的，与常见的基于类的不同。JavaScript 没有提供对象继承的语言级别特性，而是通过原型复制来实现的。

**util.inspect(object,[showHidden],[depth],[colors])** 是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。

util.isArray(object)判断给定的参数 "object" 是一个数组则返回 true，否则返回 false。

util.isRegExp(object)判断给定的参数 "object" 是一个正则表达式返回true，否则返回false。

util.isDate(object)判断给定的参数 "object" 是一个data对象则返回true，否则返回false。

## Node模块化加载方法

JavaScript 现在有两种模块。一种是 ES6 模块，简称 ESM；另一种是 CommonJS 模块，简称 CJS。

CommonJS 模块是 Node.js 专用的，与 ES6 模块不兼容。它们采用不同的加载方案。从 Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。

Node.js 要求 ES6 模块采用`.mjs`后缀文件名。也就是说，只要脚本文件里面使用`import`或者`export`命令，那么就必须采用`.mjs`后缀名。Node.js 遇到`.mjs`文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定`"use strict"`。

如果不希望将后缀名改成`.mjs`，可以在项目的`package.json`文件中，指定`type`字段为`module`。



ES6 模块与 CommonJS 模块尽量不要混用。`require`命令不能加载`.mjs`文件，会报错，只有`import`命令才可以加载`.mjs`文件。反过来，`.mjs`文件里面也不能使用`require`命令，必须使用`import`。



`package.json`文件有两个字段可以指定模块的入口文件：`main`和`exports`。比较简单的模块，可以只使用`main`字段，指定模块加载的入口文件。



## Node全局变量

node程序内部自带一些变量和函数，可以在node程序全局使用

### 当前目录与当前文件

```node
_filename//输出当前脚本文件的绝对路径
_dirname//输出当前脚本文件的目录
```

### 定时器函数

```node
var t= setTimeout(cb, ms);//设定ms后执行函数cb
clearTimeout(t)
setInterval(cb, ms)//每个ms后执行函数cb
clearTimeout(t)//停止一个之前创建的定时器
```

Node独有的定时器函数：

setImmediate/clearImmediate



### 控制台输出函数

```javascript
console.log
```

### Process

`process`对象是 Node 的一个全局对象，提供当前 Node 进程的信息。它可以在脚本的任意位置使用，不必通过`require`命令加载。该对象部署了`EventEmitter`接口。

基本属性：

- `process.argv`：返回一个数组，成员是当前进程的所有命令行参数。一般第一个参数是node路径，第二个参数是文件路径，第三个参数
- `process.env`：返回一个对象，成员为当前Shell的环境变量，比如`process.env.HOME`。
- `process.installPrefix`：返回一个字符串，表示 Node 安装路径的前缀，比如`/usr/local`。相应地，Node 的执行文件目录为`/usr/local/bin/node`。
- `process.pid`：返回一个数字，表示当前进程的进程号。
- `process.platform`：返回一个字符串，表示当前的操作系统，比如`Linux`。
- `process.title`：返回一个字符串，默认值为`node`，可以自定义该值。
- `process.version`：返回一个字符串，表示当前使用的 Node 版本，比如`v7.10.0`。

针对shell的属性：

`process.env`属性返回一个对象，包含了当前Shell的所有环境变量。比如，`process.env.HOME`返回用户的主目录。

通常的做法是，新建一个环境变量`NODE_ENV`，用它确定当前所处的开发阶段，生产阶段设为`production`，开发阶段设为`develop`或`staging`，然后在脚本中读取`process.env.NODE_ENV`即可。

方法：

- `process.chdir()`：切换工作目录到指定目录。
- `process.cwd()`：返回运行当前脚本的工作目录的路径。`process.cwd()`与`__dirname`的区别。前者进程发起时的位置，后者是脚本的位置，两者可能是不一致的。
- `process.exit()`：退出当前进程。
- `process.getgid()`：返回当前进程的组ID（数值）。
- `process.getuid()`：返回当前进程的用户ID（数值）。
- `process.nextTick()`：指定回调函数在当前执行栈的尾部、下一次Event Loop之前执行。
- `process.on()`：监听事件。
- `process.setgid()`：指定当前进程的组，可以使用数字ID，也可以使用字符串ID。
- `process.setuid()`：指定当前进程的用户，可以使用数字ID，也可以使用字符串ID。



## eventEmitter

Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。

Node.js 里面的许多对象都会分发事件：一个 net.Server 对象会在每次有新连接时触发一个事件， 一个 fs.readStream 对象会在文件被打开的时候触发一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例。

events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。

实例

```javascript
//event.js 文件
var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
event.on('some_event', function() { 
    console.log('some_event 事件触发'); 
}); 
setTimeout(function() { 
    event.emit('some_event'); 
}, 1000); 
```

常用场景：

1) 模块间传递消息 

2) 回调函数内外传递消息 

3) 处理流数据，因为流是在EventEmitter基础上实现的. 4) 观察者模式发射触发机制相关应用



## 多进程

child_process模块开启多个子进程来执行node文件，执行开启的进程是主进程，被开启的进程是子进程。

child_process模块用于新建子进程。子进程的运行结果储存在系统缓存之中（最大200KB），等到子进程运行结束以后，主进程再用回调函数读取子进程的运行结果。

node有三种创建子进程的接口，每种方法有特定的使用场景。

exec/execFile: 用于执行bash命令，它的参数是一个命令字符串。用操作系统原生的方式执行各种命令，适用于输出轻量数据，执行的结果会存储在Buffer中，不同的是前者创建shell进行来执行命令，后者直接创建进程执行可执行文件，

spawn:是流式和操作系统进行交互，它属于异步执行，适用于子进程长时间运行的情况，适用于进程输入、输出数据量比较大的情况，支持stream的形式输入输出，可以用于任何命令，可以创建常驻后台进程。

fork: fork是spawn的特例，fork是两个node程序(javascript)之间时行交互，fork会在父子进程之间创建IPC通道，通过监听message事件和调用send方法，就可以在父子进程间通信了。

进程通信

使用 child_process.fork() 生成新进程之后，就可以用 child.send(message, [sendHandle]) 向新进程发送消息。新进程中通过监听message事件，来获取消息。

Node.js默认单进程运行，对于32位系统最高可以使用512MB内存，对于64位最高可以使用1GB内存。对于多核CPU的计算机来说，这样做效率很低，因为只有一个核在运行，其他核都在闲置。Node中提供了cluster模块，cluster实现了对child_process的封装，通过fork方法创建子进程的方式实现多进程模型。通过该模块简化多进程服务器程序的开发，统一通过主进程监听接口和分发请求。

cluster模块允许设立一个主进程和若干个worker进程，由主进程监控和协调worker进程的运行。worker之间采用进程间通信交换消息，cluster模块内置一个负载均衡器，采用Round-robin算法协调各个worker进程之间的负载。运行时，所有新建立的链接都由主进程完成，然后主进程再把TCP连接分配给指定的worker进程。

```js
//导入cluster
var cluster = require('cluster');
//判断是否是主进程，是主进程就按cpu数新建若干worker进程，是worker进程就在该进程启动一个服务器程序
if(cluster.isMaster) {
  var numWorkers = require('os').cpus().length;
  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for(var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  //监听子进程状态，主进程一旦监听到worker进程的exit事件，就会重启一个worker进程。worker进程一旦启动成功，可以正常运行了，就会发出online事件。
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });
}else {
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);
}
```

cluster代表整个集群，也就是工作进程和主进程，随着当前执行进程的变化，cluster的属性也在变化。在cluster上绑定的事件对每个进程都起作用，cluster的某些api只对主进程起作用，如fork、cluster.workers，有一些只对工作进程有用，如cluter.worker

worker对象：



### 孤儿进程与僵尸进程

孤儿进程是指父进程先退出，子进程由 pid 为 1 的 init 进程托管。

僵尸进程是指子进程先退出，但是父进程没有获取子进程的状态信息，导致子进程的进程描述符仍然保存在系统中。僵尸进程是有危害的，处理方法是退出主进程，init 进程会以父进程的身份对僵尸进程状态进行处理。

守护进程是在「后台运行」不受「终端控制」的进程（如输入、输出等）。在 nodejs 中，开启守护进程需要满足三个条件：

- 使子进程成为进程组的头
- 中断父子进程的 i/o
- 去除父进程的事件循环中对子进程的引用

## 多线程

Nodejs中有三种线程

- Event loop的主线程

- libuv的异步I/O线程池

- Node10.5之后，Node提供了worker_threads给node提供了真正的多线程

worker_thread模块中有四个对象两个类

- isMainThread:是否是主线程

- MessagePort:用于线程间的通信，继承自EventEmitter

- MessageChannel:用于创建异步、双向通信的通道实例

- threadId:线程ID

Worker：用于在主线程中创建子线程，第一个参数为filename，表示子线程的执行入口

parentPort:在worker线程中表示父进程的MessagePort类型的对象，在主线程中为null

workData:用于在主进程中向子进程传递数据

```javascript
const {
    Worker,
    MessageChannel,
    MessagePort,
    isMainThread,
    parentPort
} = require('worker_threads');
if(isMainThread) {
    const worker = new Workd(_filename);
    const subChannel = new MessageChannel();
    worker.postMessage({hereIsYourPort:subChannel.port1},[subChannel.port1]);
    subChannel.port2.on('message',(value)=>{
        console.log('received:',value)
    })
} else {
    subChannel.once('message',(value)=>{
        assert(value.hereIsYourPort instanceof MessagePort);
        value.hereIsYourPort.postMessage('the worker is sending this');
        value.hereIsYourPort.close();
    })
}
```

### 线程间通信

worker_thread线程之间可以共享内存。使用ArrayBuffer或SharedArrayBuffer

**parentPort**

主要用于主子线程通信，通过经典的 on('message'), postMessage形式

**MessageChannel**

可以通过线程间的消息传递来实现双向通信。 在内部，一个 Worker 具有一对内置的 MessagePort，在创建该 Worker 时它们已经相互关联。 虽然父端的 MessagePort 对象没有直接公开，但其功能是通过父线程的 Worker 对象上的 worker.postMessage() 和 worker.on('message') 事件公开的。
要创建自定义的消息传递通道（建议使用默认的全局通道，因为这样可以促进关联点的分离），用户可以在任一线程上创建一个 MessageChannel 对象，并将该 MessageChannel 上的 MessagePort 中的一个通过预先存在的通道传给另一个线程，

https://www.cnblogs.com/mengff/p/12815198.html

通常node的单线程是由于JavaScript的执行默认是单线程的，但是JavaScript的宿主环境，无论是node还是浏览器都是多线程的

node的单线程带来了一些问题，比如对cpu 的利用不足，某个未捕获的异常可能会导致整个程序的退出等。node的事件驱动和无阻塞特性使得在I/O密集型的业务场景（如限时抢购）等体现出巨大的优势。但是遇到加密、解密等CPU密集型复杂运算。当一个CPU占用率高的任务执行迟迟未完成时，后续队列中的延时、监听回调、nextTick等函数都会因被阻塞而无法执行，造成严重的延迟。更严重的情况。如果某个请求抛出错误，将有可能导致整个服务瘫痪。

## Node调用C++包

有一些场景下，用 C++扩展来实现尤为合适：

- 计算密集型模块，C++的执行性能一般要高于 JS
- 将现有的 C++类库低成本地封装成 Node.js 扩展，供 Node 生态使用
- Node.js 提供的原生能力无法满足需要，比如[fsevents](https://www.npmjs.com/package/fsevents)
- JS 语言在一些方面存在先天不足（例如数值精度、位运算等），可以通过 C++来补足

### node-gyp

node-gyp 是基于 GYP( 全称 Generate Your Projects，是谷歌开发的一套构建系统) 的。它会识别包或者项目中的 binding.gyp文件，这个里面是JSON的文件对工程依赖的各种文件进行了描述（可以理解为一个node版的CMakeList），然后根据该配置文件生成各系统下能进行编译的项目，如 Windows 下生成 Visual Studio 项目文件（*.sln 等），Unix 下生成 Makefile。在生成这些项目文件之后，node-gyp 还能调用各系统的编译工具（如 GCC）来将项目进行编译，得到最后的动态链接库 *.node 文件

在项目的顶层创建名为 `binding.gyp` 的文件，使用类似 JSON 的格式描述模块的构建配置。 该文件由 [node-gyp](http://url.nodejs.cn/kLHA2r) 使用，这是一个专门为编译 Node.js 插件而编写的工具。

创建 `binding.gyp` 文件后，使用 `node-gyp configure` 为当前平台生成适当的项目构建文件。 这将在 `build/` 目录中生成 `Makefile`（在 Unix 平台上）或 `vcxproj` 文件（在 Windows 上）。

接下来，调用 `node-gyp build` 命令生成编译后的 `addon.node` 文件。 这将被放入 `build/Release/` 目录。

当使用 `npm install` 安装 Node.js 插件时，npm 使用它自己的 `node-gyp` 捆绑版本来执行相同的一组操作，按需为用户平台生成插件的编译版本。

在进行编译得到.node二进制文件

```shell
node-gyp build
```

编译得到文件`Release/hoho.node`，在index.js中引入该文件

```javascript
// index.js
// 省略后缀名，自动找到hoho.node并加载、初始化
const hoho = require('./build/Release/hoho');

console.log(hoho.hoho());
```

运行该js文件，就可以运行hoho.node文件

```shell
$ node index.js
hoho, there.
```



### node-ffi

`node-ffi`提供了一组强大的工具，用于在`Node.js`环境中使用纯`JavaScript`调用动态链接库接口。它可以用来为库构建接口绑定，而不需要使用任何`C++`代码。

`node-ffi`并不能直接调用`C++`代码，你需要将`C++`代码编译为动态链接库：在 `Windows`下是 `Dll` ，在 `Mac OS`下是 `dylib` `，Linux` 是 `so` 。

`node-ffi` 加载 `Library`是有限制的，只能处理 `C`风格的 `Library`。

node-ffi: 这个模块可以直接引入C++的库，实现不用操作任何C++代码的C++库文件引入



编辑tsconfig.json

```js

```



ts由于有较严的格式规范，往往会报一些不必要的格式警告，干扰编译

解决方法：

在vscode中下载插件prettier，然后在代码中全选，右键菜单选择格式化文档即可

## Webassembly

wasi WebAssembly系统接口

使用

```javascript
import { readFile } from 'fs/promises';
import { WASI } from 'wasi';
import { argv, env } from 'process';

const wasi = new WASI({
  args: argv,
  env,
  preopens: {
    '/sandbox': '/some/real/path/that/wasm/can/access'
  }
});

// Some WASI binaries require:
//   const importObject = { wasi_unstable: wasi.wasiImport };
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

const wasm = await WebAssembly.compile(
  await readFile(new URL('./demo.wasm', import.meta.url))
);
const instance = await WebAssembly.instantiate(wasm, importObject);

wasi.start(instance);
```



## 设置npm镜像源

　

```Node
npm config get registry  // 查看npm当前镜像源

https://registry.npm.taobao.org/  // 设置npm镜像源为淘宝镜像

yarn config get registry  // 查看yarn当前镜像源

https://registry.npm.taobao.org/  // 设置yarn镜像源为淘宝镜像
```

新建npmrc文件

在npmrc文件中粘贴npm地址
