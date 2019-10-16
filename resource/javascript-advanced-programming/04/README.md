# 4 变量、作用域和内存问题

按照ECMA-262定义，JavaScript变量松散类型的本质，变量只是一个用于保存特定值的名字而已，不存在定义时必须指定某一种数据类型的规则，而且变量的值以及数据类型在脚本的生命周期内可以改变。

## 4.1 基本类型和引用类型的值

ECMAScript变量包含两种不同数据类型的值： **基本类型值** 和 **引用类型值**。基本类型值指的是简单的数据段，而引用数据类型值那些可能由多个值构成的对象。

- 基本数据类型：Undefined、Null、Boolean、Number 和 String，这五种基本数据类型是按值访问的，**因此可以操作保存在变量中实际的值**。

- 引用数据类型：按引用访问的。JavaScript不允许直接访问内存中的位置，也就是说 **不能直接操作对象的内存空间**，在操作对象时，实际上是在操作对象的引用而不是实际的对象。

### 4.1.1 动态的属性

```javascript
let person = {};
person.name = 'Nicholas';
console.log(person.name);   // 'Nicholas'

let name = 'Nicholas';
name.age = 27;
console.log(name.age);      // 不会报错，但只是输出 undefined
```

我们发现给对象 person 添加 name 属性时，没有问题，也调用的到对应的值，而给字符串 name 添加 age 属性时，没有报错，但是调用时输出的为 undefined。这说明了，只能给引用类型值动态的添加属性，以便将来使用。

### 4.1.2 复制变量值

```javascript
let num1 = 5;
let num2 = num1;
num2 = 8;
console.log(num1);          // 5
console.log(num2);          // 8

let obj1 = new Object();
let obj2 = obj1;
obj1.name = 'Nicholas';
console.log(obj2.name);     // 'Nicholas'
```

基本数据类型复制时，会在变量对象上创建一个新的值，然后把该值复制到为新变量分配的位置上，这样一来两个值是完全独立的。

引用数据类型复制时，同样也会将存储在变量对象中的值复制一份放到为新变量分配的空间中，不同的是这个值的副本实际上只一个指针，而这个指针指向存储在堆中的一个对象，这样两个变量引用的都是同一个对象。所以存在修改 obj1 时，obj2 也被修改了。

### 4.1.3 传递参数

ECMAScript中所有的函数的参数传递都是按值传递的，就是把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。基本类型值的传递如同基本类型变量的复制一样，而引用类型类型值的传递则如同引用类型变量的复制一样。

```javascript
function addTen(num) {
  num += 10;
  return num;
}

let count = 20;
let result = addTen(count);     // count是基本类型值，所以进入 addTen() 内部后，num 就是 count 的副本切完全独立，所以 count 不会受影响。
console.log(count);             // 20，不变化
console.log(result);            // 30

function setName(obj) {
  obj.name = 'Nicholas';
}

let person = new Object();
setName(person);                // person对象传入 setName() 内部后，obj 就是 person 的副本，但是因为 person 是引用类型值，所以 obj 和 person 同时指向堆内存中的对象。
console.log(person.name);       // 'Nicholas'
```

为了证明 **对象是按值传递的**，如下例子：

```javascript
function setName(obj) {
  obj.name = 'Nicholas';
  obj = new Object();
  obj.name = 'Greg';
}

let person = new Object();
setName(person);                // 如果 person 是按引用传递的，那么 person 就会自动会被修改为修改其 name 属性的新对象  
console.log(person.name);       // 'Nicholas'，
```

最后输出的值仍然为 'Nicholas'，这说明即使在函数内部修改了参数的值，但原始的引用仍然保持不变。实际上在函数内部重写了 obj 时，这个引用对象就是一个局部对象了，而局部对象会在函数执行完毕后立即被销毁。
*可以吧ECMAScript函数的参数想象成局部变量*

### 4.1.4 检测类型

- typeof 操作符适合用来检测基本数据类型。

```javascript
console.log(typeof 'Nicholas');     // 'string'
console.log(typeof 29);             // 'number'
console.log(typeof true);           // 'boolean'
console.log(typeof undefined);      // 'undefined'
console.log(typeof function(){});   // 'function'
console.log(typeof null);           // 'object'，只能知道是对象，但是不知道是什么类型对象，使用 instanceof 操作符
console.log(typeof {});             // 'object'，只能知道是对象，但是不知道是什么类型对象，使用 instanceof 操作符
console.log(typeof []);             // 'object'，只能知道是对象，但是不知道是什么类型对象，使用 instanceof 操作符
```

- instanceof 操作符，如果变量是给定引用类型的实例，那么返回 true。

