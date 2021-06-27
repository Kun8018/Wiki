---
title: React（二）
date: 2020-06-02 21:40:33
categories: IT
tags: IT，Web,Node，React
toc: true
thumbnail: 
---

​      前端框架，快速开发页面，函数式编程，与后端api快速搭建

<!--more-->

## React.memo 和purecomponent

reacr.memo控制函数组件的重新渲染，reacr.purecomponent控制类组件的重新渲染

使用时将函数组件传递给react.memo函数就可以

实例

```react
const Funcomponent = () =>{
  return (
     <div>
     hiya!i am a functional component!
     </div>
  )
}
const MemoFuncComponent = React.memo(Funcomponent)
```

React.memo返回英国纯组件MemoFuncComponent，jsx中将标记次组件，每当组件的props和state发生变化时，react会检查上一个props和state与下一个pros和state是否相等，不相等重新渲染，相等则不会重新渲染

类组件中即成purecomponent实现

```react
import React from 'react'
class TestC extends React.PureComponent{
   constructor(props){
     super(props);
     this.state = {
       conut: 0
     }
   }
  
  render(){
    return(
      <div>
        {this.state.count}
        <button onClick={()=>this.setState({count:1})}>
          click me
        </button>
      </div>
    )
  }
}
```

## Hook

Https://juejin.cn/post/6844903985338400782

Hook是react16.8新增的特性，可以在不编写class 的情况下使用state和其他react特性，reactnative从0.59版本开始支持hook。

### hook出现的原因以及解决的问题

Class component 劣势

1. 状态逻辑难复用：在组件之间复用状态逻辑很难，可能要用到 render props （渲染属性）或者 HOC（高阶组件），但无论是渲染属性，还是高阶组件，都会在原先的组件外包裹一层父容器（一般都是 div 元素），导致层级冗余 趋向复杂难以维护：
2. 在生命周期函数中混杂不相干的逻辑（如：在 componentDidMount 中注册事件以及其他的逻辑，在 componentWillUnmount 中卸载事件，这样分散不集中的写法，很容易写出 bug ） 类组件中到处都是对状态的访问和处理，导致组件难以拆分成更小的组件
3. this 指向问题：父组件给子组件传递函数时，必须绑定 this

Hook不能在class中使用，只能在函数组件中，为函数组件勾入react state及生命周期等函数

react内置的hook有以下

基础hook：useState、useEffect、useContext

额外的hook：useReducer、useCallback、useMemo、useRef、useLayoutEffect、useDebugValue、useImperativeHandle

### useState

实例

```jsx
import React,{useState} from 'react';

function Example() {
    const [count,setCount] = useState(0);
    
    return (
     <div>
        <p>you click {count} times</p>
        <button onClick={()=> setCount(count + 1)}>
        click    
        </button>
     </div>
    )
}
```

上述useState方法定义了一个state变量count，并给他初始化的值0。通过setCount方法更新当前count的值。

调用count时不需要绑定this直接调用，更新count时也直接调用setCount方法

usestate定义state时返回一个有两个值的数组，第一个是当前state，第二个是更新state的函数，

count与setCount与class中的this.state.count和this.setstate类似，唯一的区别是需要成对地获取他们。

如果初始化state时需要复杂计算，可以调用函数，此函数只在初次渲染时被调用

```jsx
const [state,setState] = useState(() => {
    const initialState= someExpensiveComputation(props);
    return initialState;
})
```

count与setCount与class中的this.state.count和this.setstate类似，唯一的区别是需要成对地获取他们。

可以同时声明多个state变量

```jsx
function ExamplewithManyStates(){
    const [age,setAge] = usestate(42);
    const [fruit,setFruit] = usestate('banana');
    const [todos,setTodos] = usestate([{text:'学习'}]);
}
```

Hook只能在函数最外层调用，不要在循环、条件判断或者子函数中调用

