---
title: React
date: 2020-06-02 21:40:33
categories: IT
tags: IT，Web,Node，React
toc: true
thumbnail: http://cdn.kunkunzhang.top/react.png
---

​      前端框架，快速开发页面，函数式编程，与后端api快速搭建

<!--more-->

## 组件

react会将以小写字母开头的组件视为原生DOM标签，而组件名称必须以大写字母开口

组件的定义方式

以函数方式定义组件

```jsx
function Welcome(props){
    return <h1>hello,{props.name}</h1>
}
```

使用ES6的语法class定义组件

```jsx
class Welcome extends React.component{
    render(){
        return <h1>hello,{props.name}</h1>;
    }
}
```

引用组件

组件可以在输出中引用其他组件。在React中通常会以组件的形式表示。

组件被调用时可以携带参数，称为props，

```jsx
function Welcome(props){
    return <h1>hello,{props.name}</h1>
}

function App(){
    return (
       <div>
            <Welcome name="Sara" />
            <Welcome name="Cahs" />
            <Welcome name="hara" />
        </div>
    )
}

ReactDOM.render(
    <App />
    document.getElementById('root')
)
```

### 组件APi

在React中，组件以函数声明或者以Class方式声明。以Class方式声明时通常需要从React.Compoenent中继承。

React.Compoenent提供了生命周期api，因为生命周期的使用方式比较重要，这将在后文中介绍，这里首先介绍除了生命周期之外的其他API。

forceupdate：component.forceUpdate(callback)

默认情况下，当组件的 state 或 props 发生变化时，组件将重新渲染。如果 `render()` 方法依赖于其他数据，则可以调用 `forceUpdate()` 强制让组件重新渲染。

调用 `forceUpdate()` 将致使组件调用 `render()` 方法，此操作会跳过该组件的 `shouldComponentUpdate()`。但其子组件会触发正常的生命周期方法，包括 `shouldComponentUpdate()` 方法。如果标记发生变化，React 仍将只更新 DOM。

通常你应该避免使用 `forceUpdate()`，尽量在 `render()` 中使用 `this.props` 和 `this.state`。

错误处理api

static getDerivedStateFromError(error)

此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state

componentDidCatch(error, info)

此生命周期在后代组件抛出错误后被调用。 它接收两个参数：

1. `error` —— 抛出的错误。
2. `info` —— 带有 `componentStack` key 的对象，

`componentDidCatch()` 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况：

