import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "论文分享",
      icon: "lightbulb",
      prefix: "posts/",
      children: [
        "rag/",
        "llm/",
        "prompt/",
        "finetune/",
        "eval/",
        "dataset/",
        "reasoning/",
        "token/"
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
