<template>
  <layout4>
    <HomeVegetableDemoComponentsHomeSlider/>
    <customerServices />
    <HomeVegetableDemoComponentsVegetableBanner :banners="
      bannersList.filter((item) => item.subtype === 'topbanner')[0].banners
    " />
    <HomeVegetableDemoComponentsFreshFruitsCarousel :products="productsList" />
    <HomeVegetableDemoComponentsProductsSection :products="productsList" />
    <HomeVegetableDemoComponentsBannerWithTimer :banner="bannersList.filter((item) => item.subtype === 'dealday')[0]" />
    <HomeVegetableDemoComponentsPromoCode/>
    <HomeVegetableDemoComponentsNewArrivalSection :banners="
      bannersList.filter((item) => item.subtype === 'freshfruits')[0].banners
    " />
    <HomeVegetableDemoComponentsHurryUpBanner :bannersList="
      bannersList.filter((item) => item.subtype === 'hurryup')[0].banners
    " />
    <HomeVegetableDemoComponentsNewsAndUpdate :banners="
  bannersList.filter((item) => item.subtype === 'ourblog')[0].banners
    " />
    <subscribe />
    <brand />
    <cookieBar2 cookieBarClasses="veg-cookiebar" />
    <template v-slot:footerRight>
      <footerRight2 />
    </template>
    <newsLetterModal />
  </layout4>
</template>

<script>
import layout4 from "~/layout/layouts/layout4.vue";
import cookieBar2 from "~/layout/elements/cookieBars/cookieBar2.vue";
import newsLetterModal from "~/layout/elements/modals/newsLetterModal.vue";

import subscribe from "~/layout/elements/banners/subscribe.vue";
import brand from "~/layout/elements/banners/brand.vue";
import customerServices from "~/layout/elements/banners/customerServices.vue";
import footerRight2 from "~/layout/elements/footerElements/footerRight2.vue";
import { useBannerStore } from '~~/store/banners';
import { useProductStore } from '~~/store/products';
import { useClickStore } from '~~/store/clickEvents';
import { useLayout } from '~~/store/layout'
export default {
  components: {
    layout4,
    cookieBar2,
    footerRight2,
    customerServices,
    subscribe,
    brand,
    newsLetterModal,
  },
  head() {
    return {
      title: "Vegetable Store",
      link: [{ rel: "icon", type: "image/x-icon", href: "6.png" }],
    };
  },
  computed: {
    productsList() {
      return useProductStore().data.filter(
        (item) => item.type === "vegetables"
      );
    },
    bannersList() {
      return useBannerStore().data.filter(
        (item) => item.type === "vegetables"
      );
    },
  },
  created() {
    useLayout().setPrimaryColor({ primaryColor: "#51983c" })
    let layoutMode = 'light'

    if (layoutMode === "dark") this.themeCss = "/voxo/css/demo6_dark.css";
    else this.themeCss = "/voxo/css/demo6.css";
  },
  mounted() {
    !useCookie('newsLetterSet').value &&
      useClickStore().toggleNewsLetterModal()
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/demo6.scss";
</style>
