<template>
  <section class="ratio2_1 banner-style-2">
    <div class="container">
      <div class="row gy-4">
        <div class="col-lg-4" :class="banner.bigResponsive ? '' : 'col-md-6'" v-for="(banner, index) in banners"
          :key="index">
          <div class="collection-banner p-bottom p-center text-center">
            <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
              class="banner-img sliderBackground bg-size" :style="{
                'background-image': `url(${getImageUrl(banner.image)})`,
              }">
              <img :src="getImageUrl(banner.image)" class="bg-img d-none" alt="" />
            </a>
            <div class="banner-detail">
              <a href="javascript:void(0)" class="heart-wishlist">
                <i class="far fa-heart"></i>
              </a>
              <span class="font-dark-30">{{ banner.discount }}% <span>OFF</span></span>
            </div>
            <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
              class="contain-banner contain-center">
              <div class="banner-content banner-center with-bg">
                <h2 class="mb-2">{{ banner.heading }}</h2>
                <span>{{ banner.subHeading }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["banners"],

};
</script>
