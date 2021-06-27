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

## JSX语法

　JSX是React中为了便于编写而创建的语法，

jsx也就是js中写xml的意思

组件

函数  function 



参数传递

外部`...perpson`表示接收外部数组内的所有东西，称为属性扩散

构造函数使用组件外部参数时，必须使用在构造函数的参数列表中定义props属性接收，props是形参，只能读取，不能更改外部数据

类

使用类时默认类中默认有constructor构造器

类继承

关键字 extends 

继承类中的constructor必须在第一行有super(),表示对父类中的constructor 的引用

在constructor中引用外部数据也必须用形参



  ```react
 render (){
   return {
       
   }
}
  ```

render中直接用this.props使用外界传递的参数



导出函数组件和类组件

export default class 

类组件是有状态组件，有自己的state和生命周期函数，函数组件是无状态组件

## 创建React项目

安装包

```Node
npm i react-router-dom --save
```



创建react项目

```node
npm install -g create-react-app
```

使用create-react-app命令创建项目

```node
create-react-app [项目名]
```

启动项目

```node
npm start 
```

## 构建路由



安装包

```node
npm i --save react-router-dom
```

react-router与react-router-dom是两个包，前者提供react的核心api，如Router、Route、Switch等，后者包含前者的依赖，并且提供BrowserRoute、Route、Link等api，可以通过dom操作触发事件控制路由。

一般使用后者

导入包,新建Router.js

```jsx
import React from 'react';
import {BrowserRoute as Router,HashRouter,Link} from 'react-router-dom'
//Router组件本身只是一个容器，真正的路由要通过Route组件定义。
//Route用来表示路由规则，有path和component、exact
//Link组件用于取代<a>元素，生成一个链接，允许用户点击后跳转到另一个路由。它基本上就是<a>元素的React 版本，可以接收Router的状态。
import Home from './components/Home'
import About from './components/About'

function router() {
  return (
    <Router>
          <Route path="/home" component={Home}/>
          <Route path="/about" component={About}/>
     </Router>
  );
}
```

Home.jsx

```jsx
import React,{Component} from 'react';
class Home extends Component {
    render() {
        return (
            <div>
            首页
            </div>
       )
    }
}
export default Home
```

About.jsx

```jsx
import React,{Component} from 'react';
class About extends Component {
    render() {
        return (
            <div>
            关于
            </div>
       )
    }
}
export default About
```



```react
<HashRouter>
        <Link to="/home"></Link>
        <Link to="/movie"></Link>
        <Link to="/about"></Link>
    <Route path="/home" compoent={} exact></Route>
    <Route path="/movie/:type/:id" compoent={} exact></Route>
    <Route path="/about" compoent={} exact></Route>
</HashRouter>
```

在app.js中引入

```js
import Router from './Router'

class App extends Component{
    render(){
        return (
           <Router />
        );
    }
}
```

NavLink是一个特殊版本的Link，可以使用activeClassName来设置Link被选中时被附加的class，使用activeStyl

来配置被选中时应用的样式。



### 路由匹配

Switch

```react
import { HashRouter,Route,Switch } from 'react-router-dom'

const BasicRoute = () => (
   <HashRouter>
      <Switch>
         <Route exact path="/" component={Home}/>         
         <Route exact path="/detail" component={Detail}/>
      </Switch>
   </HashRouter>
)
```

### 嵌套路由

router.js

```jsx
import Other from './components/Other'

function router(){
    return{
        <Router>
            <Route path="/home" component={Home} />
            <Route path="/home" render={()=>(
                    <About>
                       <Route path="/about/other" component={other}/>
                    </About>
                )}>
        </Router>
    }
}
```

### 重定向

```jsx
import {Redirect} from "react-router-dom"

return {(
<Router>
        <Route path="/home" component={Home} />
        <Route path="/" render={
        ()=>(
        <Redirect to="/home"/>)}>
        </Route>
    </Router>
);}
export default router;
```

