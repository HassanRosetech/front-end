<template>
  <Head>
    <Title>Shop Right Sidebar</Title>
  </Head>
  <layout5 pageName="Shop Fashion" parent="Shop Listing">
    <shopRight :filterbarPosition="'right'" :showSidebarCarousel="true">
      <template v-slot:topBanner>
        <topBanner />
      </template>
    </shopRight>
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import { mapState } from "pinia";
import topBanner from "~/layout/elements/shopSections/topBanner.vue";
import shopRight from "~/layout/elements/shopSections/shopMain.vue";
import { usefilterStore } from '~~/store/filters';
export default {
  components: { layout5, shopRight, topBanner },
  head() {
    return {
      title: "Shop Right Sidebar",
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