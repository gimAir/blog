# 目录结构

::: tip
目录名称一般习惯以复数命名 
:::

```text
src
| - api
| - assets
| - components
| - entity
| - layouts
| - mixins
| - router
| - store
| - styles
| - utils
| - views
| - App.vue
| - config.js
| - main.js
```

- `/src/api`：用于存放项目中所使用到的所有接口，统一管理
- `/src/assets`：用于存放项目中需要被打包的静态资源
- `/src/components`：用于存放Vue组件，里面的组件会被注册为全局组件
- `/src/entity`：用于存放实体类
- `/src/layouts`：用于存放项目布局文件，控制项目的结构层级
- `/src/mixins`：用于存放mixins文件
- `/src/router`：vue-router
- `/src/store`：vuex
- `/src/styles`：用于存放样式相关文件
- `/src/utils`：用于存放工具栏文件
- `/src/views`：用于存放视图文件
- `/src/App.vue`：App.vue文件
- `/src/config.js`：全局配置文件，比如动态路由
- `/src/main.js`：入口文件
