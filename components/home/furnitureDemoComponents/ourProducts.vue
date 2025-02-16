<template>
  <section class="ratio_asos">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="title-3 text-center">
            <h2>{{ useRuntimeConfig().public.const.OurProduct }}</h2>
            <h5 class="theme-color">{{ useRuntimeConfig().public.const.OurCollection }}</h5>
          </div>
        </div>

        <div class="our-product">
          <swiper :breakpoints="swiperOption.breakpoints" :slidesPerView="4" :spaceBetween="20" class="swiper-wrapper">
            <swiper-slide class="swiper-slide" v-for="(product, index) in products" :key="index">
              <productBox3 :product="product" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import productBox3 from "~/layout/elements/productBox/product-box3.vue";
export default {
  components: {
    productBox3,
  },
  props: ["products"],
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 20,
        freeMode: false,
        breakpoints: {
          1340: {
            slidesPerView: 5,
          },
          1030: {
            slidesPerView: 4,
          },
          750: {
            slidesPerView: 3,
          },
          0: {
            slidesPerView: 2,

          }
        }
      }
    };
  },
};
</script>
