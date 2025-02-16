<template>
  <section class="home-section home-section-4">
    <div class="poster-image slider-for custome-arrow classic-arrow">

      <swiper :loop="true" :spaceBetween="10" :thumbs="{ swiper: thumbsSwiper }" :navigation="true" :modules="modules">
        <swiper-slide v-for="(image, index) in images" :key="index">
          <img :src="getImageUrl(image)" class="img-fluid" alt="" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="slider-nav image-show">
      <swiper @swiper="setThumbsSwiper" :loop="true" :spaceBetween="10" :slidesPerView="3" :freeMode="true"
        :watchSlidesProgress="true" :modules="modules" :style="{ height: '400px' }" direction="vertical">
        <swiper-slide class="swiper-slide" v-for="(backgroundImage, index) in backgroundImages" :key="'A' + index">
          <div class="poster-img">
            <img :src="getImageUrl(backgroundImage)" class="img-fluid" :alt="backgroundImage" />
            <div class="overlay-color">
              <i class="fas fa-plus theme-color"></i>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div class="left-side-contain justify-content-sm-center">
      <div class="banner-left">
        <h4>
          {{ useRuntimeConfig().public.const.Sale }}
          <span class="theme-color">35% {{ useRuntimeConfig().public.const.OFF }}</span>
        </h4>
        <h1>New Latest <span>Furniture</span></h1>
        <p>
          {{ useRuntimeConfig().public.const.BUYONEGETONE }}
          <span class="theme-color">{{ useRuntimeConfig().public.const.FREE }}</span>
        </p>
        <h2>
          $79.00 <span class="theme-color"><del>$65.00</del></span>
        </h2>
        <p class="poster-details mb-0">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
    </div>

    <div class="right-side-contain">
      <div class="social-image">
        <h6>
          <a href="https://www.facebook.com/" target="_blank">Facebook</a>
        </h6>
      </div>

      <div class="social-image">
        <h6>
          <a href="https://www.instagram.com/" target="_blank">Instagram</a>
        </h6>
      </div>

      <div class="social-image">
        <h6>
          <a href="https://twitter.com/" target="_blank">Twitter</a>
        </h6>
      </div>
    </div>
  </section>
</template>
  
<script setup>
import { FreeMode, Navigation, Thumbs } from 'swiper';

let images = [
  "furniture-images/poster/1.png",
  "furniture-images/poster/2.png",
  "furniture-images/poster/3.png",
],
  backgroundImages = [
    "furniture-images/poster/t2.jpg",
    "furniture-images/poster/t1.jpg",
    "furniture-images/poster/t3.jpg",
  ], thumbsSwiper = ref(null), modules = [FreeMode, Navigation, Thumbs];

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};
</script>
<style></style>