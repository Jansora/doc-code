// docs/.vuepress/config.ts
import {defineUserConfig} from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Doc Demo',
  description: 'Products maintained by Doc Demo',
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
    title: 'Doc Demo',

    themePlugins: {
      // shiki: false,
      git: false,

    },

    navbar: [
      {
        text: 'MySQL',
        link: "/mysql/basic/explain.md",
      },
    ],

    sidebar: {
      '/basic': [
        {
          type: 'group', text: '基础概念', link: '', children: ['/mysql/basic/explain.md']
        },
      ],
    },


  },

})