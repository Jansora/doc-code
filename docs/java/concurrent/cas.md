# CompareAndSwap (CAS) 讲解

比较并交换(compare and swap, CAS)，是原子操作的一种. 通过将内存中的值与指定数据进行比较，当数值一样时将内存中的数据替换为新的值。

代码实现如下:
```c
int cas(long *addr, long old, long new)
{
    /* Executes atomically. */
    if(*addr != old)
        return 0;
    *addr = new;
    return 1;
}
```

CAS 锁成功返回 0 , 锁失败返回 1, 

在使用上，通常会记录下某块内存中的旧值，通过对旧值进行一系列的操作后得到新值，然后通过CAS操作将新值与旧值进行交换。如果这块内存的值在这期间内没被修改过，则旧值会与内存中的数据相同，这时CAS操作将会成功执行 使内存中的数据变为新值。如果内存中的值在这期间内被修改过，
则一般[2]来说旧值会与内存中的数据不同，这时CAS操作将会失败，新值将不会被写入内存。




在 Java 语言中. 该方法由 UnSafe.compareAndSwapObject 等
UnSafe.compareAndSwap* 系列方法提供. 在JNI里是借助于一个CPU指令完成的，属于原子操作，可以保证多个线程都能够看到同一个变量的修改值。


需要注意的是 CAS 可能会触发 ABA 问题等无锁结构实现中常见的一种问题

1. 进程P1读取了一个数值A
2. P1被挂起(时间片耗尽、中断等)，进程P2开始执行
3. P2修改数值A为数值B，然后又修改回A
4. P1被唤醒，比较后发现数值A没有变化，程序继续执行。

如果对于数值型值, 那么 ABA 问题是可以忽略的. 因为是感知不到的.
但是如果是引用类型的话, 那么 A -> B -> A 的过程中, 虽然 A 的引用没发生变化, 但是 A 对象的属性值可能会发成变化, 这个是需要考虑的.

JDK从1.5开始提供了AtomicStampedReference类来解决ABA问题，具体操作封装在compareAndSet()中。
compareAndSet()首先检查当前引用和当前标志与预期引用和预期标志是否相等，如果都相等，则以原子方式将引用值和标志的值设置为给定的更新值。



CAS 存在的问题:
1. ABA问题。
2. 循环时间长开销大。
3. 只能保证一个共享变量的原子操作。 但 Java从1.5开始JDK提供了AtomicReference类来保证引用对象之间的原子性，可以把多个变量放在一个对象里来进行CAS操作。

