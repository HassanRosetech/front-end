<template>
  <div>
    <header1 :iconBgColor="iconBgColor" />

    <slot></slot>

    <footer1>
      <footerRight1 :formControlColor="formControlColor" />
    </footer1>
    <slot name="cookieBar"></slot>
    <mobileMenu />
  </div>
</template>

<script>
import header1 from "~/layout/common/headers/header1.vue";
import footer1 from "~/layout/common/footers/footer1.vue";
import footerRight1 from "~/layout/elements/footerElements/footerRight1.vue";
import mobileMenu from "~/layout/elements/navigation/mobileMenu.vue";
export default {
  props: ["iconBgColor", "formControlColor"],
  components: {
    header1,
    footer1, footerRight1, mobileMenu
  },
};
</script>