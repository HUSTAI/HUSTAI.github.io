import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {

      text: "论文分享",
      icon: "lightbulb",
      prefix: "posts/",
      // collapsible: false,
      children: [
        "dataset/",
        "eval/",
        "finetune/",
        "llm/",
        "prompt/",
        "tokenizer/"
      ]
      // activeMatch: "^/zh/posts/",
      // link: "/zh/posts/README.md"
    },
    // {
    //   text: "学术竞赛",
    //   icon: "book",
    //   prefix: "competitions/",
    //   children: "structure",
    // },
    // "intro",
    // "slides",
  ],
  "/zh/posts/": "structure",
});
