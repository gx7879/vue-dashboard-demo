<template>
  <div class="fixed-top">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <img src="images/logo.png" alt>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <i class="fas fa-home"></i>
                首頁
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/favorites">
                <i class="far fa-heart"></i>
                我的最愛
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/products">後台管理</router-link>
            </li>
            <li>
              <div class="dropdown ml-auto">
                <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
                  <i class="fa fa-shopping-cart text-light fa-lg" aria-hidden="true"></i>
                  <span class="badge badge-pill badge-danger shop-cart">{{cart.carts.length}}</span>
                  <span class="sr-only">unread messages</span>
                </button>
                <div
                  class="dropdown-menu dropdown-menu-right p-3"
                  style="min-width: 300px"
                  data-offset="400"
                >
                  <h6>已選擇商品</h6>
                  <table class="table table-sm" v-if="cart.carts.length">
                    <tbody>
                      <tr v-for="item in cart.carts" :key="item.id">
                        <td class="align-middle text-center">
                          <a href="#" class="text-muted" @click.prevent="removeCart(item.id)">
                            <i class="far fa-trash-alt"></i>
                          </a>
                        </td>
                        <td class="align-middle">{{ item.product.title }}</td>
                        <td class="align-middle">{{ item.qty }}{{item.product.unit}}</td>
                        <td class="align-middle text-right">{{item.total}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex border-top border-bottom mb-3 p-1">
                    <span class="text-uppercase text-muted">Total</span>
                    <strong class="ml-auto">{{ cart.total | currency }}</strong>
                  </div>
                  <button class="btn btn-outline-secondary btn-block" @click="checkOutOrders">
                    <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    }
  },
  methods: {
    removeCart(id) {
      this.$store.dispatch("removeCart", id);
    },
    checkOutOrders() {
      this.$router.push("/cart/checkout");
    }
  }
};
</script>