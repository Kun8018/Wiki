---
title: Javascript开发（二）
date: 2021-01-15 21:40:33
categories: IT
tags: IT，Web,Node
toc: true
thumbnail: http://cdn.kunkunzhang.top/jsEvent.jpg
---

​     第二篇主要讲原生js语言的原生方法，如继承、闭包和原型链等

<!--more-->

## js基本语法

### 宿主对象

#### Window

属性

`window.name`属性是一个字符串，表示当前浏览器窗口的名字。窗口不一定需要名字，这个属性主要配合超链接和表单的`target`属性使用。

`window.closed`属性返回一个布尔值，表示窗口是否关闭。

`window.opener`属性表示打开当前窗口的父窗口。如果当前窗口没有父窗口（即直接在地址栏输入打开），则返回`null`。

`window.frames`属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括`frame`元素和`iframe`元素。`window.frames[0]`表示页面中第一个框架窗口。

`window.length`属性返回当前网页包含的框架总数。如果当前网页不包含`frame`和`iframe`元素，那么`window.length`就返回`0`。

`window.frameElement`属性主要用于当前窗口嵌在另一个网页的情况（嵌入`<object>`、`<iframe>`或`<embed>`元素），返回当前窗口所在的那个元素节点。如果当前窗口是顶层窗口，或者所嵌入的那个网页不是同源的，该属性返回`null`。

`window.top`属性指向最顶层窗口，主要用于在框架窗口（frame）里面获取顶层窗口。

`window.parent`属性指向父窗口。如果当前窗口没有父窗口，`window.parent`指向自身。

`window.devicePixelRatio`属性返回一个数值，表示一个 CSS 像素的大小与一个物理像素的大小之间的比率。也就是说，它表示一个 CSS 像素由多少个物理像素组成。它可以用于判断用户的显示环境，如果这个比率较大，就表示用户正在使用高清屏幕，因此可以显示较大像素的图片。

`window.screenX`和`window.screenY`属性，返回浏览器窗口左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素）。这两个属性只读。

`window.innerHeight`和`window.innerWidth`属性，返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport）的大小（单位像素）。这两个属性只读。

用户放大网页的时候（比如将网页从100%的大小放大为200%），这两个属性会变小。因为这时网页的像素大小不变（比如宽度还是960像素），只是每个像素占据的屏幕空间变大了，因为可见部分（视口）就变小了。

`window.outerHeight`和`window.outerWidth`属性返回浏览器窗口的高度和宽度，包括浏览器菜单和边框（单位像素）。这两个属性只读。

`window.scrollX`属性返回页面的水平滚动距离，`window.scrollY`属性返回页面的垂直滚动距离，单位都为像素。这两个属性只读。

- `window.locationbar`：地址栏对象
- `window.menubar`：菜单栏对象
- `window.scrollbars`：窗口的滚动条对象
- `window.toolbar`：工具栏对象
- `window.statusbar`：状态栏对象
- `window.personalbar`：用户安装的个人工具栏对象

window实例方法
`window.alert('Hello World')`;//弹出对话框，只有确定按钮，用于提醒用户信息
`var result = confirm('你最近好吗？');`//弹出的对话框，除了提示信息之外，只有“确定”和“取消”,返回布尔值
`var result = window.prompt()//`也是弹出对话框，但是提示框下面有输入框，并有“确定”和“取消”两个按钮，返回布尔值
`window.open(url, windowName, [windowFeatures])`新建另一个浏览器窗口，url为地址栏，
`window.close()`window方法,用于关闭当前窗口，

`window.stop()`方法完全等同于单击浏览器的停止按钮，会停止加载图像、视频等正在或等待加载的对象。

`window.moveTo(100, 200)`

`window.moveBy(25, 50)`

`window.focus()`激活窗口，使其获得焦点，出现在其他窗口的前面。

`window.blur()`方法将焦点从窗口移除。

`window.getSelection`方法返回一个`Selection`对象，表示用户现在选中的文本。

`window.resizeTo()`方法用于缩放窗口到指定大小。

`window.resizeBy()`方法用于缩放窗口。它与`window.resizeTo()`的区别是，它按照相对的量缩放，`window.resizeTo()`需要给出缩放后的绝对大小。

