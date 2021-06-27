---
title: Javascript开发（四）
date: 2021-01-18 21:40:33
categories: IT
tags: IT，Web,Node
toc: true
thumbnail: http://cdn.kunkunzhang.top/javascript.png
---

​     第四篇主要讲常用的js库

<!--more-->



## loash.js

pick_by



## fullpage.js

安装

```shell
npm install fullpage.js
```









## Momentjs

momentjs是js日期处理类库，js原生对date对象处理比较好，但是对时间戳处理不友好，所以moment在这方面比原生的时间处理函数更强大。

安装

```shell
npm install moment --save
```

引入

```javascript
import moment from 'moment'
```

日期格式化

```javascript
moment().format('MMMM Do YYYY, h:mm:ss a'); // 九月 19日 2020, 2:53:10 下午
moment().format('dddd');                    // 星期六
moment().format("MMM Do YY");               // 9月 19日 20
moment().format('YYYY [escaped] YYYY');     // 2020 escaped 2020
moment().format();                          // 2020-09-19T14:53:10+08:00
```

获取时间

```javascript
//获取以秒为单位的时间戳
moment().format('X')          // 返回值为字符串类型
moment().unix()               // 返回值为数值型
//获取以毫秒为单位的时间戳
moment().format('x')          // 返回值为字符串类型
moment().valueOf()            // 返回值为数值型
moment().get('year')          //获取年份
moment().get('11')            //获取月份
moment().get('25')            //获取某一天
moment().day() (0~6, 0: 周日, 6: 周六)
moment().weekday() (0~6, 0: 周日, 6: 周六)
moment().isoWeekday() (1~7, 1: 周一, 7: 周日)
moment().get('day')
mment().get('weekday')
moment().get('isoWeekday')
moment().toArray() // [years, months, date, hours, minutes, seconds, milliseconds] //获取当前年月日时分秒
moment().toObject() // {years: xxxx, months: x, date: xx ...} //获取当前年月日时分秒
moment().seconds()
moment().get('seconds')         //获取秒数
moment().minutes()
moment().get('minutes')         //获取分钟
moment().hours()
moment().get('hours')           //获取小时
```

获取相对时间

```javascript
//2020年9月19号15点为例
moment("20111031", "YYYYMMDD").fromNow(); // 9 年前
moment("20120620", "YYYYMMDD").fromNow(); // 8 年前
moment().startOf('day').fromNow();        // 15 小时前
moment().startOf('day')                   //获取今天0时0分0秒
moment().startOf('week')                  //获取本周第一天（周日）0时0分0秒
moment().startOf('isoWeek')               //获取本周周一0时0分0秒
moment().startOf('month')                 //获取当前月第一天0时0分0秒
moment().endOf('day').fromNow();          // 9 小时内
moment().endOf('day')                     //获取今天23小时59分59秒
moment().startOf('hour').fromNow(); 
```

日历时间

```javascript
//2020年9月19号15点为例
moment().subtract(10, 'days').calendar(); // 2020/09/09
moment().subtract(6, 'days').calendar();  // 上星期日14:36
moment().subtract(3, 'days').calendar();  // 上星期三14:36
moment().subtract(1, 'days').calendar();  // 昨天14:36
moment().calendar();                      // 今天14:36
//添加时间
moment().add(1, 'days').calendar();       // 明天14:36
moment().add(3, 'days').calendar();       // 下星期二14:36
moment().add(10, 'days').calendar();      // 2020/09/29
```

获取当前月总天数

```javascript
moment().daysInMonth()
```

比较时间

```javascript
let start_date = moment().subtract(1, 'weeks')
let end_date = moment()

end_date.diff(start_date) // 返回毫秒数

end_date.diff(start_date, 'months') // 0
end_date.diff(start_date, 'weeks') // 1
end_date.diff(start_date, 'days') // 7
start_date.diff(end_date, 'days') // -7
```

转为js原生时间对象

```javascript
let m = moment()
let nativeDate1 = m.toDate()
```

设置时间

