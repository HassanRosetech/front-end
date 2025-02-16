<template>
  <section class="ratio_asos">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="title text-center">
          </div>
          <div class="product-wrapper slide-6">
            <swiper v-bind="swiperOption" class="swiper-wrapper">
              <swiper-slide v-for="(product, index) in products.slice(0, 7)" :key="index">
                <productBox_2 :product="product" />
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
import productBox_2 from "~/layout/elements/productBox/product-box2.vue";
import "swiper/css/pagination";
export default {
  components: {
    productBox_2,
  },
  props: ["products"],
  data() {
    return {
      swiperOption: {
        modules: [Pagination],
        freeMode: false,
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
            spaceBetween: 24
          },
          705: {
            slidesPerView: 3,
            spaceBetween: 24
          },
          575: {
            slidesPerView: 2,
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
