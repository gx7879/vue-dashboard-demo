<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4">收件人資訊</h1>
          <form @submit.prevent="createOrder">
            <div class="form-group">
              <label for="useremail">Email</label>
              <input
                type="email"
                class="form-control"
                :class="{'is-invalid': errors.has('email')}"
                name="email"
                id="useremail"
                v-model="form.user.email"
                v-validate="'required|email'"
                placeholder="請輸入 Email"
              >
              <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
            </div>

            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input
                type="text"
                class="form-control"
                :class="{'is-invalid': errors.has('name')}"
                name="name"
                id="username"
                v-model="form.user.name"
                v-validate="'required'"
                placeholder="輸入姓名"
              >
              <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
            </div>

            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input
                type="tel"
                class="form-control"
                :class="{'is-invalid': errors.has('tel')}"
                name="tel"
                id="usertel"
                v-model="form.user.tel"
                v-validate="{required:true, regex: /^([0-9]+)$/}"
                placeholder="請輸入電話"
              >
              <span class="text-danger" v-if="errors.has('tel')">{{ errors.first('tel') }}</span>
            </div>

            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input
                type="address"
                class="form-control"
                :class="{'is-invalid': errors.has('address')}"
                name="address"
                id="useraddress"
                v-model="form.user.address"
                v-validate="'required'"
                placeholder="請輸入地址"
              >
              <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>

            <div class="form-group">
              <label for="useraddress">留言</label>
              <textarea name id class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-danger">送出訂單</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        user: {}
      }
    }
  },
  methods: {
    createOrder () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/order`
      const vm = this
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(api, { data: vm.form }).then(response => {
            console.log(response.data)
            if (response.data.success) {
              vm.$router.push(`/check_out_payment/${response.data.orderId}`)
            }
          })
        } else {
          vm.$bus.$emit('message:push', '欄位不完整', 'danger')
        }
      })
    }
  }
}
</script>
