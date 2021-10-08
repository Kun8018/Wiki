---
title: JavaScript开发（五）
date: 2021-01-19 21:40:33
categories: IT
tags: IT，Web,Node
toc: true
thumbnail: http://cdn.kunkunzhang.top/es6.png
---

第五篇注重ES6

<!--more-->

## ES6

### ES6简介

ES6与JavaScript的关系

JavaScript 的创造者 Netscape 公司，决定将 JavaScript 提交给标准化组织 ECMA，希望这种语言能够成为国际标准。次年，ECMA 发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版。

因此，ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 JScript 和 ActionScript）。日常场合，这两个词是可以互换的。

ES6与ES5

EMCA的标准委员会决定，标准在每年的 6 月份正式发布一次，作为当年的正式版本。接下来的时间，就在这个版本的基础上做改动，直到下一年的 6 月份，草案就自然变成了新一年的版本。这样一来，就不需要以前的版本号了，只要用年份标记就可以了。

ES6 的第一个版本，就这样在 2015 年 6 月发布了，正式名称就是《ECMAScript 2015 标准》（简称 ES2015）。2016 年 6 月，小幅修订的《ECMAScript 2016 标准》（简称 ES2016）如期发布，这个版本可以看作是 ES6.1 版，因为两者的差异非常小（只新增了数组实例的`includes`方法和指数运算符），基本上是同一个标准。2017 年 6 月发布 ES2017 标准。

ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。

**考虑到未来所有的代码，其实都是运行在模块之中，ES6 实际上把整个语言升级到了严格模式。**

### let、const与块级作用域 

const声明一个只读的常量，一旦声明，常量的值就不能修改

let和const只在声明的块级作用域内有效

const和let声明的变量不可重复声明

const变量一旦声明，就必须**立即初始化**，不能留到以后赋值，只声明不赋值就会报错

```javascript
const foo
// SyntaxError: Missing initializer in const declaration
```

const声明Object或者Array时，只是已经声明的对象属性不能变化，但是对象和数组仍然可变，可以添加新的属性或者值，如果想要对象不变，使用object.freeze冻结对象



暂时性死区



ES5中只有全局作用域和函数作用域，ES6新增了块级作用域，用{}表示。

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n) //5
}
```

块级作用域的出现使得获得广泛应用的匿名立即执行函数表达式(匿名IIFE)不再必要了

ES5中规定，函数只能在顶层作用域和函数作用域中声明，不能在块级作用域中声明

ES6中中明确规定允许在块级作用域声明函数，函数声明语句类似于let，只能在块级作用域中引用



### proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

方法：

`get`方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

`set`方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

`has`方法用来拦截`HasProperty`操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是`in`运算符。`has`方法可以接受两个参数，分别是目标对象、需查询的属性名。

`deleteProperty`方法用于拦截`delete`操作，如果这个方法抛出错误或者返回`false`，当前属性就无法被`delete`命令删除。

`defineProperty()`方法拦截了`Object.defineProperty()`操作。

`getOwnPropertyDescriptor()`方法拦截`Object.getOwnPropertyDescriptor()`，返回一个属性描述对象或者`undefined`。

`getPrototypeOf()`方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。

- `Object.prototype.__proto__`
- `Object.prototype.isPrototypeOf()`
- `Object.getPrototypeOf()`
- `Reflect.getPrototypeOf()`
- `instanceof`

`isExtensible()`方法拦截`Object.isExtensible()`操作。

`ownKeys()`方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。

- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `Object.keys()`
- `for...in`循环

`preventExtensions()`方法拦截`Object.preventExtensions()`。该方法必须返回一个布尔值，否则会被自动转为布尔值。

`setPrototypeOf()`方法主要用来拦截`Object.setPrototypeOf()`方法。

`Proxy.revocable()`方法返回一个可取消的 Proxy 实例。

### Generator函数

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

Generator 函数是一个普通函数，形式上有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象（Iterator Object）

下一步，必须调用遍历器对象的`next`方法，使得指针移向下一个状态。也就是说，每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`表达式（或`return`语句）为止。换言之，Generator 函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

