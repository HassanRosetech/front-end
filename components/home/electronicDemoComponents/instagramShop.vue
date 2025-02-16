<template>
  <div>
    <section class="ratio_square">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <div class="title title-2 text-center">
              <h2>{{ useRuntimeConfig().public.const.InstagramShop }}</h2>
              <h5 class="text-color">{{ useRuntimeConfig().public.const.NewCollection }}</h5>
            </div>
            <div class="product-style-1 instagram-2 product-wrapper">
              <div class="insta-slider instagram-wrap">
                <swiper v-bind="swiperOption" :loop="true" class="swiper-wrapper">
                  <swiper-slide v-for="(banner, index) in banners" :key="index">
                    <instagramShopCard :banner="banner" />
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import "swiper/css/pagination";
import { Pagination } from "swiper";
import instagramShopCard from "~/layout/elements/productBox/product-box7.vue";
import buttonAnimated from "~/layout/elements/buttons/animatedButton.vue";
export default {
  components: {
    buttonAnimated,
    instagramShopCard
  },
  props: ["banners"],
  setup() {
    return {
      swiperOption: {
        modules: [Pagination],
        pagination: {
          clickable: true,
        },
        slidesPerView: 5,
        breakpoints: {
          1630: {
            slidesPerView: 5,
            spaceBetween: 24
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 24
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 24
          },
          0:{
            slidesPerView: 2,
            spaceBetween: 24
          }
        }
      }
    };
  },
};
</script>
