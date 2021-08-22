---
title: React（五）
date: 2020-06-02 21:40:33
categories: IT
tags: IT，Web,Node，React
toc: true
thumbnail: 
---

​      基于React的衍生库

<!--more-->

## immutablejs

Immutable数据就是一旦创建，就不能更改的数据。每当对Immutable对象进行修改的时候，就会返回一个新的Immutable对象，以此来保证数据的不可变

有人说 Immutable 可以给 React 应用带来数十倍的提升，也有人说 Immutable 的引入是近期 JavaScript 中伟大的发明，因为同期 React 太火，它的光芒被掩盖了。这些至少说明 Immutable 是很有价值的。

Immutable的优点：

1.降低复杂度，避免副作用

2.节省内存。Immutable采用了结构共享机制，所以会尽量复用内存

3.方便回溯。Immutable每次修改都会创建新对象，且对象不变，那么变更记录就能够被保存下来。应用的状态变得可控、可追溯，方便撤销和重做功能的实现

4.函数式编程。Immutable本身就是函数式编程中的概念。纯函数式编程比面向对象更适用于前端开发，因为只要输入一致，输出必然是一致的，这样开发的组件更易于调试和组装

5.丰富的API

JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象，比如

```javascript
var obj = {
 a: 1,
 b: 2
};var obj1 = obj;obj1.a = 999;
obj.a //999
```

改变了obj1.a的值，同时也会更改到obj.a的值。

一般的解法就是使用「深拷贝」(deep copy)而非浅拷贝(shallow copy)，来避免被修改,但是这样造成了 CPU和内存的浪费.

immutable可以很好地解决这些问题

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

Immutable 的几种数据类型：

- List: 有序索引集，类似JavaScript中的Array。
- Map: 无序索引集，类似JavaScript中的Object。
- OrderedMap: 有序的Map，根据数据的set()进行排序。
- Set: 没有重复值的集合。
- OrderedSet: 有序的Set，根据数据的add进行排序。
- Stack: 有序集合，支持使用unshift（）和shift（）添加和删除。
- Range(): 返回一个Seq.Indexed类型的集合，这个方法有三个参数，start表示开始值，默认值为0，end表示结束值，默认为无穷大，step代表每次增大的数值，默认为1.如果start = end,则返回空集合。
- Repeat(): 返回一个vSeq.Indexe类型的集合，这个方法有两个参数，value代表需要重复的值，times代表要重复的次数，默认为无穷大。
- Record: 一个用于生成Record实例的类。类似于JavaScript的Object，但是只接收特定字符串为key，具有默认值。
- Seq: 序列，但是可能不能由具体的数据结构支持。
- Collection: 是构建所有数据结构的基类，不可以直接构建。

方法：

fromJS()：

`作用` : 将一个js数据转换为Immutable类型的数据 `用法` : `fromJS(value, converter)` `简介` : value是要转变的数据，converter是要做的操作。第二个参数可不填，默认情况会将数组准换为List类型，将对象转换为Map类型，其余不做操作。

is()

`作用` : 对两个对象进行比较 `用法` : `is(map1,map2)` `简介` : 和js中对象的比较不同，在js中比较两个对象比较的是地址，但是在Immutable中比较的是这个对象hashCode和valueOf，只要两个对象的hashCode相等，值就是相同的，避免了深度遍历，提高了性能

### 在react中使用

react中通常使用purecomponent进行props的浅比较，从而控制shouldComponentUpdate的返回值

但是当传入prop或者state不止一层，或者传入的是Array和Object类型时，浅比较就失效了，当然也可以在shouldComponentUpdate中使用deepCopy和deepCompare来避免不必要的render，但是深拷贝和深比较都是非常消耗性能的，此时可以用Immutable来进行优化

Immutable提供了简洁高效的判断数据是否变化的方法，只需===和is就能比较是否需要执行render，而这个操作几乎是零成本的，所以可以极大提高性能

