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

### select_type

MySQL每一个SELECT关键字代表的小查询都定义了一个称之为select_type的属性，意思是我们只要知道了某个小查询的select_type属性，就知道了这个小查询在整个大查询中扮演了一个什么角色

![select_type 的官方解释](https://cdn.jansora.com/files/uPic/2022/05/10/XYRL6e.png)

#### SIMPLE

查询语句中不包含UNION或者子查询的查询都算作是SIMPLE类型，比方说下边这个单表查询的select_type的值就是SIMPLE：

```sql
EXPLAIN SELECT * FROM t1;
```
![](https://cdn.jansora.com/files/uPic/2022/05/11/OcQ8ro.png)


#### PRIMARY
对于包含UNION、UNION ALL或者子查询的大查询来说，它是由几个小查询组成的，其中最左边的那个查询的select_type值就是PRIMARY

```sql
EXPLAIN SELECT * FROM t1 UNION SELECT * FROM t2;
```
![](https://cdn.jansora.com/files/uPic/2022/05/11/NoRO0d.png)

#### UNION

对于包含UNION或者UNION ALL的大查询来说，它是由几个小查询组成的，其中除了最左边的那个小查询以外，其余的小查询的select_type值就是UNION，可以对比上一个例子的效果

#### UNION RESULT

MySQL选择使用临时表来完成UNION查询的去重工作，针对该临时表的查询的select_type就是UNION RESULT，同样对比上面的例子

#### SUBQUERY

如果包含子查询的查询语句不能够转为对应的semi-join的形式，并且该子查询是不相关子查询，并且查询优化器决定采用将该子查询物化的方案来执行该子查询时，该子查询的第一个SELECT关键字代表的那个查询的select_type就是SUBQUERY，比如下边这个查询：




> semi-join子查询，是指当一张表在另一张表找到匹配的记录之后，半连接（semi-jion）返回第一张表中的记录。与条件连接相反，即使在右节点中找到几条匹配的记录，左节点 的表也只会返回一条记录。另外，右节点的表一条记录也不会返回。半连接通常使用IN 或 EXISTS 作为连接条件

> 物化：这个将子查询结果集中的记录保存到临时表的过程称之为物化（Materialize）。那个存储子查询结果集的临时表称之为物化表。正因为物化表中的记录都建立了索引（基于内存的物化表有哈希索引，基于磁盘的有B+树索引），通过索引执行IN语句判断某个操作数在不在子查询结果集中变得非常快，从而提升了子查询语句的性能。



### type 列

这一列表示关联类型或访问类型，即MySQL决定如何查找表中的行，查找数据行记录的大概范围。依次从最优到最差分别为：`system > const > eq_ref > ref > range > index > ALL` 

一般来说，得保证查询达到range级别，最好达到ref , 才能保证较好的查询性能

#### NULL

mysql能够在优化阶段分解查询语句，在执行阶段用不着再访问表或索引。例如：在索引列中选取最小值，可以单独查找索引来完成，不需要在执行时访问表

#### eq_ref

primary key 或 unique key 索引的所有部分被连接使用 ，最多只会返回一条符合条件的记录。这可能是在 const 之外最好的联接类型了，简单的 select 查询不会出现这种 type。

在连接查询时，如果被驱动表是通过主键或者唯一二级索引列等值匹配的方式进行访问的（如果该主键或者唯一二级索引是联合索引的话，所有的索引列都必须进行等值比较），则对该被驱动表的访问方法就是eq_ref，比方说：

```sql
EXPLAIN SELECT * FROM t1 INNER JOIN t2 ON t1.id = t2.id;
```

![](https://cdn.jansora.com/files/uPic/2022/05/13/TYtpQR.png)

#### ref

当通过普通的二级索引列与常量进行等值匹配时来查询某个表，那么对该表的访问方法就可能是ref

相比 eq_ref，不使用唯一索引，而是使用普通索引或者唯一性索引的部分前缀，索引要和某个值相比较，可能会找到多个符合条件的行。
```sql
EXPLAIN SELECT * FROM t1 WHERE key1 = 'a';
```

#### system，const

mysql能对查询的某部分进行优化并将其转化成一个常量（可以看show warnings 的结果）。用于 primary key 或 unique key 的所有列与常数比较时，所以表最多有一个匹配行，读取1次，速度比较快。system是const的特例，表里只有一条元组匹配时为system
```sql
EXPLAIN SELECT * FROM t1 WHERE id = 5;
```

#### ref_or_null

 