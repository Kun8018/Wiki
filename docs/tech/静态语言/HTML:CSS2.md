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

### 常见的CSS属性

**curser**:css设置光标的类型，在鼠标悬停在元素上时显示相应的样式

​              default：默认指针，通常是箭头。crosshair：十字交叉指针光标   help：带问号的箭头。pointer：手型

​              progress：指针旁带沙漏   wait：没有指针的沙漏  Text:文本      vertical-text：垂直文本    

​              move：指示物体可被移动  no-drop：当前位置不能被扔下 not-allowed：当前位置不能执行

​              grab:可被抓取 grabbing：抓取中 row-resize：上下双向分隔箭头 col-resize：左右双向分隔箭头

​              n-resize:上箭头 e-resize：右键头 s-resize：下箭头 w-resize：左箭头

​              ne-resize:右上箭头  nw-resize:左上箭头 se-resize:右下箭头 sw-resize:左下箭头

​              ew-resize:左右双向箭头 ns-resize：上下双向箭头 nesw-resize：右上左下双箭头

​              zoom-in：放大显示      zoom-out：缩小显示

**opacity**：不透明度

**表格元素**

自动根据内容换行：

word-break：

属性值：normal：默认值，按字词截断换行

​               break-all：强行截断并换行

​               keep-all：自适应文本宽度，不截断不换行

table-layout：auto：默认值

​                         fixed：宽度固定，截断超出的内容

**文本**

letter-spacing：用于设置文本字符的间距表现

属性：normal：按照当前字体的正常间距确定的

或者指定宽度：1px，rem这样

Text-transform:指定文本元素的大小写。

text-transform:控制文本大小写 direction：书写方向 color:文本颜色

text-indent：规定文本首行的缩进 white-space：处理元素的空白如nowrap表示文本不会换行

letter-spacing/Word-spacing:设置字符/单词间距  text-wrap 规定文本的换行规则 

Text-align:文本对齐方式 text-align-last:最后一行的对齐方式 text-transform:定义文本的大小写 text-shadow:添加阴影

text-overflow:设置文本溢出时的属性，clip表示修剪，ellipsis表示用省略号代替被修剪的文本，string表示用字符串代替被修剪的文本

word-wrap：允许对长的不可分割的单词进行分割并换行到下一行。

**position**：fixed：相对于视口（viewport，浏览器窗口）进行偏移，即定位基点是浏览器窗口。这会导致元素的位置不随页面滚动而变化，好像固定在网页上一样。

​                  absolute：绝对定位，相对于上级元素进行偏移，如果指定定位基点是**父元素**需父元素需**指定position值**，否则是相对屏幕定位。

​                   relative：相对于默认位置（即`static`时的位置）进行偏移，即定位基点是**元素的默认位置**。无论父级存在不存在，无论有没有TRBL，均是以父级的左上角进行定位，但是父级的Padding属性会对其影响。

​                   static：position的默认值，浏览器会按照源码的顺序，决定每个元素的位置，这称为"正常的页面流"（normal flow）。每个块级元素占据自己的区块（block），元素与元素之间不产生重叠，即忽略left、top、right、bottom、z-index等属性。**使用static 定位或无position定位的元素z-index属性是无效的。**

指定为absolute时，必须有left、right、top等元素才能生效。

**overflow**：定义溢出元素内容区的内容会如何处理。如果值为 scroll，不论是否需要，用户代理都会提供一种滚动机制。

​                   visiable:默认值，元素不会被折叠，呈现在元素框之外

​                  hidden：内容超出会被修剪，超出内容不可见

​                  scroll：内容超出会被修剪，但是浏览器会显示滚动条以便查看其余的内容。

​                  auto：内容超出会被修剪，但是浏览器会显示滚动条以便查看其余的内容。

​                  inherit：从父元素继承 overflow 属性的值。

overflow要指定dom的宽度width:200px，配合text-overflow使用
Text-overflow:ellipsis 省略号

 clip：剪裁

