<!-- 批量加挂 -->
<!-- @author 黄武韬-->
<template>
  <popup
  :value="isOpen"
  position="bottom"
  :hide-on-blur="true"
	:show-mask="true"
	:hide-on-deactivated="true"
  @on-show="popupShow"
  @on-hide="hide"
  >
    <div class="main">
      <div class="popup-select-header">
        <i class="iconfont icon-icon_close onClose" @click="hide"></i>
        确认添加卡片
      </div>
      <div class="body" :style="'transform: translateY(' + showKeyBoardHeight + 'px)'">
        <b-scroll ref="bscroll">
          <div class="group">
            <div class="cell" v-for="(item, index) in list" :key="index" @click="choice(index)">
              <div class="left">
                <s-logo logo="CGB" class="bankLogo"></s-logo>
                <div>{{item.key}}</div>
              </div>
              <div class="right">
                <i v-if="item.status" class="iconfont icon-list_radio"></i>
              </div>
            </div>
          </div>
          <msg-code class="msg" ref="msg" v-model="yzm" startNum="59" :hasRpc="false" @clickFetch="getMsg" @focusHandler="showNumberKeyBoard" @blurHandler="hideNumberKeyBoard"></msg-code>
        </b-scroll>
      </div>
      <div class="footer" ref="footer">
        <v-button class="button" :disabled="!setCanUse" @clickHandler="submit">确认添加</v-button>
      </div>
    </div>
  </popup>
</template>

