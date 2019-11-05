# HtmlWebpackPlugin 使用技巧

## 自动生成打包时间

### vue-cli 2.x

```javascript
// build/webpack.prod.config.js

const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    //  ...略
    plugins:[
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            // 打包时间，index.html中 需要使用 <%= htmlWebpackPlugin.options.buildTime %> 获取
            buildTime: new Date(),
        })
    ]
}
```

```html
<!-- 略 -->

<script>
    var buildTime = '<%= htmlWebpackPlugin.options.buildTime %>';
    //  最终打包编译后 buildTime = Tue Nov 05 2019 15:09:14 GMT+0800 (China Standard Time)
</script>
```

### vue-cli 3.x

```javascript
// vue.config.js

module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 打包时间，index.html中 需要使用 <%= htmlWebpackPlugin.options.buildTime %> 获取
            buildTime: new Date(),
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },
};
```

```html
<!-- 略 -->
<script>
    var buildTime = '<%= htmlWebpackPlugin.options.buildTime %>';
    //  最终打包编译后 buildTime = Tue Nov 05 2019 15:09:14 GMT+0800 (China Standard Time)
</script>
```
