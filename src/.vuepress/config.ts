import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/",
  head: [
    [
      'link', { rel: 'icon', href: '/logo.svg'}
    ]
  ],
  locales: {
    "/en/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "A blog demo for 404",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "知识分享",
      description: "HUSTAI的知识分享",
    },
  },

  theme,
  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 排除首页
      isSearchable: (page) => page.path !== "/",
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
        {
          getter: (page) => page.frontmatter.title,
          formatter: "标题：$content",
        },
      ]
    })
  ]
  // Enable it with pwa
  // shouldPrefetch: false,
});