`window.scrollTo`方法用于将文档滚动到指定位置。它接受两个参数，表示滚动后位于窗口左上角的页面坐标。

`window.scrollBy()`方法用于将网页滚动指定距离（单位像素）。它接受两个参数：水平向右滚动的像素，垂直向下滚动的像素。

`window.print`方法会跳出打印对话框，与用户点击菜单里面的“打印”命令效果相同。

`window.getSelection`方法返回一个`Selection`对象，表示用户现在选中的文本。

`window.getComputedStyle()`方法接受一个元素节点作为参数，返回一个包含该元素的最终样式信息的对象

`window.matchMedia()`方法用来检查 CSS 的`mediaQuery`语句

`window.requestAnimationFrame()`方法跟`setTimeout`类似，都是推迟某个函数的执行。不同之处在于，`setTimeout`必须指定推迟的时间，`window.requestAnimationFrame()`则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 16ms 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台 Tab 页时，`requestAnimationFrame()`会暂停执行。

如果某个函数会改变网页的布局，一般就放在`window.requestAnimationFrame()`里面执行，这样可以节省系统资源，使得网页效果更加平滑。因为慢速设备会用较慢的速率重流和重绘，而速度更快的设备会有更快的速率。

`window.requestIdleCallback()`跟`setTimeout`类似，也是将某个函数推迟执行，但是它保证将回调函数推迟到系统资源空闲时执行。也就是说，如果某个任务不是很关键，就可以使用`window.requestIdleCallback()`将其推迟执行，以保证网页性能。

它跟`window.requestAnimationFrame()`的区别在于，后者指定回调函数在下一次浏览器重排时执行，问题在于下一次重排时，系统资源未必空闲，不一定能保证在16毫秒之内完成；`window.requestIdleCallback()`可以保证回调函数在系统资源空闲时执行。

事件

`load`事件发生在文档在浏览器窗口加载完毕时。`window.onload`属性可以指定这个事件的回调函数。

//浏览器脚本发生错误时，会触发window对象的error事件。通过window.onerror属性对该事件指定回调函数。

window.onerror = function(message,error){
  console.log("出错了")
}

Window对象的事件监听属性

```js
window.onafterprint：afterprint事件的监听函数。
window.onbeforeprint：beforeprint事件的监听函数。
window.onbeforeunload：beforeunload事件的监听函数。
window.onhashchange：hashchange事件的监听函数。
window.onlanguagechange: languagechange的监听函数。
window.onmessage：message事件的监听函数。
window.onmessageerror：MessageError事件的监听函数。
window.onoffline：offline事件的监听函数。
window.ononline：online事件的监听函数。
window.onpagehide：pagehide事件的监听函数。
window.onpageshow：pageshow事件的监听函数。
window.onpopstate：popstate事件的监听函数。
window.onstorage：storage事件的监听函数。
window.onunhandledrejection：未处理的 Promise 对象的reject事件的监听函数。
window.onunload：unload事件的监听函数。
```

##### window.onload事件与DOMcontentloaded事件、jquery document.ready的区别

DOM解析的完整过程：

1. 解析HTML结构。
2. 加载外部脚本和样式表文件。
3. 解析并执行脚本代码。//js之类的
4. DOM树构建完成。//DOMContentLoaded
5. 加载图片等外部文件。
6. 页面加载完毕。//load

在第4步的时候`DOMContentLoaded`事件会被触发,也就是jquery的document.ready()事件。
在第6步的时候`load`事件会被触发。

区分的必要性

开发中我们经常需要给一些元素的事件绑定处理函数。但问题是，如果那个元素还没有加载到页面上，但是绑定事件已经执行完了，是没有效果的。这两个事件大致就是用来避免这样一种情况，将绑定的函数放在这两个事件的回调中，保证能在页面的某些元素加载完毕之后再绑定事件的函数。
 当然DOMContentLoaded机制更加合理，因为我们可以容忍图片，flash延迟加载，却不可以容忍看见内容后页面不可交互。



#### Location

Location是浏览器提供的原生对象，提供URL相关的信息和操作方法。

