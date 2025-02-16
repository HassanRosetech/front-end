<template>
  <Head>
    <Title>Shop Category Filter</Title>
  </Head>
  <layout5 pageName="Shop Fashion" parent="Shop Listing">
    <ShopShopCategoryFilterCategorySlider/>
    <shopCategory :showRating="true" />
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import shopCategory from "~/layout/elements/shopSections/shopMain.vue";

import { usefilterStore } from "~~/store/filters";
export default {
  components: { layout5, shopCategory },
  computed: {
    showFilterBar() {
      return usefilterStore().showFilters;
    },
  },
  head() {
    return {
      title: "Shop Category Slider",
    };
  },
};
</script>

<style lang="scss">

</style>