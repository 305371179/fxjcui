/**
 * Y表示必填,N表示非必填
 * @desc - 页面底部并排按钮,
 * @props {disabled: Boolean} N- 按钮是否被禁用，如果禁用无法触发回调函数
 * @props {btnText: Object} N- 按钮文字配置
 *   {
 *      text1: '我要报名'
 *      text2: '我要办卡'
 *   }
 * @event {clickHandler: Function} N- 按钮点击后触发的回调函数,回调参数0,1区分
 * @example <global-button-multiple @clickHandler="" :disabled="disabled" :btnText="btnText"></global-button-multiple>
 * ps 按钮做了防重复操作，每次点击之后隔两秒按钮才恢复可点击状态
 */


<template>
	<div class="globalButtonMultiple-warp" :class="classes">
		<v-button @clickHandler="$emit('clickHandler',0)" :disabled="disabled">
			<slot>{{btnText.text1}}</slot>
		</v-button>
		<v-button @clickHandler="$emit('clickHandler',2)" :disabled="disabled">
			<slot>{{btnText.text2}}</slot>
		</v-button>
	</div>
</template>
<script>
	import props from './utils/props'
	export default {
		name: 'globalButtonMultiple',
		props,
    components:{
    },
		computed: {
			classes(){
				return {'globalButtonMultiple-disable': this.disabled}
			}
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss';
</style>
