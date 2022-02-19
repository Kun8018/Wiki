---
title: React（四）
date: 2020-06-02 21:40:33
categories: IT
tags: IT，Web,Node，React
toc: true
thumbnail: https://cdn.kunkunzhang.top/redux.jpeg
---

​      前端框架，快速开发页面，函数式编程，与后端api快速搭建

<!--more-->

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

### react、react-dom类型声明文件

使用tsx之前要安装react的声明文件，否则会报错找不到模块react

安装

```shell
npm install @types/react -s
npm install @types/react-dom -s
```



### 有状态组件

有状态组件中的state和props使用ts去定义类型

```tsx
import * as React from 'react'

interface IProps {
  color: string,
  size?: string
}
  
interface IState {
  count: number,
}

class App extends React.PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    count: 1
  }
  public render () {
    return (
    	<div>Hello world</div>
    )
  }
  public componentDidMount () {
  }
}
```



### 事件类型

常用Event事件对象类型

ClipboardEvent<T = Element> 剪贴板事件对象

DragEvent<T = element> 拖拽事件对象

ChangeEvent<T = element> Change事件对象

KeyboardEvent<T = element>  键盘事件对象

MouseEvent<T = element> 鼠标事件对象

TouchEvent<T = element> 触摸事件对象

WheelEvent<T = element> 滚轮事件对象

AnimationEvent<T = element> 动画事件对象

TransitionEvent<T = element> 过渡事件对象

```tsx
import { MouseEvent } from 'react'

interface Iprops {
  onClick (event: MouseEvent<HTMLDivElement>): void,
}
```



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

### recomponse



### react-three-fiber

在react中使用three.js的插件

安装

```shell
npm install three @react-three/fiber
##  如果使用ts还要安装ts包
npm install @types/three
```

使用

```react
/* eslint-disable */
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props: JSX.IntrinsicElements['mesh']) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!)
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}
```



### prop-types

使用第三方包 `prop-types` 可以对react的 `props` 进行类型校验

```react
 import React from 'react'
 // 导入包
 import PropTypes from 'prop-types'
 
 function About (props) {
   const { name, age } = props
   console.log(name, age)
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
 
 // 这里通过函数组件的 propTypes 属性设置类型校验
 // PropType.类型：规定传入类型
 // PropType.类型.isRequired：规定必须传入
 About.propTypes = {
   name: PropTypes.string.isRequired,
   age: PropTypes.number
 }
 
 export default About
```



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



### antd

Ant-Design是蚂蚁金服开发的面向React和Vue的类似于bootstrap的框架，官网链接为：https://ant.design/index-cn

安装包

```node
npm install antd --save
cnpm i antd -S
```



在App.css文件中导入样式

```css
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

Table

`antd` 的 `table` 组件，`table` 的 `columns` 有一个属性叫做 `align`，它的使用是控制当前列是居左、居中、居右的。

它的类型为AlignType,在`node_modules/rc-table/lib/interface.d.ts`中可以找到

```typescript
export declare type AlignType = 'left' | 'center' | 'right';
```

在使用时，如果对table进行二次封装，它的值

```react
const columns = [{
  align: 'right',
}]
```

此时会报错，类型推论会将align推论为string，而AlignType是字面量类型，没有string

使用as进行断言就不会报错

```typescript
import { AlignType } from 'rc-table/lib/interface.d.ts';

columns: [{
  align: 'right' as 'right'
  // 或者 align: 'right' as AlignType
}]
```



tooltip

tooltip组件需要禁用时没有直接的disable属性，使用onchange事件进行回调

```react
const checkTipVisible = (visible: boolean) => {
  VisibleCrtl.toggle(!Boolean(enableCreatePlan) ? visible : false);
};

<Tooltip
  title={formatMessage({
    id: 'CREATE_OPERATING_PLAN_ERROR',
  })}
  visible={visible}
  onVisibleChange={checkTipVisible}
  >
</Tooltip>
```





### pro-components

ProComponents 是基于 Ant Design 而开发的模板组件，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 CRUD 页面的效率，更加专注于页面。

ProLayout 解决布局的问题，提供开箱即用的菜单和面包屑功能

ProTable表格模板组件，抽象网络请求和表格格式化

ProForm表单模板组件，预设常见布局和行为

ProCard提供卡片切分以及栅格布局能力

ProDescription定义列表模板组件，ProTable 的配套组件

ProSkeleton页面级别的骨架屏

Proform有很多ProFormFields 表单项组件。这些组件本质上是 Form.Item 和 组件的结合，我们可以帮他们当成一个 FormItem 来使用，并且支持各种 `props`。每个表单项都支持 `fieldProps` 属性来支持设置输入组件的`props`。 同时支持了 `placeholder` 的透传，你可以直接在组件上设置 `placeholder`。

每个表单项同时也支持了 `readonly` ，不同的组件会有不同的只读样式，与 `disable` 相比 `readonly` 展示更加友好。生成的 dom 也更小，比如 ProFormDigit 会自动格式化小数位数。



### chakra-UI



### Material-UI



### Elastic-UI



### rsuitejs

Charts.rsuite.js



### blueprint.js



### NextUI

看起来很好看



### HeadlessUI

tailwind的公司开源的UI库



### echarts-for-react

安装

```shell
npm install --save echarts-for-react
```

使用

```react
import React from 'react';
import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');

