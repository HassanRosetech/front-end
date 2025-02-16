<template>
  <layout5 pageName="Element Category" parent="Element Category">
    <section>
      <div class="container-fluid">
        <div class="row g-4">
          <VoxoPlusElementPageElementCollectionBannerBanner1 :banners="
            banners.filter(
              (item) =>
                item.type === 'fashion' && item.subtype === 'topbanner'
            )[0].children
          " />
          <VoxoPlusElementPageElementCollectionBannerBanner2 :banners="
            banners.filter(
              (item) =>
                item.type === 'electronic' && item.subtype === 'topbanner'
            )[0].banners
          " />
          <VoxoPlusElementPageElementCollectionBannerBanner3 :banners="
            banners.filter(
              (item) =>
                item.type === 'furniture' && item.subtype === 'topbanner'
            )[0].children
          " />
          <VoxoPlusElementPageElementCollectionBannerBanner4 :banners="
            banners.filter(
              (item) => item.type === 'flower' && item.subtype === 'topbanner'
            )[0].children
          " />
          <VoxoPlusElementPageElementCollectionBannerBanner5 :banners="
            banners.filter(
              (item) => item.type === 'fashion' && item.subtype === 'newoffer'
            )[0]
          " />
          <VoxoPlusElementPageElementCollectionBannerBanner6 :banners="
            banners.filter(
              (item) => item.type === 'shoes' && item.subtype === 'topbanner'
            )[0].banners
          " />
          <VoxoPlusElementPageElementCollectionBannerBanner7 :banners="
  banners.filter(
    (item) => item.type === 'shoes' && item.subtype === 'newoffers'
  )[0]
          " />
        </div>
      </div>
    </section>
  </layout5>
</template>

<script>
import { mapState } from "pinia";
import layout5 from "~/layout/layouts/layout5.vue";
import { useBannerStore } from "~~/store/banners";
export default {
  components: {
    layout5,
  },
  head() {
    return {
      title: "Element Collection Banner",
    };
  },
  computed: {
    ...mapState(useBannerStore, {
      banners: 'data',
    }),
  },
};
</script>
<style lang="scss">
@import "~/assets/scss/element-banner.scss";
</style>