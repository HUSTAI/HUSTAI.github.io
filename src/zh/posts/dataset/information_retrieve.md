---
author: 最后的开神-wkyc
icon: blog
date: 2023-11-07
category:
  - rag
tag:
  - 检索
  - rag
# sticky: 10
---

# QA类信息文本检索模型和数据集汇总
测试集格式一致为少量的query和大量的corpus，根据query来搜索corpus，每个query对应一个corpus作为正确的召回结果。
<!-- more -->
## 1 测试集
（1）CmedqaRetrieval  
链接：https://huggingface.co/datasets/C-MTEB/CmedqaRetrieval  
&nbsp;&nbsp;&nbsp;&nbsp;1）corpus：100k
```json
{
    "id": "48d8fad6a4196ed953efb5e71313d3e8",
    "text": "睾丸炎，这个情况吃了左氧和诺氟沙星，炎可宁片，病情有所好转，建议继续服用药物到症状消失后三天为止。这个情况在治疗时是不能吃辛辣刺激性的食物。"
}
```
&nbsp;&nbsp;&nbsp;&nbsp;2）query：4k
```json
{
    "id": "e6a90f19acc12055fb4c76a56d8a9f7e",
    "text": "睾丸炎引起的不孕不育王医生：我是六年前因腮腺炎引起睾丸炎因为当时没有治疗好。现在睾丸还会痛，去年做过睾丸穿刺检查睾丸不产生精子。请问可以采用什么方式进行治疗？慢慢的能够恢复正常吗？希望你能给予答复，谢谢。"
}
```
（2）CovidRetrieval  
链接：https://huggingface.co/datasets/C-MTEB/CovidRetrieval  
&nbsp;&nbsp;&nbsp;&nbsp;1）corpus：100k
```json
{
    "id": "73b19aa7dc6a0611ffa1a43a2633c692",
    "text": "天津再备3座“小汤山”新华社天津2月3日电（记者栗雅婷）天津市新型冠状病毒感染的肺炎疫情防控工作指挥部3日决定，除海河医院外，天津市海滨人民医院、天津医科大学总医院空港医院、天津市津南医院（新址）也将作为收治新型冠状病毒感染的肺炎患者定点医院，4家医院累计床位将达到2130张。截至2月3日10时，天津市共确诊新型冠状病毒感染的肺炎病例56例，而素有“天津小汤山”之称的海河医院共有床位600张。本着有备无患的原则，天津市防控指挥部决定再备3座“小汤山”。其中，天津医科大学总医院空港医院预留床位500张，天津市海滨人民医院预留床位500张，天津市津南医院（新址）预留床位530张。"
}
```
&nbsp;&nbsp;&nbsp;&nbsp;2）query：946
```json
{
    "id": "20960d5509bba258d150e6042b0f4589",
    "text": "江西省复工“三同时”政策具体指什么？"
}
```
（3）DuRetrieval  
链接：https://huggingface.co/datasets/C-MTEB/DuRetrieval  
&nbsp;&nbsp;&nbsp;&nbsp;1）corpus：100k
```json
{
    "id": "2c4fe63d3378ac39907b6b2648eb40c5",
    "text": "一年国家法定节假日为11天。根据公布的国家法定节假日调整方案，调整的主要内容包括：元旦放假1天不变；春节放假3天，放假时间为农历正月初一、初二、初三；“五一”国际劳动节1天不变；“十一”国庆节放假3天；清明节、端午节、中秋节增设为国家法定节假日，各放假1天(农历节日如遇闰月，以第一个月为休假日)。3、允许周末上移下错，与法定节假日形成连休。"
}
```
&nbsp;&nbsp;&nbsp;&nbsp;2）query：2k
```json
{
    "id": "edb58f525bd14724d6f490722fa8a657",
    "text": "国家法定节假日共多少天"
}
```
（4）EcomRetrieval  
链接：https://huggingface.co/datasets/C-MTEB/EcomRetrieval  
&nbsp;&nbsp;&nbsp;&nbsp;1）corpus：101k
```json
{
    "id": "1",
    "text": "红棉优级小粒老黄冰糖1.2kg大罐炖煮煲汤红烧肉酵素柠檬花茶雪梨"
}
```
&nbsp;&nbsp;&nbsp;&nbsp;2）query：1k
```json
{
    "id": "200000",
    "text": "大落地窗"
}
```
（5）MedicalRetrieval  
链接：https://huggingface.co/datasets/C-MTEB/MedicalRetrieval  
&nbsp;&nbsp;&nbsp;&nbsp;1）corpus：101k
```json
{
    "id": "30000001",
    "text": "您好：脂肪瘤属良性肿瘤但术后容易复发，患者可以采用中草药消除，而且安全，不会对身体产生任何的伤害及毒副作用，治愈的希望也是比较大的。"
}
```
&nbsp;&nbsp;&nbsp;&nbsp;2）query：1k
```json
{
    "id": "2",
    "text": "大人手搜婴儿眼睛红了有什么影响？"
}
```
（6）MMarcoRetrieval  
链接：https://huggingface.co/datasets/C-MTEB/MMarcoRetrieval  
&nbsp;&nbsp;&nbsp;&nbsp;1）corpus：107k
```json
{
    "id": "3863",
    "text": "1 成年人体内平均约有 10 品脱血液。捐赠期间大约会提供 1 品脱。 2 健康捐献者可以每 56 天捐献一次红细胞，或每 112 天捐献双倍红细胞。一个健康的捐献者可能会相隔 7 天捐献血小板，但每年最多捐献 24 次。"
}
```
&nbsp;&nbsp;&nbsp;&nbsp;2）query：6.98k
```json
{
    "id": "1215",
    "text": "加拿大三级政府及其职责"
}
```
（7）T2Retrieval  
链接：https://huggingface.co/datasets/C-MTEB/T2Retrieval  
&nbsp;&nbsp;&nbsp;&nbsp;1）corpus：119k
```json
{
    "id": "159474",
    "text": "<br><img><br>【重新获取取件码】<br>1、首先来到丰巢快递柜前,点击屏幕上的【取快递】;<br><img><br>2、然后选择取件码取件;<br><img><br>3、在输入取件码的右下方,有一个【忘记取件码】,点击;<br><img><br>4、然后输入快递使用的手机号码,点击“获取验证码”,验证码输入后,点击【下一步】;<br><img><br>5、可以看到当前柜机中存放的快递信息,点击右上角的【取件】,将快递取出即可。<br><img>"
}
```
&nbsp;&nbsp;&nbsp;&nbsp;2）query：22.8k
```json
{
    "id": "0",
    "text": "蜂巢取快递验证码摁错怎么办"
}
```
（8）VideoRetrieval  
链接：https://huggingface.co/datasets/C-MTEB/VideoRetrieval/viewer/default/queries  
&nbsp;&nbsp;&nbsp;&nbsp;1）corpus：101k
```json
{
    "id": "54312",
    "text": "小慧广场舞 欢乐的海洋 欢快喜庆的藏族舞32步 附教学"
}
```
&nbsp;&nbsp;&nbsp;&nbsp;2）query：1k
```json
{
    "id": "440",
    "text": "女学校的男生"
}
```
## 2 QA类embedding模型排行表
链接：https://huggingface.co/spaces/mteb/leaderboard  

![示意图](/assets/images/rag/information_retrieve.png "图2.1 信息检索QA模型榜单")
