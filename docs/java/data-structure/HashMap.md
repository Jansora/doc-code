# HashMap



## 为什么 HashMap 的加载因子是0.75？

在理想情况下，使用随机哈希码，在扩容阈值（加载因子）为0.75的情况下，节点出现在频率在Hash桶（表）中遵循参数平均为0.5的泊松分布。忽略方差，即X = λt，P(λt = k)，其中λt = 0.5的情况，按公式：

![](https://cdn.jansora.com/files/uPic/2022/06/12/Ojh3Hx.jpg)

计算结果如上述的列表所示，当一个bin中的链表长度达到8个元素的时候，概率为0.00000006，几乎是一个不可能事件。

那么为什么不可以是0.8或者0.6呢？


> 对于开放定址法，加载因子是特别重要因素，应严格限制在0.7-0.8以下。超过0.8，查表时的CPU缓存不命中（cache missing）按照指数曲线上升。
> 因此，一些采用开放定址法的hash库，如Java的系统库限制了加载因子为0.75，超过此值将resize散列表。
>
选择0.75作为默认的加载因子，完全是时间和空间成本上寻求的一种折衷选择。


## HashMap 和 HashTable 有什么区别？
①、HashMap 是线程不安全的，HashTable 是线程安全的；

②、由于线程安全，所以 HashTable 的效率比不上 HashMap；

③、HashMap最多只允许一条记录的键为null，允许多条记录的值为null，而 HashTable不允许；

④、HashMap 默认初始化数组的大小为16，HashTable 为 11，前者扩容时，扩大两倍，后者扩大两倍+1；

⑤、HashMap 需要重新计算 hash 值，而 HashTable 直接使用对象的 hashCode
