<template>
  <Head>
    Shop List
  </Head>
  <layout5 pageName="Shop Fashion" parent="Shop Listing">
    <shopList :setCardsLayout="6" :showSidebarCarousel="true">
      <template v-slot:topBanner>
        <topBanner />
      </template>
    </shopList>
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import { mapState } from "pinia";
import shopList from "~/layout/elements/shopSections/shopMain.vue";
import topBanner from "~/layout/elements/shopSections/topBanner.vue";
import { usefilterStore } from "~~/store/filters";

export default {
  components: { layout5, shopList, topBanner },
  head() {
    return {
      title: "Shop List",
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