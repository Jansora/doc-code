// docs/.vuepress/config.ts
import {defineUserConfig} from 'vuepress'
import type {MixThemeConfig} from 'vuepress-theme-mix/lib/node'

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
      // {
      //   text: 'Offer',
      //   children: [
      //     '/offer/product/README.md',
      //     '/offer/logic/README.md',
      //     '/offer/client/README.md',
      //     // {
      //     //   text: '更新日志',
      //     //   link: 'https://github.com/gavinliu6/vuepress-theme-mix/blob/main/CHANGELOG.md',
      //     // },
      //   ],
      // },
      // {
      //   text: 'Internationalization',
      //   link: "/i18n/logic/内容国际化.md",
      //   // children: [
      //   //   '/offer/i18n/logic/README.md',
      //   //   // {
      //   //   //   text: '更新日志',
      //   //   //   link: 'https://github.com/gavinliu6/vuepress-theme-mix/blob/main/CHANGELOG.md',
      //   //   // },
      //   // ],
      // },
    ],

    sidebar: {
      // '/offer/product/': [
      //   {
      //     // type: 'link-group', text: '产品文档', link: 'README.html',
      //     type: 'group', text: '产品文档', link: 'README.html', children: [] },
      // ],
      // '/offer/logic/': [
      //   // { type: 'group', text: '逻辑文档', link: 'README.md', children: [], },
      //   { type: 'group', text: '电信版本', link: '电信版本.md', children: ['/offer/logic/创建OFFER版本.md', '/offer/logic/拷贝OFFER版本.md'],},
      //   {
      //     type: 'group', text: '基础组件', link: '', children: [
      //         '/offer/logic/base/媒体.md', '/offer/logic/base/标签.md'
      //     ],
      //   },
      //   { type: 'group', text: 'FAQ', link: '', children: ['/offer/logic/faq/电信和电商区别.md','/offer/logic/faq/OFFER的核心逻辑.md','/offer/logic/faq/OFFER功能与表关联关系.md'],},
      // ],
      // '/i18n/logic/': [
      //   {
      //     type: 'group', text: '逻辑文档', link: '',
      //     children: [
      //       '/i18n/logic/内容国际化.md'
      //     ],
      //   },
      // ],
    },


  },

})