`yield`表达式与`return`语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到`yield`，函数暂停执行，下一次再从该位置继续向后执行，而`return`语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）`return`语句，但是可以执行多次（或者说多个）`yield`表达式。正常函数只能返回一个值，因为只能执行一次`return`；Generator 函数可以返回一系列的值，因为可以有任意多个`yield`。从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的来历

**next函数传参**

`yield`表达式本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

next函数传参这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过`next`方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

```javascript
function* foo(x){
var y =2*(yield (x +1));
var z = yield (y /3);
return(x + y + z);
}
var a = foo(5);
a.next()// Object{value:6, done:false}
a.next()// Object{value:NaN, done:false}
a.next()// Object{value:NaN, done:true}
var b = foo(5);
b.next()// { value:6, done:false }
b.next(12)// { value:8, done:false }
b.next(13)// { value:42, done:true }
//第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。

//如果向next方法提供参数，返回结果就完全不一样了。上面代码第一次调用b的next方法时，返回x+1的值6；第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42
```

由于`next`方法的参数表示上一个`yield`表达式的返回值，所以在第一次使用`next`方法时，传递参数是无效的。V8 引擎直接忽略第一次使用`next`方法时的参数，只有从第二次使用`next`方法开始，参数才是有效的。从语义上讲，第一个`next`方法用来启动遍历器对象，所以不用带有参数。

如果想要第一次调用`next`方法时，就能够输入值，可以在 Generator 函数外面再包一层。

```javascript
function wrapper(generatorFunction){
returnfunction(...args){
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
return generatorObject;
};
}
const wrapped = wrapper(function*(){
  console.log(`First input: `);
	return'DONE';
});
wrapped().next('hello!')
// First input: hello!
```





为了防止手动遍历generator函数，js提供co函数库操作generator函数



generator最大的特点是交出函数的执行权，即暂停执行，异步操作需要暂停的地方使用yield注明，此处引入协程的概念。

进程有变量隔离，自动切换运行上下文

线程没有变量隔离，自动切换运行上下文

协程不进行变量隔离，不自动切换运行上下文

### async函数

async可以理解为generator+promise的语法糖，async可以看作是多个异步操作包装成的一个promise对象，而await命令是内部.then的语法糖

async对generator的改进体现在以下四点：

1.内置执行器。generator需要co模块或者调用next方法才能执行，而async函数自带执行器可以向普通函数一样。

2.更好的语义。比起generator的yield和*，async和await更直接

3.更广的适用性。yield命令返回的是promise对象或者thunk函数，而await后面可以是promise对象或者任意原始类型（数值、字符串、布尔值等），方便操作。

4.返回值是promise。generator的返回值是iterator对象，而async返回的是promise对象，可以用.then方法指定下一步的操作。

asnyc函数会返回一个promise对象，



错误处理

await后面跟promise对象时，可能会reject，此时将await写在try里

```javascript
function getUsers() {
    return $.ajax('https://github.com/users');  
}

async function getFirstUser() {
    try {
        let users = await getUsers();
        return users[0].name;
    } catch (err) {
        return {
          name: 'default user'
        }
    }
}
```

#### async与promise的区别

async相比promise的优势:处理 then 的调用链，能够更清晰准确的写出代码

async相比promise的劣势：

有多个接口的情况下，async/await是继发，也就是一个一个接口请求，promise.all是同步触发

如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低，代码没有依赖性的话，完全可以使用 Promise.all 的方式。

async同步触发写法

```javascript
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

反过来，如果是有依赖性的接口，那么async的语法更直观更符合语义



### 新增class类

JavaScript 语言中，生成实例对象的传统方法是通过构造函数。

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。

基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。

类的实例

使用new命令生成类的实例,类的所有实例共享一个原型对象。

```javascript
class Point {
  constructor() {}
}

var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__//Point.prototype ==Point.prototype
```

在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```



类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。静态方法可以与非静态方法重名。

