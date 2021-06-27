---
title: HTML/CSS
date: 2020-08-02 21:40:33
categories: 技术博客
tags: Web，IT，HTML，CSS
toc: true
thumbnail: http://cdn.kunkunzhang.top/css3.png
---

​      html和css是做网页和前端的基础，也是基本构成

​      从开始学习前端之后，其实一直没有特别地学习过html和css。最开始写过一周之后，因为想要搭建好看的样式，开始使用bootstrap，再后来学习spa应用，react和vue，使用框架和库能快速地搭建想要的界面。

​      直到后面找前端工作参加面试的时候和参加工作之后开始写，才发现html和css还是前端基本功，包括vue和react其实也只是封装了很多东西，一定要了解基础原理和改进方法才能用好。

​     所以继续开始记录。

<!--more-->

## CSS

### 滚动条样式

webkit下滚动条主要有7个属性：

::webkit-scrollbar：滚动条整体部分，可以设置宽度等

::webkit-scrollbar-button：滚动条两端的按钮

::webkit-scrollbar-track：外层轨道

::webkit-scrollbar-track-piece：内层滚动槽

::webkit-scrollbar-thumb：滚动的滑块

::webkit-scrollbar-corner：边角

::webkit-resized：定义右下角拖动块的样式

上述七个属性都可以设置边框、阴影、背景图片、背景颜色等等。此外下面的伪类可以应用到上述的伪元素中：

:horizontal//适用于任何水平方向的滚动条

:vertical//适用于任何垂直方向的滚动条

:decrement//标识按钮或内层轨道是否会减小

:increment//标识按钮或者内层轨道是否会增大视窗的位置，比如垂直滚动条的下边和水平滚动条的右边

:start：标识对象是否放在滑块的前面

:end：标识对象是否放在滑块的后面

:double-button：判断一个按钮是否自己同一端的一对按钮中的一个，或者内层轨道是否紧靠一对按钮

:single-button：判断一个按钮是否自己独立的在滚动条的一段，或者内层轨道是否紧靠一个single-button

:no-button：判断内层轨道是否要滚到滚动条的终端

:corner-present：指示滚动条圆角是否显示

:window-inactive：指示应用滚动条的某个页面容器是否当前被激活

ie下相对简单，只能设置颜色：

Scrollbar-3dlight-color：滚动立体条亮边的颜色

Scrollbar-highlight-color：滚动条的高亮颜色

Scrollbar-face-color：立体滚动条的颜色

Scrollbar-arrow-color：三角箭头的颜色

Scrollbar-shadow-color：立体滚动条阴影的颜色

Scrollbar-dark-shadow-color：立体滚动条外阴影的颜色

Scrollbar-base-color：滚动条基色

Scrollbar-track-color：滚动条背景颜色

Https://segmentfault.com/a/1190000012800450

### 字体

 在不同操作系统、不同游览器里面默认显示的字体是不一样的，并且相同字体在不同操作系统里面渲染的效果也不尽相同，

windows平台

`微软雅黑`为Win平台上最值得选择的中文字体，但非游览器默认，需要设置；西文字体的选择以`Arial`、`Tahoma`等无衬线字体为主。

mac os

`苹方`和`San Francisco`为苹果推出的最新字体，显示效果也最为优雅

安卓

`Droid Sans`为安卓系统中默认的西文字体，是一款人文主义无衬线字体，而`Droid Sans Fallback`则是包含汉字、日文假名、韩文的文字扩展支持。

ios系统

iOS系统的字体和Mac OS系统的字体相同，保证了Mac上的字体效果，iOS设备就没有太大问题。

linux

文泉驿微米黑：几乎是 Linux 社区现有的最佳简体中文字体。

引入不同字体时中文和英文的字体是不同的。先声明英文字体，再声明中文字体。

苹方（PingFang SC）、黑体-简（Heiti SC）、冬青黑体（ Hiragino Sans GB ）、Microsoft Yahei（微软雅黑）、宋体（SimSun）

css中引入

```css
font-family:"PingFang SC",
```

字体族大体上分为两类：`sans-serif（无衬线体）`和`serif（衬线体）`，一般非衬线字体在显示器中的显示效果会比较好，一般非衬线字体在显示器中的显示效果会比较好，

### CSS动画

css中动画的原理是从一套css样式变到另一套css样式

变形（tansform）

属性

rotate:以中心为原点旋转一定角度，分为rotate()、rotateX()、rotateY()、rotateZ()、rotate3D()

skew:扭曲，分为skew(x,y),skewX(x),skewY(x)

