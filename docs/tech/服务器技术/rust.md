---
title: Rust
date: 2020-06-02 21:40:33
categories: IT
tags: IT，Web,Rust
toc: true
thumbnail: 
---

​      Rust语言

<!--more-->

## Why Rust

### 系统级编程语言 vs 应用级编程语言

像 Java/C# 的应用级编程语言被用来构建直接服务于用户的应用程序。比如我们常用的 Excel， World 应用程序，网站和手机 App。

像 C/C++ 这类的属于系统级编程语言，常用来构建软件和软件平台，操作系统，游戏引擎，编译器，等等 。通常会需要一些偏底层的操作，比如大量的和硬件交互。

系统级比应用级有两个主要的问题

- 编写内存安全的代码很困难。
- 编写多线程代码很困难。

### rust

- Rust 是一个系统级编程语言，被 Mozilla 员工 "Graydon Hoare" 于 2006 年 开发。他形容 Rust 是一种线程安全的支持并发的实用型的编程语言，支持函数式编程与命令式编程。
- rust 的语法和 C++ 类似。
- Rust 是免费开源的软件，即任何人可以免费的使用它，并且源代码是开源分享的，因此人们还可以去提高它的软件设计。
- 在 2016 年，2017 年和 2018 年的 stack overflow 开发人员调查中，Rust 被评比为 “最受欢迎的编程语言” 之一。
- 没有例如 calloc（动态内存分配并做初始化）或者 malloc（动态内存分配不做初始化）这样直接的内存管理模式。这意味着，内存会由 Rust 进行内部管理。





## 安装

linux

```shell
# Install Rust

$ sudo apt-get update
$ sudo apt-get -y upgrade
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
$ source $HOME/.cargo/env
```



## 使用

编程

```rust
fn main() {
    println!("Hello， world!");
}
```

运行

```shell
rustc main.rs
```



### 常量与变量

变量是程序可以操纵的命名存储。 简而言之，变量可以帮助程序存储值。 Rust 中的变量与特定的数据类型相关联。 数据类型决定变量的内存大小和布局，可以存储在该内存中的值的范围以及可以对该变量执行的一组操作。

变量的名称可以由字母，数字和下划线字符组成。以字母或下划线开头。

常量表示不可变的值。如果你声明了一个常量，你将无法改变它的值。声明常量的关键字为 **const**。常量一定要显式声明它的数据类型。

常量与变量的区别

- 常量使用 **const** 关键字来声明，而变量使用 **let** 关键字来声明。
- 变量的声明中可以选择是否声明数据类型，而声明常量时一定要声明它的数据类型。这意味着代码 const USER_LIMIT=100 将会导致错误。
- 使用 **let** 关键字声明的变量默认是不可变的。但是你可以选择使用 **mut** 关键字来使其可变。常量则永远是不可变的。
- 常量只能被赋予常量表达式而不能被赋予调用函数返回的值或是在运行时计算产生的值。（即常量的值一定要为编译前已知的值而非运行时产生的值）
- 常量可以在任何范围内声明，包括全局范围，这对于代码内需要被多处使用的值很有用。

## WebAssembly

安装rust webassembly工具

```shell
$ rustup target add wasm32-wasi
$ rustup override set nightly
$ rustup target add wasm32-wasi --toolchain nightly
```

创建一个cargo项目。由于这个程序是从主机应用程序调用的，而不是作为独立的可执行文件运行，因此我们将创建一个 `lib` 项目。

```shell
$ cargo new --lib triple
$ cd triple
```

编辑 `Cargo.toml` 文件以添加`[lib]`节。 它会告诉编译器在哪里可以找到库的源代码，以及如何生成字节码输出。

```toml
[lib]
name = "triple_lib"
path = "src/lib.rs"
crate-type =["cdylib"]
```

在Rust 程序 `src/lib.rs` 的内容. 实际上，你可以在这个库文件中定义多个外部函数，并且所有这些函数都可以通过 WebAssembly 在 JaveScript 主机上使用。

```rust
#[no_mangle]
pub extern fn triple(x: i32) -> i32 {
  return 3 * x;
}
```

编译 Rust 的源代码到WebAssembly的字节码中。

```shell
cargo +nightly build --target wasm32-wasi --release
```

导出的WebAssembly 字节码文件是 `target/wasm32-wasi/release/triple_lib.wasm`

在JavaScript中使用

```javascript
if (!('WebAssembly' in window)) {
  alert('you need a browser with wasm support enabled :(');
}
(async () => {
  const response = await fetch('triple_lib.wasm');
  const buffer = await response.arrayBuffer();
  const module = await WebAssembly.compile(buffer);
  const instance = await WebAssembly.instantiate(module);
  const exports = instance.exports;
  const triple = exports.triple;

  var buttonOne = document.getElementById('buttonOne');
  buttonOne.value = 'Triple the number';
  buttonOne.addEventListener('click', function() {
    var input = $("#numberInput").val();
    alert(input + ' tripled equals ' + triple(input));
  }, false);
})();
```



## 生命周期



## 错误处理