```js
document.location.href// http://user:passwd@www.example.com:4097/path/a.html?x=111#part1
document.location.protocol//当前 URL 的协议，包括冒号（:），"http:"
document.location.host//主机。如果端口不是协议默认的80和433，则还会包括冒号（:）和端口。"www.example.com:4097"
document.location.hostname//主机名，不包括端口，"www.example.com"
document.location.port//端口号，"4097"
document.location.pathname// URL 的路径部分，从根路径/开始。"/path/a.html"
document.location.search// "?x=111"
document.location.hash// "#part1"
document.location.username//域名前面的用户名，"user"
document.location.password//域名前面的密码，"passwd"
document.location.origin//URL 的协议、主机名和端口，"http://user:passwd@www.example.com:4097"
```

方法

```js
document.location.assign('http://www.example.com')//跳转到新的网址，可回退
document.location.replace('http://www.example.com')//跳转到新网址，不可回退
window.location.reload(true);// 向服务器重新请求当前网址
location.toString()//返回整个 URL 字符串，相当于读取Location.href属性。
```

#### History

`window.history`属性指向 History 对象，它表示当前窗口的浏览历史。

属性

`History.length`：当前窗口访问过的网址数量（包括当前网页）

`History.state`：History 堆栈最上层的状态值（详见下文）

方法

`History.back()`：移动到上一个网址，等同于点击浏览器的后退键。对于第一个访问的网址，该方法无效果。

`History.forward()`：移动到下一个网址，等同于点击浏览器的前进键。对于最后一个访问的网址，该方法无效果。

`History.go()`：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如`go(1)`相当于`forward()`，`go(-1)`相当于`back()`。

`History.pushState(state, title, url)`方法用于在历史中添加一条记录。

`History.replaceState()`方法用来修改 History 对象的当前记录

#### Navigator 

指向浏览器和系统信息

```javascript
//属性
navigator.userAgent();//返回浏览器的useragent字符串，表示浏览器的厂商和版本信息
Navigator.platform//属性,返回用户的操作系统信息，比如MacIntel、Win32、Linux x86_64等。
navigator.cookieEnabled//返回一个布尔值，表示浏览器的 Cookie 功能是否打开。
//方法
navigator.javaEnabled()//方法，返回一个布尔值，表示浏览器是否能运行 Java Applet 小程序。
navigator.language//属性，返回一个字符串，表示浏览器的首选语言
Navigator.languages//属性，返回一个数组，表示用户可以接受的语言。

Navigator.geolocation//属性，返回一个 Geolocation 对象，包含用户地理位置的信息。该 API 只有在 HTTPS 协议下可用，
Geolocation.getCurrentPosition()//得到用户的当前位置
Geolocation.watchPosition()//监听用户位置变化
Geolocation.clearWatch()//取消watchPosition()方法指定的监听函数
```

window.screen表示当前显示的窗口，返回设备的显示信息

```js
Screen.height：浏览器窗口所在的屏幕的高度（单位像素）。
Screen.width：浏览器窗口所在的屏幕的宽度（单位像素）
Screen.availHeight：浏览器窗口可用的屏幕高度（单位像素）
Screen.availWidth：浏览器窗口可用的屏幕宽度（单位像素）
Screen.pixelDepth：整数，表示屏幕的色彩位数，比如24表示屏幕提供24位色彩。
Screen.colorDepth：Screen.pixelDepth的别名。严格地说，colorDepth 表示应用程序的颜色深度，pixelDepth 表示屏幕的颜色深度，绝大多数情况下，它们都是同一件事。
Screen.orientation：返回一个对象，表示屏幕的方向。该对象的type属性是一个字符串，表示屏幕的具体方向，landscape-primary表示横放，landscape-secondary表示颠倒的横放，portrait-primary表示竖放，portrait-secondary
```

#### XMLHttpRequest 对象

1999年，微软公司发布 IE 浏览器5.0版，第一次引入新功能：允许 JavaScript 脚本向服务器发起 HTTP 请求。2005年2月，AJAX 这个词第一次正式提出，它是Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。

后来，AJAX 这个词就成为 JavaScript 脚本发起 HTTP 通信的代名词，也就是说，只要用脚本发起通信，就可以叫做 AJAX 通信。

AJAX 通过原生的`XMLHttpRequest`对象发出 HTTP 请求，得到服务器返回的数据后，再进行处理。现在，服务器返回的都是 JSON 格式的数据，XML 格式已经过时了，但是 AJAX 这个名字已经成了一个通用名词，字面含义已经消失了。

