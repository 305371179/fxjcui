# 轮播图组件

## 1. 说明
  数字动画控件，数字从0到指定数字动画过渡。

## 2. 配置项
| Option         | Default value |  Type   | Desc                           |
| :------------- | :-----------: | :-----: | ------------------------------ |
| number           |     无      | Number | 数值                         |
| during     |     1000     | Number | 动画持续时长，ms                        |
| formatter   |       (每3位加逗号，保留2位小数)       | Function  | 数值格式化函数，参数为number                        |

## 3. 属性
无

## 4. 方法
无

## 5. 事件
| No.  | Event/Param | Type   |   Desc   |
| :--: | ----------- | :----- | :------: |
|  1   | __end__   | -      |  动画结束触发  |
|      | text       | String | 格式化后的数字字符串  |

## 6. 示例
```html
<count-up :number="10000"/>
```