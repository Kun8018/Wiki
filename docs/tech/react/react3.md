---
title: React（三）
date: 2020-06-02 21:40:33
categories: IT
tags: IT，Web,Node，React
toc: true
thumbnail: 
---

​      前端框架，快速开发页面，函数式编程，与后端api快速搭建

<!--more-->

## React原理

### setState原理

setState的执行过程：

1.将setState传入的`partialState`参数存储在当前组件实例的state暂存队列中。

2.判断当前React是否处于批量更新状态，如果是，将当前组件加入待更新的组件队列中。

3.如果未处于批量更新状态，将批量更新状态标识设置为true，用事务再次调用前一步方法，保证当前组件加入到了待更新组件队列中。

4.调用事务的`waper`方法，遍历待更新组件队列依次执行更新。

5.执行生命周期`componentWillReceiveProps`。

6.将组件的state暂存队列中的`state`进行合并，获得最终要更新的state对象，并将队列置为空。

7.执行生命周期`componentShouldUpdate`，根据返回值判断是否要继续更新。

8.执行生命周期`componentWillUpdate`。

9.执行真正的更新，`render`。

10.执行生命周期`componentDidUpdate`。

### setState的异步同步

有时表现出异步,有时表现出同步

`setState`只在合成事件和钩子函数中是“异步”的，在原生事件和`setTimeout` 中都是同步的。

`setState` 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 `setState(partialState, callback)` 中的`callback`拿到更新后的结果。

在`react`的生命周期和合成事件中，`react`仍然处于他的更新机制中，这时`isBranchUpdate`为true。

按照上述过程，这时无论调用多少次`setState`，都会不会执行更新，而是将要更新的`state`存入`_pendingStateQueue`，将要更新的组件存入`dirtyComponent`。

当上一次更新机制执行完毕，以生命周期为例，所有组件，即最顶层组件`didmount`后会将`isBranchUpdate`设置为false。这时将执行之前累积的`setState`。

`setState` 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次`setState`，`setState`的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时`setState`多个不同的值，在更新时会对其进行合并批量更新。

也就是说，一个方法里需要多次调用setState，setState了很多次，然后render（）只调用了一次

原因：

React会将多个this.setState产生的修改放在一个队列里，缓一缓，攒在一起，觉得差不多了再引发一次更新过程。

react为了提高整体的渲染性能，会将一次渲染周期中的state进行合并，在这个渲染周期中你对所有setState的所有调用都会被合并起来之后，再一次性的渲染，这样可以避免频繁的调用setState导致频繁的操作dom，提高渲染性能。具体的实现方面，可以简单的理解为react中存在一个状态变量isBatchingUpdates，当处于渲染周期开始时，这个变量会被设置成true，渲染周期结束时，会被设置成false，react会根据这个状态变量，当出在渲染周期中时，仅仅只是将当前的改变缓存起来，等到渲染周期结束时，再一次性的全部render。

```text
1.调用setState不会立即更新
2.所有组件使用的是同一套更新机制，当所有组件didmount后，父组件didmount，然后执行更新
3.更新时会把每个组件的更新合并，每个组件只会触发一次更新的生命周期。
```



#### setstate更新数组

对于数组和对象这种引用类型的数据，setstate只能改变引用地址，改变时只能用新的对象或者数组赋值，不能直接在原对象上改

可以使用原生js或者react官方推荐immutablejs更新数组

实例

```react
//错误例子
var list = [1];
list.push(2)
//list对象已经变化，然而引用的值依然还是同一个引用

//正确更新数组
var list = this.state.list;
this.setState({
  list:list.concat('otherData')
})

this.setState({
  list:[...list,'otherData']
})

//正确更新对象
//使用object.assign方法
var user = this.state.user;
this.setState({
  user.Object.assign({},user,{age:18})
})
//使用对象拓展语法
var user = this.state.user;
this.setState({
  user:{...user,age:18}
})
```

