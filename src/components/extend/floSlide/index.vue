<template>
    <!-- Slider main container -->
    <div class="swiper-container" ref="slide" v-if="photoes.length">
        <!-- Additional required wrapper -->
        <ul class="swiper-wrapper">
            <!-- Slides -->
            <li class="swiper-slide" v-for="(item, index) in photoes" @click="clickHandle(item)"  v-if="!!item.picsAdd">
                <img src="../../../assets/loadImg/A1.png" :src="globalEnv.assestRootPath + item.picsAdd" class="picture" width="100%" :alt="item.picsName">
            </li>
        </ul>
        <!-- If we need pagination -->
        <div class="swiper-pagination" ref="pagination"></div>
    </div>
</template>
<script>
    import Swiper from '@common/libs/swiper'
    let slides = null;
    export default {
        name: 'slide',
        data () {
            return {
                globalEnv
            }
        },
        props: {
            photoes: Array,
            autoplay:Boolean,
			preventDefault: {
				type: Boolean,
				default: false
            },
            loop: {
                type: Boolean,
                default: Array && Array.length > 1 ? true : false //当只有一张图片时，设置默认循环为false，因为为true时点击图片无法跳转
            }
		},
		methods:{
			clickHandle(item){
				this.preventDefault ? this.$emit('clickHandle', item) : client.navigate(item);
			}
		},
        mounted () {
            console.log(this.$props.autoplay)
            // 基于swiper的轮播图的vue封装
            slides = new Swiper(this.$refs.slide, {
                loop: this.loop,
                autoplay: {
                    delay: this.$props.autoplay || '3000'
                },
                pagination: {
                    el: this.$refs.pagination
                }
            });
        },
        destroyed () {
            slides = null;
        }
    }
</script>
<style>
    @import '../../../common/libs/swiper.scss';
</style>
