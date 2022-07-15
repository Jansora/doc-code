# 原型

使用原型实例指定要创建对象的类型，通过复制这个原型来创建新对象。



在 java 中有 Object.clone() .

```java

public class DescriptionVo implements Serializable, Cloneable {

    /**
     * 内容文本
     *
     */
    String description;

    /**
     * tag 列表
     */
    List<Long> tagIds;

    /**
     * tag 列表
     */
    List<TagVo> tags;
 

    @Override
    public DescriptionVo clone() {
        try {
            DescriptionVo clone = (DescriptionVo) super.clone();
            clone.description = this.description;
            clone.tags = tags;
            clone.tagIds = this.tagIds;
            return clone;
        } catch (CloneNotSupportedException e) {
            // this shouldn't happen, since we are Cloneable
            throw new InternalError(e);
        }

    }
}

```