Scale:缩放，分为scale(x,y),scaleX(x),scaleY(y)、scaleZ(z)、scale3D(z)

translate:位移，分为translateX(),translateY(),translateZ(),translate3D()

Matrix:变换综合应用，矩阵变换



过渡动画transition

类似于hero动画，在同一元素的两种样式之间添加过渡动画

`transition-property`：指定哪个或哪些 CSS 属性用于过渡。只有指定的属性才会在过渡中发生动画，其它属性仍如通常那样瞬间变化。

`transition-duration`指定过渡的时长。或者为所有属性指定一个值，或者指定多个值，为每个属性指定不同的时长。

`transition-timing-function`指定一个函数，定义属性值怎么变化。

`transition-delay`指定延迟，即属性开始变化时与过渡开始发生时之间的时长。



动画

Animation

animation是css3新添加的属性，用来为元素实现动画效果。animation无法单独承担动画的效果，需要承载动画的另一个属性-@keyframes，@keyframes定义的动画并不直接执行，需要借助animation来运转

通过百分比来规定动画中发生改变的时间。0%表示动画开始的时间，50%表示动画执行到一半的时间，100%表示动画结束的时间。百分比后的花括号动画在该节点要达到的效果。也可以用关键字表示节点，from表示0%，to表示100%

实例

```css
@keyframes animationname{
  keyframes-selector {
    css-style
  }
}
/*定义mymove动画，定义0%、25%、50%、75%、100%五个阶段的样式*/
@keyframes mymove {
  0%{top:0px; background:red; width:100px; -webkit-transform: rotate(0deg);
        transform: rotate(0deg);}
  25%{top:200px;}
  50%{top:100px;}
  75%{top:200px;}
  100%{top:200px; background:yellow; width:300px;-webkit-transform:        rotate(360deg);transform: rotate(360deg);}
}
/*在load-border中引入mymove animation，定义线性与非线性、循环等属性*/
.load-border {
    width: 120px;
    height: 120px;
    background: url(../images/loading_icon.png) no-repeat center center;
    -webkit-animation: mymove 1.4s infinite linear;
    animation: mymove 1.4s infinite linear; 
}
```

使用时为了兼容不同浏览器，可以加上-webkit-、-o-、-ms-、-moz-、-khtml-等前缀

#### hover动画

上浮

下浮

前后翻转

左右翻转





#### js实现css动画

纯css animation或者transform的动画，js不好进行控制，因此可以使用js生成基于element.animate的动画，以便使用web animate api和其他事件(如点击按钮)进行互动。

```javascript
//像css keyframes一样，先定义关键帧
var boxframes = [
  {
    transform:'tranlateX(0)',
    background:'red',
    borderRadius:0
  },
  {
    transform:'translateX(45vw) scale(.5)',
    background:'orange',
    borderRadius:0
  },
  {
    transform:'translateX(90vw)',
    background:'green',
    borderRadius:'50%'
  }
]
//获取要执行动画的DOM
var boxref = document.getElementById("box")
//在该DOM上通过element.animate api执行动画
var boxanimation = boxref.animate(boxframes,
 {
  duration: 5000,//动画执行时长
  fill:'both',
  easing:'linear',
  iterations:'Infinity',
})
```

其他对动画的操作通过动画对象实现

实例对象的属性：

```javascript
boxanimation.currentTime:获取或设置动画的当前时间值
boxanimation.effect：获取或设置动画的目标效果
boxanimation.id 用于表示动画的字符串
boxanimation.playbackRate:用于获取或设置动画回放速率的整数，1表示支持，0表示暂停，2表示双倍，-1表示反向
boxanimation.ready：
boxanimation.finish：
boxanimation.startTime：
boxanimation.timeline：
```

实例对象的方法：

```javascript
boxanimation.cancel() //取消动画
boxanimation.finish()  //立即完成一个动画
boxanimation.pause()  //暂停动画
boxanimation.play()   //播放动画
boxanimation.reverse()  //颠倒动画的方向，反向播放
```

实例对象的事件

```javascript
//当动画取消时触发
boxanimation.cancle = function(){
  boxanimation.reverse();
}
//当动画完成时触发
boxanimation.finish = function(){
  boxanimation.reverse();
}
```

#### 监测动画掉帧的方法

Chrome dev tool中Timeline的Frame模块

地址栏输入“chrome:flags”搜索“fps”，将FPS计数器开启，浏览器重启后右上角会实时显示帧速率

### 滚动视差的实现

