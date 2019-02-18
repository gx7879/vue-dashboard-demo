import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import VeeValidate from 'vee-validate'
import zhTWValidate from 'vee-validate/dist/locale/zh_TW'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import 'bootstrap'

import App from './App.vue'
import router from './router'
import store from './store'
import './bus'
import currencyFilter from './filters/currency'
import dateFilter from './filters/date'
import beautysub from './filters/beautysub'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(VeeValidate)
Vue.use(VueAwesomeSwiper /* { default global options } */)
VeeValidate.Validator.localize('zh_TW', zhTWValidate)
Vue.component('Loading', Loading)
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)
Vue.filter('beautySub', beautysub)
axios.defaults.withCredentials = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => { // 換頁前檢查驗證
  console.log('to', to, 'from', from, 'next', next)
  if (to.meta.requireAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      console.log(response.data)
      if (response.data.success) { // 已登陸前往下一頁
        // vm.$router.push('/');
        next()
      } else { // 未登錄返回登錄頁面
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
