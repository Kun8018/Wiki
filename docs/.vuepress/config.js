module.exports = {

    plugins: ['autobar'],
        title: "Kun's Wiki",
        description: 'meta的描述内容',
    
        serviceWorker: true,
        // 注入到当前页面的 HTML <head> 中的标签
    
        head: [
            ['link', {
                rel: 'icon',
                href: '/favicon.ico'
            }], // 增加一个自定义的 favicon(网页标签的图标)
        ],
    
        base: '/', 
    
        markdown: {
            lineNumbers: true // 代码块显示行号
        },
    
        themeConfig: {
            nav: [
                {
                    text: '关于',
                    link: '/about/'
                },
                {
                    text: '技术',
                    link: '/tech/' 
                },
                {
                    text: '科研',
                    link: '/research/'
                },
    
                {
                    text: '摄影',
                    link: '/shoot/'
                },
                { 
                    text: 'Github', 
                    link: 'https://www.github.com/kun8018' },
            ],
    
            sidebar: {
                '/docs/about/': ["android1",],
                '/tech/fe': [ 
                    {
                        title: '测试菜单1',   // 一级菜单名称
                        collapsable: false, // false为默认展开菜单, 默认值true是折叠,
                        sidebarDepth: 1,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
                        children: [
                            ['react.md', '子菜单1'],  //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
                        ]
                    }, 
                ],
                '/摄影/': [''],
                '/log/': [''],
            },
            sidebarDepth: 3,
            lastUpdated: 'Last Updated'
        },
    
    };