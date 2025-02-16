<template>
  <div class="section-b-space">
    <div class="title title1 text-center">
      <h2>{{ useRuntimeConfig().public.const.Product5 }}</h2>
    </div>

    <div class="contain-image-box">
      <section class="ratio_asos pt-0">
        <div class="px-0 container-fluid p-sm-0">
          <div class="row m-0">
            <div class="our-product">
              <swiper v-bind="swiperOption" ref="brandCarousel">
                <swiper-slide v-for="(product, index) in products" :key="index">
                  <productBox3 :product="product" />
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
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
      isLoaded: false,

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
  created() {
    this.isLoaded = true;
  },
};
</script>
