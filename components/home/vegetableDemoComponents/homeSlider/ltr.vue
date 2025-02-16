<template>
  <section class="home section home-section-6 classic-arrow-1">

    <swiper class="poster-image slider-for custome-arrow classic-arrow-1" :loop="true" :spaceBetween="10"
      :thumbs="{ swiper: thumbsSwiper }" :navigation="true" :modules="modules">
      <swiper-slide v-for="(backgroundImage, index) in backgroundImages" :key="index">
        <div>
          <img :src="getImageUrl(backgroundImage)" class="img-fluid " alt="" draggable="false" />
        </div>
      </swiper-slide>
    </swiper>

    <div class="background-circle">
      <img src="/images/vegetable/poster/circle.png" class="img-fluid" alt="" />
    </div>

    <div class="slider-nav image-show">

      <swiper @swiper="setThumbsSwiper" :loop="true" :spaceBetween="10" :slidesPerView="3" :freeMode="true"
        :watchSlidesProgress="true" :modules="modules" :style="{ height: '400px' }" direction="vertical"
        class="swiper-wrapper">
        <swiper-slide class="swiper-slide" v-for="(image, index) in images" :key="'A' + index">
          <div class="poster-img">
            <img :src="getImageUrl(image)" class="img-fluid" alt="" v-on:click="slideTo1(index)" />
            <div class="overlay-color">
              <i class="fas fa-plus theme-color"></i>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div class="left-side-contain">
      <div class="banner-left">
        <h4>
          {{ useRuntimeConfig().public.const.Sale }}
          <span class="theme-color">35% {{ useRuntimeConfig().public.const.OFF }}</span>
        </h4>
        <h1>Fresh & Tasty <span>Corn Cobe</span></h1>
        <p>
          {{ useRuntimeConfig().public.const.BUYONEGETONE }}
          <span class="theme-color">{{ useRuntimeConfig().public.const.FREE }}</span>
        </p>
        <h2>
          $79.00 <span class="theme-color"><del>$65.00</del></span>
        </h2>
        <p class="poster-details">
          Lorem Ipsum is simply dummy text of typesetting.
        </p>
        <div class="banner-btn-grup">
          <button href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')" type="button"
            class="btn btn-solid-default">
            {{ useRuntimeConfig().public.const.ShopNow }}
          </button>
        </div>
      </div>
    </div>

    <div class="right-side-contain">
      <div class="social-image">
        <a href="https://www.facebook.com/" target="new">
          <h6>Facebook</h6>
        </a>
      </div>

      <div class="social-image">
        <a href="https://www.instagram.com/" target="new">
          <h6>Instagram</h6>
        </a>
      </div>

      <div class="social-image">
        <a href="https://twitter.com/" target="new">
          <h6>Twitter</h6>
        </a>
      </div>
    </div>
  </section>
</template>
  
<script>
import { FreeMode, Navigation, Thumbs, EffectFade } from 'swiper';

import 'swiper/css/effect-fade';
export default {
  data() {
    return {
      thumbsSwiper: null,
      modules: [Navigation, EffectFade, FreeMode, Thumbs],
      backgroundImages: [
        "vegetable/poster/1.png",
        "vegetable/poster/2.png",
        "vegetable/poster/3.png",
      ],
      images: [
        "vegetable/poster/t1.jpg",
        "vegetable/poster/t2.jpg",
        "vegetable/poster/t3.jpg",
      ],
    };
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper
    }
  },
};
</script>
  