# 查询类型



"ES 查询"可能指的是 Elasticsearch 查询。Elasticsearch 是一个分布式、实时的搜索和分析引擎，广泛应用于各种场景，如全文搜索、日志分析和实时数据分析等。它基于 Lucene 库，使用 JSON 作为数据交换格式，支持 RESTful API。在 Elasticsearch 中，查询使用特定的查询 DSL（领域特定语言）编写。

Elasticsearch 查询主要分为两类：

1. 查询上下文（Query context）：这类查询主要关注数据与查询的匹配程度。这意味着查询上下文中的查询用于给匹配的文档打分，以便按相关性排序。
2. 过滤上下文（Filter context）：这类查询只关注数据是否满足查询条件，而不关心匹配程度。过滤上下文中的查询对于布尔筛选（yes/no）以及地理位置筛选等场景非常有用。

Elasticsearch 查询 DSL 支持多种查询类型，以下是一些常见的查询：

* Match 查询：用于全文搜索，基于文本分析器对文本进行分析并构建查询。
* Term 查询：用于精确值匹配，不进行文本分析。
* Range 查询：用于范围匹配，如日期或数值范围。
* Bool 查询：用于组合多个查询条件，支持 must（必须满足）、must_not（不能满足）、should（应该满足）和 filter（过滤）子句。
* Prefix 查询：用于匹配字段值的前缀。
* Wildcard 查询：用于匹配包含通配符的模式。
* Regexp 查询：用于基于正则表达式的模式匹配。
* Fuzzy 查询：用于基于相似性的模糊匹配，可以容忍拼写错误。
* Geo queries：用于地理位置相关的查询，如 Geo-point、Geo-shape 等。
* Nested 查询：用于查询嵌套对象。
* Aggregations：用于对查询结果进行聚合统计，如最大值、最小值、平均值、分布统计等。
