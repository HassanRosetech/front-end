<template>
  <div class="product-box">
    <div class="img-wrapper">
      <nuxt-link :to="'/product/product_left_sidebar/' + product.id" class="sliderBackground bg-size" :style="{
        'background-image': `url(${getImageUrl(product.images[0].src)})`,
      }">
        <img :src="getImageUrl(product.images[0].src)" class="w-100 bg-img d-none" alt="" />
      </nuxt-link>
      <div class="circle-shape"></div>
      <span class="background-text">Furniture</span>
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
    <div class="product-style-3 product-style-chair">
      <div class="product-title d-block mb-0">
        <p class="font-light mb-sm-2 mb-0">{{ product.feature }}</p>
        <a href="javascript:void(0)" @click.prevent="
          $router.push('/product/product_left_sidebar/' + product.id)
        " class="font-default">
          <h5>{{ product.name }}</h5>
        </a>
      </div>
      <div class="main-price">
        <ul class="rating mb-1 mt-0">
          <li v-for="(star, index2) in product.ratingStars" :key="'A' + index2">
            <i class="fas fa-star theme-color"></i>
          </li>
          <li v-for="(noStar, index3) in 5 - product.ratingStars" :key="'B' + index3">
            <i class="fas fa-star"></i>
          </li>
        </ul>
        <h3 class="theme-color">
          {{ selectedCurrencySymbol }}{{ product.price }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import VueFeather from "vue-feather";
import { useClickStore } from '~~/store/clickEvents';
import { useLayout } from "~~/store/layout";
export default {
  components: { VueFeather },
  props: ["product"],
  computed: {
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  methods: {
    toggleQuickViewModal(productId) {
      useClickStore().changeProductId(productId)
    },
    getImageUrl(path) {
      return ("/images/" + path)
    }
  },
};
</script>
