---
title: React（二）
date: 2020-06-02 21:40:33
categories: IT
tags: IT，Web,Node，React
toc: true
thumbnail: https://cdn.kunkunzhang.top/hooks.jpeg
---

​      前端框架，快速开发页面，函数式编程，与后端api快速搭建

<!--more-->

## purecomponent

当使用component时，父组件的props或者state更新时，无论子组件的state、props是否更新，都会触发子组件的更新，这会造成很多没必要的render，浪费很多性能。pureComponent的优点在于，在shouldcomponentUpdate只进行浅层比较，只要外层对象没有变化，就不会触发render，也就是不需要开发者使用shouldComponentUpdate就可使用简单的判断来提升性能

缺点：

由于进行的时浅比较，可能由于深层的数据不一致导致产生错误的否定判断，从而导致页面得不到更新

不适合用于在含有多层嵌套对象的state和props中，一般是作为展示组件来使用。因为对于数组和对象等引用类型，需要引用不同才会渲染

尤其是当遇到复杂组件时，可以将一个组件拆分成多个pureComponent，以这种方式来实现复杂数据结构，以期达到节省不必要渲染的目的，如表单、复杂列表、文本域等

如果props和state每次都会变，建议使用Component

父组件是pureComponent时，子组件无论是purecomponent或者component都不影响，因为父组件不会重新渲染，

父组件是Component时，子组件是component时每次都会重新渲染，子组件是purecomponent时，props不变时不会重新渲染



### 与React.memo、usememo的区别

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

### prop使用嵌套对象

使用immutable属性。



## Hook

Https://juejin.cn/post/6844903985338400782

Hook是react16.8新增的特性，可以在不编写class 的情况下使用state和其他react特性，reactnative从0.59版本开始支持hook。

### hook出现的原因以及解决的问题

Class component 劣势

1. 状态逻辑难复用：在组件之间复用状态逻辑很难，可能要用到 render props （渲染属性）或者 HOC（高阶组件），但无论是渲染属性，还是高阶组件，都会在原先的组件外包裹一层父容器（一般都是 div 元素），这样高阶组件多了会形成回调地狱类似的问题，导致层级冗余 趋向复杂难以维护：
2. 在生命周期函数中混杂不相干的逻辑（如：在 componentDidMount 中注册事件以及其他的逻辑，在 componentWillUnmount 中卸载事件，这样分散不集中的写法，很容易写出 bug ） 类组件中到处都是对状态的访问和处理，导致组件难以拆分成更小的组件
3. this 指向问题：父组件给子组件传递函数时，必须绑定 this

Hook不能在class中使用，只能在函数组件中，为函数组件勾入react state及生命周期等函数

react内置的hook有以下

基础hook：useState、useEffect、useContext

额外的hook：useReducer、useCallback、useMemo、useRef、useLayoutEffect、useDebugValue、useImperativeHandle

### 函数式组件与class组件对比

#### 性能对比

class组件中，setState之后要对比整个虚拟dom的状态。对于一个复杂页面，几十个状态要对比消耗性能。而hook阶段只对比一个值即可，性能更佳

闭包很多，值捕获现象严重，要尤其注意hook的依赖

大量的内联函数、函数嵌套，垃圾回收压力大。函数式组件每次渲染就像调用纯函数一样，调用之后产生一个作用域，并开辟对应的内容空间存储该作用域下的变量，函数返回结束后该作用域会被销毁，该作用域下的变量如果没有被作用域外的东西引用，在作用域销毁之后就需要在下一次GC时被回收。因此相对于Class组件额外的开销会多很多。因为Class组件所有的东西都是承载在一个对象上的，都是在这个对象上，每次更新组件，这个对象上的属性、方法和对象本身都不会被销毁，即不会出现频繁的开辟和回收内存空间。

#### 生命周期

constructor：函数组件不需要构造函数，可以直接调用useState来初始化State，如果代价比较昂贵可以穿一个函数给useState

getDerivedStateFromProps：改为在渲染时安排一次更新