<script>
import BScroll from '@comp/Bscroll'
import msgCode from '@comp/msgCode'
import vInput from '@comp/vInput'
import { Popup } from 'vux'
export default {
  data () {
    return {
      yzm: '', //验证码input v-model
      firmMobile: '',
      showKeyBoardHeight: 0
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array
    },
    nativeBackSwitch: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    selectedList () {
      return this.list.filter(a => {
        return a.status
      })
    },
    isOpen () {
      return this.value
    },
    /**
     * [MH0086 本行用户获取短信验证码]
     * @author 黄武韬
     * @param accountNo 明文卡号
     * @param strACC 卡号后4位
    */
    mp1049Params () {
      return {
        flag: 'C',
        accountNo: this.selectedList[0].value,
        strACC: this.selectedList[0].value.substr(-4, 4),
        busCode: '11',
        openChannel: 'MH',
        srcChannel: 'MH',
        rf: 'XML'
      }
    },
    /**
     * [MH0423 批量加挂]
     * @author 黄武韬
     * @param accountNo 明文卡号
     * @param strACC 卡号后4位
    */
    mp1218Params () {
      let accNoList = this.selectedList.map(a => {
        return {
          accountNo: a.value
        }
      })
      return {
        smsCode: this.yzm,
        accNoList: accNoList,
        busCode: '11',
        openChannel: 'MH',
        srcChannel: 'MH',
        rf: 'XML'
      }
    },
    setCanUse () {
      return this.selectedList.length !== 0 && this.yzm
    }
  },
  components: {
    Popup,
    vInput,
    msgCode,
    BScroll
  },
  methods: {
    choice (e) {
      this.list = this.list.filter( (a, b) => {
        if (b === e) {
          a.status = !a.status
        }
        return true
      })
    },
    getMsg (a, b) {
      a()
      if (this.selectedList.length === 0) {
        App.Native.toast({content: '请至少选择一张卡片'})
        b()
      } else {
        this.loadMp1409()
      }
    },
    showNumberKeyBoard () {
      console.log(this.$refs.msg)
      var el = this.$refs.msg.$el
      var parentHeight = el.offsetParent.clientHeight
      var top = el.offsetTop
      var height = el.clientHeight
      var footer = this.$refs.footer.clientHeight
      var bottom = parentHeight - top - height + footer
      var cha = bottom - 240 > 0 ? 0 : bottom - 240
      this.showKeyBoardHeight = cha
      // App.Native.showNumKeyboard()
    },
    hideNumberKeyBoard () {
      this.showKeyBoardHeight = 0
      // App.Native.hideNumKeyboard()
    },
    check () {
      if (this.selectedList.length === 0) {
        App.Native.toast({content: '请至少选择一张卡片'})
        return false
      }
      if (this.yzm.length !== 6) {
        App.Native.toast({content: '请输入正确的验证码'})
        return false
      }
      if (!this.yzm) {
        App.Native.toast({content: '请输入验证码'})
        return false
      }
      return true
    },
    submit () {
      if (!this.setCantUse) {
        if (this.check()) {
          this.loadMp1218()
        }
      }
    },
    popupShow () {
      if (this.nativeBackSwitch) {
        App.on('back', this.nativeBack)
      }
      this.$nextTick(()=> {
        this.$refs.bscroll.refresh()
      })
      this.$emit('input', true)
    },
    hide () {
      App.off('back', this.nativeBack)
      this.$emit('input', false)
    },
    /** @function MH0179_unlogin [获取核心手机号,使用卡号查询核心手机号] */
    /** @author 黄武韬 */
    loadMp1409 () {
      App.Native.rpc({
        operationType: 'com.ifp.MP1409',
        data: {
          cardNo: this.selectedList[0].value 
        },
        processError: false
      }).then((data)=>{
        this.firmMobile = data.body.firmMobile.substr(-4, 4)
        this.loadMp1049()
      },(header) => {
        App.Native.toast({content: header.header.errorMsg})
      })
    },
    /** @function MH0423 [批量加挂] */
    /** @author 黄武韬 */
    loadMp1218 () {
      App.Native.rpc({
        operationType: 'com.ifp.MP1218',
        data: this.mp1218Params,
        processError: false
      }).then((data)=>{
        this.isOpen = false //关闭当前弹窗
        let listString = JSON.stringify(data.body.addResultList)
        App.Native.pushWindow({
          url: '/base/cdbank_add_credit/resultMulti.html',
          data: {
            list: listString
          }
        })
        this.$emit('result', {  //返回成功状态
          result: true
        })
      },(header) => {
        App.Native.toast({content: header.header.errorMsg})
      })
    },
    /** @function MH0086 [本行用户获取短信验证码] */
    /** @author 黄武韬 */
    loadMp1049 () {
      App.Native.rpc({
        operationType: 'com.ifp.MP1049',
        data: this.mp1049Params,
        processError: false
      }).then((data)=>{
        if (data.body.optionFlag !== '0') {
          App.Native.toast({content: '请稍后重试'})
        } else {
          App.Native.toast({content: '已向尾号为' + this.firmMobile + '的手机号发送验证码'})
        }
      },(header) => {
        App.Native.toast({content: header.header.errorMsg})
      })
    },
    nativeBack (e) {
      e.preventDefault()
      this.$emit('input', false)
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@common/scss/functions.scss';
  .list-wrapper{
    background-color: #f6f6f6;
  }
  .main{
    height: px2rem(490, 1);
    background-color: #f6f6f6 !important;
    display: flex;
    flex-flow: column;
    transition: 0.2 all;
    transform: translateY(0px);
    >.popup-select-header{
      flex: 0 1 auto;
      position: relative;
      z-index: 2;
    }
    >.body{
      flex: 1 0 1px;
      position: relative;transition: 0.2 all;
    transform: translateY(0px);
    position: relative;
    z-index: 1;
    }
    >.footer{
      flex: 0 1 auto;
      padding: px2rem(16, 1) 0px;
    }
  }
  .showKeyBoardHeight{
    transform: translateY(-180px) !important;
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
  font-weight: bold;
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
.icon-list_icon_path-{
  color: #c8c9cc;
  font-size: px2rem(26);
}
.icon-list_radio{
  color: #d81e06;
  font-size: px2rem(44);
}
.bankLogo{
  font-size: px2rem(48);
  margin-right: px2rem(16);
}
.cell{
  height: px2rem(104);
  display: flex;
  margin-left: px2rem(30);
  padding-right: px2rem(30);
  align-items: center;
  justify-content: space-between;
  line-height: initial;
  position: relative;
  >.left{
    display: flex;
    align-items: center;
    font-size: px2rem(34);
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
.group{
  background-color: white;
}
.msg{
  margin-top: px2rem(10, 1);
}
</style>

