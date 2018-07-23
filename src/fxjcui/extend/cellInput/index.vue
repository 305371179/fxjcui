/**
 * Y表示必填,N表示非必填
 * @desc - 列表_输入 cell-input
 * @props {iconType: String} - N 右边显示的icon，内置3种 arrow,tips,camera
 * @props {label: String} - N 左边标题文字
 * @props {focus: boolean} - N 设置焦点出现光标,  readonly = true 时有效
 * @props {readonly: boolean} - N 是否只读，false时不会出现模拟光标
 * @props {align: String} - N 输入框文字的对齐方式，可选left center right
 * @props {placeholder: String} - N 输入框默认文字
 * @event {on-focus} -N 文件框获取焦点事件
 * @event {on-blur} -N 文件框获取失去焦点事件
 * @event {clickHandler} 如有需要可配input点击的回调,只对readonly = true 的输入框有效
 * @event {clickIconHandler} 如有需要可配iocn点击的回调
 * @example <cell-input></cell-input>
 * ps 此组件非全局，使用前需要import
 */


<template>
	<cell :is-link="iconType === 'arrow'" class="v-cell-input" :class="iconType">
		<div class="v-cell-input-bd" slot="cell-bd">
			<div class="label"><label>{{label}}</label></div>
			<div class="inputs" :class="inputFocuscClass">
				<span v-if="focus && readonly"><i>{{value}}</i></span>

				<input
					:readonly="readonly"
					:style="styles"
					:value="value"
					:placeholder="placeholder"
					@click.stop="cellInputClick"
					@input="oninput"
					@focus="$emit('on-focus')"
					@blur="$emit('on-blur')"
					:maxlength="maxlength"
				>
			</div>
		</div>
		<div v-if="showIcon" slot="cell-icon" class="custom-icon" @click="$emit('clickIconHandler')">
			<i :class="icon" :style="iconStyle"></i>
		</div>
	</cell>
</template>
<script>
	import props from './utils/props'
	import cell from '../cell'
	export default {
		name: 'cell-input',
		props,
		methods: {
			clickHandler(e){
				this.$emit('clickHandler')
			},
			cellInputClick(){
				if(this.readonly){
					this.$emit('clickHandler')
				}
			},
			oninput({target}){
				this.$emit('input', target.value)
			}
		},
		computed: {
			styles(){
				return {
					'text-align': this.align
				}
			},
			icon(){
				return {
					'iconfont': true,
					'svg-explain_linear': this.iconType === 'tips',
					'svg-camera': this.iconType === 'camera'
				}
			},
			iconStyle(){
			  let style = {}
			  if(this.iconType === 'tips'){
			    let tips = require('../../common/svg/explain_linear.svg')
			    style={
            background: `url(${tips}) no-repeat center`,
            backgroundSize: '100%'
          }
        }else if(this.iconType === 'camera'){
          let tips = require('../../common/svg/camera.svg')
          style={
            background: `url(${tips}) no-repeat center`,
            backgroundSize: '100%'
        }
        }
				return style
			},
			showIcon(){
					if(this.iconType === 'tips' || this.iconType === 'camera') return true
			},
			inputFocuscClass(){
				if(this.align === 'left'){
					return {
						'focus-left': true
					}
				}

				if(this.align === 'right'){
					return {
						'focus-right': true
					}
				}
				return Object.create(null)
			}
		},
		components: {
			cell
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss';
</style>
