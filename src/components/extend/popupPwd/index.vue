<!-- 输入密码弹窗 -->
<!-- @author 黄武韬-->
<!-- @prop v-model [boolean] 弹窗开关-->
<!-- @prop enableFingerprintPay [boolean] 是否允许使用指纹（面容）支付-->
<!-- @prop title [string] 标题位置展示文案 为空则展示‘请输入密码’ -->
<!-- @prop price [string] 价格 为空则展示0 -->
<!-- @prop discount [string] 折扣 为空则不展示 -->
<!-- @prop msg [string] 提示文案 为空则不展示 -->
<!-- @prop rightBtn [string] 标题栏右侧按钮文案 为空则不展示 -->
<!-- @event show 弹窗唤起后触发的回调 -->
<!-- @event hide 弹窗关闭后触发的回调 -->
<!-- @event setPwd 原生密码键盘弹出后的回调 -->
<!-- @event rightBtnClick 标题栏右侧按钮点击后的回调 -->
<!-- @event setPwdEnd 设置完6位密码后的回调 当使用指纹（面容）支付时，参数为{type,typeName,errorMessage,data,disableFingerprintPayByErrorCode}，详细见App.Native.fingerprintPay()；否则参数为密码字符串

可判断type是否有值从而判断当前用户使用的支付方式是否为指纹（面容）支付，用法如下：
 //verData为clickHandler回调函数的参数
 if(verData.type==='finger'){//如果为指纹（面容）支付
	Object.assign(params,verData.data)//合并指纹（面容）支付所需的接口参数到上送参数对象里
 }else{
   //密码支付逻辑...
 }
 //TODO 这里调用支付接口完成支付
 App.Native.rpc({
	 operationType: '...',
	 data: params
 }).then(({header,body})=>{
 	//支付成功
 },async ({header,body})=>{
 	//支付失败
 	verData.disableFingerprintPayByErrorCode && await verData.disableFingerprintPayByErrorCode(header.errorCode) //调用回调函数并将错误码传入，将自动进行指纹（面容）支付失败的异常处理。注：若是普通支付方式并不提供该回调函数
 	//TODO 继续其他支付失败时的异常处理，比如弹框（视业务逻辑而定）
	App.Native.toast({
		content: header.errorMsg,
		type: 'exception'
	})
 })

-->
<template>
  <popup
  :value="isOpen"
  position="bottom"
  :hide-on-blur="hideOnBlur"
	:show-mask="showMask"
	:hide-on-deactivated="hideOnDeactivated"
  :popup-style="popupStyle"
  @on-show="popupShow"
  @on-hide="hide"
  @on-first-show="popupShow"
  >
    <div class="main">
      <div class="header">
        <div class="close" @click="close"></div>
        <div class="title">{{title}}</div>
        <div class="change" @click="rightBtnClick">{{rightBtn}}</div>
      </div>
      <div class="price">{{price}}</div>
      <div class="discount" v-if="discount !== ''">{{discount}}</div>
      <div class="msg" v-if="msg !== ''">{{msg}}</div>
      <div class="pwd" @click="showKeyboard">
        <div><div :class="{'on': passwordKey.length >= 1}"></div></div>
        <div><div :class="{'on': passwordKey.length >= 2}"></div></div>
        <div><div :class="{'on': passwordKey.length >= 3}"></div></div>
        <div><div :class="{'on': passwordKey.length >= 4}"></div></div>
        <div><div :class="{'on': passwordKey.length >= 5}"></div></div>
        <div><div :class="{'on': passwordKey.length >= 6}"></div></div>
      </div>
    </div>
  </popup>
</template>

