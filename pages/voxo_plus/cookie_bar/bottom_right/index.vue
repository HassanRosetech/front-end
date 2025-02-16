<template>
  <layout1>
    <LazyHomeFashionHeroSlider />
    <LazyHomeFashionTopBanner :banners="
      banners.filter((item) => item.subtype === 'topbanner')[0].children
    " />
    <LazyHomeFashionNewArrivalCarousel :products="productsList" />

    <LazyHomeFashionOurCategory :categories="categories" :title="true" />
    <LazyHomeFashionNewOffers :banners="banners.filter((item) => item.subtype === 'newoffer')[0]" />
    <LazyHomeFashionNewArrivals :products="productsList" />
    <LazyHomeFashionDealDayBanner  :banner="banners.filter((item) => item.subtype === 'dealday')[0]" />
    <LazyHomeFashionInstagramShop  :banners="
      banners.filter((item) => item.subtype === 'instagramshop')[0].children
    " />
    <customerServices :serviceClasses="'service-style-2 section-b-space'" />
    <template v-slot:cookieBar>
      <cookieBar1 />
    </template>
    <newsLetterModal />
  </layout1>
</template>

<script>
import layout1 from "~/layout/layouts/layout1.vue";
import { useBannerStore } from "~~/store/banners";
import { useProductStore } from "~~/store/products";
import { useCategoriesStore } from '~~/store/categories';
import customerServices from "~/layout/elements/banners/customerServices.vue";
import cookieBar1 from "~/layout/elements/cookieBars/cookieBar1.vue";
import newsLetterModal from "~/layout/elements/modals/newsLetterModal.vue";
import { useLayout } from "~~/store/layout";
import { useClickStore } from "~~/store/clickEvents";

export default {
  components: {
    layout1,
    customerServices,
    cookieBar1,
    newsLetterModal,
  },
  head() {
    return {
      title: "Fashion Store",
      htmlAttrs: {
        dir: "ltr",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "2.png" }],
    };
  },

  data() {
    return {
      values: [1, 2, 3, 4, 5],
      themeCss: "/demo2.css",
    };
  },

  computed: {
    banners() {
      return useBannerStore().data.filter((item) => item.type === "fashion")
    },
    productsList() {
      return useProductStore().data.filter((item) => item.type === "fashion")
    },
    categories() {
      return useCategoriesStore().data.filter((item) => item.type === "fashionDemo")[0].categories
    },


  },
  mounted() {
    useLayout().setPrimaryColor({ primaryColor: "#e22454" })
  },
  created() {
    !useCookie('newsLetterSet').value &&
    useClickStore().toggleNewsLetterModal
    let layoutMode = useCookie("layoutType").value || "light";
    if (layoutMode === "dark") this.themeCss = "/voxo/css/demo2_dark.css";
    else this.themeCss = "/voxo/css/demo2.css";
  },
  beforeUnmount() {
    document
      .getElementById("bootstrap-link")
      .setAttribute("href", "/voxo/css/bootstrap.min.css");
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/demo2.scss";
</style>
