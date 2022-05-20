# Spring 是什么


![](https://mp.weixin.qq.com/s/2OEnb7T1tlwBjx5cuEoh6w)

Spring 是一个轻量级、非入侵式的控制反转 (IoC) 和面向切面 (AOP) 的框架。

- **IOC 和 DI 的支持**

Spring 的核心就是一个大的工厂容器，可以维护所有对象的创建和依赖关系，Spring 工厂用于生成 Bean，并且管理 Bean 的生命周期，实现高内聚低耦合的设计理念。

- **AOP 编程的支持**

Spring 提供了面向切面编程，可以方便的实现对程序进行权限拦截、运行监控等切面功能。

- **声明式事务的支持**

支持通过配置就来完成对事务的管理，而不需要通过硬编码的方式，以前重复的一些事务提交、回滚的JDBC代码，都可以不用自己写了。

- **快捷测试的支持**

Spring 对 Junit 提供支持，可以通过注解快捷地测试 Spring 程序。

- **快速集成功能**

方便集成各种优秀框架，Spring 不排斥各种优秀的开源框架，其内部提供了对各种优秀框架（如：Struts、Hibernate、MyBatis、Quartz 等）的直接支持。

- **复杂API模板封装**

Spring 对 JavaEE 开发中非常难用的一些 API（JDBC、JavaMail、远程调用等）都提供了模板化的封装，这些封装 API 的提供使得应用难度大大降低。

## Spring 都有哪些模块



最主要的七大模块：

- **Spring Core**：Spring 核心，它是框架最基础的部分，提供 IOC 和依赖注入 DI 特性。
- **Spring Context**：Spring 上下文容器，它是 BeanFactory 功能加强的一个子接口。
- **Spring Web**：它提供 Web 应用开发的支持。
- **Spring MVC**：它针对 Web 应用中 MVC 思想的实现。
- **Spring DAO**：提供对 JDBC 抽象层，简化了 JDBC 编码，同时，编码更具有健壮性。
- **Spring ORM**：它支持用于流行的 ORM 框架的整合，比如：Spring + Hibernate、Spring + iBatis、Spring + JDO 的整合等。
- **Spring AOP**：即面向切面编程，它提供了与 AOP 联盟兼容的编程实现。


## 附录

![Spring 模块图](https://cdn.jansora.com/files/uPic/2022/05/19/PDDtRl.jpg)