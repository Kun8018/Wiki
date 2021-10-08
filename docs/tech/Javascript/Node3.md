---
title: Javascript开发（三）
date: 2021-01-18 21:40:33
categories: IT
tags: IT，Web,Node
toc: true
thumbnail: http://cdn.kunkunzhang.top/javascript.png
---

​     第三篇主要讲原生js的方法

<!--more-->

## DOM方法

### Mutation Observer

Mutation Observer APi用来监听DOM变动。DOM的任何变动，比如节点的增减、属性的变动、文本的变动，这个api都可以得到通知

DOM变动就会触发Mutation Observer，与事件的区别是事件是同步触发，也就是DOM的变动立刻会触发相应的事件，Mutation Observer是异步触发，需要等当前所有的DOM操作都结束才会触发

Mutation Observer有以下特点：

- 它等所有脚本任务完成后才会运行(异步触发)
- 它把DOM变动记录封装成一个数组进行处理，而不是一条条个别处理
- 既可以观察DOM的所有类型变动，也可以只观察某一类变动

实例方法

`observe()`方法用来监听，接受两个参数：所要观察的DOM节点，以及配置对象，也就是观察的特定变动

`disconnect()`方法用来停止观察，调用该方法后DOM再变动也不会触发

`takeRecords()`方法用来

### Document

实例方法

`document.open()`方法清除当前文档内的所有内容，使得文档处于可写状态

`document.close()` 方法关闭document.open打开的文档

`document.elementFromPoint()`方法返回位于页面指定位置最上层的元素节点

`document.createDocumentFragment()`方法生成一个DocumentFragment实例



### Element

实例属性

`element.id`:属性直接返回指定元素的id属性

`element.tagname`属性直接返回指定元素的大写标签名，与nodeName属性的值相等

`element.dir`属性用于读写当前元素的文字方向，从左到右为ltr，从右到左为rtl

`element.draggable`属性返回一个布尔值，表示当前元素是否可拖动

`element.lang`属性返回当前元素的语言设置

`element.hidden`属性返回一个布尔值，表示当前元素的hidden属性，用来控制当前的元素是否可见

`element.className`属性用来读写当前元素节点的class属性

`element.classList`属性返回一个类似数组的对象，当前节点的每一个class就算这个对象的一个成员

`element.innerHTML`属性返回一个字符串，等同于该元素包含的所有html代码

`element.outerHTML`属性返回一个字符串，表示当前元素节点的所有HTML代码，包括该元素自身和所有子元素

`element.clientHeight`属性返回一个整数值，表示元素节点的css高度

`element.clientwidth`属性返回元素节点的CSS宽度

`element.clientLeft`属性等于元素节点左边框的宽度

`element.clientTop`属性等于元素顶部边框的宽度

`element.scrollHeight`属性返回一个整数值，表示当前元素的总高度，包括溢出容器不可见的高度、padding、伪元素的高度，不包括border、margin、以及水平滚动条的高度

`element.scrollWidth`属性返回当前元素的总宽度

`element.offsetHeight`属性返回一个整数，表示元素的CSS垂直高度，包括元素自身的高度、padding、border、以及水平滚动条的高度

`element.offsetWidth`属性返回一个CSS水平宽度。

`element.scrollLeft`属性表示当前元素的水平滚动条向右侧滚动的像素数量，如果没有滚动条值为0 

`element.scrollTop`属性表示当前元素的垂直滚动条向下滚动的像素数量，如果没有滚动条值为0 

`element.offsetLeft`属性表示当前元素左上角相对于element.offsetParent节点的水平位移

`element.offsetTop`属性表示当前元素左上角相对于element.offsetParent节点的垂直位移

`element.firstElementChild`属性返回当前元素的第一个元素子节点

`element.lastElementChild`返回当前元素的最后一个元素子节点

`element.offsetParent`属性返回最靠近当前元素的、并且CSS的position属性不等于static的上层元素

`element.children`属性返回一个类似数组的对象，包含当前元素节点的所有子元素。如果当前元素没有子元素，则返回的对象包含零个成员

实例方法

`element.querySelector()`方法接受CSS选择器作为参数，返回父元素的第一个匹配的子元素，如果没有找到匹配的子元素，返回null

`element.querySelectorAll()`方法接受CSS选择器作为参数，返回一个NodeList实例，包含所有匹配的子元素

`element.getElementsByClassName`方法返回一个HTMLCollection实例，成员是当前元素的子元素节点。与document.getElementByClassName类似，只是搜索范围不是整个文档是当前元素element

`element.scrolltoView`方法滚动当前元素，进入浏览器的可见区域，类似于设置window.location.hash的效果

`element.getBoundingClientRect()`方法返回一个对象，提供当前元素节点的大小、位置等信息，基本上是CSS盒状模型的所有信息

`element.getClientRects()`方法返回一个类似数组的对象，里面是元素当前在页面上形成的矩形

`element.insertAdjacentHTML()`方法用于将一个HTML字符串解析成DOM结构插入相对于当前节点的指定位置

`element.remove()`方法用于将当前元素节点从它的父节点移除

`element.focus()`方法用于将当前页面的焦点转移到指定元素上

`element.blur()`方法用于将焦点从当前元素上移除

`element.click()`方法用于在当前元素上模拟一次鼠标点击，相当于触发了click事件



### Htmlcollection、NodeList

document和element都是单个dom对象，可以使用htmlcollection和nodelist多节点对象

NodeList包含各种类型的节点，HTMLCollection只是HTML元素节点

