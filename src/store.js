import Vue from 'vue'
import Vuex from 'vuex'
import productsModules from './products'
import cartsModules from './carts'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    attentionArr: [],
    attentionData: [],
    search_video: ''
  },
  mutations: {
    // payload
    LOADING (state, status) {
      state.isLoading = status
    },
    ATTENTION (state, payload) {
      state.productsModules.products[payload.movieIndex].attention = payload.boolean
    },
    ATTENTIONARR (state, payload) {
      let products = state.productsModules.products
      if (payload.isNew) {
        state.attentionArr = payload.attentionItem
      } else {
        if (state.attentionArr.indexOf(payload.movieId) > -1) {
          let movieIdIdx = state.attentionArr.findIndex(function (item) {
            return item === payload.movieId
          })
          state.attentionArr.splice(movieIdIdx, 1)
          localStorage.setItem('attention', JSON.stringify(state.attentionArr))
        } else {
          state.attentionArr.push(payload.movieId)
          localStorage.setItem('attention', JSON.stringify(state.attentionArr))
        }
        state.attentionData = products.filter(function (item) {
          return state.attentionArr.indexOf(item.id) > -1
        })
      }
    },
    ATTENTIONDATA (state, payload) {
      state.attentionData = payload
    },
    UPDATEVALUE (state, payload) {
      state.search_video = payload
    }
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    addAttention (context, { movieId, movieIndex, boolean }) {
      context.commit('ATTENTIONARR', { movieId, isNew: false })
      context.commit('ATTENTION', { movieIndex, boolean })
    },
    attentionData (context, itemData) {
      let attentionData = itemData.filter(function (item) {
        return context.state.attentionArr.indexOf(item.id) > -1
      })
      context.commit('ATTENTIONDATA', attentionData)
    }
  },
  getters: {

  },
  modules: {
    productsModules,
    cartsModules
  }
})
