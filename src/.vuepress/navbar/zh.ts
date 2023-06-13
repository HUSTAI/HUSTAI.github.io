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
    text: "学术竞赛",
    icon: "book",
    prefix: "/zh/competitions/",
    children: [
      {
        text: "baidu2023",
        icon: "pen-to-square",
        prefix: "baidu2023/",
        children: [
          { text: "百度2023语言竞赛", icon: "pen-to-square", link: "README" }
        ]
      }
    ],
  },
]);
