<template>
	<div class="cgbFooter">
		<ul class="footerContent">
			<li :class="{active: isActive == 'home'}" @click="handler('home')">
				<p></p>
				<span>首页</span>
			</li>
			<li :class="{active: isActive == 'fance'}" @click="handler('fance')">
				<p></p>
				<span>分期</span>
			</li>
			<li>
				<p></p>
			</li>
			<li :class="{active: isActive == 'wonderful'}" @click="handler('wonderful')">
				<p></p>
				<span>精彩</span>
			</li>
			<li :class="{active: isActive == 'site'}" @click="handler('site')">
				<p></p>
				<span>我的</span>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: "vFooter",
		data(){
			return {
				isActive: 'home'
			}
		},
		methods: {
			handler(page){
				if(this.isActive != page){
					this.isActive = page;
					this.$emit('changePage', page);
				}
			}
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss'
</style>
