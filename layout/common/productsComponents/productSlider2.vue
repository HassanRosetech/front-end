<template>
  <div class="col-md-6">
    <div class="row">
      <div class="col-lg-2 px-0 oder-lg-1 order-2">
        <div class="details-image-vertical black-slide rounded">        
        <swiper @swiper="setThumbsSwiper" class="mt-3" :style="{ height: '450px' }"  v-bind="verticalSwiperSettings">
            <swiper-slide v-for="(verticalImage, index) in   productImages" :key="index">
              <img :src="getImageUrl(verticalImage.src)" class="img-fluid" alt="" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="col-lg-10 order-lg-2 order-1">
        <div class="details-image-1 ratio_asos">
          <swiper :loop="true" :spaceBetween="20" :thumbs="{ swiper: thumbsSwiper }" :modules="modules"
            class="swiper-wrapper">
            <swiper-slide class="swiper-slide" v-for="(image, index2) in productImages" :key="index2">
              <img :src="getImageUrl(image.src)" id="zoom_01" :data-zoom-image="getImageUrl(image.src)"
                class="img-fluid w-100 image_zoom_cls-0" alt="" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { FreeMode, Navigation, Thumbs } from 'swiper';
import { useInfoStore } from '~~/store/information';
export default {
  data() {
    return {
      thumbsSwiper: null,
      modules: [FreeMode, Navigation, Thumbs],
      verticalSwiperSettings: {
        loop:true,
        spaceBetween:30,
        slidesPerView:3,
        freeMode:true,
        watchSlidesProgress:true,
        modules:[FreeMode, Navigation, Thumbs],
            direction:"vertical",
            breakpoints:{
              992:{
                direction:'vertical'
              },
              0:{
                direction:'horizontal'
              }
            }
      }
    }
  },
  computed: {
    productImages() {
      return useInfoStore().data.filter((item) => item.type === "fashionImages")[0].images
    }
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    }
  },
};
</script>
