/**
 * Y表示必填,N表示非必填
 * @desc - checkbox
 * @props {value: Boolean} - Y true 为选中，使用v-model方式绑定
 * @props {vertical: string} - N top,middle,bottom 可选择，默认top,check图标与右边文字对齐方式
 * @slot 跟在checkbox后面的内容
 * @example <checkbox :value.sync="yourValue"><span>使用须知</span></checkbox>
 * ps 此组件非全局，使用前需要import
 */

<template>
	<div class="custom-checkbox" :class="checkboxClass" @click="updateValue">
		<div class="custom-checkbox-icon" v-show="!value"></div>
		<div class="custom-checkbox-icon checker" v-show="value"></div>
		<div class="custom-checkbox-txt"><slot></slot></div>
	</div>
</template>
<script>
	import props from './utils/props'
	export default {
		name: 'checkbox',
		data(){
			return {}
		},
		props,
		computed: {
			style(){
				return {
					'checker': this.value
				}
			}
		},
		methods: {
			updateValue(){
				this.$emit('input', !this.value)
			}
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss'
</style>