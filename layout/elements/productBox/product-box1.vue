<template>
  <productBox1_skeletonLoader v-if="showSkeletonLoader" />
  <div class="product-box" :class="productBoxClasses" v-else>
    <div class="img-wrapper">
      <div @click="gotoProduct">
        <a @click="$router.push('/product/product_left_sidebar/' + product.id)" class="front sliderBackground bg-size"
          :style="{
            'background-image': `url(${getImageUrl(product.images[0].src)})`,
          }">
          <img :src="getImageUrl(product.images[0].src)" class="bg-img d-none" alt="" />
        </a>
      </div>
      <div @click="gotoProduct">
        <a @click="$router.push('/product/product_left_sidebar/' + product.id)" class="back sliderBackground bg-size"
          :style="{
            'background-image': `url(${getImageUrl(
              product.images[1] ? product.images[1].src : product.images[0].src
            )})`,
          }">
          <img :src="
            getImageUrl(
              product.images[1]
                ? product.images[1].src
                : product.images[0].src
            )
          " class="bg-img d-none" alt="" />
        </a>
      </div>
      <div class="label-block" v-if="product.new || product.discount">
        <span class="label label-black" v-if="product.new">{{
          useRuntimeConfig().public.const.NEW
        }}</span>
        <span class="label label-theme" v-if="product.discount">{{ product.discount }}% {{
          useRuntimeConfig().public.const.OFF
        }}</span>
      </div>
      <div class="cart-wrap">
        <ul>
          <li>
            <a href="javascript:void(0)" class="addtocart-btn" data-bs-toggle="modal" data-bs-target="#addtocart"
              @click="toggleCartModal(product)">
              <vue-feather type="shopping-bag"></vue-feather>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#quick-view"
              @click="toggleQuickViewModal(product.id)">
              <vue-feather type="eye"></vue-feather>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" @click.prevent="addTocompareMixin(product)">
              <vue-feather type="refresh-cw"></vue-feather>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" @click.prevent="addToWishlist(product)" class="wishlist">
              <vue-feather type="heart"></vue-feather>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="product-details">
      <div class="rating-details">
        <span class="font-light grid-content">{{ product.category !='none'?product.category:product.type }}</span>
        <ul class="rating mt-0 d-flex">
          <li v-for="(stars, index) in product.ratingStars" :key="index">
            <i class="fas fa-star theme-color"></i>
          </li>
          <li v-for="(noStars, index) in 5 - product.ratingStars" :key="'A' + index">
            <i class="fas fa-star"></i>
          </li>
        </ul>
      </div>
      <div class="main-price">
        <a href="javascript:void(0)" @click.prevent="
          $router.push('/product/product_left_sidebar/' + product.id)
        " class="font-default">
          <h5>{{ product.name }}</h5>
        </a>
        <div class="listing-content">
          <span class="font-light">{{ product.size }}</span>
          <p class="font-light">{{ product.description }}</p>
        </div>
        <h3 class="theme-color">
          {{ selectedCurrencySymbol }}{{ product.price }}
        </h3>
        <button @click="toggleCartModal(product)" class="btn listing-content">
          {{ useRuntimeConfig().public.const.Addtocart }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import VueFeather from "vue-feather";
import productBox1_skeletonLoader from "~/layout/elements/skeletonLoaders/productBox1_skeletonLoader.vue";
import { useClickStore } from "~~/store/clickEvents";
import { useLayout } from "~~/store/layout";
export default {
  components: {
    VueFeather,
    productBox1_skeletonLoader,
  },
  props: ["product", "productBoxClasses"],
  data() {
    return {
      showSkeletonLoader: true,
    };
  },
  computed: {
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  methods: {
    gotoProduct() {
      this.$router.push({
        path: "/product/product_left_sidebar/" + this.product.id,
      });
    },
    toggleQuickViewModal(productId) {
      useClickStore().changeProductId(productId)
    },
    getImageUrl(path) {
      return ("/images/" + path)
    }
  },
  mounted() {

    setTimeout(() => {
      this.showSkeletonLoader = false;
    }, 2000);
  },
};
</script>
