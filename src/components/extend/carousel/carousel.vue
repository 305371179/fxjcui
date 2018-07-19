<template>
    <div ref="container" class="ui-carousel-container">
        <div class="ui-carousel-wrapper swiper-wrapper">
            <slot></slot>
        </div>
        <div v-if="pagination" class="ui-carousel-pagination swiper-pagination"></div>
    </div>
</template>
<script>
import Swiper from '@common/libs/swiper'
import { rem2Px } from '@js/utils'
export default {
    name: 'vCarousel',
    props: {
        loop: { //是否循环播报
            type: Boolean,
            default: true
        },
        pagination: Boolean, //是否显示分页器
        initialSlide: { //初始化时的索引
            type: Number,
            default: 0
        },
        delay: { //自动轮播的间距时长，ms，0代表不自动播报
            type: Number,
            default: 3000
        },
        slidesPerView: { //视图内显示的幻灯片数量，可为小数
            type: Number,
            default: 1
        },
        centeredSlides: Boolean, //活动的幻灯片是否居中，slidesPerView不为1时有效
        spaceBetween: { //幻灯片间隔，rem
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            activeIndex: this.initialSlide //当前活动元素下标
        }
    },
    methods: {
        //切换到指定幻灯片
        slideTo(index) {
            this.$swiper && this.$swiper[this.loop ? 'slideToLoop' : 'slideTo'](index);
        },
        //重新计算幻灯片数量
        update() {
            this.$nextTick(() => {
                this.$swiper && this.$swiper.updateSlides();
            });
        }
    },
    mounted() {
        //初始化Swiper实例
        this.$swiper = new Swiper(this.$refs.container, {
            slideActiveClass: 'ui-carousel-item-active swiper-slide-active', //活动幻灯片的样式
            initialSlide: this.initialSlide, //初始化下标
            loop: this.loop, //是否循环
            autoplay: this.delay > 0 ? { //定时切换
                delay: this.delay
            } : false,
            pagination: this.pagination ? { //分页器
                el: '.swiper-pagination',
            } : '',
            slidesPerView: this.slidesPerView, //视图内显示的幻灯片数量
            centeredSlides: this.centeredSlides, //活动的幻灯片是否居中
            spaceBetween: this.spaceBetween ? rem2Px(this.spaceBetween) : 0, //幻灯片间距
            on: {
                click: (e) => { //点击幻灯片触发
                    if (this.loop) {
                        const clickedSlide = this.$swiper.clickedSlide; //点击的幻灯片
                        if (clickedSlide) {
                            const index = clickedSlide.dataset.swiperSlideIndex; //点击的下标
                            this.$emit('click', index, e);
                        }
                    } else {
                        const index = this.$swiper.clickedIndex;
                        if (typeof index == 'number') {
                            this.$emit('click', index, e);
                        }
                    }
                },
                slideChange: () => { //切换幻灯片触发
                    if (this.$swiper && this.activeIndex != this.$swiper.realIndex) {
                        this.activeIndex = this.$swiper.realIndex;
                        this.$emit('slideChange', this.activeIndex);
                    }
                }
            }
        });
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
@import "../../../common/libs/swiper.scss";
.ui-carousel-container {
    position: relative;
    .swiper-pagination {
        bottom: 0.1rem;
        .swiper-pagination-bullet {
            background-color: #fff;
            opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
            opacity: 1;
        }
    }
}
</style>