`IndexRedirect`组件用于访问根路由的时候，将用户重定向到某个子组件。



### 其他API

RouteComponentProps



withRouter

默认情况下必须是经过路由匹配渲染的组件才存在this.props，才拥有路由参数，才能使用编程式导航的写法，执行this.props.history.push('/detail')跳转到对应路由的页面

然而不是所有组件都直接与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用withRouter就可以给此组件传入路由参数，此时就可以使用this.props

设置withRouter很简单只需要两步：（1）引入 （2）将App组件 withRouter() 一下

比如app.js这个组件，一般是首页，不是通过路由跳转过来的，而是直接从浏览器中输入地址打开的，如果不使用withRouter此组件的this.props为空，没法执行props中的history、location、match等方法。

```react
import React,{Component} from 'react'
import {Switch,Route,NavLink,Redirect,withRouter} from 'react-router-dom' //引入withRouter
import One from './One'
import NotFound from './NotFound'
class App extends Component{
    //此时才能获取this.props,包含（history, match, location）三个对象
    console.log(this.props);  //输出{match: {…}, location: {…}, history: {…}, 等}
    render(){return (<div className='app'>
            <NavLink to='/one/users'>用户列表</NavLink>
            <NavLink to='/one/companies'>公司列表</NavLink>
            <Switch>
                <Route path='/one/:type?' component={One} />
                <Redirect from='/' to='/one' exact />
                <Route component={NotFound} />
            </Switch>
        </div>)
    }
}
export default withRouter(App);  //这里要执行一下WithRouter
```

match

match是一个匹配路径参数的对象，它有一个属性params，里面的内容就是路径参数，除常用的params属性外，它还有url、path、isExact属性。



### 方法





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

### OnRef

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



## State与生命周期

与props不同，state是组件内的私有数据，且完全受控于当前组件。

对于上述两种组件，function函数式定义的组件不支持state，所以要使用state需要把组件定义为class式组件

使用时在组件内添加构造函数constuctor

```jsx
class Clock extends React.Component {
    constructor(props){
        super(props)
        this.state = {date: new Date()};
    }
    
    render(){
        return (
            <div>
                <h1>hello</h1>
                <h2>it is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    }
}
```

修改组件中的state数据时，使用setState

```jsx
this.setState({comment:'hello'});
```

调用setState方法后react会自动更新state

当你需要更新多个state数据时，可以使用setState独立更新，但是如果state之间互相依赖，会涉及到异步更新的问题，此时setState需要接收一个函数而不是简单的对象，

```jsx
this.setState(function(state,props){
    return {
        counter: state.counter + props.increment
    }
})
```

组件可以把state作为props向下传递到子组件中

```jsx
<FormattedData date={this.state.date} />
```

在React中，组件是有状态组件还是无状态组件是由组件的细节决定的，它可能会随着时间的推移而改变。有状态无状态只针对于组件本身，对外相同，因此可以在有状态组件中调用无状态组件，反之亦然。

