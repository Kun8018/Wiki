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

#### Promise、Promise.all实现原理、手写promise、promise.all

- 适合多个异步调用函数，并且多个异步函数的调用的入参和结果都无必然联系，比如多个文件的上传或下载。
- 多个异步函数的执行只关注成功或失败结果。

- Promise.all是挂载到Promise类实例上
- 返回的是一个Promise
- 需要遍历入参数组中的每一项，判断传入的是不是promise，如果是promise则执行then方法，然后将then方法中的成功回调的data返回，失败则reject
- 如果入参数组中有基本数值，则直接返回
- 通过计数器，来判断函数的执行结果

手写promise

```javascript
function Promise(fn){
  var state = PENDING;  //初始化state为pending，进行中
  
  //状态为成功时执行
  function fullfill(result){
    state = FuLFILLED; 
    value = result;
    handlers.forEach(handle);
    handlers = null;
  }
  //状态为失败时执行
  function reject(error){
    state = REJECTED;
    value = error;
    handlers.forEach(handle);
    handlers = null;
  }
  //resolve方法
  function resolve(result){
    try {
      var then = getThen(result);
      if(then){
        doResolve(then.bind(result),resolve,reject)
        return;
      }
      fulfill(result);
    } catch(e){
      reject(e);
    }
  }
  //.then方法
  this.then = function(onFulfilled,onRejected)z{
    var self = this;
    return new Promise(function(resolve,reject){
      self.done(function(result){
        if(typeof onFullfilled === 'function'){
          try{
            return resolve(onFulfilled(result));
          }catch (ex){
            return reject(ex);
          }
        }else{
            return resolve(result);
        }
      },function(error){
        if(typeof onRejected === 'function'){
          try{
            return resolve(onRejected(error));
          }catch (ex){
            return reject(ex);
          }
        } else{
          return reject(es);
        }
      });
    });
  }
  //.catch方法
  this.catch = function(errorHandle){
    return this.then(null,errorHandle);
  }
}
```

手写promise.all

```javascript
Promise.all = function(iterator){
   let count = 0
   let len = iterator.length
   let res = []
   return new Promise((resolve,reject)=>{
      for(let i in iterator){
        Promise.resolve(iterator[i])
        .then((data)=>{
          res[i] = data;
          if(++count === len){
            resolve(res)
          }
        })
        .catch(e=>{
          reject(e)
        })
      }
   })
}
```

手写promise.race

```javascript
Promise.race = function(iterators){
  return new Promise((resolve,reject)=>{
    for (const p of iterators){
      Promise.resolve(p)
      .then((res)=>{
         resolve(res)
      })
      .catch(e=>{
         reject(e)
      })
    }
  })
}
```

手写promise.any

```javascript
Promise.any = function(iterators) {
  const promises = Array.from(iterators);
  const num = promises.length;
  const rejectedList = new Array(num);
  let rejectedNum = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => resolve(value))
        .catch(error => {
          rejectedList[index] = error;
          if (++rejectedNum === num) {
            reject(rejectedList);
          }
        });
    });
  });
};
```

手写promise.allsettled

```javascript
const formatSettledResult = (success, value) =>
  success
    ? { status: "fulfilled", value }
    : { status: "rejected", reason: value };

Promise.allSettled = function(iterators) {
  const promises = Array.from(iterators);
  const num = promises.length;
  const settledList = new Array(num);
  let settledNum = 0;

  return new Promise(resolve => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          settledList[index] = formatSettledResult(true, value);
          if (++settledNum === num) {
            resolve(settledList);
          }
        })
        .catch(error => {
          settledList[index] = formatSettledResult(false, error);
          if (++settledNum === num) {
            resolve(settledList);
          }
        });
    });
  });
};
```



#### Promise并发限制

使用promise.all能够确保所有调用的promise对象全部达到resolve状态执行then回调。

但是如果请求的promise对象太多，瞬间发出很多http请求，tcp连接数不足可能造成等待，或者堆积了无数调用栈导致内存溢出。

此时就对http连接数进行限制。