```javascript
moment().set('year', 2019)            //设置年份
moment().set('month', 11)             //设置月份
moment().set('date', 15)              //设置某个月中的某一天
moment().set('weekday', 0)            //设置日期为本周第一天（周日）
moment().set('isoWeekday', 1)         // 设置日期为本周周一
moment().set('hours', 12)             //设置小时
moment().set('minutes', 30)           //设置分钟
moment().set('seconds', 30)           //设置秒
```



https://segmentfault.com/a/1190000015240911

## dayjs

由于momentjs不再维护，因此寻找别的js时间库进行时间操作。

dayjs对时间的操作



## bigNumberjs

bignumber.js是一个用于数学计算的库，支持任意精度

clone()

config()

maximum()、minimum()

random([])

实例方法：

plus():加法。minus():减法

.times():乘法    div():除法。.idiv():除法，只返回整数

.mod():取模/取余。.pow():指数运算  .sqrt():开平方

.comparedTo():比较大小

.dp() 精度调整

.integerValue()：取整

.sd()：有效数字

.toFixed()：返回字符串，截取小数点后位数

.toFormat()：数字格式化

.toNumber()：转换为js基础数值类型



## slidev

在线ppt制作





## Robotjs自动化库



控制鼠标移动

```javascript
// Move the mouse across the screen as a sine wave.
var robot = require("robotjs");

// Speed up the mouse.
robot.setMouseDelay(2);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

for (var x = 0; x < width; x++)
{
	y = height * Math.sin((twoPI * x) / width) + height;
	robot.moveMouse(x, y);
}
```

控制键盘输入

```javascript
// Type "Hello World" then press enter.
var robot = require("robotjs");

// Type "Hello World".
robot.typeString("Hello World");

// Press enter.
robot.keyTap("enter");
```

获取屏幕数据

```javascript
// Get pixel color under the mouse.
var robot = require("robotjs");

// Get mouse position.
var mouse = robot.getMousePos();

// Get pixel color in hex format.
var hex = robot.getPixelColor(mouse.x, mouse.y);
console.log("#" + hex + " at x:" + mouse.x + " y:" + mouse.y);
```

## js-导出读取xlsx包

sheetjs

https://github.com/SheetJS/sheetjs

安装

```shell
npm install xlsx
```

读取本地文件

```javascript
// 读取本地excel文件
function readWorkbookFromLocalFile(file, callback) {
	var reader = new FileReader();
	reader.onload = function(e) {
		var data = e.target.result;
		var workbook = XLSX.read(data, {type: 'binary'});
		if(callback) callback(workbook);
	};
	reader.readAsBinaryString(file);
}
```

读取网络文件

```javascript
// 从网络上读取某个excel文件，url必须同域，否则报错
function readWorkbookFromRemoteFile(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function(e) {
		if(xhr.status == 200) {
			var data = new Uint8Array(xhr.response)
			var workbook = XLSX.read(data, {type: 'array'});
			if(callback) callback(workbook);
		}
	};
	xhr.send();
}
```

通过上述代码获取到workbook对象

workbook对象中的`SheetNames`里面保存了所有的sheet名字，然后`Sheets`则保存了每个sheet的具体内容（我们称之为`Sheet Object`）。每一个`sheet`是通过类似`A1`这样的键值保存每个单元格的内容，我们称之为单元格对象（`Cell Object`）

`Sheet Object`表示一张表格，只要不是`!`开头的都表示普通`cell`，否则，表示一些特殊含义，具体如下：

 !ref：表示此sheet所有单元格的范围，如A1到F8

`[!merges]`：存放一些单元格合并信息，是一个数组，每个数组由包含`s`和`e`构成的对象组成，`s`表示开始，`e`表示结束，`r`表示行，`c`表示列；

每一个单元格是一个对象（`Cell Object`），主要有`t`、`v`、`r`、`h`、`w`等字段

- t：表示内容类型，`s`表示string类型，`n`表示number类型，`b`表示boolean类型，`d`表示date类型，等等
- v：表示原始值；
- f：表示公式，如`B2+B3`；
- h：HTML内容
- w：格式化后的内容
- r：富文本内容`rich text`

读取workbook对象

```javascript
// 读取 excel文件
function outputWorkbook(workbook) {
	var sheetNames = workbook.SheetNames; // 工作表名称集合
	sheetNames.forEach(name => {
		var worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
		for(var key in worksheet) {
			// v是读取单元格的原始值
			console.log(key, key[0] === '!' ? worksheet[key] : worksheet[key].v);
		}
	});
}
```

