# synchronized 关键字

synchronized 由 monitorenter/monitorexit 指令实现的

在 Java 6 之前，Monitor 的实现完全是依靠操作系统内部的互斥锁，因为需要进行用户态到内核态的切换，所以同步操作是一个无差别的重量级操作。

在现代的（Oracle）JDK中 提供了三种不同的 Monitor 实现，也就是常说的三种不同的锁：
**偏斜锁（Biased Locking）、轻量级锁和重量级锁**，大大改进了其性能。

锁的升级、降级，就是 JVM 优化 synchronized 运行的机制，
当 JVM 检测到不同的竞争状况时，会自动切换到适合的锁实现，这种切换就是锁的升级、降级。

**当没有竞争出现时，默认会使用偏斜锁。**

JVM 会利用 **CAS 操作（compare and swap）**，在对象头上的 Mark Word 部分设置线程 ID，以表示这个对象偏向于当前线程，所以并不涉及真正的互斥锁。这样做的假设是基于在很多应用场景中，大部分对象生命周期中最多会被一个线程锁定，使用偏斜锁可以降低无竞争开销。

如果有**另外的线程**试图锁定某个已经被偏斜过的对象，JVM 就需要撤销（revoke）偏斜锁，并切换到轻量级锁实现。

轻量级锁依赖 CAS 操作 Mark Word 来试图获取锁，如果重试成功，就使用普通的轻量级锁.

**如果重试失败，进一步升级为重量级锁。**

>> 参考: [第16讲 | synchronized底层如何实现？什么是锁的升级、降级？](https://static.jansora.com/geektime/file/01-%E4%B8%93%E6%A0%8F%E8%AF%BE/02-Java%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF36%E8%AE%B2/03-%E6%A8%A1%E5%9D%97%E4%BA%8C%20Java%E8%BF%9B%E9%98%B6%20(16%E8%AE%B2)/%E7%AC%AC16%E8%AE%B2%E4%B8%A8synchronized%E5%BA%95%E5%B1%82%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%EF%BC%9F%E4%BB%80%E4%B9%88%E6%98%AF%E9%94%81%E7%9A%84%E5%8D%87%E7%BA%A7%E3%80%81%E9%99%8D%E7%BA%A7%EF%BC%9F.html)