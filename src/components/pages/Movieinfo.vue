<template>
  <div>
    <div class="container mt-110 overflow-hidden text-white">
      <div class="row my-4">
        <div class="col-md-5 d-flex">
          <img class="ml-auto" :src="movie.imageUrl" alt>
        </div>
        <div class="col-md-5">
          <h1 class="display-4">{{ movie.title }}</h1>
          <ul class="list-inline mb-2 mb-sm-0" v-if="movie.price">
            <li
              class="list-inline-item h4 font-weight-light mb-0 text-danger"
            >{{ movie.price | currency }}</li>
            <li class="list-inline-item font-weight-light">
              <del>{{ movie.origin_price | currency }}</del>
            </li>
          </ul>
          <div class="my-3">
            類型 :
            <span class="d-inline-block border px-2 py-1">{{ movie.category }}</span>
          </div>
          <div class="mb-3">{{ movie.description }}</div>
          <div class="btn-group">
            <button class="btn btn-outline-light" @click="addtoCart(movie.id)">
              <i class="fa fa-shopping-cart"></i>
              加入購物車
            </button>
            <button class="btn btn-outline-light" @click="addAttention">
              <i
                class="far fa-heart"
                :class="{ 'fas': isAttention, 'far': !isAttention, 'text-danger': isAttention }"
              ></i>
              加入關注
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      movieId: "",
      movie: {},
      movieIndex: 0
    };
  },
  methods: {
    getMovieInfo() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/product/${this.movieId}`;
      const vm = this;
      vm.$store.dispatch("updateLoading", true);
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.movie = response.data.product;
        vm.$store.dispatch("updateLoading", false);
      });
    },
    addtoCart(itemId, qty = 1) {
      this.$store.dispatch("addtoCart", { itemId, qty });
    },
    addAttention() {
      const vm = this;
      let movieIndex = 0;
      let movieId = vm.movieId;
      vm.movieIndex = this.$store.state.productsModules.products.findIndex(
        function(item) {
          return item.id == vm.movieId;
        }
      );
      let boolean = false;
      const currentItem = this.$store.state.productsModules.products[
        vm.movieIndex
      ];
      if (currentItem.attention) {
        boolean = false;
        movieIndex = vm.movieIndex;
        this.$store.dispatch("addAttention", { movieId, movieIndex, boolean });
      } else {
        boolean = true;
        movieIndex = vm.movieIndex;
        this.$store.dispatch("addAttention", { movieId, movieIndex, boolean });
      }
    },
    ...mapActions("productsModules", ["getProducts"])
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    isAttention() {
      if (this.$store.state.productsModules.products.length) {
        return this.$store.state.productsModules.products[this.movieIndex]
          .attention;
      }
    },
    ...mapGetters("productsModules", ["products", "categories"])
  },
  created() {
    this.movieId = this.$route.params.movieId;
    this.getMovieInfo();
    this.getProducts();
  }
};
</script>

<style lang="scss">
</style>