#### position各属性的区别

relative与absolute的区别：

1.relative在正常流中的位置存在，absolute在正常流中不存在。

2.relative定位的层总是相对于其最近的父元素，无论其父元素是何种定位方式。对于absolute定位的层总是相对于其最近的定义为absolute或relative的父层，

fixed与absolute的区别：

fixed参照位置是浏览器窗口的左上角，即坐标点为(0px, 0px)

absolute参照位置是离当前元素最近的定位方式为fixed,absolute,relative的祖先原则的左上角，

在有滚动条的情况下，fixed定位不会随滚动条移动而移动，而absolute则会随滚动条移动

#### 清除float的方法

1.添加新元素或者在浮动后面的元素上设置clear:both属性

优点：简单，代码少，浏览器兼容性好

缺点：清除浮动比较多时要添加大量无语义的html元素，代码不够优雅，后期不容易维护

2.使用css的overflow属性

给浮动元素添加overflow:hidden或者overflow:auto的属性，清除浮动。如果在ie6中使用此方式，还需要在父元素设置zoom为1.

在添加overflow后，浮动元素又回到了容器层，把容器高度撑起，达到了清理浮动的效果

3.使用伪元素

给浮动元素的容器添加一个clearfix的class，然后给这个class添加一个:after的伪元素实现元素末尾添加一个看不到的块元素清除浮动

此外，ie中可以设置zoom:1触发清除浮动、清除margin重叠等作用，webkit也支持，firefox不支持

小模块里使用overflow，页面主要布局使用:after伪元素

### 写法分类

原生css有四种：

行内样式:直接在html中的style属性编写css代码

内嵌样式:编写class，在html中style标签中引入class

导入样式:在内联样式中通过@import方法导入其他样式，供当前页面使用

外部样式：在html中通过link标签加载样式，提供给当前页面使用

推荐使用内嵌样式和外部样式

行内样式的缺点：

1.样式不能复用

2.样式的权重太高，样式不好覆盖

3.表现层与结构层没有分离

4.不能进行缓存，影响加载效率

导入样式的缺点：

1.导入样式只能放到第一行，放在其他行会无效

2.@import声明的样式表不能充分利用浏览器并发请求资源的行为，其加载行为往往会延后触发或被其他资源挂起

3.由于@import样式表的延后加载，可能导致页面样式闪烁

### 模块化

使用css-loader，设置options.module为true

构建时根据文件到位置、内容生成一个全局唯一的base64字符串，替换原来的名称以解决全局命名冲突的问题，这样就达到了模块化的目的

### 常见布局

布局的基本方案：基于盒模型，依赖position属性+float属性+display属性定位

#### 三列布局

左右定宽，中间自适应，五种方法

利用表格（table/table-cell）布局、利用浮动（float）布局

利用栅格（grid）布局、利用绝对定位（absolute）布局

利用弹性和（flex-box）布局

html页面

```html
<body>
  <section id="container">
    <!--注意！！.left和.right谁在前都可以，但是.center必须在它俩后面-->
    <aside class="left">left(定宽)</aside>
    <aside class="right">right(定宽)</aside>
    <main class="center">center(宽度自适应)</main>
  </section>
</body>
```

css布局

```css
/***CSS***/
.left {
    width: 200px;
    height: 100vh;
    background: #61daa5;
    /* 左侧左浮动 */
    float: left;
}
.right {
    width: 200px;
    height: 100vh;
    background: #ffa7e9;
    /* 右侧右浮动 */
    float: right;
}
.center {
    height: 100vh;
    background: #78a5f1;
    /* 多出10px，是给左中右三栏留出10px间距 */
    margin-left: 210px;
    margin-right: 210px;
}
```

https://caogongzi.gitee.io/2019/04/02/three-columns-layout/

#### 两列布局

与三列布局类似，一栏定宽，一栏自适应，也有五种实现方案



4.dispaly:flex,右边设置flex：1

角度单位有四种

