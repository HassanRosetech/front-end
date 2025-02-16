<template>
  <section class="ratio_asos overflow-hidden">
    <div class="container-fluid p-sm-0">
      <div class="row m-0">
        <div class="col-sm-12 p-0">
          <div class="title title-2 text-center">
            <h2>{{ useRuntimeConfig().public.const.LatestProduct }}</h2>
            <h5>{{ useRuntimeConfig().public.const.OurCollection }}</h5>
          </div>
          <div class="product-wrapper slide-6">
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
import { Pagination } from 'swiper';
import 'swiper/css/pagination';
export default {
  components: { productBox2 },
  props: ["products"],
  data() {
    return {
      swiperOption: {
        modules: [Pagination],
        pagination: {
          clickable: true,
        },
        breakpoints: {
          1618: {
            slidesPerView: 6,
            spaceBetween: 24
          },
          1188: {
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
