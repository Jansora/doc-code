# facade 外观

提供了一个统一的接口，用来访问子系统中的一群接口，从而让子系统更容易使用。


facade 有点像 DDD 中的 application 层. facade 只保留一个业务入口, 具体的实现交给 domain 层去做.
