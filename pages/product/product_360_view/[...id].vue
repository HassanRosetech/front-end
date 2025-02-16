<template>
  <Head>
    <Title>Product 360 View</Title>
  </Head>
  <layout6 parent="Products" pageName="Product 360 View" :product="product">
  <ProductProduct360ViewShopSection :Slider360="true" />
  <productSection360 />
  </layout6>
</template>

<script>
import layout6 from "~/layout/layouts/layout6.vue";
import productSection360 from "~/layout/common/productsComponents/productSection.vue";
import { useProductStore } from '~~/store/products';
export default {
  components: { layout6, productSection360 },
  head() {
    return {
      title: "Product 360 View",
    };
  },
  computed: {
    allProducts() {
      return useProductStore().data
    },
    product() {
      if (this.$route.params.id != undefined)
        return this.allProducts.filter(
          (item) => item.id === this.$route.params.id
        );
      else return this.allProducts[0];
    },
  },
};
</script>

<style lang="scss">

</style>
