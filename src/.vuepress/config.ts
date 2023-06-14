import { defineUserConfig } from "vuepress";
import theme from "./theme";

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
      description: "HUSTAIL的知识分享",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});