NodeList实例很像数组，但是不是数组，不可以使用pop或者push等数组的方法，可以使用length属性和forEach方法，也可以使用for遍历

如果NodeList要使用数组的方法，可以将其转为真正的数组，使用array.slice.call(nodelist)进行转换

遍历时可以选择NodeList.keys、NodeList.values、NodeList.entries三个对象进行遍历。NodeList.keys返回键名的遍历器，NodeList.values返回键值的遍历器，NodeList.entries返回的遍历器同时包含键名和键值

```javascript
for (var key of children.keys()) {
   console.log(key)
}
for (var value of children.values()) {
   console.log(value)
}
for (var entry of children.entries()) {
   console.log(entry)
}
```

HTMLCollection是节点对象的集合，但只能包含元素节点(element)，不能包含其他类型的节点。HTMLCollection与NodeList接口不同，HTMLCollection没有forEach方法，只能用for循环遍历

HTMLCollection.length属性：返回HTMLCollection实例包含的成员数量

HTMLCollection.Item()方法:接收一个整数值作为参数，返回该位置上的成员

HTMLCollection.namedItem()方法：通过id或者name属性返回对应的元素节点，如果没有对应的节点返回null



### text、documentFragment

Text节点表示元素节点和属性节点的文本内容。如果一个节点只包含一段文本，那么它就有一个文本字节点，代表该节点的文本内容。

属性

text.data属性等同于NodeValue属性，用来设置或读取文本节点的内容

text.wholeText属性将当前文本节点和毗邻的文本节点作为一个整体返回

text.length属性返回当前文本节点的文本长度

方法

text.appendData方法用于在Text节点尾部追加字符串

text.deleteData方法用于删除Text节点内部的子字符串，第一个参数为子字符串开始的位置，第二个参数是子字符串长度

text.insertData方法用于在text节点插入字符串，第一个参数为插入位置，第二个参数是插入的子字符串

text.replaceData方法用于获取子字符串，第一个参数为子字符串在Text节点中的开始位置，第二个参数为子字符串长度

text.remove方法用于移除当前Text节点

text.splitText方法将Text节点一分为二，变成两个毗邻的text节点，它的参数是从0开始。如果位置不存在，将报错

DocumentFragment节点代表一个文档的片段，本身就是一个完整的DOM树形结构，它没有父节点，parentNode返回Null，但是可以插入任意数量的子节点，它不属于当前节点，所以操作DocumentFragment节点比直接操作DOM树快的多

DocumentFragment节点本身不能被插入当前文档，当他作为appendChild、insertBefore等方法的参数时，是它的所有子节点插入当前文档，而不是它自身。一旦DocumentFragment节点被插入，它自身就变成空节点，可以再次被使用。如果想要保留DocumentFragment节点的内容，可以使用cloneNode方法。

DocumentFragment节点不是单独的一种节点对象，它具有的属性和方法全部继承自Node节点和ParentNode接口。



## 函数、函数作用域和闭包

JavaScript 语言将函数看作一种值，与其它值（数值、字符串、布尔值等等）地位相同。凡是可以使用值的地方，就能使用函数。比如，可以把函数赋值给变量和对象的属性，也可以当作参数传入其他函数，或者作为函数的结果返回。函数只是一个可以执行的值，此外并无特殊之处。

由于函数与其他数据类型地位平等，所以在 JavaScript 语言中又称函数为第一等公民。

return语句

函数体内的return语句表示返回，JavaScript引擎遇到return语句就会直接返回return语句后面那个表达式的值，后面即使还有语句也不会得到执行，也就是说，return语句所带的那个表达式就是函数的返回值。return语句不是必须的，如果没有的话该函数就不返回任何值，或者说返回undefined

通过return语句调用自己，就是递归，比如计算斐波那契数列

```javascript
function fib(num) {
  if(num == 0) return 0;
  if(num == 1) return 1;
  return fib(num-1) + fib(num-2)
}
```

arguements对象

由于 JavaScript 允许函数有不定数目的参数，所以需要一种机制，可以在函数体内部读取所有参数。这就是`arguments`对象的由来。

`arguments`对象包含了函数运行时的所有参数，`arguments[0]`就是第一个参数，`arguments[1]`就是第二个参数，以此类推。这个对象只有在函数体内部，才可以使用。

虽然`arguments`很像数组，但它是一个对象。数组专有的方法（比如`slice`和`forEach`），不能在`arguments`对象上直接使用。

如果要让`arguments`对象使用数组方法，真正的解决方法是将`arguments`转为真正的数组。下面是两种常用的转换方法：`slice`方法和逐一填入新数组。

### 函数提升与变量提升

JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。

变量提升例子

```javascript
for (var i=0;i<5;i++) {
  setTimeout(()=>{
    console.log(i);
  },0)
}
//输出都是4
//使用立即执行函数或者let变量可以输出0，1，2，3，4
for (let i=0;i<5;i++) {
  setTimeout(()=>{
    console.log(i);
  },0)
}

for (var i=0;i<5;i++) {
  (function(i){
    setTimeout(()=>{
    	console.log(i);
  	},0)
  })(i)
}
```

变量提升的其他例子

```javascript
var foo = 3;

// 预编译之后
function hoistVariable() {
    var foo;

    foo = foo || 5;

    console.log(foo); // 5
}

hoistVariable();
```

JavaScript 引擎将函数名视同变量名，所以采用`function`命令声明函数时，整个函数会像变量声明一样，被提升到代码头部。所以，下面的代码不会报错。

