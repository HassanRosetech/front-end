<template>
  <section class="ratio_asos overflow-hidden">
    <div class="container p-sm-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="title-3 text-center">
            <h2>{{ useRuntimeConfig().public.const.NewArrival }}</h2>
            <h5 class="theme-color">{{ useRuntimeConfig().public.const.OurCollection }}</h5>
          </div>
        </div>
      </div>
      <div class="row g-sm-4 g-3">
        <div class="col-xl-3 col-lg-4 col-6" v-for="(product, index) in products.slice(0, 8)" :key="index">
          <productBox3 :product="product" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueFeather from "vue-feather";
import productBox3 from "~/layout/elements/productBox/product-box3.vue";

export default {
  components: { VueFeather, productBox3 },
  props: ["products"],
  data() {
    return {
      isLoaded: false,
    };
  },
};
</script>
