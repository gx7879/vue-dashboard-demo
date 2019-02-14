import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import productsModules from './products'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    cart: {
      carts: {}
    },
    attentionArr: [],
    attentionData: [],
    status: {
      loadingItem: ""
    },
    search_video: ''
  },
  mutations: {
    // payload
    LOADING(state, status) {
      state.isLoading = status;
    },
    CART(state, payload) {
      state.cart = payload
    },
    ATTENTION(state, payload) {
      state.productsModules.products[payload.movieIndex].attention = payload.boolean;
    },
    ATTENTIONARR(state, payload) {
      if (payload.isNew) {
        state.attentionArr = payload.attentionItem
      } else {
        if (state.attentionArr.indexOf(payload.movieId) > -1) {
          console.log(state.attentionArr)
          let movieIdIdx = state.attentionArr.findIndex(function (item) {
            return item == payload.movieId
          })
          console.log(movieIdIdx)
          state.attentionArr.splice(movieIdIdx, 1)
          localStorage.setItem('attention', JSON.stringify(state.attentionArr))
        } else {
          state.attentionArr.push(payload.movieId)
          localStorage.setItem('attention', JSON.stringify(state.attentionArr))
        }
      }
    },
    ATTENTIONDATA(state, payload) {
      state.attentionData = payload
    },
    LOADINGITEM(state, payload) {
      state.status.loadingItem = payload
    },
    UPDATEVALUE(state, payload) {
      state.search_video = payload
    }
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status)
    },
    getCart(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;
      context.commit('LOADING', true)
      axios.get(api).then(response => {
        console.log(response.data);
        if (response.data.data.carts) {
          context.commit('CART', response.data.data);
        }
        context.commit('LOADING', false)
      });
    },
    removeCart(context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart/${id}`;
      context.commit('LOADING', true)
      axios.delete(url).then(response => {
        context.dispatch('getCart')
        console.log("刪除購物車項目", response);
        context.commit('LOADING', false)
      });
    },
    addtoCart(context, {
      itemId,
      qty
    }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;
      context.commit('LOADINGITEM', itemId)
      const cartItem = {
        product_id: itemId,
        qty
      };
      axios.post(api, {
        data: cartItem
      }).then(response => {
        console.log(response.data);
        context.dispatch('getCart')
        context.commit('LOADINGITEM', '')
      });
    },
    addAttention(context, {
      movieId,
      movieIndex,
      boolean
    }) {
      context.commit('ATTENTIONARR', {
        movieId,
        isNew: false
      })
      context.commit('ATTENTION', {
        movieIndex,
        boolean
      })
    },
    attentionData(context, itemData) {
      let attentionData = itemData.filter(function (item) {
        return context.state.attentionArr.indexOf(item.id) > -1
      })
      context.commit('ATTENTIONDATA', attentionData)
    }
  },
  getters: {

  },
  modules: {
    productsModules
  }
})