ajax请求的步骤

1. 创建 XMLHttpRequest 实例
2. 发出 HTTP 请求
3. 接收服务器传回的数据
4. 更新网页数据

ajax支持多种协议（ftp、file等），可以发送任何格式的数据。

XMLHttpRequest对象的属性

`XMLHttpRequest.responseText`属性返回从服务器接收到的字符串，该属性为只读。只有 HTTP 请求完成接收以后，该属性才会包含完整的数据。

`XMLHttpRequest.responseURL`属性是字符串，表示发送数据的服务器的网址。

`XMLHttpRequest.status`属性返回一个整数，表示服务器回应的 HTTP 状态码。

XMLHttpRequest对象的方法

`XMLHttpRequest.open()`方法用于指定 HTTP 请求的参数，或者说初始化 XMLHttpRequest 实例对象。它一共可以接受五个参数。method：表示 HTTP 动词方法，比如GET、POST、PUT、DELETE、HEAD等。
url: 表示请求发送目标 URL。
async: 布尔值，表示请求是否为异步，默认为true。如果设为false，则send()方法只有等到收到服务器返回了结果，才会进行下一步操作。该参数可选。由于同步 AJAX 请求会造成浏览器失去响应，许多浏览器已经禁止在主线程使用，只允许 Worker 里面使用。所以，这个参数轻易不应该设为false。
user：表示用于认证的用户名，默认为空字符串。该参数可选。
password：表示用于认证的密码，默认为空字符串。该参数可选。

`XMLHttpRequest.send()`方法用于实际发出 HTTP 请求。它的参数是可选的，如果不带参数，就表示 HTTP 请求只有一个 URL，没有数据体，典型例子就是 GET 请求；如果带有参数，就表示除了头信息，还带有包含具体数据的信息体，典型例子就是 POST 请求。

`XMLHttpRequest.setRequestHeader()`方法用于设置浏览器发送的 HTTP 请求的头信息。该方法接受两个参数。第一个参数是字符串，表示头信息的字段名，第二个参数是字段值。

`XMLHttpRequest.getResponseHeader()`方法返回 HTTP 头信息指定字段的值，如果还没有收到服务器回应或者指定字段不存在，返回null

`XMLHttpRequest.getAllResponseHeaders()`方法返回一个字符串，表示服务器发来的所有 HTTP 头信息。格式为字符串，每个头信息之间使用`CRLF`分隔（回车+换行），如果没有收到服务器回应，该属性为`null`。如果发生网络错误，该属性为空字符串。

`XMLHttpRequest.abort()`方法用来终止已经发出的 HTTP 请求。调用这个方法以后，`readyState`属性变为`4`，`status`属性变为`0`。



XMLHttpRequest 对象的事件

XMLHttpRequest 实例对象本身和实例的`upload`属性，都有一个`progress`事件，会不断返回上传的进度。

load 事件表示服务器传来的数据接收完毕，error 事件表示请求出错，abort 事件表示请求被中断（比如用户取消请求）。



#### File

File 对象代表一个文件，用来读写文件信息。

File的属性：

- File.lastModified：最后修改时间
- File.name：文件名或文件路径
- File.size：文件大小（单位字节）
- File.type：文件的 MIME 类型

### 事件

#### 事件级别

事件级别分为Dom0级、Dom2级和Dom3级

Dom0级指在JavaScript中指定对象，最后通过事件处理属性赋值null来解绑事件

```html
<body>
  <button value="按钮"></button>
  <script>
    var button = document.querySelector("button");
    btn.click = function(){ alert("0")}
  </script>
</body>
```

缺点：

1.不能给同一元素添加多个事件，如果添加多个事件会互相覆盖

2.不能控制事件流

Dom2级事件是对指定对象添加事件处理函数，可以是多个，如

```html
<body>
  <div id="demo"></div>
  <script>
     demo.addEventListener("onclick",clickfn,false);
     demo.addEventListener("mouseover",showfn,false);
    function clickfn(){
      alert('1')
    }
    function showfn(){
      alert('2')
    }
  </script>
</body>
```

