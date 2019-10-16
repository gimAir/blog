# 动态路由

很多时候控制台系统的路由是需要根据登录用户的权限来生成，所以这时候需要动态路由来实现。

```javascript
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    initialized: false,     // 用来标记动态路由
    routes: routes
});

export default router;
```

## 全局路由

```javascript
import LayoutView from "@/layouts/LayoutView";

let routes= [
    {
        path: '/',
        name: '主页',
        component: LayoutView,
        redirect: '/home'
    },
    {
        path: '/home',
        name: '首页',
        component: () => import('@/views/Home.vue')
    }
]
```

## 添加路由

`router.addRoutes()`，自定义一个变量来判断页面是否已经进行动态路由添加。

```javascript
import Config from '@/config';

router.beforeEach((to, from, next) => {
    if (router.options.initialized) next();
    else {
        router.addRoutes(Config.routes);
        router.options.initialized = true;
        next(to);
    }

    if (to.name) {
        document.title = `${to.name + ' - '} title`
    }
});
```

## 解决控制台 重复路由错误 的报错
```javascript
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
```
