<template>
  <Head>
    <Title>Shop With Category</Title>
  </Head>
  <layout5 pageName="Shop Listing" parent="Shop Listing">
    <shopCategory :showSidebarCarousel="true">
      <template v-slot:topBanner>
        <ShopShopWithCategoryTopCategory />
      </template>
    </shopCategory>
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import { mapState } from "pinia";
import topBanner from "~/layout/elements/shopSections/topBanner.vue";
import shopCategory from "~/layout/elements/shopSections/shopMain.vue";
import { usefilterStore } from "~~/store/filters";
export default {
  components: { layout5, shopCategory, topBanner },
  head() {
    return {
      title: "Shop With Category ",
    };
  },
  computed: {
    ...mapState(usefilterStore, {
      showFilterBar: 'showFilters',
    }),
  },
};
</script>

<style lang="scss"></style>