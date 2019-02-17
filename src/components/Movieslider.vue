<template>
  <div style="height: 700px;">
    <!-- swiper1 -->
    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
      <swiper-slide v-for="(item,index) in imagesData" :key="index">
        <div
          class="overflow-hidden"
          :style="{backgroundImage: `url(${item.pic})`, backgroundSize: 'cover', backgroundPosition:'center', height: '100%'}"
        >
          <div class="container mt-110 text-white p-5">
            <div class="row">
              <div class="col-md-12">
                <div class="tag mb-2">{{ item.category }}</div>
                <h1 class="display-4">{{ item.title }}</h1>
                <div class="description">{{ item.des | beautySub(50) }}</div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
    <!-- swiper2 Thumbs -->
    <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
      <swiper-slide v-for="(item,index) in imagesData" :key="index">
        <div
          :style="{backgroundImage: `url(${item.pic})`,backgroundSize: 'cover', backgroundPosition:'center', height: '100%'}"
        ></div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  props: ['imagesData'],
  data () {
    return {
      swiperOptionTop: {
        spaceBetween: 10,
        autoplay: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })

    let color = ['#DB4F38', '#1BB5FF', '#000']
    $('.tag').css({ background: color[Math.floor(Math.random() * 3)] })
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  background-color: #000;
}
.swiper-slide {
  background-size: cover;
  background-position: center;
}
.gallery-top {
  height: 80% !important;
  width: 100%;
}
.gallery-thumbs {
  height: 20% !important;
  box-sizing: border-box;
  padding: 10px 0;
}
.gallery-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
.tag {
  background-color: #fff;
  color: #fff;
  display: inline-block;
  padding: 0px 6px;
}
.description {
  max-width: 400px;
  font-size: 1rem;
  opacity: 0;
  transition: all 0.2s ease 0.5s;
}
.swiper-slide-active .description {
  opacity: 1;
}
</style>