每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype`属性。Class 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链。

（1）子类的`__proto__`属性，表示构造函数的继承，总是指向父类。

（2）子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

#### Super关键字

`super`作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次`super`函数。

`super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

#### Mixin模式

Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。

用最简单的实现实现Mix如下

```javascript
const a = {
  a: 'a'
};
const b = {
  b: 'b'
};
const c = {...a, ...b}; // {a: 'a', b: 'b'}
```







### 新增数据类型和数据结构

ES6 引入了一种新的原始数据类型`Symbol`，表示独一无二的值。它是 JavaScript 语言的第七种数据类型。





ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

`Set`本身是一个构造函数，用来生成 Set 数据结构。

Map

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

Map类型的属性和方法

属性

`size`属性返回 Map 结构的成员总数。

`set`方法设置键名`key`对应的键值为`value`，然后返回整个 Map 结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。

`get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`。

`has`方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

`Map.prototype.delete(key)`方法删除某个键，返回`true`。如果删除失败，返回`false`。

`Map.prototype.clear()`方法清除所有成员，没有返回值。

方法

- `Map.prototype.keys()`：返回键名的遍历器。
- `Map.prototype.values()`：返回键值的遍历器。
- `Map.prototype.entries()`：返回所有成员的遍历器。
- `Map.prototype.forEach()`：遍历 Map 的所有成员。

WeakMap

`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。

WeakMap与Map的区别有两点。

1.`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。

2.`WeakMap`的键名所指向的对象，不计入垃圾回收机制。

`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

weakmap的用途：

1.将DOM 节点作为键名。获取dom节点后，每当发生`click`事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。

2.WeakMap 的另一个用处是部署私有属性。

### 新增模块化

历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。其他语言都有这项功能，比如 Ruby 的`require`、Python 的`import`，甚至就连 CSS 有`@import`，但是 JavaScript 任何这方面的支持都没有，这对开发大型的、复杂的项目形成了巨大障碍。

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量。

`export`命令除了输出变量，还可以输出函数或类（class）。

`export`语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

`export`命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的`import`命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块。

如果想为输入的变量重新取一个名字，`import`命令要使用`as`关键字，将输入的变量重命名。

`import`命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

`import`后面的`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径。如果不带有路径，只是一个模块名，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

`import`命令具有提升效果，会提升到整个模块的头部，首先执行。

`import`是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。如果多次重复执行同一句`import`语句，那么只会执行一次，而不会执行多次。

除了指定加载某个输出值，还可以使用整体加载，即用星号（`*`）指定一个对象，所有输出值都加载在这个对象上面。

从前面的例子可以看出，使用`import`命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到`export default`命令，为模块指定默认输出。

上面代码是一个模块文件`export-default.js`，它的默认输出是一个函数。

`export default`命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此`export default`命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应`export default`命令。

其他模块加载该模块时，`import`命令可以为该匿名函数指定任意名字。

#### Js模块化方案对比

模块化这个话题在ES6之前不存在，因此也被诟病为早期Javascript开发全局污染和依赖管理混乱的源头

`require`是运行时加载模块，`import`命令无法取代`require`的动态加载功能。

commonjs加载时，是整体加载如模块的所有方法，再生成对象，例如

