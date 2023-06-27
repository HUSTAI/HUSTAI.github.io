import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as s,c,e as n,a as e,b as t,d as l,f as a}from"./app-09d831cb.js";const p="/assets/images/llm/chatgpt1.png",d="/assets/images/llm/chatgpt2.png",g="/assets/images/llm/chatgpt3.png",u="/assets/images/llm/chatgpt4.png",h={},f=e("p",null,[t("首先回顾了GPT系列模型的发展历程，然后介绍了ChatGPT模型最重要的技术"),e("strong",null,"提示微调"),t("，最后介绍了上下文学习。")],-1),m=e("h2",{id:"_1-gpt系列模型发展历程",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-gpt系列模型发展历程","aria-hidden":"true"},"#"),t(" 1 GPT系列模型发展历程")],-1),_=a('<figure><img src="'+p+'" alt="图1 GPT系列模型树" tabindex="0" loading="lazy"><figcaption>图1 gpt系列模型树</figcaption></figure><h2 id="_2-提示微调" tabindex="-1"><a class="header-anchor" href="#_2-提示微调" aria-hidden="true">#</a> 2 提示微调</h2><p>提示微调（Instruction Tuning）[1]的提出来自于Google的一篇论文. 提示微调结合了pretrain-finetune和prompt两个范式的优点，即用prompt格式的训练数据进行fine-tune，以使模型具备人类倾向的回答问题能力。<br> 提示微调结合了pretrain-finetune和prompt两个范式的优点，即用prompt格式的训练数据进行fine-tune，以使模型具备人类倾向的回答问题能力。<br> 在 2022 年 3 月，OpenAI 发布了指令微调[^instructgpt] 的论文，其监督微调(supervised instruction tuning) 的部分对应了davinci-instruct-beta和text-davinci-001。</p><blockquote><p>We focus on fine-tuning approaches to aligning language models. Specifically, we use reinforcement learning from human feedback (RLHF) to fine-tune GPT-3 to follow a broad class of written instructions.</p></blockquote><h2 id="_3-模型的训练方法和数据集" tabindex="-1"><a class="header-anchor" href="#_3-模型的训练方法和数据集" aria-hidden="true">#</a> 3 模型的训练方法和数据集</h2><figure><img src="'+d+'" alt="图2 模型训练步骤" tabindex="0" loading="lazy"><figcaption>图2 模型训练步骤</figcaption></figure>',6),b=e("br",null,null,-1),P=e("br",null,null,-1),T=e("br",null,null,-1),x={href:"https://www.assemblyai.com/blog/how-chatgpt-actually-works/",target:"_blank",rel:"noopener noreferrer"},I=e("br",null,null,-1),C=a('<figure><img src="'+g+'" alt="图3 instructgpt的训练数据构成" tabindex="0" loading="lazy"><figcaption>图3 instructgpt的训练数据构成</figcaption></figure><p>据推测，ChatGPT使用了和text-davinci-003相同的训练方法，采用了不同的数据集，而且更加注重生成答案的无害性和对话性<br> 合理分析：OpenAI官网的ChatGPT的训练流程和InstructGPT基本一致，除了ChatGPT是基于GPT3.5系列的，再根据InstructGPT发布后半年多才发布ChatGPT，推测是因为初始PPO策略训练的模型太过随心所欲，不能满足无害性等要求，而在调试的过程中GPT3.5系列已经训练完成，所以直接基于GPT3.5系列进行训练。</p><h2 id="_4-上下文学习-in-context-learning" tabindex="-1"><a class="header-anchor" href="#_4-上下文学习-in-context-learning" aria-hidden="true">#</a> 4 上下文学习(in-context learning)</h2><p>从类比中学习，和人类的决策相似<br> ICL只存在一次前向传播中，还是会被模型记住？<br> 论文中ICL的测试数据，类似于下图所示，每次预测都需要结合之前的几个demonstration，由此推测ICL并不会被模型记住。结合对text-davinci-003API的测试，在一次调用中教会它数学题，之后单独询问，模型并不能正确回答，由此可以证明ICL只存在于一次前向传播。</p><figure><img src="'+u+'" alt="图4 上下文学习和微调的区别" tabindex="0" loading="lazy"><figcaption>图4 上下文学习和微调的区别</figcaption></figure><p>ICL是一个元优化的过程[^icl]，可以看做隐性微调。GPT首先根据演示示例生成元梯度，然后将这些元梯度应用于原始GPT以构建ICL模型。</p><blockquote><p>Considering that ICL directly takes effect on only the attention keys and values.</p><p>ICL只对attention有影响。</p></blockquote><h2 id="_5-参考" tabindex="-1"><a class="header-anchor" href="#_5-参考" aria-hidden="true">#</a> 5 参考</h2><p>[1] Jason Wei, Maarten Bosma, Vincent Zhao, Kelvin Guu, Adams Wei Yu, Brian Lester, et al. Finetuned Language Models Are Zero-Shot Learners. In: Proceedings of the 10th International Conference on Learning Representations, 2022</p><p>[2] L. Ouyang, J. Wu, X. Jiang, D. Almeida, C. Wainwright, P. Mishkin, et al. Training language models to follow instructions with human feedback. In: Advances in neural information processing systems: 35, Curran Associates, Inc., 2022: 27730-27744</p><p>[3] D. Dai, Y. Sun, L. Dong, Y. Hao, S. Ma, Z. Sui, et al. Why Can GPT Learn In-Context? Language Models Implicitly Perform Gradient Descent as Meta-Optimizers. arXiv, 2023</p>',11);function L(G,k){const i=r("ExternalLinkIcon");return s(),c("div",null,[f,n(" more "),m,n(" todo 介绍模型树 "),_,e("p",null,[t("（1）人工标注prompt集的答案用来finetune模型。监督微调(supervise fine-tuning, SFT)"),b,t(" 这一步得到的模型是davinci-instruct-beta"),P,t(" （2）通过对模型输出答案打分来训练reward model。Reward Model：基于第一步生成的SFT6B版本，去除最后一次反嵌入层。起到了扩充LLM模型高质量训练数据的作用。"),T,t(" 推理打分：选择了一部分prompt，由SFT模型随机生成多个答案（4-9个），人工对这些答案从到坏进行排序。这构成了一个新的监督训练数据集，排序是这些数据的label。新的数据集被用来训练reward模型。--"),e("a",x,[t("chatgpt是如何工作的"),l(i)]),I,t(" （3）使用reward model来更新ppo策略，从而使gpt产生的答案更偏向于标注人员的喜好。")]),C])}const y=o(h,[["render",L],["__file","chatgpt.html.vue"]]);export{y as default};
