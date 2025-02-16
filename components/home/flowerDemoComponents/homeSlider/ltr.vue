<template>
  <section class="home-section pt-0 home-section-5">
    <div class="poster-image slider-for custome-arrow classic-arrow-2">

      <swiper :loop="true" :spaceBetween="10" :navigation="true" :thumbs="{ swiper: thumbsSwiper }" :modules="modules">
        <swiper-slide v-for="(backgroundImage, index) in backgroundImages" :key="index">
          <img :src="getImageUrl(backgroundImage)" class="img-  " alt="" />
        </swiper-slide>
      </swiper>
      <div class="custom-arrow prev">
        <i class="fas fa-chevron-left"></i>
        <span>{{ useRuntimeConfig().public.const.Prev }}</span>
      </div>
      <div class="custom-arrow next">
        <span>{{ useRuntimeConfig().public.const.Next }}</span><i class="fas fa-chevron-right"></i>
      </div>
    </div>
    <div class="background-circle">
      <img src="/images/flower/back-cirlce.png" class="img-fluid" alt="" />
    </div>

    <div class="flower-image">
      <img src="/images/flower/poster/a1.png" class="flower-1" alt="" />
      <img src="/images/flower/poster/a1.png" class="flower-2" alt="" />
    </div>
    <div class="slider-nav image-show">
      <swiper @swiper="setThumbsSwiper" :loop="true" :spaceBetween="10" :slidesPerView="4" :freeMode="true"
        :watchSlidesProgress="true" :modules="modules" :style="{ height: '500px' }" direction="vertical">
        <swiper-slide class="swiper-slide" v-for="(image, index) in images" :key="'A' + index">
          <div class="poster-img">
            <img :src="getImageUrl(image)" class="img-fluid" alt="" />
            <div class="overlay-color">
              <p class="theme-color">{{ index + 1 }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div class="left-side-contain">
      <div class="banner-left mb-0">
        <h4>
          {{ useRuntimeConfig().public.const.Sale }}
          <span class="theme-color">35% {{ useRuntimeConfig().public.const.OFF }}</span>
        </h4>
        <h1>New Fresh <span>Bookey</span></h1>
        <p>
          {{ useRuntimeConfig().public.const.BUYONEGETONE }}
          <span class="theme-color">{{ useRuntimeConfig().public.const.FREE }}</span>
        </p>
        <h2>
          $79.00 <span class="theme-color"><del>$65.00</del></span>
        </h2>
        <p class="poster-details">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
    </div>
  </section>
</template>
  
<script setup>
import { FreeMode, Navigation, Thumbs } from 'swiper';
let backgroundImages = ["flower/poster/2.png", "flower/poster/1.png"], images = ["flower/poster/t1.jpg", "flower/poster/t2.jpg"];
let thumbsSwiper = ref(null), modules = [FreeMode, Navigation, Thumbs];
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};
</script>
<style lang="scss" scoped>
.slider-nav {
  top: 425px;
}
</style>