```react
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显降级 UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // "组件堆栈" 例子:
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }
  
  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级  UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

如果发生错误，你可以通过调用 `setState` 使用 `componentDidCatch()` 渲染降级 UI，但在未来的版本中将不推荐这样做。 可以使用静态 `getDerivedStateFromError()` 来处理降级渲染。

### 受控组件与非受控组件

受控和非受控

名词[“受控”](https://zh-hans.reactjs.org/docs/forms.html#controlled-components)和[“非受控”](https://zh-hans.reactjs.org/docs/uncontrolled-components.html)通常用来指代表单的 inputs，但是也可以用来描述数据频繁更新的组件。用 props 传入数据的话，组件可以被认为是**受控**（因为组件被父级传入的 props 控制）。数据只保存在组件内部的 state 的话，是**非受控**组件（因为外部没办法直接控制 state）。

当一个派生 state 值也被 `setState` 方法更新时，这个值就不是一个单一来源的值了。



如果组件的状态只能由用户控制，那么就是非受控组件，如果组件的状态可以由用户和通过代码两种方式控制，那么就是受控组件

在React中没有类似于Vue中v-model的双向绑定功能。

```react
class TestComponent extends React.Component {
  constructor (props){
    super(props);
    this.state = {username: 'lindaidai' }
  }
  render () {
		return <input name="username" value={this.state.username} />
  }
}
```

受控组件的完整定义：

在Html的表单元素中，它们通常自己维护一套state，并随着用户的数据自己进行UI上的更新，这种行为不被我们程序所控制。而如果将React的state属性和表单元素的值建立依赖关系，再通过onChange事件与setState()结合更新state属性，就能达到控制用户输入过程中表单发生的操作，被react以这种方式控制取值的表单输入元素就是受控组件

```react
class TestComponent extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      username: 'lindaidai' 
    }
  }
  onChange (e){
    this.setState({
      username: e.target.value
    })
  }
  render () {
		return <input name="username" value={this.state.username} 
             onChange={(e)=> this.onChange(e)} />
  }
}
```

#### 受控组件注意事项

受控组件中有时会有派生state，即state的状态是根据props的值来进行变化

不建议将props直接复制到state中

最常见的误解就是 `getDerivedStateFromProps` 和 `componentWillReceiveProps` 只会在 props “改变”时才会调用。实际上只要父级重新渲染时，这两个生命周期函数就会重新调用，不管 props 有没有“变化”。所以，在这两个方法内直接复制（*unconditionally*）props 到 state 是不安全的。**这样做会导致 state 后没有正确渲染**。

错误使用1：在componentWillReceiveProps中直接使用prop初始化state

```react
class EmailInput extends Component {
  state = { email: this.props.email };

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  componentWillReceiveProps(nextProps) {
    // 这会覆盖所有组件内的 state 更新！
    // 不要这样做。
    this.setState({ email: nextProps.email });
  }
}
```

乍看之下还可以。 state 的初始值是 props 传来的，当在 `<input>` 里输入时，修改 state。但是如果父组件重新渲染，我们输入的所有东西都会丢失！([查看这个示例](https://codesandbox.io/s/m3w9zn1z8x))，即使在重置 state 前比较 `nextProps.email !== this.state.email` 仍然会导致更新。

这个小例子中，使用 `shouldComponentUpdate` ，比较 props 的 email 是不是修改再决定要不要重新渲染。但是在实践中，一个组件会接收多个 prop，任何一个 prop 的改变都会导致重新渲染和不正确的状态重置。加上行内函数和对象 prop，创建一个完全可靠的 `shouldComponentUpdate` 会变得越来越难。[这个示例展示了这个情况](https://codesandbox.io/s/jl0w6r9w59)。而且 `shouldComponentUpdate` 的最佳实践是用于性能提升，而不是改正不合适的派生 state。

错误使用1：在componentWillReceiveProps中比较前后两次props再初始化state

```react
class EmailInput extends Component {
  state = {
    email: this.props.email
  };

  componentWillReceiveProps(nextProps) {
    // 只要 props.email 改变，就改变 state
    if (nextProps.email !== this.props.email) {
      this.setState({
        email: nextProps.email
      });
    }
  }
  
  // ...
}
```

现在组件只会在 prop 改变时才会改变。

但是仍然有个问题。想象一下，如果这是一个密码输入组件，拥有同样 email 的两个账户进行切换时，这个输入框不会重置（用来让用户重新登录）。因为父组件传来的 prop 值没有变化！这会让用户非常惊讶，因为这看起来像是帮助一个用户分享了另外一个用户的密码，

建议1:把组件包装成完全可控的组件

```react
function EmailInput(props) {
  return <input onChange={props.onChange} value={props.email} />;
}
```

建议2：为了在不同的页面切换不同的值，我们可以使用 `key` 这个特殊的 React 属性。当 `key` 变化时， React 会[创建一个新的而不是更新一个既有的组件](https://zh-hans.reactjs.org/docs/reconciliation.html#keys)。 Keys 一般用来渲染动态列表，但是这里也可以使用。

每次 ID 更改，都会重新创建 `EmailInput` ，并将其状态重置为最新的 `defaultEmail` 值。([点击查看这个模式的演示](https://codesandbox.io/s/6v1znlxyxn)) 使用此方法，不用为每次输入都添加 `key`，在整个表单上添加 `key` 更有位合理。每次 key 变化，表单里的所有组件都会用新的初始值重新创建。

```react
class EmailInput extends Component {
  state = { email: this.props.defaultEmail };

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }
}

<EmailInput
  defaultEmail={this.props.user.email}
  key={this.props.user.id}