```javascript
console.log({} instanceof Object);                  // true
console.log([] instanceof Array);                   // true
console.log(/^\d{3}\-\d{3,8}$/ instanceof RegExp);  // true
```

## 4.2 执行环境及作用域

**执行环境** 定义了变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境中都有一个与之关联的 **变量对象**，环境中定义的所有变量和函数都保存在这个对象中。

全局执行环境是最外围的一个执行环境，在Web浏览器中全局执行环境被认为是 window 对象。

每个函数都有自己的 **执行环境**。当执行流进入一个函数时，函数的环境就会被推入一个环境栈中，而在函数执行后栈将其环境推出，把控制权返回给之前的执行环境。

**作用域链** 的用途是保证对执行环境有权访问的所有变量和函数的 **有序** 访问。全局执行环境的变量对象始终都是作用域链中的最后一个对象。

```javascript
var color = 'blue';

function changeColor() {
  var anotherColor = 'red';
  
  function swapColors() {
    var tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;

    // 这里可以访问 color、anotherColor和tempColor
  }
  
  // 这里可以访问 color和anotherColor，但是访问不到tempColor
  swapColors();
}

// 这里只能访问 color
changeColor();
```

上面例子说明了：内部环境可以通过作用域链访问所有的外部环境，但是外部环境不能访问内部环境中的任何变量和函数。

这些环境之间的联系是线性、有次序的。任何环境都可以通过作用域向上放回变量和函数，但是不能通过向下搜索作用域链来访问另一个执行环境。

> 函数参数也被当做变量来对待，因此其访问规则同执行环境中的其他变量相同。

### 4.2.1 延长作用域链

虽然执行环境只有两种： 全局和局部，但是还是可以通过其他方式来延长作用域链。

延长作用域链：有些语句可以在作用域的前端临时添加一个变量对象，该变量对象会在代码执行后被移除。

- try-catch 语句的 catch 块：在 catch 语句中，会创建一个新对象，其中包含的是被抛出的错误对象的声明。
- with 语句

### 4.2.2 没有块级作用域

```javascript
if (true){
    var color = 'blue';
}

console.log(color);     // 'blue'

for (var i = 0; i < 10; i++) {
    // 略...
}

console.log(i);         // 10
```

因为JavaScript没有块级作用域，所以变量会自动添加到当前执行环境（例子中为全局环境window）。如果实在 C、C++ 或 Java 中，color 会在 if 语句执行完毕后销毁。

#### 4.2.2.1 声明变量

使用 var 声明的变量会自动被添加到最接近的环境中。

```javascript
function add(num1, num2) {
  var sum = num1 + num2;
  return sum;
}

var result = add(10, 20);   // 30
console.log(sum);           // 由于 sum 的执行环境为 add ，所以在全局环境中访问不到 sum，sum 不是有效变量，因此会导致错误。
```

如果省略 var 关键字，那么会这样：

```javascript
function add(num1, num2) {
  sum = num1 + num2;
  return sum;
}

var result = add(10, 20);   // 30
console.log(sum);           // 30
                            // 由于没有添加 var 关键字，调用完 add() 方法后，虽然 add() 执行环境销毁了，但是 sum 被添加到 全局环境中继续存在，所以后面代码依旧可以访问。
                            // 严格模式下会导致错误
```

#### 4.2.2.2 查询标识符

查询标识符的过程：从作用域链的前端开始，向上逐级查找与给定吗名字匹配的标识符。如果在局部环境中查找到了那么停止查找，变量就绪，如果没有找到则沿作用域链向上查找一直追溯到全局环境的变量对象。如果均未找到则意味着该变量尚未声明。

## 4.3 垃圾收集

- **内存回收**

JavaScript具有自动垃圾收集机制，垃圾收集器会每隔一段时间就执行一次释放操作，找出那些不再继续使用的值，然后释放其占用的内存。

1. 局部变量和全局变量的销毁

- 局部变量：局部作用域中，当函数执行完毕，局部变量也就没有存在的必要了，因此垃圾收集器很容易做出判断并回收。
- 全局变量：全局变量什么时候需要自动释放内存空间则很难判断，所以在开发中尽量避免使用全局变量。

2. 以Google的V8引擎为例，V8引擎中所有的JS对象都是通过堆来进行内存分配的

- 初始分配：当声明变量并赋值时，V8引擎就会在堆内存中分配给这个变量。
- 继续申请：当已申请的内存不足以存储这个变量时，V8引擎就会继续申请内存，直到堆的大小达到了V8引擎的内存上限为止。

3. V8引擎对堆内存中的JS对象进行分代管理

- 新生代：存活周期较短的JS对象，如临时变量、字符串等。
- 老生代：经过多次垃圾回收仍然存活，存活周期较长的对象，如主控制器、服务器对象等。

