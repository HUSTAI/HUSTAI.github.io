---
author: lx
icon: wand-magic-sparkles
date: 2023-09-04
shortTitle: "用GPT-4创建会议纪要生成AI"
category:
  - 提示技术
tag:
  - LLM
  - Tools
---

# 用GPT-4创建会议纪要生成AI

大型语言模型 `GPT-4` 发布已经有些时日了，基于其开发的应用也层出不穷，不断涌现。这些应用的强大能力已经为许多用户的大量任务场景提供了助力。这里介绍的是 `OpenAI` 的一份官方文档，其中详细介绍了使用其语音识别模型 `Whisper` 和大型语言模型 `GPT-4` 创建会议纪要生成器的全流程。

<!-- more -->

本教程将介绍如何使用 `OpenAI` 的 `Whisper` 和 `GPT-4` 模型开发一个自动会议纪要生成器。该应用的功能是转录会议音频、总结讨论的内容、提取要点和行动项目以及执行情绪分析。

---

## 1 基础技能

项目需要安装 `python-docx` 和 `OpenAI` 库。这里使用以下命令新建一个 `Python` 环境并安装所需软件包：

```shell
python -m venv env

source env/bin/activate

pip install openai
pip install python-docx
```

## 2 使用 Whisper 转录音频

转录会议音频的第一步是将会议的音频文件传递给 `OpenAI` 的 `/v1/audio API`。`Whisper` 是支持该音频 `API` 的模型，其可**将口语转换成文本**。开始会避免传递 `prompt` 或温度参数（用于控制模型输出的可选参数），坚持使用默认值。

接下来，导入所需的软件包并定义一个函数 —— 该函数的功能是使用 Whisper 读取音频文件并转录它：

```python
import openai
from docx import Document

def transcribe_audio(audio_file_path):
    with open(audio_file_path, 'rb') as audio_file:
        transcription = openai.Audio.transcribe("whisper-1", audio_file)
    return transcription['text']
```

在该函数中，`audio_file_path` 是你想要转录的音频文件的路径。该函数会打开文件并将其传递给 `Whisper ASR` 模型（`whisper-1`）进行转录。其返回的结果是原始文本形式。需要着重指出，`openai.Audio.transcribe` 函数需要传入实际的音频文件，而不仅仅是本地或远程服务器上文件的路径。这意味着，如果你在一个可能没有存储音频文件的服务器上运行代码，那么你可能需要一个预处理步骤将音频文件首先下载到该设备上。


## 3 使用 GPT-4 总结和分析转录文本

获得转录文本后，使用 `ChatCompletions API` 将其传递给 `GPT-4`。`GPT-4` 是 `OpenAI` 推出的当前最佳的大型语言模型，将被用于**生成摘要**、**提取要点**和**行动项目**并执行**情感分析**。

对于我们想要 `GPT-4` 执行的每一项不同任务，教程使用不同的函数。这不是完成该任务的最高效的方法（你可以将这些指令放入一个函数内），但是将这些任务分开能让摘要的质量更高。

为了分开这些任务，定义一个函数 `meeting_minutes` 并将其作为该应用的主函数：

```python
def meeting_minutes(transcription):
    abstract_summary = abstract_summary_extraction(transcription)
    key_points = key_points_extraction(transcription)
    action_items = action_item_extraction(transcription)
    sentiment = sentiment_analysis(transcription)
    return {
        'abstract_summary': abstract_summary,
        'key_points': key_points,
        'action_items': action_items,
        'sentiment': sentiment
    }
```

在这个函数中，`transcription` 是从 `Whisper` 获得的文本。`transcription` 可以转递给四个其它函数，其中每个函数都执行一个特定任务：`abstract_summary_extraction` 用于**生成会议摘要**、`key_points_extraction` 用于**提取要点**、`action_item_extraction` 用于**识别行动项目**、`sentiment_analysis` 用于执行**情感分析**。如果你还想添加其它功能，可以使用上面所示的相同框架。


### 3.1 摘要提取

