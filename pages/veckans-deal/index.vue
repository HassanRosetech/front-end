<template>
  <Head>
    <Title>Veckans Deal</Title>
    <Link rel="icon" href="/favicons/1.png"> </Link>
  </Head>
  <layout3 :offerCode="offerCode">
    <HomeElectronicDemoComponentsHurryUpBanner
      :tabList="
        hurryUpBannersList.filter((item) => item.subtype === 'hurryup')[0].tabs
      "
    />

    <template v-slot:footerRight>
      <footerRight1 />
    </template>
  </layout3>
</template>

<script>
import layout3 from "~/layout/layouts/layout3.vue";
import { useBannerStore } from "~~/store/banners";
import { useLayout } from "~~/store/layout";
import footerRight1 from "~/layout/elements/footerElements/footerRight1.vue";

export default {
  components: {
    layout3,

    footerRight1,
  },
  head() {
    return {
      title: "Veckans Deal",
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
    hurryUpBannersList() {
      return useBannerStore().tabsBanners.filter(
        (item) => item.type === "electronic"
      );
    },
  },
  created() {
    useLayout().setPrimaryColor({ primaryColor: "#0163d2" });
    let layoutMode = useCookie("layoutType").value || "light";

    if (layoutMode === "dark") this.themeCss = "/voxo/css/demo1_dark.css";
    else this.themeCss = "/voxo/css/demo1.css";
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/demo1.scss";
</style>
