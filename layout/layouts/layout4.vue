<template>
  <div>
    <header4 />
    <slot></slot>
    <footer1>
      <slot name="footerRight"></slot>
    </footer1>
    <mobileMenu />
  </div>
</template>

<script>
import header4 from "~/layout/common/headers/header4.vue";
import footer1 from "~/layout/common/footers/footer1.vue";
import mobileMenu from "~/layout/elements/navigation/mobileMenu.vue";
export default {
  components: { header4, footer1, mobileMenu },
};
</script>