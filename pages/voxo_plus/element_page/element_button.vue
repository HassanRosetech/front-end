<template>
  <layout5 pageName="Element Buttons" parent="Element Buttons">
    <VoxoPlusElementPageElementButtons/>
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import { useCategoriesStore } from '~~/store/categories';
import { useBannerStore } from "~~/store/banners";
export default {
  components: {
    layout5,
  },
  head() {
    return {
      title: "Element Buttons",
    };
  },
  computed: {

    categories() {
      return useCategoriesStore().data.filter((item) => item.type === "fashionDemo")[0]
        .categories
    },

    bannersList() {
      return useBannerStore().data.filter(
        (item) => item.type === "vegetables"
      );
    }
  },
};
</script>
<style lang="scss">
@import "~/assets/scss/demo2.scss";
</style>