```javascript
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面代码的实质是整体加载`fs`模块（即加载`fs`的所有方法），生成一个对象（`_fs`），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

上面代码的实质是从`fs`模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

commonjs

弥补JavaScript在服务器端缺少模块化机制，NodeJS、webpack都是基于该规范开发

**特点**：

 所有代码都运行在独立的模块作用域，不会污染全局作用域

模块可以多次加载，但是只会在第一次加载时运行，然后运行结果就会被缓存，以后再加载就读取缓存结果，要想让模块再次运行就必须清除缓存

模块加载的顺序按照在代码中出现的顺序

**优点**：服务器端模块重用，NPM中模块包多，有将近20万个。

**缺点：**

无法在编译阶段确认产物，且可以在代码中随意使用require，比如全局、函数、if/else条件语句中等等

加载模块是同步的，只有加载完成后才能执行后面的操作，也就是当要用到该模块了，现加载现用，不仅加载速度慢，而且还会导致性能、可用性、调试和跨域访问等问题。Node.js主要用于服务器编程，加载的模块文件一般都存在本地硬盘，加载起来比较快，不用考虑异步加载的方式，因此,CommonJS规范比较适用。然而，这并不适合在浏览器环境，同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD CMD解决方案。

此外，ES6 模块输出的是值的引用，输出接口动态绑定，而 CommonJS 输出的是值的拷贝

AMD与requirejs

commonJS规范很好，但是不适用于浏览器环境，于是有了AMD和CMD两种方案。AMD全称Asynchronous Module Definition，即异步模块定义。它采用异步方式加载模块，

```javascript
define("module", ["dep1", "dep2"], function(d1, d2) {
  return someExportedValue;
});
require(["module", "../file"], function(module, file) { /* ... */ });
```

AMD草案的作者以RequireJS实现了AMD规范，所以一般说AMD是RequireJS

CMD

CMD全称Common Module Definition，是Sea.js所推广的一个模块化方案的输出。SeaJS与RequireJS并称，作者为阿里的玉伯

与AMD的主要区别：
1.对于依赖的模块，AMD是提前执行，CMD是延迟执行。不过RequereJS从2.0开始也改成可以延迟执行，CMD推崇as lazy as possible。延迟执行的意思是只有到require时依赖模块才执行

2.CMD推崇依赖就近，AMD推崇依赖前置

Common Module Definition 规范和 AMD 很相似，尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。

```javascript

define(function(require, exports, module) {
  var $ = require('jquery');
  var Spinning = require('./spinning');
  exports.doSomething = ...
  module.exports = ...
})
```

UMD，全称Universal Module Definition，即通用模块规范，既然CommonJS和AMD风格一样流行，就需要一个统一浏览器端和非浏览器端的模块化方案的规范

UMD的实现很简单：

先判断是否支持AMD(define是否存在)，存在则使用AMD方式加载模块

再判断是否支持Nodejs模块格式(exports是否存在)，存在则使用Nodejs模块格式

前两个都不存在，则将模块公开到全局(window或者global)

ES6 Modules

以上这些都是社区提供的方案，历史上Javascript一直没有模块化系统，直到ES6在语言标准的层面实现了它。

CommonJS和AMD模块都只能在运行时确定模块的依赖关系，以及输入输出的变量，而ES6的设计思想是尽可能静态化，在编译时就能确定这些东西。

**总结**

AMD依赖前置，提前执行，语法是define，require

CMD依赖就近，延迟执行，语法是define，seajs。use 。延迟执行的意思是只有到require时依赖模块才执行

Commonjs首次执行会被缓存，再次加载只返回缓存结果，require返回的值时输出值的拷贝，对于引用类型是浅拷贝



### 扩展运算符





### 遍历器



### 装饰器

装饰器不能用于函数，因为会存在函数提升



### Reflect

`Reflect`对象与`Proxy`对象一样，也是 ES6 为了操作对象而提供的新 API。`Reflect`对象的设计目的有这样几个。

将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。

`Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。

`Reflect`对象一共有 13 个静态方法。

`Reflect.get`方法查找并返回`target`对象的`name`属性，如果没有该属性，则返回`undefined`。

`Reflect.set`方法设置`target`对象的`name`属性等于`value`。

`Reflect.has`方法对应`name in obj`里面的`in`运算符。

`Reflect.deleteProperty`方法等同于`delete obj[name]`，用于删除对象的属性。

`Reflect.construct`方法等同于`new target(...args)`，这提供了一种不使用`new`，来调用构造函数的方法。

`Reflect.getPrototypeOf`方法用于读取对象的`__proto__`属性，对应`Object.getPrototypeOf(obj)`。
`Reflect.setPrototypeOf`方法用于设置目标对象的原型（prototype），对应`Object.setPrototypeOf(obj, newProto)`方法。它返回一个布尔值，表示是否设置成功。

