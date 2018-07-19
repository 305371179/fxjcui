<template>
  <div class="main-layout">
    <router-view></router-view>
  </div>
</template>
<script>
  import base from '../components/base/index'
  import Vue from 'vue'
  Vue.use(base)
  export default {
    name: 'Demo',
    data() {
      return {}
    },
    methods: {
      click() {
        console.log('点击触发')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' src="./scss/index.scss"></style>