特别地，IE8版本以下的IE浏览器下不支持addEventListener和removeEventListener，使用attachEvent和detachEvent

Dom2与Dom0之间不会互相覆盖

Dom3级是在Dom2级的基础上添加更多事件类型，

UI事件，主要包括load,unload,abort,error,select,resize,scroll事件。

焦点事件，当用户获得或失去焦点时触发，如focus、blur

鼠标事件，当用户在鼠标上操作时触发事件，如dbclick、mouseup

键盘事件、当用户在键盘上操作时触发事件，如keydown，keypress

文本事件：当在文档中输入文本时触发，如textInput

滚轮事件，当用户使用鼠标滚轮或者类似设备时触发事件，如mousewheel

合成事件：当为IME(输入法编辑器)输出字符时触发，如compositionstart

变动事件：当底层Dom结构发生变化时触发，如DomsubtreeModified

html5事件、设备事件

Dom3也允许自定义事件

事件模型是指分为三个阶段：

- 捕获阶段：在事件冒泡的模型中，捕获阶段不会响应任何事件；
- 目标阶段：目标阶段就是指事件响应到触发事件的最底层元素上；
- 冒泡阶段：冒泡阶段就是事件的触发响应会从最底层目标一层层地向外到最外层（根节点），事件代理即是利用事件冒泡的机制把里层所需要响应的事件绑定到外层；

#### EventTarget对象

DOM 的事件操作（监听和触发），都定义在`EventTarget`接口。所有节点对象都部署了这个接口，其他一些需要事件通信的浏览器内置对象（比如，`XMLHttpRequest`、`AudioNode`、`AudioContext`）也部署了这个接口。

`EventTarget.addEventListener()`用于在当前节点或对象上，定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。该方法没有返回值。

`EventTarget.removeEventListener`方法用来移除`addEventListener`方法添加的事件监听函数。

`EventTarget.dispatchEvent`方法在当前节点上触发指定事件，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了`Event.preventDefault()`，则返回值为`false`，否则为`true`。

#### Event对象

事件发生以后，会产生一个事件对象，作为参数传给监听函数。浏览器原生提供一个`Event`对象，所有的事件都是这个对象的实例，或者说继承了`Event.prototype`对象。

实例属性

`Event.bubbles`属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性，一般用来了解 Event 实例是否可以冒泡。前面说过，除非显式声明，`Event`构造函数生成的事件，默认是不冒泡的。

`Event.eventPhase`属性返回一个整数常量，表示事件目前所处的阶段。该属性只读。

- 0，事件目前没有发生。
- 1，事件目前处于捕获阶段，即处于从祖先节点向目标节点的传播过程中。
- 2，事件到达目标节点，即`Event.target`属性指向的那个节点。
- 3，事件处于冒泡阶段，即处于从目标节点向祖先节点的反向传播过程中。

`Event.cancelable`属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性，一般用来了解 Event 实例的特性。

事件发生以后，会经过捕获和冒泡两个阶段，依次通过多个 DOM 节点。因此，任意事件都有两个与事件相关的节点，一个是事件的原始触发节点（`Event.target`），另一个是事件当前正在通过的节点（`Event.currentTarget`）。前者通常是后者的后代节点。

`Event.currentTarget`属性返回事件当前所在的节点，即事件当前正在通过的节点，也就是当前正在执行的监听函数所在的那个节点。随着事件的传播，这个属性的值会变。

`Event.target`属性返回原始触发事件的那个节点，即事件最初发生的节点。这个属性不会随着事件的传播而改变。

`Event.type`属性返回一个字符串，表示事件类型。事件的类型是在生成事件的时候指定的。该属性只读。

`Event.timeStamp`属性返回一个毫秒时间戳，表示事件发生的时间。它是相对于网页加载成功开始计算的。

`Event.isTrusted`属性返回一个布尔值，表示该事件是否由真实的用户行为产生。比如，用户点击链接会产生一个`click`事件，该事件是用户产生的；`Event`构造函数生成的事件，则是脚本产生的。

`Event.detail`属性只有浏览器的 UI （用户界面）事件才具有。该属性返回一个数值，表示事件的某种信息。具体含义与事件类型相关。比如，对于`click`和`dblclick`事件，`Event.detail`是鼠标按下的次数（`1`表示单击，`2`表示双击，`3`表示三击）；对于鼠标滚轮事件，`Event.detail`是滚轮正向滚动的距离，负值就是负向滚动的距离，返回值总是3的倍数。

