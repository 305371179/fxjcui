<!-- 
Y表示必填,N表示非必填
@desc 幻灯切换动效组件，支持前进、后退动画(用法同transition)
@props {isPrevMode: Boolean} N - 是否为后退模式。若为true，则动画从左向右滑入（后退），否则动画为从右向左滑入（前进）。默认为false
@props {disabled: Boolean} N - 是否禁用动画，默认为false
@note 子组件一定要设置唯一key值，否则动画不起效
@example
	<slide-transition :isPrevMode="isPrevMode">
		<div v-if="step==1" :key="step">
			第1页
		</div>
		<div v-else-if="step==2" :key="step">
			第2页
		</div>
		<div v-else-if="step==3" :key="step">
			第3页
		</div>
	</slide-transition>

	///////////
	watch:{
		step(v,ov){
			this.isPrevMode = v<ov
		}
	}
 -->
<template>
	<transition :name="transitionMode" v-bind="$attrs" v-on="$listeners">
		<slot></slot>
	</transition>
</template>
<script>
	export default {
		name: "slideTransition",
		abstract: true,
		data() {
			return {
				childrenClass: 'slideTransition'
			}
		},
		computed: {
			transitionMode() {
				return this.disabled ? "no-transition" : this.isPrevMode ? 'prev' : 'next';
			}
		},
		props: {
			isPrevMode: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		methods: {}
	};
</script>

<style lang="scss">
	.next-enter,
	.prev-leave-to {
		transform: translateX(100%);
	}
	.next-enter-to,
	.next-leave,
	.prev-enter-to,
	.prev-leave {
		transform: translateX(0%);
	}
	.next-leave-to,
	.prev-enter {
		transform: translateX(-100%);
	}
	.next-enter-active,
	.next-leave-active,
	.prev-enter-active,
	.prev-leave-active {
		transition: transform 0.2s;
	}
</style>