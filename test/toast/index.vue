<template>
  <div class="vux-toast">
    <div class="weui-mask_transparent" v-show="isShowMask && show"></div>
    <transition :name="currentTransition">
      <div class="weui-toast" :style="toastStyle" :class="toastClass" v-show="show">
        <i class="weui-icon-success-no-circle weui-icon_toast" style="height:0.8rem;height: 0.8rem;margin-top: 0.4rem;margin-bottom: 0.24rem;" v-show="type !== 'text'"></i>
        <p class="weui-toast__content" style="height:0.88rem;line-height: 0.88rem;" v-if="text&&type === 'text'" :style="style" v-html="text"></p>
        <p class="weui-toast__content"  v-else-if="text" :style="style" v-html="text"></p>
        <p class="weui-toast__content" v-else :style="style">
          <slot></slot>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import SafariFixIssue from '../../src/fxjcui/vux/mixins/safari-fix'

export default {
  name: 'toast',
  mixins: [SafariFixIssue],
  props: {
    value: Boolean,
    time: {
      type: Number,
      default: 2000
    },
    type: {
      type: String,
      default: 'success'
    },
    transition: String,
    width: {
      type: String,
      default: '7.6em'
    },
    isShowMask: {
      type: Boolean,
      default: false
    },
    text: String,
    position: String
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    if (this.value) {
      this.show = true
    }
  },
  computed: {
    toastStyle(){
      let style ={
        width:'auto',
        minWidth:'2.3rem',
        maxWidth:'92vw',
        boxSizing: 'border-box'
      }
      if(this.type === 'text'){

      }else{
        style.height='2.3rem'
      }
      return style
    },
    currentTransition () {
      if (this.transition) {
        return this.transition
      }
      if (this.position === 'top') {
        return 'vux-slide-from-top'
      }
      if (this.position === 'bottom') {
        return 'vux-slide-from-bottom'
      }
      return 'vux-fade'
    },
    toastClass () {
      return {
        'weui-toast_forbidden': this.type === 'warn',
        'weui-toast_cancel': this.type === 'cancel',
        'weui-toast_success': this.type === 'success',
        'weui-toast_text': this.type === 'text',
        'vux-toast-top': this.position === 'top',
        'vux-toast-bottom': this.position === 'bottom',
        'vux-toast-middle': this.position === 'middle'
      }
    },
    style () {
      if (this.type === 'text' && this.width === 'auto') {
        return { padding: '10px' }
      }
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.$emit('input', true)
        this.$emit('on-show')
        this.fixSafariOverflowScrolling('auto')

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.show = false
          this.$emit('input', false)
          this.$emit('on-hide')
          this.fixSafariOverflowScrolling('touch')
        }, this.time)
      }
    },
    value (val) {
      this.show = val
    }
  }
}
</script>

<style lang="less">
@import '../../src/fxjcui/vux/styles/transition.less';
@import '../../src/fxjcui/vux/styles/weui/widget/weui_tips/weui_mask';
@import '../../src/fxjcui/vux/styles/weui/icon/weui_icon_font';
@import '../../src/fxjcui/vux/styles/weui/widget/weui_tips/weui_toast';
.weui-icon_toast.weui-icon-success-no-circle:before {
  color: #FFFFFF;
  font-size: 0.8rem;
}
.weui-toast{
  padding: 0 0.4rem;
  background-color: rgba(0,0,0,0.7);
  overflow: hidden;
}
.weui-toast.vux-toast-top {
  top: @toast-position-top-offset;
}
.weui-toast.vux-toast-bottom {
  top: auto;
  bottom: @toast-position-bottom-offset;
  transform: translateX(-50%);
}
.weui-toast.vux-toast-middle {
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.vux-slide-from-top-enter, .vux-slide-from-top-leave-active {
  opacity: 0;
  transform: translateX(-50%) translateY(-100%)!important;
}
.vux-slide-from-bottom-enter, .vux-slide-from-bottom-leave-active {
  opacity: 0;
  transform: translateX(-50%) translateY(100%)!important;
}
.vux-slide-from-top-enter-active,
.vux-slide-from-top-leave-active,
.vux-slide-from-bottom-enter-active,
.vux-slide-from-bottom-leave-active {
  transition: all 400ms cubic-bezier(.36,.66,.04,1);
}
.weui-toast {
  transform: translateX(-50%);
  margin-left: 0!important;
}
.weui-toast.weui-toast_forbidden {
  color: #F76260;
}
.weui-toast.weui-toast_forbidden .weui-toast__content {
  margin-top: 10px;
}
.weui-toast.weui-toast_text{
  min-height: 0;
}
.weui-toast_text .weui-toast__content {
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 0.08rem;
}
.weui-toast__content {
  font-size: 0.32rem;
  margin:0 0;
  margin-bottom: 0.4rem;
  white-space:nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}
.weui-loading_toast .weui-toast__content {
  margin-top: 0;
}
.weui-toast_success .weui-icon_toast:before {
  content: "\EA07";
}
.weui-toast_cancel .weui-icon_toast:before {
  content: "\EA0D";
}
.weui-toast_forbidden .weui-icon_toast.weui-icon-success-no-circle:before {
  content: "\EA0B";
  color: #F76260;
}
</style>
