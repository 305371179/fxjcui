/**
 * Y表示必填,N表示非必填
 * @desc - 列表_选择 cell
 * @props {icon: url} - N 图片地址
 * @props {isLink: Boolean} - N 是否显示右边箭头
 * @props {text: Object} - N 配置左边内容
 *   {
 *     'desc': ''        主标题描述
 *     'isBreak': 'false'   文字溢出换行,
 *     'descStyle': { color: '#222' }   自定义样式
 *   }
 * @props {title: Object} - N 配置左边内容
 *   {
 *     'desc': ''        主标题描述
 *     'subDesc': ''     副标题描述
 *     'align': 'left'   文字的对齐方式  可选 left center right,
 *     'descStyle': { color: '#222' }   自定义样式
 *     'subDescStyle': { color: '#222' }   自定义样式
 *   }
 * @props {value: Object} - N 配置右边内容
 *   {
 *     'desc': ''        主标题描述
 *     'subDesc': ''     副标题描述
 *     'align': 'left'   文字的对齐方式 可选 left center right
 *     'descStyle': { color: '#222' }   自定义样式
 *     'subDescStyle': { color: '#222' }   自定义样式
 *   }
 * @event {clickHandler} 如有需要可配点击的回调
 * @slot {name: cell-hd}  左则图标，当不满足时可使用slot
 * @slot {name: cell-bd}  左则标题，当不满足时可使用slot
 * @slot {name: cell-ft}  右侧标题，当不满足时可使用slot
 * @slot {name: cell-icon}  右则图标，当不满足时可使用slot
 * @example <cell></cell>
 * ps 此组件非全局，使用前需要import
 */

<template>
	<div class="v-cell" :class="link" @click="cellClick">
		<div class="v-cell-main">
			<div class="v-cell-hd">
				<i class="icon" v-if="icon"><img :src="icon"></i>
				<slot name="cell-hd"></slot>
			</div>

			<div class="v-cell-bd" :class="cellBd">
				<label :class="{'text':text.isBreak}" v-if="text.desc" :style="text.style" v-html="text.desc"></label>
				<label class="title-desc" v-if="title.desc" :style="title.descStyle" v-html="title.desc"></label>
				<p class="inlineDesc" v-if="title.subDesc" :style="title.subDescStyle" v-html="title.subDesc"></p>
				<slot name="cell-bd"></slot>
			</div>

			<div class="v-cell-ft" :class="cellFt">
				<label v-if="value.desc" :style="value.descStyle" v-html="value.desc"></label>
				<p class="inlineDesc" v-if="value.subDesc" :style="value.subDescStyle" v-html="value.subDesc"></p>
				<slot name="cell-ft"></slot>
			</div>

			<div class="v-cell-icon" :class="width" v-if="isLink">
				<i class="link-icon is-link"></i>
			</div>
			<slot name="cell-icon"></slot>
		</div>
	</div>
</template>
<script>
	import props from './utils/props'
	import utils from './utils'
	export default {
		name: 'cell',
		props,
		computed: {
			width(){
				return {
					w44: this.value
				}
			},
			cellBd(){
				if(this.text.desc.length){
					return {
						'flex-1': !this.text.isBreak
					}
				}
				return utils.property.call(this, 'title')
			},
			cellFt(){
				return utils.property.call(this, 'value')
			},
			link(){
				return {
					'v-cell-link': this.isLink
				}
			}
		},
		methods: {
			cellClick(){
				this.$emit('clickHandler')
			}
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss';
</style>