对于class中的生命周期函数，为了能在函数组件中使用类似功能，使用useEffect方法，它相当于componentDidMount、componentDidupdate、componentWillUnmount三个函数的组合

```jsx

```

### useEffect和useLayoutEffect

useEffect默认情况下会在第一次渲染之后和每次更新之后都会执行。

useEffect在全部渲染完毕后才会执行，而useLayoutEffect会在浏览器layout之后，painting之前执行

为了用户体验，一般先使用useEffect

使用步骤：

1. 作为 componentDidMount 使用，第二个参数为空数组 `[]`
2. 作为 componentDidUpdate 使用，第二个参数为指定依赖
3. 作为 componentWillUnmount 使用，通过 return

```react
const BlinkyRender = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    document.querySelector('#x').innerText = `value: 1000`
  }, [value]);

  return (
    <div id="x" onClick={() => setValue(0)}>value: {value}</div>
  );
};

ReactDOM.render(
  <BlinkyRender />,
  document.querySelector("#root")
);
```

### useReducer

useState内部就是靠useReducer实现的。

useReducer可以理解为是用来代替 Redux 的，或者说，是一个加强版的 `useState`。

使用步骤：

1.创建初始值initialState

2.创建所有操作reduce(state,action)

3.传给useReducer，得到读和写api

4.调用，写({type: '操作类型'})

```js
const initial = {
  n: 0
};

const reducer = (state, action) => {
  if (action.type === "add") {
    return { n: state.n + action.number };
  } else if (action.type === "multi") {
    return { n: state.n * 2 };
  } else {
    throw new Error("unknown type");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initial);
  const { n } = state;
  const onClick = () => {
    dispatch({ type: "add", number: 1 });
  };
  const onClick2 = () => {
    dispatch({ type: "add", number: 2 });
  };
  return (
    <div className="App">
      <h1>n: {n}</h1>

      <button onClick={onClick}>+1</button>
      <button onClick={onClick2}>+2</button>
    </div>
  );
}
```

### useContext

接受一个context对象，并返回该context的当前值，用于在函数组件之间共享状态

使用方法：

1.使用C=createContext(initial)创建上下文

2.使用<C.provider>圈定作用域

3.在作用域内使用 `useContext(C)` 来使用上下文

```react
const C = createContext(null);

function App() {
  console.log("App 执行了");
  const [n, setN] = useState(0);
  return (
    <C.Provider value={{ n, setN }}>
      <div className="App">
        <Baba />
      </div>
    </C.Provider>
  );
}

function Baba() {
  const { n, setN } = useContext(C);
  return (
    <div>
      我是爸爸 n: {n} <Child />
    </div>
  );
}

function Child() {
  const { n, setN } = useContext(C);
  const onClick = () => {
    setN(i => i + 1);
  };
  return (
    <div>
      我是儿子 我得到的 n: {n}
      <button onClick={onClick}>+1</button>
    </div>
  );
}
```

### usecallback与useMemo

useMemo时一种缓存机制提速，当他的依赖未发生改变时就不会触发重新计算，与vue中computed类似

useMemo

使用语法：useMemo(()=> fn,deps)

把创建函数和依赖项数组作为参数传入useMemo，它只会在某个依赖项改变时才重新计算memo

useMemo与usecallback的区别：`useMemo`可以缓存所有对象，`useCallback`只能缓存函数。

`useCallback(x => log(x), [m])` 等价于 `useMemo(() => x => log(x), [m])`



### useRef

主要作用是创建一个数据的引用，并让这个数据在 render 过程中始终**保持不变**。

基本语法： `const count = useRef(0)`，读取用 `count.current`

