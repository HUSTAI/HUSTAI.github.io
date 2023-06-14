# 知识分享

## 修改流程

推荐使用 `pnpm` 包管理工具
1. 安装[Node](https://nodejs.cn/download/)>=16.0.0
2. 使用 `npm install -g pnpm` 安装
3. 克隆本仓库代码 `https://github.com/HUSTAIL/HUSTAIL.github.io.git`
4. 运行`pnpm install` 初始化项目
5. 本地修改完成之后运行 `pnpm docs:dev`，确保没有问题再提交

## 添加文章

在 [src/zh/posts/yyyy-MM](https://github.com/HUSTAIL/HUSTAIL.github.io/tree/main/src/zh/posts) 目录下增加一个新的 `md` 文件，参考[配置](https://theme-hope.vuejs.press/zh/config/frontmatter/info.html)来设置 `Frontmatter`

`category` 请从以下类别中选择

- tokenizer
- 大语言模型
- 微调技术
- 提示技术
- 评估方法
- 数据集

## 添加图片
1. 在 `public/assets/images` 路径下存放图片文件，文件名示例 `bytetransformer1.png`
2. 在 `md` 文档中添加图片，**上下各空一行**以正确显示图片标题

```plain
![alt name](/assets/images/posts/yyyy-MM/image.xxx "image title")
```

## 添加参考文献

1. 在文件底部添加参考文献

```md
<div id="refer-anchor-1"></div>
- [1] ByteDance https://github.com/bytedance/effective_transformer
<div id="refer-anchor-2"></div>
- [2] ByteDance https://github.com/bytedance/effective_transformer
```

2. 在需要添加引用的地方增加锚点

```md
[<sup>1</sup>](#refer-anchor-1)
[<sup>2</sup>](#refer-anchor-2)
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

