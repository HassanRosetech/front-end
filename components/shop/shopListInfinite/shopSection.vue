<template>
  <section class="section-b-space">
    <div class="container">
      <div class="row">
        <shopFilterbar :showFilterBar="showFilters" v-if="filterbarPosition != 'right'"
          :filterBarClasses="filterBarClasses" :showSidebarCarousel="showSidebarCarousel" />

        <div class="col-lg-9 col-12 ratio_30" :class="[{ 'col-lg-12': showFilters }]">
          <slot name="topBanner"></slot>
          <div class="hide-button d-flex mb-3" v-if="filterHide">
            <button class="danger-button danger-center btn btn-sm filter-btn" @click.prevent="toggleFilterBar">
              <span class="d-lg-inline-block" v-if="showFilters">{{
                useRuntimeConfig().public.const.ShowFilter
              }}</span>
              <span class="d-lg-inline-block" v-else>{{
                useRuntimeConfig().public.const.HideFilter
              }}</span>
            </button>
          </div>
          <div class="row g-4">
            <!-- filter button -->
            <div class="filter-button">
              <button class="danger-button danger-center btn btn-sm filter-btn" @click.prevent="toggleFilterBar">
                <vue-feather type="align-left"></vue-feather>{{ useRuntimeConfig().public.const.Filter }}
              </button>
            </div>

            <!-- filter button -->

            <!-- label and featured section -->
            <div class="col-12" v-if="filtersList.length != 0">
              <ul class="short-name">
                <li v-for="(filter, index) in filtersList" :key="index">
                  <div class="label-tag">
                    <span>{{ filter }}</span>
                    <button type="button" class="btn-close" aria-label="Close" @click="removeFilter(filter)"></button>
                  </div>
                </li>
                <li>
                  <div class="label-tag" v-if="filtersList.length != 0">
                    <a href="javascript:void(0)" @click.prevent="clearAllFilters"><span>Clear All</span></a>
                  </div>
                </li>
              </ul>
            </div>

            <options :setCardsLayout="setCardsLayout" @changeCardLayout="changeCardLayout"
              @changeProductsPerPage="changeProductsPerPage" />
          </div>
          <!-- label and featured section -->

          <!-- Product section -->
          <div class="row g-sm-4 g-3 gx-sm-4 gx-3 mt-1 custom-gy-5 product-style-2 ratio_asos product-list-section"
            :class="[
              { 'row-cols-2': cardsLayout == 2 },
              { 'row-cols-md-3 row-cols-2': cardsLayout == 3 },
              { 'row-cols-xl-4 row-cols-md-3 row-cols-2': cardsLayout == 4 },
              {
                'row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 ':
                  cardsLayout == 5,
              },
              {
                'list-style': cardsLayout == 6,
              },
            ]">
            <div v-for="(product, index) in cards.slice(0, cardsToShow)" :key="index">
              <productBox1 :product="product" />
            </div>

            <!-- Prodcut setion -->
          </div>

          <div class="load-more">
            <button class="loadMore btn btn-submit btn-full">
              <span v-if="cardsToShow < totalCards" @click.prevent="loadCards">load more</span>
              <span v-else>No More Products</span>
            </button>
          </div>
        </div>
        <shopFilterbar :showFilterBar="showFilters" v-if="filterbarPosition === 'right'"
          :filterBarClasses="filterBarClasses" :showSidebarCarousel="showSidebarCarousel" />
      </div>
    </div>
  </section>
</template>

<script>
import VueFeather from "vue-feather";
import shopFilterbar from "~/layout/elements/shopSections/shopFilterbar.vue";
import productBox1 from "~/layout/elements/productBox/product-box1.vue";
import options from "~/layout/elements/shopSections/options1.vue";
import { mapState } from "pinia";
import { useClickStore } from '~~/store/clickEvents';
import { usefilterStore } from '~~/store/filters';
export default {
  components: { shopFilterbar, options, productBox1, VueFeather },
  props: [
    "setCardsLayout",
    "filterbarPosition",
    "filterBarClasses",
    "filterHide",
    "showSidebarCarousel",
  ],
  data() {
    return {
      showFilterBar: false,
      cardsLayout: 4,
      cards: [],
      cardsToShow: 12,
      totalCards: 8,
    };
  },
  computed: {
    initCards() { return usefilterStore().cardsToReturn },
    ...mapState(useClickStore, {
      showFilters: 'shopFilterBar',
    }),
    ...mapState(usefilterStore, {
      filtersList: 'filtersList',
      appliedFiltersList: 'appliedFilters',
    }),
  },
  watch: {
    initCards: function () {
      this.cards = this.initCards.filter((item) => item.category != "vr");
    },
    cards: function () {
      this.totalCards = this.cards.length;
    },
  },
  methods: {
    loadCards() {
      this.cardsToShow += 3;
    },
    toggleResponsiveFilterBar() {
      this.showFilterBar = !this.showFilterBar;
    },

    toggleFilterBar() {
      if (this.$route.path == "/shop/shop_filter_hide")
        useClickStore().toggleShopFilterBarNoOverlay()

      else useClickStore().toggleShopFilterBar()
    },
    removeFilter(title) {
      usefilterStore().removeFilter(title)
    },
    clearAllFilters() {
      usefilterStore().clearAllFilters()
    },
    changeCardLayout(toLayout) {
      this.cardsLayout = toLayout;
    },
    changeProductsPerPage(productsToShow) {
      this.cardsToShow = productsToShow;
    },
  },
  created() {
    usefilterStore().setCategory(this.category)
  },
  mounted() {
    this.totalCards = this.cards.length;
    if (this.setCardsLayout != undefined)
      this.cardsLayout = this.setCardsLayout;
  },
};
</script>