<ReactECharts
  option={this.getOption()}
  notMerge={true}
  lazyUpdate={true}
  theme={"theme_name"}
  onChartReady={this.onChartReadyCallback}
  onEvents={EventsDict}
  opts={}
/>
```



### classnames

当react原生动态添加多个className时就会报错，这时我们就可以利用classnames库添加多个className,这也是react官方推荐使用

安装

```shell
npm install classnames --save
```

支持动态导入

```react
import classnames from 'classnames'

<div className=classnames({
    'class1': true,
    'class2': true
    )>
</div>    
```

支持class动态传入变量，或者传入数组

```react
import classNames from 'classnames';

render() {
  const classStr = classNames({
    'class1': true,
    'class2': this.props.isCompleted,
    'class3': !this.props.isCompleted
  });
  return (<div className={classStr}></div>);
}
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



### react-hook-form

简单好看的react form表单

安装

```shell
npm install react-hook-form
```

使用

```react
import React from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName')} /> {/* register an input */}
      <input {...register('lastName', { required: true })} />
      {errors.lastName && <p>Last name is required.</p>}
      <input {...register('age', { pattern: /\d+/ })} />
      {errors.age && <p>Please enter number for age.</p>}
      <input type="submit" />
    </form>
  );
}
```



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



### react-flow

安装

```shell
npm install --save react-flow-renderer
```

使用

```react
import React from 'react';
import ReactFlow from 'react-flow-renderer';

const elements = [
  { id: '1', type: 'input', data: {lable: 'Node 1'},position: {x: 250, y: 50}},
  { id: '2', data: {lable: <div>Node 2</div>}, position: {x: 100, y: 100}},
  { id: 'el-2', source: '1', targetL '2', animated: true}
]

export default ()=> <ReactFlow elements={elements}></ReactFlow>
```

React Flow有两个背景变体：点和线。您可以通过将其作为子级传递给`ReactFlow`组件来使用它

```react
import ReactFlow, { Background } from 'react-flow-renderer';

const FlowWithBackground = () => (
  <ReactFlow elements={elements}>
    <Background
      variant="dots"
      gap={12}
      size={4}
    />
  </ReactFlow>
);
```

可以通过将mini-map插件作为子级传递给`ReactFlow`组件来使用它：

```react
import ReactFlow, { MiniMap } from 'react-flow-renderer';

const FlowWithMiniMap = () => (
  <ReactFlow elements={elements}>
    <MiniMap
      nodeColor={(node) => {
        switch (node.type) {
          case 'input': return 'red';
          case 'default': return '#00ff00';
          case 'output': return 'rgb(0,0,255)';
          default: return '#eee';
        }
      }}
    />
  </ReactFlow>
);
```

控制面板包含zoom-in、zoom-out、fit-view和一个锁定/解锁按钮。

```react
import ReactFlow, { Controls } from 'react-flow-renderer';

const FlowWithControls = () => (
  <ReactFlow elements={elements}>
    <Controls />
  </ReactFlow>
);
```

如果需要访问`ReactFlow`组件外部的React Flow的内部状态和操作，可以用`ReactFlowProvider`组件包装它

```react
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer';

const FlowWithOwnProvider = () => (
  <ReactFlowProvider>
    <ReactFlow
      elements={elements}
      onElementClick={onElementClick}
      onConnect={onConnect}
    />
  </ReactFlowProvider>
);
```

https://www.5axxw.com/wiki/content/obkffc

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



### react-hot-toast

全屏的通知组件

安装

```shell
npm install react-hot-toast
```

使用

```react
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

const App = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
};
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



### nanoid





### react-virtualized



使用

```react
import {AutoSizer, List, CellMeasurerCache, CellMeasurer} from 'react-virtualized'

// 宽度固定
const measureCache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 60, 
})

// 每一行内容
const rowRenderer = ({ index, key, parent, style }) => {
    const item = records[index]

    return (
        <CellMeasurer cache={measureCache} key={key} parent={parent} rowIndex={index}>
            <div style={style}>
                content
            </div>
        </CellMeasurer>
    )
}

