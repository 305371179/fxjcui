<template>
	<div class="headline flex-box">
		<div class="headline-icon"></div>
		<div class="headline-container" id="headline" ref="headline">
			<div class="swiper-wrapper">
				<p class="swiper-slide" v-for="(item, index) in photoes" @click="clickHandle(item)" v-if="!!item.modName">
					<span class="titleList">{{item.codeName}}</span>
					{{item.modName}}
				</p>
			</div>
		</div>
	</div>
</template>
<script>
    import Swiper from '@common/libs/swiper'
    export default {
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
		mounted(){
			var swiper = new Swiper(this.$refs.headline, {
				observer:true,
                loop: true,
		        autoplay: {
					delay: 3000,
                    disableOnInteraction: false
				},
		        direction: 'vertical'
		    });
		}
	}
</script>
<style lang="scss">
	@import '../../../common/libs/swiper';
	.headline {
		padding: .066667rem 0;
		background-color: #fff;
		font-size: .24rem;
		display: flex;
		align-items: center;
		.headline-icon{
			margin-right: .2rem;
			width: 1.5rem;
			height: 0.8rem;
			background: url(../../../assets/headline.jpg) no-repeat center;
			background-size: 80%;
		}
		.headline-container {
			overflow: hidden;
			width: 64%;
			height: .5rem;
			p {
				overflow: hidden;
				width: 100%;
				height: 100%;
				text-overflow: ellipsis;
				white-space: nowrap;
				.titleList{
					display: inline-block;
					border: 1px solid #E53935;
					color: #E53935;
					padding: 0.05rem 0.1rem;
					-webkit-transform-origin-x:0;
					-webkit-transform:scale(0.80);
				}
			}
		}
	}
</style>
