<template>
  <div>
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
      <div class="cart-item py-3 border-bottom" v-for="(item, index) in cart.carts" :key="index">
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
                <template v-if="item.coupon">
                  <div class="text-danger">以套用 {{ item.coupon.percent }} % 優惠券</div>
                </template>
              </div>
            </div>
          </div>
          <div class="col-md-2">{{ item.product.price }}</div>
          <div class="col-md-2">{{ item.qty }} / {{ item.product.unit }}</div>
          <div class="col-md-2" v-if="!item.coupon">{{ item.product.price | currency }}</div>
          <div class="col-md-2" v-else>{{ item.final_total | currency }}</div>
          <div class="col-md-1 cursor-pointer" @click="removeCart(item.id)">
            <i class="far fa-trash-alt"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    cart () {
      return this.$store.state.cartsModules.cart
    }
  },
  methods: {
    removeCart (id) {
      this.$store.dispatch('cartsModules/removeCart', id).then((response) => {
        console.log(response)
        if(!response.data.data.carts.length){
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-item-img {
  max-width: 80px;
}
.cursor-pointer{
  cursor: pointer;
}
</style>
