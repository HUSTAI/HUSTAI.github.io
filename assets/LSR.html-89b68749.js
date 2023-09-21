const e=JSON.parse('{"key":"v-7bf8f658","path":"/zh/posts/llm/LSR.html","title":"学习稀疏检索的统一框架","lang":"zh-CN","frontmatter":{"author":"研究生鱼皮-yjf","icon":"pen-to-square","date":"2023-08-23T00:00:00.000Z","category":["语言模型"],"tag":["检索"],"description":"学习稀疏检索的统一框架 学习稀疏检索是一种结合机器学习和信息检索的方法，旨在优化文本检索效果。通过学习模型，将查询和文档映射到稀疏表示空间，实现高效的检索。在训练阶段，利用已标记的查询-文档对和相关性标签，通过优化模型参数，学习如何选择、加权和组合特征，使相关文档在稀疏表示中更接近查询。学习稀疏检索方法可应用于大规模信息检索任务，如搜索引擎和推荐系统，以提高检索效率和准确性。","head":[["meta",{"property":"og:url","content":"https://github.com/HUSTAI/HUSTAI.github.io/zh/posts/llm/LSR.html"}],["meta",{"property":"og:site_name","content":"知识分享"}],["meta",{"property":"og:title","content":"学习稀疏检索的统一框架"}],["meta",{"property":"og:description","content":"学习稀疏检索的统一框架 学习稀疏检索是一种结合机器学习和信息检索的方法，旨在优化文本检索效果。通过学习模型，将查询和文档映射到稀疏表示空间，实现高效的检索。在训练阶段，利用已标记的查询-文档对和相关性标签，通过优化模型参数，学习如何选择、加权和组合特征，使相关文档在稀疏表示中更接近查询。学习稀疏检索方法可应用于大规模信息检索任务，如搜索引擎和推荐系统，以提高检索效率和准确性。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-23T08:21:24.000Z"}],["meta",{"property":"article:author","content":"研究生鱼皮-yjf"}],["meta",{"property":"article:tag","content":"检索"}],["meta",{"property":"article:published_time","content":"2023-08-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-23T08:21:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"学习稀疏检索的统一框架\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-08-23T00:00:00.000Z\\",\\"dateModified\\":\\"2023-08-23T08:21:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"研究生鱼皮-yjf\\"}]}"]]},"headers":[{"level":2,"title":"1 背景和目的","slug":"_1-背景和目的","link":"#_1-背景和目的","children":[]},{"level":2,"title":"2 统一框架的建立","slug":"_2-统一框架的建立","link":"#_2-统一框架的建立","children":[]},{"level":2,"title":"3 实验","slug":"_3-实验","link":"#_3-实验","children":[]},{"level":2,"title":"4 结论","slug":"_4-结论","link":"#_4-结论","children":[{"level":3,"title":"4.1 研究问题一（RQ1）：LSR论文的结果是否可重现？","slug":"_4-1-研究问题一-rq1-lsr论文的结果是否可重现","link":"#_4-1-研究问题一-rq1-lsr论文的结果是否可重现","children":[]},{"level":3,"title":"4.2 研究问题二（RQ2）：LSR方法如何在最新的高级训练技术下表现？","slug":"_4-2-研究问题二-rq2-lsr方法如何在最新的高级训练技术下表现","link":"#_4-2-研究问题二-rq2-lsr方法如何在最新的高级训练技术下表现","children":[]},{"level":3,"title":"4.3 研究问题三（RQ3）：编码器架构和正则化的选择如何影响结果？","slug":"_4-3-研究问题三-rq3-编码器架构和正则化的选择如何影响结果","link":"#_4-3-研究问题三-rq3-编码器架构和正则化的选择如何影响结果","children":[]}]}],"git":{"createdTime":1692778153000,"updatedTime":1692778884000,"contributors":[{"name":"heiheiyoyo","email":"543425864@qq.com","commits":4}]},"readingTime":{"minutes":13.25,"words":3976},"filePathRelative":"zh/posts/llm/LSR.md","localizedDate":"2023年8月23日","excerpt":"<h1> 学习稀疏检索的统一框架</h1>\\n<p>学习稀疏检索是一种结合机器学习和信息检索的方法，旨在优化文本检索效果。通过学习模型，将查询和文档映射到稀疏表示空间，实现高效的检索。在训练阶段，利用已标记的查询-文档对和相关性标签，通过优化模型参数，学习如何选择、加权和组合特征，使相关文档在稀疏表示中更接近查询。学习稀疏检索方法可应用于大规模信息检索任务，如搜索引擎和推荐系统，以提高检索效率和准确性。</p>\\n","autoDesc":true}');export{e as data};