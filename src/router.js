import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [{
      path: '*',
      redirect: 'login'
    },
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        header: () => import('@/components/Fixheader')
      },
      children: []
    },
    {
      path: '/movieinfo/:movieId',
      name: 'Movieinfo',
      components: {
        default: () => import('@/components/pages/Movieinfo'),
        header: () => import('@/components/Fixheader')
      }
    },
    {
      path: '/favorites',
      name: 'Favorite',
      components: {
        default: () => import('@/components/pages/Favorites'),
        header: () => import('@/components/Fixheader')
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      components: {
        default: () => import('@/components/pages/Cart'),
        header: () => import('@/components/Fixheader')
      }
    },
    {
      path: '/check_out_payment/:orderId',
      name: 'CheckOutPayment',
      components: {
        default: () => import('@/components/pages/Checkoutpayment'),
        header: () => import('@/components/Fixheader')
      }

    },
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
      path: '/simulation',
      name: 'dashboard',
      component: Dashboard,
      children: [{
        path: 'customer_order',
        name: 'CustomerOrder',
        component: () => import('@/components/pages/CustomerOrders'),
      }, {
        path: 'customer_checkout/:orderId',
        name: 'CustomerCheckout',
        component: () => import('@/components/pages/CustomerCheckout'),
      }]
    }
  ]
})