```javascript
function loadImg (url){
  return new Promise((resolve,reject)=>{
      const img = new Image();
      img.onload = function(){
        console.log("加载完成")，
        resolve();
      }
      img.onerror = reject;
      img.src = url;
  })
}

function limitload(urls, handler,limit){
     const sequence = [].concat(urls);
     let promises = [];
    
     //添加并发，使得并发数达到最大
      promises = sequence.splice(0,limit).map((url,index)=>{
          return handler(url).then(()=>{
              return index
          })
      })
       
      (async function loop(){
        let p = Promise.race(promises);
        for(let i = 0;i< sequence.length;i++){
          p = p.then((res)=>{
            promises[res] = handler(sequence[i]).then(()=>{
                return res
            })
            return Promise.race(promises);
          })
        }
      })
}

limitLoad(urls,loadImg,3);
```

项目中也可以直接使用npm包，比如async-pool,es6-promise-pool,p-limit。

#### 实现一个lazy_man

题目：

实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
以此类推。

考察知识点：**闭包**，**事件轮询机制**，**链式调用**，**队列**,ES6实现方式

```javascript
class _LazyMan {
  constructor(name) {
    this.tasks = [];
    const task = () => {
      console.log(`Hi! This is ${name}`);
      this.next();
    }
    this.tasks.push(task);
    setTimeout(() => {               // 把 this.next() 放到调用栈清空之后执行
      this.next();
    }, 0);
  }

  next() {
    const task = this.tasks.shift(); // 取第一个任务执行
    task && task();
  }

  sleep(time) {
    this._sleepWrapper(time, false);
    return this;                     // 链式调用
  }

  sleepFirst(time) {
    this._sleepWrapper(time, true);
    return this;
  }

  _sleepWrapper(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time * 1000)
    }
    if (first) {
      this.tasks.unshift(task);     // 放到任务队列顶部
    } else {
      this.tasks.push(task);        // 放到任务队列尾部
    }
  }

  eat(name) {
    const task = () => {
      console.log(`Eat ${name}`);
      this.next();
    }
    this.tasks.push(task);
    return this;
  }
}

function LazyMan(name) {
  return new _LazyMan(name);
}
```

如果用 ES5 来写要在维护 `this` 方面多写一些代码。

#### js队列实现

基本队列、优先队列和循环队列

基本队列的六个方法：

 ①向队列（尾部）中添加元素（enqueue）、②（从队列头部）删除元素（dequeue）、③查看队列头部的元素（front）、④查看队列是否为空（isEmpty）、⑤查看队列的长度（size）、⑥查看队列（print） 等 6 个方法

```javascript
function Queue() {
        //初始化队列（使用数组实现）
        var items = [];

        //向队列（尾部）中插入元素
        this.enqueue = function(element) {
            items.push(element);
        }

        //从队列（头部）中弹出一个元素，并返回该元素
        this.dequeue = function() {
            return items.shift();
        }

        //查看队列最前面的元素（数组中索引为0的元素）
        this.front = function() {
            return items[0];
        }

        //查看队列是否为空，如果为空，返回true；否则返回false
        this.isEmpty = function() {
            return items.length == 0;
        }

        //查看队列的长度
        this.size = function() {
            return items.length;
        }

        //查看队列
        this.print = function() {
            //以字符串形势返回
            return items.toString();
        }
    }
```

优先队列

在优先队列中，元素的添加或者删除是基于优先级的。实现优先队列有两种方式：①优先添加，正常出列；②正常添加，优先出列、

优先添加，正常出列的例子

