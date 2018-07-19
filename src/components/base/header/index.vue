/**
 * Y表示必填,N表示非必填
 * @desc - 头部组件,
 * @props {clientInfo: Object} N- 通过原生获取到系统和版本信息，数据结构是{os,osVer},为了兼容ios11的导航条
 * @props {show: Boolean} N- 头部是否显示,默认false, 头部已智能在客户端不显示，设置该参数会覆盖原来的规则
 * @props {barStyle: String} N- 主题颜色 red,black,white
 * @props {backStyle: String} N- 背景，可传入background的属性
 * @props {leftOptions: Object} N- 配置左边按钮
 *  {
 *     type: 'none' 按钮内置图标，此值时不显示返回，不填或默认返回按钮
 *     preventGoBack: true  是否使用自定义的事件，默认为false，使用回退上一步
 *  }
 * @props {rightOptions: Array} N- 配置右边按钮
 *  ps: rightOptions 是一个数组如有动态改变需要整个数组替换
 * [
 *   {
 *     title:string  文字按钮
 *     color:string  文字颜色，颜色的hex值
 *     postion:string 左右位置，默认右边right 参数：left，right 可选
 *   },
 *   {
 *     icontype:string  原生预置按钮，类型有：add,back,brand,card,claffify,close,collect,collected,coupon,down,
 *     edit,home,installment,list,map,mapmore,explan,message,more,rule,search,service,set,share,shopping,skin,try
 *     postion:string 左右位置，默认右边right 参数：left，right 可选
 *   },
 *   {
 *     icon:string h5自定义图标，支持base64图片，远程url地址，公共资源包地址，离线包资源地址
 *     postion:string 左右位置，默认右边right 参数：left，right 可选
 *   },
 *   {
 *     titleIcon:string  //文字图标按钮 图标未下拉箭头
 *     color:string  //文字颜色，颜色的hex值
 *     postion:string //左右位置，默认右边right 参数：left，right 可选
 *   }
 * ]
 * @event leftHandler N - 自定义左按钮回调函数
 * @event rightHandler N - 自定义右按钮回调函数，参数是每个按钮的下标
 * @slot {name: other-layout} N - 头部常规布局以外的一些布局需要放在和头部一起的话可以使用
 * @slot {name: overwrite-left} N - 对于一些特殊的头部需要自定义left的布局可使用
 * @slot {name: overwrite-title} N - 对于一些特殊的头部需要自定义title的布局可使用
 * @slot {name: overwrite-right} N - 对于一些特殊的头部需要自定义right的布局可使用
 * @example <v-head ...props>
 *             <div slot="overwrite-left"></div>
 *             <div slot="overwrite-title">title</div>
 *             <div slot="overwrite-right"></div>
 *             <div slot="other-layout"></div>
 *          </v-head>
 */



<template>
  <div class="xcgb-head">
    <div class="head-content" :class="iosBelow11" v-if="customHead">
      <div class="xcgb-header-left">
        <slot name="overwrite-left">
          <div class="default_left_arrow_black" @click="leftClick"></div>
        </slot>
      </div>
      <h1 class="xcgb-title" :style="'color:'+ titleColor" v-if="!shouldOverWriteTitle">{{title}}</h1>
      <div class="xcgb-head-title-area" v-if="shouldOverWriteTitle">
        <slot name="overwrite-title">模拟头部</slot>
      </div>
      <div class="xcgb-header-right">
        <slot name="overwrite-right">
          <div class="default_more_black icon_more" :key="index" v-for="(item,index) in rightOptions" @click="rightClick(index, item)"></div>
        </slot>
      </div>
    </div>
    <div class="xcgb-other-layout" v-if="OverWriteOtherLayout">
      <slot name="other-layout"></slot>
    </div>
  </div>
</template>
<script>
  import utils from './utils'
  import props from './utils/props'
  export default {
    name: 'vHead',
    data () {
      return {
        customHead: true,
        shouldOverWriteTitle: false,
        OverWriteOtherLayout: false
      }
    },
    props,
    beforeMount () {
      if (this.$slots['overwrite-title']) {
        this.shouldOverWriteTitle = true
      }
      if(this.$slots['other-layout']){
        this.OverWriteOtherLayout = true
      }

      if(!this.show){ //默认false,开发者未设置
        if(App.device.alipayClient){
          this.customHead = false
          utils.clientHeadInit.call(this)
        }
      }else{
        this.customHead = this.show
      }

    },
    computed: {
      iosBelow11 () {
        const { os, osVer } = this.clientInfo;
        if(!os || !osVer) return ''
        const bigVerisonNo = osVer.split('.')[0];
        return os === 'ios' && bigVerisonNo < 11 ? 'below-ios11' : '' // ios11以下的iOS系统
      }
    },
    methods: {
      leftClick () {
        this.leftOptions.preventGoBack && this.$emit('leftHandler')
      },
      rightClick (index, item) {
        this.$emit('rightHandler', index, item)
      }
    },
    watch: {
      rightOptions(val){
        if(!this.show && App.device.alipayClient){
          utils.setOptionMenu(val)
        }
      }
    }
  }
</script>
<style lang="scss">
  @import './scss/index.scss';
</style>