```react
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { is, Map } from 'immutable';

class Caculator extends Component {
  state = {
    counter: Map({ number: 0})
  }

	handleClick = () => {
    let amount = this.amount.value ? Number(this.amount.value): 0;
    let counter = this.state.counter.update('number', val => val + amount);
    this.setState({counter});
  }

	shouldComponentUpdate(nextProps={},nextState={}{
    if(Object.keys[this.state].length !== Object.keys(nextState).length){
    	return true;
  	}
  	for ( const key in nextState ) {
    	if( !is(this.state[key], nextState[key])) {
        return true;
      }
  	}    
		return false
  })
  render() {
    return (
    	<div>
      	<p>{ this.state.counter.get('number')}</p>
        <input ref={input => this.amout = input} />
        <button onClick="this.handleClick">+</button>
      </div>
    )
  }
}
ReactDOM.render(
	<Caculator/>,
  document.getElementById('root')
)
```

### 在redux中使用

可以使用redux-immutable中间件的方式实现redux与immutable搭配使用

建议把整个Redux的state树作为Immutable对象

### 注意

- 不要混合普通的JS对象和Immutable对象

- 把整个Redux的state树作为Immutable对象

- 除了展示组件，其他大部分组件都可以使用immutable对象提高效率

- 少用toJS方法，这个方法非常耗费性能，它会深度遍历数据转换成JS对象

- 你的Selector应该永远返回immutable对象



## rxjs

rxjs是一个库，它通过使用observable序列来编写异步和基于事件的程序。它提供了核心类型Observable，附属类型(observer、schedulers、subjects)和类似于数组的操作符(map、filter、reduce、every)等，这些操作符可以把异步事件作为集合来处理

可以把rxjs当作用来处理事件的lodash

rxjs中的基本概念：

Observable(是一个可观察对象)：表示一个概念，这个概念是一个可调用的未来值或事件的集合

Observer(观察者)：一个回调函数的集合，它指定如何监听由Observable提供的值

Subscription(订阅)：表示Observable的执行，它主要用于取消Obervable的执行

Operator(操作符)：

Subject(主体)：

Scheduler(调度器)：

### 安装

通过npm安装

```shell
npm install rxjs
```

通过es6或者commonjs导入

```javascript
var Rx = require('rxjs/Rx')
import Rx from 'rxjs/Rx'

Rx.observable.of(1,2,3)//等等
```

按需导入函数(可以减少打包体积)

```javascript
import { Observable } from 'rxjs/observable'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map'

var Observable = require('rxjs/Observable').Observable
require('rxjs/add/observable/of')
require('rxjs/add/operator/map')

Observable.of(1,2,3).map(x => x+ '!!!');//等等
```

### 注册事件

常规写法

```javascript
var button = document.querySelector('button')
button.addEventListener('click',()=> console.log('click'))
```

rxjs写法

```javascript
var button = document.querySelector('button')
Rx.observable.fromEvent(button,'click')
  .subscribe(()=> console.log('click'))
```

### 操作变量

常规写法是非纯函数，状态管理较乱

```javascript
var count = 0;
var button = document.querySelector('button')
button.addEventListener('click',()=> console.log(`click ${{++count}}`))
```

Rxjs将应用状态隔离起来

```javascript
var button = document.querySelector('button')
Rx.observable.fromEvent(button,'click')
  .scan(count => count +1,0)
  .subscribe(count => console.log(`click ${count}`))
```

其他对变量的操作函数

```javascript
//获取输入框
var input = Rx.Observable.fromEvent(document.querySelector('input'),'input')

//传递一个新值

//传递两个新值
input.plunk('target','value').pairwise()
    .subsribe(value => console.log(value))

//只通过唯一的值
input.plunk('data').distinct()
    .subsribe(value => console.log(value))

//不传递重复值
input.plunk('data').
```

### 观察者模式与迭代器模式

