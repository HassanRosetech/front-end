<template>
  <div class="section-b-space">
    <div class="title title1 text-center">
      <h2>{{ useRuntimeConfig().public.const.Product6 }}</h2>
    </div>

    <div class="contain-image-box overflow-hidden">
      <section class="ratio_asos pt-0">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="product-wrapper product-style-2 slide-4 p-0 light-arrow">
                <swiper v-bind="swiperOption" ref="brandCarousel">
                  <swiper-slide v-for="(product, index) in products" :key="index">
                    <productBox1 :product="product" />
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { Pagination } from 'swiper';
import productBox1 from "~/layout/elements/productBox/product-box1.vue";
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
