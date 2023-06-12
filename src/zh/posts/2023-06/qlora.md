---
author: wkyc
icon: pen-to-square
date: 2023-06-12
category:
  - finetinue
tag:
  - lora
  - gpt
star: true
---

# 让微调更高效

低秩自适应（LoRA）技术可以提高微调的效率，可以在单个24GB显存GPU上对70亿参数LLaMA模型进行微调。而最近发布的一个新技术QLoRA（量化LoRA）可以在单个 48GB显存的GPU上训练650亿参数的LLaMA模型，量化的4位参数设置下，训练后得到的65B Guanaco模型保持了完整的16位微调任务性能，并且仅在微调24小时后就达到了ChatGPT性能的99.3%。
