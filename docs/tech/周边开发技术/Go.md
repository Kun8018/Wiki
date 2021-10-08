---
title: Golang语言开发 
date: 2020-03-02 21:40:33
categories: 技术博客
tags: Web,IT,Go
toc: true
thumbnail: https://s1.ax1x.com/2020/04/20/J1Iu4O.th.jpg
---

　　https://draveness.me/golang/docs/part1-prerequisite/ch01-prepare/golang-debug/

<!--more-->

## 安装

mac安装go语言环境

```shell
brew update
brew install go
```

Linux安装

查看golang

```shell
yum info golang
```

安装

```shell
yum install golang
```

设置国内代理

```shell
go env -w GOPROXY=https://goproxy.cn,direct
```

在输入go env查看go代理



## 变量与常量

变量使用var关键字，常量使用const关键字

声明时可以显示声明类型，也可以有编译器自行推断

```go
var a string = "run"  
var b,c int = 1,2

const b string = "abc"  //显式声明
const b = "abc"  //编译器自行推断

const c_name,c_name1 = value1,value2 //多个声明简写
```



## 常用数据结构

数组



切片

切片是对数组的封装，为数据序列提供了更通用、更强大而方便的接口，除了矩阵变换这种需要明确纬度的情况外，Go中的大部分数组编程是通过切片完成的。

切片保存了对底层数组的引用，若你将某个切片赋予另一个切片，它们会引用同一个数组，若某个函数将一个切片作为参数传入，则它对该切片元素的修改对调用者而言同样可见。



二维切片

数组和普通切片都是一维的，要创建等价的二维数组或者切片，就必须定义一个数组的数组，或者切片的切片。

由于切片长度是可变的，因此其内部可能拥有多个不同长度的切片，



映射

映射是方便而强大的内建数据结构，它可以关联不同类型的值，其键可以是任何相等性操作符支持的类型，如整数、浮点数、负数、指针、字符串、接口、结构、以及数组等。切片不能用做映射键，因为它们的相等性还未定义。

与切片一样，映射也是引用类型，若将映射传入函数中，并更改了该映射的内容，则此修改对调用者同样可见



```go
var timeZone = map[string]int{
  "UTC": 0*60*60,
  "EST": -5*60*60,
  "CST": -6*60*60,
  "MST": -7*60*60,
  "PST": -8*60*60
}

offset := timeZone["EST"]
```





追加



## 函数

函数是Go语言的一等公民



### 接口





### 反射





## 控制结构



```go

```



```go
func unhex(c byte) byte {
  switch {
    case '0' <= c && c <= '9':
    	return c - '0'
    case 'a' <= c && c <= 'f':
    	return c - 'a' + 10
    case 'A' <= c && c <= 'F':
    	return c - 'A' + 10
  }
  return 0
}
```



类型选择

```go
var t interface{}

t = functionOfSomeType()

switch t := t.(type) {
  default:
  	fmt.Printf("unexpected type")
  case bool:
  	fmt.Printf("unexpected type")
	case int:
  	fmt.Printf("unexpected type")
	case *bool:
  	fmt.Printf("unexpected type")
  case *int:
  	fmt.Printf("unexpected type")
}
```



## 关键字



defer

go的defer语句用于预设一个函数调用，即推迟执行函数，



select





panic与recover

`panic` 能够改变程序的控制流，函数调用`panic` 时会立刻停止执行函数的其他代码，并在执行结束后在当前 Goroutine 中递归执行调用方的延迟函数调用 `defer`；

`recover` 可以中止 `panic` 造成的程序崩溃。它是一个只能在 `defer` 中发挥作用的函数，在其他作用域中调用不会发挥任何作用；

Panic和recover常用于错误处理

```go
func CubeRoot(x float64) float64 {
  z := x/3
  for i := 0; i < 1e6; i++ {
    prevz := z
    z -= (z*z*z-x) / (3*z*z)
    if veryClose(z,prez) {
      return z
    }
  }
  
  panic(fmt.Sprintf("CubeRoot(g%) did not converge", x))
}
```



