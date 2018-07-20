/**
 * Y表示必填,N表示非必填
 * @desc - 开关 v-inline-switch
 * @props {value: Boolean} - N 当前的状态
 * @props {disabled: Boolean} - N 是否禁用
 * @event {clickHandler: function} -N 点击的时候触发回调
 * ps 此组件非全局，使用前需要import
 */

<template>
	<div class="v-inline-witch" :class="switchClass" @click="$emit('clickHandler')"></div>
</template>
<script>

	import props from './utils/props'
	export default {
		name: 'v-inline-switch',
		props,
		computed: {
			switchClass(){
				return {
					'flag-true': this.value,
					'flag-false': !this.value
				}
			}
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss';
</style>
