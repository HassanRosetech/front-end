<template>
  <div class="col-md-6" :class="sliderClass ? sliderClass : ''">
    <div class="degree-section">
      <div class="degree-section">
        <div class="details-image ratio_asos">
          <swiper @swiper="onSwipe" :slidesPerView="1" :spaceBetween="20">
            <swiper-slide v-for="(topImage, index) in productImages" :key="index">
              <div class="product-image-tag">
                <vue-image-zoomer :regular="getImageUrl(topImage.src)" :zoom="getImageUrl(topImage.src)"
                  img-class="img-fluid w-100 image_zoom_cls-0" hover-message="Click once on image">
                </vue-image-zoomer>
                <div class="label-tag">
                  <h6>
                    <i class="fas fa-star"></i> 4.8
                    <span class="font-light">120</span>
                  </h6>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="image-360 videoplay-box" data-bs-toggle="modal" data-bs-target="#product-modal">
        <img src="https://img.icons8.com/ios/50/000000/circled-play.png" alt="" />
      </div>

      <div class="details-image-option black-slide mt-4 rounded bg-success">
        <swiper :slidesPerView="3" :spaceBetween="24" class="swiper-wrapper">
          <swiper-slide class="swiper-slide" v-for="(bottomImage, index2) in productImages" :key="index2">
            <img :src="getImageUrl(bottomImage.src)" class="img-fluid" alt="" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { useInfoStore } from '~~/store/information'
export default {
  props: ["sliderClass"],
  data() {
    return {
      changeValue: 0,
      sliderSetting: {},
    };
  },
  computed: {
    productImages() {
      return useInfoStore().data.filter((item) => item.type === "fashionImages")[0].images
    }
  },
  methods: {
    onSwipe(swiper) {
      this.swiper = swiper
    },
    slideTo1(id) {
      this.swiper.slideTo(id)
      this.slideId = id
    },
  },
};
</script>
