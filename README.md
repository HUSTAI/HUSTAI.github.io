# 知识分享

## 修改流程

推荐使用 `pnpm` 包管理工具
1. 安装[Node](https://nodejs.cn/download/)>=16.0.0
2. 使用 `npm install -g pnpm` 安装
3. 克隆本仓库代码 `https://github.com/HUSTAI/HUSTAI.github.io.git`
4. 运行`pnpm install` 初始化项目
5. 本地修改完成之后运行 `pnpm docs:dev`，确保没有问题再提交

## 添加文章

`category` 请从以下类别中选择

- 检索增强生成RAG
- 语言模型(`LLM`)
- 提示技术(`Prompt`)
- 微调技术(`Finetune`)
- 评估方法(`Eval`)
- 数据集(`Dataset`)
- 大模型推理(`Reasoning`)
- Token、分词

在 [src/zh/posts/${category}](https://github.com/HUSTAI/HUSTAI.github.io/tree/main/src/zh/posts/) 目录下增加一个新的 `md` 文件，参考[配置](https://theme-hope.vuejs.press/zh/config/frontmatter/info.html)来设置 `Frontmatter`

## 添加图片
1. 在 `public/assets/images/${category}` 路径下存放图片文件，文件名示例 `bytetransformer1.png`
2. 在 `md` 文档中添加图片，**上下各空一行**以正确显示图片标题

```plain
![alt name](/assets/images/${category}/image.xxx "image title")
```

## 添加公式
单个$符代表行内公式，两个$符代表行外居中公式。
添加\tag标签为公式添加序号。
```plain
$$
f(x)=2x^2
\tag {1.2}
$$
```

## 添加参考文献

此操作过时，参考最新文章添加即可。

1. 添加锚点
```
aaa[^锚点文字]
```
2. 在文档末尾描述锚点
```
[^锚点文字]: 这是对锚点文字的介绍
```
---

更多功能和问题请参考：

- [vuepress-theme-hope](https://theme-hope.vuejs.press/zh/guide/markdown/intro.html)
- [Markdown基本语法和示例](https://theme-hope.vuejs.press/zh/cookbook/markdown/)
- [Markdown增强语法](https://plugin-md-enhance.vuejs.press/zh/)
- [pnpm安装](https://pnpm.io/installation)
- pnpm安装失败可以尝试手动安装

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```
