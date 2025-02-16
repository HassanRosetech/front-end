<template>
  <div class="search-box1 d-lg-block d-none" :class="[{ show: suggestions }]">
    <div class="the-basics input-group">
      <input type="text" class="form-control typeahead" id="exampleInputPassword1" placeholder="Search a Product"
        v-model="searchQuery" />
      <span class="input-group-text close-search theme-bg-color search-box">
        <vue-feather type="search"></vue-feather>
      </span>
    </div>
    <div class="search-suggestion">
      <ul class="custom-scroll">
        <li v-for="product in matchedProducts.slice(0, 6)" :key="product.id">
          <div class="product-cart media">
            <img :src="getImageUrl(product.images[0].src)" class="img-fluid" alt="" />
            <div class="media-body">
              <a href="javascript:void(0)">
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
export default {
  components: { VueFeather },
  data() {
    return {
      suggestions: false,
      searchQuery: "",
      matchedProducts: [],
    };
  },
  computed: {
    allProducts() {
      return useProductStore().data;
    },
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol;
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
};
</script>
