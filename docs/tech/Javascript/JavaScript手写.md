---
title: 手写JavaScript
date: 2021-1-23 21:40:33
categories: IT
tags: IT，Web
toc: true
thumbnail: http://cdn.kunkunzhang.top/nestjs.png
---

手写javascript

<!--more-->

## 手写JavaScript

#### new实例的过程、手写new的过程

```js
//接受一个函数
//最后返回一个对象
function new (fn) {
    return function () {
      var obj = { 
         '__proto__': fn.prototype
      }
      fn.apply(obj, arguments)      
      return obj
    }
}
```

#### this、手写bind、call、apply

this 永远指向最后调用它的那个对象

改变this指向的方法：

- 使用 ES6 的箭头函数
- 在函数内部使用 `_this = this`
- 使用 `apply`、`call`、`bind`
- new 实例化一个对象

apply 和 call 的区别是 call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组，bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

手写bind、call、apply

bind

```js
//调用原生案例
// Function.prototype.bind()样例
function fun(arg1, arg2) {
  console.log(this.name)
  console.log(arg1 + arg2)
}
const _this = { name: 'YIYING' }
// 只变更fun中的this指向，返回新function对象
const newFun = fun.bind(_this)
newFun(1, 2)
//手写实现
Function.prototype.ownBind = function(context) {
  context = (typeof context === 'object' ? context : window)
  return (...args)=>{
    this.call(context, ...args)
  }
}
//调用手写案例 验证样例
function fun(arg1, arg2) {
  console.log(this.name)
  console.log(arg1 + arg2)
}
const _this = { name: 'YIYING' }
// 只变更fun中的this指向，返回新function对象
const newFun = fun.ownBind(_this)
newFun(1, 2)
```

call

```js
//调用原生案例
  function fun(arg1, arg2) {
    console.log(this.name)
    console.log(arg1 + arg2)
  }
  const _this = { name: 'YIYING' }
  // 接受的是一个参数列表;方法立即执行
  fun.call(_this, 1, 2)
//手写实现
  Function.prototype.ownCall = function(context, ...args) {
    context = (typeof context === 'object' ? context : window)
    // 防止覆盖掉原有属性
    const key = Symbol()
    // 这里的this为需要执行的方法
    context[key] = this
    // 方法执行
    const result = context[key](...args)
    delete context[key]
    return result
  }
//调用手写案例 验证样例
  function fun(arg1, arg2) {
    console.log(this.name)
    console.log(arg1 + arg2)
  }
  const _this = { name: 'YIYING' }
  // 接受的是一个参数列表;方法立即执行
  fun.ownCall(_this, 1, 2)
```

apply

```js
//调用原生案例
  function fun(arg1, arg2) {
    console.log(this.name)
    console.log(arg1 + arg2)
  }
  const _this = { name: 'YIYING' }
  // 参数为数组;方法立即执行
  fun.apply(_this, [1, 2])
//手写
  Function.prototype.ownApply = function(context, args) {
    context = (typeof context === 'object' ? context : window)
    // 防止覆盖掉原有属性
    const key = Symbol()
    // 这里的this为需要执行的方法
    context[key] = this
    // 方法执行
    const result = context[key](...args)
    delete context[key]
    return result
  }
//调用手写案例，验证样例
function fun(arg1, arg2) {
  console.log(this.name)
  console.log(arg1 + arg2)
}
const _this = { name: 'YIYING' }
// 参数为数组;方法立即执行
fun.ownApply(_this, [1, 2])
```

#### 手写深拷贝与浅拷贝

区别：

浅拷贝是指拷贝内存地址，公用同一个堆内存，两个变量相互受影响，深拷贝是指，开辟一块内存空间，保存相同的值。互不受影响。

浅拷贝实现

三种方式

- ES6：object.assign()
- 展开运算符…
- 自己封装函数实现

深拷贝实现

三种方式

- JSON.parse() (但是如果里面有 function 和 undefined 不可用)
- lodash
- 自己封装

手写深拷贝

```js
function deepCopy(obj){
    //判断是否是简单数据类型，
    if(typeof obj == "object"){
        //复杂数据类型
        var result = obj.constructor == Array ? [] : {};
        for(let i in obj){
            result[i] = typeof obj[i] == "object" ? deepCopy(obj[i]) : obj[i];
        }
    }else {
        //简单数据类型 直接 == 赋值
        var result = obj;
    }
    return result;
}
```

