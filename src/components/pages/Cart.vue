<template>
  <div class="mt-110 text-white">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div :is='cartStatus' :cart='cart'></div>
        </div>
        <div class="col-md-4">
          <div class="block-header text-center py-3 bg-white text-dark">訂單摘要</div>
          <div class="block-body">
            <ul class="list-unstyled">
              <li class="d-flex justify-content-between align-items-center p-4">
                <span>小計</span>
                <span>{{ cart.total | currency }}</span>
              </li>
              <!-- <li
                class="d-flex justify-content-between align-items-center p-4 text-danger"
                v-if="cart.total!==cart.final_total"
              >
                <span>已套用優惠券</span>
                <span>折扣為 {{ cart.final_total/cart.total*100 }}%</span>
              </li>-->
              <li class="d-flex justify-content-between align-items-center p-4 border-top">
                <span class="text-uppercase">total</span>
                <span>{{ cart.final_total | currency }}</span>
              </li>
              <li>
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
                <button class="btn btn-outline-light ml-auto" v-if='cartStatus == `Checkout`' @click='cartStatus = `Checkinfo`'>確認，下一步</button>
                <button class="btn btn-outline-light ml-auto" v-if='cartStatus == `Checkinfo`' @click='cartStatus = `Checkout`'>返回，上一步</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Checkout from '@/components/pages/Checkout'
import Checkinfo from '@/components/pages/Checkinfo'
export default {
  data () {
    return {
      cartStatus: 'Checkout',
      coupon_code: ''
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    }
  },
  methods: {
    addCouponCode () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/coupon`
      const vm = this
      const coupon = {
        code: vm.coupon_code
      }
      this.$http.post(api, { data: coupon }).then(response => {
        console.log(response.data)
        if (response.data.success) {
          vm.getCart()
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    getCart () {
      this.$store.dispatch('getCart')
    }
  },
  components: {
    Checkout,
    Checkinfo
  }
}
</script>