Rxjs中包含两个基本概念：Observable和Observer

Observable作为被观察者，是一个可调用的未来值或事件的集合，支持异步或者同步数据流

Observer作为观察者，是一个回调函数的集合，他知道如何去监听由Observable提供的值

Observer与Observable之间是观察者模式，Observer通过Observable提供的subscribe方法订阅，Observable通过Observer提供的next方法向Observer发布事件

在Rxjs中，Observer除了有next方法来接收Observable的事件外，还提供了另外的两个方法：error方法和complete方法，来完成异常和完成状态，这个就是迭代器模式，类似于ES6中的Iterator遍历器

```react
import { Observable } from 'rxjs'

const observer = {
  next: (value) => console.log(value);
  error: err => console.error('Observer got an error' + err);
	complete: () => console.log('Observer got a complete notification')
}

const observable = new Observable (function(observer) {
  observer.next('a');
  observer.next('b');
  observer.complete();
  
  observer.next('c')
})

const subscription = observable.subscribe(observer)
```









### react使用

在react中，在componentDidMount生命周期中订阅observable，在componentWillUnmount中取消订阅

```react
import messages from './someObservable'

class Mycomponent extends ObservableComponent{
  constructor(props){
    super(props);
    this.state = {message:[]};
  }
  componentDidMount(){
    this.messages = messages
       .scan(messages,messages) => [messages].concat(messages,[])
       .subscribe(messages => this.setState({messages:messages}))
  }
  componentWillUnmount(){
    this.messages.unsubscribe();
  }
  render() {
    return (
      <div>
        <ul>
           {this.state.messages.map(message => <li>{message.text}</li>)}
        </ul>
      </div>
    );
  }
}
 
export default MyComponent;
```



https://www.jianshu.com/p/273e7ab02fa1

## cyclejs





## 测试框架



## Nextjs

Https://juejin.cn/post/6844904017487724557

`Next.js`是一个基于`React`的一个服务端渲染简约框架。它使用`React`语法，可以很好的实现代码的模块化，有利于代码的开发和维护

Next的优点：

- 默认服务端渲染模式，以文件系统为基础的客户端路由
- 代码自动分隔使页面加载更快
- 以页面为基础的简洁的客户端路由
- 以`webpack`的热替换为基础的开发环境
- 使用`React`的`JSX`和`ES6`的`module`，模块化和维护更方便
- 可以运行在`Express`和其他`Node.js`的`HTTP` 服务器上
- 可以定制化专属的`babel`和`webpack`配置

创建next项目

```shell
npm install --save react react-dom next
```

`Next.js`是从服务器生成页面，再返回给前端展示。`Next.js`默认从 `pages` 目录下取页面进行渲染返回给前端展示，并默认取 `pages/index.js` 作为系统的首页进行展示。注意，`pages` 是默认存放页面的目录，路由的根路径也是`pages`目录

在pages目录下创建indexjs

```javascript
// next-Link用于引入文件
import Link from 'next/link'

const Index = () => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
)

export default Index
```



### 多页面



### 使用redux



### 路由遮盖

