# 自动配置原理

> 此文有参考 [自动配置原理](https://mp.weixin.qq.com/s?__biz=MzkwNjMwMTgzMQ==&mid=2247490236&idx=1&sn=636be5ccb19d59cfc1801efc22160ad0&source=41#wechat_redirect)


## 什么是自动配置

`Spring Boot` 的核心思想是 "约定大于配置" , 就是用户按照 "约定" 去做一些规范内的事, 那么 `Spring Boot` 就会帮你把剩余的繁琐的配置 "自动配置" 完毕. Spring Boot 帮你做的事情就是自动配置.

举个例子. 如何快速的在 `spring` 中 使用 `redis` ?

1. 在 `pom.xml` 里面引入`spring-boot-starter-data-redis.jar` 包.
2. 在 `application.properties` 里面加入配置项 (如果你的 `redis` 是在本机 6379 的端口上安装的, 那么连该步骤都不需要)
```properties
spring.redis.database = 0
spring.redis.timeout = 10000
spring.redis.host = 10.72.16.9
spring.redis.port = 6379
spring.redis.pattern = 1
```
3. 在 `Class` 中注入该 `Bean`

```java
@Autowired
private StringRedisTemplate stringRedisTemplate;
// 获取操作
stringRedisTemplate.get("key")
// 设置操作
stringRedisTemplate.put("key", "value")
// 删除操作
stringRedisTemplate.delete("key")
```
就这么简单.

## 自动配置帮你做了什么

在 `spring-boot-autoconfigure.jar` 包的下有一个 `META-INF/spring.factories` 文件.
![](https://cdn.jansora.com/files/uPic/2022/05/18/NRA2Wr.png)

该文件有个配置项, 该配置项指定了 `RedisAutoConfiguration` 这个类可以做自动装配
`org.springframework.boot.autoconfigure.EnableAutoConfiguration=...,\
org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration,\
...`

`RedisAutoConfiguration` 这个类读取了刚才列出来的配置项, 帮我们注入了 `redisTemplate` 和 `stringRedisTemplate`
两个 `bean`
![](https://cdn.jansora.com/files/uPic/2022/05/18/YaNcBI.png)


到这里相信你已经可以看出来 "约定大于配置" 中的约定是什么, 答案就是 在所有包含 `META-INF/spring.factories` 的 `jar` 包
中的如果存在 key 为 `org.springframework.boot.autoconfigure.EnableAutoConfiguration` 下的所有类都会被自动装配并加载

## 自动配置的工作原理

自动装配到底是怎么做到的 ?

每个 `Spring Boot` 应用都会加上 `@SpringBootApplication` 注解,  

在 `SpringBootApplication` 上标注了 `@EnableAutoConfiguration`,

![](https://cdn.jansora.com/files/uPic/2022/05/18/AvmnWE.png)

在 `EnableAutoConfiguration` 上标注了 `@Import(AutoConfigurationImportSelector.class)` ,

![by73Wp](https://cdn.jansora.com/files/uPic/2022/05/18/by73Wp.png)


`AutoConfigurationImportSelector` 的 `selectImports()` 方法调用了自身的 `getAutoConfigurationEntry` 方法

![DfDp3Y](https://cdn.jansora.com/files/uPic/2022/05/18/DfDp3Y.png)

`getAutoConfigurationEntry` 调用了 `getCandidateConfigurations` 方法, 

![ikzm7E](https://cdn.jansora.com/files/uPic/2022/05/18/ikzm7E.png)


`getAutoConfigurationEntry` 方法中  `SpringFactoriesLoader.loadFactoryNames` 会扫描 所有包含 `META-INF/spring.factories` 的 `jar` 包
中的如果存在 key 为 `org.springframework.boot.autoconfigure.EnableAutoConfiguration` 下的所有类都会被自动装配并加载


在应用启动时的调用栈大概是这样的.

SpringApplication.run(...)方法怎么调到selectImports()方法的

加载过程大概是这样的：

SpringApplication.run(...)方法  》

AbstractApplicationContext.refresh()方法  》

invokeBeanFactoryPostProcessors(...)方法  》

PostProcessorRegistrationDelegate.invokeBeanFactoryPostProcessors(...) 方法  》

ConfigurationClassPostProcessor.postProcessBeanDefinitionRegistry(..)方法  》

AutoConfigurationImportSelector.selectImports




## 如何自定义一个 starter ?