ImmutableJS更新数组

#### 连续调用setstate只有一次生效

实例1

```react
componentDidMount() {
    this.setState({ index: this.state.index + 1 }, () => {
      console.log(this.state.index);
    })
    this.setState({ index: this.state.index + 1 }, () => {
      console.log(this.state.index);
    })
}
//输出
1
1
```

实例2

```react
componentDidMount() {
    this.setState((preState) => ({ index: preState.index + 1 }), () => {
      console.log(this.state.index);
    })
    this.setState(preState => ({ index: preState.index + 1 }), () => {
      console.log(this.state.index);
    })
}
//输出
2
2
```

原因：

- 1.直接传递对象的`setstate`会被合并成一次
- 使用函数传递`state`不会被合并

#### setstate自动触发两次

严格模式下，

#### 定时器中的setstate

定时器中的 setState，每次都会引起新的 render，即使是同一个定时器中的多次 setState

因为定时器中的`setState`没走`react`的事物机制，执行时批量更新没被设置`true`，所以每次都直接 render 了。

在事件执行的时候，**当前上下文**执行的是`setTimeout`函数，但当执行`setTimeout`函数的回调时，原来的上下文已经结束了，**回调的上下文变成了 window**，所以依据的批量更新属性`isBatchingUpdates`没有被设置成`true`的过程，因此始终是`false`，因此`setState`就同步执行了。

```typescript
componentWillMount() {
    let me = this;
    setTimeout(() => {
        me.setState({
            count: me.state.count + 1
        });
        me.setState({
            count: me.state.count + 1
        });
    }, 0);
}

   componentDidMount() {
    let me = this;
    setTimeout(() => {
        me.setState({
            count: me.state.count + 1
        });
        me.setState({
            count: me.state.count + 1
        });
    }, 0);
}

onClickTime() {
    let me = this;
    setTimeout(() => {
        me.setState({
            count: me.state.count + 1
        });
        me.setState({
            count: me.state.count + 1
        });
    }, 0);
}
```

其实在回调函数中，setState 是不会触发批量更新机制的，无论是 promise，ajax，setTimeout 回调等等，同时设置多次 setState，每个 setState 都会单独执行并 render，因为上下文发生了变化。

#### 原生事件中的setstate

在按钮原生事件中定义的`setState`,和定时器效果一样，每次`setState`都会引起新的`render`

```react
componentDidMount() {
       this.button.addEventListener('click', this.onClick.bind(this, '原生事件'), false);
}

onClick(info) {
       console.log(info);
       this.setState({
           count: ++count
       });
       this.setState({
           count: ++count
       });
   }

   render() {
       console.log(this.state.count);
       return <div>
           <input type="button" ref={input => this.button = input} onClick={this.onClick.bind(this, 'React事件')} value="生成计时器" />
           <div>Count:{this.state.count}</div>
       </div>
   }
```

#### 生命周期函数调用setstate

在componentDidMount()中，你 可以立即调用setState()。它将会触发一次额外的渲染，但是它将在浏览器刷新屏幕之前发生。这保证了在此情况下即使render()将会调用两次，用户也不会看到中间状态。谨慎使用这一模式，因为它常导致性能问题。在大多数情况下，你可以 在constructor()中使用赋值初始状态来代替。然而，有些情况下必须这样，比如像模态框和工具提示框。这时，你需要先测量这些DOM节点，才能渲染依赖尺寸或者位置的某些东西。

componentWillUpdate和componentDidUpdate这两个生命周期中不能调用`setState`。

在这两个生命周期里面调用`setState`会造成死循环，导致程序崩溃。

在调用`setState`时使用函数传递`state`值，在回调函数中获取最新更新后的`state`。

### react diff算法的机制

diff算法的瓶颈

由于diff操作本身也会带来性能损耗，react文档中提到，即使在最前沿的算法中，将前后两棵树完全对比的算法的复杂程度为O(n3)，其中n是树中元素的数量