```go
func server(workChan <-chan *Work) {
  for work := range workChan {
    go safelyDo(work)
  }
}

func safeliDo(work *Work) {
  defer func() {
    if err := recover(); err != nil {
      log.Println("work failed", err)
    }
  }()
  do(work)
}
```





make和new

`make` 的作用是初始化内置的数据结构，也就是我们在前面提到的切片、哈希表和 Channel[2](https://draveness.me/golang/docs/part2-foundation/ch05-keyword/golang-make-and-new/#fn:2)；

`new` 的作用是根据传入的类型分配一片内存空间并返回指向这片内存空间的指针[3](https://draveness.me/golang/docs/part2-foundation/ch05-keyword/golang-make-and-new/#fn:3)；



## 引入包

包是函数和数据的集合。用package保留字定义一个包，文件名不需要与包名一致，包名的约定是小写字符。

单个引入包

```go
import "fmt"
import "os"
```

常用的包：

fmt:包fmt实现了格式化的I/O函数，这与C的printf和scanf类似

io：这个包提供了原始的I/O操作界面

bufio：这个包实现了缓冲的io

sync：sync包提供了基本的同步原语

sort:sort包提供了对数组和用户定义集合的原始的排序功能

strconv：strconv包提供了字符串与基本数据类型的转换功能

text/template:数据驱动的模版，用于生成文本输出，例如HTML

net/http:net/http实现了http请求、响应和URL的解析，并提供了可扩展的HTTP服务和基本的HTTP客户端

unsafe:unsafe包包含了Go程序中数据类型上所有不安全的操作，通常无须使用这个

encoding/json:实现了编码和解码RFC 4627定义的JSON对象

reflect:实现了运行时反射，允许程序通过抽象类型操作对象

flag：flag包实现了命令行的解析

os/exec:os/exec包执行外部命令



## 并发编程

### 协程





### 调度器

Go 语言在并发编程方面有强大的能力，这离不开语言层面对并发编程的支持。

多个线程可以属于同一个进程并共享内存空间。因为多线程不需要创建新的虚拟内存空间，所以它们也不需要内存管理单元处理上下文的切换，线程之间的通信也正是基于共享的内存进行的，与重量级的进程相比，线程显得比较轻量。

虽然线程比较轻量，但是在调度时也有比较大的额外开销。每个线程会都占用 1 兆以上的内存空间，在对线程进行切换时不止会消耗较多的内存，恢复寄存器中的内容还需要向操作系统申请或者销毁对应的资源，每一次线程上下文的切换都需要消耗 ~1us 左右的时间[1](https://draveness.me/golang/docs/part3-runtime/ch06-concurrency/golang-goroutine/#fn:1)，但是 Go 调度器对 Goroutine 的上下文切换约为 ~0.2us，减少了 80% 的额外开销

1. G — 表示 Goroutine，它是一个待执行的任务；
2. M — 表示操作系统的线程，它由操作系统的调度器调度和管理；
3. P — 表示处理器，它可以被看做运行在线程上的本地调度器；

Goroutine 就是 Go 语言调度器中待执行的任务，它在运行时调度器中的地位与线程在操作系统中差不多，但是它占用了更小的内存空间，也降低了上下文切换的开销。

Goroutine 只存在于 Go 语言的运行时，它是 Go 语言在用户态提供的线程，作为一种粒度更细的资源调度单元，如果使用得当能够在高并发的场景下更高效地利用机器的 CPU。

Goroutine 在 Go 语言运行时使用私有结构体 [`runtime.g`](https://github.com/golang/go/blob/753d56d3642eb83848aa39e65982a9fc77e722d7/src/runtime/runtime2.go#L395) 表示。这个私有结构体非常复杂，总共包含 40 多个用于表示各种状态的成员变量，



### 定时器



### 管道

Go 语言中最常见的、也是经常被人提及的设计模式就是 — 不要通过共享内存的方式进行通信，而是应该通过通信的方式共享内存。在很多主流的编程语言中，多个线程传递数据的方式一般都是共享内存，为了解决线程冲突的问题，我们需要限制同一时间能够读写这些变量的线程数量，这与 Go 语言鼓励的方式并不相同。



### 网络轮询器

大部分的服务都是 I/O 密集型的，应用程序会花费大量时间等待 I/O 操作执行完成。网络轮询器就是 Go 语言运行时用来处理 I/O 操作的关键组件，它使用了操作系统提供的 I/O 多路复用机制增强程序的并发处理能力。

网络轮询器不仅用于监控网络 I/O，还能用于监控文件的 I/O，它利用了操作系统提供的 I/O 多路复用模型来提升 I/O 设备的利用率以及程序的性能。

操作系统中包含阻塞 I/O、非阻塞 I/O、信号驱动 I/O 与异步 I/O 以及 I/O 多路复用五种 I/O 模型。我们在本节中会介绍上述五种模型中的三种：

- 阻塞 I/O 模型；
- 非阻塞 I/O 模型；
- I/O 多路复用模型；

阻塞I/O

阻塞 I/O 是最常见的 I/O 模型，对文件和网络的读写操作在默认情况下都是阻塞的。当我们通过 `read` 或者 `write` 等系统调用对文件进行读写时，应用程序就会被阻塞

非阻塞 I/O

当进程把一个文件描述符设置成非阻塞时，执行 `read` 和 `write` 等 I/O 操作就会立刻返回。在 C 语言中，我们可以使用如下所示的代码片段将一个文件描述符设置成非阻塞的



### 系统监控

很多系统中都有守护进程，它们能够在后台监控系统的运行状态，在出现意外情况时及时响应。系统监控是 Go 语言运行时的重要组成部分，它会每隔一段时间检查 Go 语言运行时，确保程序没有进入异常状态。

守护进程是很有效的设计，它在整个系统的生命周期中都会存在，会随着系统的启动而启动，系统的结束而结束。在操作系统和 Kubernetes 中，我们经常会将数据库服务、日志服务以及监控服务等进程作为守护进程运行。

Go 语言的系统监控也起到了很重要的作用，它在内部启动了一个不会中止的循环，在循环的内部会轮询网络、抢占长期运行或者处于系统调用的 Goroutine 以及触发垃圾回收，通过这些行为，它能够让系统的运行状态变得更健康。



## 内存管理

内存管理一般包含三个不同的组件，分别是用户程序（Mutator）、分配器（Allocator）和收集器（Collector）[1](https://draveness.me/golang/docs/part3-runtime/ch07-memory/golang-memory-allocator/#fn:1)，当用户程序申请内存时，它会通过内存分配器申请新的内存，而分配器会负责从堆中初始化相应的内存区域。

### 分配方法

编程语言的内存分配器一般包含两种分配方法，一种是线性分配器（Sequential Allocator，Bump Allocator），另一种是空闲链表分配器（Free-List Allocator），这两种分配方法有着不同的实现机制和特性，本节会依次介绍它们的分配过程。

线性分配（Bump Allocator）是一种高效的内存分配方法，但是有较大的局限性。当我们在编程语言中使用线性分配器，我们只需要在内存中维护一个指向内存特定位置的指针，当用户程序申请内存时，分配器只需要检查剩余的空闲内存、返回分配的内存区域并修改指针在内存中的位置，即移动下图中的指针：

根据线性分配器的原理，我们可以推测它有较快的执行速度，以及较低的实现复杂度；但是线性分配器无法在内存被释放时重用内存。

正是因为线性分配器的这种特性，我们需要合适的垃圾回收算法配合使用。标记压缩（Mark-Compact）、复制回收（Copying GC）和分代回收（Generational GC）等算法可以通过拷贝的方式整理存活对象的碎片，将空闲内存定期合并，这样就能利用线性分配器的效率提升内存分配器的性能了。

不同的内存块以链表的方式连接，所以使用这种方式分配内存的分配器可以重新利用回收的资源，但是因为分配内存时需要遍历链表，所以它的时间复杂度就是 𝑂(𝑛)O(n)。空闲链表分配器可以选择不同的策略在链表中的内存块中进行选择，最常见的就是以下四种方式：

- 首次适应（First-Fit）— 从链表头开始遍历，选择第一个大小大于申请内存的内存块；
- 循环首次适应（Next-Fit）— 从上次遍历的结束位置开始遍历，选择第一个大小大于申请内存的内存块；
- 最优适应（Best-Fit）— 从链表头遍历整个链表，选择最合适的内存块；
- 隔离适应（Segregated-Fit）— 将内存分割成多个链表，每个链表中的内存块大小相同，申请内存时先找到满足条件的链表，再从链表中选择合适的内存块；

Go语言的内存分配策略与第四章策略相似，该策略会将内存分割成由 4、8、16、32 字节的内存块组成的链表，当我们向内存分配器申请 8 字节的内存时，我们会在上图中的第二个链表找到空闲的内存块并返回。隔离适应的分配策略减少了需要遍历的内存块数量，提高了内存分配的效率。

### 垃圾回收器

编程语言通常会使用手动和自动两种方式管理内存，C、C++ 以及 Rust 等编程语言使用手动的方式管理内存[2](https://draveness.me/golang/docs/part3-runtime/ch07-memory/golang-garbage-collector/#fn:2)，工程师需要主动申请或者释放内存；而 Python、Ruby、Java 和 Go 等语言使用自动的内存管理系统，一般都是垃圾收集机制，



### 栈内存管理

栈区的内存一般由编译器自动进行分配和释放，其中存储着函数的入参以及局部变量，这些参数会随着函数的创建而创建，函数的返回而消亡，一般不会在程序中长期存在，这种线性的内存分配策略有着极高地效率，但是工程师也往往不能控制栈内存的分配，这部分工作基本都是由编译器自动完成的。

栈寄存器在是 CPU 寄存器中的一种，它的主要作用是跟踪函数的调用栈[2](https://draveness.me/golang/docs/part3-runtime/ch07-memory/golang-stack-management/#fn:2)，Go 语言的汇编代码中包含 BP 和 SP 两个栈寄存器，它们分别存储了栈的基址指针和栈顶的地址，栈内存与函数调用的关系非常紧密，我们在函数调用一节中曾经介绍过栈区，BP 和 SP 之间的内存就是当前函数的调用栈。

多数架构上默认栈大小都在 2 ~ 4 MB 左右，极少数架构会使用 32 MB 作为默认大小，用户程序可以在分配的栈上存储函数参数和局部变量。然而这个固定的栈大小在某些场景下可能不是一个合适的值，如果一个程序需要同时运行几百个甚至上千个线程，那么这些线程中的绝大部分都只会用到很少的栈空间，而如果函数的调用栈非常深，固定的栈大小也无法满足用户程序的需求。

Go 语言中的执行栈由 [`runtime.stack`](https://github.com/golang/go/blob/a38a917aee626a9b9d5ce2b93964f586bf759ea0/src/runtime/runtime2.go#L382) 结构体表示，该结构体中只包含两个字段，分别表示栈的顶部和栈的底部，每个栈结构体都表示范围 `[lo, hi)` 的内存空间



## 错误处理

库函数很多时候必须将错误信息返回给函数的调用者，Go允许函数有多个返回值的特性，使得函数的调用者在得到正常返回值的同时，可以获取更为详细的错误信息。

简单的错误类型为内置的简单接口，错误类型为error

```go
type error interface {
  Error() string
}
```

库开发者可以使用更丰富的模型实现这个接口，这样不仅可以看到错误，还可以提供一些上下文，比如像这样返回文件路径

```go
type PathError struct {
	Op string
  Path string
  Err error
}

func (e *PathError) Error() string {
  return e.Op + e.Path + e.Err.Error();
}
```





## 数据库

数据库几乎是所有 Web 服务不可或缺的一部分，在所有类型的数据库中，关系型数据库是我们在想要持久存储数据时的首要选择，不过因为关系型数据库的种类繁多，所以 Go 语言的标准库 [`database/sql`](https://golang.org/pkg/database/sql/) 就为访问关系型数据提供了通用的接口，这样不同数据库只要实现标准库中的接口，应用程序就可以通过标准库中的方法访问。

结构化查询语言（Structured Query Language、SQL）是在关系型数据库系统中使用的领域特定语言（Domain-Specific Language、DSL），它主要用于处理结构化的数据[1](https://draveness.me/golang/docs/part4-advanced/ch09-stdlib/golang-database-sql/#fn:1)。作为一门领域特定语言，它由更加强大的表达能力，与传统的命令式 API 相比，它能够提供两个优点：

1. 可以使用单个命令在数据库中访问多条数据；
2. 不需要在查询中指定获取数据的方法；

所有的关系型数据库都会提供 SQL 作为查询语言，应用程序可以使用相同的 SQL 查询在不同数据库中查询数据，



## 模版引擎/Hugo

hugo是基于go语言实现的静态站点生成器，并且利用了Go html/template模版，Go modules等多项技术

Hugo静态网页的数据内容主要来源有四个：

一是Markdown文件，每个文件顶部都可以设置参数，这个区域叫做扉页，文件后面是内容

二是config.toml站点的配置文件

三是data目录下的数据文件

四是通过ajax请求，还可以在页面请求外部服务器的数据服务，比如表单数据，评论数据等等

页面与文件目录结构

文件目录为：

static：静态资源存放目录，图片、css、js库等，可以放到这里，编译时会自动原样复制到public目录。可以有多个静态目录

public：静态站点的文件输出目录

config：Hugo有大量的配置指令，此目录用于保存Json、Yaml、toml等配置文件。最简单的项目只需要一个config.toml文件

每个文件对应一个配置根对象，比如Params，Menus、Languages等

content：所有内容页面存放页，

resouce：资源缓冲目录，非默认创建，用于加速hugo的生成过程，也可以用作给模版作者分发构建好的sass文件，因此不必另外安装预处理器



### 模版引擎

条件判断

```go
{{ if pipeline }}
      T1
{{else if pipeline}}
      T0
{{else}} 
      T
{{end}}
```

循环

```go
{{range pipeline}}
    	T1
{{end}}
```

模版嵌套

```go
{{ partial "<path>/<patial>.html"}}
```

### 路由/列表页

Hugo中一切皆页面，“everything in Hugo is a Page”。当需要新路由时，在对应的content下面新建子目录，并在子目录下面新建_index.md

当需要列表页时，在



### 变量

Hugo中可以使用自定义变量，并且它提供很多预定义的全局变量可以使用

.Site Params

在配置文件中添加Params参数，在模版中就能使用

```toml
baseURL: https://yoursite.example.com/
params: 
  author: Nikola Tesla
  description:Tesla's Awesome Hugo Site
```

然后在模版引擎中使用

```html
<meta name="description" content="{{if IsHome}}"
```

.Site.Pages



## Go.sum和Go.mod

Go在做依赖管理时会创建两个文件，gomod和gosum

gomod是官方推荐的包管理方式，开始于go1.11，在go1.12基本稳定，go1.13默认开启

通过go mod init方式产生go mod文件

go mod提供了module、require、replace、和exclude四个命令



go mod tidy：移除所有代码中不需要的包

go mod edit fmt：格式化文本

go sum类似于package-lock json文件，



## 调试工具

编译指令

```shell
go tool compile -S -N -l main.go
```



## Iris、Gin

### Gin

安装

```go
go get -u github.com/gin-gonic/gin
```

新建gin。go文件

```go
package main

import (
	"github.com/gin-gonic/gin"
)

func main(){
  g := gin.Default()
  
  g.GET("/hello",func(c *gin.Context){
    c.JSON(200,gin.H{
      "message":"hello world",
    })
  })
  
  g.Run();
}
```

依赖导入，执行命令

```go
go mod init git-demo
go mod tidy
```

启动命令

```go
go run gin.go
```



## GoFrame



```go
go get -u -v github.com/gogf/gf
```





## Node、Go、Python对比

Go的语法简洁，是强语言类型，效率高，可直接被编译为机器码，





