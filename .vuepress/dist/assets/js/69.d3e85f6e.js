(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{428:function(t,a,s){"use strict";s.r(a);var n=s(44),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("​      html和css是做网页和前端的基础，也是基本构成")]),t._v(" "),s("p",[t._v("​      从开始学习前端之后，其实一直没有特别地学习过html和css。最开始写过一周之后，因为想要搭建好看的样式，开始使用bootstrap，再后来学习spa应用，react和vue，使用框架和库能快速地搭建想要的界面。")]),t._v(" "),s("p",[t._v("​      直到后面找前端工作参加面试的时候和参加工作之后开始写，才发现html和css还是前端基本功，包括vue和react其实也只是封装了很多东西，一定要了解基础原理和改进方法才能用好。")]),t._v(" "),s("p",[t._v("​     所以继续开始记录。")]),t._v(" "),s("h2",{attrs:{id:"html"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#html"}},[t._v("#")]),t._v(" HTML")]),t._v(" "),s("h3",{attrs:{id:"doctype"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#doctype"}},[t._v("#")]),t._v(" Doctype")]),t._v("\n<!DOCTYPE>声明叫做文件类型定义（DTD），声明的作用为了告诉浏览器该文件的类型。让浏览器解析器知道应该用哪个规范来解析文档。<!DOCTYPE>声明必须在 HTML 文档的第一行，处于html标签之前，这并不是一个 HTML 标签。DTD（文档类型定义）是一组机器可读的规则，他们定义 XML 或 HTML 的特定版本中允许有什么，不允许有什么。\n"),s("p",[t._v("严格模式（又称标准模式，Standards模式）和混杂模式（Quirk模式）都是指浏览器的呈现模式，要与Doctype的两种风格区别开来（严格（ strict ）和过渡（ transitional ），过渡 DOCTYPE 的目的是帮助开发人员从老版本迁移到新版本）。")]),t._v(" "),s("p",[t._v("严格模式又称标准模式，是指浏览器按照 W3C 标准解析代码，呈现页面")]),t._v(" "),s("p",[t._v("混杂模式又称怪异模式或兼容模式，是指浏览器用自己的方式解析代码，即使用一种比较宽松的向后兼容的方式来显示页面")]),t._v(" "),s("p",[t._v("HTML5 没有 DTD ，因此也就没有严格模式与混杂模式的区别，HTML5 有相对宽松的语法，实现时，已经尽可能大的实现了向后兼容。（ HTML5 没有严格和混杂之分）")]),t._v(" "),s("p",[t._v("DOCTYPE不存在或格式不正确会让文档以混杂模式呈现")]),t._v(" "),s("h3",{attrs:{id:"头部标签"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#头部标签"}},[t._v("#")]),t._v(" 头部标签")]),t._v(" "),s("h4",{attrs:{id:"meta标签"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#meta标签"}},[t._v("#")]),t._v(" meta标签")]),t._v(" "),s("p",[s("strong",[t._v("HTML "),s("code",[t._v("<meta>")]),t._v(" 元素")]),t._v("表示那些不能由其它 HTML 元相关（meta-related）元素之一表示的任何"),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Glossary/Metadata",target:"_blank",rel:"noopener noreferrer"}},[t._v("元数据"),s("OutboundLink")],1),t._v("信息。")]),t._v(" "),s("p",[t._v("属性")]),t._v(" "),s("p",[t._v('charset：声明文档的字符编码。其值必须是与ASCII大小写无关的"'),s("code",[t._v("utf-8")]),t._v('"。')]),t._v(" "),s("p",[t._v("name和content："),s("code",[t._v("name")]),t._v(" 和 "),s("code",[t._v("content")]),t._v(" 属性可以一起使用，以名-值对的方式给文档提供元数据，其中 name 作为元数据的名称，content 作为元数据的值。")]),t._v(" "),s("p",[s("strong",[s("code",[t._v("http-equiv")])])]),t._v(" "),s("p",[t._v("属性定义了一个编译指示指令。这个属性叫做 "),s("code",[t._v("**http-equiv**(alent)")]),t._v(" 是因为所有允许的值都是特定HTTP头部的名称"),s("code",[t._v("content-type")]),t._v('\n如果使用这个属性，其值必须是"'),s("code",[t._v("text/html; charset=utf-8")]),t._v('"。注意：该属性只能用于 '),s("a",{attrs:{href:"https://wiki.developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types",target:"_blank",rel:"noopener noreferrer"}},[t._v("MIME type"),s("OutboundLink")],1),t._v(" 为 "),s("code",[t._v("text/html")]),t._v(" 的文档，不能用于MIME类型为XML的文档。")]),t._v(" "),s("p",[s("code",[t._v("itemprop")]),t._v(" 属性，"),s("code",[t._v("meta")]),t._v(" 元素提供用户定义的元数据。")]),t._v(" "),s("h4",{attrs:{id:"link标签"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#link标签"}},[t._v("#")]),t._v(" link标签")]),t._v(" "),s("p",[t._v("苹果书签图标：")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("apple-touch-icon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("apple-icon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("size")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("152*152"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("注意：书签bookmark的png分辨率不能太小，否则显示不了效果")]),t._v(" "),s("p",[t._v("网页小图标、外链图标")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("shortcut icon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("favicon"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("h4",{attrs:{id:"管理外链的内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#管理外链的内容"}},[t._v("#")]),t._v(" 管理外链的内容")]),t._v(" "),s("h4",{attrs:{id:"form标签"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#form标签"}},[t._v("#")]),t._v(" form标签")]),t._v(" "),s("h4",{attrs:{id:"input标签"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#input标签"}},[t._v("#")]),t._v(" input标签")]),t._v(" "),s("h4",{attrs:{id:"script标签"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#script标签"}},[t._v("#")]),t._v(" script标签")]),t._v(" "),s("p",[t._v("现代网站中，脚本往往比html更重，更大，处理时间也更长。")]),t._v(" "),s("p",[s("strong",[t._v("当浏览器加载html时，遇到"),s("code",[t._v("<script>...<\/script>")]),t._v("标签时浏览器就不能继续构建DOM，它必须立即执行此脚本，对于外部脚本"),s("code",[t._v('<script src="..."><\/script>')]),t._v("也是一样，浏览器必须等待脚本下载完并执行结束之后才能继续处理剩余的页面。")])]),t._v(" "),s("p",[t._v("这会导致两个问题：")]),t._v(" "),s("p",[t._v("​       1.脚本不能访问到位于它之后的DOM元素，无法访问到意味着也无法给它们添加处理程序")]),t._v(" "),s("p",[t._v("​       2.如果页面顶部有一个笨重的脚本会阻塞页面，在该脚本下载并执行完之前用户都不能看到页面。")]),t._v(" "),s("p",[t._v("可以把script放在html页面的底部，这样浏览器会下载完整的HTML文档之后在监测到脚本")]),t._v(" "),s("p",[t._v("但是对于长的HTML文档，这样会造成明显的延迟")]),t._v(" "),s("p",[t._v("script标签只有在head部分才有效，如果将脚本放在body中就没有用了")]),t._v(" "),s("p",[s("strong",[t._v("defer特性")])]),t._v(" "),s("p",[t._v("defer特性告诉浏览器不要等待脚本，浏览器继续构建DOM，脚本会在后台下载，等DOM构建完之后，在DOMContentLoaded事件执行之前执行")]),t._v(" "),s("p",[t._v("同时defer能保证相对顺序，就像保证常规脚本一样")]),t._v(" "),s("p",[t._v("defer特性只适用于外部js文件，即src内加载的脚本")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--这两个脚本会并行下载，但是不管谁先下载完，都会先执行pre.js,执行完之后再执行after.js--\x3e")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("defer")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("pre.js"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}}),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("defer")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("after.js"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}}),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[s("strong",[t._v("async特性")])]),t._v(" "),s("p",[t._v("async特性的script，不会与DOM和其他脚本产生冲突，独立运行，任何一个asnyc js加载完就运行，也不会等待任何东西")]),t._v(" "),s("p",[t._v("defer、async与正常代码区别")]),t._v(" "),s("p",[t._v("没有 "),s("code",[t._v("defer")]),t._v(" 或 "),s("code",[t._v("async")]),t._v("，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 "),s("code",[t._v("script")]),t._v(" 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。")]),t._v(" "),s("p",[t._v("有 "),s("code",[t._v("async")]),t._v("，加载和渲染后续文档元素的过程将和 "),s("code",[t._v("script.js")]),t._v(" 的加载与执行并行进行（异步）。")]),t._v(" "),s("p",[t._v("有 "),s("code",[t._v("defer")]),t._v("，加载后续文档元素的过程将和 "),s("code",[t._v("script.js")]),t._v(" 的加载并行进行（异步），但是 "),s("code",[t._v("script.js")]),t._v(" 的执行要在所有元素解析完成之后，"),s("code",[t._v("DOMContentLoaded")]),t._v(" 事件触发之前完成。")]),t._v(" "),s("p",[s("em",[t._v("async")]),t._v(" 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：Google Analytics")]),t._v(" "),s("p",[s("strong",[t._v("同时有async和defer特性")])]),t._v(" "),s("p",[t._v("如果同时指定两者，async优先于现代浏览器，而支持defer但不支持async的旧版浏览器将回退到defer")]),t._v(" "),s("p",[s("strong",[t._v("动态脚本")])]),t._v(" "),s("p",[t._v("可以通过js代码来动态加载脚本")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("loadScript")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("src")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" script "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'script'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  script"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" src"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  script"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("async "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//默认通过js加载脚本是async方式，可以设置为false，则按照defer的规则来执行")]),t._v("\n  document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("append")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("script"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("loadScript")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"pre.js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("loadScript")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"after.js"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h3",{attrs:{id:"常见html标签属性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常见html标签属性"}},[t._v("#")]),t._v(" 常见HTML标签属性")]),t._v(" "),s("p",[t._v("html连接："),s("a",[t._v("标签：target属性规定在何处打开链接文档。浏览器会根据target的属性值去打开与其命名或名称相符的 框架"),s("frame"),t._v("或者窗口.")],1)]),t._v(" "),s("p",[t._v("​             _blank:在新窗口中打开被链接文档。")]),t._v(" "),s("p",[t._v("​             _self:在相同的框架中打开被链接文档。")]),t._v(" "),s("p",[t._v("​             _top:在整个窗口中打开被链接文档。")]),t._v(" "),s("p",[t._v("​             _parent:在父框架集中打开被链接文档。")]),t._v(" "),s("p",[t._v("html图片："),s("img"),t._v("标签：alt是在图片未加载完成的时候做完图片的替代文字线性，title是图片的解释文字")]),t._v(" "),s("p",[t._v("Html"),s("script")])])}),[],!1,null,null,null);a.default=e.exports}}]);