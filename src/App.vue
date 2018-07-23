<template>
  <div id="app">
    <router-link :to="{name:'exampleList'}" v-show="show" >
      <v-button style="margin-top:0.3rem;margin-bottom: 0.3rem;">返回列表</v-button>
    </router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data:function(){
    return {
      show:false
    }
  },
  watch: {
    $route (to, from) {
      if(this.$route.name==='exampleList'){
        this.show=false
      }else{
        this.show=true
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*color: #2c3e50;*/
}
</style>
