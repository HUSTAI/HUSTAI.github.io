---
author: 最后的开神-wkyc
icon: pen-to-square
date: 2023-07-06
category:
  - 评估方法
tag:
  - 语言模型
  - 评估
# shortTitle: Encoder和Decoder
# sticky: 10
---

# C-EVAL

C-Eval是一个针对基础模型的综合中文评估套件。它由 13948 道多项选择题组成，涵盖 52 个不同学科和四个难度级别，如下所示。请访问我们的网站或查看我们的论文以了解更多详细信息。

<!-- more -->

论文：C-EVAL：A Multi-Level Multi-Discipline Chinese Evaluation Suite for Foundation Models

评估模型：
![](/assets/images/eval/ceval_1.png)
## 1 测试数据

论文作者团队从中国真实的、具有挑战性的人类的考试题中构建了 C-EVAL，这些考试可以被分为四大类共 52 种不同的学科，每个学科内两百到五百道不等的四个选项的单项选择题，其中四大类分别是 STEM（Science、Technology、Engineering、Mathematics），人文科学，社会科学与其他（包含医学、公务员考试、注册会计师考试、消防工程师考试等）。

C-EVAL 涵盖四个难度级别，分别是初中、高中、大学与专业，数据主要来源于互联网中爬虫得到的试题与一部分作者收集的试题分享，由于爬虫得到的试题格式不统一，作者人工将试题数据做了统一，并将题目中涉及的公式都转化为了标准的 Latex 版本并纠正或删除了一部分错误试题。作者也设计了few-shot测试数据进行测试。此外，作者团队从 C-EVAL 中选择了具有挑战性的数学、物理和化学等 8 个学科的问题，组成了一个独立的 C-EVAL HARD 评测集，这些问题基本需要大学及以上的水平才能进行解决，并且思维与推理过程颇有难度。

## 2 两种设置
### 2.1 AO（Answer Only）
![示意图](/assets/images/eval/ceval_2.png "图2.1 AO的prompt设置")
### 2.2 COT
![示意图](/assets/images/eval/ceval_3.png "图2.2 COT的prompt设置")
## 3 结果展示
### 3.1 AO
![示意图](/assets/images/eval/ceval_4.png "图2.3 AO的结果表格")
### 3.2 COT
![示意图](/assets/images/eval/ceval_5.png "图2.4 COT的结果表格")
### 3.3 C-Eval Hard
![示意图](/assets/images/eval/ceval_6.png "图2.5 C-Eval Hard的结果表格")