```javascript
function PriorityQueue() {
        var items = [];
        //需要插入队列的元素（该元素为对象，包括值和优先级）
        function QueueElement(element, priority) {
            this.element = element;
            this.priority = priority;
        }

        //插入元素到队列中的方法
        this.enqueue = function (element, priority) {
            //需要插入队列的元素
            var queueElement = new QueueElement(element, priority);

            if(this.isEmpty()) {
                //当队列为空时，直接往队列中添加元素
                items.push(queueElement);
            }else{
                //当队列不为空时，遍历队列中的元素，当需要添加的元素的优先级小于（队列中）当前元素的优先级，就把该元素插入到当前元素之前
                var added = false;
                for(var i = 0; i < items.length; i++){
                    if(queueElement.priority < items[i].priority) {
                        items.splice(i, 0, queueElement);
                        added = true;
                        break;//终止队列循环
                    }
                }
                //当需要添加的元素的优先级比队列中任何一个元素的优先级都要高时，把该元素插入到队列的末尾
                if(!added){
                    items.push(queueElement);
                }
            }
        }

        //查看队列是否为空，如果为空，返回true；否则返回false
        this.isEmpty = function() {
            return items.length == 0;
        }    

        //查看队列
        this.print = function() {
            return items;
        }        
    }

    var priorityQueue = new PriorityQueue();
```

循环队列的经典问题：

约瑟夫环问题：

一群孩子围成一圈，每次传递 n 个数，停下来时手里拿花的孩子被淘汰，直到队伍中只剩下一个孩子，即胜利者。

循环队列，每次循环的时候（从队列头部）弹出一个孩子，再把这个孩子加入到队列的尾部，循环 n 次，循环停止时弹出队列头部的孩子（被淘汰），直到队列中只剩下一个孩子。

基于基本队列实现循环队列

```javascript
//循环队列
    //@param Obj nameList 名单
    //@param Int num 指定的传递次数
    function hotPotato(nameList, num) {

        var queue = new Queue();

        //把名单插入队列
        for(var i = 0; i < nameList.length; i++) {
            queue.enqueue(nameList[i]);
        }

        //淘汰者的名字初始值
        var eliminated = '';

        //当队列里的人数大于1人时，继续传递
        while(queue.size() > 1) {
            for(var i = 0; i < num; i++) {
                //每次把队列头部弹出的队员再次插入队列的尾部，行程一个循环队列
                queue.enqueue(queue.dequeue());
            }
            //当循环停止时，即到了指定的传递次数时，弹出队列头部的队员
            eliminated = queue.dequeue();
            console.log(eliminated + '被淘汰');
        }

        //当队列中只剩下一个队员时，即是胜利者
        return queue.dequeue();
    }

    var names = ['dee', 'death mask', 'saga', 'mu', 'alexis'];
    var winner = hotPotato(names, 7);
    console.log('胜利者是' + winner);
```

#### 基于generator实现async/await

```javascript
function asyncToGenerator(generatorFunc) {
    return function() {
      const gen = generatorFunc.apply(this, arguments)
      return new Promise((resolve, reject) => {
        function step(key, arg) {
          let generatorResult
          try {
            generatorResult = gen[key](arg)
          } catch (error) {
            return reject(error)
          }
          const { value, done } = generatorResult
          if (done) {
            return resolve(value)
          } else {
            return Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
          }
        }
        step("next")
      })
    }
}
```

#### 版本排序

```javascript
function sortVersion(versions) {
	if (!versions || !versions.length) return [];
	const result = versions.sort((a, b) => {
		const arrA = a.split('.'), arrB = b.split('.');
		const length = Math.max(a.length, b.length);
		for (let i = 0; i < length; i++) {
			const x = Number(arrA[i] || 0);
			const y = Number(arrB[i] || 0);
			if (x - y !== 0) return x - y;
		}
	});
	return result;
}
```

#### 大数相加

补0

```javascript
function add(str1,str2){
  let maxLength = Math.max(str1.length,str2.length);
  var a = str1.padStart(maxLength,0);
  var b = str2.padStart(maxLength,0);
  
  let t = 0;
  let f = 0;
  let sum = '';
  for (let i = maxLength -1;i >= 0;i--){
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(t / 10);
    sum = t % 10 + sum;
  }
  if(f == 1){
    sum = "1" + sum;
  }
  return sum
}
```



#### json下划线与驼峰格式切换格式

