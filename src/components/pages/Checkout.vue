<template>
  <div>
    <div class="container mt-110 text-white">
      <div class="row">
        <div class="col-md-8">
          <div class="cart-header text-center px-1 py-3 bg-white text-dark">
            <div class="row">
              <div class="col-md-5">ITEM</div>
              <div class="col-md-2">PRICE</div>
              <div class="col-md-2">QUANTITY</div>
              <div class="col-md-2">TOTAL</div>
              <div class="col-md-1"></div>
            </div>
          </div>
          <div class="cart-body px-4">
            <div
              class="cart-item py-3 border-bottom"
              v-for="(item, index) in cart.carts"
              :key="index"
            >
              <div class="row text-center align-items-center">
                <div class="col-md-5">
                  <div class="d-flex align-items-center">
                    <router-link :to="`/movieinfo/${item.product_id}`">
                      <img class="cart-item-img" :src="item.product.imageUrl" alt>
                    </router-link>
                    <div class="text-left ml-3">
                      <router-link
                        class="text-white"
                        :to="`/movieinfo/${item.product_id}`"
                      >{{ item.product.title }}</router-link>
                      <br>
                      <span class="badge badge-light">{{ item.product.category }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-2">{{ item.product.price }}</div>
                <div class="col-md-2">{{ item.qty }} / {{ item.product.unit }}</div>
                <div class="col-md-2">{{ item.product.price | currency }}</div>
                <div class="col-md-1"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="block-header text-center py-3 bg-white text-dark">訂單摘要</div>
          <div class="block-body">
            <ul class="list-unstyled">
              <li class="d-flex justify-content-between align-items-center p-4">
                <span>小計</span>
                <span>{{ cart.total | currency }}</span>
              </li>
              <li
                class="d-flex justify-content-between align-items-center p-4 text-danger"
                v-if="cart.total!==cart.final_total"
              >
                <span>已套用優惠券</span>
                <span>折扣為 {{ cart.final_total/cart.total*100 }}%</span>
              </li>
              <li class="d-flex justify-content-between align-items-center p-4 border-top">
                <span class="text-uppercase">total</span>
                <span>{{ cart.final_total | currency }}</span>
              </li>
              <li v-if="cart.total==cart.final_total">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="try test"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    v-model="coupon_code"
                  >
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-light"
                      type="button"
                      @click="addCouponCode"
                    >使用 Coupon</button>
                  </div>
                </div>
              </li>
              <li class="d-flex">
                <button class="btn btn-outline-light ml-auto">確認，下一步</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      coupon_code: ""
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    }
  },
  methods: {
    addCouponCode() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code
      };
      this.$http.post(api, { data: coupon }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.getCart();
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
    getCart() {
      this.$store.dispatch("getCart");
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-item-img {
  max-width: 80px;
}
</style>