表面上，上面代码好像在声明之前就调用了函数`f`。但是实际上，由于“变量提升”，函数`f`被提升到了代码头部，也就是在调用之前已经声明了。但是，如果采用赋值语句定义函数，JavaScript 就会报错。

```javascript
function hoistFunction() {
    foo(); // output: I am hoisted

    function foo() {
        console.log('I am hoisted');
    }
}

hoistFunction();
// 预编译之后
function hoistFunction() {
    function foo() {
        console.log('I am hoisted');
    }

    foo(); // output: I am hoisted
}

hoistFunction();
```

变量提升和函数提升的原因：

函数提升是为了解决函数相互递归调用的目的

也就是说，变量提升是人为实现的问题，而函数提升在当初设计时是有目的的。

其他：

ES6中的class声明也存在提升，不过它和let、const一样，被约束和限制了，其规定，如果再声明位置之前引用，则是不合法的，会抛出一个异常。

所以，无论是早期的代码，还是ES6中的代码，我们都需要遵循一点，先声明，后使用。

### 作用域与作用域链

JS执行环境在JS机制内部`就是用一个对象来表示的`，称作`执行环境对象`，简称`环境对象`。执行环境分为`全局执行环境`和`局部执行环境`两种，每个执行环境都有一个属于自己的环境对象。在web浏览器中，全局环境对象为window对象

作用域

作用域是变量或者函数可以被访问的代码范围，或者说是变量和函数所起作用的范围。

作用域分为`全局作用域`、`局部作用域`两种。

在页面中的脚本开始执行时，就会产生一个“全局作用域”。它是最外围（范围最大，或者说层级最高）的一个作用域。全局作用域的变量、函数
可以在代码的任何地方访问到。

当一个函数被创建的时候，会创建一个“局部作用域”。局部作用域中的函数、变量只能在某些局部代码中可以访问到。

作用域链

当前作⽤域没有定义的变量，就是⾃由变量 。为了得到⾃由变量，js程序内部将向⽗级作⽤域寻找。如果上一级父级作用域也没有，就一层一层向上找，直到找到全局作⽤域还是没找到，就宣布放弃。这种⼀层⼀ 层的关系，就是 **作⽤域链** 。



### 闭包

闭包就是有权访问另一个函数作用域中的变量的函数。

由于函数作用域的影响，正常情况下，函数外部无法读取函数内部声明的变量，只有函数内部可以读取全局变量和父作用域变量。

如果出于种种原因，需要得到函数内的局部变量。正常情况下，这是办不到的，只有通过变通方法才能实现。

**在函数内部定义子函数，将子函数作为返回值，就可以在外部读取函数内部的变量，作为返回值的子函数称为闭包**

```javascript
function f1() {
  var n = 999;
  function f2() {
    console.log(n);
  }
  return f2;
}

var result = f1();
result(); // 999
```

闭包的最大用处有两个，一个是可以读取外层函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。原因是闭包（上例的`inc`）用到了外层变量（`start`），导致外层函数（`createIncrementor`）不能从内存释放。只要闭包没有被垃圾回收机制清除，外层函数提供的运行环境也不会被清除，它的内部变量就始终保存着当前值，供闭包读取。

此外，闭包的另一个用处，是封装对象的私有属性和私有方法。

```javascript
function Person(name) {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }

  return {
    name: name,
    getAge: getAge,
    setAge: setAge
  };
}

var p1 = Person('张三');
p1.setAge(25);
p1.getAge() // 25
```

闭包的使用场景

需要值长期保存又需要隐藏的场景

闭包的问题

一般情况下，一个函数执行完内部的代码，函数调用时所创建的执行环境、环境对象（包括变量对象、[[scope]]等）都会被销毁，它们的生命周期就只有函数调用到函数执行结束这一段时间。

闭包形成后，会在函数执行完仍将他的变量对象保存在内存中，当引用时间过长或者引用对象很多的时候，会占用大量内存，严重影响性能。

闭包的清除

将闭包的值手动置空即可。

eval命令

`eval`命令接受一个字符串作为参数，并将这个字符串当作语句执行。



### 立即执行函数

立即执行函数就是声明一个匿名函数，并且马上调用这个匿名函数

```javascript
//函数最后的括号是调用的意思
(function() {alert('匿名函数')})()
```

立即执行函数的作用只有一个：创建独立的作用域

在这个作用域里面的变量，外面访问不到，即避免变量污染

```javascript
var liList = ul.getElementsByTagName('li')
for(var i=0;i<6;i++){
  liList[i].onclick = function(){
    alert(i) //输出都是6，i贯穿整个作用域，而不是给每个li一个i
  }
}

//使用立即执行函数创建独立作用域
var liList = ul.getElementsByTagName('li')
for(var i=0;i<6;i++){
  !function(ii){
    liList[ii].onclick = function(){
    	alert(ii) //输出都是6，i贯穿整个作用域，而不是给每个li一个i
  	}
  }
}
```



## 严格模式

早期的 JavaScript 语言有很多设计不合理的地方，但是为了兼容以前的代码，又不能改变老的语法，只能不断添加新的语法，引导程序员使用新语法。

严格模式是从 ES5 进入标准的，主要目的有以下几个。

- 明确禁止一些不合理、不严谨的语法，减少 JavaScript 语言的一些怪异行为。
- 增加更多报错的场合，消除代码运行的一些不安全之处，保证代码运行的安全。
- 提高编译器效率，增加运行速度。
- 为未来新版本的 JavaScript 语法做好铺垫。

