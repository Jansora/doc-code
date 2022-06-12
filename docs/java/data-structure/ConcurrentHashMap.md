# ConcurrentHashMap
> 有参考 [聊聊ConcurrentHashMap](https://mp.weixin.qq.com/s/pW-mhdfPm82JxKpRF9jrNg)


ConcurrentHashMap 是 HashMap 的线程安全型的实现. 但 ConcurrentHashMap 在 JDK1.7 和 JDK1.8  的实现方式是不同的。


## 实现原理

### JDK 1.7

ConcurrentHashMap 是由 Segment 数组结构和 HashEntry 数组结构组成. 
把 KV 数据根据 hash 规则把哈希桶数组切分成若干个小数组 Segment , 每个 Segment 都包含若干个 HashEntry.

当一个线程访问其中一个 Segment 中的数据时，会把该 Segment 锁住, 其他 Segment 的数据也能被其他线程访问，实现了真正的并发访问.
![](https://cdn.jansora.com/files/uPic/2022/06/12/JcaSri.jpg)

Segment

Segment 继承了 ReentrantLock，所以 Segment 是一种可重入锁，扮演锁的角色。Segment 默认为 16，也就是并发度为 16。



![](https://cdn.jansora.com/files/uPic/2022/06/12/52vxmm.jpg)


HashEntry

![](https://cdn.jansora.com/files/uPic/2022/06/12/JYyYp7.jpg)

### JDK 1.8

ConcurrentHashMap  选择了与 HashMap 相同的Node数组+链表+红黑树结构. 

在锁的实现上， 抛弃了原有的 Segment 分段锁，采用CAS + synchronized实现更加细粒度的锁.

将锁的级别控制在了更细粒度的哈希桶数组元素级别，也就是说只需要锁住这个链表头节点（红黑树的根节点），就不会影响其他的哈希桶数组元素的读写，大大提高了并发度。

![](https://cdn.jansora.com/files/uPic/2022/06/12/IrvCZE.jpg)

为什么使用内置锁 synchronized替换 可重入锁 ReentrantLock ?

在 JDK1.6 中，对 synchronized 锁的实现引入了大量的优化，并且 synchronized 有多种锁状态，会从无锁 -> 偏向锁 -> 轻量级锁 -> 重量级锁一步步转换。

减少内存开销 。假设使用可重入锁来获得同步支持，那么每个节点都需要通过继承 AQS 来获得同步支持。但并不是每个节点都需要获得同步支持的，只有链表的头节点（红黑树的根节点）需要同步，这无疑带来了巨大内存浪费