`Next.js`上提供了一个独特的特性：路由遮盖（Route Masking）。它可以使得在浏览器上显示的是路由`A`，而`App`内部真正的路由是`B`。这个特性可以让我们来设置一些比较简洁的路由显示在页面，而系统背后是使用一个带参数的路由。比如上面的例子中，地址栏中显示的是 `http://localhost:3000/post?title=Hello%20Next.js` ，这个地址含有一个`title`参数，看着很不整洁。下面我们就用`Next.js`来改造路由，使用路由遮盖来创建一个更加简洁的路由地址。比如我们将该地址改造成 `http://localhost:3000/p/hello-nextjs



### 部署next项目

`Next.js` 项目的部署，需要一个 `Node.js`的服务器，可以选择 `Express`, `Koa`或其他 `Nodejs` 的Web服务器。本文中以 `Express` 为例来部署 `Next` 项目。



 



## Dvajs

dva 首先是一个基于 redux 和 redux-saga的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router和 fetch，所以也可以理解为一个轻量级的应用框架。

dva把redux的action、reducer、createActions、actionType等不同目录的文件组织在一个modle文件中。

安装

```shell
npm install dva-cli@next -g
```

创建项目

```shell
dva new myapp
```

进入目录，运行

```shell
npm start
```





## blitz.js

安装

```shell
npm install -g blitz
```

创建项目

```shell
blitz new AppName
cd 
```





## Umijs







和creat-react-app的不同

create-react-app 是基于 webpack 的打包层方案，包含 build、dev、lint 等，他在打包层把体验做到了极致，但是不包含路由，不是框架，也不支持配置。所以，如果大家想基于他修改部分配置，或者希望在打包层之外也做技术收敛时，就会遇到困难。

和nextjs的不同

next.js 是个很好的选择，Umi 很多功能是参考 next.js 做的。要说有哪些地方不如 Umi，我觉得可能是不够贴近业务，不够接地气。比如 antd、dva 的深度整合，比如国际化、权限、数据流、配置式路由、补丁方案、自动化 external 方面等等一线开发者才会遇到的问题。



## Ramda

ramda的主要特性：

Ramda强调更加纯粹的函数式编程风格，数据不变性和无副作用是其核心设计理念，可以帮助你使用简洁优雅的代码完成工作

Ramda函数本身都是自动柯里化的，这可以让你在只提供部分参数的情况下，轻松在已有函数的基础上创建新的函数

Ramda函数参数的排列顺序更便于柯里化，要操作的数据通常在最后面。

### 安装

安装

```shell
npm install ramda 
```

全部引入

```javascript
const R = require('ramda')

import * as R from 'ramda'

