<template>
  <Head>
    <Title>Product Video Thumbnail</Title>
  </Head>
  <layout6 parent="Products" pageName="Product Left Sidebar">
    <ProductProductVideoThumbnailShopSection />
    <productSectionV />
  </layout6>
</template>

<script>
import layout6 from "~/layout/layouts/layout6.vue";
import productSectionV from "~/layout/common/productsComponents/productSection.vue";
export default {
  components: { layout6, productSectionV },
  head() {
    return {
      title: "Product Video Thumbnail",
    };
  },
};
</script>

<style lang="scss">

</style>