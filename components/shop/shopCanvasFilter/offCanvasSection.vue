

<template>
  <div class="offcanvas custome-offcanvas offcanvas-start" :class="showFilters ? 'show' : ''"
    :style="{ visibility: showFilters ? 'visible' : 'hidden' }">
    <div class="offcanvas-body">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">
          {{ useRuntimeConfig().public.const.Close }}
        </h5>
        <button type="button" class="btn-close text-reset" @click.prevent="hideFilterBar"></button>
      </div>
      <div class="category-option show">
        <div class="accordion category-name" id="accordionExample">
          <div class="accordion-item category-rating">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button" type="button" @click.prevent="toggleFilterBox('brand')"
                :class="filterBoxes['brand'] ? '' : 'collapsed'">
                {{ useRuntimeConfig().public.const.Brand }}
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" :class="filterBoxes['brand'] ? 'show' : 'collapse'">
              <div class="accordion-body category-scroll">
                <ul class="category-list">
                  <li v-for="(brand, index) in brandFilters" :key="index">
                    <div class="form-check ps-0 custome-form-check" v-if="brand">
                      <input class="checkbox_animated check-it" type="checkbox" :id="brand" :value="brand"
                        v-model="filtersList" />
                      <label class="form-check-label" :for="brand">{{
                        brand
                      }}</label>
                      <p class="font-light">
                        ({{
                          allProducts.filter((item) => item.brand === brand)
                            .length
                        }})
                      </p>
                    </div>
                  </li>
                  <!-- <li v-else>No Filters available</li> -->
                </ul>
              </div>
            </div>
          </div>

          <div class="accordion-item category-color">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button" type="button" @click.prevent="toggleFilterBox('color')"
                :class="filterBoxes['color'] ? '' : 'collapsed'">
                Color
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse"
              :class="filterBoxes['color'] ? 'show' : 'collapse'">
              <div class="accordion-body">
                <ul class="category-list">
                  <li v-for="(color, index) in colors" :key="index">
                    <input type="checkbox" class="colorCheckbox" :value="color" v-model="selectedColorsList" />
                    <div class="colorDiv" :style="{ 'background-color': color }"></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="accordion-item category-price">
            <h2 class="accordion-header" id="headingFour">
              <button class="accordion-button" type="button" @click.prevent="toggleFilterBox('price')"
                :class="filterBoxes['price'] ? '' : 'collapsed'">
                {{ useRuntimeConfig().public.const.Prices }}
              </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse"
              :class="filterBoxes['price'] ? 'show' : 'collapse'">
              <div class="accordion-body">
                <div class="range-slider category-list">
                  {{ maxPrice  +'jemin' }}
                  <VueSlider v-model="priceRange" :min="0" :max="108" ref="slider" :tooltip="'always'"
                    :enableCross="false">
                  </VueSlider>
                </div>
              </div>
            </div>
          </div>

          <div class="accordion-item category-rating">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" @click.prevent="toggleFilterBox('category')"
                :class="filterBoxes['category'] ? '' : 'collapsed'">
                {{ useRuntimeConfig().public.const.Category }}
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse"
              :class="filterBoxes['category'] ? 'show' : 'collapse'" aria-labelledby="headingOne">
              <div class="accordion-body category-scroll">
                <ul class="category-list">
                  <li v-for="(category, index) in categories" :key="index">
                    <div class="form-check ps-0 custome-form-check">
                      <input class="checkbox_animated check-it" type="radio" :value="category" v-model="selectedCategory"
                        name="flexRadioDefault" :id="category" />
                      <label class="form-check-label" :for="category">{{ category }}
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFive">
              <button class="accordion-button" type="button" @click.prevent="toggleFilterBox('discount')"
                :class="filterBoxes['discount'] ? '' : 'collapsed'">
                {{ useRuntimeConfig().public.const.DiscountRange }}
              </button>
            </h2>
            <div id="collapseFive" class="accordion-collapse collapse"
              :class="filterBoxes['discount'] ? 'show' : 'collapse'" aria-labelledby="headingFive">
              <div class="accordion-body">
                <ul class="category-list">
                  <li v-for="(discount, index) in discounts" :key="'f' + index">
                    <div class="form-check ps-0 custome-form-check">
                      <input class="checkbox_animated check-it" type="radio" :value="discount" v-model="selectedDiscount"
                        name="flexRadioDefault" :id="discount" />
                      <label class="form-check-label" :for="discount"><span v-if="discount === 'All'">All</span>
                        <span v-else>{{ discount }}% and above</span></label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from "pinia";
