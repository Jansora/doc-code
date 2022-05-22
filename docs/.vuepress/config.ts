// docs/.vuepress/config.ts
import {defineUserConfig} from 'vuepress'
import {mixTheme} from 'vuepress-theme-mix'


export default defineUserConfig({
  lang: 'zh-CN',
  title: '戎码一生',
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
    title: '戎码一生',


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
      '/mysql/': [
        {
          type: 'group', text: '基础概念', link: '', children: ['/mysql/basic/explain.md', '/mysql/basic/transaction.md', '/mysql/basic/mvcc.md']
        },
        {
          type: 'group', text: '优化', link: '', children: ['/mysql/optimize/optimize-select.md']
        },
      ],
      '/spring/': [
        {
          type: 'group', text: 'Spring Core', link: '', children: ['/spring/README.md', '/spring/core/annotation.md', '/spring/core/design.md']
        },
        // {
        //   type: 'group', text: 'Spring Core', link: 'core', children: ['/spring/core/bean.md']
        // },
        {
          type: 'group', text: 'Spring Boot', link: '', children: ['/spring/boot/autoconfiguration.md','/spring/boot/starter.md']
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