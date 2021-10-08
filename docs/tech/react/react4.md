---
title: React（四）
date: 2020-06-02 21:40:33
categories: IT
tags: IT，Web,Node，React
toc: true
thumbnail: 
---

​      前端框架，快速开发页面，函数式编程，与后端api快速搭建

<!--more-->

## Redux

Facebook 有一个 Flux 的实现，但是我们会使用 Redux 库。 它使用相同的原理，但是更简单一些。 Facebook 现在也使用 Redux 而不是原来的 Flux

### 基本概念

redux中概念：

Store:储存state的地方，通过createStore方法创建store

Action:应用中的各种操作或动作，不同的操作会改变相应的state状态

Reducer:按照action更新state

Store.getState():获取整个状态数据对象

store.dispatch():分发Action

store.subscribe():设置监听函数，一旦state变化就会自动执行

以图书馆举例，react component就是一个要借书的用户，当你向图书馆借书时跟图书管理员说要什么书，这个语境就是Action Creators，图书馆的管理员就是store，负责数据状态的管理，图书馆收到请求后向图书系统中查询，这个系统就是Reducers。

安装

```js
yarn add redux
```

新建reducer.js

```js

```

新建store.js

```js
import { } from 'redux'

```

action.js

```javascript
const action = {
   type:'ADD_TODO',
   payload:'Learn Redux'
}
```

监听

```javascript
import {createStore} from 'redux'
const store = createStore(reducer);

store.subscribe(listener)
```

action发出后reducer立即执行即为同步，一段时间后执行为异步

对于异步，



### React-redux

react-redux提供connet方法，用于从UI组件生成容器组件，

```javascript
import {connet} from 'react-redux'

const VisibleTodoList = connect(
   mapStateToProps,
   mapDispatchToProps
)(TodoList)
```

connet生成容器之后，需要让容器组件拿到state对象，react-redux提供Provider组件让容器拿到state

```javascript
import {Provider} from 'react-redux'
import {createStore} from 'redux'

render(
 <Provider store= {store}>
  <App />
  </Provider>
)
```

### 中间件

redux-saga

功能类似redux-thunk，用于异步action，原理是通过generator函数，相比于thunk更复杂一些，集中处理了action，支持dispatch后的回调。



redux-thunk

用于异步action，允许你的action可以返回函数, 带有dispatch和getState两个参数, 在这个action函数里, 异步的dispatch action;



redux-logger

在控制台打印redux过程，类似的也可以按redux文档示范的中间件，但是感觉logger的颜色更好看



redux-persist

实现数据持久化，自动存入localStorage，配置略麻烦

### 文档

Https://cn.redux.js.org



## mobx

mobx与redux相比：

- 函数式 VS 面向对象
- redux 需要 connect，也需要 Immutable Data，reducer，action，文件、代码量较多，概念也多。 mobx 直接引用对象组织，修改数据。
- redux 数据流动很自然，任何 dispatch 都会导致广播，需要依据对象引用是否变化来控制更新粒度。mobx 数据流流动不自然，只有用到的数据才会引发绑定，局部精确更新，但免去了粒度控制烦恼。
- redux 有时间回溯，每个 action 都被记录下来，可预测性，定位错误的优势。mobx 只有一份数据引用，不会有历史记录。
- redux 引入中间件去解决异步操作，以及很多复杂的工作。mobx 没有中间件，数据改了就是改了，没有让你增加中间件的入口。

为什么用mobx

- 简单，概念，代码少
- class 去定义、组织 store，数据、computed、action 定义到一块，结构更清晰，面向对象的思维更适合快速的业务开发
- 某个 store 的引用不一定非在组件中才能取到，因为是对象，可以直接引用。比如在 constant.js 文件中可以定义一些来自 store 的变量。
- 据说效率更高。mobx 会建立虚拟推导图 (virtual derivation graph)，保证最少的推导依赖

### 基本概念

Observable state

给数据对象添加可观测的功能，支持任何数据结构。

Computed values

某个 state 发生变化时，需要自动计算的值。比如说单价变化，总价的计算

Reactions

Reactions 和 Computed 类似，都是 state 变化后触发。但它不是去计算值，而是会产生副作用，比如 console、网络请求、react dom 更新等。mobx 提供了三个函数用于自定义 reactions。

Actions



