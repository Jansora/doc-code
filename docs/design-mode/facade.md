# facade 外观

提供了一个统一的接口，用来访问子系统中的一群接口，从而让子系统更容易使用。


facade 有点像 DDD 中的 application 层. facade 只保留一个业务入口, 具体的实现交给 domain 层去做.


观看电影需要操作很多电器，使用外观模式实现一键看电影功能。

```java

public class SubSystem {
    public void turnOnTV() {
        System.out.println("turnOnTV()");
    }

    public void setCD(String cd) {
        System.out.println("setCD( " + cd + " )");
    }

    public void starWatching(){
        System.out.println("starWatching()");
    }
}


public class Facade {
    private SubSystem subSystem = new SubSystem();

    public void watchMovie() {
        subSystem.turnOnTV();
        subSystem.setCD("a movie");
        subSystem.starWatching();
    }
}

public class Client {
    public static void main(String[] args) {
        Facade facade = new Facade();
        facade.watchMovie();
    }
}
```

最少知识原则: 只和你的密友谈话。也就是说客户对象所需要交互的对象应当尽可能少。

