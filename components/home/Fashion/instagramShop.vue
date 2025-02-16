<template>
  <div>
    <section class="ratio_square-2">
      <div class="container-fluid">
        <div class="title title-2 text-center">
          <h2>{{ useRuntimeConfig().public.const.InstagramShop }}</h2>
          <h5 class="text-color">{{ useRuntimeConfig().public.const.NewCollection }}</h5>
        </div>

        <div class="product-style-1 instagram-2">
          <div class="insta-slider instagram-wrap">
            <swiper v-bind="swiperOption" class="swiper-wrapper">
              <swiper-slide v-for="(banner, index) in banners" :key="index">
                <productBox5 :banner="banner" />
              </swiper-slide>

            </swiper>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Pagination } from "swiper";
import productBox5 from "~/layout/elements/productBox/product-box5.vue";
import buttonAnimated from "~/layout/elements/buttons/animatedButton.vue";
export default {
  components: {
    buttonAnimated,
    productBox5,
  },
  props: ["banners"],
  data() {
    return {
      swiperOption: {
        modules: [Pagination],
        pagination: true,
        slidesPerView: 5,
        pagination: {
          clickable: true,
        },
        breakpoints: {
          1630: {
            spaceBetween: 24,
            slidesPerView: 5
          },
          1200: {
            spaceBetween: 24,
            slidesPerView: 4
          },
          900: {
            spaceBetween: 24,
            slidesPerView: 3
          },
          420: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          0: {
            spaceBetween: 12,
            slidesPerView: 1.2,
            centeredSlides: true,
          }
        }
      },
    };
  },
};
</script>
