<template>
  <Head>
    <Title>Shop Top Filter</Title>
  </Head>
  <layout5 pageName="Shop Fashion" parent="Shop Listing">
    <shopTop>
      <template v-slot:topFilters>
        <ShopShopTopFilterTopFilters/>
      </template>
    </shopTop>
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import shopTop from "~/layout/elements/shopSections/shopMain2.vue";
export default {
  components: { layout5, shopTop },
  head() {
    return {
      title: "Shop Top Filter",
    };
  },
};
</script>