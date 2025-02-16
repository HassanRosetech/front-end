<template>
  <Head>
    <Title>Shop Filter Hide</Title>
  </Head>
  <layout5 pageName="Shop Fashion" parent="Shop Listing">
    <shopHide :isMobileView="isMobileView" :showPriceRange2="true" :showSizeListInComponent="true"
      :filterBarClasses="'category-side'" :filterHide="!isMobileView" :showSidebarCarousel="false" />
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import shopHide from "~/layout/elements/shopSections/shopMain.vue";
export default {
  components: { layout5, shopHide },
  data() {
    return {
      isMobileView: false,
      windowWidth: 0,
    };
  },
  head() {
    return {
      title: "Shop Filter Hide",
    };
  },
  computed: {
    showFilterBar() {
      usefilterStore().showFilters
    },
  },
  watch: {
    windowWidth: function () {
      if (this.windowWidth < 990) this.isMobileView = true;
      else this.isMobileView = false;
    },
  },
  methods: {
    handleWindowWidth() {
      this.windowWidth = screen.availWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowWidth);
  },
};
</script>

<style lang="scss">

</style>