import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Goods from '@/components/page/Goods'
import Shop from '@/components/page/Shop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    }
  ]
})
