/**
 * Y表示必填,N表示非必填
 * @desc - 鼓励一下弹窗 encourage
 * @props {value: Boolean} - N 显示弹窗
 * @props {dialog-style: Object} - N 弹窗自定义样式
 * @event {clickHandler} 点击选项时的回调函数，参数是选项的索引
 * @example <encourage v-model="" @clickHandler></encourage>
 * ps 此组件非全局，使用前需要import
 */

<template>
	<x-dialog v-transfer-dom
		:show.sync="value"
		:dialog-style="dialogStyle"
	>
		<div class="encourage-warp">
			<div class="encourage-content">
				<i class="top-img"></i>
				<h3>
					<slot>我们的颜老板很辛苦，给他点个赞吧！！！！！！</slot>
				</h3>
				<ul>
					<li @click="ock(0)"><i class="love"></i><span>鼓励一下</span></li>
					<li @click="ock(1)">不够满意,提意见</li>
					<li @click="ock(2)">冷漠的无视</li>
				</ul>
			</div>
		</div>
	</x-dialog>
</template>
<script>
	import { XDialog, TransferDom } from 'vux'
	import props from './utils/props'
	export default {
		name:'encourage',
		props,
		directives: {
			TransferDom
		},
		components: {
			XDialog
		},
		methods:{
			ock(i){
				this.$emit('clickHandler', i)
				this.$emit('input', false)
			}
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss'
</style>