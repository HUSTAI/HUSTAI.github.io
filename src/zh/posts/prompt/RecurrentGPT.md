---
author: 研究生鱼皮-yjf
icon: wand-magic-sparkles
date: 2023-05-30
shortTitle: "RecurrentGPT"
category:
  - 提示技术
tag:
  - Memory
  - LLM
  - ChatGPT
---


# RecurrentGPT: Interactive Generation of (Arbitrarily) Long Text

来自苏黎世联邦理工和波形智能的团队发布了 RecurrentGPT，一种让大语言模型 (如 ChatGPT 等) 能够模拟 RNN/LSTM，通过 Recurrent Prompting 来实现交互式超长文本生成，让利用 ChatGPT 进行长篇小说创作成为了可能。

<!-- more --> 

## 1 问题提出

基于变换器（Transformer）的大语言模型最明显的限制之一就是输入和输出的长度限制。虽然输入端的长度限制可以通过向量数据库（Vector Database ，VDB）等方式缓解，输出内容的长度限制始终是限制 ChatGPT 等大语言模型广泛应用于长内容生成的关键障碍。为解决这一问题，过去很多研究试图使用基于向量化的状态（State）或记忆（Memory）来让 Transformer 可以进行循环计算。这样的方法虽然在长文本建模上展现了一定的优势，但是却要求使用者拥有并可以修改模型的结构和参数，这在目前闭源模型遥遥领先的大语言模型时代中是不符合实际的。

该文旨在解决GPT模型生成文本长度受限的问题，并且探索以自然语言模拟循环机制的可能性。这是一个新问题，因为当前的GPT模型只能生成有限长度的文本，而缺乏长文本生成的能力。

## 2 RecurrentGPT原理

该文提出了一种名为循环生成式预训练变换器（Recurrent Generative Pre-trained Transformer，RecurrentGPT）的模型，使用自然语言模拟长短期记忆（Long Short-Term Memory，LSTM）神经网络中的长短期记忆机制，从而实现生成任意长度的文本。该模型每个时间步生成一个段落，并且将其存储在硬盘和提示中，以模拟记忆的更新。由于人类用户可以轻松观察和编辑自然语言记忆，因此RecurrentGPT是可解释的，并且可以进行交互式生成长文本。相比于当前领域的研究，本文的思路在于使用自然语言模拟循环机制，从而实现生成任意长度的文本，并且是可解释的。

RecurrentGPT的语言模型是在大型语言模型（Large Language Model，LLM）如对话生成式预训练变换器（Chat Generative Pre-trained Transformer，ChatGPT）的基础上构建的，并使用自然语言来模拟LSTM中的长短期记忆机制。在每个时间步骤，RecurrentGPT生成一个段落的文本，并分别更新存储在硬盘和提示中的基于语言的长短期记忆。这种循环机制使得RecurrentGPT能够生成任意长度的文本而不会遗忘。由于人类用户可以轻松观察和编辑自然语言记忆，因此RecurrentGPT是可解释的，并且可以实现长文本的交互式生成。

RecurrentGPT通过自然语言模拟了循环神经网络（Recurrent Neural Network，RNN）的循环计算机制。。在每一个时间步中，RecurrentGPT 会接收上一个时间步生成的内容、最近生成内容的摘要（短期记忆），历史生成内容中和当前时间步最相关的内容 (长期记忆)，以及一个对下一步生成内容的梗概。RecurrentGPT 根据这些内容生成一段内容，更新其长短时记忆，并最后生成几个对下一个时间步中生成内容的规划，并将当前时间步的输出作为下一个时间步的输入。这样的循环计算机制打破了常规Transformer 模型在生成长篇文本方面的限制，从而实现任意长度文本的生成，而不遗忘过去的信息。

![图2.1 RecurrentGPT架构图](/assets/images/prompt/RecurrentGPT1.png)

![图2.2 RecurrentGPT Prompt 设计](/assets/images/prompt/RecurrentGPT2.png)

首先指明任务，比如写小说，并说明在输入部分会给出的内容：上一步生成的段落、当前维持的近期生成内容的摘要，即短期记忆，所有生成内容中和当前时间步相关程度最高的几个段落，即短期记忆，以及对接下来生成内容的规划。

接着在提示（Prompt）中给 ChatGPT 提出要求：首先基于当前的输入生成一个新的段落，接着对维护的短期记忆进行修改，同时在对短期记忆修改时作者们指示大语言模型首先分析短期记忆中哪些内容对于后续创作不再重要以及新生成的内容中哪些会对后续生成有所影响，之后相应地在地短期记忆库中去去除无用的信息并增添新的信息，从而保持短期记忆不会因为迭代的轮数增加而变得过长。最后要求 ChatGPT 基于当前的情节铺设，给出三个逻辑顺承又有趣的新的情节的规划。

在提出要求后，作者在结尾再次精心设计了 Prompt 来规范 ChatGPT 的输出，并重申了当前小说写作的情景。这个好处是让 ChatGPT 生成的内容更具备像小说那样的细节，而不是在每一轮的迭代中，快速地完成情节的叙述。

在实际使用中，内容创作者只需先选择一个主题，然后简单地描述一下要生成的内容的背景设定和大纲，剩下的工作就可以交给 RecurrentGPT。每一个它将自动生成第一段，并提供几个可能的选项供创作者继续写故事。创作者可以选择一个选项、对某个选项进行修改或者自己编辑一个新的选项。这个流程能显著提高内容创作者的效率。

这个新的长文本生成范式将带给所有内容创作者和读者一种全新的体验。首先，相比现有的方法，RecurrentGPT 有更强的可解释性，因为用户可以观察和编辑自然语言记忆，这使得用户可以更清晰地理解这个框架是如何工作的。其次，用户可以直接影响生成内容的方向，让整个写作过程变得更加有趣。

## 3 在线演示

除了生成AI生成内容（AIGC）外，我们还展示了使用RecurrentGPT作为与消费者直接交互的交互式小说的可能性。我们称这种生成模型的用法为"AI作为内容"（AIAC），这是传统AIGC的下一形式。此外，我们还展示了使用RecurrentGPT创建个性化交互式小说的可能性，这些小说直接与读者交互而不是与作家交互。总的来说，RecurrentGPT展示了从认知科学和深度学习中流行的模型设计中借鉴思想对LLMs进行提示的效用。他们的代码可以在[该网站](https://github.com/aiwaves-cn/RecurrentGPT)上找到，同时还提供了在线演示。

![图3.1 在线演示界面](/assets/images/prompt/RecurrentGPT3.png)

## 4 相关研究


近期的相关研究包括《Long Text Generation via Adversarial Training with Leaked Information》（Jingjing Xu等，南京大学）、《Towards Controlled Generation of Text》（Sumanth Dathathri等，斯坦福大学）、《GPT-2: Language Models are Unsupervised Multitask Learners》（Alec Radford等，OpenAI）等。