shouldComponentUpdate：使用React.memo替代

使用react.memo包裹一个组件对props进行浅比较

```javascript
const Button = React.memo((props)=>{
  // component
})
```

react.memo不比较state，因为没有单一的state对象进行比较，可以用usememo优化子节点

render：函数组件本身就有

componentDidMount、componentDidUpdate、componentWillUnmount：通过使用UseEffect的不同方式可以分别表达这些生命周期

getSnapshotBeforeUpdate、ComponentDidCatch、getDerivedFromError：目前还没有这些方法的等价写法

#### 根本区别

函数式组件与class组件的心智模型不同。函数式组件捕获了渲染所用的值



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

useState更新数组时，必须用浅拷贝之后的新数组，如果只是简单赋值无法更新页面。因为react中如果数组引用地址不变，是不触发渲染的，但是值是设置进去的

```react
// 无法更新
const [lists, setLists] = useState([]);

const arr = lists;
arr.splice(index,1);
setLists(arr);

//扩展运算符浅拷贝
const [lists, setLists] = useState([]);

const arr = lists; //const arr = [...lists]
arr.splice(index,1);
setLists([...arr]);
```



#### useState与setState的异同

setState会自动合并，不同的useState不会



#### forceupdate

```react
import { useState, useCallback } from 'react'

export const useForceRender = () => {
  const [, updateState] = useState<any>();
  return useCallback(() => updateState({}),[])
}
```



#### 注意事项

useState初始化时不能直接使用props。因为props变化时并不会通知useState方法，所以使用props初始化state时一直是undefined，可以使用useEffect在组件初始化时手动set一次

```react
import React, { useState, useEffect } from 'react';

const FC = (initContent) => {
  const [content, setContent] = useState<Partial<ContentType[]>>([]);

  useEffect(() => {
      initContent?.length && setContent(initContent);
   }, [initContent]);
}
```



### useEffect和useLayoutEffect

对于class中的生命周期函数，为了能在函数组件中使用类似功能，使用useEffect方法，它相当于componentDidMount、componentDidupdate、componentWillUnmount三个函数的组合

```jsx

```

useEffect默认情况下会在第一次渲染之后和每次更新之后都会执行。

useEffect在全部渲染完毕后才会执行，而useLayoutEffect会在浏览器layout之后，painting之前执行

为了用户体验，一般先使用useEffect

使用步骤：

1. 作为 componentDidMount 使用，第二个参数为空数组 `[]`
2. 作为 componentDidUpdate 使用，第二个参数为指定依赖
3. 作为 componentWillUnmount 使用，空数组的情况下通过 return返回函数来清除。该函数将在组件卸载时被执行。如果不需要清理副作用则不用返回任何值
4. 如果useEffect当作ComponentDidUpdate使用时，每次Update之前会执行return中的返回函数以清理上一次渲染的副作用

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

清除effect

通常，组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源。要实现这一点，`useEffect` 函数需返回一个清除函数。

为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则**在执行下一个 effect 之前，上一个 effect 就已被清除**。

需要注意的是，如果包括多个副作用，应该调用多个useEffect，而不能够合并在一起。

```react
//错误
useEffect(()=>{
  const timeoutA = setTimeout(()=> setVarA(varA + 1), 1000)
  const timeoutB = setTimeout(()=> setVarB(varB + 1), 2000)
  
  return () => {
    clearTimeout(timeoutA);
    clearTimeout(timeoutB);
  }
},[varA, varB])

//正确
useEffect(()=>{
  const timeout = setTimeout(()=> setVarA(varA + 1), 1000)
  return () => { clearTimeout(timeout)};
},[varA])

useEffect(()=>{
  const timeout = setTimeout(()=> setVarB(varB + 1), 1000)
  return () => { clearTimeout(timeout)};
},[varB])

```



useEffect与useLayoutEffect区别：

`useEffect` 是异步执行的，而`useLayoutEffect`是同步执行的。

