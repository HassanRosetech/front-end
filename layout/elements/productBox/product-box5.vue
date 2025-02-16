<template>
  <div>
    <div class="product-box">
      <div class="img-wrapper">
        <div class="top-wishlist product-color">
          <a href="javascript:void(0)" @click.prevent="$router.push('/page/wishlist')"
            class="heart-wishlist heart-color ms-auto">
            <i class="far fa-heart"></i>
          </a>
        </div>
        <div class="share share-box share-opacity">
          <span class="share-plus share-plus-color">+</span>
          <span>{{ banner.share }}</span>
        </div>
        <a href="javascript:void(0)" @click.prevent="
          $router.push('/product/product_left_sidebar/' + banner.id)
        " class="text-center sliderBackground bg-size" :style="{
  'background-image': `url(${getImageUrl(banner.image)})`,
}">
          <img :src="getImageUrl(banner.image)" class="bg-img d-none" alt="" />
        </a>
      </div>
      <div class="insta-hover insta-spacing text-center">
        <div>
          <h5>{{ banner.discount }}</h5>
          <h3 class="text-hide">
            {{ banner.title }}
          </h3>

          <buttonAnimated headerLocation="/shop/shop_left_sidebar" buttonClasses="btn btn-light-white"
            buttonContent="Shop Now"><i class="fas fa-chevron-right ms-2"></i></buttonAnimated>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import buttonAnimated from "~/layout/elements/buttons/animatedButton.vue";

export default {
  components: {
    buttonAnimated,
  },
  props: ["banner"],
  methods: {
    getImageUrl(path) {
      return ('/images/' + path)
    }
  }
};
</script>
