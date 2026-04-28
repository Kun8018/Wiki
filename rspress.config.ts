import { defineConfig } from 'rspress/config';

export default defineConfig({
  title: "Kun's Wiki",
  description: 'meta的描述内容',
  base: '/',
  themeConfig: {
    lastUpdatedText: 'Last Updated',
    nav: [
      {
        text: '关于',
        link: '/关于/',
      },
      {
        text: '技术',
        link: '/tech/',
      },
      {
        text: '科学研究',
        link: '/科学研究/',
      },
      {
        text: '业余研究',
        link: '/业余研究/',
      },
      {
        text: '其他',
        link: '/其他/',
      },
      {
        text: '英语',
        link: '/英语/',
      },
      {
        text: '年终总结',
        link: '/年终总结/',
      },
      {
        text: 'Github',
        link: 'https://www.github.com/kun8018',
      },
    ],
    sidebar: {
      '/关于/': [
        {
          text: '关于',
          items: [
            {
              text: 'about',
              link: '/关于/about',
            },
            {
              text: '大学记',
              link: '/关于/大学记',
            },
            {
              text: '普罗斯特问卷',
              link: '/关于/普罗斯特问卷',
            },
          ],
        }
      ],
      '/tech/': [
        {
          text: '前端技术',
          items: [
            {
              text: 'fe',
              link: '/tech/fe',
            },
            {
              text: '进阶前端技术',
              link: '/tech/进阶前端技术',
              items: [
                {
                  text: 'H5游戏开发',
                  link: '/tech/进阶前端技术/H5游戏开发',
                },
                {
                  text: '前端低代码:BI',
                  link: '/tech/进阶前端技术/前端低代码:BI',
                },
                {
                  text: '前端富文本',
                  link: '/tech/进阶前端技术/前端富文本',
                },
                {
                  text: '前端工程化一',
                  link: '/tech/进阶前端技术/前端工程化一',
                },
                {
                  text: '前端工程化二',
                  link: '/tech/进阶前端技术/前端工程化二',
                },
                {
                  text: '前端工程化三',
                  link: '/tech/进阶前端技术/前端工程化三',
                },
                {
                  text: '前端工程化四',
                  link: '/tech/进阶前端技术/前端工程化四',
                },
                {
                  text: '前端工程化六e2e',
                  link: '/tech/进阶前端技术/前端工程化六e2e',
                },
                {
                  text: '前端工程化七单测',
                  link: '/tech/进阶前端技术/前端工程化七单测',
                },
                {
                  text: '前端工程化八cicd',
                  link: '/tech/进阶前端技术/前端工程化八cicd',
                },
                {
                  text: '前端数据可视化',
                  link: '/tech/进阶前端技术/前端数据可视化',
                },
                {
                  text: '前端数据可视化二',
                  link: '/tech/进阶前端技术/前端数据可视化二',
                },
                {
                  text: '前端数据可视化三',
                  link: '/tech/进阶前端技术/前端数据可视化三',
                },
                {
                  text: '前端数据可视化四',
                  link: '/tech/进阶前端技术/前端数据可视化四',
                },
                {
                  text: '前端进阶三',
                  link: '/tech/进阶前端技术/前端进阶三',
                },
                {
                  text: '前端进阶四',
                  link: '/tech/进阶前端技术/前端进阶四',
                },
                {
                  text: '前端进阶五',
                  link: '/tech/进阶前端技术/前端进阶五',
                },
                {
                  text: '前端进阶六',
                  link: '/tech/进阶前端技术/前端进阶六',
                },
                {
                  text: '前端进阶八',
                  link: '/tech/进阶前端技术/前端进阶八',
                },
                {
                  text: '前端进阶九',
                  link: '/tech/进阶前端技术/前端进阶九',
                },
                {
                  text: '前端进阶十',
                  link: '/tech/进阶前端技术/前端进阶十',
                },
                {
                  text: '前端进阶十一',
                  link: '/tech/进阶前端技术/前端进阶十一',
                },
              ],
            },
          ],
        },
        {
          text: '框架',
          items: [
            {
              text: 'JavaScript',
              link: '/tech/Javascript',
              items: [
                {
                  text: 'JavaScript手写',
                  link: '/tech/Javascript/JavaScript手写',
                },
                {
                  text: 'JavaScript手写二',
                  link: '/tech/Javascript/JavaScript手写二',
                },
                {
                  text: 'Node',
                  link: '/tech/Javascript/Node',
                },
                {
                  text: 'Node2',
                  link: '/tech/Javascript/Node2',
                },
                {
                  text: 'Node3',
                  link: '/tech/Javascript/Node3',
                },
                {
                  text: 'Node4',
                  link: '/tech/Javascript/Node4',
                },
                {
                  text: 'Node5',
                  link: '/tech/Javascript/Node5',
                },
                {
                  text: 'Node6',
                  link: '/tech/Javascript/Node6',
                },
                {
                  text: 'Node7',
                  link: '/tech/Javascript/Node7',
                },
                {
                  text: 'Node8',
                  link: '/tech/Javascript/Node8',
                },
                {
                  text: 'Node9',
                  link: '/tech/Javascript/Node9',
                },
                {
                  text: 'Node10',
                  link: '/tech/Javascript/Node10',
                },
                {
                  text: 'Node11',
                  link: '/tech/Javascript/Node11',
                },
                {
                  text: 'Node12',
                  link: '/tech/Javascript/Node12',
                },
                {
                  text: 'Node13',
                  link: '/tech/Javascript/Node13',
                },
              ],
            },
            {
              text: 'React',
              link: '/tech/react',
              items: [
                {
                  text: 'react',
                  link: '/tech/react/react',
                },
                {
                  text: 'react2',
                  link: '/tech/react/react2',
                },
                {
                  text: 'react3',
                  link: '/tech/react/react3',
                },
                {
                  text: 'react4',
                  link: '/tech/react/react4',
                },
                {
                  text: 'react5',
                  link: '/tech/react/react5',
                },
                {
                  text: 'react6',
                  link: '/tech/react/react6',
                },
                {
                  text: 'react7',
                  link: '/tech/react/react7',
                },
                {
                  text: 'react8',
                  link: '/tech/react/react8',
                },
                {
                  text: 'react9',
                  link: '/tech/react/react9',
                },
                {
                  text: 'react10',
                  link: '/tech/react/react10',
                },
                {
                  text: 'react11',
                  link: '/tech/react/react11',
                },
                {
                  text: 'react12',
                  link: '/tech/react/react12',
                },
                {
                  text: 'react13',
                  link: '/tech/react/react13',
                },
                {
                  text: 'reactnative',
                  link: '/tech/react/reactnative',
                },
              ],
            },
            {
              text: 'Vue',
              link: '/tech/vue',
              items: [
                {
                  text: 'vue',
                  link: '/tech/vue/vue',
                },
                {
                  text: 'vue2',
                  link: '/tech/vue/vue2',
                },
                {
                  text: 'vue3',
                  link: '/tech/vue/vue3',
                },
                {
                  text: 'vue4',
                  link: '/tech/vue/vue4',
                },
                {
                  text: 'vuepress',
                  link: '/tech/vue/vuepress',
                },
              ],
            },
          ],
        },
        {
          text: '后端',
          items: [
            {
              text: 'Go',
              link: '/tech/go',
              items: [
                {
                  text: 'Go',
                  link: '/tech/go/Go',
                },
                {
                  text: 'Go2',
                  link: '/tech/go/Go2',
                },
                {
                  text: 'Go3',
                  link: '/tech/go/Go3',
                },
                {
                  text: 'Go4',
                  link: '/tech/go/Go4',
                },
                {
                  text: 'Go5',
                  link: '/tech/go/Go5',
                },
                {
                  text: 'Go6',
                  link: '/tech/go/Go6',
                },
                {
                  text: 'Go8',
                  link: '/tech/go/Go8',
                },
                {
                  text: 'Go9',
                  link: '/tech/go/Go9',
                },
                {
                  text: 'Go10',
                  link: '/tech/go/Go10',
                },
                {
                  text: 'Go11',
                  link: '/tech/go/Go11',
                },
                {
                  text: 'Go12',
                  link: '/tech/go/Go12',
                },
                {
                  text: 'Go13',
                  link: '/tech/go/Go13',
                },
              ],
            },
            {
              text: '服务器技术',
              link: '/tech/服务器技术',
              items: [
                {
                  text: 'SpingBoot',
                  link: '/tech/服务器技术/SpingBoot',
                },
                {
                  text: 'docker',
                  link: '/tech/服务器技术/docker',
                },
                {
                  text: 'linux',
                  link: '/tech/服务器技术/linux',
                },
                {
                  text: 'linux2',
                  link: '/tech/服务器技术/linux2',
                },
              ],
            },
          ],
        },
        {
          text: '其他技术',
          items: [
            {
              text: '数据库相关',
              link: '/tech/数据库相关',
              items: [
                {
                  text: 'MySql',
                  link: '/tech/数据库相关/MySql',
                },
                {
                  text: 'MySql2',
                  link: '/tech/数据库相关/MySql2',
                },
                {
                  text: 'MySql3',
                  link: '/tech/数据库相关/MySql3',
                },
                {
                  text: 'MySql4',
                  link: '/tech/数据库相关/MySql4',
                },
              ],
            },
            {
              text: 'K8s',
              link: '/tech/k8s',
              items: [
                {
                  text: 'k8s',
                  link: '/tech/k8s/k8s',
                },
                {
                  text: 'k8s2',
                  link: '/tech/k8s/k8s2',
                },
                {
                  text: 'k8s3',
                  link: '/tech/k8s/k8s3',
                },
                {
                  text: 'k8s4',
                  link: '/tech/k8s/k8s4',
                },
                {
                  text: 'k8s5',
                  link: '/tech/k8s/k8s5',
                },
                {
                  text: 'k8s6',
                  link: '/tech/k8s/k8s6',
                },
                {
                  text: 'k8s7',
                  link: '/tech/k8s/k8s7',
                },
                {
                  text: 'k8s8',
                  link: '/tech/k8s/k8s8',
                },
                {
                  text: 'k8s9',
                  link: '/tech/k8s/k8s9',
                },
                {
                  text: 'k8s10',
                  link: '/tech/k8s/k8s10',
                },
              ],
            },
            {
              text: '桌面端开发',
              link: '/tech/桌面端开发',
              items: [
                {
                  text: 'Electron',
                  link: '/tech/桌面端开发/Electron',
                },
                {
                  text: 'Electron2',
                  link: '/tech/桌面端开发/Electron2',
                },
              ],
            },
            {
              text: '移动端',
              link: '/tech/移动端',
              items: [
                {
                  text: 'H5游戏开发',
                  link: '/tech/移动端/H5游戏开发',
                },
                {
                  text: 'flutter',
                  link: '/tech/移动端/flutter',
                },
                {
                  text: 'flutter2',
                  link: '/tech/移动端/flutter2',
                },
                {
                  text: 'flutter3',
                  link: '/tech/移动端/flutter3',
                },
                {
                  text: 'flutter4',
                  link: '/tech/移动端/flutter4',
                },
                {
                  text: 'h5',
                  link: '/tech/移动端/h5',
                },
                {
                  text: 'h52',
                  link: '/tech/移动端/h52',
                },
                {
                  text: 'swift',
                  link: '/tech/移动端/swift',
                },
              ],
            },
            {
              text: '周边开发技术',
              link: '/tech/周边开发技术',
              items: [
                {
                  text: 'gatsbyjs',
                  link: '/tech/周边开发技术/gatsbyjs',
                },
                {
                  text: 'gatsbyjs2',
                  link: '/tech/周边开发技术/gatsbyjs2',
                },
                {
                  text: 'git',
                  link: '/tech/周边开发技术/git',
                },
                {
                  text: 'git2',
                  link: '/tech/周边开发技术/git2',
                },
                {
                  text: 'git3',
                  link: '/tech/周边开发技术/git3',
                },
                {
                  text: 'hexo',
                  link: '/tech/周边开发技术/hexo',
                },
                {
                  text: '前后端开发概述',
                  link: '/tech/周边开发技术/前后端开发概述',
                },
                {
                  text: '前后端开发概述(二)',
                  link: '/tech/周边开发技术/前后端开发概述(二)',
                },
                {
                  text: '前后端开发概述(三)',
                  link: '/tech/周边开发技术/前后端开发概述(三)',
                },
                {
                  text: '前后端开发概述(四)',
                  link: '/tech/周边开发技术/前后端开发概述(四)',
                },
              ],
            },
            {
              text: '算法',
              link: '/tech/算法',
              items: [
                {
                  text: '算法题1',
                  link: '/tech/算法/算法题1',
                },
                {
                  text: '算法题2',
                  link: '/tech/算法/算法题2',
                },
                {
                  text: '算法题3',
                  link: '/tech/算法/算法题3',
                },
                {
                  text: '算法题4',
                  link: '/tech/算法/算法题4',
                },
                {
                  text: '算法题5',
                  link: '/tech/算法/算法题5',
                },
              ],
            },
            {
              text: '静态语言',
              link: '/tech/静态语言',
              items: [
                {
                  text: 'HTML:CSS',
                  link: '/tech/静态语言/HTML:CSS',
                },
                {
                  text: 'HTML:CSS2',
                  link: '/tech/静态语言/HTML:CSS2',
                },
                {
                  text: 'HTML:CSS3',
                  link: '/tech/静态语言/HTML:CSS3',
                },
                {
                  text: 'HTML:CSS4',
                  link: '/tech/静态语言/HTML:CSS4',
                },
                {
                  text: 'HTML:CSS6',
                  link: '/tech/静态语言/HTML:CSS6',
                },
              ],
            },
            {
              text: 'Rust',
              link: '/tech/rust',
              items: [
                {
                  text: 'rust',
                  link: '/tech/rust/rust',
                },
                {
                  text: 'rust2',
                  link: '/tech/rust/rust2',
                },
                {
                  text: 'rust3',
                  link: '/tech/rust/rust3',
                },
                {
                  text: 'rust4',
                  link: '/tech/rust/rust4',
                },
                {
                  text: 'rust5',
                  link: '/tech/rust/rust5',
                },
                {
                  text: 'rust6',
                  link: '/tech/rust/rust6',
                },
              ],
            },
          ],
        },
      ],
      '/科学研究/': [
        {
          text: '科学研究',
          items: [
            {
              text: 'phd-Robot',
              link: '/科学研究/phd-Robot',
            },
            {
              text: 'phd-Robot2',
              link: '/科学研究/phd-Robot2',
            },
            {
              text: 'phd-Robot3',
              link: '/科学研究/phd-Robot3',
            },
            {
              text: 'phd-Robot4',
              link: '/科学研究/phd-Robot4',
            },
            {
              text: 'phd-Robot5',
              link: '/科学研究/phd-Robot5',
            },
            {
              text: 'phd-Robot6',
              link: '/科学研究/phd-Robot6',
            },
            {
              text: 'phd-Robot-classic',
              link: '/科学研究/phd-Robot-classic',
            },
            {
              text: 'phd-Robot-classic2',
              link: '/科学研究/phd-Robot-classic2',
            },
            {
              text: 'phd-Robot-classic3',
              link: '/科学研究/phd-Robot-classic3',
            },
            {
              text: 'phd-Robot14',
              link: '/科学研究/phd-Robot14',
            },
            {
              text: 'phd-Robot15',
              link: '/科学研究/phd-Robot15',
            },
            {
              text: 'phd-Robot16',
              link: '/科学研究/phd-Robot16',
            },
            {
              text: 'phd-Robot17',
              link: '/科学研究/phd-Robot17',
            },
            {
              text: 'phd-Robot18',
              link: '/科学研究/phd-Robot18',
            },
            {
              text: 'phd-Robot19',
              link: '/科学研究/phd-Robot19',
            },
            {
              text: 'phd-Robot20',
              link: '/科学研究/phd-Robot20',
            },
            {
              text: 'phd-Robot21',
              link: '/科学研究/phd-Robot21',
            },
            {
              text: 'phd-Robot-2024',
              link: '/科学研究/phd-Robot-2024',
            },
            {
              text: 'phd-Robot-2025',
              link: '/科学研究/phd-Robot-2025',
            },
            {
              text: 'phd-Robot-2026',
              link: '/科学研究/phd-Robot-2026',
            },
            {
              text: 'phd-ROS',
              link: '/科学研究/phd-ROS',
            },
            {
              text: 'phd-ROS2',
              link: '/科学研究/phd-ROS2',
            },
            {
              text: 'phd-HCI',
              link: '/科学研究/phd-HCI',
            },
          ],
        }
      ],
      '/业余研究/': [
        {
          text: '业余研究',
          items: [
            {
              text: '摄影',
              link: '/业余研究/摄影',
            },
            {
              text: '日语学习与托福学习',
              link: '/业余研究/日语学习与托福学习',
            },
            {
              text: '人的生理学和心理学小知识',
              link: '/业余研究/人的生理学和心理学小知识',
            },
            {
              text: '历史',
              link: '/业余研究/历史',
            },
          ],
        }
      ],
      '/其他/': [
        {
          text: '其他',
          items: [
            {
              text: 'Extiction',
              link: '/其他/Extiction',
            },
          ],
        }
      ],
      '/英语/': [
        {
          text: '英语',
          items: [
            {
              text: 'Ielts_2',
              link: '/英语/Ielts_2',
            },
          ],
        }
      ],
      '/年终总结/': [
        {
          text: '年终总结',
          items: [
            {
              text: '2020新年总结',
              link: '/年终总结/2020新年总结',
            },
            {
              text: '2021新年总结',
              link: '/年终总结/2021新年总结',
            },
            {
              text: '2022新年总结',
              link: '/年终总结/2022新年总结',
            },
            {
              text: '2023新年总结',
              link: '/年终总结/2023新年总结',
            },
          ],
        }
      ],
    },
  },
  markdown: {
    lineNumbers: true,
  },
});