`Reflect.apply`方法等同于`Function.prototype.apply.call(func, thisArg, args)`，用于绑定`this`对象后执行给定函数。



### 对象扩展

#### Object对象的扩展

`Object.assign()`方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）

`Object.assign()`方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

super关键字

`this`关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字`super`，指向当前对象的原型对象。



#### math对象的扩展



#### Number对象的扩展



#### 数组对象的扩展

`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

`Array.of`方法用于将一组值，转换为数组。

数组实例的`find`方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。

数组实例的`findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`。

`fill`方法使用给定值，填充一个数组。

`Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes`方法类似。

`Array.prototype.flat()`用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。数组的成员有时还是数组。`flat()`默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将`flat()`方法的参数写成一个整数，表示想要拉平的层数，默认为1。

如果不管有多少层嵌套，都要转成一维数组，可以用`Infinity`关键字作为参数。

如果原数组有空位，`flat()`方法会去掉空位。

`flatMap()`方法对原数组的每个成员执行一个函数（相当于执行`Array.prototype.map()`），然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组。



#### 字符串对象的扩展

`String.raw()`方法。该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。

`String.includes()`：返回布尔值，表示是否找到了参数字符串。

`String.startsWith()`：返回布尔值，表示参数字符串是否在原字符串的头部。

`String.endsWith()`：返回布尔值，表示参数字符串是否在原字符串的尾部。

`String.repeat()`方法返回一个新字符串，表示将原字符串重复`n`次。

如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()`用于头部补全，`padEnd()`用于尾部补全。

`trimStart()`和`trimEnd()`这两个方法。它们的行为与`trim()`一致，`trimStart()`消除字符串头部的空格，`trimEnd()`消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

#### 函数对象扩展

ES6允许使用箭头定义函数

箭头函数的存在是为了方便在很多地方执行小函数的情况。比如foreach、settimeout等，这种情况下我们并不想离开当前上下文，这时就使用箭头函数。

```js
// 箭头函数,包含一个name参数
let fun = (name) => {
    // 函数体
    return `Hello ${name} !`;
};
// 等同于
let fun = function (name) {
    // 函数体
    return `Hello ${name} !`;
};
```

没有参数时使用空括号，有多个参数时用逗号隔开

箭头函数没有this、`arguments`、`super`、`new.target`，全部指向外层函数的对应变量，所以也就不能用`call()`、`apply()`、`bind()`这些方法去改变`this`的指向。

不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

（3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

ES6 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，

##### 箭头函数与普通函数的区别

1.语法更加简洁清晰

2.箭头函数不会创建自己的this。箭头函数没有自己的`this`，它会捕获自己在**定义时**（注意，是定义时，不是调用时）所处的**外层执行环境的`this`**，并继承这个`this`值。所以，箭头函数中`this`的指向在它被定义的时候就已经确定了，之后永远不会改变。.call()/.apply()/.bind()也无法改变箭头函数中this的指向

3.箭头函数没有原型prototype，没有自己的arguments，在箭头函数中访问`arguments`实际上获得的是外层局部（函数）执行环境中的值。

实例

```js
function outer(val1, val2) {
    let argOut = arguments;
    console.log(argOut);    // ①
    let fun = () => {
        let argIn = arguments;
        console.log(argIn);     // ②
        console.log(argOut === argIn);  // ③
    };
    fun();
}
outer(111, 222);
//1、2处的输出相同，为111，222，3处输出为true
```

4.箭头函数不能作为构造函数使用，不能用作Generator函数，不能使用yeild关键字、new关键字

箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

##### 箭头函数vsbind

箭头函数没有创建任何绑定，箭头函数只是没有this，this的查找与常规变量的搜索方式完全相同：在外部词法环境中查找

。bind创建了一个函数参数的绑定版本

##### 尾调用与尾递归(非常重要)

尾调用时函数式编程的一个重要概念，本身非常简单，就是某个函数在最后一步调用另一个函数

```javascript

```

