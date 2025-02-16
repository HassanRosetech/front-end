
<template>
  <div class="section-b-space">
    <div class="title title1 text-center">
      <h2>{{ useRuntimeConfig().public.const.Product1 }}</h2>
    </div>

    <div class="contain-image-box overflow-hidden">
      <section class="ratio_asos pt-3">
        <div class="container">
          <div class="row m-0">
            <div class="col-sm-12 p-0">
              <div class="product-wrapper slide-6">
                <Swiper v-bind="swiperOption" class="swiper-wrapper">
                  <SwiperSlide class="swiper-slide" v-for="(product, index) in products" :key="index">
                    <productBox2 :product="product" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import productBox2 from "~/layout/elements/productBox/product-box2.vue";
export default {
  components: {
    productBox2
  },
  props: ["products"],
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 20,
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
          0: {
            slidesPerView: 2,
          }
        }
      }
    };
  },
};
</script>
<style></style>
