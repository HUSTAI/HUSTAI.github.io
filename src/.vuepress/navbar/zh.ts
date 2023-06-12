import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  "/zh/posts/",
  // {
  //   text: "论文分享",
  //   icon: "pen-to-square",
  //   prefix: "/zh/posts/",
  //   children: [
  //     {
  //       text: "2023-6",
  //       icon: "pen-to-square",
  //       prefix: "2023-6/",
  //       children: [
  //         { text: "bytetransformer的讲解", icon: "pen-to-square", link: "bytetransformer" }
  //       ]
  //     }
  //   ],
  // },
  {
    text: "言图科技",
    icon: "book",
    link: "https://theme-hope.vuejs.press/",
  },
]);