实例方法

`Event.preventDefault`方法取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了；再比如，按一下空格键，页面向下滚动一段距离，使用这个方法以后也不会滚动了。该方法生效的前提是，事件对象的`cancelable`属性为`true`，如果为`false`，调用该方法没有任何效果。**该方法只是取消事件对当前元素的默认影响，不会阻止事件的传播。如果要阻止传播，可以使用`stopPropagation()`或`stopImmediatePropagation()`方法。**

`Event.stopPropagation`方法阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。

`Event.stopImmediatePropagation`方法阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点。也就是说，该方法阻止事件的传播，比`Event.stopPropagation()`更彻底。

`Event.composedPath()`返回一个数组，成员是事件的最底层节点和依次冒泡经过的所有上层节点。

#### 事件模型

##### 事件传播（事件冒泡与事件捕获）

一个事件发生后，会在子元素和父元素之间传播，这个传播分为3个阶段：

- **第一阶段**：从`window`对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
- **第二阶段**：在目标节点上触发，称为“目标阶段”（target phase）。
- **第三阶段**：从目标节点传导回`window`对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。

事件冒泡可以形象地比喻为把一颗石头投入水中，泡泡会一直从水底冒出水面。也就是说，事件会从最内层的元素开始发生，一直向上传播，直到document对象。

网景提出另一种事件流名为**事件捕获**(event capturing)。与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。

最后采用w3c的折中方案：先捕获后冒泡，形成了事件传播的3个阶段

简单来说，如果父dom和子dom都定义了相同的事件（如点击事件），那么触发子dom的事件时会同时触发父dom上的事件

举例

##### 阻止事件冒泡

```js
$("#div1").mousedown(function(e){
    var e=event||window.event;
    event.stopPropagation();
});
```

不支持冒泡的事件类型：

mouseenter、mouseleave、blur、focus、load、unload、resize

不支持冒泡的事件，可以在捕获阶段实现事件代理

##### 事件委托/事件代理

由于事件传播的存在，事件会在冒泡阶段向上传播到父节点。因此可以把

事件委托，通俗地来讲，就是把一个元素响应事件（click、keydown......）的函数委托到另一个元素；

事件委托会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。

实例

```html
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  ......
  <li>item n</li>
</ul>
<script>
// 给父层元素绑定事件
document.getElementById('list').addEventListener('click', function (e) {
  // 兼容性处理
  var event = e || window.event;
  var target = event.target || event.srcElement;
  // 判断是否匹配目标元素
  if (target.nodeName.toLocaleLowerCase === 'li') {
    console.log('the content is: ', target.innerHTML);
  }
});
</script>
```

事件委托的优点：

1.减少内存消耗

正常来说，如果我们有一个列表，列表之中有大量的列表项，我们需要在点击列表项的时候响应一个事件；

比较好的方法就是把这个点击事件绑定到他的父层，也就是 `ul` 上，然后在执行事件的时候再去匹配判断目标元素；

所以事件委托可以减少大量的内存消耗，节约效率。

2.可以动态绑定事件

例子中列表项就几个，我们给每个列表项都绑定了事件；

在很多时候，我们需要通过 AJAX 或者用户操作动态的增加或者去除列表项元素，那么在每一次改变的时候都需要重新给新增的元素绑定事件，给即将删去的元素解绑事件；

如果用了事件委托就没有这种麻烦了，因为事件是绑定在父层的，和目标元素的增减是没有关系的，执行到目标元素是在真正响应执行事件函数的过程中去匹配的；

事件委托也是有一定局限性的；

比如 focus、blur 之类的事件本身没有事件冒泡机制，所以无法委托；

mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的；

