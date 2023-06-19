---
author: lx
icon: pen-to-square
date: 2023-06-05
shortTitle: PEARL
category:
  - 语言模型
tag:
  - 推理
  - LLM
---

# PEARL: 长文档推理提示框架

该文介绍了 `PEARL` 框架，旨在提升**大型语言模型对长篇文档的理解能力**，在 `Zero-shot` 情况下，性能比GPT-4高 `10.5%`！`PEARL` 被认为是利用语言模型进行**复杂推理**的重要步骤，为新的推理可能性打开了大门。

<!-- more -->

::: tip
[GitHub CodeBase 代码目前还没放出来](https://github.com/SimengSun/pearl)
:::

<PDF url="https://arxiv.org/pdf/2305.14564.pdf" />

---

## 1 背景介绍

现实中的语料错综复杂，通常需要在较长的上下文中推理得到最后的结果，该文[^paper]任务在长篇文本中进行复杂的推理通常需要形成**文本的高级抽象**（例如，对文档叙事中的情节和主题进行摘要和抽象），并在这些抽象之上进行各种推理。

让我们来考虑`QuaLITY`数据集[^quality] 中关于 `Breakaway` 的问题：“在结尾中哪些句子与开场句子相对应？”。

为了回答上述问题，需要从整个故事中收集、评估和整合信息，解决问题的思路可以拆解为以下的几个步骤。

（1）确定初始对话中的所有参与者；
（2） 总结初始对话；
（3） 总结最终场景的事件和主题；
（4） 总结最终场景中对话参与者的角色；
（5） 识别和排列对话与最终场景之间的联系。

鉴于大语言模型（`Large Language Models, LLMs`）的能力快速提升，可以直接提示LLMs生成答案，但是之前的研究表明 `LLMs` 在**逻辑推理**相对较弱，并且不如链式思维（`Chain of thought, CoT`）。因为 `CoT` 可以引导 `LLMs` 给出每一步的解释和中间输出，最后再给出答案。

但是**原始问题的分解**和**每个步骤的中间输出**都很难获得，因此 `CoT` 不适用于涉及长文档的复杂推理任务。

> 鉴于获得长文档的分解和中间解释的困难，一个潜在的解决方案是将这个任务分配给**较小的可执行模块**，而不是强迫LLMs一次性给出所有的解释。基于上述原因，作者提出了一个专门用于长文档推理的提示框架PEARL」，性能比GPT-4高10.5%。

:::: details 数据示例

```json
{
  "article_id":"23592",
  "set_unique_id":"23592_UIJQGZDK",
  "batch_num":"22",
  "writer_id":"1016",
  "source":"Gutenberg",
  "title":"Breakaway",
  "year":1964,
  "author":"Gimble, Stanley",
  "topic":"PS; Short stories; Science fiction",
  "article":"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"\n     \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n <html xmlns=\"http://www.w3.org/1999/xhtml\">\n  <p class=\"center\">\n   Transcriber's Note: This etext was produced from Astounding Science\n Fiction December 1955. Extensive research did not uncover any evidence\n that the U.S. copyright on this publication was renewed.\n  </p>\n  <p class=\"center\">\n  </p>\n  <hr style=\"width: 65%;\"/>\n  <h1>\n   BREAKAWAY\n  </h1>\n  <h2>\n   BY STANLEY GIMBLE\n  </h2>\n  <h2>\n   Illustrated by Freas\n  </h2>\n  <p class=\"center\">\n   <i>\n    She surely got her wish ... but there was some question about getting\n what she wanted.\n   </i>\n  </p>\n  <p>\n   Phil Conover pulled the zipper of his flight suit up the front of his\n long, thin body and came into the living room. His face, usually serious\n and quietly handsome, had an alive, excited look. And the faint lines\n around his dark, deep-set eyes were accentuated when he smiled at his\n wife.\n  </p>\n  <p>\n   \"All set, honey. How do I look in my monkey suit?\"\n  </p>\n  <p>\n   His wife was sitting stiffly on the flowered couch that was still not\n theirs completely. In her fingers she held a cigarette burned down too\n far. She said, \"You look fine, Phil. You look just right.\" She managed a\n smile. Then she leaned forward and crushed the cigarette in the ash\n tray on the maple coffee table and took another from the pack.\n  </p>\n  <p>\n   He came to her and touched his hands to her soft blond hair, raising her\n face until she was looking into his eyes. \"You're the most beautiful\n girl I know. Did I ever tell you that?\"\n  </p>\n  <p>\n   \"Yes, I think so. Yes, I'm sure you did,\" she said, finishing the\n ritual; but her voice broke, and she turned her head away. Phil sat\n beside her and put his arm around her small shoulders. He had stopped\n smiling.\n  </p>\n  <p>\n   \"Honey, look at me,\" he said. \"It isn't going to be bad. Honestly it\n isn't. We know exactly how it will be. If anything could go wrong, they\n wouldn't be sending me; you know that. I told you that we've sent five\n un-manned ships up and everyone came back without a hitch.\"\n  </p>\n  <p>\n   She turned, facing him. There were tears starting in the corners of her\n wide, brown eyes, and she brushed them away with her hand.\n  </p>\n  <p>\n   \"Phil, don't go. Please don't. They can send Sammy. Sammy doesn't have a\n wife. Can't he go? They'd understand, Phil. Please!\" She was holding his\n arms tightly with her hands, and the color had drained from her cheeks.\n  </p>\n  <p>\n   \"Mary, you know I can't back out now. How could I? It's been three\n years. You know how much I've wanted to be the first man to go. Nothing\n would ever be right with me again if I didn't go. Please don't make it\n hard.\" He stopped talking and held her to him and stroked the back of\n her head. He could feel her shoulders shaking with quiet sobs. He\n released her and stood up.\n  </p>\n  <p>\n   \"I've got to get started, Mary. Will you come to the field with me?\"\n  </p>\n  <p>\n   \"Yes, I'll come to say good-by.\" She paused and dropped her eyes. \"Phil,\n if you go, I won't be here when you get back—if you get back. I won't\n be here because I won't be the wife of a space pilot for the rest of my\n life. It isn't the kind of life I bargained for. No matter how much I\n love you, I just couldn't take that, Phil. I'm sorry. I guess I'm not\n the noble sort of wife.\"\n  </p>\n  <p>\n   She finished and took another cigarette from the pack on the coffee\n table and put it to her lips. Her hand was trembling as she touched the\n lighter to the end of the cigarette and drew deeply. Phil stood watching\n her, the excitement completely gone from his eyes.\n  </p>\n  <p>\n   \"I wish you had told me this a long time ago, Mary,\" Phil said. His\n voice was dry and low. \"I didn't know you felt this way about it.\"\n  </p>\n  <p>\n   \"Yes, you did. I told you how I felt. I told you I could never be the\n wife of a space pilot. But I don't think I ever really believed it was\n possible—not until this morning when you said tonight was the take-off.\n It's so stupid to jeopardize everything we've got for a ridiculous\n dream!\"\n  </p>\n  <p>\n   He sat down on the edge of the couch and took her hands between his.\n \"Mary, listen to me,\" he said. \"It isn't a dream. It's real. There's\n nothing means anything more to me than you do—you know that. But no\n man ever had the chance to do what I'm going to do tonight—no man ever.\n If I backed out now for any reason, I'd never be able to look at the sky\n again. I'd be through.\"\n  </p>\n  <p>\n   She looked at him without seeing him, and there was nothing at all in\n her eyes.\n  </p>\n  <p>\n   \"Let's go, if you're still going,\" she finally said.\n  </p>\n  <hr style=\"width: 45%;\"/>\n  <p>\n   They drove through the streets of the small town with its small\n bungalows, each alike. There were no trees and very little grass. It was\n a new town, a government built town, and it had no personality yet. It\n existed only because of the huge ship standing poised in the take-off\n zone five miles away in the desert. Its future as a town rested with the\n ship, and the town seemed to feel the uncertainty of its future, seemed\n ready to stop existing as a town and to give itself back to the desert,\n if such was its destiny.\n  </p>\n  <p>\n   Phil turned the car off the highway onto the rutted dirt road that led\n across the sand to the field where the ship waited. In the distance they\n could see the beams of the searchlights as they played across the\n take-off zone and swept along the top of the high wire fence stretching\n out of sight to right and left. At the gate they were stopped by the\n guard. He read Phil's pass, shined his flashlight in their faces, and\n then saluted. \"Good luck, colonel,\" he said, and shook Phil's hand.\n  </p>\n  <p>\n   \"Thanks, sergeant. I'll be seeing you next week,\" Phil said, and smiled.\n They drove between the rows of wooden buildings that lined the field,\n and he parked near the low barbed fence ringing the take-off zone. He\n turned off the ignition, and sat quietly for a moment before lighting a\n cigarette. Then he looked at his wife. She was staring through the\n windshield at the rocket two hundred yards away. Its smooth polished\n surface gleamed in the spotlight glare, and it sloped up and up until\n the eye lost the tip against the stars.\n  </p>\n  <p>\n   \"She's beautiful, Mary. You've never seen her before, have you?\"\n  </p>\n  <p>\n   \"No, I've never seen her before,\" she said. \"Hadn't you better go?\" Her\n voice was strained and she held her hands closed tightly in her lap.\n \"Please go now, Phil,\" she said.\n  </p>\n  <p>\n   He leaned toward her and touched her cheek. Then she was in his arms,\n her head buried against his shoulder.\n  </p>\n  <p>\n   \"Good-by, darling,\" she said.\n  </p>\n  <p>\n   \"Wish me luck, Mary?\" he asked.\n  </p>\n  <p>\n   \"Yes, good luck, Phil,\" she said. He opened the car door and got out.\n The noise of men and machines scurrying around the ship broke the spell\n of the rocket waiting silently for flight.\n  </p>\n  <p>\n   \"Mary, I—\" he began, and then turned and strode toward the\n administration building without looking back.\n  </p>\n  <hr style=\"width: 45%;\"/>\n  <p>\n   Inside the building it was like a locker room before the big game. The\n tension stood alone, and each man had the same happy, excited look that\n Phil had worn earlier. When he came into the room, the noise and bustle\n stopped. They turned as one man toward him, and General Small came up to\n him and took his hand.\n  </p>\n  <p>\n   \"Hello, Phil. We were beginning to think you weren't coming. You all\n set, son?\"\n  </p>\n  <p>\n   \"Yes, sir, I'm all set, I guess,\" Phil said.\n  </p>\n  <p>\n   \"I'd like you to meet the Secretary of Defense, Phil. He's over here by\n the radar.\"\n  </p>\n  <p>\n   As they crossed the room, familiar faces smiled, and each man shook his\n hand or touched his arm. He saw Sammy, alone, by the coffee urn. Sammy\n waved to him, but he didn't smile. Phil wanted to talk to him, to say\n something; but there was nothing to be said now. Sammy's turn would come\n later.\n  </p>\n  <p>\n   \"Mr. Secretary,\" the general said, \"this is Colonel Conover. He'll be\n the first man in history to see the other side of the Moon. Colonel—the\n Secretary of Defense.\"\n  </p>\n  <p>\n   \"How do you do, sir. I'm very proud to meet you,\" Phil said.\n  </p>\n  <p>\n   \"On the contrary, colonel. I'm very proud to meet you. I've been looking\n at that ship out there and wondering. I almost wish I were a young man\n again. I'd like to be going. It's a thrilling thought—man's first\n adventure into the universe. You're lighting a new dawn of history,\n colonel. It's a privilege few men have ever had; and those who have had\n it didn't realize it at the time. Good luck, and God be with you.\"\n  </p>\n  <p>\n   \"Thank you, sir. I'm aware of all you say. It frightens me a little.\"\n  </p>\n  <p>\n   The general took Phil's arm and they walked to the briefing room. There\n were chairs set up for the scientists and Air Force officers directly\n connected with the take-off. They were seated now in a semicircle in\n front of a huge chart of the solar system. Phil took his seat, and the\n last minute briefing began. It was a routine he knew by heart. He had\n gone over and over it a thousand times, and he only half listened now.\n He kept thinking of Mary outside, alone by the fence.\n  </p>\n  <p>\n   The voice of the briefing officer was a dull hum in his ears.\n  </p>\n  <p>\n   \"... And orbit at 18,000-mph. You will then accelerate for the breakaway\n to 24,900-mph for five minutes and then free-coast for 116 hours\n until—\"\n  </p>\n  <p>\n   Phil asked a few questions about weather and solar conditions. And then\n the session was done. They rose and looked at each other, the same\n unanswered questions on each man's face. There were forced smiles and\n handshakes. They were ready now.\n  </p>\n  <p>\n   \"Phil,\" the general said, and took him aside.\n  </p>\n  <p>\n   \"Sir?\"\n  </p>\n  <p>\n   \"Phil, you're ... you feel all right, don't you, son?\"\n  </p>\n  <p>\n   \"Yes, sir. I feel fine. Why?\"\n  </p>\n  <p>\n   \"Phil, I've spent nearly every day with you for three years. I know you\n better than I know myself in many ways. And I've studied the\n psychologist's reports on you carefully. Maybe it's just nervousness,\n Phil, but I think there's something wrong. Is there?\"\n  </p>\n  <p>\n   \"No, sir. There's nothing wrong,\" Phil said, but his voice didn't carry\n conviction. He reached for a cigarette.\n  </p>\n  <p>\n   \"Phil, if there is anything—anything at all—you know what it might\n mean. You've got to be in the best mental and physical condition of your\n life tonight. You know better than any man here what that means to our\n success. I think there is something more than just natural apprehension\n wrong with you. Want to tell me?\"\n  </p>\n  <hr style=\"width: 45%;\"/>\n  <p>\n   Outside, the take-off zone crawled with men and machines at the base of\n the rocket. For ten hours, the final check-outs had been in progress;\n and now the men were checking again, on their own time. The thing they\n had worked toward for six years was ready to happen, and each one felt\n that he was sending just a little bit of himself into the sky. Beyond\n the ring of lights and moving men, on the edge of the field, Mary stood.\n Her hands moved slowly over the top of the fence, twisting the barbs of\n wire. But her eyes were on the ship.\n  </p>\n  <p>\n   And then they were ready. A small group of excited men came out from the\n administration building and moved forward. The check-out crews climbed\n into their machines and drove back outside the take-off zone. And,\n alone, one man climbed the steel ladder up the side of the\n rocket—ninety feet into the air. At the top he waved to the men on the\n ground and then disappeared through a small port.\n  </p>\n  <p>\n   Mary waved to him. \"Good-by,\" she said to herself, but the words stuck\n tight in her throat.\n  </p>\n  <p>\n   The small group at the base of the ship turned and walked back to the\n fence. And for an eternity the great ship stood alone, waiting. Then,\n from deep inside, a rumble came, increasing in volume to a gigantic roar\n that shook the earth and tore at the ears. Slowly, the first manned\n rocket to the Moon lifted up and up to the sky.\n  </p>\n  <hr style=\"width: 45%;\"/>\n  <p>\n   For a long time after the rocket had become a tiny speck of light in the\n heavens, she stood holding her face in her hands and crying softly to\n herself. And then she felt the touch of a hand on her arm. She turned.\n  </p>\n  <p>\n   \"Phil! Oh, Phil.\" She held tightly to him and repeated his name over and\n over.\n  </p>\n  <p>\n   \"They wouldn't let me go, Mary,\" he said finally. \"The general would not\n let me go.\"\n  </p>\n  <p>\n   She looked at him. His face was drawn tight, and there were tears on his\n cheeks. \"Thank, God,\" she said. \"It doesn't matter, darling. The only\n thing that matters is you didn't go.\"\n  </p>\n  <p>\n   \"You're right, Mary,\" he said. His voice was low—so low she could\n hardly hear him. \"It doesn't matter. Nothing matters now.\" He stood with\n his hands at his sides, watching her. And then turned away and walked\n toward the car.\n  </p>\n  <p class=\"center\">\n   THE END\n  </p>\n </html>\n",
  "questions":[
    {
      "question":"How is Mary feeling at the beginning of the story?",
      "question_unique_id":"23592_UIJQGZDK_1",
      "options":[
        "She is desperate for Phil not to leave.",
        "She is angry at Phil for not taking her seriously.",
        "She is frustrated with Phil for not letting Sammy replace him.",
        "She is depressed because she thinks she is going to lose Phil forever."
      ],
      "writer_label":1,
      "gold_label":1,
      "validation":[
        {
          "untimed_annotator_id":"0021",
          "untimed_answer":1,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":2,
          "untimed_best_distractor":4
        },
        {
          "untimed_annotator_id":"0010",
          "untimed_answer":1,
          "untimed_eval1_answerability":2,
          "untimed_eval2_context":2,
          "untimed_best_distractor":4
        },
        {
          "untimed_annotator_id":"0016",
          "untimed_answer":1,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":1,
          "untimed_best_distractor":4
        }
      ],
      "speed_validation":[
        {
          "speed_annotator_id":"0003",
          "speed_answer":1
        },
        {
          "speed_annotator_id":"0016",
          "speed_answer":1
        },
        {
          "speed_annotator_id":"0026",
          "speed_answer":3
        },
        {
          "speed_annotator_id":"0021",
          "speed_answer":1
        },
        {
          "speed_annotator_id":"0024",
          "speed_answer":1
        }
      ],
      "difficult":0
    },
    {
      "question":"How is Phil feeling at the beginning of the story?",
      "question_unique_id":"23592_UIJQGZDK_2",
      "options":[
        "He is nervous about the mission but hopeful that it will be a success and he could return home.",
        "He is uncertain if he is the right person to go on this mission.",
        "He is upset by the way Mary stifles his hopes.",
        "He is too excited about fulfilling his dream that he ignores everything else going on around him."
      ],
      "writer_label":3,
      "gold_label":3,
      "validation":[
        {
          "untimed_annotator_id":"0021",
          "untimed_answer":1,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":2,
          "untimed_best_distractor":3
        },
        {
          "untimed_annotator_id":"0010",
          "untimed_answer":3,
          "untimed_eval1_answerability":2,
          "untimed_eval2_context":2,
          "untimed_best_distractor":4
        },
        {
          "untimed_annotator_id":"0016",
          "untimed_answer":3,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":1,
          "untimed_best_distractor":4
        }
      ],
      "speed_validation":[
        {
          "speed_annotator_id":"0034",
          "speed_answer":3
        },
        {
          "speed_annotator_id":"0038",
          "speed_answer":3
        },
        {
          "speed_annotator_id":"0020",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0037",
          "speed_answer":1
        },
        {
          "speed_annotator_id":"0018",
          "speed_answer":3
        }
      ],
      "difficult":0
    },
    {
      "question":"Why does Mary ask Phil to go to the rocket as soon as they can see it?",
      "question_unique_id":"23592_UIJQGZDK_3",
      "options":[
        "She was not allowed to stay there, as a civilian, so she had to leave.",
        "She did not want him to be late for his very important mission.",
        "She needed to drop them off so she could leave.",
        "She did not want to prolong the painful goodbye."
      ],
      "writer_label":4,
      "gold_label":4,
      "validation":[
        {
          "untimed_annotator_id":"0021",
          "untimed_answer":4,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":3,
          "untimed_best_distractor":2
        },
        {
          "untimed_annotator_id":"0010",
          "untimed_answer":4,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":3,
          "untimed_best_distractor":3
        },
        {
          "untimed_annotator_id":"0016",
          "untimed_answer":4,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":2,
          "untimed_best_distractor":2
        }
      ],
      "speed_validation":[
        {
          "speed_annotator_id":"0020",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0012",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0010",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0004",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0038",
          "speed_answer":4
        }
      ],
      "difficult":0
    },
    {
      "question":"What do you think life is like for Mary and Phil after the events of the story?",
      "question_unique_id":"23592_UIJQGZDK_4",
      "options":[
        "Mary is thankful that Phil did not leave, and their lives continue as normal.",
        "They become closer friends with Sammy who is thankful to have gone on the mission.",
        "Phil closes himself off, resenting Mary for forcing his hand.",
        "Mary helps Phil find another mission closer to home."
      ],
      "writer_label":3,
      "gold_label":3,
      "validation":[
        {
          "untimed_annotator_id":"0021",
          "untimed_answer":3,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":4,
          "untimed_best_distractor":1
        },
        {
          "untimed_annotator_id":"0010",
          "untimed_answer":3,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":4,
          "untimed_best_distractor":1
        },
        {
          "untimed_annotator_id":"0016",
          "untimed_answer":3,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":3,
          "untimed_best_distractor":1
        }
      ],
      "speed_validation":[
        {
          "speed_annotator_id":"0017",
          "speed_answer":3
        },
        {
          "speed_annotator_id":"0034",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0012",
          "speed_answer":1
        },
        {
          "speed_annotator_id":"0003",
          "speed_answer":3
        },
        {
          "speed_annotator_id":"0016",
          "speed_answer":1
        }
      ],
      "difficult":1
    },
    {
      "question":"What prompted the general to take Phil off of the mission?",
      "question_unique_id":"23592_UIJQGZDK_5",
      "options":[
        "Phil was too torn about his disagreement with his wife to be in the right headspace.",
        "Phil had expressed concerns about the safety of the mission compared to the unmanned missions.",
        "Phil's hands were shaking, so he could not safely operate the controls.",
        "Phil was too nervous and was not thinking straight."
      ],
      "writer_label":1,
      "gold_label":1,
      "validation":[
        {
          "untimed_annotator_id":"0021",
          "untimed_answer":1,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":3,
          "untimed_best_distractor":4
        },
        {
          "untimed_annotator_id":"0010",
          "untimed_answer":1,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":2,
          "untimed_best_distractor":4
        },
        {
          "untimed_annotator_id":"0016",
          "untimed_answer":1,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":2,
          "untimed_best_distractor":4
        }
      ],
      "speed_validation":[
        {
          "speed_annotator_id":"0014",
          "speed_answer":1
        },
        {
          "speed_annotator_id":"0034",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0010",
          "speed_answer":1
        },
        {
          "speed_annotator_id":"0020",
          "speed_answer":2
        },
        {
          "speed_annotator_id":"0037",
          "speed_answer":1
        }
      ],
      "difficult":0
    },
    {
      "question":"Which of these is a reason that Mary would have wanted Sammy to replace Phil?",
      "question_unique_id":"23592_UIJQGZDK_6",
      "options":[
        "She knows that Sammy is more careful, and would have a greater chance at mission success.",
        "She thought she could protect herself if someone else went.",
        "She thought that Sammy was more qualified.",
        "She thought but his lack of family showed his dedication to his job."
      ],
      "writer_label":2,
      "gold_label":2,
      "validation":[
        {
          "untimed_annotator_id":"0021",
          "untimed_answer":4,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":1,
          "untimed_best_distractor":3
        },
        {
          "untimed_annotator_id":"0010",
          "untimed_answer":2,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":2,
          "untimed_best_distractor":4
        },
        {
          "untimed_annotator_id":"0016",
          "untimed_answer":2,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":1,
          "untimed_best_distractor":4
        }
      ],
      "speed_validation":[
        {
          "speed_annotator_id":"0038",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0003",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0017",
          "speed_answer":1
        },
        {
          "speed_annotator_id":"0001",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0028",
          "speed_answer":4
        }
      ],
      "difficult":1
    },
    {
      "question":"What were the unanswered questions that the men had after the weather briefing?",
      "question_unique_id":"23592_UIJQGZDK_7",
      "options":[
        "They did not know how the public would react to the event.",
        "They did not know how well they could predict weather so far away.",
        "They were not sure if Phil could go on the mission.",
        "There is still level uncertainty in the success of the mission."
      ],
      "writer_label":4,
      "gold_label":4,
      "validation":[
        {
          "untimed_annotator_id":"0021",
          "untimed_answer":4,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":3,
          "untimed_best_distractor":2
        },
        {
          "untimed_annotator_id":"0010",
          "untimed_answer":3,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":2,
          "untimed_best_distractor":4
        },
        {
          "untimed_annotator_id":"0016",
          "untimed_answer":4,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":1,
          "untimed_best_distractor":2
        }
      ],
      "speed_validation":[
        {
          "speed_annotator_id":"0024",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0014",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0001",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0010",
          "speed_answer":3
        },
        {
          "speed_annotator_id":"0020",
          "speed_answer":4
        }
      ],
      "difficult":0
    },
    {
      "question":"How long was Mary standing outside?",
      "question_unique_id":"23592_UIJQGZDK_8",
      "options":[
        "She had gone home but came back for the launch.",
        "For almost half a day.",
        "For a couple hours as Phil went through pre-boarding procedure.",
        "A full 24 hours."
      ],
      "writer_label":2,
      "gold_label":2,
      "validation":[
        {
          "untimed_annotator_id":"0021",
          "untimed_answer":2,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":2,
          "untimed_best_distractor":3
        },
        {
          "untimed_annotator_id":"0010",
          "untimed_answer":3,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":2,
          "untimed_best_distractor":2
        },
        {
          "untimed_annotator_id":"0016",
          "untimed_answer":2,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":1,
          "untimed_best_distractor":1
        }
      ],
      "speed_validation":[
        {
          "speed_annotator_id":"0021",
          "speed_answer":2
        },
        {
          "speed_annotator_id":"0024",
          "speed_answer":1
        },
        {
          "speed_annotator_id":"0010",
          "speed_answer":3
        },
        {
          "speed_annotator_id":"0012",
          "speed_answer":1
        },
        {
          "speed_annotator_id":"0028",
          "speed_answer":2
        }
      ],
      "difficult":1
    },
    {
      "question":"What is the most salient part of the final scene the reflects on the initial conversation?",
      "question_unique_id":"23592_UIJQGZDK_9",
      "options":[
        "Mary promising she would only stay with him if he did not go",
        "Phil knowing he wouldn't be the same if he did not go on the mission",
        "The fact that their love was stronger than Phil's independent goals",
        "Phil decided not to go on the mission in the end"
      ],
      "writer_label":2,
      "gold_label":2,
      "validation":[
        {
          "untimed_annotator_id":"0021",
          "untimed_answer":2,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":4,
          "untimed_best_distractor":1
        },
        {
          "untimed_annotator_id":"0010",
          "untimed_answer":2,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":1,
          "untimed_best_distractor":3
        },
        {
          "untimed_annotator_id":"0016",
          "untimed_answer":1,
          "untimed_eval1_answerability":3,
          "untimed_eval2_context":4,
          "untimed_best_distractor":4
        }
      ],
      "speed_validation":[
        {
          "speed_annotator_id":"0020",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0018",
          "speed_answer":3
        },
        {
          "speed_annotator_id":"0037",
          "speed_answer":3
        },
        {
          "speed_annotator_id":"0026",
          "speed_answer":2
        },
        {
          "speed_annotator_id":"0001",
          "speed_answer":4
        }
      ],
      "difficult":1
    },
    {
      "question":"What would have happened if Phil had gone on the mission?",
      "question_unique_id":"23592_UIJQGZDK_10",
      "options":[
        "Mary would have forgiven him for following his dreams and they would work together to continue their relationship.",
        "His anger would've caused him to make a mistake that would have ended in his death.",
        "He would have been ecstatic to finally have lived his dream, and gone on to live his life.",
        "He would still have been disappointed after fulfilling his dream because of how things ended with Mary."
      ],
      "writer_label":4,
      "gold_label":4,
      "validation":[
        {
          "untimed_annotator_id":"0021",
          "untimed_answer":4,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":3,
          "untimed_best_distractor":2
        },
        {
          "untimed_annotator_id":"0010",
          "untimed_answer":4,
          "untimed_eval1_answerability":1,
          "untimed_eval2_context":4,
          "untimed_best_distractor":3
        },
        {
          "untimed_annotator_id":"0016",
          "untimed_answer":3,
          "untimed_eval1_answerability":3,
          "untimed_eval2_context":3,
          "untimed_best_distractor":4
        }
      ],
      "speed_validation":[
        {
          "speed_annotator_id":"0034",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0038",
          "speed_answer":3
        },
        {
          "speed_annotator_id":"0020",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0037",
          "speed_answer":4
        },
        {
          "speed_annotator_id":"0018",
          "speed_answer":4
        }
      ],
      "difficult":0
    }
  ],
  "url":"http://aleph.gutenberg.org/2/3/5/9/23592//23592-h//23592-h.htm",
  "license":"This eBook is for the use of anyone anywhere in the United States and most other parts of the world at no cost and with almost no restrictions whatsoever. You may copy it, give it away or re-use it under the terms of the Project Gutenberg License included with this eBook or online at www.gutenberg.org. If you are not located in the United States, you’ll have to check the laws of the country where you are located before using this ebook. Please refer to https://www.gutenberg.org/policy/license.html for the detailed license."
}
```
::::


## 2 PEARL框架

`PEARL` 框架主要包括三个阶段：**行动挖掘**，**计划构建**和**计划执行**（如图1所示）。具体而言，给定一个关于长文档的问题，`PEARL` 会将问题分解为一系列操作 `SUMMARIZE`，`FIND_EVENT`，`FIND_RELATION` 等一系列奥做，然后在文档上粉笔执行原子操作以获得答案。其中，`PEARL` 的每个阶段都是通过 `Zero-shot` 或 `Few-shot` 的 `LLM` 提示实现的。

![图1 PEARL框架](/assets/images/llm/pearl-1.png "图1 PEARL框架")

### 2.1 动作挖掘

`PEARL` 直接从**相似分布**的数据中进行动作挖掘（该文训练集问题为 QuALITY）。学习特定于数据集的操作使 `PEARL` 能够扩展到不同的领域和任务，因为用户查询在复杂性方面可能有很大差异。此外，从训练集中挖掘动作可以减少人们在新动作设计上的工作量，在该文中，将**动作**定义为长文档推理的基本单元。

![图2 动作挖掘](/assets/images/llm/pearl-2.png "图2 动作挖掘")

为了获得所有的原子动作，首先手动创建一小组**种子动作**以用作演示，如图2所示。给出一个示例问题，将其与种子动作和指令一起提供给 `LLM`，以生成更多任务特定的动作。每个 `ACTION` 都被格式化为带有输入参数的编程函数，然后是模型生成的自然语言函数定义。以下是 `LLM` 生成的操作示例，在对训练数据中的示例问题进行完整遍历后，我们获得了一组最终的动作及其相应的定义，然后将其合并到下一阶段的提示中。

```python
# Analyze the rela-tionship, attitude,
# or feelings between X and Y given the input context CTX
ANALYZE(CTX, X, Y)
```
### 2.2 计划生成

计划作为回答复杂问题的指导框架，它涉及多步推理以及对长文档的全局理解。给定一个问题，提示 `LLM` 根据先前挖掘的动作集生成计划，计划的每个步骤被格式化。

```python
output = ACTION (arg1, arg2, ...)，
```

### 2.3 计划执行

在上一阶段，`LLM`生成了一个计划，作为生成响应的模板。为了执行计划中的每个步骤，用模板提示 `LLM`，该模板填充了先前阶段的输出，如图3所示。

![图3 计划执行](/assets/images/llm/pearl-3.png "图3 计划执行")

为了执行 `FIND_BEHAVIOR_REASON` 操作，模型在提示模板中依次执行以下步骤。

（1）计划的动作和定义
（2）具有特定输入参数的当前动作
（3）赋值 包含前一阶段输出的参数名称
（4）当前步骤的单句指令，所有这些均由 LLM 生成。

由于该阶段涉及到较长的输入文章，因此以 `zero-shot` 方式执行提示。

### 2.4 自我纠错

计划是直接由 `LLM` 生成的，因此可能存在**格式错误**或**其他低质量**的问题。为了解决这个问题，我们在执行计划之前加入了自我校正步骤，并在将模型生成的计划作为上下文 `Few-shot`示例之前进行了自我细化步骤。通过实现的一个计划解析器，当计划不符合定义的格式时，返回相关的错误消息。无效的计划以及错误消息随后传递到 `LLM` 中，以修正计划的语法。为了确保模型生成的上下文示例的质量，通过执行计划并使用特定任务的评分函数评估生成的答案来验证它们。如果最终评估中答案被拒绝，我们将计划传递给 `LLM` 进行进一步的自我细化，然后将其作为`Few-shot` 示例包含在上下文中。


## 3 实验结果

`PEARL` 在需要对**长文本进行推理的问题上明显优于其他竞争的提示方法**，这表明了规划模块的实用性。

![图4 实验结果](/assets/images/llm/pearl-4.png "图4 实验结果")

在 `Longer` 上下文关联情况下，与 `Zero-shot GPT-4` 基线相比，`PEARL` 的表现有了显著改善（$72.4\text{％} \ vs\ 61.9\text{％}$）。该方法在短拆分上的表现不好，可能是由于“过度思考”这些更简单的问题以及计划执行步骤中的错误传播所致。

![图5 上下文长度影响](/assets/images/llm/pearl-5.png "图5 上下文长度影响")


## 4 参考

[^paper]: [一个专用于长文档推理的提示框架PEARL，性能比GPT-4高10.5%！](http://1v9.xyz/29Krfm)

[^quality]: [QuALITY数据集](https://paperswithcode.com/paper/quality-question-answering-with-long-input)
