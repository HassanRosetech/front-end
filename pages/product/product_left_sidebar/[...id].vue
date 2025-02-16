<template>
  <Head>
    <Title>Product Left Sidebar</Title>
  </Head>
  <layout6 parent="Products" pageName="Product Left Sidebar" :product="product">
    <ProductProductLeftSidebarShopSection :product="product" />
    <productSectionL />
  </layout6>
</template>

<script>
import layout6 from "~/layout/layouts/layout6.vue";
import productSectionL from "~/layout/common/productsComponents/productSection.vue";
import { useProductStore } from "~~/store/products";

export default {
  components: { layout6, productSectionL },
  head() {
    return {
      title: "Product Left Sidebar",
    };
  },
  computed: {
    allProducts() {
      return useProductStore().data
    },
    product() {
      var product = this.allProducts.filter(
        (product) =>
          product.id ===
          Number(this.$route.params.id ? this.$route.params.id : 1)
      )[0];
      return product;
    },
  },

};
</script>

<style lang="scss">

</style>