### mobx与redux的不同

redux与mobx的相同点：

1.统一维护管理状态应用

2.某一状态只有一个可信状态数据来源store

3.操作更新状态方式统一，并且可控，

4.支持将store与React组件连接，如react-redux、mobx-react

不同点：

1.Redux更多的是遵循函数式编程思想，比如reducer就是一个纯函数，mobx设计更多偏向于面向对象编程和响应式编程，通常将状态包装成一个可观察对象，使用可观察对象的能力，一旦状态对象变更，就能自动获得更新

2.redux总是将所有共享的应用数据集中在一个大的store中，而mobx则通常按模块将应用状态划分，在多个独立的store中管理

3.Redux默认以Javascript原生对象存储数据，Mobx使用可观察对象，Redux需要手动追踪所有状态对象的变更，Mobx可以监听可观察对象，当其变更时自动触发监听。

4.Redux中的对象通常是不可变的，我们不能直接操作状态对象，而总是在原来状态对象基础上返回一个新的状态对象，这样就能方便地返回应用上一状态，而mobx可以直接使用新值更新状态对象

5.连接组件使用react-redux和mobx-react。react-redux中提供Provider负责将Store注入react应用，使用connect负责将store state注入容器组件，并选择特定状态作为容器组件props传递。在mobx-react中，使用Provider将所有store注入应用，使用inject将特定store注入特定组件，然后使用Observer保证组件能响应store中的可观察对象变更，即store更新

mobx异步action不需要配置，redux则需要中间件redux-sage或者redux-thunk

选择mobx可能的原因：

1。学习成本低，不需要很多配置。

2.面向对象编程。mobx支持面向对象编程，也支持函数式，redux只支持函数式

3.模版代码少。

不选择mobx可能的原因：

1.过于自由

2.可扩展性、可维护性。mobx不适用于大型项目，需要手动约定规范

https://github.com/sunyongjian/blog/issues/28

## Recoil

`Recoil` 本身就是为了解决 `React` 全局数据流管理的问题，采用分散管理原子状态的设计模式。

`Recoil` 提出了一个新的状态管理单位 `Atom`，它是可更新和可订阅的，当一个 `Atom` 被更新时，每个被订阅的组件都会用新的值来重新渲染。如果从多个组件中使用同一个 `Atom` ，所有这些组件都会共享它们的状态。

可以把`Atom` 想象为为一组 `state` 的集合，改变一个 `Atom` 只会渲染特定的子组件，并不会让整个父组件重新渲染。

使用 `Redux、Mobx` 当然可以，并没有什么问题，主要原因是它们本身并不是 `React` 库，我们是借助这些库的能力来实现状态管理。像 `Redux` 它本身虽然提供了强大的状态管理能力，但是使用的成本非常高，你还需要编写大量冗长的代码，另外像异步处理或缓存计算也不是这些库本身的能力，甚至需要借助其他的外部库。

并且，它们并不能访问 `React` 内部的调度程序，而 `Recoil` 在后台使用 `React` 本身的状态，在未来还能提供并发模式这样的能力。

使用实例

初始化

```react
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
```

定义状态

`Atom` 是一种新的状态，但是和传统的 `state` 不同，它可以被任何组件订阅，当一个 `Atom` 被更新时，每个被订阅的组件都会用新的值来重新渲染。

定义atom

```react
export const nameState = atom({
  key: 'nameState',
  default: 'ConardLi'
});
```

这种方式意味着你不需要像 `Redux` 那样集中定义状态，可以像 `Mobx` 一样将数据分散定义在任何地方。

要创建一个 `Atom` ，必须要提供一个 `key` ，其必须在 `RecoilRoot` 作用域中是唯一的，并且要提供一个默认值，默认值可以是一个静态值、函数甚至可以是一个异步函数。

订阅和更新状态

`Recoil` 采用 `Hooks` 方式订阅和更新状态，常用的是下面三个 API：

`useRecoilState`：类似 useState 的一个 `Hook`，可以取到 `atom` 的值以及 `setter` 函

`useSetRecoilState`：只获取 `setter` 函数，如果只使用了这个函数，状态变化不会导致组件重新渲染

`useRecoilValue`：只获取状态

