<template>
  <layout5 pageName="Element Category" parent="Element Category">
    <section>
      <VoxoPlusElementPageElementDealBannerDealBanner1 :banner="banners.filter(
        (item) => item.type === 'shoes' && item.subtype === 'dealday'
      )[0]
        " />
      <VoxoPlusElementPageElementDealBannerDealBanner2 :banner="banners.filter(
        (item) => item.type === 'vegetables' && item.subtype === 'dealday'
      )[0]
        " />
      <VoxoPlusElementPageElementDealBannerDealBanner3 :banner="banners.filter(
        (item) => item.type === 'furniture' && item.subtype === 'deal'
      )[0]
        " />
      <VoxoPlusElementPageElementDealBannerDealBanner4 :banner="banners.filter(
        (item) => item.type === 'flower' && item.subtype === 'deal'
      )[0]
        " />
    </section>
  </layout5>
</template>

<script>
import { mapState } from "pinia";
import layout5 from "~/layout/layouts/layout5.vue";
import { useBannerStore } from '~~/store/banners';
export default {
  components: {
    layout5,
  },
  head() {
    return {
      title: "Element Deal Banner",
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
@import "~/assets/scss/element-deal-banner.scss";
</style>