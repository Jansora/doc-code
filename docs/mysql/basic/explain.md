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

当对普通二级索引进行等值匹配查询，该索引列的值也可以是NULL值时，那么对该表的访问方法就可能是ref_or_null，比如说：

```sql
EXPLAIN SELECT * FROM t1 WHERE key1 = 'a' OR key1 IS NULL;
```


#### index_merge

一般情况下对于某个表的查询只能使用到一个索引，但在某些场景下可以使用多种索引合并的方式来执行查询，我们看一下执行计划中是怎么体现MySQL使用索引合并的方式来对某个表执行查询的：

#### unique_subquery

类似于两表连接中被驱动表的eq_ref访问方法，unique_subquery是针对在一些包含IN子查询的查询语句中，如果查询优化器决定将IN子查询转换为EXISTS子查询，而且子查询可以使用到主键进行等值匹配的话，那么该子查询执行计划的type列的值就是unique_subquery，比如下边的这个查询语句：

```sql
EXPLAIN SELECT * FROM t1 WHERE key2 IN (SELECT id FROM t2 where t1.key1 = t2.key1) OR key3 = 'a';
 ```

#### range

范围扫描通常出现在 in(), between ,> ,<, >= 等操作中。使用一个索引来检索给定范围的行。

```sql
EXPLAIN SELECT * FROM t1 WHERE key1 IN ('a', 'b', 'c');
```


#### index

当我们可以使用索引覆盖，但需要扫描全部的索引记录时，该表的访问方法就是index

扫描全表索引，这通常比ALL快一些。（index是从索引中读取的，而all是从硬盘中读取）


#### ALL

全表扫描


```sql
EXPLAIN SELECT * FROM t1
```


### possible_keys和key列

possible_keys列显示查询可能使用哪些索引来查找。

key列显示mysql实际采用哪个索引来优化对该表的访问。


explain 时可能出现 possible_keys 有列，而 key 显示 NULL 的情况，这种情况是因为表中数据不多，mysql认为索引对此查询帮助不大，选择了全表查询。

如果possible_keys列是NULL，则没有相关的索引。在这种情况下，可以通过检查 where 子句看是否可以创造一个适当的索引来提高查询性能，然后用 explain 查看效果。


比方说下边这个查询：

```sql
EXPLAIN SELECT * FROM t1 WHERE key1 > 'z' AND key2 = 'a';
```

上述执行计划的possible_keys列的值是idx_key1,idx_key2_key3，表示该查询可能使用到idx_key1,idx_key2_key3两个索引，然后key列的值是idx_key3，表示经过查询优化器计算使用不同索引的成本后，最后决定使用idx_key3来执行查询比较划算。

需要注意的一点是，possible_keys列中的值并不是越多越好，可能使用的索引越多，查询优化器计算查询成本时就得花费更长时间，所以如果可以的话，尽量删除那些用不到的索引。



### key_len列

这一列显示了mysql在索引里使用的字节数，通过这个值可以算出具体使用了索引中的哪些列

> key_len计算规则如下：字符串 char(n)：n字节长度 varchar(n)：2字节存储字符串长度，如果是utf-8，则长度 3n + 2 数值类型 tinyint：1字节 smallint：2字节 int：4字节 bigint：8字节　　 时间类型　 date：3字节 timestamp：4字节 datetime：8字节