`useEffect` 的执行时机是浏览器完成渲染之后，而 `useLayoutEffect` 的执行时机是浏览器把内容真正渲染到界面之前，和 `componentDidMount` 等价。

最好把操作 dom 、动画的相关操作放到 `useLayouteEffect` 中去，避免导致闪烁。

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

`useContext(MyContext)` 相当于 class 组件中的 `static contextType = MyContext` 或者 `<MyContext.Consumer>`。

`useContext(MyContext)` 只是让你能够*读取* context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 `<MyContext.Provider>` 来为下层组件*提供* context。

### usecallback与useMemo

**useMemo**

返回一个缓存值。

useMemo是一种缓存机制提速，当他的依赖未发生改变时就不会触发重新计算，与vue中computed类似

使用语法：useMemo(()=> fn,deps)

把创建函数和依赖项数组作为参数传入useMemo，它只会在某个依赖项改变时才重新计算memoized值。如果没有提供依赖项数组，useMemo在每次渲染时都会计算新的值

```tsx
const myValue: any = useMemo(() => {
    const item = allCrowdData[value as number] || {
      name: undefined,
    };
    if (value && item.name) {
      return {
        value: value,
        label: item.name,
      } as LabeledValue;
    }

    return undefined;
}, [allCrowdData, value]);
```

**useCallback**

返回一个缓存函数。把内联回调函数及依赖数组作为参数传入useCallback，它将返回该回调函数u的memorized版本，该回调函数仅在某个依赖项改变时才会更新，在组件中使用usecallback可以避免非必要渲染