/>
```

https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

#### 封装组件为受控组件和非受控组件两种





### 组件间通信

父组件向子组件通讯: 父组件可以向子组件通过传 props 的方式，向子组件进行通讯

子组件向父组件通讯: props+回调的方式,父组件向子组件传递props进行通讯，此props为作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数，传递到父组件的作用域中

兄弟组件通信: 找到这两个兄弟节点共同的父节点,结合上面两种方式由父节点转发信息进行通信

```jsx
import React from "react";

function Child1(props) {
  return (
    <div className="child">
      <p>{`兄弟1接收到的文本：${props.fatherText}`}</p>
    </div>
  );
}

class Child2 extends React.Component {
  state = { text: "兄弟2文本" };

  //调用了父组件传入的 changeFatherText 方法
  changeText = () => {
    this.props.changeFatherText(this.state.text);
  };

  render() {
    return (
      <div className="child">
        <button onClick={this.changeText}>点击更新兄弟1文本为兄弟2文本</button>
      </div>
    );
  }
}

export default class Father extends React.Component {
  // 初始化父组件的 state
  state = {
    text: "父组件的文本"
  };

  // 传给 Child2 组件按钮的监听函数，用于更新父组件 text 值（这个 text 值同时也是 Child1 的 props）
  changeText = (newText) => {
    this.setState({ text: newText });
  };

  // 渲染父组件
  render() {
    return (
      <div className="father">
        {/* 引入 Child1 组件，并通过 props 中下发具体的状态值 实现父-子通信 */}
        <Child1 fatherText={this.state.text} />

        {/* 引入 Child2 组件，并通过 props 中下发可传参的函数 实现子-父通信 */}
        <Child2 changeFatherText={this.changeText} />
      </div>
    );
  }
}
```

跨层级通信: `Context`设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言,对于跨越多层的全局数据通过`Context`通信再适合不过

全局状态管理工具: 借助Redux或者Mobx等全局状态管理工具进行通信,这种工具会维护一个全局状态中心Store,并根据不同的事件产生新的状态

### context api

组件间层层嵌套时，传props的过程中会产生大量的...props或者propName={this.props.propValue}，导致代码异常丑陋，比如exzzzzz

```react
<App>
   <Switcher toggleState = {this.state.toggle}>
       <Pannel toggleState = {props.toggleState}>
           <div onClick={handleClick}>
             {props.toggleState?'1':'0'}
         	 </div>
     		</Pannel>
  </Switcher>
</App>
```

引入context api代码

简易版,通过provide的value传值，通过consumer的props接收值

```react
import React,{createContext} from 'react'

const {Provider,Consumer} = createContext('color');

class DeliverComponent extends React.component{
  state = {
    color:'orange',
    handleClick:() =>{
      this.setState({ color:'red'})
    }
  }
  render(){
    return (
      <Provider value= {this.state}>
         <MidComponent/>
      </Provider>
    )
  }
}

const MidComponent = () => <Receiver />

const Receiver = () =>(
    <Consumer>
      {({color,handleClick}) =>
  		<div style ={{color}} onClick={()=>{handleClick()}}>
       hello,world
      </div>}
    </Consumer>
)

const App =()=> <DeliverComponent/>

export default App;
```

复杂版

引入context api，创建provider和consumer

```react
//togglecontext.js
import React,{createContext} from 'react'
//创建上下文
const ToggleContext = createContext({
  toggle:true,
  handleToggle:()=>{}
})

//创建provider
export class ToggleProvider extends React.component{
  state = {
    toggle:true,
    handleToggle:this.handleToggle
  }

  render() {
    return (
      <ToggleContext.Provider value={this.state}>
        {this.props.children}
      </ToggleContext.Provider>
    )
  }
}
//创建consumer
export const ToggleConsumer = ToggleContext.Consumer
```

通过provider包裹组件传递value值可以使组件共享provider中的state，通过consumer获取props进行渲染

```react
import React from 'react';
import {ToggleProvider,ToggleConsumer} from './ToggleContext'

function App(){
  return (
    <ToggleProvider>
       <Switcher></Switcher>
    </ToggleProvider>
  )
}

