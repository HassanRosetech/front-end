<template>
  <layout3 :offerCode="offerCode">
    <HomeElectronicDemoComponentsHomeSlider :slides="slides" />
    <customerServices />
    <HomeElectronicDemoComponentsElectronicBanner :banners="bannersList.filter((item) => item.subtype === 'topbanner')[0].banners
      " />
    <HomeElectronicDemoComponentsOurCollectionCarousel :products="productsList" />
    <HomeElectronicDemoComponentsBannerWithTimer :banner="bannersList.filter((item) => item.subtype === 'dealday')[0]" />
    <HomeElectronicDemoComponentsVrCollectionCarousel :products="productsList.filter((item) => item.category === 'vr')" />
    <HomeElectronicDemoComponentsHurryUpBanner :tabList="hurryUpBannersList.filter((item) => item.subtype === 'hurryup')[0].tabs
      " />
    <HomeElectronicDemoComponentsInstagramShop :banners="bannersList.filter((item) => item.subtype === 'instagramshop')[0]
        .children
      " />
    <brandCarousel />
    <template v-slot:footerRight>
      <footerRight1 />
    </template>
    <cookieBar1 cookieBarClasses="cookiebar-left-section" />
    <newsLetterModal />
  </layout3>
</template>

<script>
import layout3 from "~/layout/layouts/layout3.vue";
import cookieBar1 from "~/layout/elements/cookieBars/cookieBar1.vue";
import { useProductStore } from '~~/store/products';
import { useBannerStore } from '~~/store/banners';
import { useLayout } from '~~/store/layout';
import { useClickStore } from "~~/store/clickEvents";
import { useHomeSliderStore } from "~~/store/homeSliders";
import customerServices from "~/layout/elements/banners/customerServices.vue";
import brandCarousel from "~/layout/elements/banners/brand.vue";
import footerRight1 from "~/layout/elements/footerElements/footerRight1.vue";
import newsLetterModal from "~/layout/elements/modals/newsLetterModal.vue";

export default {
  components: {
    layout3,
    cookieBar1,
    customerServices,
    brandCarousel,
    footerRight1,
    newsLetterModal,
  },
  head() {
    return {
      title: "Electronic Store",
      link: [{ rel: "icon", type: "image/x-icon", href: "1.png" }],
    };
  },
  data() {
    return {
      offerCode: "DEF4526",
      themeCss: "/voxo/css/demo1.css",
    };
  },

  computed: {
    productsList() {
      return useProductStore().data.filter(
        (item) => item.type === "electronic"
      );
    },
    slides() {
      return useHomeSliderStore().data.filter(
        (item) => item.type === "electronic"
      )[0].slides;
    },
    hurryUpBannersList() {
      return useBannerStore().tabsBanners.filter(
        (item) => item.type === "electronic"
      );
    },
    bannersList() {
      return useBannerStore().data.filter(
        (item) => item.type === "electronic"
      );
    },
  },
  created() {
    useLayout().setPrimaryColor({ primaryColor: "#0163d2" })
    let layoutMode = 'light';

    if (layoutMode === "dark") this.themeCss = "/voxo/css/demo1_dark.css";
    else this.themeCss = "/voxo/css/demo1.css";
  },
  mounted() {
    !useCookie('newsLetterSet').value &&
      useClickStore().toggleNewsLetterModal()
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/demo1.scss";
</style>
