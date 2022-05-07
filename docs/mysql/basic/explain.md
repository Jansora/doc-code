# 执行计划

> 此文有参考 [最完整的Explain总结，SQL优化不再困难](https://mp.weixin.qq.com/s/twTghH8wTA_0uZghOdawkw)


测试表

```sql
CREATE TABLE t1 (
    id INT NOT NULL AUTO_INCREMENT,
    key1 VARCHAR(100),
    key2 VARCHAR(100),
    key3 VARCHAR(100),
    name VARCHAR(100),
    PRIMARY KEY (id),
    KEY idx_key1 (key1),
    KEY idx_key2_key3(key2, key3)
) Engine=InnoDB CHARSET=utf8;

CREATE TABLE t2 (
    id INT NOT NULL AUTO_INCREMENT,
    key1 VARCHAR(100),
    key2 VARCHAR(100),
    key3 VARCHAR(100),
    name VARCHAR(100),
    PRIMARY KEY (id),
    KEY idx_key1 (key1),
    KEY idx_key2_key3(key2, key3)
) Engine=InnoDB CHARSET=utf8;
```


## Explain 都有哪些列
`mysql> EXPLAIN SELECT 1;`

![](https://cdn.jansora.com/files/uPic/2022/05/06/NdXMKf.png)

### id

id列的编号是 select 的序列号，有几个 select 就有几个id，并且id的顺序是按 select 出现的顺序增长的。

id列越大执行优先级越高，id相同则从上往下执行，id为NULL最后执行

> 在连接查询的执行计划中，每个表都会对应一条记录，这些记录的id列的值是相同的，出现在前边的表表示驱动表，出现在后边的表表示被驱动表。所以从上边的EXPLAIN输出中我们可以看出，查询优化器准备让t2表作为驱动表，让t1表作为被驱动表来执行查询