严格模式可以用于整个脚本，也可以只用于单个函数。`use strict`放在脚本文件的第一行，整个脚本都将以严格模式运行。如果这行语句不在第一行就无效，整个脚本会以正常模式运行。`use strict`放在函数体的第一行，则整个函数以严格模式运行。

进入严格模式的标志，是一行字符串`use strict`。老版本的引擎会把它当作一行普通字符串，加以忽略。新版本的引擎就会进入严格模式。

严格模式不允许的语法：

严格模式下，设置字符串的`length`属性，会报错。长度只可读，不可写；

严格模式下，对一个只有取值器（getter）、没有存值器（setter）的属性赋值，会报错。

严格模式下，对禁止扩展的对象添加新属性，会报错。

正常模式下，函数内部的`this`可能会指向全局对象，严格模式禁止这种用法，避免无意间创造全局变量。

函数内部不得使用`fn.caller`、`fn.arguments`，否则会报错。这意味着不能在函数内部得到调用栈了。

严格模式下无法删除变量，如果使用`delete`命令删除一个变量，会报错。只有对象的属性，且属性的描述对象的`configurable`属性设置为`true`，才能被`delete`命令删除。



## this关键字

`this`指向属性或方法“当前”所在的对象。

`this`的动态切换，固然为 JavaScript 创造了巨大的灵活性，但也使得编程变得困难和模糊。有时，需要把`this`固定下来，避免出现意想不到的情况。JavaScript 提供了`call`、`apply`、`bind`这三个方法，来切换/固定`this`的指向。

`call`方法的参数是一个对象。如果参数为空、`null`和`undefined`，则默认传入全局对象。

```javascript
var n = 123;
var obj = { n: 456 };

function a() {
  console.log(this.n);
}

a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456
```

`apply`方法的作用与`call`方法类似，也是改变`this`指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数

`bind()`方法用于将函数体内的`this`绑定到某个对象，然后返回一个新函数。

```javascript
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var func = counter.inc.bind(counter);
func();
counter.count // 1
```

### call apply bind区别

call方法第一个参数是this指向，第二个参数可以传入参数列表，call方法临时改变一次this指向，并立即执行

Apply方法可以传入参数数组，使用apply方法改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次。

bind方法和apply方法类似，第一个参数是this指向，第二个参数可以传入参数列表，但是bind改变this指向后不会立即执行，而是返回一个永久改变this指向的函数

## 原型链继承

A 对象通过继承 B 对象，就能直接拥有 B 对象的所有属性和方法。这对于代码的复用是非常有用的。

JavaScript 语言的继承不通过 class，而是通过“原型对象”（prototype）实现，JavaScript 通过构造函数生成新对象，因此构造函数可以视为对象的模板。实例对象的属性和方法，可以定义在构造函数内部。

实例

```js
function Cat (name, color) {
  this.name = name;
  this.color = color;
}

var cat1 = new Cat('大毛', '白色');

cat1.name // '大毛'
cat1.color // '白色'
```

`Cat`函数是一个构造函数，函数内部定义了`name`属性和`color`属性，所有实例对象（上例是`cat1`）都会生成这两个属性，即这两个属性会定义在实例对象上面。

通过构造函数为实例对象定义属性，虽然很方便，但是有一个缺点。同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费。通过 JavaScript 的原型对象（prototype）继承，就能很方便得共享对象。

实例

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = 'white';

var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');

cat1.color // 'white'
cat2.color // 'white'
```

上面代码中，构造函数`Animal`的`prototype`属性，就是实例对象`cat1`和`cat2`的原型对象。原型对象上添加一个`color`属性，结果，实例对象都共享了该属性.如果实例对象自身就有某个属性或方法，它就不会再去原型对象寻找这个属性或方法。

原型链

JavaScript 规定，所有对象都有自己的原型对象（prototype）。一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”（prototype chain）：对象到原型，再到原型的原型……

如果一层层地上溯，所有对象的原型最终都可以上溯到`Object.prototype`，即`Object`构造函数的`prototype`属性。也就是说，所有对象都继承了`Object.prototype`的属性。这就是所有对象都有`valueOf`和`toString`方法的原因，因为这是从`Object.prototype`继承的。

`Object.prototype`的原型是`null`。`null`没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是`null`。



`prototype`对象有一个`constructor`属性，默认指向`prototype`对象所在的构造函数。由于`constructor`属性是定义在`prototype`对象上面，意味着可以被所有实例对象继承。

constructor属性的作用：

1、可以由实例追溯回构造函数，得知某个实例对象，到底是哪一个构造函数产生的。

```javascript
function F() {};
var f = new F();

f.constructor === F // f的构造函数是F,所以true
f.constructor === RegExp // false
```

2.已知一个实例对象，可以根据该实例对象的constructor构造另一个实例对象，而不必使用构造函数

```javascript

```

`constructor`属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改`constructor`属性，防止引用的时候出错。

```javascript
// 坏的写法
C.prototype = {
  method1: function (...) { ... },
  // ...
};

// 好的写法
C.prototype = {
  constructor: C,
  method1: function (...) { ... },
  // ...
};

