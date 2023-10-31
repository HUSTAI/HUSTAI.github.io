import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as p,c as l,e as c,a as n,b as s,d as e,f as t}from"./app-48bd2458.js";const u={},r=n("h1",{id:"基于qlora微调大语言模型",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#基于qlora微调大语言模型","aria-hidden":"true"},"#"),s(" 基于QLoRA微调大语言模型")],-1),d=n("p",null,"LoRA的核心思想就是通过低秩分解来模拟参数的改变量，从而以极小的参数量来实现大模型的间接训练。AdaLoRA是对LoRA的一种改进，它根据重要性评分动态分配参数预算给权重矩阵。而本文要讲的QLoRA的核心思想就是在不降低任何性能的情况下微调量化为4 bit的模型。",-1),v=t(`<h2 id="_1-技术原理" tabindex="-1"><a class="header-anchor" href="#_1-技术原理" aria-hidden="true">#</a> 1 技术原理</h2><p>QLoRA（论文： QLORA: Efficient Finetuning of Quantized LLMs），使用一种新颖的高精度技术将预训练模型量化为4 bit，然后添加一小组可学习的低秩适配器权重，这些权重通过量化权重的反向传播梯度进行微调。QLORA有一种低精度存储数据类型（4 bit），还有一种计算数据类型（BFloat16）。实际上，这意味着无论何时使用QLoRA权重张量，我们都会将张量反量化为 BFloat16，然后执行16位矩阵乘法。QLoRA提出了两种技术实现高保真4 bit微调——4 bit NormalFloat(NF4) 量化和双量化。此外，还引入了分页优化器，以防止梯度检查点期间的内存峰值，从而导致内存不足的错误，这些错误在过去使得大型模型难以在单台机器上进行微调。</p><p>（1）4bit NormalFloat（NF4）：对于正态分布权重而言，一种信息理论上最优的新数据类型，该数据类型对正态分布数据产生比 4 bit整数和 4bit 浮点数更好的实证结果。</p><p>（2）双量化：对第一次量化后的那些常量再进行一次量化，减少存储空间。</p><p>（3）分页优化器：使用NVIDIA统一内存特性，该特性可以在在GPU偶尔OOM的情况下，进行CPU和GPU之间自动分页到分页的传输，以实现无错误的 GPU 处理。该功能的工作方式类似于 CPU 内存和磁盘之间的常规内存分页。使用此功能为优化器状态（Optimizer）分配分页内存，然后在 GPU 内存不足时将其自动卸载到 CPU 内存，并在优化器更新步骤需要时将其加载回 GPU 内存。</p><h2 id="_2-环境配置" tabindex="-1"><a class="header-anchor" href="#_2-环境配置" aria-hidden="true">#</a> 2 环境配置</h2><p>（1）操作系统: CentOS 7。</p><p>（2）CPUs: 单个节点具有 1TB 内存的 Intel CPU，物理CPU个数为64，每颗CPU核数为16。</p><p>（3）GPUs: 8 卡 A800 80GB GPUs。</p><p>（4）Python: 3.10 (需要先升级OpenSSL到1.1.1t版本），然后再编译安装Python)。</p><p>（5）NVIDIA驱动程序版本: 515.65.01，根据不同型号选择不同的驱动程序。</p><p>（6）CUDA工具包: 11.7。</p><p>（7）NCCL: nccl_2.14.3-1+cuda11.7。</p><p>（8）cuDNN: 8.8.1.3_cuda11。</p><p>（9）依赖包如下所示。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>https://github.com/huggingface/transformers.git
https://github.com/huggingface/accelerate.git
https://github.com/huggingface/peft.git
bitsandbytes==0.39.0
einops==0.6.1
evaluate==0.4.0
scikit-learn==1.2.2
sentencepiece==0.1.99
tensorboardX
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（10）项目地址及使用方式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git clone https://github.com/artidoro/qlora.git
cd qlora
git checkout cc48811

python qlora.py \\
--dataset &quot;/data/nfs/guodong.li/data/alpaca_data_cleaned.json&quot; \\
--model_name_or_path &quot;/data/nfs/guodong.li/pretrain/hf-llama-model/llama-7b&quot; \\
--output_dir &quot;/home/guodong.li/output/llama-7b-qlora&quot; \\
--per_device_train_batch_size 1 \\
--max_steps 1000 \\
--save_total_limit 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-微调时显存占用" tabindex="-1"><a class="header-anchor" href="#_3-微调时显存占用" aria-hidden="true">#</a> 3 微调时显存占用</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Sun Jun 11 19:32:39 2023
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 515.105.01   Driver Version: 515.105.01   CUDA Version: 11.7     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  NVIDIA A800 80G...  Off  | 00000000:34:00.0 Off |                    0 |
| N/A   40C    P0    66W / 300W |   3539MiB / 81920MiB |      0%      Default |
|                               |                      |             Disabled |
+-------------------------------+----------------------+----------------------+
|   1  NVIDIA A800 80G...  Off  | 00000000:35:00.0 Off |                    0 |
| N/A   54C    P0    77W / 300W |   3077MiB / 81920MiB |     24%      Default |
|                               |                      |             Disabled |
+-------------------------------+----------------------+----------------------+
|   2  NVIDIA A800 80G...  Off  | 00000000:36:00.0 Off |                    0 |
| N/A   55C    P0    75W / 300W |   3077MiB / 81920MiB |      8%      Default |
|                               |                      |             Disabled |
+-------------------------------+----------------------+----------------------+
|   3  NVIDIA A800 80G...  Off  | 00000000:37:00.0 Off |                    0 |
| N/A   57C    P0    81W / 300W |   3077MiB / 81920MiB |     14%      Default |
|                               |                      |             Disabled |
+-------------------------------+----------------------+----------------------+
|   4  NVIDIA A800 80G...  Off  | 00000000:9B:00.0 Off |                    0 |
| N/A   60C    P0    83W / 300W |   3077MiB / 81920MiB |      8%      Default |
|                               |                      |             Disabled |
+-------------------------------+----------------------+----------------------+
|   5  NVIDIA A800 80G...  Off  | 00000000:9C:00.0 Off |                    0 |
| N/A   61C    P0   228W / 300W |   3077MiB / 81920MiB |     25%      Default |
|                               |                      |             Disabled |
+-------------------------------+----------------------+----------------------+
|   6  NVIDIA A800 80G...  Off  | 00000000:9D:00.0 Off |                    0 |
| N/A   53C    P0   265W / 300W |   3077MiB / 81920MiB |      6%      Default |
|                               |                      |             Disabled |
+-------------------------------+----------------------+----------------------+
|   7  NVIDIA A800 80G...  Off  | 00000000:9E:00.0 Off |                    0 |
| N/A   46C    P0    78W / 300W |   6891MiB / 81920MiB |     12%      Default |
|                               |                      |             Disabled |
+-------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|    0   N/A  N/A     37939      C   python                           2513MiB |
|    1   N/A  N/A     37939      C   python                           2819MiB |
|    2   N/A  N/A     37939      C   python                           2819MiB |
|    3   N/A  N/A     37939      C   python                           2819MiB |
|    4   N/A  N/A     37939      C   python                           2819MiB |
|    5   N/A  N/A     37939      C   python                           2819MiB |
|    6   N/A  N/A     37939      C   python                           2819MiB |
|    7   N/A  N/A     37939      C   python                           3561MiB |
+-----------------------------------------------------------------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-权重合并推理" tabindex="-1"><a class="header-anchor" href="#_4-权重合并推理" aria-hidden="true">#</a> 4 权重合并推理</h2><p>模型权重合并脚本：export_hf_checkpoint.py，将lora权重合并回原始权重。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> os

<span class="token keyword">import</span> torch
<span class="token keyword">import</span> transformers
<span class="token keyword">from</span> peft <span class="token keyword">import</span> PeftModel
<span class="token keyword">from</span> transformers <span class="token keyword">import</span> LlamaForCausalLM<span class="token punctuation">,</span> LlamaTokenizer  <span class="token comment"># noqa: F402</span>

BASE_MODEL <span class="token operator">=</span> os<span class="token punctuation">.</span>environ<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;BASE_MODEL&quot;</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span>
LORA_MODEL <span class="token operator">=</span> os<span class="token punctuation">.</span>environ<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;LORA_MODEL&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tloen/alpaca-lora-7b&quot;</span><span class="token punctuation">)</span>
HF_CHECKPOINT <span class="token operator">=</span> os<span class="token punctuation">.</span>environ<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;HF_CHECKPOINT&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;./hf_ckpt&quot;</span><span class="token punctuation">)</span>