```react
import { nameState } from './store'
// useRecoilState
const NameInput = () => {
  const [name, setName] = useRecoilState(nameState);
  const onChange = (event) => {
   setName(event.target.value);
  };
  return <>
   <input type="text" value={name} onChange={onChange} />
   <div>Name: {name}</div>
  </>;
}

// useRecoilValue
const SomeOtherComponentWithName = () => {
  const name = useRecoilValue(nameState);
  return <div>{name}</div>;
}

// useSetRecoilState  
const SomeOtherComponentThatSetsName = () => {
  const setName = useSetRecoilState(nameState);
  return <button onClick={() => setName('Jon Doe')}>Set Name</button>;
}
```

派生状态

`selector` 表示一段派生状态，它使我们能够建立依赖于其他 `atom` 的状态。它有一个强制性的 `get` 函数，其作用与 `redux` 的 `reselect` 或 `MobX` 的 `@computed` 类似。

```react
const lengthState = selector({
  key: 'lengthState', 
  get: ({get}) => {
    const text = get(nameState);
    return text.length;
  },
});

function NameLength() {
  const length = useRecoilValue(charLengthState);
  return <>Name Length: {length}</>;
}
```

selector 是一个纯函数：对于给定的一组输入，它们应始终产生相同的结果（至少在应用程序的生命周期内）。这一点很重要，因为选择器可能会执行一次或多次，可能会重新启动并可能会被缓存。

异步状态

`Recoil` 提供了通过数据流图将状态和派生状态映射到 `React` 组件的方法。真正强大的功能是图中的函数也可以是异步的。这使得我们可以在异步 `React` 组件渲染函数中轻松使用异步函数。使用 `Recoil` ，你可以在选择器的数据流图中无缝地混合同步和异步功能。只需从选择器 `get` 回调中返回 `Promise` ，而不是返回值本身。

```react
const userNameQuery = selector({
  key: 'userName',
  get: async ({get}) => {
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    });
    return response.name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(userNameQuery);
  return <div>{userName}</div>;
}
```

`Recoil` 推荐使用 `Suspense`，`Suspense` 将会捕获所有异步状态，另外配合 `ErrorBoundary` 来进行错误捕获：

```react
function MyApp() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CurrentUserInfo />
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
```

`Recoil` 推崇的是分散式的状态管理，这个模式很类似于 `Mobx`，使用起来也感觉有点像 `observable + computed` 的模式，但是其 API 以及核心思想设计的又没有  `Mobx` 一样简洁易懂，反而有点复杂，对于新手上手起来会有一定成本。

在使用方式上完全拥抱了函数式的 `Hooks` 使用方式，并没有提供 `Componnent` 的使用方式，目前使用原生的 `Hooks API` 我们也能实现状态管理，我们也可以使用 `useMemo` 创造出派生状态，`Recoil` 的 `useRecoilState` 以及 `selector` 也比较像是对 `useContext、useMemo` 的封装。

但是毕竟是 `Facebook` 官方推出的状态管理框架，其主打的是高性能以及可以利用 `React` 内部的调度机制，包括其承诺即将会支持的并发模式，这一点还是非常值得期待的。

另外，其本身的分散管理原子状态的模式、读写分离、按需渲染、派生缓存等思想还是非常值得一学的

https://juejin.cn/post/6881493149261250568#heading-2

## Rematch

https://rematchjs.org/docs

rematch是基于redux的状态管理框架，但是比redux简便很多。

rematch是没有boilerplate的Redux最佳实践，没有多余的action type，action creators、switch语句或者chunks

也就是说，rematch移除了redux中所需要的一些东西，并用更简单的方式替代了它们：

声明action类型、action创建函数、thunks、sagas、store配置、mapDispatchToProps

安装

```shell
npm install @rematch/core
```

rematch中的概念：

状态数据：state

改变state：reducer

异步action：effects with async/await

如何触发reducer和effects：不需编写action type或者action creator，dispatch标准化了action

创建state、model

```react
import { createModel } from '@rematch/core'

export const count = createModel({
  state:0,
  reducer:{
    upBy:(state,payload) => state + payload
  },
  effects:{
    async asyncGetAppInfo() {
      await console.log(2);
    }
  }
})
```

在组件中使用

