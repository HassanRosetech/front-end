<template>
  <layout5 pageName="Element home" parent="Element home">
    <VoxoPlusElementPageElementHomeSlider1 />
    <VoxoPlusElementPageElementHomeSlider2 />
    <VoxoPlusElementPageElementHomeSlider3 />
    <VoxoPlusElementPageElementHomeSlider4 />
    <VoxoPlusElementPageElementHomeSlider5 />
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
export default {
  components: {
    layout5,
  },

  head() {
    return {
      title: "Element Home",
      link: [{ rel: "icon", type: "image/x-icon", href: "2.png" }],
    };
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/demo1.scss";
@import "@/assets/scss/demo2.scss";
@import "@/assets/scss/demo3.scss";
@import "@/assets/scss/demo4.scss";
@import "@/assets/scss/demo5.scss";
@import "@/assets/scss/element-header.scss";
</style>
