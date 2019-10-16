module.exports = {
    title: "Blog",
    description: "笔记整理、资料记录",
    head: [
        ['link', {'rel': 'icon', href: '/favicon.ico'}]
    ],
    port: 7000,
    lastUpdated: "最后更新：",
    base: '/blog/',
    themeConfig: {
        nav: [
            {text: "首页", link: "/"},
            {
                text: "笔记",
                items: [
                    {text: 'Javascript', link: '/note/javascript/'},
                    {text: 'Vue.js', link: '/note/vue/'},
                    {text: 'Java', link: '/note/java/'},
                    {text: '工程化开发管理系统', link: '/note/develop-manager-system/'}
                ]
            },
            {
                text: "资料",
                items: [
                    {text: 'Javascript高级程序设计', link: '/resource/javascript-advanced-programming/'}
                ]
            },
            {text: "Github", link: "https://github.com/gimAir/javascript"},
        ],
        sidebar: {
            "/note/vue/": [
                {
                    title: "生命周期",
                    path: "/note/vue/lifecycle/",
                }
            ],
            "/note/develop-manager-system/": [
                {
                    title: '前言简介',
                    path: '/note/develop-manager-system/introduce/',
                },
                {
                    title: '项目设计',
                    path: '/note/develop-manager-system/design/'
                },
                {
                    title: '目录结构',
                    path: '/note/develop-manager-system/directory/'
                },
                {
                    title: '动态路由',
                    path: '/note/develop-manager-system/router/'
                }
            ],
            "/resource/javascript-advanced-programming/": [
                {
                    title: "04 变量、作用域和内存问题",
                    path: "/resource/javascript-advanced-programming/04/",
                },
                {
                    title: "05 引用类型",
                    path: "/resource/javascript-advanced-programming/05/",
                },
                {
                    title: "06 面向对象的程序设计",
                    path: "/resource/javascript-advanced-programming/06/",
                },
                {
                    title: "07 函数表达式",
                    path: "/resource/javascript-advanced-programming/07/",
                },
                {
                    title: "13 事件",
                    path: "/resource/javascript-advanced-programming/13/",
                },
            ]
        },
    },
    markdown: {
        lineNumbers: true
    }
};
