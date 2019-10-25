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
        displayAllHeaders: true, // 默认值：false
        sidebarDepth: 3,
        nav: [
            {text: "首页", link: "/"},
            {
                text: "笔记",
                items: [
                    {
                        text: '手记',
                        items: [
                            {text: '浏览器', link: '/note/browser/'},
                            {text: 'Javascript', link: '/note/javascript/'},
                            {text: 'Vue.js', link: '/note/vue/'},
                            {text: 'Java', link: '/note/java/'},
                        ]
                    },
                    {
                        text: '文章',
                        items: [
                            {text: '工程化开发管理系统', link: '/article/develop-manager-system/'}
                        ]
                    },
                    {
                        text: "资料",
                        items: [
                            {text: 'Javascript高级程序设计', link: '/resource/javascript-advanced-programming/'}
                        ]
                    },
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
            "/article/develop-manager-system/": [
                {
                    title: '准备工作',
                    path: '/article/develop-manager-system/prepare/'
                },
                {
                    title: '目录结构',
                    path: '/article/develop-manager-system/directory/'
                },
                {
                    title: 'vue-router 动态路由',
                    path: '/article/develop-manager-system/router/'
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
