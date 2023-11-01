---
author: 猞猁-zlj
icon: pen-to-square
date: 2023-06-05
shortTitle: ByteTransformer优化推理速度
title: 大幅优化推理速度-ByteTransformer
category:
  - 语言模型
tag:
  - Transformer
  - 优化
  - 字节
---

# 大幅优化推理速度-ByteTransformer

论文提出了字节跳动的GPU Transformer推理库——ByteTransformer。针对自然语言处理常见的**可变长输入**，论文提出了一套优化算法，这些算法在保证运算正确性的前提下，成功避免了传统实现中的冗余运算，实现了端到端的推理过程的大幅优化。

<!-- more -->

## 1 介绍

![论文截图](/assets/images/llm/bytetransformer1.png "图1.1 论文信息")

论文地址：https://arxiv.org/abs/2210.03052
代码地址：https://github.com/bytedance/ByteTransformer

现有的一些深度学习框架，如Tensorflow，PyTorch，TVM以及NVIDIA TensorRT等，要求输入序列长度相同，才能利用批处理加速Transformer计算。然而，在实际场景中，输入序列通常是变长的，而零填充会引入大量的额外计算开销。字节跳动AML团队先前提出的“effective Transformer”，通过对输入的重排列，实现了 QKV projection 和 MLP 的 padding free，但 self attention 部分仍然需要 padding。
为了解决这个问题，字节跳动 AML 团队提出了 ByteTransformer，它实现了变长输入的 padding free 计算，并且实现了全面的 kernel fusion 以进一步提高性能。

## 2 优化算法

### 2.1 Remove padding 算法

这个算法源自字节跳动 AML 团队之前的工作 "effective Transformer"，在 NVIDIA 开源 FasterTransformer 中也有集成。ByteTransformer 同样使用该算法去除对 attention 外矩阵乘的额外计算。

![padding free](/assets/images/llm/bytetransformer2.png "图2.1 Remove padding 算法")

算法步骤如下。

- 计算 attention mask 的前缀和，作为 offsets。

- 根据 offsets 把输入张量从 [batch_size, seqlen, hidden_size] 重排列为 [valid_seqlen, hidden_size] ，再参与后续的矩阵乘计算，实现 padding free。


### 2.2 融合的多头注意力
旧版的多头注意力：多头注意力 (Multi-Head)，具体是在计算时对注意力做一些变形，每个输入产生多组 Q、K、V（生成几组就是几个头），每组各自计算互不影响，最后把输出拼接在一起作为总输出（可能要再乘一个矩阵来调整形状）。

为了优化 attention 部分的性能，ByteTransformer 中实现了融合的多头注意力（Fused Multi-Head Attention）算子。对于 seqlen 长度，以 384 为界划分为两种实现方式。

- 对于短 seqlen, 因为可以把 QK 整行放在共享内存进行 softmax 操作，通过手写 kernel 的方式实现，矩阵乘通过调用 wmma 接口使用 TensorCore 保证高性能。

- 对于长 seqlen, 因为共享内存大小限制，不能在一个手写 kernel 中完成所有操作。基于高性能的 CUTLASS  grouped GEMM, 分成两个 gemm kernel 实现，并把 add_bias, softmax 等操作 fused 到 GEMM kernel 中。

### 2.3 CUTLASS grouped GEMM

NVIDIA 开发的 grouped GEMM 可以在一个 kernel 中完成多个独立矩阵乘问题的计算，利用这个性质可以实现 Attention 中的 padding free。

- Attention 中的两次矩阵乘操作，都可以拆解为 batch_size x head_num 个独立的矩阵乘子问题。

- 每个矩阵乘子问题，把问题大小传入到 grouped GEMM，其中 seqlen 传递真实的 valid seqlen 即可。

grouped GEMM 原理：kernel 中每个 threadblock (CTA) 固定分块大小，每个矩阵乘子问题根据问题大小和分块大小，拆解为不同数量的待计算块，再把这些块平均分配到每个 threadblock 中进行计算。

![grouped GEMM 原理图](/assets/images/llm/bytetransformer3.png "图2.2 grouped GEMM 原理")

使用 grouped GEMM 实现 attention 时，由于子问题的数量 batch_size x head_num 通常较大，读取子问题参数会有不小的开销，因为从线程角度看，每个线程都需要遍历读取所有的子问题大小。为了解决这个问题，ByteTransformer 对 grouped GEMM 中读取子问题参数进行了性能优化，使其可以忽略不计。

- 共享子问题参数。对同一个输入，不同 head 的 valid seqlen 相同，problem size 也相同，通过共享使参数存储量从 batch_size x head_num 减少到 batch_size。

- warp prefetch. 原始实现中，每个 CUDA thread 依次读取所有的子问题 problem size，效率很低。改为一个 warp 内线程读取连续的 32 个子问题参数，然后通过 warp 内线程通信交换数据，每个线程的读取次数降低到 1/32。


![warp prefetch 示意图](/assets/images/llm/bytetransformer4.png "图2.3 warp prefetch")



## 3 变种 Transformer 支持

目前，字节跳动 AML 团队已经在 GitHub 上开源了 ByteTransformer 的标准 BERT 实现。除此之外，字节内部版本还支持了许多 Transformer 变种，比如 Deberta, Roformer，T5 等等。代码实现易于拓展，并且上述各种优化手段也可以方便地应用到变种 Transformer 中。


