module.exports = {
    title: "Blog",
    description: "笔记整理、资料记录",
    port: 7000,
    lastUpdated: "最后更新：",
    themeConfig: {
        nav: [
            {text: "首页", link: "/"},
            {text: "笔记", link: "/note/"},
            {text: "资料", link: "/resource/"},
            {text: "Github", link: "https://github.com/gimAir/javascript"},
        ],
        sidebar: {
            "/note/": [
                {
                    title:"经验分享",
                    path:"/note/"
                },
                {
                    title: "Javascript",
                    path: "/note/javascript/"
                },
                {
                    title: "Vue",
                    path: "/note/vue/",
                    children: [
                        {
                            title: "生命周期",
                            path: "/note/vue/lifecycle/",
                        }
                    ]
                },
                {
                    title: "Java",
                    path: "/note/java/"
                },
            ],
            "/resource/": [
                {
                    title: "Javascript高级程序设计",
                    path: "/resource/javascript-advanced-programming/",
                    children: [
                        {
                            title: "4 变量、作用域和内存问题",
                            path: "/resource/javascript-advanced-programming/04/",
                        },
                        {
                            title: "5 引用类型",
                            path: "/resource/javascript-advanced-programming/05/",
                        },
                        {
                            title: "6 面向对象的程序设计",
                            path: "/resource/javascript-advanced-programming/06/",
                        },
                        {
                            title: "7 函数表达式",
                            path: "/resource/javascript-advanced-programming/07/",
                        },
                        {
                            title: "13 事件",
                            path: "/resource/javascript-advanced-programming/13/",
                        },
                    ]
                }
            ]
        },
    }
};
