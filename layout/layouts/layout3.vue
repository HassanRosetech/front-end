<template>
  <div>
    <header3 :offerCode="offerCode" />
    <slot></slot>
    <footer1>
      <slot name="footerRight"></slot>
    </footer1>
    <mobileMenu />
  </div>
</template>

<script>
import header3 from "~/layout/common/headers/header3.vue";
import footer1 from "~/layout/common/footers/footer1.vue";
import mobileMenu from "~/layout/elements/navigation/mobileMenu.vue";

export default {
  components: { header3, footer1, mobileMenu },
  props: ["offerCode"],
};
</script>