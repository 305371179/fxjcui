<template>
  <div>
    <group title="cell列表">
      <cell :title="{desc:'单行列表'}" :isLink="true" :value="{desc:'描述信息',isBreak: false, align:'left'}"></cell>
      <cell :title="{desc:'单行列表'}" :value="{desc:'描述信息'}"></cell>
      <cell :title="{desc:'单行列表'}" :isLink="true" :value="{desc:'描述信息'}"></cell>
      <cell :title="{desc:'单行列表'}" :isLink="true"></cell>
    </group>
    <group :top="true">
      <cell :title="{desc:'双行列表'}" :value="{desc:'时间停留',subDesc:'描述信息'}" :isLink="true"></cell>
      <cell :title="{desc:'双行列表',subDesc:'描述信息'}" :isLink="true"></cell>
      <cell :title="{desc:'双行列表',subDesc:'描述信息'}" :value="{desc:'描述信息'}" :isLink="true"></cell>
    </group>
    <group :top="true">
      <cell :text="{desc:'广东省佛山市南海区桂城镇灯湖东路6号广发银行金融中心'}" :isLink="true"></cell>
      <cell :text="{desc:'广东省佛山市南海区桂城镇灯湖东路6号广发银行金融中心', isBreak:true}" :isLink="true"></cell>
    </group>
    <group title="选择城市">
      <cell :title="{desc:'选择城市',subDesc:'点击选择'}"
            :value="{desc:addressInfo.names.join(' ')}"
            :isLink="true"
            @clickHandler="clickHandler"
      ></cell>
    </group>
    <group title="开关">
      <cell :title="{desc:'开关'}">
        <v-inline-switch v-model="sswitch" slot="cell-ft" @clickHandler="oc"></v-inline-switch>
      </cell>
    </group>

    <group title="列表输入/模拟光标">
      <cell-input type="password" align="left" v-model="word" :readonly="true" :focus="setF" @clickHandler="setFoucs"></cell-input>
    </group>


    <group title="带扫描/输入/说明项图标">
      <cell-input iconType="tips" align="left" @on-focus="onFoucs" @on-blur="onBlue" placeholder="预设内容"></cell-input>
      <cell-input iconType="camera" align="left" placeholder="预设内容" @clickIconHandler="clickIconHandler"></cell-input>
    </group>

    <group :top="true">
      <cell-input label="多项输入" v-model="word"></cell-input>
      <cell-input label="输入" v-model="word"></cell-input>
      <cell-input label="标题实在太长" v-model="word"></cell-input>
    </group>
    <group :top="true" title="输入框加列表">
      <cell-input label="多项输入" v-model="word" iconType="arrow" align="right"></cell-input>
      <cell-input label="输入" v-model="word" align="right"></cell-input>
    </group>
    <group title="短信验证码：不带请求的用法示例">
      <msg-code v-model="msgVC" startNum="10" keyboardType="nat" :hasRpc="false" @focusHandler="focusInput" @clickFetch="clickFetch" @blurHandler="blurHandler"></msg-code>
    </group>
    <number-keyboard v-model="keyboard" :word.sync="word"></number-keyboard>
    <number-keyboard v-model="msgkeyboard" :word.sync="msgVC"></number-keyboard>
  </div>
</template>
<script>
import Group from '../../fxjcui/extend/group/index'
import Cell from '../../fxjcui/extend/cell/index'
import CellInput from '../../fxjcui/extend/cellInput/index'
import VInlineSwitch from '../../fxjcui/extend/inlineSwitch/index'
import NumberKeyboard from '../../fxjcui/extend/numberKeyboard/index'
import MsgCode from '../../fxjcui/extend/msgCode/index'

export default {
  components: {
    Group,
    Cell,
    VInlineSwitch,
    CellInput,
    NumberKeyboard,
    MsgCode
  },
  data() {
    return {
      msgVC:'',
      word: '',
      setF:false,
      sswitch: false,
      keyboard:false,
      msgkeyboard:false,
      addressInfo: {
        names: ['选择地址'],
        ids: []
      },
      select: ["440000", "440100", "440111"],
    }
  },
  methods: {
    blurHandler () {
    },
    focusInput(e, cb) {
      this.msgkeyboard =true
    },
    clickFetch (startCount, stopCount) {
      console.log('这个方法中处理短信验证码点击"获取"的逻辑');
      startCount(); // 开始倒计时的回调函数
      setTimeout(() => {
        stopCount() // 结束倒计时的回调函数
      }, 10000);
    },
    onFoucs(){
      console.log(`onFoucs`)
    },
    onBlue(){
      console.log('onBlue')
    },
    clickIconHandler(){
      console.log('clickIconHandler')
    },
    setFoucs(){
      this.setF = true
      // App.Native.showKeyboard()
      this.keyboard = true
    },
    oc(){
      this.sswitch = !this.sswitch
    },
    clickHandler(){
      console.log('点击')
    },
  }
}
</script>
