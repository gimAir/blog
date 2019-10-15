# 13 事件

## 13.1 事件流

### 13.1.1 事件冒泡

### 13.1.2 事件捕获

### 13.1.3 DOM事件流

## 13.2 事件处理程序

## 13.3 事件对象

## 13.4 事件类型

## 13.5 内存与性能

在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能。首先，每个函数都是对象，都会占用内存；内存中的对象越多，性能就越差。其次，必须事先指定所有事件处理程序而导致的DOM访问次数，会延迟整个页面的交互就绪时间。

从如何利用好时间处理程序的角度出发，还是有一些方法能够提升性能的。

### 13.5.1 事件委托

```javascript
// html
<ul id="links">
    <li id="doSomething">Do something</li>
    <li id="goSomewhere">Go somewhere</li>
    <li id="sayHi">Say hi</li>
</ul>

// javascript
var lists = document.getElementById("links");

EventUtil.addHandler(list, "click", event => {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    switch(target.id) {
        case "doSomething":
            document.title = "I changed the document's title";
            break;
        case "goSomewhere":
            location.href = "http://www.wrox.com";
            break;
        case "sayHi":
            alert("hi");
            break;
    }
});
```

所有用到按钮的事件（多鼠标事件和键盘事件）都适合采用事件委托技术。

如果可行的话，也可以考虑为document对象添加一个事件处理程序，优点如下：

- document对象很快就可以访问，而且可以在页面生命周期的任何时间点上为它添加事件处理程序（无需等待DOMContentLoaded或load事件）；
- 在页面中设置事件处理程序所需的时间更少，只添加一个事件处理程序所需的DOM引用更少，所花的时间也更少；
- 整个页面占用的内存空间更少，提升整体性能；

适合采用事件委托的时间包括：click、mousedown、mouseup、keydown、keyup和keypress。

### 13.5.2 移除事件处理程序

每当将时间处理程序指定给元素时，运行中的浏览器代码与支持页面交互的JavaScript代码之间就会建立一个连接。这种连接越多，页面执行起来就越慢。

内存中留有那些过时不用的“空事件处理程序”也是造成Web应用程序内存与性能问题的主要原因。

有以下两种情况会有可能造成上述问题：

- 从文档中移除带有事件处理程序的元素时，这可能是通过纯粹的DOM操作，例如使用removeChild()和replaceChild()方法。
- 卸载页面时，没有清理干净事件处理程序（IE8及更早版本问题最多），它们就会滞留在内存中，每次加载完页面再卸载页面时（如刷新），内存中滞留的对象数目就会增加，因为事件处理程序的内存并没有被释放。

## 13.6 模拟事件

## 13.7 总结 & FAQ