/**
 * Y表示必填,N表示非必填
 * @desc - 列表_选择 address
 * @props {value: Array} - N 上次选中的省市区
 * @props {showAddress: Boolean} - N 是否显示选择器
 * @event {@on-hide(Boolean)）} 隐藏时的回调，确定是参数是true，反之
 * @event {@on-shadow-change(ids:Array,names:Array)）} 每次改变的回调，参数是省市区代码和名字
 * ps 此组件非全局，使用前需要import
 */

<template>
	<div class="v-address">
	<x-address 
		style="display:none;" 
		title="title"
		:value="value"
		:list="addressData" 
		placeholder="请选择地址" 
		:show.sync="showAddress"
		@on-hide="onHide"
		@on-shadow-change="onShadowChange"
	></x-address>
	</div>
</template>
<script>
	import { XAddress } from 'vux' 
	import props from './utils/props'
	export default {
		name: 'v-address',
		data(){
			return {
				addressData:Object.freeze([])
			}
		},
		props,
		components: {
			XAddress
		},
		created(){
			AlipayJSBridge.call('cityList', {}, opt => {
				this.addressData = Object.freeze(opt.list)
			})
		},
		methods: {
			onHide(g){
				this.$emit('on-hide', g)
			},
			onShadowChange(ids, names){
				this.$emit('on-shadow-change',ids, names)
			}
		},
		watch: {
			showAddress(value){
				this.$emit('update:showAddress', value)
			}
		}
	}
</script>
