<template>
  <Head>
    <Title>Product Right Thumbnail</Title>
  </Head>
  <layout6 parent="Products" pageName="Product Right Thumbnail">
    <ProductProductRightThumbnailShopSection />
    <productSectionRT />
  </layout6>
</template>

<script>
import layout6 from "~/layout/layouts/layout6.vue";
import productSectionRT from "~/layout/common/productsComponents/productSection.vue";
export default {
  components: { layout6, productSectionRT },
  head() {
    return {
      title: "Product Right Thumbnail",
    };
  },
};
</script>

<style lang="scss">

</style>