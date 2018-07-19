<template>
	<ul class="wrapper">
		<li class="cols" v-for="(item, index) in photoes" @click="clickHandle(item)" v-if="!!item.picsAdd">
			<img class="picture" :alt="item.picsName" width="100%" :src="globalEnv.assestRootPath + item.picsAdd">
		</li>
	</ul>
</template>
<script>
	export default {
		name:'floRepeat',
		data(){
			return {
				globalEnv
			}
		},
		props: {
            photoes: Array,
			preventDefault: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			clickHandle(item){
				this.preventDefault ? this.$emit('clickHandle', item) : client.navigate(item);
			}
		}
	}
</script>
<style lang="scss">
	.wrapper{
		list-style: none;
		display: flex;
		align-items: center;
		li{
			font-size: 0;
			display: inline-block;
			flex: 0 1 auto;
			img{
				width: 100%;
			}
		}
	}
</style>
