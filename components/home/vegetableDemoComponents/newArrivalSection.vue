<template>
  <section class="ratio_asos category-style-3">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 p-0">
          <div class="title text-center">
            <h5>{{ useRuntimeConfig().public.const.JustForYou }}</h5>
            <h2>{{ useRuntimeConfig().public.const.FreshFruits }}</h2>
          </div>
        </div>

        <div class="product-wrapper slide-4">
          <swiper v-bind="SliderOptions" class="swiper-wrapper">
            <swiper-slide class="swiper-slide" v-for="(banner, index) in banners" :key="index">
              <div class="category-image-fruit">
                <img :src="getImageUrl(banner.image)" class="img-fluid" draggable="false" alt="" />
                <div class="category-contain">
                  <img :src="getImageUrl(banner.imagefront)" class="" alt="" draggable="false" />
                </div>

                <div class="category-text">
                  <h2>{{ banner.heading }}</h2>
                  <h5>{{ banner.subheading }}</h5>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Pagination } from 'swiper';
export default {
  props: ["banners"],
  data() {
    return {
      SliderOptions: {
        spaceBetween: 20,
        loop: true,
        autoplay: true,
        slidesPerView: 4,
        slidesToScroll: 1,
        modules: [Pagination],
        pagination: true,
        breakpoints: {
          1200: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 3,
          },
          0: {
            slidesPerView: 2,
          },
        },
      }
    }
  }
};
</script>