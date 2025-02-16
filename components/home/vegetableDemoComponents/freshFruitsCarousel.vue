<template>
  <section class="ratio_asos">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="title text-center">
            <h5>{{ useRuntimeConfig().public.const.JustForYou }}</h5>
            <h2>{{ useRuntimeConfig().public.const.FreshFruits }}</h2>
          </div>
          <div class="product-wrapper slide-6">
            <swiper v-bind="swiperOption" :slidesPerView="6" :pagination="true" :spaceBetween="24" class="swiper-wrapper">
              <swiper-slide class="swiper-slide" v-for="(product, index) in products" :key="index">
                <productBox_2 :product="product" productBoxClasses="product-box6" wrapperClasses="hover-image" square />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import productBox_2 from "~/layout/elements/productBox/product-box2.vue";
import 'swiper/css/pagination';
import { Pagination } from "swiper";
export default {
  components: {
    productBox_2
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
          1629: {
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