- `XLSX.utils.sheet_to_csv`：生成CSV格式
- `XLSX.utils.sheet_to_txt`：生成纯文本格式
- `XLSX.utils.sheet_to_html`：生成HTML格式
- `XLSX.utils.sheet_to_json`：输出JSON格式

导出xlsx文件

使用插件官方提供的工具类

- `aoa_to_sheet`: 这个工具类最强大也最实用了，将一个二维数组转成sheet，会自动处理number、string、boolean、date等类型数据；
- `table_to_sheet`: 将一个`table dom`直接转成sheet，会自动识别`colspan`和`rowspan`并将其转成对应的单元格合并；
- `json_to_sheet`: 将一个由对象组成的数组转成sheet；



处理单元格合并

```javascript
var aoa = [
	['主要信息', null, null, '其它信息'], // 特别注意合并的地方后面预留2个null
	['姓名', '性别', '年龄', '注册时间'],
	['张三', '男', 18, new Date()],
	['李四', '女', 22, new Date()]
];
var sheet = XLSX.utils.aoa_to_sheet(aoa);
sheet['!merges'] = [
	// 设置A1-C1的单元格合并
	{s: {r: 0, c: 0}, e: {r: 0, c: 2}}
];
openDownloadDialog(sheet2blob(sheet), '单元格合并示例.xlsx');
```

http://blog.haoji.me/js-excel.html#dao-chu-excel

## jquery

jquery是目前使用最广泛的js函数库，在使用JavaScript的网站中，93%使用了jquery，成为了开发者必学的技能

jquery的优势有两个，首先它基本是一个DOM操作工具，可以使操作DOM对象变得异常简单，其次它统一 了不同浏览器的api接口，使得代码能够在所有现代浏览器运行，开发者不用担心浏览器之间的差异了

加载jquery可以使用CDN或者本地获取

```html
<script type = "text/javascript"
        src= "//code.jquery.com/jquery-1.11.0.min.js">
</script>
<script>
   window.jQuery || 
   document.write(
     '<script src="js/jquery-1.11.0.min.js" type="text/javascript"></script>'
   );
</script>
```

jquery的基本思想是“先选中某些网页元素，在对其进行某种处理(find something,do something)”

### 与DOM属性相关的方法

addClass、removeClass、toggleClass

addClass用于添加一个类，removeClass用于移除一个类，toggleClass用于折叠一个类，也就是无就添加，有就移除

```javascript
$('li').addClass('special')
$('li').removeClass('special')
$('li').toggleClass('special')
```

css方法

css方法用于获取或者改变css的属性

```javascript
$("h1").css('fontSize')
$("h1").css({
  'padding-left','20px'
})
```

prop、attr、removeProp、removeAttr方法

attr方法读写网页元素的属性，如a元素的href属性，img的src属性

prop方法读写DOM元素的属性，如nodeName，nodeType、tagName

removeProp方法移除某个DOM属性

removeAttr方法移除某个HTML属性

```javascript
$("a").prop("oldValue",1234).removeProp('oldValue')
$("a").removeAttr("title")
```

data方法

用于在一个DOM对象上存储数据

```javascript
$("body").data("foo",52);
$("body").data("foo")
```

### 与DOM相关的方法

Append、appendTo方法

用于将参数插入当前元素的尾部

用法

```javascript
$('div').append("<p>World</p>")
("<p>World</p>").appendTo("div")
//两种效果相同，<div>hello</div>变为<div>hello <p>World</p></div>
```

prepend、prependTo方法

将参数中的元素变成当前元素的第一个子元素

```javascript
$("p").prepend("hello")
$("<p></p>").prependTo("div")
//<p></p>变为<p>hello</p>
```

After、insertAfter方法

将参数中的元素插在当前元素的后面

```javascript
$("div").after("<p></p>")
$("<p></p>").insertAfter("div")
//两种效果相同，<div></div>变成<div></div><p></p>
```

before、insertBefore方法

将参数中的元素插入到当前元素的前面