`abstract_summary_extraction` 函数的功能是将转录文本总结成一段简洁的摘要，目的是保留最重要的要点，同时避免不必要的细节或离题内容。实现这一过程的主要机制是如下的系统消息。通过所谓的 prompt 工程设计，有[许多不同的可能方式](https://platform.openai.com/docs/guides/gpt-best-practices)都能得到相近的结果。

```python
def abstract_summary_extraction(transcription):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": "You are a highly skilled AI trained in language comprehension and summarization. I would like you to read the following text and summarize it into a concise abstract paragraph. Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text. Please avoid unnecessary details or tangential points."
            },
            {
                "role": "user",
                "content": transcription
            }
        ]
    )
    return response['choices'][0]['message']['content']
```

### 3.2 要点提取

`key_points_extraction` 函数的功能是识别并罗列会议讨论的重点。这些要点应该包括最重要的想法、发现或对会议讨论的实质至关重要的话题。同样，控制识别这些要点的主要机制是系统消息。这里你可能需要给出一些额外的信息来说明你的项目或公司的经营方式，比如：「我们是一家向消费者销售赛车的公司。我们做的是什么，目标是什么。」这些额外信息可以极大提升模型提取相关信息的能力。

```python

def key_points_extraction(transcription):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": "You are a proficient AI with a specialty in distilling information into key points. Based on the following text, identify and list the main points that were discussed or brought up. These should be the most important ideas, findings, or topics that are crucial to the essence of the discussion. Your goal is to provide a list that someone could read to quickly understand what was talked about."
            },
            {
                "role": "user",
                "content": transcription
            }
        ]
    )
    return response['choices'][0]['message']['content']
```

### 3.3 行动项目提取

`action_item_extraction` 函数的功能是识别会议期间达成一致或被提及的任务、工作分配或行动。具体可能包括指派给特定个人的任务或集体决定采取的行动。尽管本教程不会详细解释，但 `Chat Completions API` 提供了一个函数，其功能是让用户在任务管理软件中自动创建任务并将其指派给相关人员。

```python
def action_item_extraction(transcription):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": "You are an AI expert in analyzing conversations and extracting action items. Please review the text and identify any tasks, assignments, or actions that were agreed upon or mentioned as needing to be done. These could be tasks assigned to specific individuals, or general actions that the group has decided to take. Please list these action items clearly and concisely."
            },
            {
                "role": "user",
                "content": transcription
            }
        ]
    )
    return response['choices'][0]['message']['content']
```

### 3.4 情感分析

`sentiment_analysis` 函数的功能是分析会议讨论的整体情感。它会考虑语气、所用语言传达的情绪、词和短语所在的上下文。对于复杂度不高的任务，除了 `gpt-4` 之外，`gpt-3.5-turbo` 也值得一试，你可以看看是否能获得相近的性能水平。你也可以将 `sentiment_analysis` 函数的结果传递给其它函数，看看对话的情感会对其它属性产生何种影响，这可能也很有用。

```python
def sentiment_analysis(transcription):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": "As an AI with expertise in language and emotion analysis, your task is to analyze the sentiment of the following text. Please consider the overall tone of the discussion, the emotion conveyed by the language used, and the context in which words and phrases are used. Indicate whether the sentiment is generally positive, negative, or neutral, and provide brief explanations for your analysis where possible."
            },
            {
                "role": "user",
                "content": transcription
            }
        ]
    )
    return response['choices'][0]['message']['content']
```

## 4 导出会议纪要

生成会议纪要后，我们通常需要将其保存为人类可读且易于分发的格式。此类报告的一种常见格式是 `Microsoft Word`。`Python docx` 软件库是一个用于创建 `Word` 文档的常用开源软件库。如果你想构建一个端到端的会议纪要应用，你可能会考虑移除这个导出步骤，而是将摘要放在后续跟进的电子邮件中一并发送。

要实现这个导出过程，可以定义一个将原始文本转换成 `Word` 文档的函数 `save_as_docx`。

```python
def save_as_docx(minutes, filename):
    doc = Document()
    for key, value in minutes.items():
        # Replace underscores with spaces and capitalize each word for the heading
        heading = ' '.join(word.capitalize() for word in key.split('_'))
        doc.add_heading(heading, level=1)
        doc.add_paragraph(value)
        # Add a line break between sections
        doc.add_paragraph()
    doc.save(filename)
```

在这个函数中，`minutes` 是一个词典，包含会议的摘要、要点、行动项目和情感分析。`filename` 是要创建的 `Word` 文档文件的名称。这个函数会创建一个新 `Word` 文档，并为该纪要的每个部分添加标题和内容，然后将该文档保存到当前工作目录。

最后，将所有内容放在一起，从音频文件生成会议纪要：

```python
audio_file_path = "Earningscall.wav"
transcription = transcribe_audio(audio_file_path)
minutes = meeting_minutes(transcription)
print(minutes)

save_as_docx(minutes, 'meeting_minutes.docx')
```

这段代码首先会转录音频文件 `Earningscall.wav`，再生成会议纪要并输出，然后将会议纪要保存为一个 `Word` 文档并命名为 `meeting_minutes.docx`。这就是基本的会议纪要处理步骤，请试试看通过 prompt 工程设计优化其性能或通过本地函数调用构建一个端到端系统。

