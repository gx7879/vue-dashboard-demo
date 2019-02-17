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
                  <div class="ribbon ribbon-info">{{ item.category }}</div>
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
                      <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
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
import { mapGetters, mapActions } from 'vuex'
import Slider from '@/components/Movieslider'

export default {
  name: 'home',
  data () {
    return {
      searchText: '',
      filterCategory: '',
      imgArr: [
        {
          pic: 'images/movie01.jpg',
          title: '辦公室大狂殺',
          category: '驚悚',
          des:
            '《厲陰宅》《安娜貝爾》《分裂》製作團隊，《星際異攻隊》導演詹姆斯岡恩撰寫劇本。史上最殘酷人性試煉！為了活下來，只好動手殺死身邊的同事們！80名平凡上班族，某天被困在平日上班的摩天大樓裡，廣播系統突然傳來不知名人士的聲音，恭喜他們獲選參加一場社會實驗，在接下來的時間裡，80個人必須用手邊可得的物品當作武器互相殘殺，沒有時限直到遊戲最後，只有1個人可以活著離開大樓…'
        },
        {
          pic: 'images/movie02.jpg',
          title: '浴血圍城88天',
          category: '動作',
          des:
            '趙寅成 x 南柱赫 x 雪炫史詩悲壯主演，耗資215億韓元大製作，重現韓國歷史中最激烈的戰役！戰無不克的唐太宗，望擴大東亞領土，征戰高句麗，兵臨其邊境的安市城。20萬唐朝精銳大軍，對上僅5千人的安市城軍民，相差40倍之遙。城主楊萬春將軍，無畏大軍壓境，堅守城池，號召百姓們一同作戰，88天裡，與唐軍展開一場殊死決戰。'
        },
        {
          pic: 'images/movie03.jpg',
          title: '魔女首部曲：誕生',
          category: '動作',
          des:
            '青龍最佳編劇朴勳正繼《闇黑新世界》後又一懸疑燒腦鉅作。十年前，一名小女孩拚命逃出了違背人類道德的基因改造營。幸運的被一對和藹的老夫妻收養了，並給她取名「具姿尹」。轉眼過了10年，姿尹長大成一個孝順父母又品學兼優的模範女孩。但是姿尹父母的健康卻隨著年紀越大而每況愈下，家中經濟也越來越糟糕。為了替父母分擔財務困難，姿尹決定去參加電視選秀比賽以獲得獎金。但平靜的生活也逐漸被吞噬，陌生男子一句：「我...'
        },
        {
          pic: 'images/movie04.jpg',
          title: '視界戰',
          category: '科幻',
          des:
            '繼《鐘點戰》、《獵殺星期一》2018科幻動作鉅獻！《鐘點戰》導演攜手原班團隊，再造AR概念新領域，性感女星亞曼達挑戰尺度演出。不要輕易相信你的眼睛。2030年的未來政府從幼兒一出生就植入瞳孔晶片，任何行為都在監管之下。'
        },
        {
          pic: 'images/movie05.jpg',
          title: '無雙',
          category: '動作',
          des:
            '周潤發 X 郭富城鈔級大騙！香港電影罕見美元偽鈔製作鬥智鬥狠情節。「超級美鈔」是一款連美國中央銀行體系都難辨真偽的假鈔，在1990年代肆虐全球。其中，以代號「畫家」為首的犯罪集團，夥同造假天才李問等成員，成功掌握了製造超級美鈔的技術，引起國際警方高度重視。為了找出首腦「畫家」，警方逼供落網的李問，然而依循李問提供的線索搜查，卻讓警方遭受到了意想不到的挑戰！［This content is p...'
        }
      ],
      movieId: 0,
      movieIndex: 0
    }
  },
  computed: {
    filterData () {
      const vm = this
      if (vm.filterCategory) {
        return vm.products.filter(item => {
          return item.category.includes(vm.filterCategory)
        })
      }
      if (vm.searchText) {
        return vm.products.filter(item => {
          return item.title.toLowerCase().includes(vm.searchText.toLowerCase())
        })
      }
      return vm.products
    },
    status () {
      return this.$store.state.status
    },
    ...mapGetters('productsModules', ['products', 'categories'])
  },
  methods: {
    addtoCart (itemId, qty = 1) {
      this.$store.dispatch('addtoCart', { itemId, qty })
    },
    movieInfo (id) {
      this.$router.push(`/movieinfo/${id}`)
    },
    addAttention (movieId) {
      const vm = this
      let movieIndex = 0
      vm.movieId = movieId
      vm.movieIndex = this.$store.state.productsModules.products.findIndex(
        function (item) {
          return item.id === vm.movieId
        }
      )
      let boolean = false
      const currentItem = this.$store.state.productsModules.products[vm.movieIndex]
      if (currentItem.attention) {
        boolean = false
        movieIndex = vm.movieIndex
        this.$store.dispatch('addAttention', { movieId, movieIndex, boolean })
      } else {
        boolean = true
        movieIndex = vm.movieIndex
        this.$store.dispatch('addAttention', { movieId, movieIndex, boolean })
      }
    },
    filterCategoryLength (item) {
      let products = this.$store.state.productsModules.products
      return products.filter(function (itemData) {
        return itemData.category === item
      }).length
    },
    ...mapActions('productsModules', ['getProducts'])
  },
  created () {
    this.getProducts()
  },
  components: {
    Slider
  }
}
</script>

<style lang="scss">
.mt-110 {
  margin-top: 110px;
}
.ribbon {
  position: absolute;
  top: 10px;
  left: -11px;
  font-size: 0.8rem;
  padding: 3px 15px 5px;
  letter-spacing: 0.3rem;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -14px;
    border-left: 12px solid transparent;
    border-right: 0px solid transparent;
    border-top: 14px solid darken(#db4f38, 20%);
  }
}
.ribbon-info {
  background-color: #db4f38;
  color: #fff;
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
