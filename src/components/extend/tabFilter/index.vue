<!-- tab筛选项 -->
<!-- @author 黄武韬-->
<!-- @prop tabs [Array] 按钮配置数组-->
<!-- @event tabClick 返回按钮状态对象 -->
<!-- @example
  <tab-filter
    :tabs="[{
      key: '价格',
      value: 'price'
    },{
      key: '销量',
      value: 'sold'
    }]"
    @tabClick="(e) => {console.log(e)}">
  </tab-filter>
  {price: "none", sold: "up"}
  -->
<template>
  <div class="main">
    <div :key="index" v-for="(item, index) in tab" :class="item.status" :style="item.click && 'color: #e53935'" @click="clickHandler(index)">{{item.key}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      opt: []
    }
  },
  computed: {
    tab () {
      return this.opt
    },
    result () {
      return this.tab.map(a => {
        return a.status
      })
    }
  },
  methods: {
    clickHandler (e) {
      this.opt.forEach(a => {
        a.click = false
      })
      this.opt[e].click = true
      this.opt[e].status = this.opt[e].status === 'up' ? 'down' : 'up'
      this.opt =[...this.opt]
      this.$emit('tabClick', this.result)
    }
  },
  props: {
    tabs: Array
  },
  mounted () {
    this.opt = this.tabs.map(item => {
      item.status = item.status?item.status:'none'
      if(item.status!=='none'){
        item.click = true
      }
      return item
    })
  }
}
</script>
<style lang="scss" scoped>
.main{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0 1px old2new(0.08) rgba(51,51,51,0.06);
  height: old2new(1.1733);
  >div{
    flex: 1 1 1px;
    font-size: $font-h4;
    color: $font-color-t2;
    line-height: initial;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  >div::after{
    content: "";
    background-size: 100% 100%;
    width: old2new(0.186);
    height: old2new(0.266);
    margin-left: px2rem(16);
    display: block;
    line-height: initial;
    margin-top: old2new(0.02);
  }
  >.none::after{
    background-image: url(./images/tab_icon_normal_normal@2x.png);
  }
  >.up::after{
    background-image: url(./images/tab_icon_up_normal@2x.png);
  }
  >.down::after{
    background-image: url(./images/tab_icon_down_normal@2x.png);
  }
}
</style>
