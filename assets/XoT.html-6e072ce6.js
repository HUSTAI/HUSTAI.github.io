import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as n,c as r,e as s,d as c,a as e,b as a,f as p}from"./app-c2972123.js";const d="/assets/images/reasoning/xot1.png",h="/assets/images/reasoning/xot2.png",l="/assets/images/reasoning/xot3.png",g={},T=e("h1",{id:"xot-强化学习增强思维生成",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#xot-强化学习增强思维生成","aria-hidden":"true"},"#"),a(" XoT: 强化学习增强思维生成")],-1),_=e("p",null,[a("该文介绍了一种名为"),e("code",null,"XOT"),a("的提示技术，它增强了像GPT-3和GPT-4这样的大型语言模型(llm)解决复杂问题的潜力。")],-1),f=e("div",{class:"hint-container tip"},[e("p",{class:"hint-container-title"},"提示"),e("p",null,[a("论文题目：Everything of Thoughts: Defying the Law of Penrose Triangle for Thought Generation"),e("br"),a(" 作者：Ruomeng Ding, Chaoyun Zhang, Lu Wang, Yong Xu, Minghua Ma, Wei Zhang, et al."),e("br"),a(" 机构：Microsoft")])],-1),u=p('<hr><h2 id="_1-当前提示技术的局限性" tabindex="-1"><a class="header-anchor" href="#_1-当前提示技术的局限性" aria-hidden="true">#</a> 1 当前提示技术的局限性</h2><p>LLM的最新进展通过将复杂的问题分解成更易于管理的“思想”，然后通过自然语言提示表达出来，从而实现了解决问题的新方法。但是大多数现有的提示技术都有局限性。</p><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption>图1.1 XoT和其他方法示意图</figcaption></figure><ul><li><strong>IO</strong>: 输入-输出(IO)提示仅适用于具有单步解决方案的简单问题，缺乏灵活性。</li><li><strong>CoT</strong>: 思维链(CoT)能够逐步解决问题，但仅限于线性思维结构，限制了灵活性。</li><li><strong>ToT和GoT</strong>: 允许更灵活的思维结构，如树或图。但是它们需要LLM本身来评估中间思想，通过多个LLM调用产生大量的计算成本。</li></ul><p>从本质上讲，当前的提示技术面临着<code>“彭罗斯三角”</code>约束——它们最多可以实现两个属性(<strong>性能、效率、灵活性</strong>)，但不能同时实现这三个属性。</p><h2 id="_2-xot的组成" tabindex="-1"><a class="header-anchor" href="#_2-xot的组成" aria-hidden="true">#</a> 2 XoT的组成</h2><p>XOT集成了<code>强化学习</code>和<code>蒙特卡罗树搜索(MCTS)</code>，将外部知识注入提示过程。这增强了llm的功能，并同时实现了更高的性能、效率和灵活性。</p><h3 id="_2-1-mcts模块" tabindex="-1"><a class="header-anchor" href="#_2-1-mcts模块" aria-hidden="true">#</a> 2.1 MCTS模块</h3><p>MCTS模块在特定任务上进行预训练，以学习有关有效思维搜索的领域知识。轻量级策略和价值网络指导搜索。</p><p>MCTS大概可以被分成四步。选择(Selection)，拓展(Expansion)，模(Simulation)，反向传播(Backpropagation)。</p><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption>图2.1 蒙特卡罗树搜索</figcaption></figure><p>选择:算法从根节点开始，在当前状态下从可用的单步思想生成集中选择一个动作。这个过程一直持续到到达当前树中的一个叶节点。选择以PUCT算法为指导，目标是最大化上置信度界(UCB)。</p><p>评估和扩展:在到达先前未选择的叶节点时，会扩展到下一步进行新思想探索的状态。这种展开涉及到对状态的值和动作概率的评估，用θ参数化的神经网络建模，即(Pθ(s)， vθ(s)) = fθ(s)。其中Pθ(s)是s上所有动作的先验概率，vθ(s)表示其预测状态值。这两个值被保留和存储用于备份，状态被标记为“已访问”。</p><p>反向传播:随着叶子节点在上述阶段的扩展(可以是未探索状态，也可以是终端状态)，算法继续通过反向传播更新所有Q(s, a)值。对于未探索的节点，这种更新涉及计算其估计值vθ的平均值，而对于终止的节点，它是基于真实奖励r。这些更新发生在信息沿着轨迹反向传播到后续节点时。这里每个状态-操作对的访问计数也会增加。</p><h3 id="_2-2-llm求解器" tabindex="-1"><a class="header-anchor" href="#_2-2-llm求解器" aria-hidden="true">#</a> 2.2 LLM求解器</h3><p>利用LLM的内部知识对MCTS的思想进行提炼和修正。这种协作过程提高了“思维”质量。</p><p>在思想搜索过程中，预训练的MCTS利用策略网络和价值网络有效地探索搜索空间并生成思想轨迹。这包括迭代地选择、展开、计算和反向传播节点。思想轨迹提供给LLM作为提示。</p><p>LLM利用其内部知识来检测思想中的任何错误。如果发现错误，则使用MCTS模块通过额外的模拟来修改思想。</p><p>这个过程不断重复，直到LLM使用修改后的高质量思想解决问题。</p><h2 id="_3-实验结果" tabindex="-1"><a class="header-anchor" href="#_3-实验结果" aria-hidden="true">#</a> 3 实验结果</h2><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption>图3.1 实验结果</figcaption></figure><p>研究人员对《Game of 24》、《8-Puzzle》和《Pocket Cube》等需要长期规划的复杂任务进行了XOT评估：</p><p>在所有任务中，XOT的准确率明显优于IO、CoT、ToT和GoT等基线。</p><p>经过思想修正，XOT在Game of 24中仅使用1-2个LLM调用就实现了高达90%的准确率，显示出高效率。</p><p>XOT高效地为问题生成多种不同的解决方案，展示了灵活性。</p><p>对于像8-Puzzle和Pocket Cube这样的空间推理任务，XOT使llm能够解决他们以前遇到的问题。</p><p>这些结果突出了XOT如何通过有效和灵活的提示释放llm解决复杂问题的潜力。</p><h2 id="_4-总结" tabindex="-1"><a class="header-anchor" href="#_4-总结" aria-hidden="true">#</a> 4 总结</h2><p>XOT提示技术代表了在激发大型语言模型的能力方面的重大进步。通过将MCTS和LLM知识协同结合，XOT与之前的提示范例相比具有更好的性能、效率和灵活性。XOT产生的灵活的思维结构能够创造性地解决问题，而协作修订过程以最少的LLM交互产生高质量的解决方案。</p>',30);function m(L,x){const o=i("PDF");return n(),r("div",null,[T,_,s(" more "),f,c(o,{url:"https://arxiv.org/pdf/2311.04254.pdf"}),u])}const X=t(g,[["render",m],["__file","XoT.html.vue"]]);export{X as default};