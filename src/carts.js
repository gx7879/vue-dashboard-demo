import router from './router'
import axios from 'axios'
export default {
  namespaced: true,
  state: {
    cart: {
      carts: {}
    },
    status: {
      loadingItem: ''
    }
  },
  mutations: {
    CART (state, payload) {
      state.cart = payload
    },
    LOADINGITEM (state, payload) {
      state.status.loadingItem = payload
    }
  },
  actions: {
    getCart (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`
      context.commit('LOADING', true, { root: true })
      return new Promise((resolve, reject) => {
        axios.get(api).then(response => {
          console.log(response.data)
          if (response.data.data.carts) {
            context.commit('CART', response.data.data)
          }
          resolve(response)
          context.commit('LOADING', false, { root: true })
        })
      })
    },
    removeCart (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart/${id}`
      context.commit('LOADING', true, { root: true })
      return new Promise((resolve, reject) => {
        axios.delete(url).then(response => {
          context.dispatch('getCart').then((res) => {
            resolve(res)
          })
          console.log('刪除購物車項目', response)
          context.commit('LOADING', false, { root: true })
        })
      })
    },
    addtoCart (context, {
      itemId,
      qty
    }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`
      context.commit('LOADINGITEM', itemId)
      const cartItem = {
        product_id: itemId,
        qty
      }
      axios.post(api, {
        data: cartItem
      }).then(response => {
        console.log(response.data)
        context.dispatch('getCart')
        context.commit('LOADINGITEM', '')
      })
    }
  },
  getters: {
    status (state) {
      return state.status
    }
  }
}
