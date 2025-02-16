<template>
  <section>
    <div class="container">
      <div class="row gy-lg-0 gy-5">
        <div class="col-lg-8">
          <div class="title title-2 text-center">
            <h2>{{ useRuntimeConfig().public.const.OurProduct }}</h2>
            <h5>{{ useRuntimeConfig().public.const.JustForYou }}</h5>
          </div>
          <div class="product-wrapper slide-three ratio_asos">
            <swiper :slidesPerView="3" :spaceBetween="20" class="swiper-wrapper">
              <swiper-slide class="swiper-slide" v-for="(product, index) in products" :key="index">
                <productBox2 :product="product" />
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="most-popular-box">
            <div class="title title-2 text-lg-start text-md-center">
              <h2>{{ useRuntimeConfig().public.const.Mostpopularss }}</h2>
              <h5>{{ useRuntimeConfig().public.const.OurCollection }}</h5>
            </div>
            <div class="product-slider round-arrow1">
              <swiper :loop="true" :navigation="true" :modules="modules" :slidesPerView="1">
                <swiper-slide v-for="(i, index) in Math.ceil(products.length / 5)" :key="index">
                  <div class="row g-3">
                    <div class="col-lg-12 col-md-6 col-12" v-for="(product, index2) in getSlicedProducts(
                      (index + 1) * 5 - 5,
                      (index + 1) * 5
                    )" :key="index2">
                      <div class="product-image">
                        <a href="javascript:void(0)" @click.prevent="
                          $router.push('/product/product_left_sidebar')
                        ">
                          <img :src="getImageUrl(product.images[0].src)" alt="" />
                        </a>
                        <div class="product-details">
                          <h6 class="font-light">{{ product.feature }}</h6>
                          <a href="javascript:void(0)" @click.prevent="
                            $router.push('/product/product_left_sidebar')
                          " class="">
                            <h3>{{ product.name }}</h3>
                          </a>
                          <h4 class="font-light mt-1">
                            <del>{{ selectedCurrencySymbol }}{{ product.mrp }}</del>
                            <span class="theme-color">{{
                              selectedCurrencySymbol
                            }}{{ product.price }}</span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import "swiper/css/navigation";

import { Navigation } from "swiper";
import productBox2 from "~/layout/elements/productBox/product-box2.vue";
import { useLayout } from "~~/store/layout";
export default {
  components: { productBox2 },
  props: ["products"],
  computed: {
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  methods: {
    getSlicedProducts(start, end) {
      var slicedArray = this.products.slice(start, end);
      return slicedArray;
    },
    getImageUrl(path) {
      return ("/images/" + path)
    }
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
};
</script>
<style></style>
