<template>
  <div class="product-box product-box-6">
    <div class="img-wrapper squre-image">
      <div class="front-img sliderBackground bg-size" :style="{
        'background-image': `url(${getImageUrl(product.images[0].src)})`,
      }">
        <img class="img-fluid bg-img d-none" alt="" :src="getImageUrl(product.images[0].src)" />
      </div>
      <div class="labels label-block theme-color">
        <span class="label-7" v-if="product.discount">{{ product.discount }}% off</span>
      </div>
      <div class="cart-info cart-bag">
        <div class="cart-contain">
          <a href="javascript:void(0)" class="addtocart-btn" data-bs-toggle="modal" data-bs-target="#addtocart"
            @click="toggleCartModal(product)">
            <vue-feather type="shopping-bag"></vue-feather>
          </a>
        </div>
      </div>
    </div>
    <div class="product-detail">
      <a href="javascript:void(0)">
        <h5>Fresh Plum</h5>
      </a>
      <ul class="rating mt-1">
        <li v-for="(stars, index) in product.ratingStars" :key="index">
          <i class="fa fa-star theme-color"></i>
        </li>

        <li v-for="(noStars, index) in 5 - product.ratingStars" :key="'A' + index">
          <i class="fa fa-star"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VueFeather from "vue-feather";

export default {
  components: {
    VueFeather,
  },
  props: ["product"],
  methods: {
    getImageUrl(path) {
      return ("/images/" + path)
    }
  }
};
</script>
