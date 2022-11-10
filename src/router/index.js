import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Cabinet from '@/pages/Cabinet'
import Admin from '@/pages/Admin'
import About from '@/pages/About'
import Policy from '@/pages/Policy'
import NotFound from '@/pages/NotFound'
Vue.use(Router)


let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { 
        guest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { 
        guest: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { 
        guest: true
      }
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: Cabinet,
      meta: { 
        // requiresAuth: true
      }
    },
    {
      path: '/policy',
      name: 'policy',
      component: Policy,
      meta: { 
        guest: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { 
        requiresAuth: true,
        is_admin : true
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