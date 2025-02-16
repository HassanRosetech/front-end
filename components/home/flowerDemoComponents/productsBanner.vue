<template>
  <section class="ratio2_1 banner-style-2">
    <div class="container">
      <div class="row gy-4">
        <productsBannerCard v-for="(product, index) in products" :key="index" :image="product.image"
          :discount="product.discount" :productName="product.productName" :subHeading="product.subHeading" />
      </div>
    </div>
  </section>
</template>

<script>
import productsBannerCard from "~/layout/elements/bannerBoxes/bannerBox3.vue";
export default {
  components: {
    productsBannerCard,
  },
  data() {
    return {
      isLoaded: false,
      products: [
        {
          productName: "Pink Flowers",
          subHeading: "BUY ONE GET ONE FREE",
          image: "/_nuxt/assets/images/flower/banner/1.jpg",
          discount: "26",
        },
        {
          productName: "Yellow Flowers",
          subHeading: "BUY ONE GET ONE FREE",
          image: "/_nuxt/assets/images/flower/banner/2.jpg",
          discount: "50",
        },
        {
          productName: "Orange Flowers",
          subHeading: "BUY ONE GET ONE FREE",
          image: "/_nuxt/assets/images/flower/banner/3.jpg",
          discount: "36",
        },
      ],
    };
  },
  created() {
    this.isLoaded = true;
  },
};
</script>