<template>
  <Head>
    <Title>Shop List Infinite</Title>
  </Head>
  <layout5 pageName="Shop Fashion" parent="Shop Listing">
    <shopInfinite :showSidebarCarousel="true" />
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import { mapState } from "pinia";
import shopInfinite from "~/components/shop/shopListInfinite/shopSection.vue";
import { usefilterStore } from '~~/store/filters';
export default {
  components: { layout5, shopInfinite },
  head() {
    return {
      title: "Shop List Infinite",
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