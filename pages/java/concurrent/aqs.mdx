# AQS (AbstractQueuedSynchronizer)

> 参考 https://tech.meituan.com/2019/12/05/aqs-theory-and-apply.html

AQS是一种提供了原子式管理同步状态、阻塞和唤醒线程功能以及队列模型的简单框架。

AQS核心思想是，如果被请求的共享资源空闲，那么就将当前请求资源的线程设置为有效的工作线程，将共享资源设置为锁定状态；如果共享资源被占用，就需要一定的阻塞等待唤醒机制来保证锁分配。
这个机制主要用的是CLH队列的变体实现的，将暂时获取不到锁的线程加入到队列中。

CLH：Craig、Landin and Hagersten队列，是单向链表，AQS中的队列是CLH变体的虚拟双向队列（FIFO），
AQS是通过将每条请求共享资源的线程封装成一个节点来实现锁的分配。

AQS使用一个Volatile的int类型的成员变量来表示同步状态，通过内置的FIFO队列来完成资源获取的排队工作，通过CAS完成对State值的修改。

![](https://cdn.jansora.com/files/uPic/2022/07/26/5qBqIV.png)

首先，我们通过下面的架构图来整体了解一下AQS框架：

![img.png](https://cdn.jansora.com/files/uPic/2022/07/26/l6mY8F.png)

## 数据结构

先来看下AQS中最基本的数据结构——Node，Node即为上面CLH变体队列中的节点。


| 方法和属性值 | 含义                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------- |
| waitStatus   | 当前节点在队列中的状态                                                                       |
| thread       | 表示处于该节点的线程                                                                         |
| prev         | 前驱指针                                                                                     |
| predecessor  | 返回前驱节点，没有的话抛出npe                                                                |
| nextWaiter   | 指向下一个处于CONDITION状态的节点（由于本篇文章不讲述Condition Queue队列，这个指针不多介绍） |
| next         | 后继指针                                                                                     |

线程两种锁的模式：


| 模式      | 含义                           |
| ----------- | -------------------------------- |
| SHARED    | 表示线程以共享的模式等待锁     |
| EXCLUSIVE | 表示线程正在以独占的方式等待锁 |


| 枚举      | 含义                                           |
| ----------- | ------------------------------------------------ |
| 0         | 当一个Node被初始化的时候的默认值               |
| CANCELLED | 为1，表示线程获取锁的请求已经取消了            |
| CONDITION | 为-2，表示节点在等待队列中，节点线程等待唤醒   |
| PROPAGATE | 为-3，当前线程处在SHARED情况下，该字段才会使用 |
| SIGNAL    | 为-1，表示线程已经准备好了，就等资源释放了     |

## 加锁模式

### 独占模式

![](https://cdn.jansora.com/files/uPic/2022/07/26/FUemqr.png)

### 共享模式

![](https://cdn.jansora.com/files/uPic/2022/07/26/ryacaL.png)

对于我们自定义的同步工具，需要自定义获取同步状态和释放状态的方式，也就是AQS架构图中的第一层：API层。
