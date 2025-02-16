<template>
  <section class="ratio_asos">
    <div class="container">
      <div class="row m-0">
        <div class="col-sm-12 p-0">
          <div class="title title-2 text-center">
            <h2>{{ useRuntimeConfig().public.const.NewArrival }}</h2>
            <h5>{{ useRuntimeConfig().public.const.OurCollection }}</h5>
          </div>
          <div class="product-wrapper slide-5 light-arrow">
            <swiper v-bind="swiperOption" :slidesPerView="5" :spaceBetween="24" class="swiper-wrapper">
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
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
export default {
  components: { productBox2 },
  props: ["products"],
  data() {
    return {
      swiperOption: {
        modules: [Pagination],
        pagination: true,
        loop: true,
        breakpoints: {
          1188: {
            slidesPerView: 5,
            spaceBetween: 24
          },
          978: {
            slidesPerView: 3,
            spaceBetween: 24
          },
          575: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          0: {
            slidesPerView: 2,
            spaceBetween: 12,
          }
        }
      }
    };
  }
};
</script>
