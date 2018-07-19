/**
 * Y表示必填,N表示非必填
 * @desc - 全局贴底大按钮,
 * @props {disabled: Boolean} N- 按钮是否被禁用，如果禁用无法触发回调函数
 * @props {type: String} N- 按钮颜色，可选cm,cg 默认cm
 * @event {clickHandler: Function} N- 按钮点击后触发的回调函数
 * @example <global-big-button @clickHandler="">
 *				<slot>自定义文字</slot>
 *			</global-big-button>
 * ps 按钮做了防重复操作，每次点击之后隔两秒按钮才恢复可点击状态
 */

<template>
	<div class="globalBigButton-warp">
		<v-button @clickHandler="$emit('clickHandler')" :type="type" :disabled="disabled">
			<slot>确定</slot>
		</v-button>
	</div>
</template>
<script>
	import props from './utils/props'
	export default {
		name: 'globalBigButton',
		props,
    components:{
    }
	}
</script>
<style lang="scss">
	@import './scss/index.scss';
</style>
