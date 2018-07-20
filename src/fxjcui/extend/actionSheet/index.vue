/**
 * Y表示必填,N表示非必填
 * @desc - 列表选择器,基本使用请参数vux的 popup,
 * @props {cardList:Object} Y- 要展示的对象
 *  数据格式类型
 *  {
 *		normal: [ {key, value, selected, iconType} ],   normal 表示正常使用的卡片
 *		pause: [ {key, value, iconType} ],              pause 表示需要开通的卡片
 *		disable: [ {key, value, iconType} ]             disable 表示不能使用的卡片
 *  }
 *	#key:String Y- 列表中需要展示的文字
 *	#value:String Y- 列表中对应的值
 *	#selected:Boolean N- 是否选中
 *	#iconType:String N- 银行logo, 例如CGB,ABC,ICBC
 * @props {addCard: Boolean} N- 是否在组件中显示添加卡片的按钮
 * @event clickNormalItem N - 点击正常卡的时候触发的回调函数
 * @event clickPauseItem  N - 点击需要开通的卡的时候触发的回调函数
 * @event clickCardHandler  N - 点击添加卡片时的回调，不传时默认跳到添加卡片
 * @slot - 如果组件使用了slot的话将不会渲染disable数据，slot的内容会替换disable的内容位置
 * @example <select-card :cardList="data"></select-card>
 * ps 银行卡的logo图标样式在sass目录中的bank.scss,全局引用,例如 icon-bank-CGB
 */

<template>
	<div v-transfer-dom :class="className">
	<popup
	:value="value"
	:hide-on-blur="hideOnBlur"
	:position="position"
	:show-mask="showMask"
	:popup-style="popupStyle"
	:hide-on-deactivated="hideOnDeactivated"
	@on-first-show="onFirstShow"
	@on-show="onShow"
	@on-hide="onHide"
	>
		<div class="selectWarp">
			<div class="header" v-if="title">{{title}}</div>
			<div class="card-warp">
				<b-scroll ref="bscroll">
					<div class="card-list">
						<div class="item" :class="{'choiced': selected === item.value}" v-for="(item, index) in cardList.normal" :value="item.value" :key="index" @click="clickNormalItem(item)">
							<div>
								<span>{{item.key}}</span>
								<i v-if="selected === item.value" class="iconfont icon-list_radio"></i>
							</div>
						</div>
					</div>
					<div class="cancel" @click="nextPanel">取消</div>
					<slot></slot>
				</b-scroll>
			</div>
		</div>
	</popup>
	</div>
</template>
<script>
  import Popup from '../../vux/popup'
  import TransferDom from '../../vux/transfer-dom'
	import utils from './utils'
	import BScroll from '../../extend/Bscroll'
	import props from './utils/props'

	export default {
		name: 'selectCard',
		directives: {
			TransferDom
		},
		data (){
			return {
				className: 'vux-select-card',
				selected: null,
				useSlot: false
			}
		},
		props,
		created(){
      this.useSlot = this.$slots.default ? true : false
		},
		methods: {
			selectCard (e) {
				this.selected = e
			},
			clickNormalItem(item){
				if(item.value != this.selected){
					this.$emit('clickNormalItem', item)
				}
				this.selected = item.value
				this.$emit('input', false)
			},
			clickPauseItem(item){
				this.$emit('clickPauseItem', item)
				this.$emit('input', false)
			},
			onFirstShow(){
				if(!this.selected){
					this.selected = utils.getSelected(this.cardList.normal)
				}
				this.$emit('on-first-show')
			},
			onHide(){
				this.$emit('input', false)
				this.$emit('on-hide')
			},
			onShow(){
				this.$emit('on-show')
				this.$nextTick(()=> {
					this.$refs.bscroll.refresh()
				})
			},
			nextPanel(){
				this.$emit('input', false)
				if(this.$listeners.clickCardHandler){
					this.$emit('clickCardHandler')
				}
			}
		},
		components: {
			Popup,
			BScroll
		}
	}
</script>
<style lang="scss" scoped>
  @import "../../common/scss/index.scss";

  @mixin base {
    height: px2rem(104);
		line-height: px2rem(104);
		text-align: center;
		font-size: px2rem(32);
		background-color: white;
	}
	.vux-popup-dialog{
		max-height: 75%;
		overflow: hidden;
		display: flex;
		flex-flow: column;
	}
	.header{
		@include base;
		color: #8f8f8f;
		min-height: px2rem(104);
	}
	.item{
		@include base;
		color: #222;
		position: relative;
	}
	.item:first-child::before{
		border-top: none !important;
	}
	.item::before{
		content: "";
		position: absolute;
		width: 100%;
		height: 1px;
		top: 0px;
		left: 0px;
		border-top: 1px solid #e6e6e6;
		transform: scaleY(0.5);
	}
	.choiced {
		color: #e53935;
	}
	.cancel{
		@include base;
		margin-top: px2rem(16);
		color: #222;
	}
	.icon-list_radio{
		position: absolute;
		right: px2rem(30);
		color: #d81e06;
  	font-size: px2rem(40);
	}
	.selectWarp{
  display: flex;
  flex-flow: column;
  .card-warp{
    display: flex;
    flex-flow: column;
  }
}
.list-wrapper{
  position: relative !important;
  background-color: #e6e6e6;
}
</style>