```react
import { connect } from 'react-redux'

//Component

const mapStateToProps = (state) =>({
  count: state.count
})

const mapDispatchToProps = (dispatch) => ({
  countUpBy: dispatch.count.upBy
})

connect(mapStateToProps,mapDispatchToProps)(Component)
```

对比redux中

先创建action type

```react
export const COUNT_UP_BY = 'COUNT_UP_BY'
```

再创建action creator

```javascript
import { COUNT_UP_BY } from '../types/counter'

export const countUpBy = (value) => ({
  type: COUNT_UP_BY,
  payload: value,
})
```

创建reducer

```react
import { COUNT_UP_BY } from '../types/counter'

const initialState = 0

export default (state = initialState,action) => {
  switch (action.type){
    case COUNT_UP_BY:
      return state + action.paylaod
    default return state
  }
}
```

在模块中使用

```react
import { countUpBy } from '../actions/count'
import { connect } from 'react-redux'

//Component

const mapStateToProps = (state) => ({
  count: state.count
})

connect(mapStateToProps,{countUpBy})(Component)
```





demo地址：https://Xrr2016.github.io/rematch-todoså

### 其他插件



## redux-toolkit

**Redux工具包** 致力于成为编写 Redux 逻辑的标准方式。它最初是为了帮助解决有关 Redux 的三个常见问题而创建的：

- "配置一个 Redux store 过于复杂"
- "做任何 Redux 的事情我都需要添加很多包"
- "Redux 需要太多的样板代码"

包括以下api

configureStore(): 包装 createStore 以提供简化的配置选项和良好的默认预设。它可以自动组合你的切片 reducers，添加您提供的任何 Redux 中间件，默认情况下包含 redux-thunk ，并允许使用 Redux DevTools 扩展。

createReducer(): 为 case reducer 函数提供 action 类型的查找表，而不是编写switch语句。此外，它会自动使用immer 库来让您使用普通的可变代码编写更简单的 immutable 更新，例如 state.todos [3] .completed = true 。

createAction(): 为给定的 action type string 生成一个 action creator 函数。函数本身定义了 toString()，因此它可以用来代替 type 常量。

createSlice(): 接受一个 reducer 函数的对象、分片名称和初始状态值，并且自动生成具有相应 action creators 和 action 类型的分片reducer。

createAsyncThunk: 接受一个 action type string 和一个返回 promise 的函数，并生成一个发起基于该 promise 的pending/fulfilled/rejected action 类型的 thunk。

createEntityAdapter: 生成一组可重用的 reducers 和 selectors，以管理存储中的规范化数据
createSelector 组件 来自 Reselect 库，为了易用再导出。





## react-query

React Query 无疑是管理服务器状态的最佳库之一。它非常好用，**开箱即用，无需配置**，并且可以随着应用的增长而根据自己的喜好**进行定制**。

React Query 使您可以击败并征服棘手的服务器状态挑战和障碍，并在开始控制您的应用数据之前对其进行控制。

安装

```shell
npm i react-query
```

代码示例

```react
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { getTodos, postTodo } from '../my-api'

// 创建一个 client
const queryClient = new QueryClient()

function App() {
  return (
    // 提供 client 至 App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function Todos() {
  // 访问 client
  const queryClient = useQueryClient()

  // 查询
  const query = useQuery('todos', getTodos)

  // 修改
  const mutation = useMutation(postTodo, {
    onSuccess: () => {
      // 错误处理和刷新
      queryClient.invalidateQueries('todos')
    },
  })

  return (
    <div>
      <ul>
        {query.data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

render(<App />, document.getElementById('root'))
```





## rtk-query





## ES-lint

react的代码规范库

```shell
yarn add eslint eslint-plugin-react
```

如果是typescript项目按照ts相关插件

```shell
yarn add @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

使用yarn eslint --lint向导来完成配置，或者手动创建eslintrc。json填入如下配置

```json
{
  "extends": ["eslint:recommended","plugin:react/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["react","@typescript-eslint"],
  "rules": {
    "react/self-closing-comp": ["error"] //组件无内容时自闭合
  }
}
```

在vscode中配置

```json
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact"
]
```

## react的Ts写法

### 泛型组件



```react
//泛型ts组件
function Foo<T>(props: Props<T>){
  return <div>{props.content}</div>
}

const App = () => {
  return (
  	<div className="App">
      <Foo content={42}></Foo>
      <Foo<string> content={"hello"}></Foo>
    </div>
  )
}
        