```react
export function ReactEcharts(props) {
  const {option, loading} = props
  const container = useRef(null)
  const chart = useRef(null)

  useEffect(() => {
    const width = document.documentElement.clientWidth
    const c = container.current
    console.log(c)
    c.style.width = `${width - 20}px`
    c.style.height = `${(width - 20) * 1.2}px`
    chart.current = echarts.init(c, 'dark')

  }, []) // [] - mounted on first time

  useEffect(() => {
    chart.current.setOption(option)
  }, [option]) // when option change 类似 vue 的 watch

  useEffect(() => {
    if (loading) chart.current.showLoading()
    else chart.current.hideLoading()
  }, [loading])
  return (
    <div ref={container}/>
  )
}
```

### 自定义hook混用

可以把不同的hook按照实际的需求混合起来，封装成一个新的函数使用

```react
const useList = () => {
  const [list, setList] = useState(null);
  useEffect(() => {
    ajax("/list").then(list => {
      setList(list);
    });
  }, []); // [] 确保只在第一次运行
  return {
    list: list,
    setList: setList
  };
};
export default useList;
```

### hook的使用规则

hook有以下使用规则：

1. 不要在循环，条件或嵌套函数中调用 Hook
2. 确保总是在你的 React 函数的最顶层调用他们。
3. 顺序调用。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。

在单个组件中可以使用多个 State Hook 或 Effect Hook，但是React 怎么知道哪个 state 对应哪个 `useState`？答案是 React 靠的是 Hook 调用的顺序。因为我们的示例中，Hook 的调用顺序在每次渲染中都是相同的，所以它能够正常工作。只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联。

如果在语句中使用hook

```javascript
 // 🔴 在条件语句中使用 Hook 违反第一条规则
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
```

在第一次渲染中 `name !== ''` 这个条件值为 `true`，所以我们会执行这个 Hook。但是下一次渲染时我们可能清空了表单，表达式值变为 `false`。此时的渲染会跳过该 Hook，Hook 的调用顺序发生了改变：

```javascript
useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
// useEffect(persistForm)  // 🔴 此 Hook 被忽略！
useState('Poppins')        // 🔴 2 （之前为 3）。读取变量名为 surname 的 state 失败
useEffect(updateTitle)     // 🔴 3 （之前为 4）。替换更新标题的 effect 失败
```

React 不知道第二个 `useState` 的 Hook 应该返回什么。React 会以为在该组件中第二个 Hook 的调用像上次的渲染一样，对应的是 `persistForm` 的 effect，但并非如此。从这里开始，后面的 Hook 调用都被提前执行，导致 bug 的产生。

### Hook的闭包陷阱(过期闭包)

闭包陷阱就是在React Hook进行开发时，通过useState定义的值拿到的都不是最新的值

上代码

```react
const App = () =>{
   const [count,setCount] = useState(0)
   useEffect(()=>{
     const timeId = setInterval(()=>{
        setCount(count+1)
     },1000)
     return ()=>{clearInterval(timeId)}
   },[])
   return (
      <span>{count}</span>
   )
}
```

上面的代码中，count并不会和理想中一样每过一秒自动+1并更新DOM，而是从0变成1后，console打印出的count一直是设立的默认值0

因为useEffect的依赖数组是空数组，那setInterval里面的count是通过闭包取得的值，他读取到的第一次的count，并且useEffect并没有更新，因为每次都是0

如果去掉useEffect的依赖数组可以解决这个问题，然而会造成每次App组件渲染都会运行useEffect里面的函数，就会造成不必要的浪费和隐藏的bug

#### 解决方案

**使用setstate回调**

把setCount(count+1)改成setCount(count=>count+1)，函数式更新

它允许我们指定state如何改变而不引用当前的state，因为回调函数中的参数是最新的count值

**使用useReducer代替**

把setCount改成useReducer的dispatch，因为useReducer的dispatch的身份永远是稳定的。即使reducer函数是定义在函数内部且依赖props

