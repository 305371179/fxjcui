// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/main'
import mixins from '@/common/js/mixins'
import Entry from './index.vue'

App.vm = new Vue({
  mixins,
//   autoTrack: false,//此属性为表示自动埋点的开关，默认打开，可以不写该属性
  components: { Entry }
})