<span class="token keyword">assert</span> <span class="token punctuation">(</span>
    BASE_MODEL
<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Please specify a value for BASE_MODEL environment variable, e.g. \`export BASE_MODEL=decapoda-research/llama-7b-hf\`&quot;</span>  <span class="token comment"># noqa: E501</span>

tokenizer <span class="token operator">=</span> LlamaTokenizer<span class="token punctuation">.</span>from_pretrained<span class="token punctuation">(</span>BASE_MODEL<span class="token punctuation">)</span>

base_model <span class="token operator">=</span> LlamaForCausalLM<span class="token punctuation">.</span>from_pretrained<span class="token punctuation">(</span>
    BASE_MODEL<span class="token punctuation">,</span>
    <span class="token comment">#load_in_8bit=False,</span>
    torch_dtype<span class="token operator">=</span>torch<span class="token punctuation">.</span>bfloat16<span class="token punctuation">,</span>
    device_map<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&quot;&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;cpu&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

first_weight <span class="token operator">=</span> base_model<span class="token punctuation">.</span>model<span class="token punctuation">.</span>layers<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>self_attn<span class="token punctuation">.</span>q_proj<span class="token punctuation">.</span>weight
first_weight_old <span class="token operator">=</span> first_weight<span class="token punctuation">.</span>clone<span class="token punctuation">(</span><span class="token punctuation">)</span>

lora_model <span class="token operator">=</span> PeftModel<span class="token punctuation">.</span>from_pretrained<span class="token punctuation">(</span>
    base_model<span class="token punctuation">,</span>
    <span class="token comment"># TODO</span>
    <span class="token comment"># &quot;tloen/alpaca-lora-7b&quot;,</span>
    LORA_MODEL<span class="token punctuation">,</span>
    <span class="token comment">#device_map={&quot;&quot;: &quot;cpu&quot;},</span>
    <span class="token comment">#torch_dtype=torch.float16,</span>
<span class="token punctuation">)</span>

lora_weight <span class="token operator">=</span> lora_model<span class="token punctuation">.</span>base_model<span class="token punctuation">.</span>model<span class="token punctuation">.</span>model<span class="token punctuation">.</span>layers<span class="token punctuation">[</span>
    <span class="token number">0</span>
<span class="token punctuation">]</span><span class="token punctuation">.</span>self_attn<span class="token punctuation">.</span>q_proj<span class="token punctuation">.</span>weight

<span class="token keyword">assert</span> torch<span class="token punctuation">.</span>allclose<span class="token punctuation">(</span>first_weight_old<span class="token punctuation">,</span> first_weight<span class="token punctuation">)</span>

<span class="token comment"># merge weights</span>
<span class="token keyword">for</span> layer <span class="token keyword">in</span> lora_model<span class="token punctuation">.</span>base_model<span class="token punctuation">.</span>model<span class="token punctuation">.</span>model<span class="token punctuation">.</span>layers<span class="token punctuation">:</span>
    layer<span class="token punctuation">.</span>self_attn<span class="token punctuation">.</span>q_proj<span class="token punctuation">.</span>merge_weights <span class="token operator">=</span> <span class="token boolean">True</span>
    layer<span class="token punctuation">.</span>self_attn<span class="token punctuation">.</span>v_proj<span class="token punctuation">.</span>merge_weights <span class="token operator">=</span> <span class="token boolean">True</span>

lora_model<span class="token punctuation">.</span>train<span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span>

<span class="token comment"># did we do anything?</span>
<span class="token comment">#assert not torch.allclose(first_weight_old, first_weight)</span>

lora_model_sd <span class="token operator">=</span> lora_model<span class="token punctuation">.</span>state_dict<span class="token punctuation">(</span><span class="token punctuation">)</span>
deloreanized_sd <span class="token operator">=</span> <span class="token punctuation">{</span>
    k<span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">&quot;base_model.model.&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span> v
    <span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token keyword">in</span> lora_model_sd<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token string">&quot;lora&quot;</span> <span class="token keyword">not</span> <span class="token keyword">in</span> k
<span class="token punctuation">}</span>

LlamaForCausalLM<span class="token punctuation">.</span>save_pretrained<span class="token punctuation">(</span>
    base_model<span class="token punctuation">,</span> HF_CHECKPOINT <span class="token punctuation">,</span> state_dict<span class="token operator">=</span>deloreanized_sd<span class="token punctuation">,</span> max_shard_size<span class="token operator">=</span><span class="token string">&quot;400MB&quot;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),m={href:"http://inference.py",target:"_blank",rel:"noopener noreferrer"},k=t(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> transformers <span class="token keyword">import</span> AutoModelForCausalLM<span class="token punctuation">,</span> LlamaTokenizer
<span class="token keyword">import</span> torch

model_id <span class="token operator">=</span> <span class="token string">&quot;/data/nfs/guodong.li/pretrain/hf-llama-model/llama-7b&quot;</span>
merge_model_id <span class="token operator">=</span> <span class="token string">&quot;/home/guodong.li/output/llama-7b-merge&quot;</span>

<span class="token comment">#model = AutoModelForCausalLM.from_pretrained(model_id, load_in_4bit=True)</span>
model <span class="token operator">=</span> AutoModelForCausalLM<span class="token punctuation">.</span>from_pretrained<span class="token punctuation">(</span>merge_model_id<span class="token punctuation">,</span> load_in_4bit<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> device_map<span class="token operator">=</span><span class="token string">&quot;auto&quot;</span><span class="token punctuation">)</span>

tokenizer <span class="token operator">=</span> LlamaTokenizer<span class="token punctuation">.</span>from_pretrained<span class="token punctuation">(</span>model_id<span class="token punctuation">)</span>

<span class="token comment">#print(model)</span>

device <span class="token operator">=</span> torch<span class="token punctuation">.</span>device<span class="token punctuation">(</span><span class="token string">&quot;cuda:0&quot;</span><span class="token punctuation">)</span>

<span class="token comment">#model = model.to(device)</span>

text <span class="token operator">=</span> <span class="token string">&quot;Hello, my name is &quot;</span>
inputs <span class="token operator">=</span> tokenizer<span class="token punctuation">(</span>text<span class="token punctuation">,</span> return_tensors<span class="token operator">=</span><span class="token string">&quot;pt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">(</span>device<span class="token punctuation">)</span>
outputs <span class="token operator">=</span> model<span class="token punctuation">.</span>generate<span class="token punctuation">(</span><span class="token operator">**</span>inputs<span class="token punctuation">,</span> max_new_tokens<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">,</span> do_sample<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> top_k<span class="token operator">=</span><span class="token number">30</span><span class="token punctuation">,</span> top_p<span class="token operator">=</span><span class="token number">0.85</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>tokenizer<span class="token punctuation">.</span>decode<span class="token punctuation">(</span>outputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> skip_special_tokens<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n------------------------------------------------\\nInput: &quot;</span><span class="token punctuation">)</span>

line <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">while</span> line<span class="token punctuation">:</span>
    inputs <span class="token operator">=</span> tokenizer<span class="token punctuation">(</span>line<span class="token punctuation">,</span> return_tensors<span class="token operator">=</span><span class="token string">&quot;pt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">(</span>device<span class="token punctuation">)</span>
    outputs <span class="token operator">=</span> model<span class="token punctuation">.</span>generate<span class="token punctuation">(</span><span class="token operator">**</span>inputs<span class="token punctuation">,</span> max_new_tokens<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">,</span> do_sample<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> top_k<span class="token operator">=</span><span class="token number">30</span><span class="token punctuation">,</span> top_p<span class="token operator">=</span><span class="token number">0.85</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Output: &quot;</span><span class="token punctuation">,</span>tokenizer<span class="token punctuation">.</span>decode<span class="token punctuation">(</span>outputs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> skip_special_tokens<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n------------------------------------------------\\nInput: &quot;</span><span class="token punctuation">)</span>
    line <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-推理时显存占用" tabindex="-1"><a class="header-anchor" href="#_5-推理时显存占用" aria-hidden="true">#</a> 5 推理时显存占用</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|    1   N/A  N/A     21373      C   python                           5899MiB |
+-----------------------------------------------------------------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，还可以不进行合并权重，直接进行推理，但是此时模型推理的显存占用会高于合并之后进行模型推理。</p><h2 id="_6-参考" tabindex="-1"><a class="header-anchor" href="#_6-参考" aria-hidden="true">#</a> 6 参考</h2>`,5),b={href:"https://mp.weixin.qq.com/s?__biz=MzU3Mzg5ODgxMg==&mid=2247484828&idx=1&sn=06c839ce76548578d1ebf3ec91acb4bb&chksm=fd3beccfca4c65d9dcef7fab6616c29782dbe62bce458304444e9450a767d8d0bdce6b89edcf&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},_={href:"https://mp.weixin.qq.com/s/b4OixyHEvL_YfOJZukC2Ig",target:"_blank",rel:"noopener noreferrer"};function h(f,g){const a=o("ExternalLinkIcon");return p(),l("div",null,[r,d,c(" more "),v,n("p",null,[s("推理脚本："),n("a",m,[s("inference.py"),e(a)]),s("。")]),k,n("p",null,[s("[1] "),n("a",b,[s("大模型参数高效微调技术原理综述（五）-LoRA、AdaLoRA、QLoRA"),e(a)])]),n("p",null,[s("[2] "),n("a",_,[s("高效微调技术QLoRA实战，基于LLaMA-65B微调仅需48G显存，真香"),e(a)])])])}const y=i(u,[["render",h],["__file","QLORA.html.vue"]]);export{y as default};