```react
const setCountReducer = (state,action)=>{
   switch(action.type){
     case 'add':
       return state+action.value 
     case 'minus':
       return state-action.value
     default: 
       return state
   }
}

const App = () =>{
  const [count,dispatch] = useReducer(setCountReducer,0)
  useEffect(()=>{
    const timeId = setInterval(()=>{
      dispatch({type:'add',value:1})
    },1000)
    return ()=> clearInterval(timeId)
  },[])
  return (
     <span>{count}</span>
  )
} 
```

**使用useRef存储变量**

通过useRef生成的对象默认都是{current:{}},每次组件重新渲染时，他也是同一个对象的引用，不会因为组件的重新渲染导致取得闭包的对象引用，因此它不仅可以绑定DOM，也可以绑定任意我们想绑定的数据

改造代码如下

```react
const App = () =>{
  const [count,setCount] = useState(0)
  const countRef = useRef()
  countRef.current = count
  useEffect(()=>{
    const timeId = setInterval(()=>{
      setCount(countRef.current+1)
    },1000)
    return ()=> clearInterval(timeId)
  },[])
  return (
     <span>{countRef.current}</span>
  )
}
```

#### 其他会导致闭包陷阱的情况

异步函数

使用setInterval和setTimeout函数时，内部的变量读取的是异步函数在运行时组件处在闭包情况下的当前值，因为在异步函数内部的数据并不会在dom更新之后更新为新的值，他们的变量引用已经不是同一个了

上代码

```react
const App = ()=>{
  const [count,setCount] = useState(0)
  const consoleCount = ()=>{
    const timeId = setTimeout(()=>{
       console.log(count)
    },2000)
    return ()=> clearTimeout(timeId)
  }
  return (
    <div>
      <span>{count}</span>
      <button onClick={()=>setCount(count+1)}>按我加1</button>
      <button onClick={consoleCount}>输出count</button>
    </div>
  )
}
```

先点击三次加1按钮，把count变成3，然后点击输出按钮，此时再点击加1按钮，可以看到输出的count还是3，即输出的count是旧值

dom监听函数事件中的匿名函数

```react
const App = () =>{
    const [count,setCount] = useState(0)
    const consoleCount = ()=>{
      console.log(count)
    }
    useEffect(()=>{
      window.addEventListener('scroll',consoleCount)
      return ()=>{
         window.removeEventListener('scroll',consoleCount)
      }
    },[])
  
    return (
       <div style={{height:'400vh'}}>
         <span>{count}</span>
        <button onClick={()=>setCount(count+1)}>按我加1</button>
      <button onClick={consoleCount}>输出count</button>
      </div>
    )
}
```

可以看到不管页面怎么滚动，输出的count永远是0。因为addEventListener只在useEffect初始化的时候进行了绑定，执行函数的时候，count读取的是绑定函数时的旧值

使用useRef()存储实例变量也能解决这两个问题，也是react官方推荐的方法。

### 使用react hooks如何让下面的子组件只render一次

使用useRef保存子组件状态，当父组件更新时，直接更新ref值，当子组件click时，在更新ref值后，再调用一次update触发子组件渲染

```react
import React,{useEffect,useMemo,useState,useRef} from 'react'
function A(){
   const [count,setCount] = useState(0);
   
   return (
      <div>
        <p>我是父组件</p>
        <p>父组件的count是{count}</p>
        <button>click</button>
        <B count={count}/>
      </div>
   );
}

const B = React.memo(({count:}{count:number})=>{
  const numberRef = useRef(0);
  const [,update] = useState({});
  const updateNumber = () =>{
    numberRef.current++;
    update({});
  };
  
  useMemo(()=>{
    numberRef.current = count;
  },[count])
  
  console.log('子组件Render')
  
  return(
     <div>
       <p>我是子组件</p>
       <p>子组件的number是{numberRef.current}</p>
       <button onClick={updateNumber}>click</button>
     </div>
  )
})
```



## Fiber架构

react16相比于react15，经过重构后Reconciliation和Rendering被分为两个不同的阶段。

### fiber架构中的基本概念

