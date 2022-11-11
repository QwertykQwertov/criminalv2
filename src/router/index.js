import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: () => import ('@/pages/NotFound')
    },
    {
      path: '/',
      component: () => import ('@/pages/Home')
    },
    {
      path: '/login',
      component: () => import ('@/pages/Login'),
      meta: { 
        guest: true
      }
    },
    {
      path: '/register',
      component: () => import ('@/pages/Register'),
      meta: { 
        guest: true
      }
    },
    {
      path: '/cabinet',
      component: () => import ('@/pages/Cabinet'),
      meta: { 
        // requiresAuth: true
      }
    },
    {
      path: '/policy',
      component: () => import ('@/pages/Policy'),
      meta: { 
        guest: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if(to.matched.some(record => record.meta.is_admin)) {
        if(user.is_admin == 1){
          next()
        }
        else{
          next({ name: 'userboard'})
        }
      }else {
        next()
      }
    }
  } else if(to.matched.some(record => record.meta.guest)) {
    if(localStorage.getItem('jwt') == null){
      next()
    }
    else{
      next({ name: 'userboard'})
    }
  }else {
    next() 
  }
})
export default router;