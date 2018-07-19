# 条形码生成组件barcode使用说明

## 1. 使用import引入对应的组件，代码如下
  
  ```
    import barcode from '@comp/barcode'
  ```
## 2. 在具体模块的pages下的vue文件中的components中注册组件barcode

  ```
    components: {
      barcode
    }
  ```
## 3. 在模版内合适的位置使用组件barcode

  ```
    <barcode :value="barValue" text-margin="5" display-value="true"></barcode>
  ```
## 4. barcode组件属性传入的参数说明（表内含默认值）
基于lindell/JsBarcode做的vue封装，具体传入的参数注意事项请参考： [https://github.com/lindell/JsBarcode/wiki/Options](https://github.com/lindell/JsBarcode/wiki/Options)

| Option       | Default value.            | Type               |
| ------------ |:-------------------------:|:------------------:|
| value        | 要展示的字符串，空字符串不展示 | String             |
| format       | "CODE128"         | String             |
| width        | 2                 | String or Number   |
| height       | 100               | String or Number   |
| displayValue | true              | String or Boolean  |
| text         | undefined         | String             |
| fontOptions  | ""                | String             |
| font         | "monospace"       | String             |
| textAlign    | "center"          | String             |
| textPosition | "bottom"          | String             |
| textMargin   | 2                 | String or Number   |
| fontSize     | 20                | String or Number   |
| background   | "#ffffff"         | String (CSS color) |
| lineColor    | "#000000"         | String (CSS color) |
| margin       | 10                | String or Number   |
| marginTop    | undefined         | String or Number   |
| marginBottom | undefined         | String or Number   |
| marginLeft   | undefined         | String or Number   |
| marginRight  | undefined         | String or Number   |
| valid        | function(valid){} | Function           |
