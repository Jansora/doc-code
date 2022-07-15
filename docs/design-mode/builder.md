生成器(Builder)

封装一个对象的构造过程，并允许按步骤构造。

Builder 一般表现形式为 setter 方法返回的是 this 类实体自身, 但一般为了保证线程安全, 会通过构建内部Builder类的方法来实现.

在 java 中 构造器的比较常见的. 比如 lombok.

## Java 标准库中的应用

StringBuilder.  Locale.Builder 等
