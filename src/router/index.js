import Vue from 'vue'
import VueRouter from 'vue-router'
import Docs from '../views/Docs.vue'
import Pics from '../views/Pics.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'docs',
    component: Docs
  },
  {
    path: '/docs',
    name: 'docs',
    component: Docs
  },
  {
    path: '/pics',
    name: 'pics',
    component: Pics
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: 'manage',
  routes
})

export default router
