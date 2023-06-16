import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as l,e as i,a as s,b as a,f as t}from"./app-b9d8685e.js";const m="/assets/images/llm/gpt_1.png",r="/assets/images/llm/gpt_2.png",p="/assets/images/llm/gpt_3.png",c="/assets/images/llm/gpt_4.png",o="/assets/images/llm/gpt_5.png",g="/assets/images/llm/gpt_6.png",h={},u=s("h1",{id:"gpt论文分享-improving-language-understanding-by-generative-pre-training",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#gpt论文分享-improving-language-understanding-by-generative-pre-training","aria-hidden":"true"},"#"),a(" GPT论文分享：Improving Language Understanding by Generative Pre-Training")],-1),d=s("p",null,"作者证明了通过在大量未标注文本上对语言模型进行生成式预训练，然后在每个特定任务上进行歧视性微调，可以在这些任务上实现巨大收益。与以前的方法相比，他们在微调期间利用面向任务的输入转换来实现有效的转移，同时对模型架构所需的更改最小。",-1),_=t('<h2 id="_1-模型架构" tabindex="-1"><a class="header-anchor" href="#_1-模型架构" aria-hidden="true">#</a> 1 模型架构</h2><figure><img src="'+m+'" alt="图1.1 GPT架构图" tabindex="0" loading="lazy"><figcaption>图1.1 GPT架构图</figcaption></figure><h2 id="_2-训练框架" tabindex="-1"><a class="header-anchor" href="#_2-训练框架" aria-hidden="true">#</a> 2 训练框架</h2><h3 id="_2-1-无监督预训练" tabindex="-1"><a class="header-anchor" href="#_2-1-无监督预训练" aria-hidden="true">#</a> 2.1 无监督预训练</h3>',4),y=s("p",null,[a("给定一个无监督的token语料库"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"U"),s("mo",null,"="),s("mo",{stretchy:"false"},"{"),s("msub",null,[s("mi",null,"u"),s("mn",null,"1")]),s("mo",{separator:"true"},","),s("mo",null,"⋯"),s("mtext",null," "),s("mo",{separator:"true"},","),s("msub",null,[s("mi",null,"u"),s("mi",null,"n")]),s("mo",{stretchy:"false"},"}")]),s("annotation",{encoding:"application/x-tex"},"U=\\{u_1, \\cdots, u_n\\}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6833em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"U"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"{"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"u"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mpunct"},","),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"minner"},"⋯"),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mpunct"},","),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"u"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"n")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mclose"},"}")])])]),a("，作者使用标准语言建模目标来最大化以下概率。")],-1),f=s("figure",null,[s("img",{src:r,alt:"",tabindex:"0",loading:"lazy"}),s("figcaption")],-1),x=s("p",null,"其中k是上下文窗口的大小，条件概率P使用具有参数Θ的神经网络来建模。使用随机梯度下降训练这些参数。",-1),b=s("p",null,"在作者的实验中，作者将多层Transformer decoder用于语言模型，这是Transformer的变体。该模型在输入上下文token上应用multi-headed self-attention操作，然后是position-wise前馈层，以在目标token上产生输出分布。",-1),v=s("figure",null,[s("img",{src:p,alt:"",tabindex:"0",loading:"lazy"}),s("figcaption")],-1),k=s("p",null,[a("其中"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"U"),s("mo",null,"="),s("mo",{stretchy:"false"},"("),s("mi",null,"U"),s("mo",null,"−"),s("mi",null,"k"),s("mo",{separator:"true"},","),s("mo",null,"⋯"),s("mtext",null," "),s("mo",{separator:"true"},","),s("mi",null,"U"),s("mo",null,"−"),s("mn",null,"1"),s("mo",{stretchy:"false"},")")]),s("annotation",{encoding:"application/x-tex"},"U=(U−k, \\cdots, U−1)")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6833em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"U"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"("),s("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"U"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8889em","vertical-align":"-0.1944em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.03148em"}},"k"),s("span",{class:"mpunct"},","),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"minner"},"⋯"),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mpunct"},","),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"U"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord"},"1"),s("span",{class:"mclose"},")")])])]),a("是token的上下文向量，n是层数，是token嵌入矩阵，Wp是position嵌入矩阵。")],-1),U=t('<h3 id="_2-2-监督微调" tabindex="-1"><a class="header-anchor" href="#_2-2-监督微调" aria-hidden="true">#</a> 2.2 监督微调</h3><p>在预训练之后，作者将参数调整为受监督的目标任务。假设有一个标记的数据集C，其中每个实例由一系列输入token以及标签。输入通过作者的预训练模型，以获得最终Transformer块的激活，然后将其送到添加的具有参数的线性输出层来以预测。</p><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>因此，优化目标变成了以下式子。</p><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>作者还发现，将语言建模作为微调的辅助目标，通过以下方面体现。</p><p>（1）改进监督模型的泛化；</p><p>（2）加速收敛，有助于学习。</p><p>之前的工作也观察到了这种辅助目标的改进性能。具体而言，作者优化了以下目标（带参数λ）。</p><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',10);function z(w,T){return n(),l("div",null,[u,d,i(" more "),_,y,f,x,b,v,k,U])}const M=e(h,[["render",z],["__file","GPT.html.vue"]]);export{M as default};
