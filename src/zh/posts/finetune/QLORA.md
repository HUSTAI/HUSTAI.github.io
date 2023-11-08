---
author: 最后的开神-wkyc
icon: boxes-packing
date: 2023-07-06
category:
  - 微调技术
tag:
  - LLaMA
  - LoRA
  - LLM
# sticky: 10
---

# 基于QLoRA微调大语言模型

LoRA的核心思想就是通过低秩分解来模拟参数的改变量，从而以极小的参数量来实现大模型的间接训练。AdaLoRA是对LoRA的一种改进，它根据重要性评分动态分配参数预算给权重矩阵。而本文要讲的QLoRA的核心思想就是在不降低任何性能的情况下微调量化为4 bit的模型。

<!-- more -->

## 1 技术原理

QLoRA（论文： QLORA: Efficient Finetuning of Quantized LLMs），使用一种新颖的高精度技术将预训练模型量化为4 bit，然后添加一小组可学习的低秩适配器权重，这些权重通过量化权重的反向传播梯度进行微调。QLORA有一种低精度存储数据类型（4 bit），还有一种计算数据类型（BFloat16）。实际上，这意味着无论何时使用QLoRA权重张量，我们都会将张量反量化为 BFloat16，然后执行16位矩阵乘法。QLoRA提出了两种技术实现高保真4 bit微调——4 bit NormalFloat(NF4) 量化和双量化。此外，还引入了分页优化器，以防止梯度检查点期间的内存峰值，从而导致内存不足的错误，这些错误在过去使得大型模型难以在单台机器上进行微调。

（1）4bit NormalFloat（NF4）：对于正态分布权重而言，一种信息理论上最优的新数据类型，该数据类型对正态分布数据产生比 4 bit整数和 4bit 浮点数更好的实证结果。

（2）双量化：对第一次量化后的那些常量再进行一次量化，减少存储空间。

（3）分页优化器：使用NVIDIA统一内存特性，该特性可以在在GPU偶尔OOM的情况下，进行CPU和GPU之间自动分页到分页的传输，以实现无错误的 GPU 处理。该功能的工作方式类似于 CPU 内存和磁盘之间的常规内存分页。使用此功能为优化器状态（Optimizer）分配分页内存，然后在 GPU 内存不足时将其自动卸载到 CPU 内存，并在优化器更新步骤需要时将其加载回 GPU 内存。

## 2 环境配置

（1）操作系统: CentOS 7。

（2）CPUs: 单个节点具有 1TB 内存的 Intel CPU，物理CPU个数为64，每颗CPU核数为16。

（3）GPUs: 8 卡 A800 80GB GPUs。

（4）Python: 3.10 (需要先升级OpenSSL到1.1.1t版本），然后再编译安装Python)。

（5）NVIDIA驱动程序版本: 515.65.01，根据不同型号选择不同的驱动程序。

（6）CUDA工具包: 11.7。

（7）NCCL: nccl_2.14.3-1+cuda11.7。

（8）cuDNN: 8.8.1.3_cuda11。

（9）依赖包如下所示。
```
https://github.com/huggingface/transformers.git
https://github.com/huggingface/accelerate.git
https://github.com/huggingface/peft.git
bitsandbytes==0.39.0
einops==0.6.1
evaluate==0.4.0
scikit-learn==1.2.2
sentencepiece==0.1.99
tensorboardX
```

（10）项目地址及使用方式：
```
git clone https://github.com/artidoro/qlora.git
cd qlora
git checkout cc48811

python qlora.py \
--dataset "/data/nfs/guodong.li/data/alpaca_data_cleaned.json" \
--model_name_or_path "/data/nfs/guodong.li/pretrain/hf-llama-model/llama-7b" \
--output_dir "/home/guodong.li/output/llama-7b-qlora" \
--per_device_train_batch_size 1 \
--max_steps 1000 \
--save_total_limit 2
```

## 3 微调时显存占用

```
Sun Jun 11 19:32:39 2023
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
```

## 4 权重合并推理

模型权重合并脚本：export_hf_checkpoint.py，将lora权重合并回原始权重。