```javascript
// 字符串的下划线格式转驼峰格式，eg：hello_world => helloWorld
function underline2Hump(s) {
  return s.replace(/_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}

// 字符串的驼峰格式转下划线格式，eg：helloWorld => hello_world
function hump2Underline(s) {
  return s.replace(/([A-Z])/g, '_$1').toLowerCase()
}

// JSON对象的key值转换为驼峰式
obj = JSONparse（ojb）
function jsonToHump(obj) {
  if (obj instanceof Array) {
    obj.forEach(function(v, i) {
      jsonToHump(v)
    })
  } else if (obj instanceof Object) {
    Object.keys(obj).forEach(function(key) {
      var newKey = underline2Hump(key)
      if (newKey !== key) {
        obj[newKey] = obj[key]
        delete obj[key]
      }
      jsonToHump(obj[newKey])
    })
  }
}

// JSON对象的key值转换为下划线格式
function jsonToUnderline(obj) {
  if (obj instanceof Array) {
    obj.forEach(function(v, i) {
      jsonToUnderline(v)
    })
  } else if (obj instanceof Object) {
    Object.keys(obj).forEach(function(key) {
      var newKey = hump2Underline(key)
      if (newKey !== key) {
        obj[newKey] = obj[key]
        delete obj[key]
      }
      jsonToUnderline(obj[newKey])
    })
  }
}
```



#### 预定问题

选择最低价格预定，如果价格相同，优先选择时间

```javascript
const firstbook = [
  {
    name: 'a'
    time: '08:00'
  },
  {
    name: 'b',
    time: '12:15'
  }
]

const secondbook = [
  {
    name: 'c',
    time: '12:00'
  },
  {
    name: 'd',
    time: '15:25'
  }
]

const bookprice = {
  'man': {
    'normal':{
			'a': 1,
      'b': 2,
      'c': 3,
      'd': 4,
    },
    'vip': {
      'a': 2,
      'b': 1,
      'c': 3,
      'd': 4,
    }
  },
  'woman': {
    'normal':{
			'a': 1,
      'b': 2,
      'c': 3,
      'd': 4,
    },
    'vip': {
      'a': 2,
      'b': 1,
      'c': 3,
      'd': 4,
    }
  }
}

function judgeDatetype(date) {
  if(date == 'SUN' || date == 'SAT'){
    return 'WEEKENDS'
  }else {
    return 'WEEKDAYS'
  }
}

function durationTotime(clock,standard) {
  const clockarray = clock.split(':')
  const standardarray = standard.split(':')
  moment.duration('01:01:01').as('seconds')
  moment({h:hours, m:minutes, s:seconds}).format('HH:mm:ss')
  return Math.abs(new Date().setUTCHours(clockarray[0],clockarray[1]) - new Date().setUTCHours(standardarray[0],standardarray[1]))/1000;
}

function sorted(array) {
  return array.sort(function(a,b){
    if(a.price != b.price) {
      return a.price - b.price
    }else {
      return a.duration - b.duration
    }
  })
}

function bestbook(type,time,book) {
  const date = time.slice(0,8)
  const dateType = judgeDateType(time.replace(date,''))
  
  book.forEach(element => {
		element.duration = durationTotime(element.time,'12:00')
    element.price = bookprice[type][dateType][element.name]
  })
  
  return sorted(book)
}

function bookPlan(type,gotime,backtime) {
  const sortedgobook = bestbook(type,gotime,firstbook);
  const sortedbackbook = bestbook(type,backtime,secondbook);
  
  console.log(sortedgobook[0].name)
  console.log(sortedbackbook[0].name)
  return [sortedgobook[0].name,sortedbackbook[0].name]
}

function isDuplicate(array){
  const set = new Set(array)
  return set.size !== array.length
}

function findKey(obj,value, compare= (a,b) => a === b){
  return Object.keys(obj).find(k => compare(obj[k],value))
}
```

#### 两数平均值（无穷大）

```javascript
x&y+(x^y)>>1；
```



#### 数组根据某属性去重

```javascript
function arrayUnique(arr,property) {
	let hash = {};
  return arr.reduce(function (item,next) {
		hash[next[property]]? '':hash[next[property]] = true && item.push(next);
    return item;
  },[]);
}
```



#### object-fit各属性实现

object-fit总共有fill、contain、cover、none、scale-down五种方式

