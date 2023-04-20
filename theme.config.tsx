import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
// import dayjs from 'm'
const config: DocsThemeConfig = {
  logo: <span>Jansora's Document</span>,
  footer: {
    text: 'Jansora\'s Document',
  },
  toc: {
    float: true,
    title: "侧边目录栏"
  },
  feedback: {
    content: null,
  },
  editLink: {
    text: null
  },
  // gitTimestamp: <span> 上次更新: </span>,
  // gitTimestamp: true
  gitTimestamp: ({timestamp}) => <span> 上次更新: {timestamp.toLocaleString()} </span>
}

export default config
