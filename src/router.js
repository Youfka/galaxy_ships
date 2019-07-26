import Vue from 'vue'
import Router from 'vue-router'
import Ships from './views/Ships.vue'
import Detail from './views/Detail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Ships',
      component: Ships
    },
    {
      path: '/ships/:id',
      name: 'ship_detail',
      props: true,
      component: Detail
    }
  ]
})