JSON.parse(JSON.stringfy(X)) 的缺点：

在序列化JavaScript对象时，所有函数和原型成员会被有意忽略。

如：如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式，而不是对象的形式

如果obj里有RegExp(正则表达式的缩写)、Error对象，则序列化的结果将只得到空对象；

如果obj里有函数，undefined，则序列化的结果会把函数或 undefined丢失；

如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null

JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor；

通俗点说，JSON.parse(JSON.stringfy(X))，其中X只能是Number, String, Boolean, Array, 扁平对象，即那些能够被 JSON 直接表示的数据结构。



#### 手写typeof与instanceof

`typeof` 一般被用于判断一个变量的类型，我们可以利用 `typeof` 来判断`number`, `string`, `object`, `boolean`, `function`, `undefined`, `symbol` 这七种类型，typeof可以判断出基本数据类型(当然除了null的数据类型为object的bug),还可以正确判断出某个对象是否为function,其余的Date,Array等无法判断

手写typeof

```js
//使用Object.prototype.toString实现
```

 `instanceof` 主要的作用就是判断一个实例是否属于某种类型，`instanceof` 也可以判断一个实例是否是其父类型或者祖先类型的实例。

instanceof相反,可以准确判断出复杂数据类型,但是无法判断简单数据类型.

手写instanceof

```js
function instanceOf(left,right) {
    let proto = left.__proto__;
    let prototype = right.prototype
    while(true) {
        if(proto === null) return false
        if(proto === prototype) return true
        proto = proto.__proto__;
    }
}
```

#### 手写ajax

ajax请求是通过js的xmlHttpRequest对象与后端服务器交换数据

```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET",url,false);
xhr.onreadtstatechange = function() {
  if(xhr.readystate == 4){
    //响应内容解析完成
     if(xhr.status == 200){
       //客户端请求成功
       alert(xhr.responseText);
     }
  } 
}
```

状态码说明：

0-未初始化，还未调用send方法 1-载入，已调用send方法发送请求，等待响应 2-载入完成，完全接收到响应内容 3-交互，正在解析响应内容 4-完成解析，可以进行调用

#### 手写jsonp

 jsonp原理：因为jsonp发送的并不是ajax请求，其实是动态创建script标签 script标签是没有同源限制的，把script标签的src指向请求的服务端地址。

```javascript
 function jsonp (url,data={},callback='callback') {
     //处理json对象，拼接url
     data.callback = callbak
     let params = []
     for(let key in data){
         params.push(key + '=' + data[key])
     }
     let script = document.creatElement('script')
     script.src = url + '?' + params.join('&')
     document.body.appendChild(script)
     
     //返回Promise
     return new Promise ((resolve,reject) => {
        window[callback] = (data) => {
            try{
                resolve (data)
            } catch(e){
                reject(e)
            } finally {
                //移除script元素
                script.parentNode.removeChild(script)
                console.log(script)
            }
        }
     })
 }
 
 //请求数据
 jsonp('http://photo.sina.cn/aj/index',{
     page:1,
     cate:'recommend',
 },'jsoncallback').then(data => {
     console.log(data)
 })
```

#### 防抖与节流

防抖

防抖的含义：当一次事件发生后，事件处理器要等一定阈值的时间，如果这段时间过去后 再也没有 事件发生，就处理最后一次发生的事件。假设还差 `0.01` 秒就到达指定时间，这时又来了一个事件，那么之前的等待作废，需要重新再等待指定时间。

```js
// 防抖动函数
function debounce(fn,wait=50,immediate) {
    let timer;
    return function() {
        if(immediate) {
            fn.apply(this,arguments)
        }
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=> {
            fn.apply(this,arguments)
            timer = null;
        },wait)
    }
}
```

节流

可以将一个函数的调用频率限制在一定阈值内，例如 1s，那么 1s 内这个函数一定不会被调用两次

手写节流

```js
function throttle(fn, wait) {
	let prev = new Date();
	return function() { 
	  const args = arguments;
		const now = new Date();
		if (now - prev > wait) {
			fn.apply(this, args);
			prev = new Date();
		}
	}
```

函数防抖的使用场景：

- 手机号、邮箱输入检测
- 窗口大小resize

函数节流使用场景：

