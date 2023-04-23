# match_phrase 里面 slop 是怎么用的


`match_phrase` 是 Elasticsearch（ES）中的一个查询类型，用于搜索包含特定短语的文档。`slop` 是 `match_phrase` 查询中的一个参数，表示允许查询短语中词语之间的最大距离。

`slop` 参数的值是一个非负整数。当 `slop` 的值为 0（默认值）时，查询的短语中的词语必须在文档中完全相邻且顺序一致。当 `slop` 的值大于 0 时，允许词语之间有一定的距离，这样可以找到那些包含查询短语的词语，但词语之间有一定距离的文档。

例如，假设我们有一个包含以下文本的文档：

arduinoCopy code

```
"The quick brown fox jumps over the lazy dog."
```

如果我们使用 `match_phrase` 查询 "quick fox"，并且将 `slop` 设置为 0，那么查询将不会匹配到这个文档，因为 "quick" 和 "fox" 之间还有一个词 "brown"。但是，如果我们将 `slop` 设置为 1 或更大的值，那么查询将匹配到这个文档，因为 "quick" 和 "fox" 之间的距离（1）小于或等于 `slop` 的值。

在 Elasticsearch 中，可以这样使用 `slop`：

jsonCopy code

```
{
  "query": {
    "match_phrase": {
      "field_name": {
        "query": "quick fox",
        "slop": 1
      }
    }
  }
}
```

这个查询会在名为 "field\_name" 的字段中搜索包含 "quick fox" 短语的文档，允许词语之间的最大距离为 1。


