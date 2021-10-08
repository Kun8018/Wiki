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

### 为什么会有react和react-dom两个包？什么时候替换react-dom

react在v0.14之前是没有React DOM的，所有的功能都包含在React里。从v0.14开始，react被拆分成react和reactDom，因为有了react Native，react只负责web和mobile的通用核心部分，负责DOM操作的分到ReactDOM中，负责Mobile的包含在react-native中

react-dom只做和浏览器或者DOM相关的操作。如ReactDOM.render,reactDom.findDomNode(),如果是服务端渲染可以reactDOM.renderToString()。React不仅能通过ReactDom和web页面打交道，还能在服务端SSR，移动端React Native和桌面端Electron

web端代码

```react
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
	<div>
  	<h1>Hello React</h1>
  </div>
)

ReactDOM.render(<App/>,document.getElementById('root'))
```

React-native

```react
import React from 'react'
import { Text, View} from 'react-native'

const WelcomeScreen = () => (
	<View>
  	<Text>Hello</Text>
  </View>
)
```

React具有的api：

创建React元素：React.createElement()

创建React组件：React.Component()、React.PureComponent()

创建可包装函数：React.memo()

操作元素的api，进行转换元素操作：

cloneElement() isValidElement() React.children()

Fragments减少不必要嵌套的组件:

​	React.Fragments

Refs：

React.createRef

React.forwardRef

Suspense:

​	suspense使组件可以等待某些操作结束后再进行渲染。通过react.lazy动态加载组件

​	react.suspense

​	react.lazy

React-dom的api

render

hydrate

findDOMNode

unmountComponentAtNode

createPortal



promise.then(success,failed)he



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



history对象

监听路由变化

根据history对象判断路由变化作进一步操作

```react
class Header extends Component {
  
  componentWillReceiveProps (nextProps,nextState){
    if(this.props.location.pathname !== location.pathname){
        
    }
  }
  
  componentDidMount() {
    this.props.history.listen(location => {
      if(this.props.location.pathname !== location.pathname){
        
      }
    })
  }
  
  shouldComponentUpdate (nextProps){
    let preRouteName = this.props.location.pathname;
    let currentRouteName = this.props.location.pathname;
    return preRouteName !== currentRouteName;
  }
}
```

Https://reactrouter.com



### nginx与webpack配置

单页应用(SPA)一般只有一个index.html, 导航的跳转都是基于[HTML5 History API](https://link.juejin.cn/?target=http%3A%2F%2Fwww.w3.org%2Fhtml%2Fwg%2Fdrafts%2Fhtml%2Fmaster%2Fsingle-page.html%23the-history-interface)，当用户在越过index.html 页面直接访问这个地址或是通过浏览器的刷新按钮重新获取时，就会出现404问题；

在`webpack.config.js`里面增加配置：

```javascript
devServer {
	historyApiFallback: true
}
```

`webpack` 里面的 `historyApiFallback` 使用的是`connect-history-api-fallback`

```nginx
location /react {
    alias /project/react/;
    # browserHistory模式 404问题
    try_files $uri $uri/ /react/index.html;
    index index.html;
    autoindex on;
}
```

autoindex on; 开启这个，输入到/react 会直接定向到index.html;

try_files 主要解决的是，如果在一些目录下找不到 index.html， 会最终有一个保底资源的路径就是 /react/index.html；



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

### 受控组件与非受控组件

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

### ref与OnRef

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

不把上一个props传递过来的原因：

1.在第一次调用getDerivedStateFromProps后，prevprops参数为null，需要在访问prevprops之前添加if-not-null逻辑检查

2.不把以前的props传递给这个函数，可以把之前不需要用的props释放掉，避免内存占用

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

所以async使用的生命周期一般是componentDIdMount和componentDitUpdate



### 旧版生命周期函数被弃用的原因

这三个生命周期容易被和误解和滥用

**ComponentWillReceiveProps(Props)**:react 16之前使用componentWillReceiveProps来做props比较，然后更新组件的state。16及16之后推荐响应props更改的方法使用static getDerivedStateFromProps生命周期。该方法

getDerivedStateFromProps与ComponentDidUpdate配合，可以覆盖ComponentWillReceiveProps的所有用法

**ComponentWillUpdate(Props){}**:官方推荐用getDerivedStateFromProps回调里面处理传递过来的props，然后将异步数据放在componentDidupdate中。

在更新列表数据时，需要保持滚动条的位置。可以在getSnapshotBeforeUpdate获取dom的属性，例如offsetHeight、scrollHeight等，将React的值作为参数传递给componentDidUpdate

getSnapshotBeforeUpdate与ComponentWillUpdate配合，可以覆盖ComponentWillUpdate的所有用法

**ComponentWillMount(){}**:通常为了提前setState，防止二次渲染(第一次是空state渲染，第二次外部数据渲染)，经常在ComponentWillMount请求数据。但是这样可能会导致异步获取外部数据不一定在渲染之前返回，也意味着组件也有可能会被渲染一次，为了后面新版本实现异步渲染，建议请求放在componentDidMount来调用。还有一个问题是在服务端渲染（Next.js）时，componentWillMount会导致服务端和客户端各渲染一次，而componentDidMount只在客户端渲染一次（有问题直接下掉）

### 新旧生命周期兼容

使用unsafe字样



使用react-lifecycles-compat

安装

```shell
npm install react-lifecycles-compat --save
```

使用

```react
import {polyfill} from 'react-lifecycles-compat'

class ExampleComponent extend React.Component {
  static getDerivedStateFromProps(nextProps,prevState){
    
  }
  getSnapshotBeforeUpdate(preProps,prevState){
    
  }
}

polyfill(ExampleComponent)

export default ExampleComponent;
```





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



