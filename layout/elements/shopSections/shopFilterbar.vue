<template>
  <div class="col-lg-3 col-md-4" :class="[filterBarClasses, { show: showFilters && !isMobileView }]">
    <div class="category-option" :class="[{ show: showFilters }]">
      <div class="button-close mb-3">
        <button class="btn p-0" @click.prevent="toggleFilterBar">
          <vue-feather type="arrow-left"></vue-feather> Close
        </button>
      </div>
      <div class="accordion category-name" id="accordionExample">
        <div class="accordion-item category-rating">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
              {{ useRuntimeConfig().public.const.Brand }}
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
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
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion-item category-color" v-if="colors.length > 0">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
              Color
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse show" aria-labelledby="headingThree"
            data-bs-parent="#accordionExample">
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

        <div class="accordion-item category-rating" v-if="showRating">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              Ratings
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne">
            <div class="accordion-body">
              <ul class="category-list">
                <li v-for="stars in [5, 4, 3, 2, 1]" :key="stars">
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" :value="stars" v-model="selectedRatingStars" type="checkbox"
                      id="flexCheckDefault10" />
                    <ul class="rating mt-0">
                      <li class="rating-list" v-for="(star, index) in stars" :key="'a' + index">
                        <i class="fas fa-star theme-color"></i>
                      </li>
                      <li class="rating-list" v-for="(star, index) in 5 - stars" :key="'b' + index">
                        <i class="fas fa-star"></i>
                      </li>
                    </ul>
                    <p class="font-light">
                      ({{
                        initCards.filter((item) => item.ratingStars === stars)
                          .length
                      }})
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion-item category-price" v-if="showPriceRange2">
          <h2 class="accordion-header" id="headingFour">
            <button class="accordion-button" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapsePriceRange2">
              {{ useRuntimeConfig().public.const.Prices }}
            </button>
          </h2>
          <div id="collapsePriceRange2" class="accordion-collapse collapse show" aria-labelledby="headingFour"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ul class="category-list category-list-box">
                <li @click.prevent="
                  setPriceRange(0, priceRangeList[priceRangeList.length - 1])
                ">
                  <a href="javascript:void(0)">All Products</a>
                </li>
                <li v-for="(price, index) in priceRangeList" :key="'b' + index" @click.prevent="
                  setPriceRange(price, priceRangeList[index + 1])
                ">
                  <a href="javascript:void(0)">$ {{ price }} - $75</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion-item category-price" v-else>
          <h2 class="accordion-header" id="headingFour">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
              {{ useRuntimeConfig().public.const.Prices }}
            </button>
          </h2>
          <div id="collapseFour" class="accordion-collapse collapse show" aria-labelledby="headingFour"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div class="range-slider category-list">
                {{ maxPrice  +'jemin' }}
                <VueSlider v-model="priceRange" :min="0" :max=" 1000" ref="slider" :tooltip="'always'">
                </VueSlider>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion-item category-price" v-if="showSizeList">
          <h2 class="accordion-header" id="headingFive">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSizeList">
              Size
            </button>
          </h2>

          <div id="collapseSizeList" class="accordion-collapse collapse show" aria-labelledby="headingFive"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ul class="category-list category-list-box">
                <li @click.prevent="setSizeFilter('')">
                  <a href="javascript:void(0)">All Sizes</a>
                </li>
                <li v-for="(size, index) in sizeListArray" :key="index" @click.prevent="setSizeFilter(size)">
                  <a href="javascript:void(0)">{{ size }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion-item category-rating">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseCategoryList">
              {{ useRuntimeConfig().public.const.Category }}
            </button>
          </h2>
          <div id="collapseCategoryList" class="accordion-collapse collapse show" aria-labelledby="headingOne">
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
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
              {{ useRuntimeConfig().public.const.DiscountRange }}
            </button>
          </h2>
          <div id="collapseFive" class="accordion-collapse collapse show" aria-labelledby="headingFive"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ul class="category-list">
                <li v-for="(discount, index) in discounts" :key="'f' + index">
                  <div class="form-check ps-0 custome-form-check">
                    <input class="checkbox_animated check-it" type="radio" :value="discount" v-model="selectedDiscount"
                      name="flexRadioDefault" :id="discount" />
                    <label class="form-check-label" :for="discount"><span v-if="discount === 0">All</span>
                      <span v-else>{{ discount }}% and above</span></label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <mostPopularCarousel v-if="showSidebarCarousel" />
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from "pinia";
import "vue-slider-component/theme/material.css";
import VueFeather from "vue-feather";
import mostPopularCarousel from "~/layout/common/shopComponents/mostPopularCarousel.vue";
import { useClickStore } from '~~/store/clickEvents';
import { usefilterStore } from '~~/store/filters';

export default {
  components: { mostPopularCarousel, VueFeather },
  props: [
    "filterBarClasses",
    "showFilterBar",
    "showSidebarCarousel",
    "showSizeListInComponent",
    "showRating",
    "showPriceRange2",
    "isMobileView",
  ],
  data() {
    return {
      showSizeList: false,
      sizeListArray: [],
      selectedRatingStars: [],
      filterBoxes: {
        brand: true,
        color: true,
        price: true,
        category: true,
        discount: true,
      },
      priceRangeList: [],
      priceRange: [10],
      discounts: [0, 5, 10, 20],
      cleared: false,
      filtersList: [],
      colors: ["red", "pink", "green", "orange", "grey"],
      selectedColorsList: [],
      selectedCategory: "all",
      selectedDiscount: 0,
      categories: [],
    };
  },
  computed: {
    ...mapState(useClickStore, {
      showFilters: 'shopFilterBar',

    }),
    ...mapState(usefilterStore, {
      allProducts: 'allCards',
      appliedFilters: 'filtersList',
    }),
    maxPrice() {
      return usefilterStore().maxPrices
    },
    initCards() {
      return usefilterStore().cardsToReturn
    },
    brandFilters() {
      return usefilterStore().brandFilters
    },
    categoriesList() {
      return usefilterStore().categories
    },

    brandFiltersList() {
      return usefilterStore().filtersList
    },
  },
  watch: {
    initCards: function () {
      if (this.showSizeListInComponent) {
        var toReturn = false;
        this.initCards.every((item) => {
          if (Array.isArray(item.sizeoption) && item.sizeoption.length > 0) {
            toReturn = true;
            return false;
          }
        });
        if (toReturn) this.setSizeList();
        this.showSizeList = toReturn;
      }
      var colorsList = [];
      this.colors = [];
      this.initCards.forEach((item) => {
        colorsList.push(...item.colors);
      });
      this.colors = [...new Set(colorsList)];
    },
    selectedRatingStars: function () {
    
      usefilterStore().setRatingStarsFilter({
        selectedRatingStars: this.selectedRatingStars,
      })
    },
    priceRange: function () {
      usefilterStore().priceRangeChange(this.priceRange)
    },
    maxPrice: function () {
      this.calcPriceList(this.maxPrice);
      this.priceRange[1] = this.maxPrice - this.maxPrice / 10;
    },
    appliedFilters: function () {
      if (this.appliedFilters.length === 0 && !this.cleared) {
        this.filtersList = [];
        this.cleared = true;
      } else {
        this.cleared = false;
      }
    },
    filtersList: function () {
      usefilterStore().setFiltersList(this.filtersList)
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, filters: this.filtersList },
      });
    },
    selectedCategory: function () {
      usefilterStore().setCategory(this.selectedCategory)
      this.$router.push({
        name: this.$route.name,
        params: { id: this.selectedCategory },
      });
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
  methods: {
    setSizeFilter(size) {
      usefilterStore().setSelectedSize({ selectedSize: size })
    },
    setSizeList() {
      var sizeListArray = [];
      this.initCards.forEach((item) => {
        "items:", item;
        if (Array.isArray(item.sizeoption))
          sizeListArray.push(...item.sizeoption);
      });
      this.sizeListArray = [...new Set(sizeListArray)];
    },
    setPriceRange(min, max) {
      var priceRange = [];
      priceRange[0] = min;
      priceRange[1] = max;
      usefilterStore().priceRangeChange(priceRange)
    },
    calcPriceList(maxPrice) {
      this.priceRangeList = [];
      var difference = Math.ceil(maxPrice / 6),
        i = 0;
      while (i - difference < 6 * difference) {
        this.priceRangeList.push(i);
        i += difference;
      }
    },
    toggleFilterBox(box) {
      this.filterBoxes[box] = !this.filterBoxes[box];
    },
    showCurrentPath() {
      this.$router.push({
        name: this.$route.name,
        params: { id: "flower" },
      });
    },

    toggleFilterBar() {
      useClickStore().toggleShopFilterBar()
    },
    changePath(category) {
      this.$router.push({
        name: this.$route.name,
        params: { id: category },
      });
    },
    filterWithColor(color) {
      usefilterStore().filterWithColor(color)
    },
  },
 
  mounted() {
    this.setSizeList();
    this.selectedCategory = Array.isArray( this.$route.params.id)? this.$route.params.id[0]: this.$route.params.id||'all';
    this.categories.push("all");
    this.categories.push(...this.categoriesList);
    usefilterStore().setCategory(Array.isArray( this.$route.params.id)? this.$route.params.id[0]: this.$route.params.id||'all')
    var queryFilters = this.$route.query.filters;
    var queryColors = this.$route.query.colors;

    if (typeof queryFilters === "string") this.filtersList.push(queryFilters);
    else if (Array.isArray(queryFilters)) this.filtersList = queryFilters;
    else this.filtersList = [];

    if (typeof queryColors === "string")
      this.selectedColorsList.push(queryColors);
    else if (typeof queryColors === "object")
      this.selectedColorsList = queryColors;
    else this.selectedColorsList = [];
    this.selectedDiscount =
      this.$route.query.discount === undefined ? 0 : this.$route.query.discount;
      this.calcPriceList(this.maxPrice);
      this.priceRange = [10,this.maxPrice - this.maxPrice / 10];
  },
};
</script>

<style lang="scss" scoped>
.colorDiv {
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
}

.colorCheckbox {
  position: absolute;
  width: 30px;
  height: 30px;
  opacity: 0;
  cursor: pointer;
  margin-top: 2px;
}

.insideColorDiv {
  position: absolute;
  background-color: white;
  height: 10px;
  width: 10px;
}

input[type="checkbox"]:checked~div {
  box-shadow: 0 0 0 2px rgb(0, 0, 0, 0.8);
}
</style>