`background-attachment`：如果指定了 `background-image` ，那么 `background-attachment` 决定背景是在视口中固定的还是随着包含它的区块滚动的。

属性：

`scroll`：表示背景相对于元素本身固定， 而不是随着它的内容滚动。

`local`：表示背景相对于元素的内容固定。如果一个元素拥有滚动机制，背景将会随着元素的内容滚动， 并且背景的绘制区域和定位区域是相对于可滚动的区域而不是包含他们的边框。

`Fixed`:



### 浏览器兼容性问题

使用css时加上-webkit-、-o-、-ms-、-moz-、-khtml-等前缀

### GPU加速

现代的浏览器通常会有两个重要的执行线程，这两个线程协同工作来渲染一个网页：主线程和合成线程

一般情况下，主线程负责运行JavaScript，计算HTML元素的CSS样式，页面的布局，将元素绘制到一个或者多个位图，将这些位图交给合成线程

合成线程负责通过GPU将位图绘制到屏幕上，通知主线程更新页面中可见或即将变成可见的部分的位图，计算出页面中哪部分时可见的，计算出当你滚动页面时哪部分是即将变成可见的，当你滚动页面时即将相应的页面移动到可视区域

CSS animation、transforms以及transitions不会自动开启GPU加速，而是由浏览器缓慢的软件渲染引擎来执行。但是像Chrome、Firefox、Safari和最新的Opera都支持硬件加速。我们需要手动触发。

浏览器会在元素的3D变换时开启，对于没有3D变换的效果，可以使用translateZ(0)来骗过浏览器，开启硬件加速

```css
.cube{
  -webkit-transform:translateZ(0);
  -moz-transform:translateZ(0);
  -ms-transform:translateZ(0);
  -o-transform:translateZ(0);
  transform:translateZ(0);
}
```

在chrome和safari中使用translateZ开启GPU加速后可能会有页面闪烁的问题，使用下面的代码修复此情况

```javascript
.cube{
  -webkit-backface-visibility:hidden;  
  -moz-backface-visibility:hidden;
  -ms-backface-visibility:hidden;
  backface-visibility:hidden;
  
  -webkit-perspective:1000;
  -moz-perspective:1000;
  -ms-perspective:1000;
  perspective:1000;
}
```

在webkit的浏览器中使用另一个行之有效的方法

```css
.cube{
  -webkit-transform:translate3d(0,0,0);  
  -moz-transform:translate3d(0,0,0);
  -ms-transform:translate3d(0,0,0);
  transform:translate3d(0,0,0);
}
```

原生的移动端应用总是可以很好地应用GPU，这就是它比网页应用表现更好的原因，硬件加速在移动端尤其有用，因为它可以有效地减少资源地利用

适合使用transform3d或者translateZ开启GPU硬件加速的使用范围：

- 使用很多大尺寸图片(尤其是PNG24)进行动画的时候

- 页面有很多大尺寸图片并且进行了CSS缩放处理，页面可以滚动时

- 使用background-size：cover设置大尺寸背景图，并且页面可以滚动时

- 编写大量DOM元素进行CSS动画时(transition/transform/keyframes/absTop/left)

- 使用很多PNG图片拼接成CSS Sprite时

GPU缺点：

GPU增加了内存的使用，而且它会减少移动端电池的使用寿命，所以确保需要时使用

### SCSS

