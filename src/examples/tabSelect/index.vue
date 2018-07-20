<template>
  <div>
    <tab-select
      @click=""
      v-model="tabSelectValue"
      :tabs="tabs">
      <!--此处是开发者自定义的内容-->
      <div class="card-list" slot-scope="slotProps">
        <div @click="itemClick(slotProps.scope,tabSelectValue,item.value)" v-for="item,index in slotProps.scope.data" :key="index" value="item.value" class="item" :class="{choiced:item.selected}">
          <div>
            <span>{{item.value}}
            </span>
            <i class="iconfont icon-list_radio" v-if="item.selected"></i>
          </div>
        </div>
      </div>
    </tab-select>
  </div>
</template>
<script>
  import Group from '../../fxjcui/extend/group/index'
  import TabSelect from '../../fxjcui/extend/tabSelect/index'

  export default {
    components: {
      Group, TabSelect
    },
    data() {
      return {
        tabSelectValue: '',
        tabs: [{
          key: '乒乓球',
          value: 'ball1',
          data: [
            {value: '全部',selected:true},
            {value: '乒乓球1'},
            {value: '乒乓球2'},
          ]
        }, {
          key: '羽毛球',
          value: 'ball2',
          data: [
            {value: '全部'},
            {value: '羽毛球1'},
            {value: '羽毛球2'},
          ]
        }, {
          key: '篮球',
          value: 'ball3',
          data: [
            {value: '全部'},
            {value: '篮球1'},
            {value: '篮球2'},
          ]
        }],
      }
    },
    methods: {
      itemClick(scope,tabValue,itemValue){
        scope.data.forEach(item=>{
          if(item.value === itemValue){
            item.selected = true
          } else {
            item.selected = false
          }
        })
        scope.data.splice()
      },
      tabClick(item) {
        console.log(item)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../fxjcui/common/scss/index";
  @mixin base {
    height: px2rem(104);
    line-height: px2rem(104);
    text-align: center;
    font-size: px2rem(32);
    background-color: white;
  }

  .vux-popup-dialog {
    max-height: 75%;
    overflow: hidden;
    display: flex;
    flex-flow: column;
  }

  .header {
    @include base;
    color: #8f8f8f;
    min-height: px2rem(104);
  }

  .item {
    @include base;
    color: #222;
    position: relative;
    text-align: left;
    padding-left: 0.3rem;
  }

  .item:first-child::before {
    border-top: none !important;
  }

  .item::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    top: 0px;
    left: 0px;
    border-top: 1px solid #e6e6e6;
    transform: scaleY(0.5);
  }

  .choiced {
    color: #e53935;
  }

  .cancel {
    @include base;
    margin-top: px2rem(16);
    color: #222;
  }

  .icon-list_radio {
    position: absolute;
    right: px2rem(30);
    color: #d81e06;
    font-size: px2rem(40);
  }

  .selectWarp {
    display: flex;
    flex-flow: column;
    .card-warp {
      display: flex;
      flex-flow: column;
    }
  }

  .list-wrapper {
    position: relative !important;
    background-color: #e6e6e6;
  }
</style>
