<template>
    <div>
        <div class="card border-0 box-shadow text-center h-100">
            <div class="ribbon ribbon-info">{{ info.category }}</div>
            <img class="card-img-top" :src="info.imageUrl" alt="Card image cap">
            <div class="card-body bg-dark">
            <div class="d-flex">
                <h4 class="card-title text-light">{{ info.title }}</h4>
                <div class="heart ml-auto" @click="addAttention(info.id)">
                <i
                    class="fa-heart fa-lg text-white"
                    :class="{ 'fas': info.attention, 'far': !info.attention, 'text-danger': info.attention }"
                ></i>
                </div>
            </div>
            <p class="card-text text-left">{{ info.content }}</p>
            </div>
            <div class="card-footer bg-dark d-lg-flex border-white">
            <button
                href="#"
                class="btn btn-outline-light btn-sm infoBtn"
                @click.prevent="movieInfo(info.id)"
            >查看內容</button>
            <button
                class="btn btn-outline-light btn-sm ml-auto infoBtn"
                @click="addtoCart(info.id)"
            >
                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === info.id"></i>
                <i class="fa fa-cart-plus" aria-hidden="true"></i> 加到購物車
            </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['info'],
  computed: {
    ...mapGetters('cartsModules', ['status'])
  },
  methods: {
    addtoCart (itemId, qty = 1) {
      this.$store.dispatch('cartsModules/addtoCart', { itemId, qty })
    },
    movieInfo (id) {
      this.$router.push(`/movieinfo/${id}`)
    },
    addAttention (id) {
        this.$emit('add-attention', id)
    }
  }
}
</script>
