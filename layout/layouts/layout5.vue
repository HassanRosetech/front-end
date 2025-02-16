<template>
  <div>
    <header1 />
    <breadcrumb1 v-if="breadcrumb" :parent="parent" :pageName="pageName" />
    <slot v-else name="breadcrumb"></slot>
    <slot></slot>
    <subscribe />
    <footer1>
      <footerRight />
    </footer1>
    <mobileMenu />
  </div>
</template>

<script>
import header1 from "~/layout/common/headers/header1.vue";
import breadcrumb1 from "~/layout/elements/breadcrumbs/breadcrumb1.vue";
import subscribe from "~/layout/elements/banners/subscribe.vue";
import footer1 from "~/layout/common/footers/footer1.vue";
import footerRight from "~/layout/elements/footerElements/footerRight1.vue";
import mobileMenu from "~/layout/elements/navigation/mobileMenu.vue";
export default {
  components: {
    header1,
    breadcrumb1,
    subscribe,
    footer1,
    footerRight,
    mobileMenu,
  },
  props: {
    pageName: {
      type: String,
    },
    parent: {
      type: String,
    },
    breadcrumb: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      themeCss: "/demo2.css",
    };
  },
  head() {
    return {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    };
  },
  created() {
    let layoutMode = useCookie("colorMode").value || 'light';
    if (layoutMode === "dark") this.themeCss = "/voxo/css/demo2_dark.css";
    else this.themeCss = "/voxo/css/demo2.css";
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/demo2.scss";
</style>
