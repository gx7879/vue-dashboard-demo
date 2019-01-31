<template>
  <div id="app">
    <router-view name="header"></router-view>
    <Loading :active.sync="isLoading"></Loading>
    <router-view/>
    <footer class="text-muted py-3">
      <div class="container">
        <ul class="list-inline text-center m-0">
          <li class="list-inline-item align-middle">© Copright 2019 黃昏電影院 純屬練習作品</li>
          <li class="list-inline-item align-middle">
            <a class="text-info" href="#">
              <i class="fab fa-instagram fa-2x"></i>
            </a>
          </li>
          <li class="list-inline-item align-middle">
            <a class="text-info" href="#">
              <i class="fab fa-facebook-square fa-2x"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getCart() {
      this.$store.dispatch("getCart");
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  created() {
    this.getCart();
  }
};
</script>

<style lang="scss">
@import "./assets/all";
// @import "~bootstrap/scss/bootstrap";
body {
  background-color: #121212;
  [src*="logo"] {
    height: 70px;
  }
  .navbar {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .sticky-top {
    top: 110px;
  }
  .btn-cart {
    position: relative;
    .shop-cart {
      position: absolute;
      top: -5px;
      right: -5px;
    }
  }
  footer {
    background-color: #1e1e1e;
  }
}
</style>
