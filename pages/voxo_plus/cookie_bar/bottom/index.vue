<template>
  <layout1 iconBgColor="theme-bg-color" :formControlColor="'color-4'">
    <template v-slot:cookieBar>
      <cookieBar2 />
    </template>

    <HomeFurnitureDemoComponentsHomeSlider />
    <HomeFurnitureDemoComponentsBanner :banners="bannersList.filter((item) => item.subtype === 'topbanner')[0].children
      " />
    <HomeFurnitureDemoComponentsNewArrival :products="products" />
    <HomeFurnitureDemoComponentsDealDayBanner :banner="bannersList.filter((item) => item.subtype === 'deal')[0]" />
    <HomeFurnitureDemoComponentsCarousels />
    <HomeFurnitureDemoComponentsOurProducts :products="products" />
    <HomeFurnitureDemoComponentsHurryUp :tabList="hurryUpBannersList.filter((item) => item.subtype === 'hurryup')[0].tabs
      " />
    <HomeFurnitureDemoComponentsInstagramShop :banners="bannersList.filter((item) => item.subtype === 'instagramshop')[0]
        .children
      " />
    <service serviceClasses="service-style-2 section-b-space" />
    <newsLetterModal />
  </layout1>
</template>

<script>
import layout1 from "~/layout/layouts/layout1.vue";
import service from "~/layout/elements/banners/customerServices.vue";
import { useBannerStore } from "~~/store/banners";
import { useProductStore } from "~~/store/products";
import { useCategoriesStore } from '~~/store/categories';
import { useLayout } from "~~/store/layout";
import { useClickStore } from "~~/store/clickEvents";
import cookieBar2 from "~/layout/elements/cookieBars/cookieBar2.vue";
import newsLetterModal from "~/layout/elements/modals/newsLetterModal.vue";
export default {
  components: {
    layout1,
    cookieBar2,
    service,
    newsLetterModal,
  },
  head() {
    return {
      title: "Furniture Store",
      link: [{ rel: "icon", type: "image/x-icon", href: "4.png" }],
    };
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    bannersList() {
      return useBannerStore().data.filter((banner) => banner.type === "furniture")
    },
    productsList() {
      return useProductStore().data.filter((item) => item.type === "furniture")
    },
    categories() {
      return useCategoriesStore().data.filter((item) => item.type === "flowers")[0].categories
    },
    hurryUpBannersList() {
      return useBannerStore().tabsBanners.filter((item) => item.type === "furniture")
    },

  },
  methods: {
    productsArray() {
      this.productsList.map((item) => {
        if (item.type === "furniture") {
          this.products.push(item);
        }
      });
    },
  },
  mounted() {
    !useCookie('newsLetterSet').value &&
      useClickStore().toggleNewsLetterModal();

    useLayout().setPrimaryColor({ primaryColor: "#e87316" })
    let layoutMode = useCookie("layoutType").value || "light";
    if (layoutMode === "dark") this.themeCss = "/voxo/css/demo4_dark.css";
    else this.themeCss = "/voxo/css/demo4.css";
  },
  created() {
    this.productsArray();
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/demo4.scss";
</style>