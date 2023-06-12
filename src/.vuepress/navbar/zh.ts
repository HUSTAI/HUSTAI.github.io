import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  // "/zh/demo/",
  {
    text: "博文",
    icon: "pen-to-square",
    prefix: "/zh/posts/",
    children: [
      {
        text: "2023-6",
        icon: "pen-to-square",
        prefix: "2023-6/",
        children: [
          { text: "bytetransformer的讲解", icon: "pen-to-square", link: "bytetransformer" }
        ]
      }
    ],
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