函数调用时会在内存中形成一个调用记录，又称调用帧，保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方还会形成一个B的调用帧，等到B运行结束之后，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推，所有的调用帧就形成一个调用栈

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量信息等不会被再用到，只有直接用内层函数的调用帧，取代外层函数的调用帧就可以

这个就叫做尾调用优化，只保留内层函数的调用帧。如果所有的函数都是尾调用，那么完全可以做到每次调用时调用帧只有一项，这将大大节省内存，这就是尾调用的意义

函数调用自身的过程，称为递归。递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生栈溢出错误。但是对于尾递归来说，由于只存在一个调用帧，所以永远也不会发生栈溢出错误。

比如常见的斐波那契数列的非尾递归写法

```javascript
function Fibonacci(n) {
  if (n<=1) {
    return n
  }
  return Fibonacci(n-1) + Fibonacci(n-2)
}

Fibonacci(10) //89
Fibonacci(100) // 超时
Fibonacci(1000) // 超时
```

尾递归优化之后的代码

```javascript
function Fibonacci2(n,ac=1,ac2=1) {
  if (n<=1) {
    return ac2
  }
  return Fibonacci(n-1,ac2,ac1+ac2)
}
Fibonacci2(100) //89
Fibonacci2(1000) //89
Fibonacci2(10000) //infinite
```

尾调用的意义非常重大，因此ES6规定所有ECMA的实现都必须采用尾调用优化

递归本质上是一种循环操作，但是纯粹的函数式编程没有循环操作命令，所有的循环都通过递归实现，这就是尾递归对这些语言的重要意义

尾递归调用要注意的问题

尾递归调用不能使用函数中的其他变量，因此写的时候要注意写法

通常是在另一个函数中调用递归函数，这样去实现避免中间变量

```javascript
//阶乘函数，用普通递归函数实现
function factorial(n) {
  if (n == 1){
    return 1
  }
  return n * factorial(n-1);
}

factorial(5)
//用尾调用实现
function factorial(n,total) {
  if(n == 1) return total;
  return factorial(n-1,n*total);
}

factorial(5,1)
//用嵌套尾调用实现，参数更简单
function tailFactorial(n,total) {
  if(n == 1) return total;
  return tailFactorial(n-1,n*total);
}

function factorial(n) {
  return tailFactorial(n,1);
}
factorial(5)
```

也可以用函数科里化实现

#### 解构赋值与扩展运算符

ES6允许按照一定模式从对象和数组中提取值，对变量进行赋值，称为解构

数组解构

```javascript
// 解构不成功时为undefined
let [a,b,c] = [1,2,3] //a:1,b:2,c:3
let [,,third] = ["foo","bar","baz"] //third: baz
let [x,,y] = [1,2,3] //x:1,y:3
let [head,...tail] = [1,2,3,4] //head:1,tail:[2,3,4]
let [x,y,...z] = ['a'] //x:'a',y:undefined,z:[]

// 不完全解构
let [x,y] = [1,2,3] //x:1,y:2
let [a,[b],d] = [1,[2,3],4] //a:1,b:2,d:4

```

对象解构

```javascript
//对象与数组的不同是，数组的元素是按次序排列的，变量的取值由位置决定，而对象的属性没有次序，必须同名才能取到正确的值
let { foo, bar } = {foo:'aaa',bar:'bbb'}; //foo “aaa”，bar “bbb”
let { baz } = {foo:'aaa',bar:'bbb'} // undefined

//将现有对象的方法赋值到某个变量上去
let { log,sin,cos } = Math;

// 先找同名的属性值，再赋给对应的变量，所以真正被赋值的是后者而不是前者
let { foo:baz } = {foo:'aaa',bar:'bbb'}, //baz:'aaa',foo:error,not defined

//嵌套解构
let obj = {
  p: ['hello',{y: 'world'}]
}
let {p:[x,{y}]} = obj; //x：hello y：world p：undefined
let {p,p:[x,{y}]} = obj; // x：helle y：world p “helle ，y world
```