deg度数，一个圆共360度，grad梯度，一个圆共400梯度，rad弧度，一个圆共2n弧度，turn转、圈，一个圆共1转，



#### 品字布局

```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>品字布局</title>
  <style>
    * {
        margin: 0;
        padding: 0;
      }
      div {
        width: 100%;
        height: 100px;
        background: red;
        font-size: 40px;
        line-height: 100px;
        color: #fff;
        text-align: center;
      }
      .div1 {
        margin: 0 auto 0;
      }
      .div2 {
        background: green;
        float: left;
        width: 50%;
      }
      .div3 {
        background: blue;
        float: left;
        width: 50%;
      }
  </style>
</head>

<body>
  <div class="div1">1</div>
  <div class="div2">2</div>
  <div class="div3">3</div>
</body>
</html>
```



### 常见图形

使用css绘制斜线、椭圆、三角形、圆形、扇形、梯形

斜线

用伪元素画一条直线，然后旋转

```css
<div></div>
div{
  div{
  position:relative;
  margin:50px auto;
  width:100px;
  height:100px;
  box-sizing:border-box;
  border:1px solid #333;  
  // background-color:#333;
  line-height:120px;
  text-indent:5px;
}

div::before{
  content:"";
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:50px;
  box-sizing:border-box;
  border-bottom:1px solid deeppink;
  transform-origin:bottom center;
  // transform:rotateZ(45deg) scale(1.414);
  animation:slash 5s infinite ease;
}

@keyframes slash{
  0%{
    transform:rotateZ(0deg) scale(1);
  }
  30%{
    transform:rotateZ(45deg) scale(1);
  }
  60%{
    transform:rotateZ(45deg) scale(1.414);
  }
  100%{
    transform:rotateZ(45deg) scale(1.414);
  }
}
}
```

或者

```css
div{
  position:relative;
  margin:50px auto;
  width:100px;
  height:100px;
  box-sizing:border-box;
  border:1px solid #333;  
  line-height:120px;
  text-indent:5px;
  background:
  linear-gradient(45deg, transparent 49.5%, deeppink 49.5%, deeppink 50.5%, transparent 50.5%);
}
```

先建立三角形，然后用白色小三角形遮挡，可以用剪裁clip-path或者伪元素

```css

```

圆形

```css
.circle{
  border-radius:50%;
  width:80px;
  height:80px;
  background:#666;
}
```

三角形

```css
.tri-angle{
   width:0px;
   height:0px;
   border-left:50px solid transparent;
   border-right:50px solid transparent;
   border-bottom:100px solid red;
}
```

扇形

```css

```

梯形

```css

```

