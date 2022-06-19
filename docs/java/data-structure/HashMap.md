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




## 初始化

threshold: 初始化时将阈值置为大于初始容量(initialCapacity)容量的2的幂值
(比如 initialCapacity 为 15, 那么 threshold 即 16, 比如 initialCapacity 为 800, 那么 threshold 即 1024)
> 测试:  [HashMap 计算阈值(threshold)方法](https://www.jansora.com/play/java/ef42c45d39805ad227dd90e7dd6f91ac)
## 对 key 进行 hash 运算
key 为 null 时 hash 即为 0,
key 不为 null 时计算对象 key 自身的hashcode运算得到的 32 int 整数的高低16为为进行异或运算

这么做的目的是为了混合哈希值的高位和地位，增加低位的随机性。并且混合后的值也变相保持了高位的特征。

见下图
![扰动函数](https://cdn.jansora.com/files/uPic/2022/06/19/1jsVx5.webp)


## 插值
1. 如果 table 没有初始化 -> 初始化
2. 对 key 执行 hash 运算后与当前容量进行与操作(避免超出索引), 得到当前 key 在数组中的索引位置 index
3. 判断 table[index]
   1. 如果 table[index] 为空, 直接 new Node 存放到位置中.
   2. 如果 table[index] 不为空.
      1. 


## 扩容