// 更好的写法
C.prototype.method1 = function (...) { ... };
```

要么将`constructor`属性重新指向原来的构造函数，要么只在原型对象上添加方法，这样可以保证`instanceof`运算符不会失真。

### prototype与proto



### 构造函数与构造函数的继承

让一个构造函数继承另一个构造函数，是非常常见的需求。

这可以分成两步实现。第一步是在子类的构造函数中，调用父类的构造函数。第二步，是让子类的原型指向父类的原型，这样子类就可以继承父类原型。

实例

```javascript
//新建shape构造函数
function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};
//新建Rectangle构造函数继承Shape。
// 第一步，子类继承父类的实例
function Rectangle() {
  Shape.call(this); // 调用父类构造函数
}
// 另一种写法
function Rectangle() {
  this.base = Shape;
  this.base();
}

// 第二步，子类继承父类的原型
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
```



### 原生原型链

```javascript
const b = 2;
a = b;
```

b是基础类型，所以a的原型指向Number

#### 改变原型

使用构造函数的prototype属性





## 浏览器缓存storage方法

storage 接口用于脚本在浏览器保存数据。两个对象部署了这个接口：`window.sessionStorage`和`window.localStorage`。

属性：

`Storage.length`：返回保存的数据项个数。

方法：

`Storage.setItem()`方法用于存入数据。它接受两个参数，第一个是键名，第二个是保存的数据。如果键名已经存在，该方法会更新已有的键值。

`Storage.getItem()`方法用于读取数据。它只有一个参数，就是键名。如果键名不存在，该方法返回`null`。

`Storage.removeItem()`方法用于清除某个键名对应的键值。它接受键名作为参数，如果键名不存在，该方法不会做任何事情。

`Storage.clear()`方法用于清除所有保存的数据。该方法的返回值是undefined

`Storage.key()`接受一个整数作为参数（从零开始），返回该位置对应的键值

```js
window.localStorage.setItem('baz', 'c');
window.sessionStorage.setItem('key', 'value');
window.localStorage.setItem('key', 'value');
window.sessionStorage.getItem('key')
window.localStorage.getItem('key')
sessionStorage.removeItem('key');
localStorage.removeItem('key');
window.sessionStorage.clear()
window.localStorage.clear()
window.sessionStorage.key(0)
//遍历所有键
for (var i = 0; i < window.localStorage.length; i++) {
  console.log(localStorage.key(i));
}
window.addEventListener('storage', onStorageChange);
```

异步方法



## 实例对象与new

javascript是面向对象编程的语言。js中一切皆对象。对象具有属性和方法，属性是对象的状态，方法是对象的行为（完成某种任务）。

JavaScript 语言使用构造函数（constructor）作为对象的模板。所谓”构造函数”，就是专门用来生成实例对象的函数。它就是对象的模板，描述实例对象的基本结构。一个构造函数，可以生成多个实例对象，这些实例对象都有相同的结构。

构造函数就是一个普通的函数，但是有自己的特征和用法。

构造函数的特点：

函数体内部使用了`this`关键字，代表了所要生成的对象实例。

生成对象的时候，必须使用`new`命令。

为了与普通函数区别，构造函数名字的第一个字母通常大写。

`new`命令的作用，就是执行构造函数，返回一个实例对象。

实例

```js
var Vehicle = function () {
  this.price = 1000;
};

var v = new Vehicle();
v.price // 1000
```

如果忘了使用`new`命令，直接调用构造函数，构造函数就变成了普通函数，并不会生成实例对象。`this`这时代表全局对象。

为了避免这种情况的发生，可以在构造函数内部使用严格模式，即第一行加上`use strict`。这样的话，一旦忘了使用`new`命令，直接调用构造函数就会报错。

new对象的原理

使用`new`命令时，它后面的函数依次执行下面的步骤。

1. 创建一个空对象，作为将要返回的对象实例。
2. 将这个空对象的原型，指向构造函数的`prototype`属性。
3. 将这个空对象赋值给函数内部的`this`关键字。
4. 开始执行构造函数内部的代码。

也就是说，构造函数内部，`this`指的是一个新生成的空对象，所有针对`this`的操作，都会发生在这个空对象上。构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即`this`对象），将其“构造”为需要的样子。

如果构造函数内部有`return`语句，而且`return`后面跟着一个对象，`new`命令会返回`return`语句指定的对象；否则，就会不管`return`语句，返回`this`对象。

对普通函数（内部没有`this`关键字的函数）使用`new`命令，则会返回一个空对象。

## 异步操作与定时器

### 事件循环

异步操作、队列与事件循环

JavaScript 运行时，除了一个正在运行的主线程(执行栈)，引擎还提供一个任务队列（task queue），里面是各种需要当前程序处理的异步任务。

首先，主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务就重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，程序就结束执行。

JavaScript 引擎怎么知道异步任务有没有结果，能不能进入主线程呢？答案就是引擎在不停地检查，一遍又一遍，只要同步任务执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环

异步任务分为宏任务和微任务，页面渲染事件，各种IO的完成事件等随时被添加到任务队列中，一直会保持先进先出的原则执行，我们不能准确地控制这些事件被添加到任务队列中的位置。但是这个时候突然有高优先级的任务需要尽快执行，那么一种类型的任务就不合适了，所以引入了微任务队列。

微任务的优先级高于宏任务，即每次事件队列完毕先检查是否有微任务，再检查是否有宏任务，有微任务则先执行微任务，全部执行完毕再执行宏任务。

常见的宏任务有：MessageChannel、setTimeout()、setInterval()、UI交互事件，浏览器中独有的requestFrames、requestCallback，Node中独有setimmidiatly

requestFrames会在每次重排时触发，requestCallback只有在浏览器空闲时触发。因此优先级较低，优先执行主代码块>setimmediate >settimeout/setInterval

在vue中对宏任务的实现，优先监测setImmediate，不支持的话再去检测是否支持原生的MessageChannel，如果还不支持就降级为settimeout 0

react中fiber架构，同样如果支持MessageChannel优先选择MessageChannel，不支持采用setTimeout降级处理

常见的微任务有：process.nexttick、promise.then、MutationObserver(html5 新特性)。

在事件循环中，每进行一次循环操作称为 tick。

异步操作的模式

题目1:

```javascript
console.log('script start')