- 滚动加载，加载更多或者滚到底部监听

- 搜索框搜索联想功能

- 高频点击提交、重复提交

#### 手写js数组push、splice、map、foreach方法

push方法

```js
Array.prototype.push = function () {
    for (var i = 0; i< arguments.length; i++) {
        this[this.length] = arguments[i]
    }
    return this.length
}
```

splice方法

```javascript
Array.prototype._splice = function (index, howmany = 0) {
  let arr = this
  let left = arr.slice(0, index) // 截取左边的数组
  let right = arr.slice(index + howmany, arr.length) // 截取右边的数组
  let subArr = Array.prototype.slice.call(arguments, 2) // 截取参数里面需要添加的数组
  let result = []
  // 合并数组
  result = [...left, ...subArr, ...right]
  // 这里改变 this， 就是改变原数组
  for (let i = 0; i < result.length; i++) {
    this[i] = result[i]
  }
  // 返回删除的数据
  return this.slice(index, index + howmany)
}
```

map方法(reduce实现)

```javascript
if (!Array.prototype.mapUsingReduce) {
  Array.prototype.mapUsingReduce = function(callback, thisArg) {
    return this.reduce(function(mappedArray, currentValue, index, array) {
      mappedArray[index] = callback.call(thisArg, currentValue, index, array)
      return mappedArray
    }, [])
  }
}

[1, 2, , 3].mapUsingReduce(
  (currentValue, index, array) => currentValue + index + array.length
) // [5, 7, , 10]
```

#### 数组reduce方法

reduce的应用

累加数组里的所有值

```javascript
//值数组
var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);// 和为 6

//对象数组
var initialValue = 0;
var sum = [{x: 1}, {x:2}, {x:3}].reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.x;
},initialValue)

console.log(sum) // logs 6
```

计算数组中每个元素出现的次数

```javascript
var names = ['Alice','Bob','Tiff','Alice']

var countNames = name.reduce(function(allNames,name){
  if(name in allNames){
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
},{})
```

按属性对数组中的对象分类

```javascript
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

function groupBy(ObjetcArray,property){
  return ObjectArray.reduce(function(acc,obj){
     var key = obj[property];
     if(!acc[key]){
       acc[key] = [];
     }
    acc[key].push(obj);
  },{})
}
var groupBy(people,age)
```

按顺序执行promise

```javascript 
function p1(a){
   return new Promise((resolve,reject)=>{
       resolve(a * 5);
   })
}

function p2(a){
   return new Promise((resolve,reject)=>{
      resovle(a * 2);
   })
} 

function f3(a){
   return a * 3
}

function p4(a){
   return new Promise((resolve,reject)=>{
    return (a * 4)
   })
}

function runPromiseSequence(arr,input){
   return arr.reduce(
      (promiseChain,currentFunction) => promiseChain.then(currentFunction),
      Promise.resolve(input)
   )
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10)
  .then(console.log);   // 1200
```

功能型函数管道

```javascript
// Building-blocks to use for composition
const double = x => x + x;
const triple = x => 3 * x;
const quadruple = x => 4 * x;

// Function composition enabling pipe functionality
const pipe = (...functions) => input => functions.reduce(
    (acc, fn) => fn(acc),
    input
);

// Composed functions for multiplication of specific values
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

// Usage
multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240
```

#### 手写数组flat方法

数组拍平方法 `Array.prototype.flat()` 也叫数组扁平化、数组拉平、数组降维。

```js
Array.prototype.flat = function () {
    var temp = []
    function recurision (arr) {
        for (var i = 0; i < arr.length; i++) {
            let item = arr[i]
            if (Array.isArray(item)) {
                recurision(item)
            } else {
                temp.push(item)
            }
        }
    }
    recurision(this)
    return temp
}
```

二维数组降维

```javascript
var flattened = [[0,1],[2,3],[4,5],[6,7]].reduce(
    function(a,b){
      return a.concat(b)
    },
    []
)
```

#### ES6、ES5数组去重

利用ES6:

set类型是不重复的空数组,将array转成set再转成array就行。

```javascript
function unique (arr) {
  return Array.from(new Set(arr))
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
```

双循环

```javascript
function unique(arr){            
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i]==arr[j]){         //第一个等同于第二个，splice方法删除第二个
                    arr.splice(j,1);
                    j--;
                }
            }
        }
return arr;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
    console.log(unique(arr))
```

