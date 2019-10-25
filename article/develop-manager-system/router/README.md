# 动态路由

```javascript
import Vue from 'vue';
import Router from 'vue-router';

import App from "@/App.vue";
import Config from '@/config';

Vue.use(Router);

let routes= [
    {
        path: '/',
        component: App,
        redirect: '/home'
    },
    {
        path: '/home',
        name: '首页',
        component: () => import('@/views/Home.vue')
    }
];

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

let router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    dynamic: false,     // 用来标记动态路由
    routes: routes
});

router.beforeEach((to, from, next) => {
    if (router.options.dynamic) next();
    else {
        router.addRoutes(Config.routes);
        router.options.dynamic = true;
        next(to);
    }

    if (to.name) {
        document.title = `${to.name + ' - '} title`
    }
});

export default router;
```

- dynamic：用来标记动态路由，页面首次加载时进行添加路由，添加完路由后变更为true
- routes：基本全局路由

## beforeEach 实现动态路由

```javascript
import Config from '@/config';

router.beforeEach((to, from, next) => {
    if (router.options.dynamic) next();
    else {
        router.addRoutes(Config.routes);
        router.options.dynamic = true;
        next(to);
    }

    if (to.name) {
        document.title = `${to.name + ' - '} title`
    }
});
```

- 动态路由：页面首次加载时，使用`router.addRoutes()`方法添加路由，同时将我们预先定义的dynamic变量设置为true
- 动态Title：根据不同页面将页面的title动态切换，可以以路由的name作为标题title，也可以在meta字段中定义title

## 解决控制台"重复路由错误"的报错

```javascript
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
```
