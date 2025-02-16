<template>
  <Head>
    <Title>Shop Left Sidebar</Title>
  </Head>
  <layout5 pageName="Shop Fashion" parent="Shop Listing">
    <shopLeft :showSidebarCarousel="true">
      <template v-slot:topBanner>
        <topBanner />
      </template>
    </shopLeft>
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import { mapState } from "pinia";
import topBanner from "~/layout/elements/shopSections/topBanner.vue";
import shopLeft from "~/layout/elements/shopSections/shopMain.vue";
import { usefilterStore } from "~~/store/filters";
export default {
  components: { layout5, shopLeft, topBanner },
  head() {
    return {
      title: "Shop Left Sidebar",
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