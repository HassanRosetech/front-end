<template>
  <div class="search-full" id="suggestions" :class="[{ open: isopen }, { close: !isopen }, { show: suggestions }]">
    <div class="input-group">
      <span class="input-group-text">
        <vue-feather type="search" class="font-light"></vue-feather>
      </span>
      <input type="text" class="form-control search-type" placeholder="Search here.." v-model="searchQuery" />
      <span class="input-group-text close-search" @click="closeSearchBar">
        <vue-feather type="x" class="font-light"></vue-feather>
      </span>
    </div>
    <div class="search-suggestion">
      <ul class="custom-scroll">
        <li v-for="product in matchedProducts.slice(0, 6)" :key="product.id">
          <div class="product-cart media">
            <img :src="getImageUrl(product.images[0].src)" class="img-fluid" alt=""
              @click.prevent="gotoProduct(product.id)" />
            <div class="media-body">
              <a href="javascript:void(0)" @click.prevent="gotoProduct(product.id)">
                <h6 class="mb-1">{{ product.name }}</h6>
              </a>
              <ul class="rating p-0">
                <li>
                  <i class="fas fa-star theme-color" v-for="(stars, index) in product.ratingStars" :key="index"></i>
                </li>
                <li v-for="(stars, index) in 5 - product.ratingStars" :key="'A' + index">
                  <i class="fas fa-star"></i>
                </li>
              </ul>
              <p class="mb-0 mt-1">
                {{ selectedCurrencySymbol }}{{ product.price }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import VueFeather from "vue-feather";
import { useLayout } from "~~/store/layout";
import { useProductStore } from "~~/store/products"
export default {
  components: { VueFeather },
  props: ["isopen"],
  data() {
    return {
      suggestions: false,
      searchQuery: "",
      matchedProducts: [],
    };
  },
  computed: {
    allProducts() {
      return useProductStore().data
    },
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  watch: {
    searchQuery: function () {
      this.matchedProducts = [];
      let regex = new RegExp(this.searchQuery, "i");
      let matchedProducts = this.allProducts.filter((item) => {
        if (item.name && this.searchQuery != "") {
          if (item.name.search(regex) != -1) {
            this.suggestions = true;
            return true;
          }
        }
      });
      this.matchedProducts = matchedProducts;
    },
  },
  methods: {
    gotoProduct(productId) {
      useRouter().push("/product/product_left_sidebar/" + productId);
    },
    closeSearchBar() {
      this.$emit("closeSearchBar", false);
    },
  },
};
</script>