import "vue-slider-component/theme/material.css";
import { usefilterStore } from '~~/store/filters';
import { useClickStore } from "~~/store/clickEvents";
export default {
  components: {

  },
  data() {
    return {
      filterBoxes: {
        brand: true,
        color: true,
        price: true,
        category: true,
        discount: true,
      },
      priceRange: [10],
      discounts: [0, 5, 10, 20],
      cleared: false,
      filtersList: [],
      colors: ["red", "pink", "green", "orange", "grey"],
      selectedColorsList: [],
      selectedDiscount: 0,
      selectedCategory: this.$route.params.id[0] || "all",
      categories: [],
    };
  },
  computed: {
    ...mapState(usefilterStore, {

      appliedFilters: 'filtersList',
      allProducts: 'allCards',
    }),
    ...mapState(useClickStore, {
      showFilters: 'shopFilterBar',
    }),
    maxPrice() {
      return usefilterStore().maxPrices
    },
    brandFilters() {
      return usefilterStore().brandFilters
    },
    initCards() {
      return usefilterStore().cardsToReturn
    },
    categoriesList() {
      return usefilterStore().categories
    },
    brandFiltersList() {
      usefilterStore().filtersList
    },
  },
  watch: {
    priceRange: function () {
      usefilterStore().priceRangeChange(this.priceRange)
    },
    appliedFilters: function () {
      if (this.appliedFilters.length === 0 && !this.cleared) {
        this.filtersList = [];
        this.cleared = true;
      } else {
        this.cleared = false;
      }
    },
  },
  methods: {
    toggleFilterBox(box) {
      this.filterBoxes[box] = !this.filterBoxes[box];
    },
    hideFilterBar() {
      useClickStore().toggleShopFilterBar()
    },
    filterWithColor(color) {
      usefilterStore().filterWithColor(color)
    },
  },
  created() {
    this.priceRange[1] = this.maxPrice - this.maxPrice / 10;
  },
  filtersList: {
    handler() {

      usefilterStore().setFiltersList(this.filtersList)
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, filters: this.filtersList },
      });
    }, deep: true
  },
  selectedDiscount: function () {
    usefilterStore().filterDiscount(this.selectedDiscount)
    this.$router.push({
      path: this.$route.path,
      query: { ...this.$route.query, discount: this.selectedDiscount },
    });
  },
  selectedCategory: function () {
    this.$router.push("/shop/shop_canvas_filter/" + this.selectedCategory);
  },
  selectedColorsList: function () {
    usefilterStore().setColorsList(this.selectedColorsList)
    this.$router.push({
      path: this.$route.path,
      query: { ...this.$route.query, colors: this.selectedColorsList },
    });
  },
  mounted() {
    this.categories.push("all");
    this.categories.push(...this.categoriesList);
    var queryFilters = this.$route.query.filters;
    var queryColors = this.$route.query.colors;
    if (typeof queryFilters === "string") {

      this.filtersList.push(queryFilters)
    }



    else if (typeof queryFilters === "object") this.filtersList = queryFilters;
    else this.filtersList = [];

    if (typeof queryColors === "string")
      this.selectedColorsList.push(queryColors);
    else if (typeof queryColors === "object")
      this.selectedColorsList = queryColors;
    else this.selectedColorsList = [];
    this.selectedDiscount =
      this.$route.query.discount === undefined ? 0 : this.$route.query.discount;
  },
};
</script>
<style lang="scss" scoped>
.colorDiv {
  height: 30px;
  width: 30px;
  border-radius: 3px;
}

.colorCheckbox {
  position: absolute;
  width: 30px;
  height: 30px;
  opacity: 0;
  cursor: pointer;
}

input[type="checkbox"]:checked~div {
  border: 1px solid #222;
}
</style>
