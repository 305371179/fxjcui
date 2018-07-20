/**
 * Y表示必填,N表示非必填
 * @desc - v-tab-item
 * @props {item: Array} - N 要展示的选项，格式{title:标题,message:是否显示消息提示}
 * @props {selected: String | Number} - N 当前选中的索引, 默认0
 * @props {shadow: Boolean } - N 是否开始阴影, 默认开始 true
 * @event {clickHandler(k,v): Fucntion} 点击选项时的回调函数，参数是选项的索引和值
 * @example <v-tab-item ...prop></v-tab-item>
 * ps 此组件非全局，使用前需要import
 */

<template>
	<div class="v-tab-item" :class="{shadow:shadow}">
		<div class="tab-container" :class="tabClassName" ref="nav">
			<div class="tab-item" :class="{'tab-item-active': k===active,'tab-item-message': v.message}" v-for="(v, k) in item" :key="k" @click="onclick(k,v)"><span>{{v.title}}</span></div>
		</div>
	</div>
</template>
<script>
	import props from './utils/props'
	export default {
		name:'tab-item',
		props,
		data(){
			return {
				active: this.selected
			}
		},
    watch:{
		  selected(){
		    this.active= this.selected
      }
    },
		mounted(){
			if(this.tabClassName.scrollable){
				this.navScrollLeft()
			}
		},
		methods: {
			navScrollLeft(){
				const {clientWidth, childNodes} = this.$refs.nav
				const {offsetLeft, offsetWidth} = childNodes[this.selected]
				this.$refs.nav.scrollLeft = offsetLeft - clientWidth + offsetWidth
			},
			onclick(k, v){
			  // console.log(k,this.active,this.selected)
				if(k != this.active){
					this.active = k
					this.$emit('clickHandler', k, v)
				}
			}
		},
		computed: {
			tabClassName(){
				return {
					'scrollable': this.item.length > 5,
					'unscrollable': this.item.length <= 5,
					'tab-cos-2': this.item.length == 2

				}
			}
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss';
</style>
