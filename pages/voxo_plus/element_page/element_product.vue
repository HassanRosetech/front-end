<template>
  <layout5 pageName="Element Product" parent="Element Product">
    <section class="main_section">
      <VoxoPlusElementPageElementProductSlider1 :products="productsList.filter((item) => item.type === 'fashion')" />
      <VoxoPlusElementPageElementProductSlider2 :products="productsList.filter(
        (item) => item.type === 'electronic' && item.category === 'vr'
      )
        " />
      <VoxoPlusElementPageElementProductSlider3 :products="productsList.filter((item) => item.type === 'vegetables')" />
      <VoxoPlusElementPageElementProductSlider4 :products="productsList.filter((item) => item.type === 'vegetables')" />
      <VoxoPlusElementPageElementProductSlider5 :products="productsList.filter((item) => item.type === 'furniture')" />
      <VoxoPlusElementPageElementProductSlider6 :products="productsList.filter((item) => item.type === 'fashion')" />
    </section>
  </layout5>
</template>

<script>
import { mapState } from "pinia";
import layout5 from "~/layout/layouts/layout5.vue";
import { useProductStore } from '~~/store/products';
export default {

  components: {
    layout5,
  },
  head() {
    return {
      title: "Element Product",
    };
  },
  computed: {
    ...mapState(useProductStore, {
      productsList: 'data',
    }),
  },
};
</script>
<style lang="scss">
@import "~/assets/scss/element-category.scss";
</style>