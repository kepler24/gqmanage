import Vue from 'vue'
import VueRouter from 'vue-router'
import Docs from '../views/Docs.vue'
import Pics from '../views/Pics.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: 'docs',
          name: 'docs',
          component: Docs
        },
        {
          path: 'pics',
          name: 'pics',
          component: Pics
        },
      ]
    },
 
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: 'manage',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = sessionStorage.getItem('token');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router
