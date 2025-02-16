<template>
  <div>
    <header2 />
    <slot></slot>
    <footer1>
      <footerRight2 />
    </footer1>
    <cookieBar3 />
    <mobileMenu />
  </div>
</template>

<script>
import header2 from "~/layout/common/headers/header2.vue";
import footer1 from "~/layout/common/footers/footer1.vue";
import footerRight2 from "~/layout/elements/footerElements/footerRight2.vue";
import cookieBar3 from "~/layout/elements/cookieBars/cookieBar3.vue";
import mobileMenu from "~/layout/elements/navigation/mobileMenu.vue";
export default {
  components: {
    header2,
    footer1,
    footerRight2,
    cookieBar3,
    mobileMenu,
  },
};
</script>