如果在react中使用了该算法，那么展示1000个元素所需要执行的计算量将在10亿范围的量级，这个开销实在太高。

为了降低算法的复杂度，react的diff预设了3个限制：

1.同级元素进行diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用

2.不同类型的元素会产生出不同的树，如果元素由div变为p，react会销毁div及其子孙节点，并新建p及其子孙节点

3.开发者可以通过prop key暗示哪些子元素在不同的渲染下能保持稳定

举个例子

```react
//更新前
<div>
   <p key="ka">ka</p>
   <h3 key="song">song</h3>
</div>
//更新后
<div>
   <h3 key="song">song</h3>
   <p key="ka">ka</p>
</div>
```

如果没有key，react会认为div的第一个子节点由p变为h3，第二个子节点由h3变为p，这符合限制2的设定，因此会销毁并重建

当用key指明了节点的前后对应关系后，react知道key="ka"的p在更新之后还存在，因此节点可以复用，只需要交换一下顺序即可



### React渲染机制(work loop)

React 16 之前的组件渲染方式是递归渲染：渲染父节点 -> 渲染子节点

递归渲染看起来十分简单，但是如果想在子节点的渲染过程中执行优先级更高的操作，只能保留调用栈中子节点的渲染及子节点之前节点的渲染，这样是很复杂的，这种调和/渲染也叫做 Stack Reconciler。

Fiber 使用链表的结构去渲染节点，每一个节点都称之为 Fiber Node，每个节点会有三个属性：

- child 指向第一个子节点
- sibling 指向兄弟节点
- return 指向父节点

Fiber 的渲染方式：从父节点开始，向下依次遍历子节点，深度优先渲染完子节点后，再回到其父节点去检查是否有兄弟节点，如果有兄弟节点，则从该兄弟节点开始继续深度优先的渲染，直到回退到根节点结束。

综上，可以分为 Scheduler、Reconciliation、Commit 这三个阶段

Scheduer 流程主要是创建更新，创建更新的方式：

- ReactDOM.render
- setState

可以发现 React 将首次渲染和更新渲染统一了起来。





### Effect Hook机制

effect hook与其他hook的行为有一些区别

effect hook的属性：

​		在渲染时被创建，在浏览器执行绘制后运行；

​		如果给出销毁指令，会在下一次绘制前被销毁；

​		会按照定义的顺序被运行

hook effect 将会被保存在 fiber 一个称为 `updateQueue` 的属性上，每个 effect 节点都有如下的结构.

- `tag` —— 一个二进制数字，它控制了 effect 节点的行为（后文我将详细说明）。
- `create` —— 绘制**之后**运行的回调函数。
- `destroy` —— 它是 `create()` 返回的回调函数，将会在初始渲染**前**运行。
- `inputs` —— 一个集合，该集合中的值将会决定一个 effect 节点是否应该被销毁或者重新创建。
- `next` —— 它指向下一个定义在函数组件中的 effect 节点。

除了 `tag` 属性，其他的属性都很简明易懂。如果你对 hook 很了解，你应该知道，React 提供了一些特殊的 effect hook：比如 `useMutationEffect()` 和 `useLayoutEffect()`。这两个 effect hook 内部都使用了 `useEffect()`，实际上这就意味着它们创建了 effect hook，但是却使用了不同的 tag 属性值。

Default effect —— `UnmountPassive | MountPassive`.

Mutation effect —— `UnmountSnapshot | MountMutation`.

Layout effect —— `UnmountMutation | MountLayout`.



### State、Reducer Hook机制

`useReducer` 和 `useState` 本质上是一个原理，虽然我们平时会使用 `useState` 更多，但事实上 `useState` 是 `useReducer` 的封装；



### Hook系统原理

Dispatcher

dispatcher 是一个包含了 hook 函数的共享对象。基于 ReactDOM 的渲染状态，它将会被动态的分配或者清理，并且它能够确保用户不可在 React 组件之外获取 hook