<script>
import { Popup } from 'vux'
export default {
  data () {
    return {
      isOpen: false,
      passwordKey: ''
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    hideOnBlur: {
      type: Boolean,
      default: true
    },
    hideOnDeactivated: {
      type:Boolean,
      default: true
    },
    showMask: {
      type: Boolean,
      default: true
    },
    popupStyle: {
		  type: Object,
      default(){
        return {
          'background-color': 'rgb(246, 246, 246)'
        }
      }
    },
    title: {
      type: String,
      default: '请输入密码'
    },
    rightBtn: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: '0'
    },
    discount: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    enableFingerprintPay: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Popup
  },
  watch: {
    async value (newVal) {
      if(newVal){
        //显示
        if(await this.isSupportFingerprintPay()){//可使用指纹支付，不弹出收银台，直接弹出指纹验证对话框，进行指纹验证
            this.isOpen = false;//不显示收银台
            App.Native.fingerprintPay(()=>{//当用户点击输入密码按钮或设备不支持指纹识别时回调该函数
              this.isOpen = true
            }).then(result=>{
              if(result){//用户正常验证，未主动取消
                let disableFingerprintPayByErrorCode = result.disableFingerprintPayByErrorCode
                this.$emit('setPwdEnd', Object.assign(result,{
                  type: 'finger',
                  disableFingerprintPayByErrorCode: async (...arg) => {//给上层传递回调函数，用以当支付失败时根据错误码更新状态
                    if(await disableFingerprintPayByErrorCode(...arg)){//符合特定错误码会取消指纹支付，只能使用密码
                      this.isOpen = true;//显示收银台
                    }
                  }
                }))
              }
            },error=>{
              //异常，提示用户错误信息
              App.Native.toast({
                  content: error.errorMessage,
                  type: 'exception'
              })
            }).then(()=>{
              !this.isOpen && this.$emit('input',false) //复位收银台，以便可以再次调起
            })
        }else{
          this.isOpen = true;//显示收银台
        }
      }else{
        //隐藏
        this.isOpen = false;//不显示收银台
      }
    },
    passwordKey (value) {
      if (value.length >= 6) {
        App.Native.hideKeyboard()
        this.$emit('setPwdEnd', this.passwordKey)
      }
    }
  },
  methods: {
    //判断是否可使用指纹支付
    async isSupportFingerprintPay(){
      return (this.enableFingerprintPay && await App.Native.isSupportFingerprintPay())
    },
    close () {
      this.$emit('input', false)
    },
    popupShow () {
      this.$emit('show')
      this.$emit('setPwd')
      App.on('inputMsg',this.inputMsg);
      App.Native.showKeyboard({
        isSpecialPassWordRequired: false,
        maxSize: 6,
        ps: 'AE0'
      })
    },
    hide () {
      this.$emit('input', false)
      this.$emit('hide')
      App.off('inputMsg',this.inputMsg);
      App.Native.hideKeyboard()
    },
    showKeyboard () {
      this.$emit('setPwd')
      this.passwordKey = ''
      App.Native.showKeyboard({
        isSpecialPassWordRequired: false,
        maxSize: 6,
        ps: 'AE0'
      })
    },
    inputMsg (data) {
      this.passwordKey = data.data.psw
    },
    rightBtnClick () {
      if( this.rightBtn) {
        this.$emit('rightBtnClick')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@common/scss/functions.scss';
@import '~@common/scss/vars.scss';
.main{
  line-height: initial;
  text-align: center;
  padding-bottom: px2rem(260, 1);
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: px2rem(104);
    border-bottom: 1px solid $line-color;
    .close{
      background-image: url(~@/assets/close.png);
      background-size: 100% 100%;
      width: old2new(1.173);
      height: old2new(1.173);
    }
    .change{
      width: old2new(1.173);
      text-align: center;
      font-size: $font-h4;
      color: #cb181d;
    }
    .title{
      font-size: $font-h1;
    }
  }
  .price{
    margin-top: px2rem(42);
    font-size: px2rem(54);
    text-align: center;
  }
  .price::before{
    content: "¥";
  }
  .discount{
    margin: auto;
    margin-top: px2rem(25);
    font-size: px2rem(24);
    color: #f47000;
    width: px2rem(170);
    height: px2rem(35);
    line-height: px2rem(35);
    border: 1px solid #f47000;
    text-align: center;
    border-radius: 3px;
  }
  .msg{
    font-size: $font-h4;
    color: #5c5c5c;
    text-align: center;
    margin-top: px2rem(39);
  }
  .pwd{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-top: px2rem(21);
    border: 1px solid #666;
    margin-bottom: px2rem(39);
    >div{
      border-right: 1px solid #ccc;
      >div{
        width: px2rem(25);
        height: px2rem(25);
        border-radius: 100%;
        margin: px2rem(32);
      }
      .on{
        background-color: #222;
      }
    }
    >div:last-child{
      border-right: none;
    }
  }
}
</style>
