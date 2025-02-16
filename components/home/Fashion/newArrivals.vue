<template>
  <section class="ratio_asos">
    <div class="container">
      <div class="row m-0">
        <div class="col-sm-12 p-0">
          <div class="title title-2 text-center">
            <h2>{{ useRuntimeConfig().public.const.NewArrival }}</h2>
            <h5 class="text-color">{{ useRuntimeConfig().public.const.OurCollection }}</h5>
          </div>
          <div class="product-wrapper product-style-2 row g-sm-4 g-3">
            <div class="col-xl-3 col-lg-4 col-6" v-for="(product, index) in products" :key="index">
              <productBox1 :product="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import productBox1 from "~/layout/elements/productBox/product-box1.vue";
export default {
  components: {
    productBox1,
  },
  props: ["products"],
  data() {
    return {
      isLoaded: false,
    };
  },
  created() {
    this.isLoaded = true;
  },
};
</script>
