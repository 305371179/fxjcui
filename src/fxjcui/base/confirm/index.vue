<!-- confirm -->
<!-- @author 黄武韬-->
<!-- @prop title [string] 标题，为空不展示 -->
<!-- @prop message [string] 介绍信息，为空不展示 -->
<!-- @prop img [string] 展示的图片地址，需先require -->
<!-- @prop okButton [string] 确认按钮文案，默认'确认' -->
<!-- @prop zIndex [number] 弹出框层级 -->
<!-- @prop cancelButton [string] 取消按钮文案,为空不展示 -->
<!-- @prop extendBtns [Array] 扩展按钮文案及点击返回值，为空不展示 -->
<!-- @return [Promise] 确认按钮返回true，取消按钮返回false -->
<template>
  <div class="main" :style="{zIndex: options.zIndex ? options.zIndex : 'auto'}">
    <x-dialog
      v-model="showValue"
      dialog-class="weui-dialog"
      mask-transition="vux-fade"
      dialog-transition="vux-dialog"
      @on-hide="hide"
    >
      <div class="box">
        <div class="pad">
          <div class="title" v-if="options.title">{{options.title}}</div>
          <div class="msg" v-if="options.message">{{options.message}}</div>
          <div class="msg" v-if="options.messageHtml" v-html="options.messageHtml"></div>
          <div class="img" v-if="options.img"><img :src="options.img"></div>
        </div>
        <div class="btns" @click="click">
          <div class="cancel" v-if="options.cancelButton">{{options.cancelButton}}</div>
          <div class="submit">{{options.okButton}}</div>
        </div>
        <div class="eb" @click="click">
          <div class="extendBtns" :style="item.color && ('color:' + item.color)" v-if="extend.length !== 0" :data-back="item.value" :key="index" v-for="(item, index) in extend">{{item.key}}</div>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog } from 'vux'
export default {
  components: {
    XDialog
  },
  data () {
    return {
      showValue: false
    }
  },
  props: {
    options: {
      default () {
        return {
          title: '小发提醒',
          message: '',
          zIndex: null,
          img: '',
          okButton: '确认',
          cancelButton: ''
        }
      }
    },
    extend: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    click (e) {
      this.showValue = false
      this.$emit('click',e)
    },
    hide () {
      this.$emit('hide')
    }
  },
  mounted () {
    this.showValue = true
  }
}
</script>
<style lang="scss" scoped>
  @import "../../common/scss/index.scss";
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .box{
    background-color: white;
    border-radius: 5px;
    .pad{
      margin: 0px px2rem(30);
    }
    .img{
      margin-top: px2rem(9, 1);
      img{
        width: 100%;
        display: block;
      }
    }
    .title{
      font-size: px2rem(36);
      color: $font-color-t1;
      font-weight: bold;
      text-align: center;
      margin-top: px2rem(64);
    }
    .msg{
      font-size: $font-h3;
      color: $font-color-t2;
      text-align: center;
      padding: 0px px2rem(20);
      margin-top: px2rem(24);
    }
    >.btns{
      border-top: 1px solid $line-color;
      margin-top: px2rem(64);
      position: relative;
      height: px2rem(96);
      line-height: px2rem(96);
      display: flex;
      justify-content: space-between;
      >div{
        width: 100%;
        text-align: center;
        font-size: $font-h3;
      }
      >.cancel{
        color: $font-color-t2;
        border-right: 1px solid $line-color;
      }
      >.submit{
        color: $color-cm;
      }
    }
    .extendBtns{
      border-top: 1px solid $line-color;
      height: px2rem(96);
      line-height: px2rem(96);
      text-align: center;
      font-size: $font-h3;
      color: $font-color-t2;
    }
  }
}
</style>
