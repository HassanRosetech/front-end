<template>
  <section class="ratio_asos">
    <div class="container">
      <div class="row m-0">
        <div class="col-sm-12 p-0">
          <div class="title title-2 text-center">
            <h2> {{ useRuntimeConfig().public.const.NewArrival }}</h2>
            <h5>{{ useRuntimeConfig().public.const.OurCollection }}</h5>

          </div>
          <div class="product-wrapper product-style-2 slide-4 p-0 light-arrow">
            <swiper v-bind="swiperOption" class="swiper-wrapper">
              <swiper-slide class="swiper-slide" v-for="(product, index) in products" :key="index">
                <productBox1 :product="product" />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Pagination } from "swiper";
import productBox1 from "~/layout/elements/productBox/product-box1.vue";
import "swiper/css/pagination";
export default {
  components: {
    productBox1,
  },
  props: ["products"],

  data() {
    return {
      swiperOption: {
        modules: [Pagination],
        pagination: {
          clickable: true,
        },
        slidesPerView: 4,
        freeMode: false,
        breakpoints: {
          1200: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          575: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          0: {
            slidesPerView: 2,
            spaceBetween: 12,
          }
        }
      }
    };
  },
};
</script>
<style></style>