//普通ts组件
interface Props {
	content: string;          
}
        
function Foo(props: Props) {
	return <div>{props.content}</div>          
}
        
const App = () => {
  return (
  	<div className="App">
      // Type number not assignable to type string
      <Foo content={42}></Foo>
      <Foo<string> content={"hello"}></Foo>
    </div>
  )
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

### 二维码

QR Code数据表示方法 : 深色模块表示二进制"1"，浅色模块表示二进制"0"。

纠错能力:

- L级：约可纠错7%的数据码字；
- M级：约可纠错15%的数据码字；
- Q级：约可纠错25%的数据码字；
- H级：约可纠错30%的数据码字；

使用qrcode.react npm包

安装

```shell
npm install qrcode.react
```

api

| prop          | type                     | default value |
| ------------- | ------------------------ | ------------- |
| value         | string                   |               |
| renderAs      | string ('canvas' 'svg')  | 'canvas'      |
| size          | number                   | 128           |
| bgColor       | string (CSS color)       | "#FFFFFF"     |
| fgColor       | string (CSS color)       | "#000000"     |
| level         | string ('L' 'M' 'Q' 'H') | 'L'           |
| includeMargin | boolean                  | false         |
| imageSettings | object (see below)       |               |

图片设置参数imageSettings

| field    | type    | default value     |
| -------- | ------- | ----------------- |
| src      | string  |                   |
| x        | number  | none, will center |
| y        | number  | none, will center |
| height   | number  | 10% of size       |
| width    | number  | 10% of size       |
| excavate | boolean | false             |

示例代码

```react
<QRCode
  id="qrCode"
  value={"https://gongyi.m.jd.com/oneDetails.html?id=930"}
  imageSettings={{
    // 中间有图片logo
    src: `http://img13.360buyimg.com/imagetools/jfs/t1/203384/29/6713/37826/6142ef39E5f79ed2b/47200134bf8d0571.jpg`,
    height: 30,
    width: 30,
    excavate: true,
  }}
  size={99} // 二维码的大小
  fgColor="#000000" // 二维码的颜色
/>
//转换为图片
changeCanvasToPic = () => {
    const canvasImg = document.getElementById('qrCode'); // 获取canvas类型的二维码
    const img = new Image();
    img.src = canvasImg.toDataURL('image/png'); 
// canvas.toDataUrl() 可以将canvas格式的文件转换成基于base64的指定格式的图片
// 注意这个api ie9以下不支持    
    const downLink = document.getElementById('down_link');
    downLink.href = img.src;
    downLink.download = '二维码'; //下载图片name
  };
//定时刷新
//定时刷新功能是使用 setInterval 定时更新 value 值来更新二维码，跳转地址后面拼上一个radomCode, radomCode定时更新，就实现二维码的刷新了，需要及时清理定时器。
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

Upload

```react

```



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



```react
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

class DraggableTags extends Component {
  render() {
    return (
    	<DragDropContext onDragEnd={this.onDragEnd}>
      	<Droppable droppableId="droppable" direction="horizontal">
          {(provided, _snapshot)=> (
            <Draggable>
							{(provided, _snapshot)=> (
              	style={
                  
                }
              )}
            </Draggable>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
```





### react-dnd



Https://juejin.cn/post/6933036276660731912　



### react-intl-universal

不建议使用react-intl，而使用React-intl-universal实现

建立英文和中文语言包,可以是json或者js文件

```javascript
const en_US = {
  'hello':'nihao',
  'name': 'zhangsan',
  'age': '30',
  'changelang': 'qiehuanyuyan',
}

export default en_US
```

中文包

```js
const zh_CN = {
  'hello':'nihao',
  'name': 'zhangsan',
  'age': '30',
  'changelang': 'qiehuanyuyan',
}

export default zh_CN
```

使用

```react
import intl from 'react-intl-universal'
import cn from '../../assets/locals/zh-CN'
import us from '../../assets'

class IntlExample extends React.Component{
  constructor(){
    super();
    this.locals = {
      'zh_CN': cn,
      'en_US': us
    }
    this.state = {
      intl: cn
    }
  }
  
  componentDidMount() {
    this.initLocale();
  }
  initLocale(locale="zh_CN"){
    
  }
}
```

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


