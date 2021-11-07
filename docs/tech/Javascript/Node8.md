---
title: NodeJs开发（二） 
date: 2021-01-21 21:40:33
categories: IT
tags: IT，Web
toc: true
thumbnail: http://cdn.kunkunzhang.top/typescript.jpg
---

万万没想到会来到第七篇，第七篇写TypeScript，算是加成。

<!--more-->

## Typescript

Typescript是JavaScript的超集，主要提供了**类型系统**和**对 ES6 的支持**，它由 Microsoft 开发，代码[开源于 GitHub](https://github.com/Microsoft/TypeScript) 上。

Typescript的优势：

Typescript增加了代码的可读性。

- 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
- 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
- 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等

TypeScript 非常包容

- TypeScript 是 JavaScript 的超集，`.js` 文件可以直接重命名为 `.ts` 即可
- 即使不显式的定义类型，也能够自动做出[类型推论](https://ts.xcatliu.com/basics/type-inference.html)
- 可以定义从简单到复杂的几乎一切类型
- 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
- 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取

Typescript的劣势：

- 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
- 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
- 集成到构建流程需要一些工作量
- 可能和一些库结合的不是很完美

### 安装和使用

使用typescript编写的文件以ts为文件后缀，用typescript编写react时以tsx为文件后缀。

安装typescript的命令行工具

```shell
npm install -g typescript
```

以上命令会在全局环境下安装tsc命令，安装完成后可以在任何地方执行tsc命令

编译typescript文件

```shell
tsc hello.ts
```

如果想要用typescript写node文件，则需要引入第三方声明文件：

```shell
npm install @types/node --save-dev
```

简单的编译示例：

hello.ts

```typescript
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

执行

```shell
tsc hello.ts
```

编译生成的hello.js文件

```javascript
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```

typeScript 中，使用 `:` 指定变量的类型，`:` 的前后有没有空格都可以。

### 模块@types

[DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) 是 TypeScript 最大的优势之一，社区已经记录了 90% 的顶级 JavaScript 库。你可以非常高效地使用这些库，而无须在单独的窗口打开相应文档以确保输入的正确性。

你可以通过 `npm` 来安装使用 `@types`，例如为 `jquery` 添加声明文件：

```shell
npm install @types/jquery --save-dev
```

安装完之后，不需要特别的配置，你就可以像使用模块一样使用它：

```ts
import * as $ from 'jquery';

// 现在你可以此模块中任意使用$了 :)
```

### 编译上下文tsconfig.json

编译上下文算是一个比较花哨的术语，可以用它来给文件分组，告诉 TypeScript 哪些文件是有效的，哪些是无效的。除了有效文件所携带信息外，编译上下文还包含有正在被使用的编译选项的信息。定义这种逻辑分组，一个比较好的方式是使用 `tsconfig.json` 文件。

在项目的根目录下创建一个空 JSON 文件。通过这种方式，TypeScript 将 会把此目录和子目录下的所有 .ts 文件作为编译上下文的一部分，它还会包含一部分默认的编译选项。

你可以通过 `compilerOptions` 来定制你的编译选项：

```javascript
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                // 启用所有严格类型检查选项
    "noImplicitAny": true,         // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,      // 启用严格的 null 检查
    "noImplicitThis": true,        // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,            // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,        // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,         // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,// 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",               // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                  // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,          // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,            // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```

### 数据类型与对象类型

typescript包含javascript的五种基本数据类型和ES6中声明的symbol，唯一的区别是在声明变量时需指明变量类型。

除此之外，typescript有新添加的类型

#### 字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个。

```typescript
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'

// index.ts(7,47): error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.
```

#### 任意类型

任意值（Any）用来表示允许赋值为任意类型。如果是 `any` 类型，则允许被赋值为任意类型。

```typescript
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```

在任意值上访问任何属性都是允许的.如果变量在声明时未指定其类型，则被识别为任意类型。

#### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

上面的代码将myFavoriteNumber定义为字符串或者数值型，在不同的语句可以切换不同的类型，但不允许是定义以外的类型。

联合类型使用 `|` 分隔每个类型。当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型,并使用该类型

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

#### 交叉类型

交叉类型可以把现有的类型组合起来得到新的类型，从而拥有全部的属性，表示为A & B

实例

```typescript
interface IPerson {
  name: string;
  age:number;
}

interface IStudent {
  grade:number;
}

const getBio = (user:IPerson & IStudent) =>{
  return `His name is ${user.name},i am ${user.age} and Grade ${user.grade}` 
}

getBio({name:'joi',age:12,grade:6})
```

交叉类型是两个类型的并集

#### 条件类型

条件类型指的是



类型别名

类型别名用来给一个类型起个新名字，常用于联合类型

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

类型断言

类型断言可以

- 联合类型可以被断言为其中一个类型
- 父类可以被断言为子类
- 任何类型都可以被断言为 any
- any 可以被断言为任何类型

要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可

类型推论

如果定义的时候有赋值，typescript会自动推测出一个类型；

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查;

```typescript
//定义时有赋值，自动推测出类型，之后赋值为别的类型会报错
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
//定义时无赋值，类型为any，不会报错
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```



### 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```typescript
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```

在函数名后添加 `<T>`，其中 `T` 用来指代任意输入的类型，然后在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。

接着在调用的时候，可以指定它具体的类型为 `string`。或者也可以不手动指定，而让类型推论自动推算出来

也可以指定泛型的默认类型，这样如果调用时没用指定类型，则使用默认类型

```typescript
//在function中指定默认类型，在调用时没有指定的话即为默认类型
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray(3, 'x'); // ['x', 'x', 'x']
```

定义泛型时，也可以一次定义多个泛型类型参数，

```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

虽然泛型没有指定数据结构，但是可以通过接口规定泛型的属性和方法，传入参数时进行属性校验，在内部操作时也可以直接操作属性而不会出现没有属性或者方法报错的情况。此外参数之间也可以互相继承。

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

泛型接口与泛型类

泛型还可以用于定义接口和类

```typescript
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```



### 新增基本类型

元组

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。



枚举

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

never

never是typescript的底层类型，他常用于

1.不会有返回值的函数

2.总是抛出错误的函数

#### never与void、any、unknown的区别：

任意未明确声明类型并切无法推导出类型的值都默认为any类型，any是检测弱，兼容性问题解决方案。

当一个函数返回空值时，它的返回值为 void 类型，但是，当一个函数永不返回时（或者总是抛出错误），它的返回值为 never 类型。

void 类型可以被赋值（在 strictNullChecking 为 false 时），但是除了 never 本身以外，其他任何类型不能赋值给 never。

unknown相对于any，任意类型都可以赋值给unknow，但是不可对其进行任何访问操作（仅仅为类型安全，any操作访问也安全）



### 工具泛型

`keyof` 可以用来取得一个对象接口的所有 `key` 值.in 则可以遍历枚举类型

```typescript
interface Foo {
  name: string;
  age: number
}
type T = keyof Foo // -> "name" | "age"

type Keys = "a" | "b"
type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any }
```

`keyof` 产生联合类型, `in` 则可以遍历枚举类型, 所以他们经常一起使用

#### partial

Partial 作用是将传入的属性变为可选项.
首先我们需要理解两个关键字 `keyof` 和 `in`, `keyof` 可以用来取得一个对象接口的所有 `key` 值.

```typescript
type Partial<T> = { [P in keyof T]?: T[P] };
```

#### required

Required 的作用是将传入的属性变为必选项, 源码如下

```typescript
type Required<T> = { [P in keyof T]-?: T[P] };
```

#### readonly(只读)

typescript类型系统允许在一个接口中使用readonly来标记属性，也就是只读的方式，不可预期的改变是很糟糕的。

可以在接口、类中用此方法定义

```typescript
type Readonly<T> = { readonly [P in keyof T]: T[P] };
```

#### Mutable

将 T 的所有属性的 readonly 移除,

```typescript
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```



#### record

将 K 中所有的属性的值转化为 T 类型

```typescript
type Record<K extends keyof any, T> = { [P in K]: T };
```

#### pick

从 T 中取出 一系列 K 的属性

```typescript
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
```

#### omit

用之前的 Pick 和 Exclude 进行组合, 实现忽略对象某些属性功能, 

```typescript
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

// 使用
type Foo = Omit<{name: string, age: number}, 'name'> // -> { age: number }
```

#### exclude

Exclude 的作用是从 T 中找出 U 中没有的元素, 换种更加贴近语义的说法其实就是从T 中排除 U

```typescript
type T = Exclude<1 | 2, 1 | 3> // -> 2
```

#### extract

Extract 的作用是提取出 T 包含在 U 中的元素, 换种更加贴近语义的说法就是从 T 中提取出 U

```typescript
type Extract<T, U> = T extends U ? T : never;
```

#### infer关键字与Returntype

官方类型库中提供了ReturnType可以获取方法的返回类型，实例

```typescript
type stringPromiseReturnType = ReturnType<typeof stringPromise>;
```

Returntype的定义如下

```typescript
type ReturnType<T extends (...args:any) => any >= T extends(...args:any)=> infer R?R:any;
```

利用infer反解promise中的泛型

```typescript 
type PromiseType<T> = (args:any[]) => Promise<T>;
type UnPromisify<T> = T extends PromiseType<infer U>? U:never
```

也可以解析函数入参的类型

```typescript
type VariadicFn<A extends 
```



```typescript
type FunctionReturnType<T> = T extends (...args: any[]) => infer R ? R : T;

type Foo = FunctionReturnType<() => void>;  // void
type Bar = FunctionReturnType<(name: string) => string>; // string
type Buz = FunctionReturnType<(name: string, other: string) => boolean>; // boolean
```





### 接口

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

接口中可以包含确定属性、可选属性、任意属性、只读属性四种属性

确定属性是指变量由接口生成时，接口中的确定属性不能多，也不能少；

可选属性在接口中规定后，在变量中可以写可以不写；

任意属性是指在接口定义时允许变量自定义属性，这时要在接口中定义任意属性；任意属性的类型必须是确定属性和可选属性的母集，且一个接口只能使用一个任意属性，如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

只读属性是指对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性。

typescript使用接口（Interfaces）来定义对象的类型。接口是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

```typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

上面的代码中，我们定义了一个接口 `Person`，接着定义了一个变量 `tom`，它的类型是 `Person`。这样，我们就约束了 `tom` 的形状必须和接口 `Person` 一致。

一般情况下，定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的，会报错：

```typescript
let tom: Person = {
    name: 'Tom'
};
// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
// index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
```

可以设置可选属性、任意属性、只读属性。

可选属性为接口定义而对象可以不引用，

任意属性是接口不指定而对象可以添加，

只读属性是接口定义后在对象第一次初始化时添加，其后不能更改。

利用可选属性可以进行部分继承

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;  // age为可选属性
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};
```

接口除了定义变量，还可以在类中使用，用来实现类的共性接口



接口可以继承接口，可以继承父接口的所有方法



接口还可以继承类，

#### 接口注意事项

接口(interface)定义了“公共(public)”契约(Contract)，因此在接口(interface)上具有`protected`或`private`访问修饰符没有任何意义，更多的是实现细节

使用read-only访问修饰符

```typescript
interface IModuleMenuItem {
     readonly name : string;
}

class ModuleMenuItem implements IModuleMenuItem {
    public readonly name : string;

    constructor() {
        name = "name";
    }
}
```

#### 接口和类的区别

接口只规定类的形状，也就是类具有哪些属性和方法，不具体实现这些属性和方法

实例

```typescript
interface ContentInterface{
  //定义方法名称和返回类型
  getContent():String;
}
//可以使用不同的方式实现
class Article implements ContentInterface{
   public function getContent():String{
     return 'i am a article'
   }
}

class Passage implements ContentInterface{
   public function getContent():String{
     return 'i am a passage'
   }
}

class News implements ContentInterface{
  //没有实现getContent方法会报错
}

let a = new Article();
let p = new Passage();

print(a)
print(p)
```

### 类class

TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法。

类的相关概念

- 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 `new` 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的 `eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

类的属性和方法



类的继承



TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问，在子类中也是不允许访问的。该类不允许被继承或者实例化：
- `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的，且该类只允许被继承，不能被实例化

`abstract` 用于定义抽象类和其中的抽象方法。抽象类是不允许被实例化的，抽象类中的抽象方法必须被子类实现：



### 声明语句与声明文件、声明合并

假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 `<script>` 标签引入 jQuery，然后就可以使用全局变量 `$` 或 `jQuery` 了。

但是在 ts 中，编译器并不知道 `$` 或 `jQuery` 是什么东西[1](https://github.com/xcatliu/typescript-tutorial/tree/master/examples/declaration-files/01-jquery)：

这时，我们需要使用 `declare var` 来定义它的类型

通常我们会把声明语句放到一个单独的文件（`jQuery.d.ts`）中，这就是声明文件。声明文件必需以 `.d.ts` 为后缀。一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts` 结尾的文件。所以当我们将 `jQuery.d.ts` 放到项目中时，其他所有 `*.ts` 文件就都可以获得 `jQuery` 的类型定义了。

假如仍然无法解析，那么可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件。

TS可以在编译时自动生成.d.ts文件，只需要在tsconfig.json配置文件中开启即可

```json
{
  "compilerOptions": {
    "declaration": true
  }
}
```

一般只有三种情况需要手动定义声明文件：

1.通过script标签引入第三方库

2.使用的第三方npm包没有提供声明文件

3.自己团队内比较优秀的js库或者插件，为了提升开发体验

声明文件只是对类型的定义，不能赋值

如果定义了同名的函数、类、接口，typescript会自动合并。接口的属性和方法都支持合并

```typescript
interface Alarm{
  price: number;
  alert(s:string):string;
};
interface Alarm{
  weight: number;
  alert(s:string,n:number):string;
}
//相当于
interface Alarm{
  price: number;
  alert(s:string):string;
  weight: number;
  alert(s:string,n:number):string;
}
```

合并时属性可以重复，但是不能有冲突，否则会报错。

```typescript
interface Alarm{
  price: number;
};
interface Alarm{
  price: number;//可以
  weight: number;
};
interface Alarm{
  price: string;//报错
}
```

类的合并和接口的合并类似

对于没有提供声明文件的npm包，可以创建一个types目录，来管理自己写的声明文件，同时在配置文件tsconfig.json中的paths和baseUrl配置

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "baseUrl": "./",
    "paths": {"*":["types/*"]}
  }
}
```

npm包的声明文件主要有以下几种语法

```typescript
export const/let
export namespace
export default
export = 
```





### 代码检查

#### Es-lint

安装es-lint

```shell
npm install --save-dev eslint
```

由于 ESLint 默认使用 [Espree](https://github.com/eslint/espree) 进行语法解析，无法识别 TypeScript 的一些语法，故我们需要安装 [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)，替代掉默认的解析器，别忘了同时安装 `typescript`：

```shell
npm install --save-dev typescript @typescript-eslint/parser
```

接下来需要安装对应的插件 [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) 它作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则。

```shell
npm install --save-dev @typescript-eslint/eslint-plugin
```

创建自己的规则

ESLint 需要一个配置文件来决定对哪些规则进行检查，配置文件的名称一般是 `.eslintrc.js` 或 `.eslintrc.json`。

当运行 ESLint 的时候检查一个文件的时候，它会首先尝试读取该文件的目录下的配置文件，然后再一级一级往上查找，将所找到的配置合并起来，作为当前被检查文件的配置。

```javascript
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        // 禁止使用 var
        'no-var': "error",
        // 优先使用 interface 而不是 type
        '@typescript-eslint/consistent-type-definitions': [
            "error",
            "interface"
        ]
    }
}
```

执行检查

我们的项目源文件一般是放在 `src` 目录下，所以需要将 `package.json` 中的 `eslint` 脚本改为对一个目录进行检查。由于 `eslint` 默认不会检查 `.ts` 后缀的文件，所以需要加上参数 `--ext .ts`：

```javascript
{
    "scripts": {
        "eslint": "eslint src --ext .ts"
    }
}
```

此时执行 `npm run eslint` 即会检查 `src` 目录下的所有 `.ts` 后缀的文件。

在 VSCode 中集成 ESLint 检查[§](https://ts.xcatliu.com/engineering/lint.html#在-vscode-中集成-eslint-检查)

在编辑器中集成 ESLint 检查，可以在开发过程中就发现错误，甚至可以在保存时自动修复错误，极大的增加了开发效率。

要在 VSCode 中集成 ESLint 检查，我们需要先安装 ESLint 插件，点击「扩展」按钮，搜索 ESLint，然后安装即可。

VSCode 中的 ESLint 插件默认是不会检查 `.ts` 后缀的，需要在「文件 => 首选项 => 设置 => 工作区」中（也可以在项目根目录下创建一个配置文件 `.vscode/settings.json`），添加以下配置：

```json
{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript"
    ],
    "typescript.tsdk": "node_modules/typescript/lib"
}
```

此时打开ts文件，在错误处就会有提示

#### Prettier 

ESLint 包含了一些代码格式的检查，比如空格、分号等。但前端社区中有一个更先进的工具可以用来格式化代码，那就是 [Prettier](https://prettier.io/)。

Prettier 聚焦于代码的格式化，通过语法分析，重新整理代码的格式，让所有人的代码都保持同样的风格。

安装Prettier

```shell
npm install --save-dev prettier
```

然后创建一个 `prettier.config.js` 文件，里面包含 Prettier 的配置项。Prettier 的配置项很少，这里我推荐大家一个配置规则，作为参考：

```js
// prettier.config.js or .prettierrc.js
module.exports = {
    printWidth: 100,  		   // 一行最多 100 字符
    tabWidth: 4,      			 // 使用 4 个空格缩进
    useTabs: false,  				 // 不使用缩进符，而使用空格
    semi: true,      			   // 行尾需要有分号
    singleQuote: true,			 // 使用单引号
    quoteProps: 'as-needed', // 对象的 key 仅在必要时用引号
    jsxSingleQuote: false,   // jsx 不使用单引号，而使用双引号
    trailingComma: 'none',   // 末尾不需要逗号
    bracketSpacing: true,    // 大括号内的首尾需要空格
    jsxBracketSameLine: false,// jsx 标签的反尖括号需要换行
    arrowParens: 'always',   // 箭头函数，只有一个参数的时候，也需要括号
    rangeStart: 0,           // 每个文件格式化的范围是文件的全部内容
    rangeEnd: Infinity,
    requirePragma: false,    // 不需要写文件开头的 @prettier
    insertPragma: false,     // 不需要自动在文件开头插入 @prettier
    proseWrap: 'preserve',   // 使用默认的折行标准
    htmlWhitespaceSensitivity: 'css',// 根据显示样式决定 html 要不要折行
    endOfLine: 'lf'          // 换行符使用 lf
};
```

#### Es-lint支持tsx

如果需要同时支持对 tsx 文件的检查，则需要对以上步骤做一些调整：

安装 eslint-plugin-react

```shell
npm install --save-dev eslint-plugin-react
```

在package.json和vscode的插件中添加配置

```json
{
    "scripts": {
        "eslint": "eslint src --ext .ts,.tsx"
    }
}
```

```javascript
{
    "files.eol": "\n",
    "editor.tabSize": 4,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ],
    "typescript.tsdk": "node_modules/typescript/lib"
}
```

#### style-lint







### 对Node的支持

想用typescript写nodejs，需要引入第三方声明文件

```shell
npm install @type/node --save
```

https://ts.xcatliu.com/basics/type-of-function.html



### ts简单辨析

#### type与interface的区别

type与interface都用于描述一个对象或函数

一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。

相同点：

拓展与交叉

interface 可以 extends， 但 type 是不允许 extends 和 implement 的，但是 type 可以通过交叉类型 实现 interface 的 extend 行为，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 与 interface 类型交叉 。

```typescript
//interface使用extends继承，type可以通过交叉类型继承
interface Name { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}

type Name = { 
  name: string; 
}
type User = Name & { age: number  };
//interface与type混合extends与交叉
type Name = { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}

interface Name { 
  name: string; 
}
type User = Name & { 
  age: number; 
}
```

不同点：

interface可以声明合并，type不行

```typescript
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
```

type可以声明基本类型别名，联合类型，元组等类型，还可以使用 typeof 获取实例的类型进行赋值，interface不行

```typescript
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]

// 获取类型进行赋值
let div = document.createElement('div');
type B = typeof div


```



### npm run tsc



### WebAssembly-AssemblyScript

AssemblyScript定义了一个TypeScript的子集，意在帮助TS背景的同学，通过标准的JavaScript API来完成到wasm的编译，从而消除语言的差异，让程序猿可以快乐的编码。

AssemblyScript项目主要分为三个子项目：

- [AssemblyScript](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FAssemblyScript%2Fassemblyscript)：将TypeScript转化为wasm的主程序
- [binaryen.js](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FAssemblyScript%2Fbinaryen.js)：AssemblyScript主程序转化为wasm的底层实现，依托于[binaryen](https://link.juejin.cn?target=http%3A%2F%2Fgithub.com%2FWebAssembly%2Fbinaryen)库，是对binaryen的TypeScript封装。
- [wast.js](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FAssemblyScript%2Fwabt.js)：AssemblyScript主程序转化为wasm的底层实现，依托于[wast](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FWebAssembly%2Fwabt)库，是对wast的TypeScript封装。

首先安装assemblyScript

```shell
git clone https://github.com/AssemblyScript/assemblyscript.git
cd assemblyscript
npm install
npm link
```

在node的项目中添加wasm命令

```json
 "scripts": {
    "build": "npm run build:untouched && npm run build:optimized",
    "build:untouched": "asc assembly/module.ts -t dist/module.untouched.wat -b dist/module.untouched.wasm --validate --sourceMap --measure",
    "build:optimized": "asc assembly/module.ts -t dist/module.optimized.wat -b dist/module.optimized.wasm --validate --sourceMap --measure --optimize"
 }
```



```sh
npm install --save @assemblyscript/loader
npm install --save-dev assemblyscript
```

初始化node-modules

```shell
npx asinit .
```

构建

```shell
npm run asbuild
```





### js调用wasm

对于JavaScript调用wasm，一般采用如下步骤：

1. 加载wasm的字节码。
2. 将获取到字节码后转换成 ArrayBuffer，只有这种结构才能被正确编译。编译时会对上述ArrayBuffer进行验证。验证通过方可编译。编译后会通过Promise resolve一个 WebAssembly.Module。
3. 在获取到 module 后需要通过 WebAssembly.Instance API 去同步的实例化 module。
4. 上述第2、3步骤可以用instaniate 异步API等价代替。
5. 之后就可以和像使用JavaScript模块一样调用了。



### 学习资源

深入理解typescript：https://jkchao.github.io/typescript-book-chinese/

typescript入门教程：https://ts.xcatliu.com/basics/type-of-function.html

ts中文手册：https://typescript.bootcss.com/


