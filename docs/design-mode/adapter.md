# 适配器(Adapter)

将一个类的接口, 转换成客户期望的另一个接口。 适配器让原本接口不兼容的类可以合作无间。 对象适配器使用组合, 类适配器使用多重继承。



著作权归https://pdai.tech所有。
链接：https://pdai.tech/md/dev-spec/pattern/9_adapter.html

鸭子(Duck)和火鸡(Turkey)拥有不同的叫声，Duck 的叫声调用 quack() 方法，而 Turkey 调用 gobble() 方法。 
要求将 Turkey 的 gobble() 方法适配成 Duck 的 quack() 方法，从而让火鸡冒充鸭子！


```java
public interface Duck {
    void quack();
}
 public interface Turkey {
    void gobble();
}


public class WildTurkey implements Turkey {
    @Override
    public void gobble() {
        System.out.println("gobble!");
    }
}


public class TurkeyAdapter implements Duck {
    Turkey turkey;

    public TurkeyAdapter(Turkey turkey) {
        this.turkey = turkey;
    }

    @Override
    public void quack() {
        turkey.gobble();
    }
}

public class Client {
    public static void main(String[] args) {
        Turkey turkey = new WildTurkey();
        Duck duck = new TurkeyAdapter(turkey);
        duck.quack();
    }
}
```

[//]: # ()
[//]: # (这个有点类似于 Do -> Dto  /  Dto -> Vo 之类的转换)

[//]: # ()
[//]: # (在 DDD 的设计中 domain -> application 层通常需要这种转换.)

[//]: # ()
[//]: # ()
[//]: # (在 java 中常见的 dto 转换有硬编码, bean copy / mapstruct 等工具)

[//]: # ()
