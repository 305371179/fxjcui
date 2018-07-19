<template>
    <div class="ui-carousel-item swiper-slide">
        <slot></slot>
        <img v-if="src" :src="src">
    </div>
</template>

<script>
export default {
    name: 'vCarouselItem',
    props: {
        src: String //图片路径，如果存在，则会自动添加<img>标签
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    .ui-carousel-item{
        img{
            width:100%;
            height:100%;
        }
    }
</style>