setTimeout(function(){
  console.log('setTimeout')
},0)

Promise.resolve()
	.then(function () {
  	console.log('promise1');
	})
	.then(function () {
  	console.log('promise2')
	})

console.log('script end')

// script start
// script end
// promise1
// promise2
// setTimeout
```

题目2:

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function(){
  console.log('setTimeout');
},0)

async1()

new Promise(function(resolve){
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
})
console.log('script end');

// script start
// async1 start
// async2 

// promise1
// script end

// promise2 
// async1 end

// setTimeout
```

需要注意的是，Promise一个立即执行函数，他成功或者失败的回调函数确实一个异步回调函数。当执行到resolve时这个任务会被放到回调队列当中。

### 定时器

`setTimeout`函数用来指定某个函数或某段代码，在多少毫秒之后执行。它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。

`setTimeout`函数接受两个参数，第一个参数`func|code`是将要推迟执行的函数名或者一段代码，第二个参数`delay`是推迟执行的毫秒数。

`setTimeout`和`setInterval`函数，都返回一个整数值，表示计数器编号。将该整数传入`clearTimeout`和`clearInterval`函数，就可以取消对应的定时器。

`setTimeout`和`setInterval`的运行机制，是将指定的代码移出本轮事件循环，等到下一轮事件循环，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就继续等待。

定时器应用：防抖函数

```javascript
$('textarea').on('keydown', debounce(ajaxAction, 2500));

function debounce(fn, delay){
  var timer = null; // 声明计时器
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
```

### setTimeout(f,0)

`setTimeout`的作用是将代码推迟到指定时间执行，如果指定时间为`0`，即`setTimeout(f, 0)`，不会立刻执行该函数，必须要等到当前脚本的同步任务，全部处理完以后，才会执行`setTimeout`指定的回调函数`f`。也就是说，`setTimeout(f, 0)`会在下一轮事件循环一开始就执行。

`setTimeout(f, 0)`有几个非常重要的用途。它的一大应用是，可以调整事件的发生顺序。比如，网页开发中，某个事件先发生在子元素，然后冒泡到父元素，即子元素的事件回调函数，会早于父元素的事件回调函数触发。如果，想让父元素的事件回调函数先发生，就要用到`setTimeout(f, 0)`。

`setTimeout(f,1)`与`setTimeout(f,0)`：两个函数都是尽可能使函数尽快发生，在chrome中两个函数优先级相同，以同步函数的方式执行，也就是谁在前就先执行谁，在firefox中，`setTimeout(f,0)`优先于`setTimeout(f,1)`

事实上，settimeout()函数的最小设置时间为4ms，也就是说，**如果当前正在运行的任务是由setTimeout（）方法创建的任务，并且timeout小于4，则将timeout增加到4。**

`setTimeout(1)`和 `setTimeout(1) `的优先级均高于`setTimeout(f,2)`。

### 为什么setTimeout有最小时延4ms

windows默认的time resolution是10-15.6ms，最开始浏览器的timer依赖于系统层面的timer resolution。但是chrome目的是高性能的现代浏览器，其希望timer的量级能够达到亚毫秒级，也就是小于1ms，因此chrome选取了和flash和quicktime同样的api来替代系统默认的timer resolution。

那为什么不设置最小延迟为0ms呢？因为设置0ms会让JavaScript引擎过度循环。如果速度很慢的JavaScript 通过0ms timer不断安排唤醒系统，那么event loop就会被阻塞，那么就会遇到CPU spining 和浏览器崩溃的状态。这就是chrome不设置最小延迟为0ms的原因。

那为什么不设置最小延迟为1ms呢？因为设置后有bug报告，现实timer导致CPU spinning，而CPU spinning的后果是计算机没有办法进入休眠模式。因此chrome团队不得不调整，对timer做了很多限制。最后发现将1ms提升到4ms，大部分机器上好像没有CPU spinning 和过于耗电的问题，

### 0ms延时的代码

使用postMessage实现0ms延时

```javascript
(function() {
   var timeout = [];
   var messageName = 'zero-timeout-message';
   
   function setZeroTimeout(fn){
     timeout.push(fn);
     window.postMessage(messageName,'*');
   }
  
   function handleMessage(event){
     if(event.source == window && event.data == messageName){
       event.stopPropagation();
       if (timeouts.length > 0){
          var fn = timeouts.shift();
          fn()
       }
     }
   }
  
   window.addEventListener('message',handleMessage,true)
  
   window.setZeroTimeout = setZeroTimeout;
})()
```

postMessage的回调函数的执行和setTimeout一样属于宏任务，

### setTimeout准时策略

**首次调用会有延时**

setInterval和setTimeout调用时，为了避免首次调用延时，把函数定义在settimeout或者setInterval外部,先执行原函数，再返回该函数给定时函数执行

```javascript
//延时写法
var data1 = 0；
function count1(){
  console.log("count1",data1++);
}
setInterval(count1,1000);

//先执行一次写法
var data2 = 0;
var count2 = function(){
  console.log("count2",data++);
  return count2; //若不返回时，此函数只会执行一次
}
setInterval(count2(),1000);
```