建立一个空数组，利用indexof判断空数组中是否有元素，没有则逐项添加，最后返回新数组

```javascript
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array .indexOf(arr[i]) === -1) {
            array .push(arr[i])
        }
    }
    return array;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
```

利用array.reduce去重

```javascript
let myArray = ['a','a','b','b','c','c','e','d','d','d','d','d']
let MyOrderedArray = myArray.reduce(function(accumulator,currentValue){
  if(accumulator.indexOf(currentValue)=== -1){
    accumulator.push(currentValue);
  }
  return accumulator
},[])

console.log(myOrderedArray)
```

`

```javascript
let arr = [1,1,2,3,4,2,3,5,5,5]
let result = arr.sort().reduce((init,current)=>{
  if(init.length === 0 ||init[init.length-1] !== current){
     init.push(current);
  }
  return init;
},[])
console.log(result)
```



#### 函数柯里化

把接收多个参数的函数转换为接收单一参数的函数

```javascript
//普通函数
var add = function(x,y){
  return x+y
}
add(3,4)
let addCurry = curry(add)
//柯里化之后
var foo = function(x){
  return function(y){
     return x+y
  }
}
foo(3)(4)
```

函数科里化实现

```javascript
function curry(fn) {
  let judge = (...args) => {
    if (args.length == fn.length) return fn(...args)
    return (...args) => judge (...args, ...arg)
  }
  return judge
}
```



#### 偏函数

偏函数是将n个参数的函数转换为固定x个参数的函数，剩余n-x个参数将在下次调用全部传入.

偏函数和函数科里化有点像，所以根据函数科里化的实现可以写出偏函数的实现

```javascript
function partial(fn, ...args) {
  return (...arg) => {
    args[index] = 
      return fn(...args, ...arg)
  }
}
```



#### 遍历深层次对象

给定一个对象，用给定str去遍历

```javascript
const obj = {
   a:{
      b:{
        c:666
      }
   }
}

var str = 'a.b.c'

