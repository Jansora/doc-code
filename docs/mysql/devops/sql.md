# 运维 SQL

查看数据库当前的链接情况

`show PROCESSLIST;`

查找持续时间超过 60s 的事务

`select * from information_schema.innodb_trx where TIME_TO_SEC(timediff(now(),trx_started))>60`

