<template>
	<ul class="wrapper floLeftchar">
		<li class="cols" style="width:50%" v-for="(item, index) in photoes" @click="clickHandle(item)">
			<img :src="globalEnv.assestRootPath + item.picsAdd" width="100%" :alt="item.picsName">
		</li>
	</ul>
</template>
<script>
	export default {
		name:'floLeftchar',
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
		methods:{
			clickHandle(item){
				this.preventDefault ? this.$emit('clickHandle', item) : client.navigate(item);
			}
		}
	}
</script>
<style lang="scss">
	.floLeftchar{
		position: relative;
		.cols{
			width: 50%;
			&:nth-child(2){
				position:absolute;
				right:0px;
				top: 0px;
			}
			&:nth-child(3){
				position:absolute;
				right:0px;
				bottom: 0px;
			}
		}
	}
</style>
