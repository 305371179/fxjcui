<template>
	<ul class="wrapper floRightchar">
		<li class="cols" style="width:50%" v-for="(item, index) in photoes" @click="clickHandle(item)">
			<img :src="globalEnv.assestRootPath + item.picsAdd" width="100%" :alt="item.picsName">
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'floRightchar',
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
	.floRightchar{
		position: relative;
		.cols{
			width: 50%;
			&:last-child{
				position:absolute;
				right:0px;
				top: 0px;
			}
		}
	}
</style>
