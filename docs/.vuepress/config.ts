// docs/.vuepress/config.ts
import {defineUserConfig} from 'vuepress'
import { mixTheme } from 'vuepress-theme-mix'


export default defineUserConfig({
  lang: 'zh-CN',
  title: '程序人生',
  description: '学如逆水行舟, 不进则退',

  head: [
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `https://cdn.jansora.com/files/uPic/2022/05/11/gyeh8c.jpg` }]
  ],

  // Theme Config
  theme: mixTheme({

    themePlugins: {
      git: true
    },
    // logo: '/images/logo.png',
    title: '程序人生',


    navbar: [
      {
        text: 'Java',
        link: "/java/data-structure/LinkedHashMap.md",
      },
      {
        text: 'MySQL',
        link: "/mysql/basic/explain.md",
      },
      {
        text: '缓存',
        link: "/mysql/basic/explain.md",
      },
      {
        text: '设计模式',
        link: "/design-mode/README.md",
      },
      {
        text: 'Spring',
        link: "/spring/boot/autoconfiguration.md",
      },
      {
        text: '计算机算法',
        link: "/algorithms/data-structure/linked-list.md",
      },
    ],

    sidebar: {
      '/java/data-structure/': [
        {
          type: 'group', text: '数据结构', link: '', children: ['LinkedHashMap.md']
        },
      ],
      '/mysql/basic': [
        {
          type: 'group', text: '基础概念', link: '', children: ['/mysql/basic/explain.md']
        },
      ],
      '/spring/core/': [
        {
          type: 'group', text: 'Spring Core', link: '', children: ['/spring/core/bean.md']
        },
      ],
      '/spring/boot/': [
        {
          type: 'group', text: 'Spring Boot', link: '', children: ['/spring/boot/autoconfiguration.md']
        },
      ],
      '/algorithms/data-structure': [
        {
          type: 'group', text: '数据结构', link: '', children: ['/algorithms/data-structure/linked-list.md', '/algorithms/data-structure/array.md']
        },
      ],
    },

  }),
  plugins: [
    {
      name: "vuepress-plugin-chart",
    },
    {
      name: "@renovamen/vuepress-plugin-mermaid",
    },
    {
      name: "@renovamen/vuepress-plugin-katex",
    },
  ],

})