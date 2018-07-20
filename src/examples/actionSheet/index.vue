<template>
  <div>
    <group title="actionSheet">
      <cell :title="{desc:`优惠券`}" :isLink="true" :value="{desc:selectInfo.key}" @clickHandler="actionSheetSwitch = true"></cell>
    </group>
    <action-sheet
      v-model="actionSheetSwitch"
      :cardList="cardList"
      title="选取优惠券"
      @clickNormalItem="selectItemResult"
    ></action-sheet>
  </div>
</template>
<script>
import Group from '../../fxjcui/extend/group/index'
import Cell from '../../fxjcui/extend/cell/index'
import ActionSheet from '../../fxjcui/extend/actionSheet/index'
export default {
  components: {
    Group, Cell, ActionSheet
  },
  data() {
    return {
      actionSheetSwitch:false,
      selectInfo: {},
      cardList:{
        normal: [
          {
            key: '代金券',
            value: '1',
            selected: true
          },{
            key: '优惠券',
            value: '2'
          },{
            key: '商城券',
            value: '3'
          },{
            key: '活动券',
            value: '4'
          },{
            key: '分期优惠券',
            value: '5'
          }
        ]
      }
    }
  },
  methods: {
    selectItemResult (info) {
      this.selectInfo = info
      console.log(info)
    }
  }
}
</script>
