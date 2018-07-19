# 短信验证码组件msgCode使用说明

## 1. 使用import引入对应的组件，代码如下
  
  ```
    import msgCode from '@comp/msgCode'
  ```
## 2. 在具体模块的pages下的vue文件中的components中注册组件barcode

  ```
    components: {
      msgCode
    }
  ```
## 3. 在模版内合适的位置使用组件msgCode

  ```
    <msg-code v-model="msgVC"
      startNum="60"
      rpcOperationType="com.ifp.MP1034"
      :rpcData="rpcData"
      :mobile.sync="mobileMask"
      :isValidBeforeFetch="isValidBeforeFetch"
      @clickFetch="validateAmt()"></msg-code>
  ```
## 4. msgCode组件属性传入的参数说明（表内含默认值）
通用参数和回调函数
| Option             | Default value.     | Type               | Description           |
| ------------------ |:------------------:|:------------------:|:---------------------:|
| msgVC              | 空字符串''          | String            | 输入的短信验证码         |
| startNum           | 60                 | String or Number  | 倒计时开始的数字         |
| keyboardType       | 'h5'               | String            | 枚举'h5', 'sys', 'nat' |
| @clickFetch        | 缺省即可            | Function          | 点击“获取”处理逻辑函数（可只写请求前校验逻辑），参数含有开始，结束倒计时的回调函数        |

封装了rpc请求用法：用到的参数和回调函数
| Option             | Default value.     | Type               | Description           |
| ------------------ |:------------------:|:------------------:|:---------------------:|
| rpcData            | {}                 | Object            | 获取验证码的接口入参    |
| rpcOperationType   | 空字符串''          | String            | 获取验证码的接口名      |
| isValidBeforeFetch | true               | Boolean           | 请求前的校验结果        |
| isDemo             | false              | Boolean           | 是否demo示例          |

不使用封装的rpc请求用法：用到的参数和回调函数
| Option             | Default value.     | Type               | Description           |
| ------------------ |:------------------:|:------------------:|:---------------------:|
| hasRpc             | true               | Boolean           | 是否选择封装的rpc请求   |
| isFocus            | false              | Boolean           | 非系统键盘时，是否focus |
| @focusHandler      | 缺省即可            | Function           | focus input处理逻辑   |

