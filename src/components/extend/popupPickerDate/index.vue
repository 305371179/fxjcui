/**
 * Y表示必填,N表示非必填
 * @desc - 日期选择器
 * @props {allTime: Boolean} - N 是否显示全部
 * @props {value: Boolean} - Y true 为选中，使用v-model方式绑定
 * @props {popupTitle: String} - N 组件的标题
 * @props {fixedColumns: Number} -N 指定显示多少列，隐藏多余的
 * @props {columns: Number} -N 指定联动模式下的列数，当不指定时表示非联动
 * @props {times: Number|string} -Y 年为单位
 * @event {on-show: Function} -N 显示时触发的回调
 * @event {on-hide: Function} -N 隐藏时触发的回调
 * @event {on-change(['2018','12']): Function} -N 点击确定时触发的回调
 * @event {on-shadow-change(['2018','12']): Function} -N 滑动时触发的回调
 * @example <popup-picker-date v-model="yourValue" :times="yourTimes"></popup-picker-date>
 * ps 此组件非全局，使用前需要import, 当选择全部月份的时候,回调函数的返回值是 ['all','all']
 */

<template>
	<div class="popup-picker-date" v-transfer-dom>
		<popup-picker
			:popup-title="popupTitle"
			:show.sync="show"
			:columns="columns"
			:fixed-columns="fixedColumns"
			:data="timeData"
			@on-show="$emit('on-show')"
			@on-hide="$emit('on-hide')"
			@on-change="onChange"
			@on-shadow-change="onShadowChange"
		></popup-picker>
	</div>
</template>
<script>
	import { PopupPicker, TransferDom } from 'vux'
	import props from './utils/props'
	import makeData from './utils'
	export default {
		name: 'popup-picker-date',
		directives: { TransferDom },
		data(){
			return {
				show: false,
				timeData: []
			}
		},
		props,
		methods: {
			onChange(value){
				this.$emit('on-change', value)
			},
			onShadowChange(value, key){
				this.show && this.$emit('on-shadow-change', value, key)
			}
		},
		components: {
			PopupPicker
		},
		watch: {
			value(val){
				this.show = val
			},
			show(val){
				this.$emit('input', val)
			},
			times(t){
				this.timeData = makeData(t, this.allTime)
			}
		},
		created(){
			this.timeData = makeData(this.times, this.allTime)
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss'
</style>
