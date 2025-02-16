<template>
  <Head>
    <Title>Shop Canvas Filter</Title>
  </Head>
  <layout5 pageName="Shop Fashion" parent="Shop Listing">
    <shopSection pageName="Shop Listing" :category="category" />
    <ShopShopCanvasFilterOffCanvasSection />
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import shopSection from "~/components/shop/shopCanvasFilter/shopSection.vue";
import { mapState } from "pinia";
import { usefilterStore } from '~~/store/filters';
export default {
  components: { shopSection, layout5 },
  data() {
    return {
      category: this.$route.params.id[0],

    };
  },
  head() {
    return {
      title: "Shop Canvas Filter",
    };
  },
  computed: {
    ...mapState(usefilterStore, {
      showFilterBar: 'showFilters',
      filtersList: 'filtersList'
    }),
  },
  methods: {
    hideFilterBar() {
      usefilterStore().toggleFilterBar()
    },
  },

};
</script>