```javascript
$("div").before("<p></p>")
$("<p></p>").insertbefore("div")
//两种效果相同，<div></div>变成<p></p><div></div>
```

wrap、wrapAll、unwrap、wrapInner方法

wrap方法将参数中的元素变成当前元素的父元素

unwrap方法移除当前元素的父元素

wrapAll方法为结果集的所有元素，添加一个共同的父元素

wrapInner方法为当前元素的所有子元素添加一个父元素

```javascript
$("p").wrap("<div></div>") //<p></p>变为<div><p></p></div>
$("p").unwrap()   //<div><p></p></div>变为<div></div>
$("p").wrapAll("<div></div>")  // <p></p><p></p>变为<div><p></p><p></p></div>
$("p").wrapInner('<strong></strong>')   //<p>hello</p>变为<p><strong>hello</strong></p>
```

clone方法

clone方法克隆当前元素

```javascript
var clones = $('li').clone();
```

remove、detach、replaceWith方法

remove方法移除并返回一个元素，取消该元素上所有事件的绑定

detach方法移除并返回一个元素，但不取消该元素上所有事件的绑定

replaceWith用参数中的元素替换并返回当前元素，取消当前元素的所有事件的绑定

```javascript
$('p').remove()
$('p').detach()
$('p').replaceWith('<div></div>')
```

### 动画

jquery提供简单的动画效果，但整体不如css强大

jquery提供以下动画效果：

show：显示当前元素

hide：隐藏当前元素

toggle：显示或隐藏当前元素

fadeIn：将当前元素的不透明度逐渐提升到100%

fadeOut：将当前元素的不透明度逐渐降为0%

fadeToggle：以逐渐透明或逐渐不透明的方式折叠显示当前元素

slideDown：以从上向下滑入的方式显示当前元素

slideUp：以从下向上滑出的方式隐藏当前元素

sildeToggle：以垂直滑入或滑出的方式折叠显示当前元素

这些方法可以不带参数使用，也可以使用毫秒或者预定义的关键字或自定义的关键字。预定义的关键字也可以进行修改。

```javascript
$('.hidden').show();
$('.hidden').show(300);
$('.hidden').show('slow');

//修改预定义关键字
jQuery.fx.speeds.fast = 50;
jQuery.fx.speeds.slow = 3000;
jQuery.fx.speeds.normal = 1000;

//使用自定义关键字
jQuery.fx.speeds.blazing = 30;

$('.hidden').show('blazing');
```

stop、delay方法

stop方法表示立即停止执行当前的动画，delay方法接受一个时间参数，表示暂停多少秒之后执行

```javascript
$('#stop').click(function(){
  $(".block").stop();
})
$("#foo").slideUp(300).delay(800).fadeIn(400)
```

animate

除了上面这些，jquery可以使用animate自己写动画效果。

animate接受三个参数，第一个参数是一个对象，表示动画结束时的css属性的值，第二个参数是动画持续的毫秒数。写css属性时，如果带有连字号，则需要使用骆驼拼写法改写；第三个参数表示动画结束时的回调函数

```javascript
$('div').animate({
 		left:'+=50';
  	opacity:0.25;
  	fontSize:'12px'
	},
  300,
  function(){
     console.log('done!');
	}
)
```

### 事件处理

on方法

on方法是jquery事件绑定的统一接口，事件绑定的那些简便方法都是on方法的简写形式，

on方法接受两个参数，第一个是事件名称，第二个是回调函数

```javascript
$('li').on('click',function(e){
    console.log($(this),text());
})
```

为li元素绑定click事件的回调函数

trigger方法

trigger方法用于触发回调函数，它的参数就是事件的名称

```javascript
$('li').trigger('click')
```

off方法

off方法用来移除事件的回调函数

```javascript
$('li').off()
```

### jquery的其他应用

获取浏览器语言

```javascript
var type= navigator.appName;
if (type == "Netscape"){
  var lang = navigator.language;
}else{
  var lang = navigator.userlanguage;
};
var lang = lang.substr(0,2);
if(lang == "zh"){
   window.location.replace('url')
}else if(lang == "en"){
   window.location.replace('url')
}else{
   window.location.replace('url')
}
```

获取浏览器类型




















