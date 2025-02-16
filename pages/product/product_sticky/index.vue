<template>
  <Head>
    <Title>Product Sticky</Title>
  </Head>
  <layout6 parent="Products" pageName="Product Sticky">
    <ProductProductStickyShopSection />
    <productSectionS />
  </layout6>
</template>

<script>
import layout6 from "~/layout/layouts/layout6.vue";
import productSectionS from "~/layout/common/productsComponents/productSection.vue";
export default {
  components: { layout6, productSectionS },
  head() {
    return {
      title: "Product Sticky",
    };
  },
};
</script>

<style lang="scss"></style>