<AutoSizer>
    {({width, height}) => (
        <List
            width={width}
            height={height}
            deferredMeasurementCache={measureCache}
            rowCount={records.length}
            rowHeight={measureCache.rowHeight}
            rowRenderer={rowRenderer}
            className={styles.list}
        />
    )}
</AutoSizer>
```

无限滚动 + 可编辑表格

```react
import {Table, Column} from 'react-virtualized'
import {Input, Empty} from 'antd'

// 防止Input组件不必要的渲染
const MemoInput = React.memo(function (props) {
    const {rowIndex, field, handleFieldChange, ...restProps} = props
    return <Input {... restProps} onChange={(e) => handleFieldChange(field, e, rowIndex)} />
})

function VirtualTable(props) {
    // ...

    // 列, 使用useCallback优化
    const nameColumn = ({cellData, rowIndex, dataKey }) => {
        // ...
        return (
            <div>
                <MemoInput
                    placeholder="请输入姓名"
                    value={cellData}
                    rowIndex={rowIndex}
                    field="姓名"
                    handleFieldChange={handleFieldChange}
                />
            </div>
        )
    }
    
    // 表头
    const columnHeaderRenderer = useCallback(({dataKey}) => dataKey, [])

    const rowGetter = useCallback(({index}) => dataSource[index], [dataSource])

    const noRowsRenderer = useCallback(() => <Empty className={styles.empty} />, [])

    return <Table
        ref={tableRef}
        className={styles.virtualTable}
        headerClassName={styles.header}
        rowClassName={styles.row}
        headerHeight={TableHeaderHeight}
        width={TableWidth}
        height={TableHeight}
        noRowsRenderer={noRowsRenderer}
        rowHeight={TableRowHeight}
        rowGetter={rowGetter}
        rowCount={dataSource.length}
        overscanRowCount={OverscanRowCount}
    >
        <Column
            width={120}
            dataKey="姓名"
            headerRenderer={columnHeaderRenderer}
            cellRenderer={nameColumn}
        />
    </Table>
}
```



### react-window

react虚拟列表库 
React Window是一个有效呈现大型列表和表格数据的组件，是React-virtualized的完全重写。

React Window专注于使软件包更小，更快，同时API（和文档）对初学者尽可能友好。

安装

```shell
npm i react-window
```

固定高度列表

```react
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

const Example = () => (
  <List
    height={150}
    itemCount={1000}
    itemSize={35}
    width={300}
  >
    {Row}
  </List>
);
```

VariableSizeList （可变尺寸列表）

```react
import { VariableSizeList } from 'react-window';
 
const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));
 
const getItemSize = index => rowHeights[index]; // 此处采用随机数作为每个列表项的高度
 /** 
    * 每个列表项的组件
    * @param index：列表项的下标；style：列表项的样式（此参数必须传入列表项的组件中，否则会出现滚动到下方出现空白的情况）
    **/ 
const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);
 
const Example = () => (
  <VariableSizeList
    height={150} // 列表可视区域的高度
    itemCount={1000} // 列表数据长度
    itemSize={getItemSize} // 设置列表项的高度
    layout= "vertical" // （vertical/horizontal） 默认为vertical，此为设置列表的方向
    width={300}
  >
    {Row}
  <VariableSizeList>
);
```

结合react-virtualized-auto-sizer使列表自适应当前页面的宽高

```react
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
const Example = () => (
  <AutoSizer>
    {({ height, width }) => (
      <FixedSizeList
        className="List"
        height={height}
        itemCount={1000}
        itemSize={35}
        width={width}
      >
        {Row}
      </FixedSizeList>
    )}
  </AutoSizer>
);
```



### react-sticky

让组件实现类似position-sticky的效果

安装

```shell
npm install react-sticky
```

使用

```react
import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

class App extends React.Component {
  render() {
    return (
      <StickyContainer>
        {/* Other elements can be in between `StickyContainer` and `Sticky`,
        but certain styles can break the positioning logic used. */}
        <Sticky>
          {({
            style,
 
            // the following are also available but unused in this example
            isSticky,
            wasSticky,
            distanceFromTop,
            distanceFromBottom,
            calculatedHeight
          }) => (
            <header style={style}>
              {/* ... */}
            </header>
          )}
        </Sticky>
        {/* ... */}
      </StickyContainer>
    );
  },
}
```

sticky上可以添加不同的属性

```react
<StickyContainer>
  ...
  <Sticky topOffset={80} bottomOffset={80} disableCompensation>
    { props => (...) }
  </Sticky>
  ...
</StickyContainer>
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

