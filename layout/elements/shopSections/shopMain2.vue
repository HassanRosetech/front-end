<template>
  <section class="section-b-space">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-12 ratio_30">
          <slot name="topFilters"></slot>
          <slot name="topBanner"></slot>
          <div class="hide-button d-flex mb-3" v-if="filterHide">
            <button class="btn hide-btn" @click.prevent="toggleFilterBar">
              <span class="d-lg-inline-block">{{ useRuntimeConfig().public.const.HideFilter }}</span>
            </button>
          </div>
          <div class="row g-4">
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

          <!-- Product Section -->
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
            <div v-for="(product, index) in cards" :key="index">
              <productBox1 :product="product" />
            </div>

            <!-- Product Section -->
          </div>

          <nav class="page-section">
            <ul class="pagination">
              <li class="page-item">
                <a href="javascript:void(0)" class="page-link" @click="changePage(currentPage - 1)">
                  <i class="fas fa-chevron-left"></i>
                </a>
              </li>
              <li class="page-item" v-for="i in pages" :key="i" :class="i === currentPage ? 'active' : ''">
                <a class="page-link" href="javascript:void(0)" @click.prevent="changePage(i)">{{ i }}
                </a>
              </li>

              <li class="page-item">
                <a href="javascript:void(0)" class="page-link" @click="changePage(currentPage + 1)">
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <shopFilterbar v-if="filterbarPosition === 'right'" :filterBarClasses="filterBarClasses" />
      </div>
    </div>
  </section>
</template>

<script>
import shopFilterbar from "~/layout/elements/shopSections/shopFilterbar.vue";
import productBox1 from "~/layout/elements/productBox/product-box1.vue";
import options from "~/layout/elements/shopSections/options1.vue";
import { mapState } from "pinia";
import { usefilterStore } from '~~/store/filters';
export default {
  components: { shopFilterbar, options, productBox1 },
  props: [
    "setCardsLayout",
    "filterbarPosition",
    "filterBarClasses",
    "filterHide",
  ],
  data() {
    return {
      cardsLayout: 4,
      pages: [],
      cardsToShow: 12,
      totalCards: 8,
      currentPage: 1,
      totalPages: 2,
      selectedDiscount: 0,
      selectedColorsList: [],
    };
  },
  methods: {
    changePage(toPage) {
      if (toPage > 0 && toPage <= this.totalPages) {
        this.currentPage = toPage;
        this.calculatePages();
      }
    },
    calculatePages() {
      this.pages = [];
      var startPage, endPage;
      if (this.currentPage == 1) {
        startPage = 1;
        endPage = 4;
      } else {
        startPage = this.currentPage - 1;
        endPage = this.currentPage + 2;
      }
      for (var i = startPage; i < endPage; i++) {
        if (i <= this.totalPages) {
          this.pages.push(i);
        }
      }
    },
    toggleFilterBar() {
      useRuntimeConfig().toggleFilterBar()
    },
    removeFilter(title) {
      usefilterStore().removeFilter(title)
    },
    clearAllFilters() {
      usefilterStore().clearAllFilters()
      this.$router.push(this.$route.path);
    },
    changeCardLayout(toLayout) {
      this.cardsLayout = toLayout;
    },
    changeProductsPerPage(productsToShow) {
      this.cardsToShow = productsToShow;
      this.totalPages = Math.ceil(this.cards.length / this.cardsToShow);
      this.calculatePages();
    },
  },
  computed: {
    cards() {
      return usefilterStore().cardsToReturn
    },
    ...mapState(usefilterStore, {
      showFilters: 'showFilters',
      filtersList: 'filtersList',
      appliedFiltersList: 'appliedFilters',
    }),
  },
  watch: {
    cards: function () {
      this.totalPages = Math.ceil(this.cards.length / this.cardsToShow);
      this.changePage(1);
    },
    selectedDiscount: function () {
      usefilterStore().filterDiscount(this.selectedDiscount)
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, discount: this.selectedDiscount },
      });
    },
    selectedColorsList: function () {
      usefilterStore().setColorsList(this.selectedColorsList)
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, colors: this.selectedColorsList },
      });
    },
  },
  mounted() {
    usefilterStore().setCategory(this.category);
    var queryColors = this.$route.query.colors;
    if (typeof queryColors === "string")
      this.selectedColorsList.push(queryColors);
    else if (typeof queryColors === "object")
      this.selectedColorsList = queryColors;
    else this.selectedColorsList = [];
    this.selectedDiscount =
      this.$route.query.discount === undefined ? 0 : this.$route.query.discount;
    if (this.setCardsLayout != undefined)
      this.cardsLayout = this.setCardsLayout;
  },
};
</script>
