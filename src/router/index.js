import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/demo/index'
import { routesCreator } from "../demo/js/routerTools";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo',
      redirect:'/button',
      component: Demo,
      children:routesCreator()
    }
  ]
})