字符串解构

```javascript
const [a,b,c,d,e] = 'hello',
```

数值和布尔值的解构赋值

```javascript
let {toString: s} = 123;

let {toString: s} = true;
```

函数参数的解构赋值

```javascript
function add([x,y]){
  return x+y
}
add([1,2])

[[1,2],[3,4]].map(([a,b])=> a + b) //[3,7]
```

解构赋值的应用

1.变量交换

```javascript
let x=1;let y=2;
[x,y] = [y,x]
```

2.从函数返回多个值

```javascript
function example(){
  return {
    foo: 1,
    bar: 2
  }
}
let { foo,bar } = example();
```

3.函数参数定义

```javascript
//
function f({x,y,z}) {...}
f({z:3,y:2,x:1})
// 
function f([x,y,z]) {...}
f([1,2,3])
```

4.提取JSON数据

```javascript
let jsonData = {
  id:42;
  status: "OK",
  data: [867, 5309]
}

let { id,status, data:number} = jsonData //id,status,number
```

5.输入模块的指定方法。解构赋值能使输入语句变得十分清晰

```javascript
const { SourceMapConsumer, SourceNode } = require("source-map")
```

其他：函数参数默认值、遍历Map结构

解构赋值和扩展运算符都是浅拷贝

扩展运算符使用objec

扩展运算符（spread）是三个点（`...`）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

 该运算符主要用于函数调用时使用，用于将数组的每个元素转化为逐个参数。

扩展运算符与正常的函数参数可以结合使用，非常灵活。



### 模版字符串

传统的 JavaScript 语言，输出模板使用jquery通常是这样写的

```javascript
$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);
```

ES6引入了模板字符串简化了写法

```javascript
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

### ES6与ES5转码

[Babel](https://babeljs.io/) 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在老版本的浏览器执行。这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。

安装Babel

```shell
npm install --save-dev @babel/core
```

配置文件babelrc

Babel 的配置文件是`.babelrc`，存放在项目的根目录下。使用 Babel 的第一步，就是配置这个文件。

该文件用来设置转码规则和插件，基本格式如下。

```babelrc
{
  "presets": [],
  "plugins": []
}
```

`presets`字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。

```shell
# 最新转码规则
$ npm install --save-dev @babel/preset-env

# react 转码规则
$ npm install --save-dev @babel/preset-react
```

然后，将这些规则加入`.babelrc`。

```
{
    "presets": [
      "@babel/env",
      "@babel/preset-react"
    ],
    "plugins": []
 }
```

Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如`Iterator`、`Generator`、`Set`、`Map`、`Proxy`、`Reflect`、`Symbol`、`Promise`等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）都不会转码。

举例来说，ES6 在`Array`对象上新增了`Array.from`方法。Babel 就不会转码这个方法。如果想让这个方法运行，可以使用`core-js`和`regenerator-runtime`(后者提供generator函数的转码)，为当前环境提供一个垫片。

安装

```shell
npm install --save-dev core-js regenerator-runtime
```

然后在脚本头部加入如下代码

```javascript
import 'core-js';
import 'regenerator-runtime/runtime';
// 或者
require('core-js');
require('regenerator-runtime/runtime);
```

`@babel/node`模块的`babel-node`命令，提供一个支持 ES6 的 REPL 环境。它支持 Node 的 REPL 环境的所有功能，而且可以直接运行 ES6 代码。

安装

```shell
npm install --save-dev @babel/node
```

执行`babel-node`就进入 REPL 环境。

`@babel/register`模块改写`require`命令，为它加上一个钩子。此后，每当使用`require`加载`.js`、`.jsx`、`.es`和`.es6`后缀名的文件，就会先用 Babel 进行转码。

```shell
npm install --save-dev @babel/register
```

使用时，必须首先加载`@babel/register`。

Babel 提供一个[REPL 在线编译器](https://babeljs.io/repl/)，可以在线将 ES6 代码转为 ES5 代码。转换后的代码，可以直接作为 ES5 代码插入网页运行。