const {identity} = RR.map(identity,[1,2,3]) 
```

部分引入

```javascript
import identity from 'ramda/src/identity'
```







## Preact

### 基本概念

启动-安装preact-cli

```shell
npm i -g preact-cli
```

创建应用

```shell
preact create my-first-preact-app
cd my-first-preact-app
```

启动

```shell
npm start
```

在本地端口8080就可以访问

打包构建

```shell
npm run build
```

preact打包构建很快，且和pwa配合很好，一些移动端的页面以及活动页建议可以尝试一下，性能确实会比React好一些，开发与构建流程也很简单高效。

传统有状态组件与无状态组件

有状态组件

```javascript
class Link extends Component {
    render(props, state) {
        return <a href={props.href}>{ props.children }</a>;
    }
}
```

上面的代码就用到了**PReact可以直接在render中传入props和state**的特性，从一定程度上简化了写法，提升了可读性。

无状态组件



**关联状态**

在优化 state 改变的方面，Preact 比 React 走得更超前一点。在 ES2015 React 代码中，通常的模式是在 render() 方法中使用箭头函数，以便响应事件，更新状态。**每次渲染都再局部创建一个函数闭包，效率十分低下，而且会迫使垃圾回收器作许多不必要的工作。**

在 Preact 的 Form 中，提供了 linkState() 作为解决方案。linkState() 是 Component 类的一个内置方法。

当发生一个事件时，调用 .linkState('text') 将返回一个处理器函数，这个函数把它相关的值更新到组件状态内指定的值。 **多次调用 linkState(name)时，如果 name 参数相同，那么结果会被缓存起来**。所以就必然不存在**性能**问题，如:

```javascript
class Foo extends Component {
    render({ }, { text }) {
        return <input value={text} onInput={this.linkState('text')} />;
    }
}
```

**外部DOM修改**

有时，需要用到一些第三方库，这些**第三方库需要能够自由的修改 DOM，并且在 DOM 内部持久化状态，或这些第三方库根本就没有组件化**。有许多优秀的 UI 工具或可复用的元素都是处于这种无组件化的状态。在 Preact 中 (React 中也类似), 使用这样的库需要告诉 Virtual DOM 的 rendering/diffing 算法：在给定的组件(或者该组件所呈现的 DOM) 中不要去撤销任何外部 DOM 的改变。

可以在组件中定义一个 shouldComponentUpdate() 方法并让其返回值为 fasle：

```javascript
class Block extends Component {
  shouldComponentUpdate = () => false;
}
```

有了这个生命周期的钩子（shouldComponentUpdate），并**告诉 Preact 当 VDOM tree 发生状态改变的时候, 不要去再次渲染该组件**。这样**组件就有了一个自身的根 DOM** 元素的引用。你**可以把它当做一个静态组件**，直到被移除。因此，任何的组件引用都可以简单通过 this.base 被调用，并且对应从 render() 函数返回的根 JSX 元素。

### 性能监控

Preact 很适用于 PWA，它也可以与许多其他工具和技术一起使用以进一步提升和监控性能，

1. [**webpack的代码拆分按需加载**](https://webpack.github.io/docs/code-splitting.html) 来分解代码，以便**只发送用户页面需要的代码**。根据需要延迟加载其余部分可提高页面加载时间。
2. [**Service Worker 缓存**](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)允许**离线缓存应用程序中的静态和动态资源**，实现即时加载和重复访问时更快的交互性。使用[sw-precache](https://github.com/GoogleChrome/sw-precache#wrappers-and-starter-kits)或[offline-plugin](https://github.com/NekR/offline-plugin)完成此操作。
3. [**PRPL**](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)鼓励**向浏览器预先推送或预加载资源**，从而加快后续页面的加载速度。它基于代码拆分和 SW 缓存。
4. [**Lighthouse**](https://github.com/GoogleChrome/lighthouse/)允许你**审计（监控）渐进式 Web 应用程序的性能和最佳实践**，因此你能知道你的应用程序的表现情况。



### 把React替换为Preact

两种方式：
（1）安装 preact-compat
（2）把 React 的入口替换为 preact，并解决代码冲突

### 优缺点

优点：

1.接近于实质：Preact 实现了一个可能是最薄的一层虚拟 DOM。它将虚拟 DOM 与 DOM 本身区别开，注册真实的事件处理函数，很好地与其它库一起工作。

2.小体积、轻量：大多数 UI 框架相当大，在应用程序js代码中占比较高。Preact却足够小，你的业务代码，是应用程序中最大的部分。**preact本身的bundle在gzip压缩后大概只有3kb，比React小很多**。更少js代码的加载，解析和执行，可以有效的提升应用的性能与体验。

3.快速、高性能：Preact 是快速的，不仅因为它的体积，**一个更简单和可预测的 diff 实现**，使它成为最快的虚拟 DOM 框架之一。它也包含**额外的性能优化特性**，如：批量自定义更新，可选的异步渲染，DOM 回收和通过关连状态优化的事件处理等。

4.易于开发和生产：在不需要牺牲生产力的前提，preact包含了有一些额外而便捷的功能以使得开发更简单高效，如：

props, state 和 context 可以被传递给 render()；
**可使用标准的 HTML 属性**，如 class 和 for；
可使用 React 开发工具等。

5.与react生态兼容：可以无缝使用 React 生态系统中可用的数千个组件。增加一个简单的兼容层 preact-compat 到绑定库中，甚至可以在系统中使用非常复杂的 React 组件。

6.可以很容易的和[PWA（渐进式 Web 应用程序）](https://developers.google.com/web/progressive-web-apps/)配合工作，提供更好的用户体验：PReact官方的脚手架[preact-cli](https://github.com/developit/preact-cli)可以直接快速的构建一个PReact的渐进式 Web 应用程序。使得页面在加载的 [5 秒内就进行交互](https://infrequently.org/2016/09/what-exactly-makes-something-a-progressive-web-app/)。

### 与react对比

