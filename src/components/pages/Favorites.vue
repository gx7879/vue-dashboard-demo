<template>
  <div>
    <div class="container text-white mt-110 overflow-hidden">
      <h1 class="mt-5">收藏清單</h1>
      <div class="row my-4">
        <div class="col-md-3 mb-4" v-for="(item) in favoriteData" :key="item.id">
          <div class="card border-0 box-shadow text-center h-100">
            <img class="card-img-top" :src="item.imageUrl" alt="Card image cap">
            <div class="card-body bg-dark">
              <div class="d-flex">
                <h4 class="card-title text-light text-left">{{ item.title }}</h4>
                <div class="heart ml-auto" @click="addAttention(item.id)">
                  <i
                    class="fa-heart fa-lg text-white"
                    :class="{ 'fas': item.attention, 'far': !item.attention, 'text-danger': item.attention }"
                  ></i>
                </div>
              </div>
              <p class="card-text text-left">{{ item.content }}</p>
            </div>
            <div class="card-footer bg-dark d-flex border-white">
              <a
                href="#"
                class="btn btn-outline-light btn-sm text-white"
                @click.prevent="movieInfo(item.id)"
              >查看內容</a>
              <button
                class="btn btn-outline-light btn-sm ml-auto text-white"
                @click="addtoCart(item.id)"
              >
                <i class="fa fa-cart-plus" aria-hidden="true"></i> 加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data (){
    return {
      movieId: 0,
      movieIndex: 0
    }
  },
  methods: {
    addtoCart (itemId, qty = 1) {
      this.$store.dispatch('addtoCart', { itemId, qty })
    },
    movieInfo (id) {
      this.$router.push(`/movieinfo/${id}`)
    },
    addAttention (movieId) {
      const vm = this
      let movieIndex = 0
      vm.movieId = movieId
      vm.movieIndex = this.$store.state.productsModules.products.findIndex(
        function (item) {
          return item.id === vm.movieId
        }
      )
      let boolean = false
      const currentItem = this.$store.state.productsModules.products[vm.movieIndex]
      if (currentItem.attention) {
        boolean = false
        movieIndex = vm.movieIndex
        this.$store.dispatch('addAttention', { movieId, movieIndex, boolean })
      } else {
        boolean = true
        movieIndex = vm.movieIndex
        this.$store.dispatch('addAttention', { movieId, movieIndex, boolean })
      }
      console.log(movieId,movieIndex,boolean)
    },
    ...mapActions('productsModules', ['getProducts'])
  },
  computed: {
    favoriteData () {
      return this.$store.state.attentionData
    },
    ...mapGetters('productsModules', ['products', 'categories'])
  },
  created () {
    this.getProducts()
  }
}
</script>
