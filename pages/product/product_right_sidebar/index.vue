<template>
  <Head>
    <Title>Product Right Sidebar</Title>
  </Head>
  <layout6 parent="Products" pageName="Product Right Sidebar">
    <ProductProductRightSidebarShopSection />
    <productSectionR />
  </layout6>
</template>

<script>
import layout6 from "~/layout/layouts/layout6.vue";
import productSectionR from "~/layout/common/productsComponents/productSection.vue";
export default {
  components: { layout6, productSectionR },
  head() {
    return {
      title: "Product RIght Sidebar",
    };
  },
};
</script>

<style lang="scss"></style>