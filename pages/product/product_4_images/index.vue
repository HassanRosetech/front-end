<template>
  <Head>
    <Title>Product 4 Image</Title>
  </Head>
  <layout6 pageName="Product 4 Image" parent="Products" :product="product">
    <ProductProduct4ImagesShopSection :product="product" />
    <productSection4 />
  </layout6>
</template>

<script>
import layout6 from "~/layout/layouts/layout6.vue";
import productSection4 from "~/layout/common/productsComponents/productSection.vue";
import { mapState } from "pinia";
import { useProductStore } from "~~/store/products";
import { usefilterStore } from "~~/store/filters";
export default {
  components: { layout6, productSection4 },
  head() {
    return {
      title: "Product 4 Image",
    };
  },
  computed: {
    ...mapState(usefilterStore, {
      showFilterBar: 'showFilters',
    }),
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