#### 房子

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>CSS样式»</title>
<style>
.border-up{
    width: 0;
    height: 0;
    border-left: 150px solid transparent;
    border-right: 150px solid transparent;
    border-bottom:150px solid #333;
    position: relative;
    margin: 50px auto;

    background-image:linear-gradient(45deg,#a95f44  26%,transparent 0,transparent 75%,#a95f44  0),
    linear-gradient(45deg,#a95f44  26%,transparent 0,transparent 75%,#a95f44 0);
    background-size:30px 30px;
    background-position:0 0,15px 15px;
}
.border-up span{
    display: block;
    width: 0;height: 0;
    border-left: 147px solid transparent;
    border-right: 145px solid transparent;
    border-bottom: 147px solid #F0981C;
    position: absolute;left: -147px;
    top: 1px;
}
.div3{
    width:40px;
    height:40px;
    background-color:transparent;
    float:left;
}
.div-border1{
    border-top:solid 1px;
    border-left:solid 1px;
    border-bottom:solid 1px;
}
.div-border2{
    border-top:solid 1px;
    border-right:solid 1px;
    border-left:solid 1px;
    border-bottom:solid 1px;
}
.div-border3{
    border-left:solid 1px;
    border-bottom:solid 1px;
}
.div-border4{
    border-right:solid 1px;
    border-left:solid 1px;
    border-bottom:solid 1px;
}
.div{
    width:120px;
    height:40px;
    top:56px;
    margin-left:-45px;
    z-index: 99999;
    position:relative;
}
.chimney{
    background-image:linear-gradient(45deg,#a95f44  26%,transparent 0,transparent 75%,#a95f44  0),
    linear-gradient(45deg,#a95f44  26%,transparent 0,transparent 75%,#a95f44 0);
    background-size:30px 30px;
    background-position:0 0,15px 15px;
    width: 30px;
    height: 80px;
    border:  1px solid;
    margin-left:  40px;
    margin-top:  -30px;
}
.house{
 		width: 240px;
    height: 200px;
    border: 1px solid;
    background-color: #FFFFFF;
    margin-left: -122px;
    margin-top: 56px;
}
</style>
</head>
<body>
<div class="border-up">
		<span></span>
		<div class="div">
      <div class="div3 div-border1"></div>
      <div class="div3 div-border2"></div>
      <div class="div3 div-border3"></div>
      <div class="div3 div-border4"></div>
    </div>
    <div class="chimney" style=""></div>
    <div class="house"></div>
</div>
</body>
</html>
```



#### 伪类时间轴

```html
<div class="message_item">
    <div class="message_time">2020-05-13 19:11</div>
    <sapn class="message_circle"></sapn>
</div>
<div class="message_item">
    <div class="message_time">2020-05-13 19:10</div>
    <sapn class="message_circle"></sapn>
</div>
```

样式

```css
.message_item{
    height: 145px;
    width: 300px;
    padding-left: 12px;
    border-left: 1px solid #979797;
    position: relative;
}
.message_time{
    height: 17px;
    line-height: 17px;
    font-size: 12px;
    margin-bottom: 12px;
}
.message_time:before{
    content: '';
    display: block;
    width: 2px;
    height: 93%;
    margin-top: 25px;
    background: #00D1E3;
    position: absolute;
    left: 30%;
    top: 10px;
}
.message_circle{
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #547ABD;
    border-radius: 50%;
    left: -4px;
    top: 5px;
}
```

#### 容量球效果

```html
<div class="box">
    <div class="circular">
        <div class="content">
        </div>
        <span class="num">40%</span>
    </div>
</div>
```

样式

```css
.box{
    height: 500px;
    padding-top: 100px;
    padding-left: 200px;
}
.circular{
    height: 100px;
    width: 100px;
    border: 2px solid #4682B4;
    border-radius: 50%;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
}
.num{
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 30;
    transform: translate(-50%,-50%);
}
.content{
    position: absolute;
    height: 30px;
    width: 100px;
    background: #4682B4;
    bottom: 0px;
}
.content::after, .content::before{
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    top: 0;
    left: 50%;
    background-color: rgba(255, 255, 255, .7);
    border-radius: 40% 42% 40% 41%;
    transform: translate(-50%, -100%) rotate(0);
    animation: rotate 8s linear infinite;
    z-index: 10;
}
.content::after{
    border-radius: 42% 40% 41% 40%;
    background-color: rgba(255, 255, 255, .9);
    transform: translate(-50%, -100%) rotate(0);
    animation: rotate 8s linear -5s infinite;
    z-index: 20;
}

@keyframes rotate {
    50% {
        transform: translate(-50%, -103%) rotate(180deg);
    } 100% {
        transform: translate(-50%, -100%) rotate(360deg);
    }
}
```

#### 卡券效果

```html
<html>
<link tyep="css/text">
  .coupon {
     width:300px;
     height:100px;
     line-height:100px;
     margin:50px auto;
     text-align:center;
     position:relative;
     background:radial-gradient(circle at right bottom,transparent 10px,#FFFFFF 0) top right /50% 51px no-repeat
                radial-gradient(circle at left bottom,transparent 10px,#FFFFFF 0) top left /50% 51px no-repeat
                radial-gradient(circle at right top,transparent 10px,#FFFFFF 0) bottom right /50% 51px no-repeat
                radial-gradient(circle at left top,transparent 10px,#FFFFFF 0) bottom left /50% 51px no-repeat
     filter:drop-shadow(2px 2px 2px rgba(0,0,0,0.2))
  }
  .coupon span {
     display:inline-block;
     vertical-align:middle;
     margin-right:10px;
     color:red;
     font-size:50px;
     font-weight:400;
  }
</link>
<body>
   <p class="coupon">
      <span>400</span>
   </p>
</body>
</html>
```

#### 虚线框

```html
<html>
<link type="text/css">
.dotted-line {
  width:800px;
  margin:auto;
  padding:20px;
  border:1px dashed transparent;
  background:linear-gradient(white,white) padding-box,repeat-linear-gradient(-45deg,red 0,#ccc 0.25em,white 0,white 0.75em);
} 
</css>
<body>
  <p class="dotted-line">庭院深深，不知有多深？杨柳依依，飞扬起片片烟雾，一重重帘幕不知道有多少层</p>
</body>
</html>
```



### 响应式布局CSS

1.在网页头部加上viewport元标签

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
```

2.不使用绝对宽度



3.流式布局

[float](http://designshack.net/articles/css/everything-you-never-knew-about-css-floats/)的好处是，如果宽度太小，放不下两个元素，后面的元素会自动滚动到前面元素的下方，不会在水平方向overflow（溢出），避免了水平滚动条的出现。

绝对定位（`position: absolute`）的使用，也要非常小心。

4.选择加载CSS

自适应网页的核心就是CSS引入的Media Query模块

自动检测屏幕宽度，然后加载相应的CSS文件

实例

```html
<link rel="stylesheet" type="text/css" media="screen and (max-device-width: 400px)" href="tinyScreen.css"/>
<link rel="stylesheet" type="text/css" media="screen and (min-width: 400px) and (max-device-width: 600px)" href="smallScreen.css"/>
```

上面的代码意思是，如果屏幕宽度小于400像素（max-device-width: 400px），就加载tinyScreen.css文件。

如果屏幕宽度在400像素到600像素之间，则加载smallScreen.css文件。

或者，在同一个CSS文件中利用@media的属性也能选择性加载样式

```css
@media 
screen and (max-device-width: 400px) 
{ .column 
  {float: none;width: auto;} 
  #sidebar { 
    display: none'
  }
}
```

5.图片的自适应

添加属性

```css
img { max-width: 100%;}
```

这行代码对于大多数嵌入网页的视频也有效，所以可以写成：`img, object { max-width: 100%;}`

#### 各自的优缺点

响应式的优缺点：

优点：兼容性好，@media在ie9上是支持的，pc端和mobile是一套代码，不用分开

缺点：要写的css比另外两个多很多，而且各个断点都要做好。css样式要稍微大点的话更麻烦

Rem的优缺点：

优点：能维持整体的布局效果，移动端兼容性好，不用写多个css代码，而且还可以使用@media进行优化

缺点：开头要引入一段js，单位都要改成rem，计算rem比较麻烦，可以引用预处理器，但是增加了编译过程。PC和mobile要分开

设置viewport的width：

优点：与Rem相同，而且不用写rem，直接使用px，更加快捷

缺点：效果可能没rem好，图片会相对模糊，而且无法使用@media进行断点，不同size的手机上显示高度差距可能会相差很大



### 元素层级

DOM层级顺序，就是DOM节点在z轴方向（垂直于屏幕向外的方向）的显示优先级。由于屏幕是一个二维平面，因此我们并不是真正地看到了z轴。 我们说看到z轴，其实是通过透视，通过元素展现在与其共享二维空间的其他元素的前面或者后面来看到的。有几大规则。

顺序规则

在不设置position属性（或设置成static）的情况下，文档流后面的DOM节点会覆盖前面的DOM节点。

定位规则

定位节点（position属性设置为relative，absolute或fixed的节点）会覆盖非定位节点（不设置position属性或position属性设为static的节点）

根据顺序规则和定位规则, 我们可以做出更加复杂的结构。A和 B 都设为非定位节点，A 的子节点 A-1 设定定位节点。

默认值规则

对于所有的定位节点，z-index值大的节点会覆盖z-index值小的节点。

z-index设为0和没有设置z-index的节点在同一层级内没有高低之分。在IE6和7种，z-index的默认值为0，其他浏览器中默认值为auto。

从父规则

两个节点A和B都是定位节点，如果节点A的z-index值比节点B的大，那么节点A的子元素都会覆盖在节点B以及节点B的子节点上。

如果定位节点A和B的z-index值一样大，那么根据顺序规则，B会覆盖A，那么即使A的子节点的z-index比B的子节点大，B的子节点还是会覆盖A的子节点。(这就是为什么即使我们把A-1的z-index设置得很大，依然无法盖住B节点的原因)。

层级树规则

定位节点，且z-index有整数值的（不包括z-index:auto），会被放置到一个与DOM节点不一样的层级树里。

在下面的DOM节点中，A和B是兄弟节点，但是在层级树种，A和B-1才是兄弟节点（因为他们都是Root下的第一层含有整数z-index的定位节点），所以A在B和B-1之上。虽然A-1的z-index比B-1的小，但是根据从父规则，A-1也在B-1之上。

**使用static 定位或无position定位的元素z-index属性是无效的。**

层叠上下文

层叠上下文是HTML元素的三维概念，这些HTML元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的z轴上延伸，HTML元素依据其自身属性按照优先级顺序占用层叠上下文的空间。

从底部到顶部

1.**背景和边框** —— 形成层叠上下文的元素的背景和边框。 层叠上下文中的最低等级，一般为父元素。

2.负堆叠顺序的子元素 z-index: <negative integer>; position: relative (or absolute or fixed)

3.**块级盒**。文档流中，非内联，非定位子元素 display: /* not inline */; position: static

4.浮动盒。非定位浮动子元素 float: left (or right); position: static

5.行内盒。内联流，非定位子元素 display: inline; position: static

6.堆叠顺序为0的子元素 z-index: auto (or 0); position: position: relative(or absolute or fixed)

7.堆叠顺序为正的子元素 z-index: <positive integer>; position: relative(or absolute or fixed)

### 盒模型

当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 **CSS 基础框盒模型**（**CSS basic box model**），将所有元素表示为一个个矩形的盒子（box）。CSS 决定这些盒子的大小、位置以及属性（例如颜色、背景、边框尺寸…）

每个盒子有四个边界，由外到内分别是：*外边框边界* *Margin Edge*、*边框边界* *Border Edge*、*内边距边界* *Padding Edge*、*内容边界* *Content edge*、、、。

Margin：元素边界外的距离

Border：

Padding：元素边界外的距离

Content：

margin、padding有四个距离，分别对应上 右 下 左。如果只有两个距离，是上下和左右

距离设为负值时可以进行重叠

### CSS选择器、权重问题

html标签样式的优先级

行间样式 > id选择器 > class选择器 > 标签选择器 > 通配符选择器 >继承>默认

权重

！important 无限大  行间样式 1000 id选择器 100 

class选择器 10 标签选择器 1 通配符选择器 0 

class与id区别

class可以有多个，id只有一个

class一般为元素添加样式，利用id为元素添加行为--js

以代码为例

```html
<div id="a" class="a">
  <div id="b" class="b">
    <p id="c" class="c">I am here</p>
  </div>
</div>
<style type="text/css">
  #a { font-size:12px }
  div p { font-size:13px }
  div .c { font-size:14px }
  .a .b .c { font-size:15px }  /*优先级最高*/
  #b { font-size:16px }
</style>
```

代码运行效果：只有15px生效

### 上下文选择符

">"符号

大于号代表某个元素的的下一代元素，A>B是指A元素里的第一代B元素

"~"符号

波浪号A～B表示A标签之后所有的B标签，但是A和B标签必须拥有相同的父元素

"+“符号

加号又被称作兄弟选择器，A+B表示紧邻在A后面的B元素，且A和B必须拥有相同的父元素，所选到的仅为一个B标签

","符号

A,B表示同时选择A、B两个元素

“ ”空格符号

A B表示以A为祖先元素的B元素

通配符 *

选择所有元素



@media

@media可用于基于一个或多个的媒体查询结果来选择应用样式表的部分

@import指令



### 属性关键字

inherit：从父元素继承值

initial：将属性的初始值或者默认值应用于元素

revert：等价于unset，只有safari和iso支持

unset：属性从其父级继承，如果没有继承父级样式，则该属性重新设置为初始值。也就是说，在第一种情况下它的行为类似于inherit，第二种情况下它的行为类似于initial

all：修改所有元素或其父元素的属性为初始值，all属性用于重置所有属性，除了unicode-bidi和direction

### 典型样式

#### 元素、文本垂直水平居中

三种方法：转换成表格、flex、css3transform

1.转换成表格

```css
.container{
  display:table-cell;
  vertical-align:center;
  text-align:center;
}
```

2.flex布局

```css
.container{
  display:flex;
  justify-content:center;
  align-items:center;
}
```

3.css3transform

```css
.container{
  width: 100%;
  height: 400px;
  background: #eee;
  position: relative;
}
.center{
  background: blue;
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```



垂直居中：容器元素设置`display:table-cell;vertical-align:middle`

子元素宽度为父元素的一半且为正方形

#### 元素高度始终为宽度的一半

html

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
  <div class="father">
    <div class="son"><span>A</span></div>
  </div>
</body>
</html>
```

css样式

```css
.father{
  overflow:hidden;
  position: absolute;
  left:20px;
  right:20px;
  top:50%;
  transform: translateY(-50%);
}

.son{
  height:0;
  width:100%;
  padding-top:50%;
  background:pink;
}

span{
  position:absolute;
  top:50%;
  left:50%; 
  transform: translate(-50%,-50%);
  font-size:10px;
}
```

https://segmentfault.com/a/1190000011668865

#### 字体渐变色



```html
<html>
  <head>
    <meta charset="utf-8">
    <style>
      span{
        background: linear-gradient(to right,red,blue);
        -webkit-background-clip:text;
        color:transparent;
      }
    </style>
  </head>
  <body>
    <span>前端渐变色</span>
  </body>
</html>
```



### CSS3伪类、伪元素

CSS伪类添加一些选择器的特殊效果,表示状态。

比如a标签

a:link 未访问过的链接 a:visited 已访问过的链接 a:hover 鼠标划过链接 a:active 已选中的链接

:first child :last child 父类的第一个子元素和最后一个子元素

:first-letter :first-line 元素的第一个字母/第一行

:before :after 在元素之前/之后插入内容

:lang 伪类使你有能力为不同的语言定义特殊的规则

:active:伪类匹配被用户激活的元素

伪元素

:first-line 伪元素

"first-line" 伪元素用于向文本的首行设置特殊样式。



伪类与伪元素的区别

**伪类**选择元素基于的是当前元素处于的状态，或者说元素当前所具有的特性，而不是元素的id、class、属性等静态的标志。由于状态是动态变化的，所以一个元素达到一个特定状态时，它可能得到一个伪类的样式；当状态改变时，它又会失去这个样式。由此可以看出，它的功能和class有些类似，但它是基于文档之外的抽象，所以叫伪类。

与伪类针对特殊状态的元素不同的是，**伪元素**是对元素中的特定内容进行操作，它所操作的层次比伪类更深了一层，也因此它的动态性比伪类要低得多。实际上，设计伪元素的目的就是去选取诸如元素内容第一个字（母）、第一行，选取某些内容前面或后面这种普通的选择器无法完成的工作。它控制的内容实际上和元素是相同的，但是它本身只是基于元素的抽象，并不存在于文档中，所以叫伪元素。

