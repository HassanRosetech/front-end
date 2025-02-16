<template>
  <div class="section-b-space">
    <div class="title title1 text-center">
      <h2>{{ useRuntimeConfig().public.const.Product4 }}</h2>
    </div>

    <div class="contain-image-box">
      <section class="ratio_90 pt-0">
        <div class="container">
          <div class="row">
            <div class="product-wrapper slide-6">
              <Swiper v-bind="settings" :pagination="true" :modules="settings.modules">
                <SwiperSlide v-for="(product, index) in products" :key="index">
                  <productBox6 :product="product" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import productBox6 from "~/layout/elements/productBox/product-box6.vue";
import 'swiper/css/pagination';
import { Pagination } from 'swiper';


export default {
  components: {
    productBox6
  },
  props: ["products"],
  data() {
    return {
      settings: {
        modules: [Pagination],
        speed: 500,
        arrows: false,
        slidesPerView: 6,
        breakpoints: {
          1630: {
            spaceBetween: 24,
            slidesPerView: 6,
          },

          1200: {
            slidesPerView: 5,
          },

          992: {
            slidesPerView: 4,
          },

          705: {
            slidesPerView: 3,
          },
          0: {
            slidesPerView: 2,
          },
        },
      },
    };
  },
};
</script>
