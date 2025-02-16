<template>
  <Head>
    <Title>Product Left Thumbnail</Title>
  </Head>
  <layout6 parent="Products" pageName="Product Left Thumbnail">
    <ProductProductLeftThumbnailShopSection/>
    <productSectionT />
  </layout6>
</template>

<script>
import layout6 from "~/layout/layouts/layout6.vue";
import productSectionT from "~/layout/common/productsComponents/productSection.vue";
export default {
  components: { layout6, productSectionT },
  head() {
    return {
      title: "Product Left Thumbnail",
    };
  },
};
</script>

<style lang="scss">

</style>