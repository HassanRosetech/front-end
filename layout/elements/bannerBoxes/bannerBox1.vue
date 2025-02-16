<template>
  <div :class="bannerClasses">
    <div class="collection-banner p-bottom p-center text-center">
      <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
        class="banner-img sliderBackground bg-size"
        :style="{ 'background-image': `url(${getImageUrl(banner.image)})` }">
        <img :src="getImageUrl(banner.image)" class="bg-img d-none" alt="" />
      </a>
      <div class="banner-detail">
        <nuxt-link :to="banner.link" class="heart-wishlist">
          <i class="far fa-heart"></i>
        </nuxt-link>
        <span class="font-dark-30" v-if="banner.discount">{{ banner.discount }}% <span>OFF</span></span>
      </div>
      <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')" class="contain-banner">
        <div class="banner-content with-big">
          <h2 class="mb-2">{{ banner.heading }}</h2>
          <span>{{ banner.subHeading }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["banner", "bannerClasses"],
  methods: {
    getImageUrl(path) {
      return ("/images/" + path)
    }
  }
};
</script>
