# 轮播图组件slide使用说明

## 1. 使用import引入对应的组件，代码如下
  
  ```
    import slide from '@comp/slide'
  ```
## 2. 在具体模块的pages下的vue文件中的components中注册组件slide

  ```
    components: {
      slide
    }
  ```
## 3. 在模版内合适的位置使用组件slide

  ```
    <slide :photoes="" autoplay=""></slide>
  ```
## 4. slide的组件传入的参数说明
基于swiper的vue封装，参数使用见下表

| Option   | Default value                | Type               |
| -------- |:----------------------------:|:------------------:|
| photoes  |要展示的图片路径数组，空数组不展示 | Array              |
| autoplay | 3000(ms)                     | String or Number   |

