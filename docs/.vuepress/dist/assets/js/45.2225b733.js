(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{401:function(s,t,a){"use strict";a.r(t);var n=a(44),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("​      Rust语言")]),s._v(" "),a("h2",{attrs:{id:"why-rust"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#why-rust"}},[s._v("#")]),s._v(" Why Rust")]),s._v(" "),a("h3",{attrs:{id:"系统级编程语言-vs-应用级编程语言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#系统级编程语言-vs-应用级编程语言"}},[s._v("#")]),s._v(" 系统级编程语言 vs 应用级编程语言")]),s._v(" "),a("p",[s._v("像 Java/C# 的应用级编程语言被用来构建直接服务于用户的应用程序。比如我们常用的 Excel， World 应用程序，网站和手机 App。")]),s._v(" "),a("p",[s._v("像 C/C++ 这类的属于系统级编程语言，常用来构建软件和软件平台，操作系统，游戏引擎，编译器，等等 。通常会需要一些偏底层的操作，比如大量的和硬件交互。")]),s._v(" "),a("p",[s._v("系统级比应用级有两个主要的问题")]),s._v(" "),a("ul",[a("li",[s._v("编写内存安全的代码很困难。")]),s._v(" "),a("li",[s._v("编写多线程代码很困难。")])]),s._v(" "),a("h3",{attrs:{id:"rust"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rust"}},[s._v("#")]),s._v(" rust")]),s._v(" "),a("ul",[a("li",[s._v('Rust 是一个系统级编程语言，被 Mozilla 员工 "Graydon Hoare" 于 2006 年 开发。他形容 Rust 是一种线程安全的支持并发的实用型的编程语言，支持函数式编程与命令式编程。')]),s._v(" "),a("li",[s._v("rust 的语法和 C++ 类似。")]),s._v(" "),a("li",[s._v("Rust 是免费开源的软件，即任何人可以免费的使用它，并且源代码是开源分享的，因此人们还可以去提高它的软件设计。")]),s._v(" "),a("li",[s._v("在 2016 年，2017 年和 2018 年的 stack overflow 开发人员调查中，Rust 被评比为 “最受欢迎的编程语言” 之一。")]),s._v(" "),a("li",[s._v("没有例如 calloc（动态内存分配并做初始化）或者 malloc（动态内存分配不做初始化）这样直接的内存管理模式。这意味着，内存会由 Rust 进行内部管理。")])]),s._v(" "),a("h2",{attrs:{id:"安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),a("p",[s._v("linux")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Install Rust")]),s._v("\n\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" update\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("apt-get")]),s._v(" -y upgrade\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" --proto "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'=https'")]),s._v(" --tlsv1.2 -sSf https://sh.rustup.rs "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sh")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("source")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$HOME")]),s._v("/.cargo/env\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("h2",{attrs:{id:"使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[s._v("#")]),s._v(" 使用")]),s._v(" "),a("p",[s._v("编程")]),s._v(" "),a("div",{staticClass:"language-rust line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-rust"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function-definition function"}},[s._v("main")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token macro property"}},[s._v("println!")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Hello， world!"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("运行")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("rustc main.rs\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"常量与变量"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常量与变量"}},[s._v("#")]),s._v(" 常量与变量")]),s._v(" "),a("p",[s._v("变量是程序可以操纵的命名存储。 简而言之，变量可以帮助程序存储值。 Rust 中的变量与特定的数据类型相关联。 数据类型决定变量的内存大小和布局，可以存储在该内存中的值的范围以及可以对该变量执行的一组操作。")]),s._v(" "),a("p",[s._v("变量的名称可以由字母，数字和下划线字符组成。以字母或下划线开头。")]),s._v(" "),a("p",[s._v("常量表示不可变的值。如果你声明了一个常量，你将无法改变它的值。声明常量的关键字为 "),a("strong",[s._v("const")]),s._v("。常量一定要显式声明它的数据类型。")]),s._v(" "),a("p",[s._v("常量与变量的区别")]),s._v(" "),a("ul",[a("li",[s._v("常量使用 "),a("strong",[s._v("const")]),s._v(" 关键字来声明，而变量使用 "),a("strong",[s._v("let")]),s._v(" 关键字来声明。")]),s._v(" "),a("li",[s._v("变量的声明中可以选择是否声明数据类型，而声明常量时一定要声明它的数据类型。这意味着代码 const USER_LIMIT=100 将会导致错误。")]),s._v(" "),a("li",[s._v("使用 "),a("strong",[s._v("let")]),s._v(" 关键字声明的变量默认是不可变的。但是你可以选择使用 "),a("strong",[s._v("mut")]),s._v(" 关键字来使其可变。常量则永远是不可变的。")]),s._v(" "),a("li",[s._v("常量只能被赋予常量表达式而不能被赋予调用函数返回的值或是在运行时计算产生的值。（即常量的值一定要为编译前已知的值而非运行时产生的值）")]),s._v(" "),a("li",[s._v("常量可以在任何范围内声明，包括全局范围，这对于代码内需要被多处使用的值很有用。")])]),s._v(" "),a("h2",{attrs:{id:"webassembly"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webassembly"}},[s._v("#")]),s._v(" WebAssembly")]),s._v(" "),a("p",[s._v("安装rust webassembly工具")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("$ rustup target "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" wasm32-wasi\n$ rustup override "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" nightly\n$ rustup target "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" wasm32-wasi --toolchain nightly\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("创建一个cargo项目。由于这个程序是从主机应用程序调用的，而不是作为独立的可执行文件运行，因此我们将创建一个 "),a("code",[s._v("lib")]),s._v(" 项目。")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("$ cargo new --lib triple\n$ "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" triple\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("编辑 "),a("code",[s._v("Cargo.toml")]),s._v(" 文件以添加"),a("code",[s._v("[lib]")]),s._v("节。 它会告诉编译器在哪里可以找到库的源代码，以及如何生成字节码输出。")]),s._v(" "),a("div",{staticClass:"language-toml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-toml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token table class-name"}},[s._v("lib")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key property"}},[s._v("name")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"triple_lib"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key property"}},[s._v("path")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"src/lib.rs"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key property"}},[s._v("crate-type")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"cdylib"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("在Rust 程序 "),a("code",[s._v("src/lib.rs")]),s._v(" 的内容. 实际上，你可以在这个库文件中定义多个外部函数，并且所有这些函数都可以通过 WebAssembly 在 JaveScript 主机上使用。")]),s._v(" "),a("div",{staticClass:"language-rust line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-rust"}},[a("code",[a("span",{pre:!0,attrs:{class:"token attribute attr-name"}},[s._v("#[no_mangle]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pub")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extern")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function-definition function"}},[s._v("triple")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("i32")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("->")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("i32")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("编译 Rust 的源代码到WebAssembly的字节码中。")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("cargo +nightly build --target wasm32-wasi --release\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("导出的WebAssembly 字节码文件是 "),a("code",[s._v("target/wasm32-wasi/release/triple_lib.wasm")])]),s._v(" "),a("p",[s._v("在JavaScript中使用")]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'WebAssembly'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'you need a browser with wasm support enabled :('")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("async")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" response "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("await")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("fetch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'triple_lib.wasm'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" buffer "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("await")]),s._v(" response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("arrayBuffer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" module "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("await")]),s._v(" WebAssembly"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("compile")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("buffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" instance "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("await")]),s._v(" WebAssembly"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("instantiate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" instance"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" triple "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" exports"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("triple"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" buttonOne "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'buttonOne'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  buttonOne"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("value "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Triple the number'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  buttonOne"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("addEventListener")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'click'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" input "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("$")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"#numberInput"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("val")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("input "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("' tripled equals '")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("triple")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("input"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br")])]),a("h2",{attrs:{id:"生命周期"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生命周期"}},[s._v("#")]),s._v(" 生命周期")]),s._v(" "),a("h2",{attrs:{id:"错误处理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#错误处理"}},[s._v("#")]),s._v(" 错误处理")])])}),[],!1,null,null,null);t.default=e.exports}}]);