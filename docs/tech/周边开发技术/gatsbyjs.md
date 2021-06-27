---
title: Gatsbyjs
date: 2020-08-02 21:40:33
categories: 技术博客
tags: IT、小程序、H5App
toc: true
thumbnail: http://cdn.kunkunzhang.top/gatsbyjs.png
---

　　Gatsbyjs是基于react的现代化网站生成工具。利用React+GraphQL快速产生多页面应用。传统的快速博客如hexo、jeklly是基于restful的静态网站页面，如果博客数量较多时首屏加载页面比较慢。基于这样的考虑，换用gatsbyjs。

<!--more-->   

## 安装

安装gatsby-cli工具

```npm
npm install -g gatsby-cli
```

检查是否安装成功

```gatsby
gatsby -help
```

## 启动

新建项目

```gas
gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world
```

切换到项目目录启动

```gas
cd hello-world
gatsby develop
```

在本地访问localhost:8000访问

## 新建页面、页面跳转



```javascript
import { Link } from "gatsby"

<Link to="/contact/">Contact</Link>
```





## 获取数据

gatsby默认使用graphql获取数据，启动gatsby后graphql的地址为

```gas
http://localhost:8000/___graphql
```



## 插件

### 嵌套布局插件



```shell
npm install --save gatsby-plugin-typography react-typography typography typography-theme-fairy-gates
```





### 文件插件

安装插件gatsby-source-filesystem

```shell
npm install --save gatsby-source-filesystem
```

在gatsby-config.js中配置

```js
module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
```

### markdown转html插件

安装插件

```shell
npm install --save gatsby-transformer-remark
```

在gatsby-config.js中配置插件

```javascript
plugins:[
	`gatsby-transformer-remark`,  
]
```

在graphql接口下打开



## API

[`createPages`](https://www.gatsbyjs.cn/docs/node-apis/#createPages)和[`onCreateNode`](https://www.gatsbyjs.cn/docs/node-apis/#onCreateNode) 

创建页面链接

```javascript
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  console.log(JSON.stringify(result, null, 4))
}
```



## 页面部署

生成静态页面

生成html和js文件

``` gas
gatsby build
```

生成的文件在public目录下

在本地查看生产版本

```gas
gatsby serve
```

## 使用css

使用bulma

安装bulma

```shell
yarn add bulma node-sass gatsby-plugin-sass
```

配置gatsby.config.js

```javascript
plugins: [`gatsby-plugin-sass`],
```

在页面引入

```jsx
@import "~bulma/bulma.sass";
```



## 资源

https://juejin.cn/post/6844903999024398343





## NetlifyCMS内容管理





## Netlify托管平台

[Netlify](https://link.zhihu.com/?target=https%3A//www.netlify.com/) 是一个提供静态资源网络托管的综合平台，提供CI服务，能够将托管 GitHub，GitLab 等网站上的 Jekyll，Hexo，Hugo 等代码自动编译并生成静态网站。

Netlify 有如下的功能:

- 能够托管服务，免费 CDN
- 能够绑定自定义域名
- 能够启用免费的TLS证书，启用HTTPS
- 支持自动构建
- 提供 Webhooks 和 API

注册使用GitHub账号注册即可

首先使用你的 GitHub 账号登陆 Netlify，登陆后进入空间管理中心，，点击`New site from git`按钮开始部署你的博客：





