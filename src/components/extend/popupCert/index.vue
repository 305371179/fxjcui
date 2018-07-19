<!-- 选证件弹窗 -->
<!-- @author 黄武韬-->
<!-- @prop v-model [boolean] 弹窗开关-->
<!-- @prop list [Array] 证件类型列表-->
<!-- @event selected 选择证件类型或关闭弹窗后返回选中的类型 -->
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
      <picker :data="[list2]" v-model="result" @on-change="change"></picker>
    </div>
  </popup>
</template>

<script>
import { Popup, Picker } from 'vux'
export default {
  data () {
    return {
      result: ['0'],
      defaultList: [
        {"name":"身份证","value":"0"},
        {"name":"户口簿","value":"1"},
        {"name":"护照","value":"2"},
        {"name":"军官证","value":"3"},
        {"name":"士兵证","value":"4"},
        {"name":"港澳来往内地通行证","value":"5"},
        {"name":"台湾同胞来往内地通行证","value":"6"},
        {"name":"临时身份证","value":"7"},
        {"name":"外国人居留证","value":"8"},
        {"name":"警官证","value":"9"},
        {"name":"其他证件","value":"X"}
      ]
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
    list: {
      type: Array
    }
  },
  computed: {
    isOpen () {
      return this.value
    },
    list2 () {
      return this.list.length === 0 ? this.defaultList : this.list
    }
  },
  components: {
    Popup,
    Picker
  },
  methods: {
   popupShow () {
     this.$emit('input', true)
   },
   hide () {
     this.$emit('input', false)
   },
   change () {
    let back = this.list2.find(a => a.value === this.result[0])
    this.$emit('selected', back)
   }
  }
}
</script>