useCallback（fn，dep）相当于useMemo( () => fn，deps）

useMemo与usecallback的区别：`useMemo`可以缓存所有对象，`useCallback`只能缓存函数。

`useCallback(x => log(x), [m])` 等价于 `useMemo(() => x => log(x), [m])`

```tsx
const handleInputChange = useCallback(
    (e) => {
      handleUpdateSearchWord(e.target.value);
    },
    [handleUpdateSearchWord],
  );
```

### useRef、forwardref与useImperativeHandle

useRef

主要作用是创建一个数据的引用，并让这个数据在 render 过程中始终**保持不变**。修改ref对象不会像修改state那样触发重绘。

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

useImperativeHandle

useImperativeHandle可以让你在使用转发ref时自定义暴露给父组件的实例值。通过`useImperativeHandle`减少暴露给父组件获取的DOM元素属性，只暴露特定的操作

在大多数情况下，应当避免使用ref这样的命令式代码，useImperativeHandle应当与forwardRef一起使用

```react
import React, { useRef, forwardRef, useImperativeHandle } from 'react'

const JMInput = forwardRef((props, ref) => {
  const inputRef = useRef()
  // 作用: 减少父组件获取的DOM元素属性,只暴露给父组件需要用到的DOM方法
  // 参数1: 父组件传递的ref属性
  // 参数2: 返回一个对象,父组件通过ref.current调用对象中方法
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
  }))
  return <input type="text" ref={inputRef} />
})

export default function ImperativeHandleDemo() {
  // useImperativeHandle 主要作用:用于减少父组件中通过forward+useRef获取子组件DOM元素暴露的属性过多
  // 为什么使用: 因为使用forward+useRef获取子函数式组件DOM时,获取到的dom属性暴露的太多了
  // 解决: 使用uesImperativeHandle解决,在子函数式组件中定义父组件需要进行DOM操作,减少获取DOM暴露的属性过多
  const inputRef = useRef()

  return (
    <div>
      <button onClick={() => inputRef.current.focus()}>聚焦</button>
      <JMInput ref={inputRef} />
    </div>
  )
}
```

#### useRef与createRef的区别

```react
import React, { useRef, createRef, useState } from "react";
import ReactDOM from "react-dom";

function App() {
  const [renderIndex, setRenderIndex] = useState(1);

  const refFromUseRef = useRef();
  const refFromCreateRef = createRef();

  if (!refFromUseRef.current) {
    // 赋值操作,赋值给useRef
    refFromUseRef.current = renderIndex;
  }
  if (!refFromCreateRef.current) {
    // 赋值操作，赋值给createRef
    refFromCreateRef.current = renderIndex;
  }
  return (
    <div className="App">
      Current render index: {renderIndex}
      <br />
      在refFromUseRef.current中记住的第一个渲染索引：
      {refFromUseRef.current}
      <br />
      在refFromCreateRef.current中未能成功记住第一个渲染索引：
      {refFromCreateRef.current}
      <br />
      <button onClick={() => setRenderIndex(prev => prev + 1)}>
        数值 + 1
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

上面的案例中无论如何点击按钮 `refFromUseRef.current` 将始终为 `1`，而 `renderIndex` 和 `refFromCreateRef.current` 会伴随点击事件改变

当 ref 对象内容发生变化时，useRef 并不会通知你。变更 `.current` 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用 `callback ref` 来实现

### useDebugValue



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

#### 为什么不能在条件语句和循环语句中使用hook

react hook执行时以数组的结构执行，按顺序执行，如果使用条件语句就会出现缺少某一个hook，然后出现错位导致错误。

react hook底层是链表，每一个hook的next是指向下一个hook的，if会导致顺序不正确，从而导致报错，所以react是不允许这样使用hook的。

循环语句也是一样，不能绝对保证hook的执行顺序。如果非要在循环中使用，可以使用react官方的lint



### Hook的闭包陷阱(useEffect中定时器的使用，过期闭包)

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

比如上面的count，我们可以添加useref与state进行对比

```react
import React, { useState, useRef, useEffect } from "react";

export default function App() {

  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    latestCount.current = count;
  });

  function handleAlertclick() {
    setTimeout(() => {
      alert("latestCount.current:" + latestCount.current + '.. count: ' + count);
    }, 2000);
  }
  
  return (
    <div>
      <p>当前count： {count} </p>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
      <button onClick={handleAlertclick}> 提示 </button>
    </div>
  )
}
```



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

### Hook与普通函数的区别

Hook本身是一个函数，它与普通函数有什么区别呢

1。调用时机和调用方法不同

在FC中使用时，自定义hook和common function都通过import作为FC的一部分，但是调用的时机不同，hook是在每次渲染的时候都会调用，而通用函数则需要手动调用

2.命名方式不同

hook一般使用useXXX命名，CF就会比较灵活

3.能使用的工具不同

自定义hook中一般会调用其他hook，比如useeffect、useState，但是普通函数只能处理没有hook的逻辑

4.使用场景不同

CF可以被使用在任何地方，但hook只能被用在FC或其他hook中



## Hook写法

### Hook调用异步接口写法

```react
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({ products: [{
    productId: '123',
    productName: 'macbook'
  }] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError,setIsError] = useState(false);
  
  useEffect(()=> {
    const fetchData = async()=> {
      setIsError(false);
      setIsLoading(true);
      
      try {
        const result = await axios (
        	'https://c.com/api/products?date=today',
        )
        setData(result.data);
      }catch(e){
        setIsError(true);
      }
      
      setIsLoading(false);
    }
    fetchData();
  },[]);
  
  return (
  	<div>
      { isError && <div></div>}
      { isLoading ? (
      	<div>Loading...</div>
      ):(
      	<ul>
        	{data.products.map(i=> (
          	<li key="{i.productId}">
              {i.productName}
            </li>
          ))}
        </ul>
      )};
    </div>
  )
}

export default App;
```

也可以使用立即执行函数

```react
const MyFunctionnalComponent: React.FC = props => {
  useEffect(()=>{
    (async function anyNameFunction() {
      await loadContent();
    })();
  },[]);
  return <div></div>
}
```

### hook ts写法

usestate如果初始值不是null/undefined，是具备类型推导能力的。根据传入的初始值推断出类型。初始值如果是null/undefined则需要传递类型定义才能进行约束。一般情况下还是推荐传入类型

```react
const [value, setValue] = useState(0)

const [value, setValue] = useState<number>(0)

