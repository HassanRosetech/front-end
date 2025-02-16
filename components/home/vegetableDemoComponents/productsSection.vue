<template>
  <section class="ratio_90">
    <div class="container">
      <div class="row">
        <div class="product-wrapper slide-6 vegetable-category-box">
          <swiper v-bind="swiperOption" :pagination="true" :slidesPerView="6" :spaceBetween="24" class="swiper-wrapper">
            <swiper-slide class="swiper-slide" v-for="(product, index) in products" :key="index">
              <productBox6 :product="product" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import productBox6 from "~/layout/elements/productBox/product-box6.vue";
import 'swiper/css/pagination';
import { Pagination } from "swiper";
export default {
  components: {
    productBox6,
  },
  props: ["products"],
  data() {
    return {
      swiperOption: {
        modules: [Pagination],
        pagination: {
          clickable: true,
        },
        breakpoints: {
          1630: {
            slidesPerView: 6,
            spaceBetween: 24
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 24
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          705: {
            slidesPerView: 3,
            spaceBetween: 12,
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