在切换到正确的 Dispatcher 以渲染根组件之前，我们通过一个名为 `enableHooks` 的标志来启用/禁用 hook。在技术上来说，这就意味着我们可以在运行时开启或关闭 hook。React 16.6.X 版本中也有对此的实验性实现，但它实际上处于禁用状态

当我们完成渲染工作后，我们将 dispatcher 置空并禁止用户在 ReactDOM 的渲染周期之外使用 hook。这个机制能够保证用户不会做什么蠢事

dispatcher 在每次 hook 的调用中都会被函数 `resolveDispatcher()` 解析。正如我之前所说，在 React 的渲染周期之外，这些都无意义了，React 将会打印出警告信息：**“hook 只能在函数组件内部调用”**

Hook队列

在 React 后台，hook 被表示为以调用顺序连接起来的节点。这样做原因是 hook 并不能简单的被创建然后丢弃。它们有一套特有的机制，也正是这些机制让它们成为 hook。一个 hook 会有数个属性，在继续学习之前，我希望你能牢记于心：

- 它的初始状态会在初次渲染的时候被创建。
- 它的状态可以在运行时更新。
- React 可以在后续渲染中记住 hook 的状态。
- React 能根据调用顺序提供给你正确的状态。
- React 知道当前 hook 属于哪个 fiber。

hook 还有一些附加的属性，但是弄明白 hook 是如何运行的关键在于它的 `memoizedState` 和 `next` 属性。其他的属性会被 `useReducer()` hook 使用，可以缓存发送过的 action 和一些基本的状态，这样在某些情况下，reduction 过程还可以作为后备被重复一次：

- `baseState` —— 传递给 reducer 的状态对象。
- `baseUpdate` —— 最近一次创建 `baseState` 的已发送的 action。
- `queue` —— 已发送 action 组成的队列，等待传入 reducer。

### redux-reducer

reducer为什么要是纯函数？纯函数是什么？

纯函数：对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态。

原因：Redux只通过比较新旧两个对象的存储位置来比较新旧两个对象是否相同（**浅比较**）。如果你在reducer内部直接修改旧的state对象的属性值，那么新的state和旧的state将都指向同一个对象。因此Redux认为没有任何改变，返回的state将为旧的state。两个state相同的话，页面就不会重新渲染了。



### redux中间件机制