```react
import React, { Component } from 'react'

export default class LifeCycle extends Component {
    //// props = {age:10,name:'计数器'}
  static defaultProps = {
      name:'计数器'
  }
  constructor(props){
      //Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    super();//this.props = props;
    this.state = {number:0,users:[]};//初始化默认的状态对象
    console.log('1. constructor 初始化 props and state');
  
  }  
  //componentWillMount在渲染过程中可能会执行多次
  componentWillMount(){
    console.log('2. componentWillMount 组件将要挂载');
    //localStorage.get('userss');
  }
  //componentDidMount在渲染过程中永远只有执行一次
  //一般是在componentDidMount执行副作用，进行异步操作
  componentDidMount(){
    console.log('4. componentDidMount 组件挂载完成');
    fetch('https://api.github.com/users').then(res=>res.json()).then(users=>{
        console.log(users);
        this.setState({users});
    });
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log('Counter',nextProps,nextState);
    console.log('5. shouldComponentUpdate 询问组件是否需要更新');
    return true;
  }
  componentWillUpdate(nextProps, nextState){
    console.log('6. componentWillUpdate 组件将要更新');
  }
  componentDidUpdate(prevProps, prevState)){
    console.log('7. componentDidUpdate 组件更新完毕');
  }
  add = ()=>{
      this.setState({number:this.state.number});
  };
  render() {
    console.log('3.render渲染，也就是挂载')
    return (
      <div style={{border:'5px solid red',padding:'5px'}}>
        <p>{this.props.name}:{this.state.number}</p>
        <button onClick={this.add}>+</button>
        <ul>
            {
                this.state.users.map(user=>(<li>{user.login}</li>))
            }
        </ul>
        {this.state.number%2==0&&<SubCounter number={this.state.number}/>}
      </div>
    )
  }
}
class SubCounter extends Component{
    constructor(props){
        super(props);
        this.state = {number:0};
    }
    componentWillUnmount(){
        console.log('SubCounter componentWillUnmount');
    }
    //调用此方法的时候会把新的属性对象和新的状态对象传过来
    shouldComponentUpdate(nextProps,nextState){
        console.log('SubCounter',nextProps,nextState);
        if(nextProps.number%3==0){
            return true;
        }else{
            return false;
        }
    }
    //componentWillReceiveProp 组件收到新的属性对象
    componentWillReceiveProps(){
      console.log('SubCounter 1.componentWillReceiveProps')
    }
    render(){
        console.log('SubCounter  2.render')
        return(
            <div style={{border:'5px solid green'}}>
                <p>{this.props.number}</p>
            </div>
        )
    }
}

作者：秋天不落叶
链接：https://juejin.cn/post/6844904021233238024
```



## 生命周期

生命周期函数

旧版生命周期

ComponentWillMount(){}在新版生命周期中被弃用

ComponentDidMount(){}

ComponentWillReceiveProps(Props)在新版生命周期中被弃用

ShouldComponentUpdate(Props){}

ComponentWillUpdate(Props){}在新版生命周期中被弃用

ComponentDidUpdate(Props){}

ComponentWillUnmount(Props){}

当初次加载DOM时，下列生命周期函数会被依次调用：

- **`constructor()`**：初始化 state 或进行方法绑定
- `static getDerivedStateFromProps()`
- **`render()`**
- **`componentDidMount()`**：会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。

DOM更新时，会依次调用生命周期函数：

- `static getDerivedStateFromProps()`：`getDerivedStateFromProps` 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 `null` 则不更新任何内容。
- `shouldComponentUpdate()`：根据 `shouldComponentUpdate()` 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。
- **`render()`**
- `getSnapshotBeforeUpdate()`：在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 `componentDidUpdate()`
- **`componentDidUpdate()`** ：会在更新后会被立即调用。首次渲染不会执行此方法。当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。



`componentWillUnmount()` 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 `componentDidMount()` 中创建的订阅等。

错误处理生命周期函数



新版生命周期

static getDerivedStateFromProps

`static getDerivedStateFromProps(nextProps,prevState)`：接收父组件传递过来的 `props` 和组件之前的状态，返回一个对象来更新 `state` 或者返回 `null` 来表示接收到的 `props` 没有变化，不需要更新 `state`

**该生命周期钩子的作用：** 将父组件传递过来的 `props` **映射** 到子组件的 `state` 上面，这样组件内部就不用再通过 `this.props.xxx` 获取属性值了，统一通过 `this.state.xxx` 获取。映射就相当于拷贝了一份父组件传过来的 `props` ，作为子组件自己的状态。注意：子组件通过 `setState` 更新自身状态时，不会改变父组件的 `props`

配合 `componentDidUpdate`，可以覆盖 `componentWillReceiveProps` 的所有用法

**该生命周期钩子触发的时机：**

- 在 React 16.3.0 版本中：在组件实例化、接收到新的 `props` 时会被调用
- 在 React 16.4.0 版本中：在组件实例化、接收到新的 `props` 、组件状态更新时会被调用

