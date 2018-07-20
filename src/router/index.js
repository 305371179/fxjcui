import Vue from 'vue'
import Router from 'vue-router'
import Demo from '../demo/index'
import ExampleList from '../ExampleList'
import { routes } from "../demo/js/routerTools";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo',
      redirect: '/exampleList',
      component: Demo,
      children: routes
    },
    {
      path: '/exampleList',
      name: 'exampleList',
      component: ExampleList
    },
  ]
})