const [string, setString] = useState<string>('')

const [array, setArray] = useState<any[]>([])
```

useContext一般根据传入的context值就可以推断出返回类型，不需要传递类型

useEffect和useLayoutEffect无返回值，无需传递类型

useMemo无需传递类型，根据函数的返回值可以判断类型

useCallback无需传递类型，根据函数的返回值可以推断类型，但是注意函数的入参需要定义类型，不然就是推断为any

useRef需要约束ref.current的类型

useReducer需要对reducer函数的入参state和action进行类型约束推断类型



## Hook包

### ahooks

安装

```shell
npm install --save ahooks
```

常用hook

`useRequest` 是一个强大的异步数据管理的 Hooks，React 项目中的网络请求场景使用 `useRequest` 就够了。

```react
const { data, error, loading } = useRequest(getUsername, {
  manaul: true;
});
```

`useRequest` 提供了以下几个生命周期配置项，供你在异步函数的不同阶段做一些处理。

- `onBefore`：请求之前触发
- `onSuccess`：请求成功触发
- `onError`：请求失败触发
- `onFinally`：请求完成触发

通过设置 `options.pollingInterval`，进入轮询模式，`useRequest` 会定时触发 service 执行。

通过设置 `options.debounceWait`，进入防抖模式，此时如果频繁触发 `run` 或者 `runAsync`，则会以防抖策略进行请求。

通过设置 `options.throttleWait`，进入节流模式，此时如果频繁触发 `run` 或者 `runAsync`，则会以节流策略进行请求。

如果设置了 `options.cacheKey`，`useRequest` 会将当前请求成功的数据缓存起来。下次组件初始化时，如果有缓存数据，我们会优先返回缓存数据，然后在背后发送新请求，也就是 SWR 的能力。

你可以通过 `options.staleTime` 设置数据保持新鲜时间，在该时间内，我们认为数据是新鲜的，不会重新发起请求。

你也可以通过 `options.cacheTime` 设置数据缓存时间，超过该时间，我们会清空该条缓存数据。

通过设置 `options.retryCount`，指定错误重试次数，则 useRequest 在失败后会进行重试。



useTitle

改变页面在tab页中的标题

```react
import React, { useState } from "react";
import { useTitle } from "react-use";

const Demo = () => {
  useTitle("Hello world!", {
    restoreOnUnmount: true,
  });

  return <h1>document.title has changed</h1>;
};

export default () => {
  const [showDemo, setShowDemo] = useState(true);

  return (
    <div>
      <button onClick={() => setShowDemo(!showDemo)}>
        {showDemo ? "unmount" : "mount"}
      </button>
      {showDemo ? <Demo /> : ""}
    </div>
  );
};
```

源码

```typescript
// src/useTitle.ts

/* eslint-disable */
import { useRef, useEffect } from "react";
export interface UseTitleOptions {
  restoreOnUnmount?: boolean;
}
const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
  restoreOnUnmount: false,
};
function useTitle(
  title: string,
  options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS
) {
  const prevTitleRef = useRef(document.title);
  document.title = title;
  useEffect(() => {
    if (options && options.restoreOnUnmount) {
      return () => {
        document.title = prevTitleRef.current;
      };
    } else {
      return;
    }
  }, []);
}

export default typeof document !== "undefined"
  ? useTitle
  : (_title: string) => {};
```

useBoolean



### react-use



### react-hooks

https://github.com/ecomfe/react-hooks



### react-router

useHistory useLocation useParams useRouteMatch 

```react
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom"

function HomeButton() {
  let history = useHistory();
  function haddleClick() {
    history.push("/home");
  }
  
  function usePageViews() {
      let location = useLocation();
    	React.useEffect(()=>{
        ga.send(["pageview", location.pathname]);
      },[location])
  }
  
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>
  
  let match = useRouteMatch("/blog/:slug")
  const match = useRouteMatch({
    path: "/BLOG/:slug",
    strict: true,
    sensitive: true
  })
}
```