**循环调用时间不准**

如果循环调用setTimeout，setTimeout每次执行都会加入循环队列，而每轮宏任务的执行时间不一样，执行完才会检查消息队列，如果代码很多就会造成时间的偏差延后。

解决方案：

通过setTimeout代码灵活调整进行补偿方案去执行.

也就是说，假设设定每50ms执行一次，如果第一次执行到事件队列执行完需要66ms，那么第二次会通过获取系统事件，再通过代码调整为44ms，从而达到每50ms执行一次的效果

```javascript
function timer(){
  var speed = 500;
  counter = 1;
  start = new Date().getTime();
  
  function instance(){
    var ideal = (counter * speed),
    real = (new Date().getTime() - start);
    
    counter++;
    
    var diff = (real - ideal);
    
    window.setTimeout(function(){ instance()},(speed - diff));
  };
  window.setTimeout(function(){ instance()},speed);
}
```

通过这样弥补就可以实现准时的效果

**其他方法**

webworker新开线程执行

webworker为web内容在后台线程中运行脚本提供了一种简单的方法，线程可以执行任务而不干扰用户界面.在worker中写入一个while循环，当达到我们的预取时间时再向主线程发送一个完成事件，就不会因为主线程的其他事件干扰而延迟

```javascript
//生成worker
const createWorker = (fn,options) =>{
  const blob = new Blob(['('+fn.toString()+')()']);
  const url = URL.createObjectURL(blob);
  if(options){
    return new Worker(url,options)
  }
  return new Worker(url);
}
//创建worker线程实例
const worker = createWorker(function() {
  onmessage = function (e) {
    const date = Date.now();
    while(true){
      const now = Date.now();
      if(now - date >= e.data){
        postMessage(1);
        return;
      }
    }
  }
})
//主线程调用
let isStart = false;
function timer(){
  worker.onmessage = function(e){
    cb()
    if(isStart){
      worker.postMessage(speed);
    }
  }
  worker.postMessage(speed)
}
```

webworker修复时间会很准，但是一方面work线程会被while占住，导致无法接受信息，多个定时器无法同时执行，另一个方面由于onmessage 还是属于时间循环内，如果主线程有大量阻塞还是会让时间差越来越大

requestAnimationFrame

requestAnimationFrame方法是告诉浏览器希望执行一个动画，该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。回调函数通常是每秒执行60次，也就是每16.7ms执行一次，但不一定保证是16.7ms.使用该方法能模拟settimeout方法

```javascript
function setTimeout2(cb,delay){
  let startTime = Date.now();
  loop()
  
  function loop(){
    const now = Date.now()
    if(now - startTime >= delay){
      cb();
      return;
    }
    requestAnimationFrame(loop);
  }
}
```

while循环

while循环强制执行定时器的过程，但是while循环会堵塞线程，不能使用

```javascript
function timer(time){
  const startTime = Date.now()
  while(true){
    const now = Date.now();
    if(now - startTime >= time){
      console.log('误差'，now - startTime - time);
      return ;
    }
  }
}
timer(5000);
```



## 异步对象promise

Promise 对象是 JavaScript 的异步操作解决方案，为异步操作提供统一接口。它起到代理作用（proxy），充当异步操作与回调函数之间的中介，使得异步操作具备同步操作的接口。它可以将异步操作以同步的流程表达出来，它比传统的使用回调函数和事件来处理异步问题更加合理，更符合人们线性处理问题的逻辑。Promise 可以让异步操作写起来，就像在写同步操作的流程，而不必一层层地嵌套回调函数。

`Prmoise`对象中保存了异步操作的最终状态和结果。Promise有三种状态，pending(进行中)、fulfilled(已完成)、rejected(已失败)。promise只会处于三种状态中的一种状态。当异步请求开始并且未结束（没有返回结果）时，处于`pending`状态。当异步请求返回结果后，可以根据请求返回的结果将`Promise`的状态修改为`fulfilled`或者`rejected`。

Promise 是一个对象，也是一个构造函数。Promise构造函数内部设置resolve、reject两个参数，可以改变promise的状态。这两个参数是两个函数，`resolve()`函数可以将`Promise`的状态由`pending`改变为`fulfilled`。`reject()`函数可以将`Promise`的状态由`pending`改变为`rejected`。异步操作的结果`resData`传给这两个函数，就是将其保存到了`Promise`对象中。由 JavaScript 引擎提供，不用自己实现。

获取resData结果后，每个`Promise`的对象实例都会有一个`.then()`和`.catch()`方法，这两个方法都接收一个函数作为参数，这个函数会被`Promise`传入一个参数，这个参数就是传入`resolve()`、`reject()`方法中的异步请求的结果（上个例子中的`resData`）。当`Promise`内部状态变为`fulfilled`时，就会进入`.then()`方法中，执行里面的回调函数。同理，当`Promise`内部状态变为`rejected`时，就会进入`.catch()`方法中，执行里面的回调函数。

**在`.then()/.catch()`的返回值依旧是一个`Promise`实例。**也就是说，在`.then()/.catch()`中`return`任何值，都会被转化成一个`Promise`实例。所以`.then()`后面可以链式继续调用`.then()/.catch`，`.catch()`后面同样也可以。

Promise 的设计思想是，所有异步任务都返回一个 Promise 实例。Promise 实例有一个`then`方法，用来指定下一步的回调函数。

实例

```javascript

```

其他方法

Promise.resolve():接收一个任意值作为参数，可以将其转换为Promise对象。

