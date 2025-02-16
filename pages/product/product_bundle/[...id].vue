<template>
  <Head>
    <Title>Product Bundle</Title>
  </Head>
  <layout6 parent="Products" pageName="Product Bundle">
    <ProductProductBundleShopSection />
    <productSectionB />
  </layout6>
</template>

<script>
import layout6 from "~/layout/layouts/layout6.vue";
import productSectionB from "~/layout/common/productsComponents/productSection.vue";
export default {
  components: { layout6, productSectionB },
  head() {
    return {
      title: "Product Bundle",
    };
  },
};
</script>

<style lang="scss">

</style>