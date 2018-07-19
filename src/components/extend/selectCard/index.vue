<!-- 选卡组件 -->
<!-- @props cardType [Object] 列表类型,不传入该参数则使用cardList
      {
        credit: Boolean,
        debit: Boolean,
        other: Boolean
      }
-->
<!-- @props cardList [Object] 列表类型,使用者自己组装卡列表传入
      {
        normal: [ {key, value, iconType} ],   normal 表示正常使用的卡片
        disable: [ {key, value, iconType} ],   disable 表示无法在当前状态下使用的卡片
      }
-->
<!-- @props permissionList [Array] 需开通协议的他行卡列表
      [
      	{key, value, iconType, cardNo_mask}
      ]
-->
<!-- @props disableCardListTitle [string] 无效卡注释 -->
<!-- @props permissionOpen [string] 开通他行卡协议类型，'0'线上消费，'1'扫码付 -->
<!-- @props addCard [Boolean]  是否在组件中显示添加卡片的按钮-->
<!-- @props addCardText [string]  添加卡片按钮文字,默认按钮文字"添加卡片"-->
<!-- @props defaultCard [string] 选中的卡片-->
<!-- @props title [string] 标题-->
<!-- @props params [Object] 传入加挂卡片页面的参数 -->
<!-- @props autoDrump [Boolean] 为false时关闭自动跳转 -->
<!-- @event result 返回选中卡信息 -->
<!-- @event clickNormalItem 卡片点选后返回卡信息 -->
<!-- @event clickCardHandler 点击添加卡片的回调-->
<!-- @event openCardHandler 点击开通协议的回调-->
<template>
	<div v-transfer-dom :class="className">
	<popup
	:value="value"
	:hide-on-blur="hideOnBlur"
	:position="position"
	:show-mask="showMask"
	:popup-style="popupStyle"
	:hide-on-deactivated="hideOnDeactivated"
	:class="{toLeft,toBottom}"
	ref="popup"
	@on-first-show="onFirstShow"
	@on-show="onShow"
	@on-hide="onHide"
	>
		<div class="selectWarp">
			<div class="popup-select-header">
        <i class="iconfont" @click="onHide" :class="{'icon-icon_back':toLeft,'icon-icon_close':!toLeft,'onClose':!toLeft,'onPrev':toLeft}"></i>
        {{title}}
      </div>
			<div class="card-warp">
        <b-scroll ref="bscroll" :bounce="false" :scrollbar="true">
          <div class="card-list">
            <div class="group">
              <div class="cell" v-for="(item, index) in list.normal" :title="item.key" :key="index" @click="clickNormalItem(item)">
                <div class="left">
                  <s-logo v-if="item.iconType" :logo="item.iconType" class="bankLogo" slot="icon"></s-logo>
                  <div v-html="item.key"></div>
                </div>
                <div class="right">
                  <i v-if="item.value === selected" class="iconfont icon-list_radio"></i>
                </div>
              </div>
              <div class="cell gray2" v-if="permissionList" v-for="(item, index) in permissionList" :title="item.key" :key="index" @click="permission(item)">
                <div class="left">
                  <s-logo v-if="item.iconType" :logo="item.iconType" class="bankLogo" slot="icon"></s-logo>
                  <div v-html="item.key"></div>
                </div>
                <div class="right">
                  <span class="open">开通</span>
                  <i class="iconfont icon-list_icon_path-"></i>
                </div>
              </div>
              <div class="cell gray" v-if="list.disable" v-for="(item, index) in list.disable" :key="index">
                <div class="left">
                  <s-logo v-if="item.iconType" :logo="item.iconType" class="bankLogo" slot="icon"></s-logo>
                  <div class="twoline">
                    <div v-html="item.key"></div>
                    <div v-html="item.disableMsg ? item.disableMsg : disableCardListTitle"></div>
                  </div>
                </div>
                <div class="right">
                </div>
              </div>
            </div>
            <div class="group" v-if="addCard" :class="{'m20': (permissionList && permissionList.length > 0) || (list.normal && list.normal.length) > 0 || (list.disable && list.disable.length) > 0}">
              <div class="cell" @click="nextPanel">
                <div class="left" style="width: 100%;justify-content: space-between;">
                  <div>{{ addCardText }}</div>
                  <i class="iconfont icon-list_icon_path-"></i>
                </div>
              </div>
            </div>
            <slot></slot>
          </div>
        </b-scroll>
			</div>
		</div>
	</popup>
  <union :sequence="unionPayS" :mask="unionPayM" ref="unionPayRef"></union>
	</div>
