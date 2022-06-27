# 分布式锁

分布式锁的两个要求。

要求一：分布式锁的加锁和释放锁的过程，涉及多个操作。所以，在实现分布式锁时，我们需要保证这些锁操作的原子性；

要求二：共享存储系统保存了锁变量，如果共享存储系统发生故障或宕机，那么客户端也就无法进行锁操作了。
在实现分布式锁时，我们需要考虑保证共享存储系统的可靠性，进而保证锁的可靠性。

加锁时同样需要判断锁变量的值，根据锁变量值来判断能否加锁成功;
释放锁时需要把锁变量值设置为 0，表明客户端不再持有锁。


加锁和释放锁的操作就变成了读取、判断和设置共享存储系统中的锁变量值

## 加锁

加锁包含了三个操作（读取锁变量、判断锁变量值以及把锁变量值设置为 1），
而这三个操作在执行时需要保证原子性。那怎么保证原子性呢？

使用LUA 脚本.
1: 先获取值
2. 获取到的值是否与