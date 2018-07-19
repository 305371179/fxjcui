<template>
	<div class="floor-swiper">
		<div class="warp wrapper swiper-container swiperFloor" ref="draggable">
			<ul class="swiper-wrapper">
				<li class="swiper-slide " v-for="(item, index) in photoes" @click="clickHandle(item)" v-if="!!item.picsAdd">
					<img src="../../../assets/loadImg/E1.png" :src="globalEnv.assestRootPath + item.picsAdd" class="picture" :alt="item.picsName">
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import Swiper from '@common/libs/swiper'
	export default {
		name: 'floSwiper',
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
		},
		mounted: function(){
			var swiper = new Swiper('.swiperFloor', {
				slidesPerView: 'auto',
				freeMode: true,
				preventClicks: false
		    });
		}
	}
</script>
<style lang="scss">
	@import '../../../common/libs/swiper';
	.floor-swiper {
		overflow: hidden;
		background: #ffffff;
		.swiper-slide {
			flex-shrink: 0 !important;
			width: 3rem ;
			img{
				width: 3rem;
			}
		}
	}
</style>

