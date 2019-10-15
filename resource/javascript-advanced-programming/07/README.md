# 7 函数表达式

定义函数的方式有两种： **函数声明** 和 **函数表达式**。

- 函数声明，重要特征就是 **函数声明提升**：在执行代码之前会先读取函数声明，这也就意味着可以把函数声明放在调用语句后面。

```javascript
functionName();                 // 不会抛出错误，正常运行
function functionName(arg0, agr1, arg3) {
  // 函数体
}

console.log(functionName.name); // 'functionName'
```

- 函数表达式，有很多不同语法，其中 **匿名函数** 是常见的形式（因为匿名函数后面没有标识符，而且匿名函数的 name 是空字符串）。

```javascript
functionName(); // 抛出错误：函数还不存在
var functionName = function(arg0, agr1, arg3) {
    // 函数体
}
```

理解函数提升就是理解函数声明和函数表达式之间的区别。例如：

```javascript
// 错误写法
if (condition) {
    function sayHi() {
      alert('Hi!');
    }
} else {
    function sayHi() {
      alert('Yo!');
    }
}
// 这里大多数浏览器会返回第二个声明，也就是 'Yo!'；而 Firefox浏览器会在 condition 为 true 时返回第一个声明。
```

```javascript
// 正确写法
var sayHi;
if (condition) {
    sayHi = function() {
      alert('Hi!');
    }
} else {
    sayHi = function() {
      alert('Yo!');
    }
}
```

## 7.1 递归

递归函数是在一个函数通过名字调用自身的情况下构成的。

```javascript
function factorial(num) {
  if (num <= 1) return 1;
  else return num * factorial(num - 1);
}

// 如果方式会抛出错误
var anotherFactorial = factorial;
factorial = null;
console.log(anotherFactorial(4)); // 抛出错误
```

抛出错误原因是因为：调用 anotherFactorial 函数时必须要执行 factorial()，但是 factorial = null 后已不再是函数了，所以会导致错误。使用 arguments.callee 可以解决这个问题：

```javascript
function factorial(num) {
  if (num <= 1) return 1;
  else return num * arguments.callee(num - 1);
}
```

在严格模式下访问 arguments.callee 会导致错误，但是可以用命名函数表达式来实现相同效果：

```javascript
var factorial = (function f(num) {
   if (num <= 1) return 1;
   else return num * f(num - 1);
})
```

## 7.2 闭包

首先先清楚 **匿名函数** 和 **闭包** 这两个概念。

闭包指有权访问另一个函数作用域中的变量的函数。创建闭包的常用方式就是在一个函数内部创建另一个函数：

```javascript
function createComparisonFunction(propertyName) {
  return function(obj1, obj2) {
    var value1 = obj1[propertyName];    // 两个内部函数
    var value2 = obj2[propertyName];    // 两个内部函数

    if (value1 < value2) return -1;
    else if (value1 > value2) return 1;
    else return 0;
  };
}
```

value1、value2 都放访问了外部函数中的变量 propertyName。即使这个内部函数被返回了，而且是在其他地方被调用了，但它仍然可以访问变量 propertyName。之所以还能够访问这个变量，是因为内部函数的作用域链中包含 createComparisonFunction() 的作用域。

> 作用域链：当某个函数被调用时，会创建一个执行环境及相应的作用域链。然后使用 arguments 和其他命名参数的值来初始化函数的活动对象（activation object）。但是在作用域链中，外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位，...直至作为作用域链终点的全局环境执行。

一般来讲，当函数执行完毕之后，局部活动对象就会被销毁，内存中仅保存全局作用域（全局执行环境的变量对象）。但是闭包情况又有所不同：在另一个函数内部定义的函数会将包含函数（即外部函数）的活动对象添加到它的作用域链中。

```javascript
var compare = createComparisonFunction("name");
var result = compare({name: 'Nicholas'}, {name: 'Greg'});
```

在匿名函数从createComparisonFunction()中被返回后，它的作用域链被初始化为包含createComparisonFunction()函数的活动对象和全局变量对象。这样匿名函数就可以访问在createComparisonFunction()中定义的所有变量。更重要的是，createComparisonFunction()函数在执行完毕后，其活动对象也不会被销毁仍然留存在内存中，因为匿名函数的作用域链仍在这个引用这个活动对象，直至匿名函数被销毁后。

```javascript
var compare = createComparisonFunction("name");
var result = compare({name: 'Nicholas'}, {name: 'Greg'});

compare = null;
```

> 由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多内存。返回闭包时，注意返回函数不要引用任何循环变量（或后续会变的量）。闭包的变量不保存在栈内存中，而是保存在堆内存中，这也就是函数之后为什么闭包还能引用到函数内的变量。

### 7.2.1 闭包与变量