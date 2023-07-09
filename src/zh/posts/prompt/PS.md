---
author: lx
icon: wand-magic-sparkles
date: 2023-06-05
shortTitle: "PS Prompting: 先计划再求解"
category:
  - 提示技术
tag:
  - 推理
  - LLM
  - CoT
---

# Plan-and-Solve Prompting: 先计划再求解

[该文](https://mp.weixin.qq.com/s/caLLfS0O7S7fbansOr-GVw)介绍了 `Plan-and-Solve Prompting: 先计划再求解` 框架，通过将求解推理问题划分为 `Plan` 和 `Solve` 两个阶段，解决 `CoT` 中存在的计算错误、缺失步骤错误和语义误解错误等问题。

<!-- more -->

<PDF url="https://arxiv.org/pdf/2305.04091.pdf" />

::: tip
项目地址：https://github.com/AGI-Edgerunners/Plan-and-Solve-Prompting
:::

---

## 1 背景介绍

近来在各种自然语言处理任务中，大型语言模型（LLMs）展现出了优越的性能。为了解决多步推理任务，少样本链式思维（CoT）提示包括一些手工设计的逐步推理演示，使 LLMs 能够明确生成推理步骤并提高推理准确性。为了消除少样本链式思维（CoT）中的手工工作，零样本 CoT 将目标问题与 “Let’s think step by step” 一起作为输入提示连接到 `LLMs` 上。尽管零样本 CoT 取得了成功，但仍然存在三个问题：**计算错误**、**缺失步骤错误**和**语义误解错误**。

## 2 思路

为了解决缺失步骤错误，我们提出了 `PS`（Plan-and-Solve）提示，即制定一个计划将整个任务分解为较小的子任务并按照计划执行子任务，使 `LLMs` 能够明确制定解决问题的计划，并在预测输入问题的最终答案之前生成中间推理过程。

![图2.1 推理示例](/assets/images/prompt/PS1.png)

通过更详细的说明扩展了 `PS` 提示基于计划的触发句，并得到了 `PS+` 提示。具体而言，我们在触发句中添加了 `pay attention to calculation`，要求 `LLMs` 尽可能准确地进行计算。

为了减少由于缺失必要推理步骤而导致的错误，我们在 `PS+` 提示中增加了`extract relevant variables and their corresponding numerals`，指示 `LLMs` 不要忽略输入问题陈述中的相关信息。此外，我们在提示中添加了`calculate intermediate results`，以增强 `LLM` 生成推理步骤的能力。

![图2.2 推理示例](/assets/images/prompt/PS2.png)

具体的 `PS` 和 `PS+` 提示如下所示：

<table align="center">
<tr>
<th>Prompt_ID</th>
<th>Type</th>
<th>Trigger Sentence</th>
</tr>
<tr align="center">
<td>101</td>
<td>CoT</td>
<td align="left">Let's think step by step.</td>
</tr>
<tr align="center">
<td>201</td>
<td>PS</td>
<td align="left">Let's first understand the problem and devise a plan to solve the problem. Then, let's carry out the plan to solve the problem step by step.</td>
</tr>
<tr align="center">
<td>301</td>
<td>PS+</td>
<td align="left">Let's first understand the problem, extract relevant variables and their corresponding numerals, and devise a plan. Then, let's carry out the plan, calculate intermediate variables (pay attention to correct numeral calculation and commonsense), solve the problem step by step, and show the answer.</td>
</tr>
<tr align="center">
<td>302</td>
<td>PS+</td>
<td align="left">Let's first understand the problem, extract relevant variables and their corresponding numerals, and devise a complete plan. Then, let's carry out the plan, calculate intermediate variables (pay attention to correct numerical calculation and commonsense), solve the problem step by step, and show the answer.</td>
</tr>
<tr align="center">
<td>303</td>
<td>PS+</td>
<td align="left">Let's devise a plan and solve the problem step by step.</td>
</tr>
<tr align="center">
<td>304</td>
<td>PS+</td>
<td align="left">Let's first understand the problem and devise a complete plan. Then, let's carry out the plan and reason problem step by step. Every step answer the subquestion, "does the person flip and what is the coin's current state?". According to the coin's last state, give the final answer (pay attention to every flip and the coin’s turning state).</td>
</tr>
<tr align="center">
<td>305</td>
<td>PS+</td>
<td align="left">Let's first understand the problem, extract relevant variables and  their corresponding numerals, and make a complete plan. Then, let's carry out the plan, calculate intermediate variables (pay attention to correct numerical calculation and commonsense), solve the problem step by step, and show the answer.</td>
</tr>
<tr align="center">
<td>306</td>
<td>PS+</td>
<td align="left">Let's first prepare relevant information and make a plan. Then, let's answer the question step by step (pay attention to commonsense and logical coherence).</td>
</tr>
<tr align="center">
<td>307</td>
<td>PS+</td>
<td align="left">Let's first understand the problem, extract relevant variables and their corresponding numerals, and make and devise a complete plan. Then, let's carry out the plan, calculate intermediate variables (pay attention to correct numerical calculation and commonsense), solve the problem step by step, and show the answer.</td>
</tr>
</table>

## 3 实验结果

在三个推理任务的十个数据集上评估了提出的提示策略。通过对 `GPT-3` 的实验结果表明，提出的零样本提示在所有数据集上始终明显优于零样本 `CoT`，并且在数学推理问题上与 `8-shot CoT` 提示性能相当。

6 个算术推理数据集的实验结果如下所示，6 个算术推理数据集分别是：（1）MultiArith；（2）GSM8K；（3）AddSub；（4）AQuA；（5）SingleEq；（6）SVAMP。

![图3.1 数学推理](/assets/images/prompt/PS3.png)

2 个常识推理数据集的实验结果如下所示，2 个常识推理数据集分别是：（1）CSQA；（2）StrategyQA。

![图3.2 常识推理](/assets/images/prompt/PS4.png)

2 个符号推理数据集的实验结果如下所示，2 个常识推理数据集分别是：（1）Last Letter；（2）Coin Flip。

![图3.3 符号推理](/assets/images/prompt/PS5.png)