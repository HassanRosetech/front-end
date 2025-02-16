<template>
  <section class="ratio_asos section-b-space overflow-hidden">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-lg-4 mb-3 lh-sm">
            {{ useRuntimeConfig().public.const.CustomersAlsoBoughtThese }}
          </h2>
          <div class="product-wrapper product-style-2 slide-4 p-0 light-arrow">
            <swiper v-bind="swiperOption" class="swiper-wrapper">
              <swiper-slide class="swiper-slide" v-for="(product, index) in productsList" :key="index">
                <productBox1 :product="product" />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "swiper/css/pagination";
import { Pagination } from "swiper";
import productBox1 from "~/layout/elements/productBox/product-box1.vue";
import { useProductStore } from "~~/store/products";
export default {
  components: {
    productBox1,
  },
  data() {
    return {
      swiperOption: {
        modules: [Pagination],
        slidesPerView: 4,
        pagination: {
          clickable: true,
        },
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
  computed: {
    productsList() {
      return useProductStore().data.filter((item) => item.type === "fashion")
    }
  },

};
</script>
