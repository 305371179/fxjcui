/**
 * Y表示必填,N表示非必填
 * @desc - 数字键盘
 * @props {value: Boolean} - Y true 为选中，使用v-model方式绑定
 * @props {len: Number} - N 整型的长度
 * @props {limit: Number} - N 保留多少位小数
 * @props {word: String} - Y 键盘点击的时候传回的完整的值，和双向绑定效果一样
 * @props {type: String} -N 可选择值有 init, float, code 三种，表示整型键盘与否,验证码键盘
 * @props {popupStyle: Object} - N 有时一些比较特殊的情况下需要改变popup的样式
 *   {
 *     'background': '#FFF'
 *   }
 * @props {tips: Object || false} - N 如有键盘上面的提示则传入对象，否则传入false
 *    {
 *      min: '1,000',
 *      max: '50,000',
 *      init: '1000'
 *    }
 * @example <number-keyboard v-model="yourValue" :word.sync="yourWord" :tips="false"></number-keyboard>
 * ps 此组件非全局，使用前需要import
 */

<template>
	<div v-transfer-dom :class="className">
	<popup
		:value="value"
		:width="width"
		:show-mask="showMask"
		:popup-style="popupStyle"
		:hide-on-blur="hideOnBlur"
		:is-transparent="isTransparent"
		@on-show="onShow"
		@on-hide="onHide"
	>
		<div class="custom-number-keyboard-tips" v-if="tips">
			<p>最低￥{{tips.min}}，最高￥{{tips.max}}</p>
			<p>需输入 {{tips.init}} 的整数倍数值</p>
		</div>
		<slot v-if="content"></slot>
		<div class="custom-number-keyboard">
			<div class="custom-number-keyboard-bar" v-if="!content">
				<!--<x-icon type="ios-arrow-down" size="30" @click="$emit('input', false)"></x-icon>-->
        <svg @click="$emit('input', false)" type="ios-arrow-down" size="30" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512" class="vux-x-icon vux-x-icon-ios-arrow-down"><path d="M396.6 160l19.4 20.7L256 352 96 180.7l19.3-20.7L256 310.5z"></path></svg>
			</div>
			<div class="custom-number-keyboard-content" @touchstart.stop.prevent="clickh">
				<div class="keyboard-content-warp">
					<div>1</div>
					<div>4</div>
					<div>7</div>
					<div class="empty"><i class="empty" v-if="mType">.</i></div>
				</div>
				<div class="keyboard-content-warp">
					<div>2</div>
					<div>5</div>
					<div>8</div>
					<div>0</div>
				</div>
				<div class="keyboard-content-warp">
					<div>3</div>
					<div>6</div>
					<div>9</div>
					<div class="delete">
						<i class="del"></i>
					</div>
				</div>
			</div>
		</div>
	</popup>
	</div>
</template>
<script>
  import Popup from '../../../../../fxjc_ui/src/components/vux/popup'
  import TransferDom from '../../../../../fxjc_ui/src/components/vux/transfer-dom'
	import props from './utils/props'
	export default {
		name: 'number-keyboard',
		data(){
			return {
				className: 'number-keyboard',
				key: ''
			}
		},
		directives: {
			TransferDom
		},
		props,
		components: {
			Popup
		},
		computed: {
			mType(){
				return this.type === 'float'
			}
		},
		methods: {
			clickh(e){
				this.$emit('on-enter')
				let { className, innerText } = e.target

				if(className === 'delete' || className === 'del'){
					if(this.key.length >= 0){
						this.key = this.key.slice(0, this.key.length - 1)
						return this.$emit('update:word', this.key)
					}
				}

				if(!this.mType){ //整型键盘

					if(className === 'empty') return

					let reg =  this.type === 'code' ?
					new RegExp("^\\d{0,"+ this.len +"}$"):
					new RegExp("^[1-9]\\d{0,"+(this.len - 1)+"}$")

					let tempRes = this.key + innerText

					if(reg.test(tempRes)){
						this.key = tempRes
						console.log(this.key)
						this.$emit('update:word', this.key)
					}

				}else{ //非整型键盘

					if(this.key.length <= 0){
						this.key = className === 'empty' ? '0.' : innerText
						console.log(this.key)
						return this.$emit('update:word', this.key)
					}else{

						if(className === 'empty'){
							if(this.key.indexOf('.') == -1){
								this.key = this.key + '.'
								return this.$emit('update:word', this.key)
							}else{
								return
							}
						}
					}

					let res = new RegExp("^(0{1}|[1-9]\\d{0,"+(this.len - 1)+"})\\.\\d{1,"+ this.limit +"}$|^[1-9]{1}\\d{1,"+ (this.len - 1) +"}$")
					let tempRes = this.key + innerText
					if(res.test(tempRes)){
						this.key = tempRes
						console.log(this.key)
						this.$emit('update:word', this.key)
					}
				}
			},
			onShow(){
				this.key = String(this.$attrs.word)
				this.$emit('on-show')
			},
			onHide(){
				this.key = ''
				this.$emit('input', false)
				this.$emit('on-hide')
			}
		},
		watch:{
			value(val){
				if(!this.showMask) return
				let mask = document.getElementsByClassName('vux-popup-mask')[0]
				if(val){
					mask.style.backgroundColor = 'transparent'
				}else{
					setTimeout(() => {
						mask.style.backgroundColor = ''
					}, 400)
				}
			}
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss'
</style>