const getData = (obj,str)=>{
  str.split('.').forEach(element =>{
    obj = obj[element]
  })
  return obj;
}
 console.log(getData(obj,str))
)
```

#### 数字千分位加逗号

正则表达式

```javascript
function　thousands(num){
    num = num.toString();   //将输入的数字转换为字符串

    if(/^-?\d+\.?\d+$/.test(num)){  //判断输入内容是否为整数或小数
        if(/^-?\d+$/.test(num)){    //判断输入内容是否为整数
            num =num + ",00";   //将整数转为精度为2的小数，并将小数点换成逗号
        }else{
            num = num.replace(/\./,',');    //将小数的小数点换成逗号
        }

        while(/\d{4}/.test(num)){ //
            /***
             *判断是否有4个相连的数字，如果有则需要继续拆分，否则结束循环；
             *将4个相连以上的数字分成两组，第一组$1是前面所有的数字（负数则有符号），
             *第二组第一个逗号及其前面3个相连的数字；
             * 将第二组内容替换为“,3个相连的数字，”
             ***/
            num = num.replace(/(\d+)(\d{3}\,)/,'$1,$2');
        }

        num = num.replace(/\,(\d*)$/,'.$1');   //将最后一个逗号换成小数点
    }
}
```



#### ES6语法转ES5语法的实现

ES6 转 ES5 目前行业标配是用 `Babel`，转换思路为：

1.把代码字符串解析成AST（Abstract Syntax Tree，抽象语法树）

2.AST就是一个json，按照一定规则把这个json里ES6部分的东西转换成ES5的

3.再把修改后的AST转换成代码

举例

```javascript
function hello(a, b, c){ 
}
//解析为抽象语法树
{
  "type": "Program",
  "body": [
    {
      "type": "FunctionDeclaration",
      "id": {
        "type": "Identifier",
        "name": "hello"
      },
      "params": [
        {
          "type": "Identifier",
          "name": "a"
        },
        {
          "type": "Identifier",
          "name": "b"
        },
        {
          "type": "Identifier",
          "name": "c"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "body": []
      },
      "generator": false,
      "expression": false,
      "async": false
    }
  ],
  "sourceType": "script"
}
```

有了这个json后，就可以对代码进行操作了。在没有树的情况下，如果要对文件里的某一个语句进行替换的话，一般就是全局
搜索然后replace，这样有可能影响到别的代码，但是有了树后，就可以对这个json进行操作，精确地去修改某个对象的属性，也就不会影响到别的代码了。所以babel转换ES6的核心，就是在ast中按照一定的规则取修改json里的属性和方法，然后再把tree转换成代码

#### let、const、var区别

主要是let和const、let和var区别

let只在声明的代码块里有效，let不允许重复声明，let声明的全局变量不会作为window对象的一个属性

只要使用`let`声明了一个变量，那这个变量就“绑定”到了这个作用域（全局/局部/块级），该变量就不再受外层作用域的影响。如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。这在语法上称为暂时性死区。

var允许重复定义变量，使用`var`声明的全局变量，会被JS自动添加在全局对象`window`上，作为该对象的一个属性。

用`var`声明的变量，会在其作用域中**发生`变量提升`的过程**。变量会被提升到作用域顶部，JS默认给变量一个`undefined`值。在使用`var`声明一个变量前访问它，得到的值永远是`undefined`。

const声明值时必须初始化值且不可修改，为常量，const不允许重复声明

实例

```javascript
//题1
function sayHi(){
  console.log(name);
  console.log(age);
  var age = 21;
  var name = "lila"
}
sayHi();

//题2
for (var i=0;i<3;i++){
   setTimeout(()=>console.log(i),1);
}

for (let i=0;i<3;i++){
   setTimeout(()=>console.log(i),1);
}
//题1输出：undefined 和 refence error。var的变量会在创建阶段就被设置好，但是定义语句在console之后，因此为undefined；
//let和const不会被初始化，因此会出现暂时性死区，因此会抛出一个reference error的错误
//题2输出：3 3 3 和 0 1 2
```



#### js实现红绿灯

使用setTimeout、Promise、async await 三种方式实现红绿灯代码，红灯2秒，黄灯1秒，绿灯3秒，循环改变颜色。改变颜色的方法，就简单写成打印出颜色。

```javascript
function changeColor(color) {
	console.log('traffic-light ', color);
}
function main() {
	changeColor('red');
	setTimeout(()=>{
		changeColor('yellow');
		setTimeout(() => {
			changeColor('green');
			setTimeout(main, 2000);
		}, 1000);
	}, 2000);
}
main();
```

Async await实现

```javascript
function sleep(duration) {
	return new Promise(resolve => {
		setTimeout(resolve, duration);
	})
}
async function changeColor(color, duration) {
	console.log('traffic-light ', color);
	await sleep(duration);
}
async function main() {
	while (true) {
		await changeColor('red', 2000);
		await changeColor('yellow', 1000);
		await changeColor('green', 3000);
	}
}
main();
```

使用Promise，把下一次的颜色改变写在then里面，最后同样使用递归完成循环。

```javascript
function sleep(duration){
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}
function changeColor(duration,color){
    return new Promise(resolve => {
		console.log('traffic-light ', color);
    	sleep(duration).then(resolve);
	})
}
function main() {
	return new Promise(resolve => {
		changeColor(2000, 'red').then(() => {
			changeColor(1000, 'yellow').then(() => {
				changeColor(3000, 'green').then(() => {
					main();
				})
			})
		})
	})
}
main();
```

#### 实现解析url

```javascript
const url = "https://shanyue.tech?a=3&b=4&c=5"

//解析后得到对象
const qs = {
  a:3;
  b:4;
  c:5;
}
```

实例.用正则表达式获取query部分，然后用split分割&、=，获取key、value，同一个key出现多次则设为数组。

```javascript
function parse(url){
  //夹在？和#之间的就是querystring，使用正则表达式匹配/\?([^/?#:]+)?/
  const queryString = url.match(/\?([^/?#:]+)?/)?.[1]
  
  if(!queryString) {
    return {}
  }
  
  queryObj = queryString.split('&').reduce((params,block)=>{
    const [_k,_v='']=block.split('=')
    
    const k = decodeURIComponent(_k);
    const v = decodeURIComponent(_v);
    if(params[k] !== undefined){
      //如果同一个key出现多次设为数组
      params[k] = [].concat(params[k],v);
    }else{
      params[k] = v
    }
    return params
  },{})
  return queryObj
}
```

#### 手写evenbus

```javascript
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }
}

// 触发名为type的事件
EventEmeitter.prototype.emit = function(type, ...args) {
  let handler;
  // 从储存事件键值对的this._events中获取对应事件回调函数
  handler = this._events.get(type);
  if (args.length > 0) {
    handler.apply(this, args);
  } else {
    handler.call(this);
  }
  return true;
};

// 监听名为type的事件
EventEmeitter.prototype.addListener = function(type, fn) {
  // 将type事件以及对应的fn函数放入this._events中储存
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
};

// 实例化
const emitter = new EventEmeitter();

// 监听一个名为arson的事件对应一个回调函数
emitter.addListener('arson', man => {
  console.log(`expel ${man}`);
});

// 我们触发arson事件,发现回调成功执行
emitter.emit('arson', 'low-end'); // expel low-end
```

https://juejin.cn/post/6844903587043082247

简易版

```javascript
type Event = (data?: any) => any

class EventHub {
    // cache用于存储事件，存储中心
    cache: { [key: string]: Event[] } = {}

    // 接收事件名和事件，同时将其放入到存储中心
    on = (name: string, fn: Event) => {
        this.cache[name] = this.cache[name] || []
        this.cache[name].push(fn)
    }

    // 被订阅的时候，将存储中心对应事件名的所有事件拿出来执行
    emit = (name: string, data?: any) => {
        if(this.cache[name] === undefined) return
        this.cache[name].forEach(fn => {
            fn(data)
        })
    }

    // 取消事件的时候，将被取消的事件从对应事件名中剔除
    off = (name: string, fn: Event) => {
        if(this.cache[name] === undefined) return
        this.cache[name] = this.cache[name].filter(f => f !== fn)
    }
}
```

测试

```javascript
import EventHub from './index'

const eventHub = new EventHub()

const f1=(s)=>{
  console.log("被调用"，s)
}

eventHub.on('xxx',f1)
eventHub.emit('xxx',)
eventHub.off('xxx',f1)
```



#### js继承

原型式继承

实例

```javascript
function Person(name){
  this.name = name;
  this.className = "person"
}
Person.prototype.getClassName = function(){
  console.log(this.className)
}
function Man(){
}
Man.prototype = new Person();
var man = new Man;
```

组合继承

实例

```javascript
function Person(name){
  this.name = name || "default name";
  this.className = "person"
}
Person.prototype.getName = function(){
  console.log(this.name)
}
function Man(name){
  Person.apply(this,arguments)
}
Man.prototype = new Person();
var man1 = new Man("Davin")
```

寄生式继承

寄生式继承是指创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来增强对象，最后再像真的做了所有事情一样返回对象

```javascript

```



寄生组合（分离组合）式继承

通过借用构造函数来继承属性，通过原型链的混成形式继承方法

```javascript
function Person(name){
  this.name = name;
  this.className = 'person'
}
Person.prototype.getName = function(){
  console.log(this.name)
}
function Man(name){
  Person.apply(this.arguments)
}
Man.prototype = Object.create(Person.prototype)
var man1 = new Man("Davin")
```

#### 将二维数组转换为树结构

```javascript
function arrToTreeArr(arr = []){
  let map = new Map();
  for(let i = 0;i<arr.length;i++){
    for(let j = 0;j<arr[i];j++){
      let name = arr[i][j]
      let isRoot = j == 0;
      let hasItem = map.has(name);
      
      if(!hasItem){
        map.set(name,{name,child:[],isRoot })
      }
      
      if(!isRoot && !hasItem){
        let item = map.get(name)
        let pName = arr[i][j-1]
        map.get(pName).child.push(item)
      }
     }
  }
  return [...map.values()].filter(item => item.isRoot)
}

arrToTreeArr(arr)
```

另一个方法

```javascript
function toTree(arr){
  const obj = {};
  const res = [];
  for (let i = 0;i<arr.length;i++){
    for(let j = 0;j<arr[i].length;j++){
      const item = arr[i][j];
      if(!obj[item]){
         obj[item] = {
           name:item,
           child:[]
         }
      }
      if(j>0){
        const parent = obj[arr[i][j-1]];
        if(parent){
           if(parent.child.indexOf(obj[item])<0){
              parent.child.push(obj[item]);
           }
        }
      }else{
        if(res.indexOf(obj[item])<0){
           res.push(obj[item]);
        }
      }
    }
  }
  return res;
} 
```