`redux`源码只有**同步**操作，也就是当`dispatch action` 时，`state`会被立即更新。若需要引入异步数据流，[Redux官方](https://cn.redux.js.org/docs/advanced/AsyncFlow.html)则建议使用中间件来增强`createStore`的能力，它对外暴露了`applyMiddleware`函数，接受任意个中间件作为入参，返回作为`createStore`的入参的值

```react
// 引入 redux
import { createStore } from 'redux'
// 创建 store
const store = createStore(
    reducer,
    initial_state,
    //引入中间件
    applyMiddleware(middleware1, middleware2, ...)
);
```

以 `middlewareAPI` 作为中间件的入参，逐个调用传入的中间件，获取一个由“内层函数”组成的数组 `chain`

调用 `compose` 函数，将 `chain` 中的 “内层函数” 逐个组合起来，并调用最终组合出来的函数，传入 `dispatch` 作为入参

返回一个新的 `store` 对象，这个 `store` 对象的 `dispatch` 已经被改写过了

`reduce` 会将数组中的每个元素执行指定的逻辑，并将结果汇总为单个返回值，假设有这样一个 `compose` 调用

```javascript
compose(f1,f2,f3,f4)
//会被解析为
(...args) => f1(f2(f3(f4(...args))))
```

即`f1,f2,f3,f4`这4个中间件的内层逻辑会被组合到一个函数中去，当这个函数被调用时，中间件会依次被调用

中间件的执行机制

我们知道 **任何的中间件都可以用自己的方式解析`dispatch`的内容，并继续传递`actions` 给下一个中间件**。但注意：当最后一个中间件开始 `dispatch action` 时，`action` 必须是一个普通对象，因为这是同步式的 `Redux` 数据流 开始的地方。

`redux-thunk`源码层面可知道，它主要做的一件事就是 拦截到`action`后，检查它是否是一个函数

- 若是函数，则执行它并返回执行的结果
- 若不是函数，则直接调用`next`，工作流继续往下走

中间件的工作模式：

- 中间件的执行时机：在`action`被分发之后、`reducer`触发之前
- 中间件的执行前提：`applyMiddleware`函数对`dispatch`函数进行改写，使得`dispatch`触发`reducer`之前，执行`Redux`中间件的链式调用。

### Redux compose实现

compose就是执行一系列的任务（函数），比如有以下任务队列

```javascript
let tasks = [step1, step2, step3, step4]
```

每一个step都是一个步骤，按照步骤一步一步的执行到结尾，这就是一个**compose**

compose在函数式编程中是一个很重要的工具函数，在这里实现的compose有三点说明

- 第一个函数是多元的（接受多个参数），后面的函数都是单元的（接受一个参数）
- 执行顺序的自右向左的
- 所有函数的执行都是同步的

用代码解释

```javascript
import {componse} from 'redux'
function add1(str) {
	return 1 + str;
}
function add2(str) {
	return 2 + str;
}
function sum(a, b) {
	return a + b;
}
let str = compose(add1,add2,add3)('x','y')
console.log(str)
//输出结果 '12xy'
```





### 利用context api实现redux

https://segmentfault.com/a/1190000023142285



### React-router原理

`React-Router`中的3个核心角色：

导航：负责触发路径的改变，比如 `Link`、`NavLink` 和 `Redirect`（以`Link`为代表）

路由：负责定义路径与组件之间的映射关系，比如`Route`和`Switch`（以`Route`为代表）

路由器：为新的路径匹配它对应的逻辑，比如`BrowserRouter`和`HashRouter`，根据`Route`定义出来的映射关系

负责感知路由的变化并作出反应的路由器，是整个路由系统中最为重要的一环。在`React-Router`中支持两种路由规则：`HashRouter`和`BrowserRouter`分别对应了`hash`和`history`两种背后模式，

在react-router源码中，HashRouter 调用 `createHashHistory`，History调用`createBrowserHistory`

`createHashHistory`通过使用hash tag(#) 来处理形如`https://www.huamu.com/#index`的 URL，即通过 URL 的 hash 属性来控制路由跳转

`createBrowserHistory` 它将在浏览器中使用 HTML 5 的 history API 来处理形如 `https://www.huamu.com/index`的 URL，即通过 HTML 5的 history API 来控制路由跳转

### 手写自定义hook，实现切换状态

```react
function SomeComponent() {
  const [state, toggleState] = useToggle(false);
  return <div>
    {state ? 'true' : 'false'}
    <button onClick={toggleState}></button>
  </div>
}

// 请实现 useToggle
function useToggle(initialValue) {
    const [value, setValue] = useState(initialValue);
    const toggle = () => {setValue(!value)};
    return [value, toggle];
}
```



## React优化

https://juejin.cn/post/6935584878071119885

### 懒渲染react-visibility-observer

当组件进入可视区域才渲染组件，如modal/drawer这种需要用户操作才会出现的组件。

使用react-visibility-observer监听

```react
import VisibilityObserver,{useVisibilityObserver,} from "react-visibility-observer"

const VisibilityObserverChildren = ({callback,children}) =>{
  const {isVisible} = useVisibilityObserver()
  useEffect(()=>{
    callback(isVisible)
  },[callback,isVisible])
  
  return <>{children}</>
}
```



## react库

### react-helmet

React Helmet是一个HTML文档head管理工具，管理对文档头的所有修改。React Helmet采用纯HTML标记并输出纯HTML标记，非常简单，对react初学者友好

特点：

支持所有有效的head标签，title、base、meta、link、script、noscript和style

支持body、html和title的属性

支持服务端渲染

嵌套组件覆盖重复的head标签修改

同一组件中定义时将保留重复的head标签修改(比如“apple-touch-icon”)

支持跟踪DOM更改的回调

安装

```shell
npm i react-helmet
```

使用

```react
import {Helmet} from "react-helmet"

class Application extends React.Component {
  render(){
   return(
      <div className="application">
        <Helmet>
          <meta charSet="utf-8"/>
          <title>My title</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Child>
       			<Helmet>
                <title>new Title</title>
            </Helmet>
       </Child>
      </div>
   )
  }
}
```

上面代码中，后面的helmet会覆盖前面的helmet

服务端渲染时，需要在ReactDOMServer.renderToString或ReadDOMServer.renderToStaticMarkup后调用Helmet.renderStatic()来获得你预渲染的head数据

```react
ReactDOMServer.renderToString(<Handler />);
const helmet = Helmet.renderStatic();
```

### 使用antd

Ant-Design是蚂蚁金服开发的面向React和Vue的类似于bootstrap的框架，官网链接为：https://ant.design/index-cn

安装包

```node
npm install antd --save
cnpm i antd -S
```



在App.css文件中导入样式

```node
@import '~antd/dist/antd.css';
```



按需导入包

```node
import {  } from 'antd';

```



组件



### GraphQL

Apollo是基于GraphQL的全栈解决方案集合，包括了apollo-client和apollo-server，从后端到前端提供了对应的lib使得开发GraphQL更加方便

```js
apollo-boost 包含启动阿波罗客户端的所有依赖
react-apollo 视图层面的集合
graph-tag 解析查询语句
graphql 也是解析查询语句
```



```react
import ApolloClient from 'apollo-boost' 

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
})

import { ApolloProvider,Query } from 'react-apollo'
import { Mutation,MutationFunc } from 'react-apollo'

```



```react
npm install @apollo/client graphql
```



使用hooks



### eventbus

安装

```shell
yarn add events
```



```javascript
//event.ts
import {EventEmitter} from 'events'
export default new EventEmitter()

//发布
import emitter from './event'

class Father extends React.Component {
  constructor(props){
    super(props)
  }
  handleClick = () =>{
    emitter.emit('info','来自father的info')
  }
}

export default Father
//订阅
//emitter.addListener()事件监听订阅
//emitter.removeListener()进行事件销毁，取消订阅
import emitter from './event'

class Son extends React.Component {
  constructor(props){
    super(props)
  }
}
```



### react-beautiful-dnd





### react-dnd



Https://juejin.cn/post/6933036276660731912　



### react-intl-universal

React-intl-universal实现



### react-hot-loader

React-Hot-Loader 使用了 Webpack HMR API，针对 React 框架实现了对单个 component 的热替换，并且能够保持组件的 state。
React-Hot-Loader 在编译时会在每一个 React component 外封装一层，每一个这样的封装都会注册自己的 module.hot.accept 回调，它们会监听每一个 component 的更新，在当前 component 代码更新时只替换自己的模块，而不是整个替换 root component。
同时，React-Hot-Loader 对 component 的封装还会代理 component 的 state，所以当 component 替换之后依然能够保持之前的 state。

安装

```shell
npm install --save-dev react-hot-loader
```

 hot-loader 是基于 webpack-dev-server，所以还得安装 webpack-dev-server

```shell
npm install --save-dev webpack-dev-server
```

首先还是要让 webpack-dev-server 打开。

```javascript
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/')
});
```

然后在 webpack 的配置文件里添加 react-hot-loader。

```javascript
var webpack = require('webpack');

module.exports = {
  // 修改 entry
  entry: [
    // 写在入口文件之前
    "webpack-dev-server/client?http://0.0.0.0:3000",
    "webpack/hot/only-dev-server",
    // 这里是你的入口文件
    "./src/app.js",
  ],
  output: {
    path: __dirname,
    filename: "build/js/bundle.js",
    publicPath: "/build"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // 在这里添加 react-hot，注意这里使用的是loaders，所以不能用 query，应该把presets参数写在 babel 的后面
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
      }
    ]
  },
  // 添加插件
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
```



### uuid

uuid是通用唯一识别码(Universally Unique Identifier)的缩写。是一种软件建构辨准，亦为开发软件基金会组织在分布式计算环境领域的一部分。其目的是让分布式系统中的所有元素具有唯一的辨识信息，而不需要通过中央控制端来做辨识信息的指定。

UUID由一组32位数的16进制数字构成。对于UUID，就算每纳秒产生一百万个UUID，要花100亿年才会将所有UUID用完。

格式

uuid32个16进制数字用连字号分成五组来显示，所以共有36个字符

UUID版本通过M表示，当前规范有5个版本，可选值为1、2、3、4、5，这5个版本使用不同的算法，利用不同的信息产生UUID，各版本有各版本的优势，具体来说：

uuid.v1()：创建版本1(时间戳)UUID

uuid.v3()：创建版本3(md5命名空间)UUID

uuid.v4()：创建版本4(随机)UUID

uuid.v5()：创建版本5(带SHA-1的命名空间)IIOD

安装

```shell
npm install uuid 
```

使用

```javascript
import { v4 as uuidv4} from 'uuid'

uuidv4()
```

可以使用uuid进行验证登陆,未登陆状态下生产uuid

```javascript
let uuid = sessionStorage.getItem('uuid')
if(!uuid){
  sessionStorage.setItem('uuid')
}

if(getToken()){
  sessionStorage.removeItem('uuid');
}else {
  let uuid = sessionStorage.getItem('uuid');
  if(!uuid){
    sessionStorage.setItem('uuid',uuidv4());
  }
}
```







### js-cookie

cookie插件

```shell
npm install js-cookie --save
```

引用

```javascript
import Cookies from 'js-cookie'

//设置cookie
Cookies.set('name','value',{expire:7,path:''}); //7天过期
Cookies.set('name',{foo:'bar'}); //设置一个json
//获取cookie
Cookies.get('name'); //获取cookie
Cookies.get();  //读取所有cookie

//删除cookie
Cookies.remove('name'); //删除cookie
```



### react-color

react-color是一个拾色器，通过它获取颜色值

安装

```shell
npm i react-color -S
```

使用

```react
import { TwitterPicker } from 'react-dom'

function () {
  render() {
    <TwitterPicker 
      width="240px"
      
      />
  }
}
```



### react-lazyload

安装

```shell
npm install --save react-lazyload
```

懒加载图片

```react
import React from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';
import MyComponent from './MyComponent';

const App = () => {
  return (
    <div className="list">
      <LazyLoad height={200}>
        <img src="tiger.jpg" /> /*
                                  Lazy loading images is supported out of box,
                                  no extra config needed, set `height` for better
                                  experience
                                 */
      </LazyLoad>
      <LazyLoad height={200} once >
                                /* Once this component is loaded, LazyLoad will
                                 not care about it anymore, set this to `true`
                                 if you're concerned about improving performance */
        <MyComponent />
      </LazyLoad>
      <LazyLoad height={200} offset={100}>
                              /* This component will be loaded when it's top
                                 edge is 100px from viewport. It's useful to
                                 make user ignorant about lazy load effect. */
        <MyComponent />
      </LazyLoad>
      <LazyLoad>
        <MyComponent />
      </LazyLoad>
    </div>
  );
};

ReactDOM.render(<App />, document.body);
```

默认懒加载组件

```react
import { lazyload } from 'react-lazyload';

@lazyload({
  height: 200,
  once: true,
  offset: 100
})
class MyComponent extends React.Component {
  render() {
    return <div>this component is lazyloaded by default!</div>;
  }
}
```



