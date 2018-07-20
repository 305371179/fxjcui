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
	<button class="v-button" :class="classes" :style="buttonStyle" @click.stop="onClick">
		<span>
			<slot>确定</slot>
		</span>
	</button>
</template>
<script>
	import props from './utils/props'
	export default {
		name: 'vButton',
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
			classes(){
				let toUC = str => this[str].toUpperCase()
				return {
					'v-button-l': toUC('size') == 'L',
					'v-button-m': toUC('size') == 'M',
					'v-button-s': toUC('size') == 'S',

					'v-button-cm': toUC('type') == 'CM' && !this.disabled && !this.plain,
					'v-button-cm-disable': toUC('type') == 'CM' && this.disabled && !this.plain,
					'v-button-cm-plain': toUC('type') == 'CM' && !this.disabled && this.plain,
					'v-button-cm-plain-disable': toUC('type') == 'CM' && this.plain && this.disabled,

					'v-button-cg': toUC('type') == 'CG' && !this.disabled && !this.plain,
					'v-button-cg-disable': toUC('type') == 'CG' && this.disabled && !this.plain,
					'v-button-cg-plain': toUC('type') == 'CG' && !this.disabled && this.plain,
					'v-button-cg-plain-disable': toUC('type') == 'CG' && this.plain && this.disabled,

					'v-button-co': toUC('type') == 'CO' && !this.disabled,
					'v-button-co-disable': toUC('type') == 'CO' && this.disabled
				}
			}
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss';
</style>
