<template>
  <section class="ratio_asos section-b-space">
    <div class="container">
      <div class="product-wrapper product-style-2 slide-4 p-0 light-arrow">
        <!-- <Swiper v-bind="settings">
          <SwiperSlide v-for="(product, index) in productsList" :key="index">
            <productBox1 :product="product" />
          </SwiperSlide>
        </Swiper> -->

        <div class="grid-container">
          <div
            v-for="(product, index) in productsList"
            :key="index"
            class="grid-item"
          >
            <productBox1 :product="product" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import productBox1 from "~/layout/elements/productBox/product-box1-modified.vue";
// import { searchProductSlider } from "@/static/data/SliderSettingsData.js";
let props = defineProps({
  productsList: Array,
});
</script>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
.grid-item {
  /* height: 200px;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
 
  min-width: 200px;
  max-width: 300px;
  justify-content: center; */
  text-align: center;
  display: flex;
  height: 200px;
  background: #fff;
  /* padding: 20px; */
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  /* width: fit-content; */
  min-width: 200px;
  max-width: 300px;
  justify-content: space-evenly;
  align-content: space-around;
  align-items: baseline;
  transition: box-shadow 0.5s ease; /* Smooth transition for box-shadow */
}
/* Hover effect */
.grid-item:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.7); /* Change box shadow on hover */
}
.product-box {
  margin-top: 33%;
}
</style>
