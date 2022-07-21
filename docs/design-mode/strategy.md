# 策略(Strategy)

定义了算法族, 分别封闭起来, 让它们之间可以互相替换, 此模式让算法的变化独立于使用算法的客户。

比方说 java 中 Object 的 equals 和 hashcode 算法.

JVM 以及标准库中均会采用 equals 和 hashcode 来比较对象唯一性的. 这本身就是一种策略

对于 java 中的每种类, 我们都可以定制 equals 和 hashcode 算法来适配当前类的特有模式, 但需要遵循的是 equals 和 hashcode 的设计规范

类似的还有 Comparator 等



* java.util.Collections#sort()
* java.io.InputStream#skip()
* java.io.InputStream#read()
* java.util.AbstractList#indexOf()