```py
import os

import torch
import transformers
from peft import PeftModel
from transformers import LlamaForCausalLM, LlamaTokenizer  # noqa: F402

BASE_MODEL = os.environ.get("BASE_MODEL", None)
LORA_MODEL = os.environ.get("LORA_MODEL", "tloen/alpaca-lora-7b")
HF_CHECKPOINT = os.environ.get("HF_CHECKPOINT", "./hf_ckpt")



assert (
    BASE_MODEL
), "Please specify a value for BASE_MODEL environment variable, e.g. `export BASE_MODEL=decapoda-research/llama-7b-hf`"  # noqa: E501

tokenizer = LlamaTokenizer.from_pretrained(BASE_MODEL)

base_model = LlamaForCausalLM.from_pretrained(
    BASE_MODEL,
    #load_in_8bit=False,
    torch_dtype=torch.bfloat16,
    device_map={"": "cpu"},
)

first_weight = base_model.model.layers[0].self_attn.q_proj.weight
first_weight_old = first_weight.clone()

lora_model = PeftModel.from_pretrained(
    base_model,
    # TODO
    # "tloen/alpaca-lora-7b",
    LORA_MODEL,
    #device_map={"": "cpu"},
    #torch_dtype=torch.float16,
)

lora_weight = lora_model.base_model.model.model.layers[
    0
].self_attn.q_proj.weight

assert torch.allclose(first_weight_old, first_weight)

# merge weights
for layer in lora_model.base_model.model.model.layers:
    layer.self_attn.q_proj.merge_weights = True
    layer.self_attn.v_proj.merge_weights = True

lora_model.train(False)

# did we do anything?
#assert not torch.allclose(first_weight_old, first_weight)

lora_model_sd = lora_model.state_dict()
deloreanized_sd = {
    k.replace("base_model.model.", ""): v
    for k, v in lora_model_sd.items()
    if "lora" not in k
}

LlamaForCausalLM.save_pretrained(
    base_model, HF_CHECKPOINT , state_dict=deloreanized_sd, max_shard_size="400MB"
)
```

推理脚本：inference.py。

```py
from transformers import AutoModelForCausalLM, LlamaTokenizer
import torch

model_id = "/data/nfs/guodong.li/pretrain/hf-llama-model/llama-7b"
merge_model_id = "/home/guodong.li/output/llama-7b-merge"

#model = AutoModelForCausalLM.from_pretrained(model_id, load_in_4bit=True)
model = AutoModelForCausalLM.from_pretrained(merge_model_id, load_in_4bit=True, device_map="auto")

tokenizer = LlamaTokenizer.from_pretrained(model_id)

#print(model)

device = torch.device("cuda:0")

#model = model.to(device)

text = "Hello, my name is "
inputs = tokenizer(text, return_tensors="pt").to(device)
outputs = model.generate(**inputs, max_new_tokens=20, do_sample=True, top_k=30, top_p=0.85)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))

print("\n------------------------------------------------\nInput: ")

line = input()
while line:
    inputs = tokenizer(line, return_tensors="pt").to(device)
    outputs = model.generate(**inputs, max_new_tokens=20, do_sample=True, top_k=30, top_p=0.85)
    print("Output: ",tokenizer.decode(outputs[0], skip_special_tokens=True))
    print("\n------------------------------------------------\nInput: ")
    line = input()
```

## 5 推理时显存占用

```
+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|    1   N/A  N/A     21373      C   python                           5899MiB |
+-----------------------------------------------------------------------------+
```

除此之外，还可以不进行合并权重，直接进行推理，但是此时模型推理的显存占用会高于合并之后进行模型推理。

## 6 参考
[1] [大模型参数高效微调技术原理综述（五）-LoRA、AdaLoRA、QLoRA](https://mp.weixin.qq.com/s?__biz=MzU3Mzg5ODgxMg==&mid=2247484828&idx=1&sn=06c839ce76548578d1ebf3ec91acb4bb&chksm=fd3beccfca4c65d9dcef7fab6616c29782dbe62bce458304444e9450a767d8d0bdce6b89edcf&scene=21#wechat_redirect)

[2] [高效微调技术QLoRA实战，基于LLaMA-65B微调仅需48G显存，真香](https://mp.weixin.qq.com/s/b4OixyHEvL_YfOJZukC2Ig)
