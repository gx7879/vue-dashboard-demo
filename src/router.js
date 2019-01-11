import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '*',
      redirect: 'login'
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home,
    //   meta: { requireAuth: true }
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/pages/Login')
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: Dashboard,
      children: [{
          path: 'products',
          name: 'Product',
          component: () => import('@/components/pages/Products'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: 'orders',
          name: 'Order',
          component: () => import('@/components/pages/Orders'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: 'coupons',
          name: 'Coupon',
          component: () => import('@/components/pages/Coupons'),
          meta: {
            requireAuth: true
          },
        }
      ]
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      children: [{
        path: 'customer_order',
        name: 'CustomerOrder',
        component: () => import('@/components/pages/CustomerOrders'),
      }]
    }
  ]
})
