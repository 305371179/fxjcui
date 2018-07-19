<template>
  <div class="relaxPay">
    <group>
      <x-switch title="小额轻松付" :inline-desc="`单笔￥${limit} 每日积累￥${limit}`" v-model="Flag" @click.native="onClickFlag" prevent-default ></x-switch>
    </group>
    <popup v-model="showPopupFlag">
      <div class="msgTitle">
        <img src="../../../../assets/bill/nav_icon_close.png" alt="" @click="showPopupFlag = !showPopupFlag" >
        <p>小额轻松付</p>
      </div>

      <div class="msgTips">
        <p>用于App小额支付免提现密码</p>
        <p>当前限额: 单笔<a>￥{{limit}}</a>,每日累计<a>￥{{dayLimit}}</a></p>
      </div>
      <x-input title="选取卡片" v-model="curCard.key" readonly @click.native="selectCard">
        <img slot="right" src="../../../../assets/change_card.png">
      </x-input>
      <x-input :max="6" title="支付密码" v-model="psw" placeholder="请输入密码" readonly @click.stop.native="showPswKeyboard"></x-input>
      <x-input :max="6" title="验证码" v-model="token" placeholder="请输入短信验证码">
        <span slot="right" class="get-message" @click="getToken">
          <i v-if="!start">获取</i>
          <countdown v-model="time" :start="start" @on-finish="finish" v-if="start"></countdown>
          <i v-if="start">s</i>
        </span>
      </x-input>
      <p class="tokenTips">{{tokenTips}}</p>
      <v-button :plain="false" :disabled="!status" @clickHandler="ensureOpen" :buttonStyle="{marginTop:'.6rem',marginBottom:'.3rem'}">确认开通</v-button>
    </popup>
    <select-card :cardList="cardList" @clickNormalItem="clickNormalItem" v-model="select"></select-card>
  </div>
</template>
<script>
import { Group, XSwitch, Popup, XInput, Countdown } from 'vux'
import selectCard from '@comp/selectCard'
import { closeRelaxPay, openRelaxPay } from './utils'
export default {
  name: 'relaxPay',
  data(){
    return {
      Flag: false, //是否开启了小额轻松付
      showPopupFlag: false,
      dayLimit: '300',
      limit: '300',
      psw: '',
      token: '',
      time: 60,
      start: false,
      tokenTips: '',
      select: false,
      curCard: {}, //当前选中的卡片集
      cardList: {}
    }
  },
  components: {
    Group,
    Popup,
    XInput,
    XSwitch,
    Countdown,
    selectCard
  },
  methods: {
    onClickFlag(){
      // 点击开启或关闭小额轻松付
      this.Flag ? closeRelaxPay() : openRelaxPay()
    }
  }
}
</script>
