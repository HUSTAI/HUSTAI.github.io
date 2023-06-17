---
author: shb
icon: book
date: 2023-06-13
shortTitle: 指令数据集和提示数据集分享
category:
  - 数据集
tag:
  - Instruct Tuning
  - Prompt Tuning
---

# 指令数据集和提示数据集分享

指令数据集和提示数据集在模型微调方面，尤其是在模型与人类认识对齐方面，作用巨大。本文针对一些较为优质的指令数据集和提示数据集，进行了简要介绍。

<!-- more -->


## 1 Super-Natural Instruction 【Allen AI】
这些自然语言指令清楚而完整地描述了一项任务（传统上定义为将输入字符串映射到输出字符串）。配备“理解”语言说明的模型，如果提供了任务说明，应该可以成功解决任何看不见的任务
项目链接：[https://instructions.apps.allenai.org/]([https://instructions.apps.allenai.org/)



## 2 PromptSource【BigScience】
项目链接：[https://github.com/bigscience-workshop/promptsource](https://github.com/bigscience-workshop/promptsource)
BigScience 由 Hugging Face 和法国 CNRS，IDRIS，GENCI 等联合组织，是当下最大的开源 LLMs 组织之一。
BigScience 在 2021 年末开发了PromptSource项目，开源了一系列工具 toolkits，帮助研究者基于现有NLP 任务构建 prompt。截止目前，PromptSource 项目包含了 270 个 NLP 任务的超过 2000 个 prompt 模版：

## 3 P3【BigScience】
项目链接：[https://huggingface.co/datasets/bigscience/P3](https://huggingface.co/datasets/bigscience/P3)
语言：英文
在promptsource基础上，BigScience 构建了 P3 数据集。在 Hugging Face Hub 上你可以找到 P3 数据，P3 的数据规模在 100M-1B 之间：
## 4 xMTF 【BigScience，包含中文】 
BigScience 在英语 prompt 的基础上，扩展其 prompt 到多种非英语语言。
该项目包含了 13 个 NLP 任务，并采用了 46 个不同的语言的版本。对应的 prompt 包含的语种个数不定。
项目链接：[https://huggingface.co/datasets/bigscience/P3](https://huggingface.co/datasets/bigscience/P3)
## 5 HH-RLHF【Anthropic】
项目链接：[https://github.com/anthropics/hh-rlhf](https://github.com/anthropics/hh-rlhf)
数量：
训练集：161k
测试集：8.55k
Anthropic 公司旗下的 Claud 是 ChatGPT 的主要竞品之一。
Anthropic 开源了其在自己产品线中使用的 RLHF 数据集：
链接：[https://huggingface.co/datasets/Anthropic/hh-rlhf](https://huggingface.co/datasets/Anthropic/hh-rlhf)

## 6 Unnatural Instruction【orhonovich】
使用 LLMs 自主生成 instruction 数据是 instruct-tuning 领域较为活跃的一个方向。
Unnatural Instruction 使用 GPT3（text-davinci-002）生成了 64k 的 instruction prompt 数据。并使用同样的模型将 64k 的 prompt 进行改写，最终得到了 240k 条 instruction 数据。
论文中显示，在 Instruct-Tuning 中 LLMs 自主生成的 prompt 表现出了良好的效果，甚至超过了在 P3 等数据上进行微调的 T0 等模型。
## 7 Self-Instruct【yizhongw】

项目链接：[https://github.com/yizhongw/self-instruct](https://github.com/yizhongw/self-instruct)
Self-Instruct 同样是使用 LLMs 生成 prompt 进行 instruct-tuning 的思路。不过使用了更 fine-grained 的生成流程。
Task pool 和 Quality filtering 等概念被引入，部分缓解了 self-intrauct 类型数据的 noise 问题

## 8 UnifiedSKG 【HKU】
UnifiedSKG 在 Text-to-Text 的框架中加入了 knowledge grounding，也就是在 prompt-output 的框架中，加入了结构化数据做辅助，共21个任务数据集，

项目主页 ：[https://unifiedskg.com/](https://unifiedskg.com/)

解决问题：做打破彼此任务之间的边界的第一次简单尝试，使得这些可以在同一个UnifiedSKG framework下进行学习并在这些任务上取得不错的结果


## 9 Flan Collection【Google】
项目链接：[https://github.com/google-research/FLAN/tree/main/flan/v2](https://github.com/google-research/FLAN/tree/main/flan/v2)
Google 在这个项目中将自己的 Flan 2021 数据与一些开源的 instruction 数据（P3，super-natural instruction 等）进行了合并

## 10 InstructDial【prakharguptaz】
https://github.com/prakharguptaz/Instructdial/tree/main/datasets
InstructDial 是在特定的一种任务类型上进行指令微调的尝试。实验结果表明，在对话指令数据上微调后，模型在对话任务上的表现强于在超大规模任务集上的结果