对于事件代理(事件委托）来说，在事件捕获或者事件冒泡阶段处理并没有明显的优劣之分，但是由于事件冒泡的事件流模型被所有主流的浏览器兼容，从兼容性角度来说还是建议大家使用事件冒泡模型。

#### 鼠标事件



键盘事件



进度事件



拖动事件

拖拉（drag）指的是，用户在某个对象上按下鼠标键不放，拖动它到另一个位置，然后释放鼠标键，将该对象放在那里。

拖拉的对象有好几种，包括元素节点、图片、链接、选中的文字等等。在网页中，除了元素节点默认不可以拖拉，其他（图片、链接、选中的文字）都可以直接拖拉。为了让元素节点可拖拉，可以将该节点的`draggable`属性设为`true`。

`draggable`属性可用于任何元素节点，但是图片（`<img>`）和链接（`<a>`）不加这个属性，就可以拖拉。对于它们，用到这个属性的时候，往往是将其设为`false`，防止拖拉这两种元素。

当元素节点或选中的文本被拖拉时，就会持续触发拖拉事件，包括以下一些事件。

- `drag`：拖拉过程中，在被拖拉的节点上持续触发（相隔几百毫秒）。
- `dragstart`：用户开始拖拉时，在被拖拉的节点上触发，该事件的`target`属性是被拖拉的节点。通常应该在这个事件的监听函数中，指定拖拉的数据。
- `dragend`：拖拉结束时（释放鼠标键或按下 ESC 键）在被拖拉的节点上触发，该事件的`target`属性是被拖拉的节点。它与`dragstart`事件，在同一个节点上触发。不管拖拉是否跨窗口，或者中途被取消，`dragend`事件总是会触发的。
- `dragenter`：拖拉进入当前节点时，在当前节点上触发一次，该事件的`target`属性是当前节点。通常应该在这个事件的监听函数中，指定是否允许在当前节点放下（drop）拖拉的数据。如果当前节点没有该事件的监听函数，或者监听函数不执行任何操作，就意味着不允许在当前节点放下数据。在视觉上显示拖拉进入当前节点，也是在这个事件的监听函数中设置。
- `dragover`：拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的`target`属性是当前节点。该事件与`dragenter`事件的区别是，`dragenter`事件在进入该节点时触发，然后只要没有离开这个节点，`dragover`事件会持续触发。
- `dragleave`：拖拉操作离开当前节点范围时，在当前节点上触发，该事件的`target`属性是当前节点。如果要在视觉上显示拖拉离开操作当前节点，就在这个事件的监听函数中设置。
- `drop`：被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发。注意，如果当前节点不允许`drop`，即使在该节点上方松开鼠标键，也不会触发该事件。如果用户按下 ESC 键，取消这个操作，也不会触发该事件。该事件的监听函数负责取出拖拉数据，并进行相关处理。





`DataTransfer.setData()`方法用来设置拖拉事件所带有的数据。该方法没有返回值。

`DataTransfer.getData()`方法接受一个字符串（表示数据类型）作为参数，返回事件所带的指定类型的数据（通常是用`setData`方法添加的数据）。如果指定类型的数据不存在，则返回空字符串。通常只有`drop`事件触发后，才能取出数据。

`DataTransfer.clearData()`方法接受一个字符串（表示数据类型）作为参数，删除事件所带的指定类型的数据。如果没有指定类型，则删除所有数据。如果指定类型不存在，则调用该方法不会产生任何效果。

`DataTransfer.setDragImage()`拖动过程中（`dragstart`事件触发后），浏览器会显示一张图片跟随鼠标一起移动，表示被拖动的节点。这张图片是自动创造的，通常显示为被拖动节点的外观，不需要自己动手设置。

`DataTransfer.setDragImage()`方法可以自定义这张图片。它接受三个参数。第一个是`<img>`节点或者`<canvas>`节点，如果省略或为`null`，则使用被拖动的节点的外观；第二个和第三个参数为鼠标相对于该图片左上角的横坐标和纵坐标。



### 全局事件

指定事件的回调函数，推荐使用的方法是元素的`addEventListener`方法。

除了之外，还有一种方法可以直接指定事件的回调函数。

这个接口是由`GlobalEventHandlers`接口提供的。它的优点是使用比较方便，缺点是只能为每个事件指定一个回调函数，并且无法指定事件触发的阶段（捕获阶段还是冒泡阶段）。

`HTMLElement`、`Document`和`Window`都继承了这个接口，也就是说，各种 HTML 元素、`document`对象、`window`对象上面都可以使用`GlobalEventHandlers`接口提供的属性。