- **垃圾回收算法**

对垃圾回收算法来说，核心思想就是如何判断内存已经不再使用，常用垃圾回收算法有下面两种。

1. 引用计数（现代浏览器不再使用）
2. 标记清除（常用）

### 4.3.1 标记清除

垃圾收集器会在运行的时候给存储在内存中的所有变量都加上标记。然后它会去掉环境中的变量以及被环境中的变量引用的变量的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量以及无法访问到这些变量了。最后垃圾收集器完成内存清除工作，销毁那些带标记的值并回收他们所占用的内存空间。

### 4.3.2 引用计数

引用计数的含义是跟踪记录每一个值被引用的次数。当声明了一个变量并讲一个引用类型赋值给该变量时，则该值的引用次数就是1，如果同一值又被赋给了另一个变量，则该值引用次数加1，反之如果包含这个值引用的变量又取得了另外一个值，则这个值的引用次数减1。当这个值的引用次数变成0时，则没有办法再访问这个值了，因此可以将其占用的内存空间回收回来。

但是，引用计数有一个**致命问题**，那就是循环引用：如果两个对象相互引用，尽管他们已不再使用，但是垃圾回收器不会进行回收，最终可能会导致内存泄露。

### 4.3.3 性能问题

对于持续进行的服务进程，必须及时释放不再用到的内存，否则内存占用会越来越高，轻则影响系统性能，重则导致进程崩溃。对于不再用到的内存，没有及时释放，就叫做**内存泄漏（memory leak）**。

**内存泄漏识别方法**

- 浏览器方法

1. 打开开发者工具，选择 Memory
2. 在右侧的Select profiling type字段里面勾选 timeline
3. 点击左上角的录制按钮。
4. 在页面上进行各种操作，模拟用户的使用情况。
5. 一段时间后，点击左上角的 stop 按钮，面板上就会显示这段时间的内存占用情况。

- 命令行方法
使用 Node 提供的 process.memoryUsage 方法。

```javascript
console.log(process.memoryUsage());
// 输出
//{
//  rss: 27709440,      // resident set size，所有内存占用，包括指令区和堆栈
//  heapTotal: 5685248, // "堆"占用的内存，包括用到的和没用到的
//  heapUsed: 3449392,  // 用到的堆的部分
//  external: 8772      // V8 引擎内部的 C++ 对象占用的内存
//}
```

判断内存泄漏，以heapUsed字段为准。

### 4.3.4 管理内存

分配给 Web 浏览器的可用内存数量通常要比分配给琢磨应用程序的少，目的是为了防止运行 JavaScript 的内存耗尽全部系统内存而导致系统崩溃。

优化内存最佳的方式是：为执行中的代码只保存必要的数据，一旦数据不再有用，最好通过将其值设置为 null 来释放其引用——这个叫做 **解除引用**。这一做法适用于大多数全局变量和全局对象的属性。局部变量会在离开执行环境时自动被解除引用。

```javascript
function createPerson(name) {
  var localPerson = new Object();
  localPerson.name = name;
  return localPerson;
}

var globalPerson = createPerson('Nicholas');

// 手工解除 globalPerson 的引用
globalPerson = null;
```

## 4.4 总结 & FAQ

### 4.4.1 总结

1. 五种基本数据类型：Undefined、Null、Boolean、Number 和 String。

2. 基本类型值和引用类型值特点：

- 基本类型值在内存中占用固定大小的空间，因此保存在栈中；
- 基本类型值的复制，会创建这个值的副本；
- 引用类型的值是对象，保存在堆中；
- 包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针；
- 引用类型值的复制，复制的其实是指针，因此两个变量最终都指向同一个对象；
- 确定一个值是哪种基本类型用 typeof 操作符，而确定一个值是哪种引用类型可以使用 instanceof 操作符；

3. 所有变量（包括基本类型和引用类型）都存在于一个执行环境（也称作用域）：

- 执行环境分：全局执行环境和函数执行环境；
- 每进入一个新执行环境，都会创建一个用于搜索变量和函数的作用域链；
- 函数的局部环境不仅可以访问函数作用域中变量，也可以访问包含其的（父）环境，直至全局；
- 全局环境只能访问在全局环境中定义的函数和变量；
- 变量的执行环境有助于确定合适释放内存；

4. 垃圾收集：

- 离开作用域的值将被自动标记为可回收，将在垃圾收集期间被删除；
- “标记清除”是给当前不适用的值加上标记，然后在回收内存（目前主流垃圾收集算法）；
- “引用计数”在代码中存在循环引用对象时，会出现问题；
- 即使解除不再使用的全局对象、全局对象属性以及循环引用变量的引用，有助于有效回收内存。
