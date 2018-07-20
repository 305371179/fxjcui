/**
 * Y表示必填,N表示非必填
 * @desc - 组合器，与cell,cell-input配合使用
 * @props {title: String} - N 标题
 * @props {top: Boolean} - N 开启上边距
 * @slot {name:title} - 也可使用slot自定义头部复杂的样式
 * @example <v-group title="标题" :top="true">
 *             <cell></cell>
 *             <cell-input></cell-input>
 *          </v-group>
 * ps 此组件非全局，使用前需要import
 */

<template>
	<div class="v-group" :style="top && 'margin-top:.24rem'">
		<div class="v-group-title">
			<span v-if="title" class="default-title">{{title}}</span>
			<slot name="title"></slot>
		</div>
		<div class="v-group-content">
			<slot></slot>
		</div>
	</div>
</template>
<script>
	import props from './utils/props'
	export default {
		name: 'v-group',
		props
	}
</script>
<style lang="scss">
	@import './scss/index.scss';
</style>
