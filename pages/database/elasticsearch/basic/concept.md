# 基础概念

"ES 查询" 可能指的是 Elasticsearch（简称 ES）的查询。Elasticsearch 是一个基于 Apache Lucene 的开源搜索和分析引擎，通常用于全文搜索、日志和事件数据分析以及大数据处理等场景。

在 Elasticsearch 中，查询（query）是一个用于搜索和过滤数据的请求。查询可以非常简单，也可以非常复杂，涉及多个字段和条件。查询语言是 Elasticsearch 的核心组件之一，称为 Query DSL（Domain Specific Language，领域特定语言）。

以下是 Elasticsearch 查询的一些关键概念：

1.  索引（Index）：Elasticsearch 中的索引是一个用于存储具有类似结构的文档集合的地方。它类似于关系型数据库中的表。每个索引都有一个唯一的名称，用于在查询中引用。

2.  文档（Document）：文档是 Elasticsearch 中存储的数据单元。文档是由字段（field）和值（value）组成的 JSON 对象。每个文档都有一个唯一的 ID，以便在查询中引用。

3.  字段（Field）：字段是文档中的数据项，由键（key）和值（value）组成。值可以是简单类型（如字符串、数值等）或复合类型（如数组、嵌套对象等）。

4.  映射（Mapping）：映射是 Elasticsearch 中定义字段类型和属性的机制。通过映射，您可以指定如何存储和索引字段，以及如何处理字段的分析和搜索。