const Switcher = () =>{
  return <Pannel/>
}

const Pannel = () =>{
  return (
    <ToggleConsumer>
      {({toggle.handleToggle})=>
         <div onClick={()=>handleToggle()}>
         {toggle?'1':'0'}
    		</div>
      }
    </ToggleConsumer>
  )
}

export default App
```

### ref、OnRef与forwardRef

在典型的 React 数据流中，props 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件/元素

适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

ref 的值根据节点的类型而有所不同：

- 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
- 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
- 默认情况下，你不能在函数组件上使用 ref 属性（可以在函数组件内部使用），因为它们没有实例：
  - 如果要在函数组件中使用 ref，你可以使用 forwardRef（可与 useImperativeHandle 结合使用）
  - 或者可以将该组件转化为 class 组件。

父组件通过ref可以拿到子组件的方法和属性

```react
import React, { Component, Fragment } from "react";
import UncontrolledEmailInput from "./UncontrolledEmailInput";

export default class AccountsList extends Component {
  inputRef = React.createRef();

  state = {
    selectedIndex: 0
  };

  handleChange = index => {
    this.setState({ selectedIndex: index }, () => {
      const selectedAccount = this.props.accounts[index];
      this.inputRef.current.resetEmailForNewUser(selectedAccount.email);
    });
  };
render() {
    const { accounts } = this.props;
    const { selectedIndex } = this.state;
    const selectedAccount = accounts[selectedIndex];
    return (
      <Fragment>
        <h1>
          This demo illustrates resetting an uncontrolled component with an
          instance method
        </h1>
        <blockquote>First, make an edit to the account "One" email.</blockquote>
        <UncontrolledEmailInput
          defaultEmail={selectedAccount.email}
          ref={this.inputRef}
        />
        <blockquote>Next, select account "Two" below.</blockquote>
        <p>
          Accounts:
          {this.props.accounts.map((account, index) => (
            <label key={account.id}>
              <input
                type="radio"
                name="account"
                checked={selectedIndex === index}
                onChange={() => this.handleChange(index)}
              />{" "}
              {account.name}
            </label>
          ))}
        </p>
        <p>
          Even though both accounts have the same "committed" email, toggling
          between the two properly resets the "draft" email state. Read the
          inline comments in <code>UncontrolledEmailInput.js</code> to learn
          why.
        </p>
      </Fragment>
    );
  }
}
/// 子组件
import React, { Component } from "react";

// This is an example of an "uncontrolled" component.
// We call it this because the component manages its own "draft" state.
export default class UncontrolledEmailInput extends Component {
  // Default the "draft" email to the value passed in via props.
  state = {
    email: this.props.defaultEmail
  };

  // Imperative method to reset "draft" email state.
  // Call this method using a component ref.
  resetEmailForNewUser(defaultEmail) {
    this.setState({ email: defaultEmail });
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return (
      <label>
        Email: <input onChange={this.handleChange} value={this.state.email} />
      </label>
    );
  }
}
```

Onref通过props将子组件的组件实例当作参数，通过回调传到父组件，然后在父组件就可以拿到子组件的实例了，拿到实例就可以调用它的方法了

```react
import Son from './son'

class Father extends React.Component {
  sonRef = (ref) => {
    this.child = ref
  }
  
  render() {
    return (
      <div>
         <Son onRef={this.sonRef}/>
      </div>
    )
  }
}
```

ref可以直接获得dom信息,非受控组件可以采用这种方式获取值而不进行其他操作

```react
import React,{ Component } from 'react'

export class UnControl extends Component {
  constructor (props) {
		super(props);
    this.inputRef = React.createRef();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('input内的值为',this.inputRef.current.value);
  }
  render () {
    return (
    	<form onSubmit={e => this.handleSubmit(e)}>
        <input defaultValue="lindaidai" ref={this.inputRef}/>
        <input type="submit" value="提交"/>
      </form>
    )
  }
}
```

forwardRef多用于Ref 转发。Ref 转发是一项将 [ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 自动地通过组件传递到其一子组件的技巧。对于大多数应用中的组件来说，这通常不是必需的。通常不建议这样做，因为它会打破组件的封装，但它偶尔可用于触发焦点或测量子 DOM 节点的大小或位置。但其对某些组件，尤其是可重用的组件库是很有用的。

Ref 转发是一个可选特性，其允许某些组件接收 `ref`，并将其向下传递（换句话说，“转发”它）给子组件。

```react
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

