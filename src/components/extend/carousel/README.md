# 轮播图组件

## 1. 说明
  基于swiper封装的轮播图组件，支持显示图片和html片段。由vCarousel（轮播图）和vCarouselItem（轮播图元素）组成。

## 2. 配置项
由vCarousel（轮播图）
在`<slot>`放置的vCarouselItem会识别为轮播图的元素

| Option         | Default value |  Type   | Desc                           |
| :------------- | :-----------: | :-----: | ------------------------------ |
| loop           |     true      | Boolean | 是否循环播报                         |
| pagination     |     false     | Boolean | 是否显示分页器                        |
| initialSlide   |       0       | Number  | 初始化时的索引                        |
| delay          |     3000      | Number  | 自动轮播的间距时长，ms，0代表不自动播报          |
| slidesPerView  |       1       | Number  | 视图内显示的幻灯片数量，可为小数               |
| centeredSlides |     false     | Boolean | 活动的幻灯片是否居中，slidesPerView不为1时有效 |
| spaceBetween   |       0       | Number  | 幻灯片间隔，rem                      |
vCarouselItem（轮播图元素）：
可在`<slot>`放置html元素

| Option | Default value |  Type  | Desc                  |
| :----- | :-----------: | :----: | --------------------- |
| src    |      ''       | String | 图片路径，如果指定，则会自动创建<img> |

## 3. 属性
| Attr        |  Type  |  Desc   |
| :---------- | :----: | :-----: |
| activeIndex | Number | 活动元素的下标 |

## 4. 方法
| No.  | Method/Param | Return/Type | Desc                  |
| :--: | :----------- | :---------: | --------------------- |
|  1   | __slideTo__  |      无      | 切换元素下标                |
|      | index        |   Number    | 要切换的下标                |
|      |              |             |                       |
|  2   | __update__   |      无      | 重新计算元素数量（元素数量变化后需要调用） |

## 5. 事件
| No.  | Event/Param |   Type   | Desc |
| :--: | ---------- | :---------- | :------: | :--: |
|  1   | __click__  | -           |  点击元素触发  |      |
|      | index      | Number      | 点中的元素下标  |      |
|      | e          | Object      |   事件对象   |      |
|      |            |             |          |      |
|  2   | __update__ | -           | 切换活动元素触发 |      |
|      | index      | Number      | 活动元素的下标  |      |

## 6. 示例
```html
<v-carousel>
	<v-carousel-item v-for="item in pics" :key="item" :src="item"/>
</v-carousel>
```
```html
<v-carousel>
	<v-carousel-item v-for="item in 5" :key="item" :src="item">
		{{item}}
	</v-carousel-item>
</v-carousel>
```