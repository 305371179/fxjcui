/**
 * Y表示必填,N表示非必填
 * @desc - 通用按钮,
 * @props {disabled: Boolean} N- 按钮是否被禁用，如果禁用无法触发回调函数
 * @props {type: String} N- 按钮颜色，可选cm,cg,co 默认cm
 * @props {size: String} N- 按钮尺寸，可选S,M,L 默认L
 * @props {plain:Boolean} N- cm,cg按钮有两种样式，通过该值切换
 * @slot  N- 默认为“确定”，可通过slot自定义
 * @event {clickHandler: Function} N- 按钮点击后触发的回调函数
 * @example <v-button :disabled="false" plain="false" @clickHandler="">
 *				<slot>自定义文字</slot>
 *			</v-button>
 * ps 按钮做了防重复操作，每次点击之后隔两秒按钮才恢复可点击状态
 */

<template>
  <div class="button-container flexx">
    <!--<button class="v-button" :class="classes" :style="buttonStyle" @click.stop="onClick">-->
		<!--<span>-->
			<!--<slot>确定</slot>-->
		<!--</span>-->
    <!--</button>-->
    <div class="text-container">
      <div class="type1" v-if="slotType==='type1'">
        <slot name="type1"></slot>
      </div>
      <div class="type2" v-else-if="slotType==='type2'">
        <slot name="type2"></slot>
      </div>
      <div class="type3" v-else-if="slotType==='type3'">
        <slot name="type3"></slot>
      </div>
      <div class="type4 flexx" v-else-if="slotType==='type4'">
        <slot name="type4"></slot>
      </div>
    </div>

    <!--<slot name="total">合计:22元</slot>-->
    <v-button :type="type" :disabled="disabled" :plain="plain"  :buttonStyle="buttonStyle" :style="style" @clickHandler="onClick">{{buttonText}}</v-button>
  </div>

</template>
<script>
	import props from './utils/props'
	export default {
		data(){
			return {
				clicked: true
			}
		},
		props,
		methods: {
			onClick(){
				if(this.disabled || !this.clicked) return;
				this.clicked = false
				this.$emit('clickHandler')
				setTimeout(() => {
					this.clicked = true
				}, 300)
			}
		},
		computed: {
		  style(){
		    return {
		      borderRadius:0,
          width:'2.24rem',
          height:'1rem'
        }
      }
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss';
</style>
