<template>
	<div class="floSlide">
		<div class="ad_slide_mask"></div>
		<div class="ad_slide_shadow" ref="shadow"></div>
		<div class="swiperOverflow">
			<div class="ad_mask"></div>
			<div class="swiper-container swiper-ad" ref="slide">
				<ul class="swiper-wrapper" ref="slideUl">
					<li class="swiper-slide" v-for="(item, index) in photoes" @click="clickHandle(item)" v-if="!!item.picsAdd" ref="slide${index}">
						<img src="../../../assets/loadImg/A1.png" :src="rootPath + item.picsAdd" class="picture" width="100%" :alt="item.picsName">
					</li>
				</ul>
				<div class="swiper-pagination" ref="pagination"></div>
			</div>
		</div>
	</div>
</template>
<script>
  import Swiper from '@common/libs/swiper'
  let slide = null
	export default {
		name: 'floSlide',
		data(){
			return {
				rootPath
			}
		},
		props:['photoes'],
		methods:{
			clickHandle(item){
				client.navigate(item);
			},
			swiper(){
        		slide = new Swiper(this.$refs.slide, {
            		loop : true,
					autoplay: {
					    delay: 3000,
                        disableOnInteraction: false
					},
					pagination: {
					    el: this.$refs.pagination
					},
					effect: 'coverflow',
					centeredSlides: true,
					slidesPerView: 3,
            		coverflowEffect: {
						rotate: 0,
						stretch: -32,
						depth: 150,
						modifier: 1,
						slideShadows: false
					},
					on: {
                        transitionEnd: () => {
                            this.$refs.shadow.innerHTML = slide ?
								slide.slides.eq(slide.activeIndex).html() :
								this.$refs.slideUl.childNodes[Math.ceil(this.$props.photoes.length / 2)].innerHTML
                        }
					}
				});
			}
		},
		mounted(){
		    this.swiper();
		},
		activated () {
			!!!slide && this.swiper();
		},
		deactivated () {
			slide = null;
		}
	}
</script>
<style lang="scss">
	@import '../../../common/libs/swiper';
	.floSlide{
		position:relative;
		padding-top:0.88rem;
	}
	.ad_slide_mask{
		position: absolute;
		top: 0;
		left:0;
		width: 100%;
		overflow: hidden;
		background: url(../../../assets/shadow.png);
		background-size:100% 100%;
		z-index: 9;
		height: 1.28rem;
	}
	.ad_slide_shadow{
		position: absolute;
		top: 0;
		left:0;
		width: 100%;
		overflow: hidden;
		img{
			width: 140%;
			margin-top:-5%;
			margin-left: -20%;
			-webkit-filter: blur(10px);
			filter: blur(10px);
		}
	}
	.swiperOverflow{
		overflow:hidden;
		width:100%;
		padding-bottom: .33rem;
		position: relative;
		.ad_mask{
			background: url(../../../assets/ad_mask.png) no-repeat;
			background-size:100% 100%;
			position:absolute;
			width: 100%;
			height: 2rem;
			bottom: 0;
		}
		.swiper-ad{
			width:270% !important;
			margin-left:-85%;
			overflow: visible;
			z-index: 98;
			padding: .08rem 0;
			.swiper-slide{
				box-shadow: 0px 0px 5px rgba(0,0,0,0.4);
				overflow: hidden;
				border-radius: 5px;
			}
			.swiper-pagination {
				bottom: -0.4rem !important;
				.swiper-pagination-bullet{
					background: #fff !important;
					opacity: .6 !important;
					border: 1px solid #e5e5e5;
					width: .14rem;
					height: .14rem;
					margin: 0 .04rem !important;
				}
				.swiper-pagination-bullet-active{
					background: #e5e5e5 !important;
				}
			}
		}
	}
</style>