</template>
<script>
import union from '@comp/unionPay'
import BScroll from '@comp/Bscroll'
import { __isEmptyObject } from '@js/helper'
import { getBankCardInfo } from '@common/libs/bankInfo.js'
import PopupMulti from "@comp/popupMultiAddCredit";
import { Popup, Group, TransferDom } from "vux";
import { mapState, mapGetters } from "vuex";
import props from "./utils/props";
let cb = null
export default {
  name: "selectCard",
  directives: {
    TransferDom
  },
  data() {
    return {
      className: "vux-select-card",
      useSlot: false,
      selected: null,
      pauseList: [],
      toLeft: false, //组件是否从右向左滑入
      toBottom: false, //在从右向左滑出模式下，支付组件隐藏时是否跟随支付组件从上向下滑出
      unionPayS: '',
      unionPayM: ''
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapGetters(["loginStatus"]),
    popupPayVisible(){
      return this.$store.state.popupPayVisible
    },
    creditList() {
      var returnList = []
      if (!__isEmptyObject(this.userInfo) && !__isEmptyObject(this.userInfo.creditCardList)) {
        let creditCardList = this.userInfo.creditCardList
        returnList = creditCardList.map(a => {
          let last4 = '(' + a.accountNo_mask.substr(-4, 4) + ')'
          let alias = a.accountAlias
            ? a.accountAlias + last4
            : '广发' + a.cardType.replace(/广发/, '') + last4
          return {
            key: alias,
            value: a.accountNo_sequence,
            iconType: 'CGB',
            data: a
          }
        })
        return returnList
      } else {
        return []
      }
    },
    debitList() {
      var returnList = []
      if (!__isEmptyObject(this.userInfo) && !__isEmptyObject(this.userInfo.debitCardList)) {
        let debitCardList = this.userInfo.debitCardList
        returnList = debitCardList.map(a => {
          let last4 = '(' + a.accountNo_mask.substr(-4, 4) + ')'
          let alias = a.accountAlias
            ? a.accountAlias + last4
            : '广发' + a.cardType.replace(/^\s*$/, '储蓄卡').replace(/广发/, '') + last4
          return {
            key: alias,
            value: a.accountNo_sequence,
            iconType: 'CGB',
            data: a
          }
        })
        return returnList
      } else {
        return []
      }
    },
    otherList() {
      var returnList = []
      if (!__isEmptyObject(this.userInfo) && !__isEmptyObject(this.userInfo.otherBankCardList)) {
        let otherBankCardList = this.userInfo.otherBankCardList
        returnList = otherBankCardList.map(a => {
          let bankInfo = getBankCardInfo(a)
          let last4 = '(' + a.accountNo_mask.substr(-4, 4) + ')'
          let alias = (bankInfo.alias || bankInfo.fullName) + last4
          return {
            key: alias,
            value: a.accountNo_sequence,
            iconType: bankInfo.LOGO,
            data: a
          }
        })
        return returnList
      } else {
        return []
      }
    },
    list() {
      if (__isEmptyObject(this.cardType)) {
          return {
              normal: this.cardList.normal ? this.cardList.normal : [],
              disable: this.cardList.disable ? this.cardList.disable : []
          };
          // return this.cardList;
      } else {
        let creditList = this.cardType.credit ? this.creditList : [];
        let debitList = this.cardType.debit ? this.debitList : [];
        let otherList = this.cardType.other ? this.otherList : [];
        let cardList = [].concat(creditList, debitList, otherList);
        if (!this.selected) {
          this.selected = this.userInfo.defaultAccountNo_sequence
            ? this.userInfo.defaultAccountNo_sequence
            : cardList.length !== 0 ? cardList[0].value : "";
        }
        let creditListDisable = !this.cardType.credit ? this.creditList : [];
        let debitListDisable = !this.cardType.debit ? this.debitList : [];
        let otherListDisable = !this.cardType.other ? this.otherList : [];
        let disableList = [].concat(creditListDisable, debitListDisable, otherListDisable)
        return {
          normal: cardList,
          disable: disableList
        };
      }
    }
  },
  watch: {
	popupPayVisible(val){
		if(val === false && this.toLeft){
			this.toLeft = false
			this.toBottom = true
			this.onHide()
		}
	},
    selected: {
      handler(e) {
        let result = !__isEmptyObject(this.list.normal) && this.list.normal.find(a => {
          return e === a.value;
        });
        result = result ? result : { key: "", value: "" };
        this.$emit("result", result);
      }
    },
    defaultCard: {
      handler(e) {
        if (e) {
          this.selected = e
        }
      },
      immediate: true
    }
  },
  props,
  created() {
    this.useSlot = this.$slots.default ? true : false;
  },
  methods: {
    permission (item) {
      if (this.$listeners.openCardHandler) {
        this.$emit("openCardHandler", item);
      }
      if (this.permissionOpen === '0') { //开通线上消费
        let params = {
          cardNo: item.cardNo_mask,
          cardNo_sequence: item.value,
          protocol: 0,
          add: 1
        }
        App.Native.pushWindow({
          url: "/base/cdbank_add_credit/addCardOtherBank.html",
          data: params
        })
      } else { //开通扫码付
        App.Native.confirm({
          title: "开通扫码付",
          message:
            "点击立即开通即已阅读并同意\n《广发银行发现精彩客户端扫码付款用户协议》",
          okButton: "立即开通",
          cancelButton: "取消"
        }).then(({ ok }) => {
          if (ok === true) {
            this.unionPayS = item.value
            this.unionPayM = item.cardNo_mask
            this.$refs.unionPayRef.go(item.value, item.cardNo_mask);
          }
        });
      }
    },
    clickNormalItem(item) {
      App.off('back', this.nativeBack)
      if (item.value != this.selected || this.alwaysRunResult === true) {
        this.$emit("clickNormalItem", item);
      }
      this.selected = item.value
      this.$emit("input", false);
    },
    onFirstShow() {
      this.$emit("on-first-show");
    },
    onHide() {
	    this.$refs.popup.popup.params.onClose = cb
      this.$set(this.$store.state, 'selectCardVisible', false)
      App.off('back', this.nativeBack)
      this.$emit("input", false);
      this.$emit("on-hide");
    },
    nextPanel() {
      if(this.autoDrump){
        App.Native.pushWindow({
          url: "/base/cdbank_add_credit/add.html",
          data: this.params
        });
      }
      if (this.$listeners.clickCardHandler) {
        this.$emit("clickCardHandler");
      }
    },
    popuphide(){
      if(this.popupPayVisible){
        return
      }else{
        this.onHide()
      }
    },
    onShow () {
      this.$nextTick(()=> {
        this.$refs.bscroll.refresh()
	  })
	  this.toBottom = false
      this.toLeft = this.popupPayVisible||false
      this.toLeft && this.$set(this.$store.state, 'selectCardVisible', true)
      this.$emit('on-show')
      cb = this.$refs.popup.popup.params.onClose
      this.$refs.popup.popup.params.onClose = this.popuphide
      if (this.nativeBackSwitch) {
        App.on('back', this.nativeBack)
      }
    },
    nativeBack (e) {
      e.preventDefault()
      this.$emit("input", false);
      this.$emit("on-hide");
      return false
    }
  },
  components: {
    Popup,
    Group,
    PopupMulti,
    BScroll,
    union
  }
};
</script>
<style lang="scss" scoped>
@import '~@common/scss/functions.scss';
.twoline{
  color: #222;
  >div:first-child{
    font-size: px2rem(32);
  }
  >div:last-child{
    font-size: px2rem(26);
  }
}
.card-list{
  background-color: #f6f6f6;
  padding-bottom: 1px;
}
.list-wrapper{
  position: relative !important;
  background-color: #f6f6f6;
}
.group{
  background-color: white;
}
.m20{
  margin: px2rem(24) 0px;
}
.vux-popup-dialog{
  min-height: 44%;
  max-height: 75%;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  &.toLeft{
      height: 9.6rem!important;
      max-height: initial;
      &.vux-popup-animate-bottom-enter, &.vux-popup-animate-bottom-leave-active {
        transform: translate3d(100%, 0, 0);
      }
      &.vux-popup-animate-bottom-enter-active,&.vux-popup-animate-bottom-leave-active {
        transition: transform 0.2s;
	  }
      .popup-select-header{
        .onClose{
          color: #5b5b5b;
        }
	  }
	  /deep/ .list-wrapper .scroll-content{
		  padding-top: 0;
	  }
  }
  &.toBottom{
	  height: 9.6rem!important;
      max-height: initial;
	  &.vux-popup-animate-bottom-enter-active,&.vux-popup-animate-bottom-leave-active {
	    transition: transform 0.3s;
	  }
  }
}
.selectWarp{
  display: flex;
  flex-flow: column;
  .card-warp{
    display: flex;
    flex-flow: column;
  }
}
.gray2{
  position: relative;
  padding-right: 0.2rem !important;
  .open{
    margin-right: px2rem(14);
    font-size: px2rem(32);
    color: #8f8f8f;
  }
  .left{
    color: #8f8f8f !important;
  }
}
.gray::after{
  content: "";
  background-color: rgba(255,255,255,0.6);
  width: 100%;
  height: calc(1.2rem - 2px);
  left: 0px;
  top: 1px;
  position: absolute;
}
.icon-list_icon_path-{
  color: #c8c9cc;
  font-size: px2rem(32);
}
.icon-list_radio{
  color: #d81e06;
  font-size: px2rem(40);
}
.bankLogo{
  font-size: px2rem(48);
  margin-right: px2rem(16);
}
.cell{
  line-height: initial;
  position: relative;
  height: px2rem(120);
  display: flex;
  margin-left: px2rem(30);
  padding-right: px2rem(30);
  align-items: center;
  justify-content: space-between;
  >.left{
    display: flex;
    align-items: center;
    font-size: px2rem(32);
    color: #222;
  }
  >.right{
    display: flex;
    align-items: center;
  }
}
.cell:first-child::before{
  border-top: none !important;
}
.cell::before{
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  top: 0px;
  border-top: 1px solid #e6e6e6;
  transform: scaleY(0.5);
}
.popup-select-header{
  max-height: px2rem(104);
  min-height: px2rem(104);
  line-height:px2rem(104);
  text-align:center;
  position:relative;
  font-size: px2rem(34);
  background:#f6f6f6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #222;
  font-weight: 500;
  .onClose{
    display:block;
    width:.86rem;
    height: px2rem(104);
    position:absolute;
    left:0;
    top:0;
    color: #999;
    padding: 0 0.28rem;
    box-sizing: border-box;
    font-weight: bold;
    font-size: px2rem(30);
  }
  .onPrev{
    display:block;
    width:.86rem;
    height: px2rem(104);
    position:absolute;
    left:0;
    top:0;
    color: #999;
    padding: 0 0.28rem;
    box-sizing: border-box;
    font-weight: bold;
    font-size: px2rem(35);
  }
}
</style>
