<template>
  <Head>
    <Title>Product No Sidebar</Title>
  </Head>
  <layout6 parent="Products" pageName="Product No Sidebar">
    <ProductProductNoSidebarShopSection />
    <productSectionN />
  </layout6>
</template>

<script>
import layout6 from "~/layout/layouts/layout6.vue";
import productSectionN from "~/layout/common/productsComponents/productSection.vue";
export default {
  components: { layout6, productSectionN },
  head() {
    return {
      title: "Product No Sidebar",
    };
  },
};
</script>

<style lang="scss">

</style>