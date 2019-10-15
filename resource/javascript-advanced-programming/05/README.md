# 5 引用类型

## 5.1 Object类型

## 5.2 Array类型

## 5.3 Date类型

## 5.4 RegExp类型

## 5.5 Function类型

### 5.5.5 函数属性和方法

在 ECMAScript 中的函数是对象，因此函数也有属性和方法。每个函数都包含两个属性： length 和 prototype。

- length属性表示函数希望接受的命名参数的个数；
- 对于 ECMAScript 中的引用类型而言，prototype 是保存它们所有实例方法的真正所在。就是比如 toString() 和 valueOf() 等方法实际上都是保存在 prototype 名下，只不过是通过各自对象的实例访问罢了。

每个函数都包含两个非继承而来的方法： apply() 和 call()。作用都是在特定的作用域中调用函数，实际上等于设置函数体内 this 对象的值。

- apply() 方法接受两个参数：一个是在其中运行函数的作用域，另一个是参数数组（可以是 Array 的实例，也可以是 arguments 对象）；

```javascript
function sum(num1, num2) {
    return num1 + num2;  
}

function callSum1(num1, num2) {
  return sum.apply(this, arguments);
}

function callSum2(num1, num2) {
  return sum.apply(this, [num1, num2]);
}

console.log(callSum1(10, 10));  // 20
console.log(callSum2(10, 10));  // 20
```

- call() 方法与 apply() 方法相同，区别在于接受参数的方式：第一个参数是 this 没有变，其余传递给函数的参数必须逐个列出来；

```javascript
function sum(num1, num2) {
    return num1 + num2;  
}

function callSum(num1, num2) {
    return sum.call(this, num1, num2);  
}

console.log(callSum(10, 10));   // 20
```

实际上 apply() 和 call() 真正强大之处是扩充函数赖以运行的作用域。

```javascript
window.color = 'red';
var object = {color: 'blue'};

function sayColor() {
  console.log(this.color);
}

sayColor();             // 'red'
sayColor.call(this);    // 'red'
sayColor.call(window);  // 'red'
sayColor.call(object);  // 'blue'
```

- ES5 还定义了一个方法：bind() 。前面我们是先将 sayColor() 函数放到对象 object 中，然后再通过 object 来调用该函数，而使用bind() 方法就不需要这样了。

```javascript
window.color = 'red';
var object = {color: 'blue'};

function sayColor() {
  console.log(this.color);
}

var objectSayColor = sayColor.bind(object);
objectSayColor();   // 'blue'，这里的作用域都是为 object。
```

## 5.6 基本包装类型

## 5.7 单体内置对象

## 5.8 总结 & FAQ
