<template>
  <div>
    <Slider :imagesData="imgArr"></Slider>
    <div class="container main-content my-5">
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <div class="list-group sticky-top">
            <a
              href="#"
              class="list-group-item list-group-item-action list-group-item-dark"
              @click.prevent="filterCategory = ''"
              :class="{ 'active': filterCategory === ''}"
            >全部顯示</a>
            <a
              class="list-group-item list-group-item-action list-group-item-dark d-flex align-items-center"
              href="#"
              @click.prevent="filterCategory = item"
              :class="{ 'active': item === filterCategory}"
              v-for="item in categories"
              :key="item"
            >
              <i class="fas fa-video"></i>
              &nbsp;
              {{ item }}
              <span
                class="badge badge-light badge-pill ml-auto"
              >{{ filterCategoryLength(item) }}</span>
            </a>
          </div>
        </div>

        <!-- 子頁面 -->
        <div class="col-md-9">
          <div class="d-flex mb-4">
            <h1 class="text-light">強檔院線</h1>
            <!-- Search bar -->
            <form class="form-inline my-3 my-lg-0 ml-auto">
              <div class="input-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="searchText"
                  placeholder="輸入關鍵字"
                  aria-label="Search"
                >
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="searchText = ''">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- content -->
          <div class="tab-pane" id="list-gift">
            <div class="row align-items-stretch">
              <!-- 禮品 -->
              <div class="col-md-4 mb-4" v-for="(item) in filterData" :key="item.id">
                <div class="card border-0 box-shadow text-center h-100">
                  <img class="card-img-top" :src="item.imageUrl" alt="Card image cap">
                  <div class="card-body bg-dark">
                    <div class="d-flex">
                      <h4 class="card-title text-light">{{ item.title }}</h4>
                      <div class="heart ml-auto" @click="addAttention(item.id)">
                        <i
                          class="fa-heart fa-lg text-white"
                          :class="{ 'fas': item.attention, 'far': !item.attention, 'text-danger': item.attention }"
                        ></i>
                      </div>
                    </div>
                    <p class="card-text text-left">{{ item.content }}</p>
                  </div>
                  <div class="card-footer bg-dark d-lg-flex border-white">
                    <button
                      href="#"
                      class="btn btn-outline-light btn-sm infoBtn"
                      @click.prevent="movieInfo(item.id)"
                    >查看內容</button>
                    <button
                      class="btn btn-outline-light btn-sm ml-auto infoBtn"
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Slider from "@/components/Movieslider";

export default {
  name: "home",
  data() {
    return {
      searchText: "",
      filterCategory: "",
      imgArr: [
        "images/movie01.jpg",
        "images/movie02.jpg",
        "images/movie03.jpg",
        "images/movie04.jpg",
        "images/movie05.jpg"
      ],
      movieId: 0,
      movieIndex: 0
    };
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.filterCategory) {
        return vm.products.filter(item => {
          return item.category.includes(vm.filterCategory);
        });
      }
      if (vm.searchText) {
        return vm.products.filter(item => {
          return item.title.toLowerCase().includes(vm.searchText.toLowerCase());
        });
      }
      return vm.products;
    },
    ...mapGetters("productsModules", ["products", "categories"])
  },
  methods: {
    addtoCart(itemId, qty = 1) {
      console.log(this.$store.state.productsModules.products);
      this.$store.dispatch("addtoCart", { itemId, qty });
    },
    movieInfo(id) {
      this.$router.push(`/movieinfo/${id}`);
    },
    addAttention(movieId) {
      const vm = this;
      let movieIndex = 0;
      vm.movieId = movieId;
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
        console.log(movieId);
        this.$store.dispatch("addAttention", { movieId, movieIndex, boolean });
      } else {
        boolean = true;
        movieIndex = vm.movieIndex;
        console.log(movieId);
        this.$store.dispatch("addAttention", { movieId, movieIndex, boolean });
      }
    },
    filterCategoryLength(item) {
      return this.$store.state.productsModules.products.filter(function(
        itemData
      ) {
        return itemData.category == item;
      }).length;
    },
    ...mapActions("productsModules", ["getProducts"])
  },
  created() {
    this.getProducts();
  },
  components: {
    Slider
  }
};
</script>

<style lang="scss">
.mt-110 {
  margin-top: 110px;
}
@media screen and (max-width: 992px) {
  .infoBtn {
    display: block;
    width: 100%;
  }
  .infoBtn + .infoBtn {
    margin-top: 0.5rem;
  }
}
</style>
