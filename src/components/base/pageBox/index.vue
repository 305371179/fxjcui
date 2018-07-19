/**
 * Y表示必填,N表示非必填
 * @desc - 页面布局,最多分为三份，head,main,footer, head和footer可以指定高度,main部份自动适应减少head和footer的高度
 * @props { namespace: String } N 指定名命名空间, 默认读取当前的url的一部份来生成
 * @example <v-page namespace="xxx">
 *             <v-head></v-head>
 *             <div class="main"></div>
 *             <div></div>
 *          </v-page>
 *
 * ps 自适应的部份使用 main 作为class
 */



<template>
	<div class="router-view" :class="namespaceClass">
		<div :class="`drawer-view`">
			<slot></slot>
		</div>
	</div>
</template>
<script>
	import props from './utils/props'
	export default {
		name: 'vPage',
		data(){
			return {}
		},
		props,
		created(){
			if(this.namespace){
				this.namespaceClass = this.namespace
			}else{
				let [a, b, moduleName, pageName] = window.location.pathname.split('/')
				this.namespaceClass = moduleName.replace(/cdbank_/, '') + '_' + pageName.replace(/.html/, '')
			}
		}
	}
</script>
