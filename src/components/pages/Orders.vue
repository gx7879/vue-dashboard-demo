<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="orders.length" :class="{'text-secondary': !item.is_paid}">
          <td>{{ item.create_at | date }}</td>
          <td>
            <span v-text="item.user.email" v-if="item.user"></span>
          </td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未起用</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @page-event="getOrders"></Pagination>
  </div>
</template>

<script>
import Pagination from "../Pagination";
export default {
  data() {
    return {
      orders: {},
      isLoading: false,
      isNew: false,
      pagination: {}
    };
  },
  components: {
    Pagination
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    }
  },
  created() {
    this.getOrders();
  }
};
</script>