**[Sass](https://link.zhihu.com/?target=http%3A//sass-lang.com/)**是成熟、稳定、强大的**CSS预处理器**，**SCSS**是**Sass3**版本当中引入的新语法特性，完全兼容CSS3的同时继承了**Sass**强大的动态功能。

[Scss](https://sass-lang.com/) 是 CSS 的扩展， 在保证兼容性的基础上， 允许使用变量、 嵌套、 混合、 导入等特性， 在编写大量的 CSS 文件时很有帮助。

Scss 是 CSS3 的扩展， 在 CSS3 的基础上， 添加了下面几个重要的特性。

支持使用变量

Scss 支持使用 `$` 符号来定义变量， 支持的变量类型有 `数字（可带单位）`、 `字符串` 、`颜色` 以及 `布尔值`、数组list、对象map、函数function 等，

css支持两种类型的字符串，使用单/双引号的和没有使用引号的。css可以自动识别两种字符串。

```scss
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

loader生成的css文件为

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

更为直观的嵌套语法

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

输出的css文件为

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

nav li {
  display: inline-block;
}

nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

支持导入其他文件

```scss
// _reset.Scss
html,
body,
ul,
ol {
   margin: 0;
  padding: 0;
}

/* base.Scss */
@import 'reset';

body {
  font-size: 100% Helvetica, sans-serif;
  background-color: #efefef;
}
```

输出的css格式为

```css
html, body, ul, ol {
  margin: 0;
  padding: 0;
}

body {
  background-color: #efefef;
  font-size: 100% Helvetica, sans-serif;
}
```

继承

```scss
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}

.error {
  @extend .message;
  border-color: red;
}

.warning {
  @extend .message;
  border-color: yellow;
}
```

输出的css文件为

```css
.message, .success, .error, .warning {
  border: 1px solid #cccccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}

.warning {
  border-color: yellow;
}
```

分部

以下划线开头的文件 (`_partial.Scss`) 不会被输出， 可以被导入到其它文件。

支持运算符

scss支持加减乘除等基本运算符

```scss
.container { width: 100%; }

article[role="main"] {
  float: left;
  width: 600px / 960px * 100%;
}

aside[role="complimentary"] {
  float: right;
  width: 300px / 960px * 100%;
}
```

输出css文件为

```css
.container {
  width: 100%;
}

article[role="main"] {
  float: left;
  width: 62.5%;
}

aside[role="complimentary"] {
  float: right;
  width: 31.25%;
}
```

#### scss与sass、less的区别

Sass(Syntactically Awesome Stylesheet)是一种动态样式语言，比css多出很多功能(如变量、嵌套、运算、混入、继承、颜色处理、函数等等)。

但是sass属于缩排语法，对于习惯CSS前端写法的来说很不直观，因此sass的语法进行了改良，sass 3就变成了scss。scss是css语法的拓展，用{}取代了缩进

Less也是一种动态样式语言，对Css赋予了动态语言的特性，比如变量、继承、运算、函数，less既可以在客户端上运行，也可以在服务端运行

scss与less的区别

1.编译环境不一样

scss是在服务端处理的，以前是Ruby，现在是Dart-Scss或者Node-Scss，而less是需要引入less.js来处理less代码输出css到浏览器，也可以在开发服务器将less语法编译成css再输出css到生产包目录，也有在线编译工具

2.变量符不一样

less是@，scss是$

3.输出设置。Less没有输出设置，Scss提供四种输出设置

nested：嵌套缩进的css代码

Expanded：展开的多行代码

compact:简洁格式的css代码

compressed：压缩后的css代码

4.Scss支持条件语句if{}else{}循环语句for{}循环等等，而less不支持

5.引用外部css文件

scss使用@import引用外部文件，如果不想编译生成同名的css文件，命名必须以_开头，scss会认为该文件是一个引用文件，不会将其编译为同名的css文件

less的引用与css的@import没什么差异

6.scss和less的工具库不同

Less有UI组件库Bootstrap，Bootstrap的样式文件部分源码就是less写的

Scss有工具库Compass，Compass与Scss的关系就像JQuery与JavaScript，封装了一系列有用的模块和模版，补充强化了Scss的功能

7.安装体验不同

使用npm或者yarn安装less很容易，而scss没有翻墙的话容易安装失败

总结：

less和scss都是css的强化版本，scss比less强大，是一种真正的编程语言，而less相对清晰明了，易于上手，对编译环境要求宽松。编译scss一般要安装ruby，ruby官网国内访问不了，所以更倾向于选择less



#### less转化成css的过程（lessloader、cssloader）

less配置

```javascript
{
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
}
```

涉及到3个loader：less-loader、css-loader、style-loader

Less-loader的作用就是将less代码转译为浏览器可以识别的CSS代码。

Css-loader的作用主要是解析css文件中的@import和url语句，处理css-modules，并将结果作为一个js模块返回。

经过css-loader的转译，我们已经得到了完整的css样式代码，style-loader的作用就是将结果以style标签的方式插入DOM树中。

但css-loader返回的不是css样式代码的文本，而是一个js模块的代码，将这些js代码直接放进style标里显然是不行的。

style-loader的设计思路：

- css-loader返回的样式只能通过其js模块的运行时得到，故使用`require`语句取得
- normal方法实际上什么都没做，在pitch方法里`中断loader链的执行`，再以inline方式调用了后方的loader来加载当前的less文件
- 如果将pitch中的实现放到normal方法里，就会造成loader链执行两遍
- 如果requestPath中没有'!!'前缀，就会造成loader链被无限循环调用

style-loader的实现逻辑比较绕，也是一个比较经典的`pitch`应用，理解了它的原理，就可以是说对loader的调用链、执行顺序和模块化输出等有了一个比较全面的认识。







