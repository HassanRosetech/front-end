<template>
  <div class="row g-4 product-style-1 mb-5 d-md-flex d-none">
    <div class="col-sm-12 p-0">
      <div class="title title-1">
        <h3>Top Category</h3>
      </div>
    </div>
    <div class="col-xl-4 col-md-6" v-for="(category, index) in categories" :key="index">
      <div class="category-image">
        <div class="elec-image">
          <img :src="brands[category].image" class="img-fluid" alt="" />
        </div>
        <div class="category-contain">
          <h3>{{ category }}</h3>
          <ul class="product-list">
            <li v-for="(brand, index) in brands[category].brands.slice(0, 4)" :key="'a' + index">
              <a href="javascript:void(0)" @click="applyFilter(brand)" class="font-light">{{ brand }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usefilterStore } from '~~/store/filters';
export default {
  data() {
    return {
      brands: {},
    };
  },
  computed: {
    categories() {
      return usefilterStore().categories
    },
    allProducts() {
      return usefilterStore().allCards
    },
  },
  methods: {
    applyFilter(brand) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, filters: brand },
      });
    },
  },
  created() {
    this.categories.splice(6, this.categories.length);
    var categoryProducts = [],
      image = "";
    var brands = [];
    this.categories.forEach((category) => {
      brands = [];
      var categoryObject = {
        brands: [],
        image: "",
      };
      categoryProducts = this.allProducts.filter((product) => {
        if (product.type === category) return true;
        else return false;
      });
      brands = categoryProducts.map((item) => item.brand);
      image = ("/images/" + categoryProducts[0].images[0].src);

      brands = [...new Set(brands)];
      brands.splice(brands.indexOf("none"), 1);
      categoryObject["brands"] = brands;
      categoryObject["image"] = image;
      this.brands[category] = categoryObject;
    });
  },
};
</script>