getSnapshotBeforeUpdate

`getSnapshotBeforeUpdate(prevProps, prevState)`：**接收父组件传递过来的 `props` 和组件之前的状态，此生命周期钩子必须有返回值，返回值将作为第三个参数传递给** `componentDidUpdate`。必须和 `componentDidUpdate` 一起使用，否则会报错

**该生命周期钩子触发的时机** ：被调用于 `render` 之后、更新 `DOM` 和 `refs` 之前

**该生命周期钩子的作用：** 它能让你在组件更新 `DOM` 和 `refs` 之前，从 `DOM` 中捕获一些信息（例如滚动位置）

配合 `componentDidUpdate`, 可以覆盖 `componentWillUpdate` 的所有用法

### 异步生命周期

react的生命周期函数可以写成async的形式，使用async之后函数体中可以使用await

但是要注意使用，比如

```react
async shouldComponentUpdate() {
  return false;
}
```

正常情况下，如果shouldComponentUpdate返回的是false，组件不会被重新渲染。但是指定为async时返回promise.resolve，一个promise被转化为bool类型，绝对是true，因此shouldComponentUpdate返回的永远是true。

此外，fiber架构中使用异步渲染，render之前的生命周期函数会被调用多次，因此尽量保持render之前的生命周期不要产生副作用

所以async使用的生命周期一般是componentDIdMound和componentDitUpdate





### 旧版生命周期函数被弃用的原因

ComponentWillReceiveProps(Props):getDerivedStateFromProps与ComponentDidUpdate配合，可以覆盖ComponentWillReceiveProps的所有用法

ComponentWillUpdate(Props){}:getSnapshotBeforeUpdate与ComponentWillUpdate配合，可以覆盖ComponentWillUpdate的所有用法

ComponentWillMount(){}:

##  事件处理

React事件的命名采用小驼峰式命名，而不是纯小写

使用jsx语法是传入函数作为事件处理函数而不是字符串，这体现在写法上

```jsx
//html
<button onclick="active()">
      active
</button>
//React
<button onClick={active}>
      active
</button>
```

此外，阻止标签的默认行为需要在函数中显示使用preventDefault。

```jsx
//html中写法，阻止a标签默认打开链接
<a href="#" onclick="console.log('this link is clicked');return false">
   click me
</a>
//react组件中写法，阻止a标签默认打开链接
function Actionlink() {
    function handleClick(e){
        e.preventDefault();
        console.log('this link is clicked');
    }
    return {
        <a href="#" onClick={handleClick}>
        Click me
        </a>
    }
}
```

e是一个合成事件，类似于python函数的this参数

class声明的组件，事件不会自动绑定this，如果事件未写明绑定this，调用函数时this的值是undefined

在constuctor中绑定

```jsx
constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
}
```

绑定this参数的三种方式

直接使用bind绑定this参数

在构造函数中传参

箭头函数：()=>(){}

事件传递参数

```jsx
<button onClick={(e) => this.deleteRow(id,e)}>DeleteRow</button>
<button onClick={this.deleteRow.bind(this,id)}>DeleteRow</button>
```

通过箭头函数和function.prototype.bind实现

## Ref属性

ref是react提供的属性，通过它我们可以访问DOM节点或者组件

```

```



## 条件渲染

React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) 或者[条件运算符](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI。

```react
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```



## Redux

Facebook 有一个 Flux 的实现，但是我们会使用 Redux 库。 它使用相同的原理，但是更简单一些。 Facebook 现在也使用 Redux 而不是原来的 Flux。

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

redux-thunk

用于异步action，允许你的action可以返回函数, 带有dispatch和getState两个参数, 在这个action函数里, 异步的dispatch action;

redux-saga

功能类似redux-thunk，用于异步action，原理是通过generator函数，相比于thunk更复杂一些，集中处理了action，支持dispatch后的回调。

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

