# 可重入锁 (ReentrantLock)

ReentrantLock 意思为可重入锁，指的是一个线程能够对一个临界资源重复加锁。为了帮助大家更好地理解ReentrantLock的特性， 

我们先将ReentrantLock跟常用的Synchronized进行比较，其特性如下（蓝色部分为本篇文章主要剖析的点）：

![](https://cdn.jansora.com/files/uPic/2022/07/26/hGYVJn.png)


ReentrantLock有三个内部类, Sync 和 FairSync / NonfairSync 锁

Sync: 基于 AQS 定制的可重入锁的同步控制基础。在下面子类化为公平版本和不公平版本。使用 AQS state 字段表示锁上的保持次数。
FairSync: 基于 Sync 实现的公平锁
NonFairSync: 基于 Sync 实现的不公平锁

Sync: 

## 源码分析
### Sync
```java
abstract static class Sync extends AbstractQueuedSynchronizer {
         
        /**
         * 尝试加不公平锁
         * acquires 加多少次锁
         */
        final boolean nonfairTryAcquire(int acquires) {
            final Thread current = Thread.currentThread();
            // state 代表当前锁被锁的次数
            int c = getState();
            // 0 代表锁未被使用
            if (c == 0) {
                // CAS 加锁
                if (compareAndSetState(0, acquires)) {
                    // 设置排它锁
                    setExclusiveOwnerThread(current);
                    return true;
                }
            }
            // 如果锁已经被使用了, 但是当前占用锁的是当前线程
            else if (current == getExclusiveOwnerThread()) {
                // 继续加锁占有锁
                int nextc = c + acquires;
                if (nextc < 0) // overflow
                    throw new Error("Maximum lock count exceeded");
                // 因为当前线程占有锁了, 所以无需用 CAS 来加锁
                setState(nextc);
                return true;
            }
            // 锁失败
            return false;
        }

        // 解锁 releases 次
        protected final boolean tryRelease(int releases) {
            int c = getState() - releases;
            // 非当前线程释放锁时抛出异常
            if (Thread.currentThread() != getExclusiveOwnerThread())
                throw new IllegalMonitorStateException();
            boolean free = false;
            
            // 释放完锁如果次数为 0, 代表当前线程已经无需占用此锁了
            if (c == 0) {
                free = true;
                // 释放排他锁
                setExclusiveOwnerThread(null);
            }
            setState(c);
            return free;
        }

        // 占有锁当前锁的是否是当前线程
        protected final boolean isHeldExclusively() {
            // While we must in general read state before owner,
            // we don't need to do so to check if current thread is owner
            return getExclusiveOwnerThread() == Thread.currentThread();
        }

        // Methods relayed from outer class
        final Thread getOwner() {
            return getState() == 0 ? null : getExclusiveOwnerThread();
        }

        final int getHoldCount() {
            return isHeldExclusively() ? getState() : 0;
        }

        final boolean isLocked() {
            return getState() != 0;
        }

    }

```

### FairSync

```java

    /**
     * 基于 Sync 实现的公平锁
     */
    static final class FairSync extends Sync {
        private static final long serialVersionUID = -3000897897090466540L;

        final void lock() {
            acquire(1);
        }

        /**
         * 公平锁的 tryAcquire
         */
        protected final boolean tryAcquire(int acquires) {
            final Thread current = Thread.currentThread();
            int c = getState();
            if (c == 0) {
                // 如果当前线程之前没有排队的线程，即当前线程位于队列的头部或队列为空
                // 且设置线程成功
                if (!hasQueuedPredecessors() &&
                    compareAndSetState(0, acquires)) {
                    // 设置排它锁
                    setExclusiveOwnerThread(current);
                    return true;
                }
            }
            // 如果锁已经被使用了, 但是当前占用锁的是当前线程
            else if (current == getExclusiveOwnerThread()) {
                int nextc = c + acquires;
                if (nextc < 0)
                    throw new Error("Maximum lock count exceeded");
                setState(nextc);
                return true;
            }
            return false;
        }
    }

```

### NonFairSync

```java

    /**
     * 基于 Sync 实现的不公平锁
     */
    static final class NonfairSync extends Sync {
        private static final long serialVersionUID = 7316153563782823691L;

        /**
         * Performs lock.  Try immediate barge, backing up to normal
         * acquire on failure.
         */
        final void lock() {
            // 先 CAS 锁下试试
            if (compareAndSetState(0, 1))
                setExclusiveOwnerThread(Thread.currentThread());
            else
                acquire(1);
        }

        // 参考 Sync 实现
        protected final boolean tryAcquire(int acquires) {
            return nonfairTryAcquire(acquires);
        }
    }
    
    
```