```javascript
function cover(containerSize, elementSize) {
  const containerRatio = containerSize.width / containerSize.height;
  const elementRatio = elementSize.width / elementSize.height;
  
  let width, height 
  
  if(containerRatio > elementRatio) {
    width = containerSize.width;
    height = containerSize.width / elementRadio
  } else {
    width = containerSize.height * elementRadio;
    height = containerSize.height;
  }
  
  return { width, height }
}

function contain(containerSize, elementSize) {
  const containerRatio = containerSize.width / containerSize.height;
  const elementRatio = elementSize.width / elementSize.height;
  
  let width, height
  
  if(containerRatio > elementRatio) {
    width = containerSize.width;
    height = containerSize.width / elementRadio
  } else {
    width = containerSize.height * elementRadio;
    height = containerSize.height;
  }
  
  return { width, height }
}

function fill(containerSize) {
  return containerSize
}

function none(elementSize) {
  return elementSize
}

function scaleDown(containerSize, elementSize) {
  if(elementSize.width > containerSize.width || elementSize.height > containerSize.height) {
    return contain(containerSize, elementSize)
  } else {
    return none(containerSize)
  }
}
```

Https://xiaojun1994.top/posts/a97a42fc.html

#### js执行计算密集型任务

根据w3c性能小组，超过50ms的任务就是长任务

由于js是单线程运行，并且js引擎与UI渲染引擎互斥，所以在运行计算密集型任务时，容易造成页面假死的状态。虽然我们可以将任务放到任务队列中，通过异步的方式执行，但这并不能改变js执行时的本质

为了改变这种问题，可以使用一些手段避免

1.使用web-worker执行

2.使用时间分片进行任务分割

时间分片的核心思想是，如果任务不能在不影响用户体验的时间内执行完成，为了不阻塞主线程，这个任务应该让出主线程的控制权，以使浏览器可以处理其他任务，让出控制权意味着停止执行当前任务，让浏览器执行其他任务，随后再回来执行没有执行完的任务。

所以时间分片的目的是为了不阻塞主线程，而实现目的的技术手段是将任务拆分为很多个不超过50ms的小任务分散在宏任务队列中执行

使用requestAnimationFrame和requestIdleCallback。由系统本身去调度异步执行

3.大量渲染DOM使用documentFragments

#### 图片懒加载

```javascript
let imgList = [...document.querySelectorAll('img')];
let length = imgList.length

const imgLazyLoad = (function() {
	let count = 0;
  
  return 
})
```

#### js实现LRU

数组实现

```javascript
let LRU = function(capacity){
  this.capacity = capacity;
  this.cache = [];
}

LRU.prototype.get = function(key) {
	let index = this.cache.findIndex((item) => item.key === key);
  if(key === -1){
    return -1;
  }
  let value = this.cache[index].value;
  this.cache.splice(index,1);
  this.cache.unshift({
    key,
    value,
  });
  return value;
}

LRU.prototype.put = function(key,value){
	let index = this.cache.findIndex((item) => item.key === key);
  if(index>-1){
    this.cache.splice(index,1)
  }else if(this.cache.length >= this.capacity){
    this.cache.pop()
  }
  this.cache.unshift({key, value})
}
```

map数据结构实现

```javascript
// 上述代码来自 LRU 缓存机制-官方
// 时间复杂度 O(1)，因为 Map 既能保持键值对，还能记住插入顺序。
var LRUCache = function (capacity) {
  this.cache = new Map();
  this.capacity = capacity;
};

LRUCache.prototype.get = function (key) {
  if (this.cache.has(key)) {
    // 存在即更新
    let temp = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, temp);
    return temp;
  }
  return -1;
};

LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    // 存在即更新（删除后加入）
    this.cache.delete(key);
  } else if (this.cache.size >= this.capacity) {
    // 不存在即加入
    // 缓存超过最大值，则移除最近没有使用的
    // new Map().keys() 返回一个新的 Iterator 对象
    this.cache.delete(this.cache.keys().next().value);
  }
  this.cache.set(key, value);
};
```

#### js实现正则表达式通配符





