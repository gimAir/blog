# 生命周期
> 生命周期中主要了解两个部分data（包括属性、方法、watch监听事件或event事件回调）和el（可理解为template、dom或html等）

![生命周期图示](/images/note_vue_lifecycle.png)

## beforeCreate
此时data还未进行初始化，template中模板也还未初始化。

## created
此时data已经初始化，但是template中的模板还未渲染成html，无法进行dom操作。

通常情况下，页面 ***向服务器获取数据、调用接口等*** 在此处执行。

## beforeMount
此时data初始化已完成，template中模板进行初始化，render函数首次被执行。

## mounted区别
此时template中的模板已经渲染完成，可以进行dom操作。

通常情况下，需要 ***对dom进行操作或初始化一些插件（如图表）等*** 在此处执行。

## 相关问题

#### 1.定义在全局变量的值赋值给data中的变量页面跳转后，值没有初始化

```vue
<template>
    <div>
        <!--3.页面进入显示为'Hello'-->
        <p>{{msg}}</p>
        <!--4.点击改变按钮，显示为'Hello world!'-->
        <button @click="() => msg = 'Hello world!'">改变</button>
    </div>
</template>

<script>
    let msg = "Hello";  // 1.在这里定义了变量msg初始值为Hello
    
    export default {
        data(){
            return {
                msg     // 2.将msg变量赋值到vue实例中去
            }
        }
    }
</script>
```

出现问题：执行完第4步操作后，随便跳转一个页面（不刷新）再跳转回来，p标签显示的内容为'Hello world'，值没有初始化。

原因分析：***定义在vue页面实例中的变量在vue页面跳转时会经过一系列vue生命周期（初始化值、更新值、销毁值等...）变化，而定义在全局的变量只有在页面进行刷新时才会进行值得初始化。***

此题出现的问题是，点击改变按钮后，定义在全局的msg变量变更为'Hello world'；接着进行页面跳转（不刷新），虽然在vue实例中的变量msg进行了生命周期的变化，但其值来自于全局变量msg，而全局变量msg在没有刷新页面的情况下不会进行初始化，所以页面跳转回来页面p标签中msg显示的内容仍然为'Hello world'。