Fiber 的架构有两个主要阶段：协调/渲染 和 提交。

**reconciler协调阶段**：当组件次初始化和其后的状态更新中，React会创建两颗不相同的虚拟树，React 需要基于这两棵树之间的差别来判断如何有效率的更新 UI 以保证当前 UI 与最新的树保持同步，计算树哪些部分需要更新。**react diff算法就发生在这个阶段**

**renderer阶段**：渲染器负责将拿到的虚拟组件树信息，根据其对应环境真实地更新渲染到应用中。有兴趣的朋友可以看一下dan自己的博客中的文章=》[运行时的react=》渲染器](https://overreacted.io/react-as-a-ui-runtime/#renderers)，介绍了react的Renderer渲染器如react-dom和react native等，其可以根据不同的主环境来生成不同的实例。

协调阶段的工作：

协调阶段通常被称为“渲染阶段”。这是React遍历组件树的阶段，并且：

- 更新状态和属性
- 调用生命周期钩子
- 获取组件的`children`
- 将它们与之前的`children`进行对比
- 并计算出需要执行的DOM更新

**fiber对象**

一个fiber对象是表征work的一个基本单元。

每一个React元素对应一个fiber对象，fibers是一个基于child, sibling 和 return属性构成的链表。 fiber对象核心的属性和含义如下所示：

**child、silbing、return**

fiber对象的属性，这些属性指向其他fiber，表征当前工作单元的下一个工作单元，用于描述fiber的递归树结构。

child： 对应于父fiber节点的子fiber silbing： 对应于fiber节点的同类兄弟节点 return： 对应于fiber节点的父节点

相对于React v16之前的版本，正是得益于fiber对象的child、sibing和return属性构成的单链表结构以及fiber对象中存储的上下文信息，才使得scheduler可以达到暂停、中止、重新开始等并发模式的新特性。

**work**

在React reconciliation过程中出现的各种比如state update，props update 或 refs update等必须执行计算的活动，这些活动我们在Fiber架构体系里面统一称之为 “work”。

**worktag**

workTag 类型，用于描述一个React元素的类型，即为上述fiber对象的 fiber.tag

**stateNode**

一个组件、一个DOM节点或其他跟fiber节点相关联的React元素的实例的引用。通常，我们可以说这个属性是用于保存与一个fiber相关联的本地状态。即上述fiber对象的 fiber.stateNode。

**current树和workInProgress树** 

首次渲染后，React生成一个用于渲染UI并能映射应用状态的fiber树，我们通常称之为current树。当React遍历current树，它为每一个存在的fiber节点创建一个alternate属性的替代节点，该节点构成workInProgress树。

所有发生update的work都在workInProgress树中执行，如果alternate属性还未创建，React将在处理update之前在createWorkInProgress函数中创建一个current树的副本，即形成workInProgress树，用于映射新的状态并在commit阶段刷新到屏幕。

**所有这些活动都被称为Fiber内部的工作。** 需要完成的工作类型取决于React Element的类型。 例如，对于 `Class Component` React需要实例化一个类，然而对于`Functional Component`却不需要。

在浏览器中GUI渲染线程与JS引擎线程是互斥的，当JS引擎执行时GUI线程会被挂起（相当于被冻结了），GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行。

**Stack Reconciler 和 fiber reconciliation**

React16 推出Fiber之前协调算法是Stack Reconciler，即递归遍历所有的 Virtual DOM 节点执行Diff算法，一旦开始便无法中断，直到整颗虚拟dom树构建完成后才会释放主线程，因其JavaScript单线程的特点，若当下组件具有复杂的嵌套和逻辑处理，diff便会堵塞UI进程，使动画和交互等优先级相对较高的任务无法立即得到处理，造成页面卡顿掉帧，影响用户体验。在`React15`及之前，`React`会递归比对`VirtualDOM`树，找出需要变动的节点，然后同步更新它们。这个过程`React`称为`Reconciliation(协调)`。

在`Reconciliation`期间，`React`会一直占用着浏览器资源，一则会导致用户触发的事件得不到响应, 二则会导致掉帧，用户可能会感觉到卡顿。

针对上述痛点，我们期望将**”找出有增删改的节点“，”然后同步更新他们“**这个过程分解成两个独立的部分，或者通过某种方式能让整个过程**可中断可恢复的执行**，类似于多任务操作系统的单处理器调度。

fiber的核心目标：

- 把可中断的工作拆分成多个小任务
- 为不同类型的更新分配任务优先级
- 更新时能够暂停，终止，复用渲染任务

这是一种**合作式调度**，需要程序和浏览器互相信任。浏览器作为领导者，会分配执行时间片（即requestIdleCallback）给程序去选择调用，程序需要按照约定在这个时间内执行完毕，并将控制权交还浏览器。

Fiber是一个执行单元，每次执行完一个执行单元，React就会检查现在还剩多少时间，如果没有时间就将控制权交还浏览器；然后继续进行下一帧的渲染。

从根节点开始遍历

如果没有长子，则标识当前节点遍历完成。`completeUnitOfWork`中收集

如果没有相邻兄弟，则返回父节点标识父节点遍历完成。`completeUnitOfWork`中收集

如果没有父节点，标识所有遍历完成。`over`

如果有长子，则遍历；`beginWork`中收集；收集完后返回其长子，回到`第2步`循环遍历

如果有相邻兄弟，则遍历；`beginWork`中收集；收集完后返回其长子，回到`第2步`循环遍历

### Render阶段

**enqueueSetState**

以类组件为例，ReactDOM中的updater对象是一个classComponentUpdater，用于获取fiber实例、update队列和调度 work

fiber.updateQueue是一个具有updates优先级的链表（UpdateQueue is a linked list of prioritized updates）

跟Fiber一样，update 队列也是成对出现：一个代表屏幕可见状态的 current 队列，一个在commit阶段之前可被异步计算和处理的work-in-progress 队列。如果一个work-in-progress队列在完成之前被丢弃，则将会通过克隆一个curent队列来创建一个新的work-in-progress队列。



函数调用栈：performUnitOfWork --> beginWork --> updateClassComponent --> finishedComponent --> completeUnitOfWork



**completeUnitOfWork**

React在completeUnitOfWork函数中构建effect-list

是深度优先搜索算法一部分，获取workInProgress.alternate、父节点workInProgress.return和workInProgress.sibling，如果存在兄弟节点则返回。否则，返回父节点。

### Commit阶段

类似于`Git`的分支功能，从旧树里面fork一份，在新分支中进行**添加、删除、更新**操作，然后再进行提交。

fiber大量使用链表。由于数组的大小是固定的，从数组的起点或者中间插入或移除项的成本很高。链表相对于传统的数组的优势在于添加或移除元素的时候不需要移动其他元素，**需要添加和移除很多元素时，最好的选择是链表，而非数组。** 链表在React的Fiber架构和Hooks实现发挥很大的作用。

commit阶段被分为几个子阶段。每个子阶段都单独进行effect list传递。所有的mutation effects都会在所有的layout effects之前执行。

被分为如下三个子阶段：

- before mutation：React使用此阶段读取 host tree的state状态。 这是调用getSnapshotBeforeUpdate生命周期的地方。
- mutation phase：在这个阶段，React 会改变host tree。 当该阶段执行结束时，work-in-progress树会变成current树，这必须发生在“mutation phase”阶段之后，以便于在componentWillUnmount生命周期内，仍然是之前的current树。但是，也要发生在“layout phase”阶段之前，以便于在componentDidMount / Update生命周期间，current树是已完成的work操作的。
- layout phase：在这个阶段host tree已经被更改并调用 effects。componentDidMount / Update等生命周期在这个阶段被执行。


