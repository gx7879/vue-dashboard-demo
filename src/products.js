import axios from 'axios'
export default {
  namespaced: true,
  state: {
    products: [],
    categories: []
  },
  actions: {
    getProducts (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/products/all`
      context.commit('LOADING', true, {
        root: true
      })
      axios.get(api).then(response => {
        if (localStorage.getItem('attention')) {
          const attentionItem = JSON.parse(localStorage.getItem('attention'))
          context.commit('ATTENTIONARR', {
            attentionItem,
            isNew: true
          }, {
            root: true
          })
          response.data.products.forEach(function (item) {
            if (attentionItem.indexOf(item.id) > -1) {
              item.attention = true
            } else {
              item.attention = false
            }
          })
        } else {
          response.data.products.forEach(function (item) {
            item.attention = false
          })
        }
        context.commit('PRODUCTS', response.data.products)
        context.commit('CATEGORIES', response.data.products)
        context.dispatch('attentionData', response.data.products, {
          root: true
        })
        context.commit('LOADING', false, {
          root: true
        })
      })
    }
  },
  mutations: {
    PRODUCTS (state, payload) {
      state.products = payload
    },
    CATEGORIES (state, payload) {
      const categories = new Set()
      payload.forEach(item => {
        categories.add(item.category)
      })
      // vm.categories = Array.from(categories);
      state.categories = [...categories]
    }
  },
  getters: {
    products (state) {
      return state.products
    },
    categories (state) {
      return state.categories
    }
  }
}
