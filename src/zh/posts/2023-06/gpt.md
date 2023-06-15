---
author: 最后的开神
icon: pen-to-square
date: 2023-06-15
category:
  - 大语言模型
tag:
  - 模型
  - 深度学习
# sticky: 10
---

# GPT论文
论文标题：Improving Language Understanding by Generative Pre-Training
<!-- more -->

## 1 模型架构

![图1-1 GPT架构图](/assets/images/posts/2023-6/gpt_1.png)

## 2 训练框架
### 2.1 无监督预训练
给定一个无监督的token语料库$U=\{u1，…，un\}$，作者使用标准语言建模目标来最大化以下概率。

![](/assets/images/posts/2023-6/gpt_2.png)

其中k是上下文窗口的大小，条件概率P使用具有参数Θ的神经网络来建模。使用随机梯度下降训练这些参数。

在作者的实验中，作者将多层Transformer decoder用于语言模型，这是Transformer的变体。该模型在输入上下文token上应用multi-headed self-attention操作，然后是position-wise前馈层，以在目标token上产生输出分布。

![](/assets/images/posts/2023-6/gpt_3.png)

其中$U=(U−k，…，U−1)$是token的上下文向量，n是层数，是token嵌入矩阵，Wp是position嵌入矩阵。

### 2.2 监督微调
在预训练之后，作者将参数调整为受监督的目标任务。假设有一个标记的数据集C，其中每个实例由一系列输入token以及标签。输入通过作者的预训练模型，以获得最终Transformer块的激活，然后将其送到添加的具有参数的线性输出层来以预测。

![](/assets/images/posts/2023-6/gpt_4.png)

因此，优化目标变成了以下式子。

![](/assets/images/posts/2023-6/gpt_5.png)

作者还发现，将语言建模作为微调的辅助目标，通过

（1）改进监督模型的泛化；

（2）加速收敛，有助于学习。

之前的工作也观察到了这种辅助目标的改进性能。具体而言，作者优化了以下目标（带参数λ）。

![](/assets/images/posts/2023-6/gpt_6.png)
