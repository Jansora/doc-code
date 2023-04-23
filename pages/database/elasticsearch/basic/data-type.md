Elasticsearch 支持多种数据类型，用于定义文档中的各个字段。以下是一些常见的数据类型：

1. 核心数据类型：
   * `text`：用于全文搜索的字符串。分词器会对 text 类型的字段进行分词，以便在全文搜索中找到匹配项。
   * `keyword`：用于精确值搜索的字符串。不会进行分词，通常用于过滤、排序和聚合操作。
   * `integer`：32 位有符号整数。
   * `long`：64 位有符号整数。
   * `short`：16 位有符号整数。
   * `byte`：8 位有符号整数。
   * `double`：双精度 64 位 IEEE 754 浮点数。
   * `float`：单精度 32 位 IEEE 754 浮点数。
   * `half_float`：半精度 16 位 IEEE 754 浮点数。
   * `scaled_float`：浮点数缩放为有符号长整数。
   * `boolean`：布尔值，可以是 `true` 或 `false`。
2. 日期和时间数据类型：
   * `date`：日期，支持多种格式。默认格式为 "strict\_date\_optional\_time" 或 "epoch\_millis"。
3. 二进制数据类型：
   * `binary`：二进制数据，必须使用 Base64 编码。通常不建议在 Elasticsearch 中存储大量的二进制数据。
4. 范围数据类型：
   * `integer_range`：整数范围。
   * `float_range`：浮点数范围。
   * `long_range`：长整数范围。
   * `double_range`：双精度浮点数范围。
   * `date_range`：日期范围。
   * `ip_range`：IP 地址范围。
5. 复合数据类型：
   * `object`：用于存储嵌套的 JSON 对象。可以包含多个子字段。
   * `nested`：类似于 object 类型，但支持独立索引和查询每个嵌套对象。
6. 地理数据类型：
   * `geo_point`：地理坐标点，包括经度和纬度。
   * `geo_shape`：地理形状，如点、线、多边形等。
7. IP 数据类型：
   * `ip`：IPv4 或 IPv6 地址。

这些数据类型可用于定义索引模式以指定如何存储和查询文档中的字段。在 Elasticsearch 中创建索引时，可以为每个字段指定相应的数据类型。
