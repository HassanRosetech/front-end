<template>
  <section class="ratio_asos section-b-space">
    <div class="container">
      <div class="product-wrapper product-style-2 slide-4 p-0 light-arrow">
        <Swiper v-bind="settings">
          <SwiperSlide v-for="(product, index) in productsList" :key="index">
            <productBox1 :product="product" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import productBox1 from "~/layout/elements/productBox/product-box1.vue";
import { searchProductSlider } from "@/static/data/SliderSettingsData.js";
let props = defineProps({
  productsList: Array
}), settings = searchProductSlider;
</script>
