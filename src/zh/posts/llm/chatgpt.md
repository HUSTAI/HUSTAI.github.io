---
author: 猞猁-zlj
icon: pen-to-square
date: 2023-03-01
title: chatgpt相关技术介绍
category:
  - 语言模型
tag:
  - openai
  - google
  - instruction tuning
  - in-context learning
  - chatgpt
---

- gpt系列模型发展历程
- 提示微调
- 上下文学习

<!-- more -->

## 1 gpt系列模型发展历程
![图1 gpt系列模型树](/assets/images/llm/chatgpt1.png "图1 gpt系列模型树")
## 2 提示微调 instruction tuning[^instruction]
该概念的提出来自于Google的一篇论文. 提示微调结合了pretrain-finetune和prompt两个范式的优点，即用prompt格式的训练数据进行fine-tune，以使模型具备人类倾向的回答问题能力。
提示微调结合了pretrain-finetune和prompt两个范式的优点，即用prompt格式的训练数据进行fine-tune，以使模型具备人类倾向的回答问题能力。
在 2022 年 3 月，OpenAI 发布了指令微调[^instructgpt] 的论文，其监督微调(supervised instruction tuning) 的部分对应了davinci-instruct-beta和text-davinci-001。
> We focus on fine-tuning approaches to aligning language models. Specifically, we use reinforcement learning from human feedback (RLHF) to fine-tune GPT-3 to follow a broad class of written instructions.
## 3 模型的训练方法和数据集
![图2 模型训练步骤](/assets/images/llm/chatgpt2.png "图2 模型训练步骤")
（1）人工标注prompt集的答案用来finetune模型。监督微调(supervise fine-tuning, SFT)
这一步得到的模型是davinci-instruct-beta
（2）通过对模型输出答案打分来训练reward model。Reward Model：基于第一步生成的SFT6B版本，去除最后一次反嵌入层。起到了扩充LLM模型高质量训练数据的作用。
	推理打分：选择了一部分prompt，由SFT模型随机生成多个答案（4-9个），人工对这些答案从到坏进行排序。这构成了一个新的监督训练数据集，排序是这些数据的label。新的数据集被用来训练reward模型。--[chatgpt是如何工作的](https://www.assemblyai.com/blog/how-chatgpt-actually-works/)
（3）使用reward model来更新ppo策略，从而使gpt产生的答案更偏向于标注人员的喜好。
![图3 instructgpt的训练数据构成](/assets/images/llm/chatgpt3.png "图3 instructgpt的训练数据构成")
据推测，ChatGPT使用了和text-davinci-003相同的训练方法，采用了不同的数据集，而且更加注重生成答案的无害性和对话性
合理分析：OpenAI官网的ChatGPT的训练流程和InstructGPT基本一致，除了ChatGPT是基于GPT3.5系列的，再根据InstructGPT发布后半年多才发布ChatGPT，推测是因为初始PPO策略训练的模型太过随心所欲，不能满足无害性等要求，而在调试的过程中GPT3.5系列已经训练完成，所以直接基于GPT3.5系列进行训练。
## 4 上下文学习(in-context learning)
从类比中学习，和人类的决策相似
ICL只存在一次前向传播中，还是会被模型记住？
论文中ICL的测试数据，类似于下图所示，每次预测都需要结合之前的几个demonstration，由此推测ICL并不会被模型记住。结合对text-davinci-003API的测试，在一次调用中教会它数学题，之后单独询问，模型并不能正确回答，由此可以证明ICL只存在于一次前向传播。

![图4 上下文学习和微调的区别](/assets/images/llm/chatgpt4.png "图4 上下文学习和微调的区别")

ICL是一个元优化的过程[^icl]，可以看做隐性微调。GPT首先根据演示示例生成元梯度，然后将这些元梯度应用于原始GPT以构建ICL模型。

> Considering that ICL directly takes effect on only the attention keys and values. 
>
> ICL只对attention有影响。

## 5 参考
[^instruction]: Google Finetuned Language Models Are Zero-Shot Learners instruction tuning: finetuning language models on a collection of datasets described via instructions
[^instructgpt]: OpenAI Training language models to follow instructions with human feedback
[^icl]: Why Can GPT Learn In-Context? Language Models Secretly Perform Gradient Descent as Meta-Optimizers
