<template>
  <section class="ratio_asos">
    <div class="container p-sm-0">
      <div class="row m-0">
        <div class="col-sm-12 p-0">
          <div class="title title-2 text-center">
            <h2>{{ useRuntimeConfig().public.const.LatestProduct }}</h2>
            <h5>{{ useRuntimeConfig().public.const.OurCollection }}</h5>
          </div>
          <div class="product-wrapper slide-5_1">
            <swiper v-bind="swiperOption" class="swiper-wrapper">
              <swiper-slide class="swiper-slide" v-for="(product, index) in products" :key="index">
                <productBox2 :product="product" />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import productBox2 from "~/layout/elements/productBox/product-box2.vue";
import "swiper/css/pagination";
import { Pagination } from 'swiper';
export default {
  components: {
    productBox2,
  },
  props: ["products"],
  data() {
    return {
      swiperOption: {
        modules: [Pagination],
        pagination: true,
        loop: false,
        freeMode: false,
        pagination: {
          clickable: true,
        },
        breakpoints: {
          1200: {
            slidesPerView: 5,
            spaceBetween: 24
          },
          991: {
            slidesPerView: 4,
            spaceBetween: 24
          },
          575: {
            spaceBetween: 12
          },
          0: {
            spaceBetween: 12,
            slidesPerView: 2,
          }
        }
      }
    };
  },
};
</script>
