import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {

      text: "论文分享",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "学术竞赛",
      icon: "book",
      prefix: "competitions/",
      children: "structure",
    },
    "intro",
    // "slides",
  ],
});
