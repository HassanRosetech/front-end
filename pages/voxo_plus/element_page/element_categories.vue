<template>
  <layout5 pageName="Element Category" parent="Element Category">
    <section class="overflow-hidden">
      <div class="row">
        <VoxoPlusElementPageElementCategoriesCategorySlider1 :categories="categories" />
        <VoxoPlusElementPageElementCategoriesCategorySlider2 :banners="
          bannersList.filter((item) => item.subtype === 'freshfruits')[0]
            .banners
        " />
        <VoxoPlusElementPageElementCategoriesCategorySlider3 />
      </div>
    </section>
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import { useCategoriesStore } from "~~/store/categories";
import { useBannerStore } from "~~/store/banners";
export default {
  components: {
    layout5,
  },
  head() {
    return {
      title: "Element Categories",
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
    },
  },
};
</script>
<style lang="scss">
@import "~/assets/scss/element-category.scss";
</style>