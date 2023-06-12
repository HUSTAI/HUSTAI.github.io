import { defineUserConfig } from "vuepress";
import theme from "./theme";

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
      title: "知识分享",
      description: "HUST-404的知识分享",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});