Promise.reject()：也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

Promise.all():用于将多个`Promise`实例，包装成一个新的`Promise`实例。以`const p=Promise.all([p1,p2,p3]);`为例，`p1`、`p2`、`p3`都是 Promise 实例，只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

Promise.race():`Promise.race`方法同样是将多个`Promise`实例，包装成一个新的`Promise`实例。只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

`Promise.allSettled()`方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束。

`Promise.any()`方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。`Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是不会因为某个 Promise 变成`rejected`状态而结束。

Promise 的优点在于，让回调函数变成了规范的链式写法，程序流程可以看得很清楚。它有一整套接口，可以实现许多强大的功能，比如同时执行多个异步操作，等到它们的状态都改变以后，再执行一个回调函数；再比如，为多个回调函数中抛出的错误，统一指定处理方法等等。

而且，Promise 还有一个传统写法没有的好处：它的状态一旦改变，无论何时查询，都能得到这个状态。

Promise 的缺点是，编写的难度比传统写法高，而且阅读代码也不是一眼可以看懂。你只会看到一堆`then`，必须自己在`then`的回调函数里面理清逻辑。

Promise不是新的语法功能，而是新的写法，为了解决传统回调函数回调地狱的困难。

Promise最大的问题是代码冗余，原来的任务被promise包装后不管什么操作都是一堆then

https://caogongzi.gitee.io/2019/03/25/ES6-Promise/

### promise A+规范

PromiseA+规范其实是对Promise的长相进行了规范

术语：

promise：是一个拥有then方法的对象或者函数，其行为符合本规范

thenable：是一个定义then方法的对象或函数，主要是用来兼容一些老的promise实例。只要一个promise是实现thenable，也就是then方法，就可以跟promise/A+兼容

value：指resolve出来的值，可以是任何合法的js值，包括undefined、thenable和promise等

exception：异常，在promise里面用throw抛出来的错误

reason：拒绝原因，也就是reject里面传的参数

状态

Promise总共有三个状态：

pending:一个promise被resolve或者reject之前就处于这个状态

Fullfilled：一个promise被resolve之后就处于fullfilled状态，这个状态不能再被改变，而且必须拥有一个不可变的值(value)

Rejected：一个promise被reject之后就处于rejected状态，这个状态也不能再被改变，而且必须拥有一个不可变的拒绝原因(reason)

then方法：

一个promise必须有一个then方法来访问他的值或者拒绝理由。then方法有两个参数

```javascript
promise.then(onFulfilled,onRejected)
```

其中，如果onFullfilled或者onRejected都是可选参数，如果不是函数，都必须被忽略

then方法可以被同一个promise调用多次，promise成功执行时，onFullfilled的方法需按照其注册顺序依次调用，promise被拒绝执行时，所有的onRejected方法也需按照其注册顺序依次调用

then方法中的onFullfilled或者onRejected如果是函数，其被调用次数不可超过一次，且在promise执行结束前或者被拒绝执行前不可被调用，onFullfilled的一个参数为promise的终值value，onRejected的第一个参数为promise的拒因reason

https://segmentfault.com/a/1190000023157856



### promise同步与异步的问题

需要注意的是，promise只有.then和.catch的回调函数是异步的，会被添加到事件队列的微任务，promise resolve前的代码是同步的

例如

```html
<!DOCTYPE html>
<html>
<body>
<p>该实例使用 addEventListener() 方法向同个按钮中添加两个点击事件。</p>
<button id="myBtn">点我</button>
<script>
var x = document.getElementById("myBtn");
x.addEventListener("click", myFunction);
x.addEventListener("click", someOtherFunction);
function myFunction() {
	Promise((resolve,reject)=>{console.log("click1");})
    console.log("1")
}
function someOtherFunction() {
	Promise((resolve,reject)=>{console.log("click2");})
    console.log("2")
}
</script>
</body>
</html>
```

此段代码的输出为：

```javascript
click1
1
click2
2
```



## 赋值、深拷贝与浅拷贝

浅拷贝:将内存中的某个对象复制一份,在内存中开辟一块新的空间,如果复制的这个对象的属性为基本数据类型,则拷贝的便为这个值本身,如果为复杂数据类型,则拷贝复制的为地址,因此,修改新对象会对原对象产 生影响

深拷贝:开辟一块新的空间,完整的复制一份,包括复杂数据类型,拷贝的这个对象和原对象无任何关系,修改什么 的都互不影响

深拷贝：我们希望在改变新的数组（对象）的时候，不改变原数组（对象）

赋值是将某一**数值或对象**赋给某个**变量**的过程，分为：

1、基本数据类型：赋值，赋值之后两个变量互不影响

2、引用数据类型：赋**址**，两个变量具有相同的引用，指向同一个对象，相互之间有影响

浅拷贝：**创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝**。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。object.assign、array.slice都属于浅拷贝



用代码说明

```javascript
var a = {}
var b = {...a}
var c = a;

console.log(a === b)  //false
console.log(b === c)  //false
console.log(a === c)	// true
```





|        | 和原数据是否指向同一对象 | 第一层数据为基本数据类型 | 原数据中包含子对象       |
| ------ | ------------------------ | ------------------------ | ------------------------ |
| 赋值   | 是                       | 改变会使原数据一起改变   | 改变会使原数据一起改变   |
| 浅拷贝 | 否                       | 改变不会使原数据一起改变 | 改变会使原数据一起改变   |
| 深拷贝 | 否                       | 改变不会使原数据一起改变 | 改变不会使原数据一起改变 |