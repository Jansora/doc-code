// docs/.vuepress/config.ts
import {defineUserConfig} from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '程序人生',
  description: '学如逆水行舟, 不进则退',
  // Theme Config
  theme: 'vuepress-theme-mix',
  plugins: [
    [
      "vuepress-plugin-chart",
    ],
    [
      "@renovamen/vuepress-plugin-mermaid",
    ],
    [
      "@renovamen/vuepress-plugin-katex",
    ]
  ],
  themeConfig: {
    // logo: '/images/logo.png',
    title: '程序人生',
    head: [
      ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `https://cdn.jansora.com/img/linux-shell.png` }]
    ],
    themePlugins: {
      // shiki: false,
      git: false,

    },

    navbar: [
      {
        text: 'MySQL',
        link: "/mysql/basic/explain.md",
      },
      {
        text: '计算机算法',
        link: "/algorithms/data-structure/linked-list.md",
      },
    ],

    sidebar: {
      '/mysql/basic': [
        {
          type: 'group', text: '基础概念', link: '', children: ['/mysql/basic/explain.md']
        },
      ],
      '/algorithms/data-structure': [
        {
          type: 'group', text: '数据结构', link: '', children: ['/algorithms/data-structure/linked-list.md', '/algorithms/data-structure/array.md']
        },
      ],
    },


  },

})