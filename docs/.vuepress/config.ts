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
      // {
      //   text: '缓存',
      //   link: "/mysql/basic/explain.md",
      // },
      {
        text: 'kubernates',
        link: "/kubernates/README.md",
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
      {
        text: '查漏补缺',
        link: "/summary/tcp-ip-handshakes.md",
      },

    ],

    sidebar: {
      '/java/': [
        {
          type: 'group', text: '数据结构', link: '', children:
              ['/java/data-structure/HashMap.md', '/java/data-structure/LinkedHashMap.md',
                '/java/data-structure/ConcurrentHashMap.md'
              ]
        },
        {
          type: 'group', text: '并发', link: '', children: ['/java/concurrent/java-lock.md', '/java/concurrent/synchronized.md', '/java/concurrent/cas.md']
        },
      ],
      '/mysql/': [
        {
          type: 'group', text: '基础知识', link: '', children: ['/mysql/basic/infrastructure.md',
            '/mysql/basic/explain.md', '/mysql/basic/transaction.md', '/mysql/basic/logging.md',
            '/mysql/transaction/mvcc.md'
          ]
        },
        {
          type: 'group', text: '优化', link: '', children: ['/mysql/optimize/README.md', '/mysql/optimize/limit.md']
        },
        {
          type: 'group', text: '运维', link: '', children: ['/mysql/devops/sql.md', '/mysql/devops/optimize-index.md', '/mysql/devops/information_schema.md']
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
      '/kubernates/': [
        {
          type: 'group', text: '数据结构', link: '', children: ['/kubernates/plugins/dashboard',]
        },
      ],
      '/design-mode/': [
        {
          type: 'group', text: '', link: '', children: ['/design-mode/README.md', '/design-mode/singleton.md','/design-mode/factory.md','/design-mode/builder.md',
            '/design-mode/prototype.md', '/design-mode/facade.md', '/design-mode/adapter.md',
            '/design-mode/bridge.md', '/design-mode/prototype.md' , '/design-mode/prototype.md', ]
        },
      ],
      '/algorithms/data-structure/': [
        {
          type: 'group', text: '数据结构', link: '', children: [
            '/algorithms/data-structure/red-black-tree.md',
            '/algorithms/data-structure/linked-list.md', '/algorithms/data-structure/array.md']
        },
      ],
      '/summary/': [
        {
          type: 'group', text: '暂定', link: '', children: [
            "/summary/tcp-ip-handshakes.md",]
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