#### ref的其他用法

16.3之前可以通过字符或者回调函数两个方式获取ref

```react
// string ref
class MyComponent extends React.Component {
  componentDidMount() {
    this.refs.myRef.focus();
  }

  render() {
    return <input ref="myRef" />;
  }
}

// callback ref
class MyComponent extends React.Component {
  componentDidMount() {
    this.myRef.focus();
  }

  render() {
    return <input ref={(ele) => {
      this.myRef = ele;
    }} />;
  }
}
```

string ref 就已被诟病已久，React 官方文档中如此声明：`"如果你目前还在使用 this.refs.textInput 这种方式访问 refs ，我们建议用回调函数或 createRef API 的方式代替。"`

吐槽内容主要有以下几点:

1. string ref 不可组合。 例如一个第三方库的父组件已经给子组件传递了 ref，那么我们就无法在在子组件上添加 ref 了。 另一方面，回调引用没有一个所有者，因此您可以随时编写它们。

2. string ref 的所有者由当前执行的组件确定。 这意味着使用通用的“渲染回调”模式（例如react），错误的组件将拥有引用（它将最终在react上而不是您的组件定义renderRow）
3. string ref 不适用于Flow之类的静态分析。 Flow不能猜测框架可以使字符串ref“出现”在react上的神奇效果，以及它的类型（可能有所不同）。 回调引用比静态分析更友好。
4. string ref 强制React跟踪当前正在执行的组件。 这是有问题的，因为它使react模块处于有状态，并在捆绑中复制react模块时导致奇怪的错误。在 reconciliation 阶段，React Element 创建和更新的过程中，ref 会被封装为一个闭包函数，等待 commit 阶段被执行，这会对 React 的性能产生一些影响。

而callback ref则一直可以。React 将在组件挂载时，会调用 ref 回调函数并传入 DOM 元素，当卸载时调用它并传入 null。在 componentDidMount 或 componentDidUpdate 触发前，React 会保证 refs 一定是最新的。

如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

16.3之后class组件中有了createRef，相比于之前的ref使用方式，优点：

- 相对于 callback ref 而言 React.createRef 显得更加直观，避免了 callback ref 的一些理解问题。

React.createRef 的缺点：

1. 性能略低于 callback ref
2. 能力上仍逊色于 callback ref，例如上一节提到的组合问题，createRef 也是无能为力的。



### 列表组件

使用key时，不能使用数组的index作为列表组件的key

使用index作为key的列表，向列表中添加或删除某些项时可能导致错误的显示。因为key是连接真实DOM的标识，当更改后的key与更改前的key相同时，react会认为前后的组件是相同的，但其实这两项并不一样

### Constructor

class组件中有constructor构造函数，有两个目的

1.初始化this.state

2.函数方法绑定到实例

```react
constructor(props) {
  super(props);
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this)
}
```

使用箭头函数则不需要将事件在constructor中绑定

### props默认值

对于函数组件，设置函数的defaultprops属性

```react
 import React from 'react'

 function About (props) {
   const { name, age } = props
     return (
       <div>
         <p>{ name }</p>
         <p>{ age }</p>
       </div>
     )
 }

 About.defaultProps = {
   name: 'ReoNa',
   age: 22
 }
 
 export default About
```

对于类组件，我们直接定义 `static defaultProps`设置默认值

```react
 import React, { Component } from 'react'
 
 class Header extends Component {
 
   static defaultProps = {
     name: 'Aimyon',
     age: 25
   }
 
   render () {
     const { name, age } = this.props
     return (
       <div>
         <p>{ name }</p>
         <p>{ age }</p>
       </div>
     )
   }
 }
 
 export default Header
```



## HOC与render Props

