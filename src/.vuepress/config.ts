import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "A blog demo for 404",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "博客示例",
      description: "404的博客示例",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});