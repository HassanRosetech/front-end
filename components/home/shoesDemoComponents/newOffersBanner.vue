<template>
  <section class="banner-style-2 offer-banner">
    <div class="container">
      <div class="row gy-4">
        <div class="col-lg-6 ratio2_1">
          <div class="collection-banner p-right text-right">
            <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
              class="banner-img sliderBackground bg-size" :style="{
                'background-image': `url(${getImageUrl(
                  banners.leftbanner.image
                )})`,
              }">
              <img :src="getImageUrl(banners.leftbanner.image)" class="bg-img d-none" alt="" />
            </a>
            <div class="banner-text">
              <div class="banner-content">
                <h6>
                  {{ banners.leftbanner.titleleft }}
                  <span class="theme-color">{{
                    banners.leftbanner.titleright
                  }}</span>
                </h6>
                <h2>
                  {{ banners.leftbanner.headingtop }} <br />
                  {{
                    banners.leftbanner.headingbottm
                  }}<span class="theme-color d-block">{{
  banners.leftbanner.price
}}</span>
                </h2>
                <button class="btn default-light default-theme mt-md-2 mt-1 rounded"
                  @click.prevent="$router.push('/shop/shop_left_sidebar')">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="row gy-4">
            <div class="col-lg-12 ratio_40">
              <div class="collection-banner p-left banner-title">
                <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                  class="banner-img sliderBackground bg-size" :style="{
                    'background-image': `url(${getImageUrl(
                      banners.rightbanners.image
                    )})`,
                  }">
                  <img :src="getImageUrl(banners.rightbanners.image)" class="bg-img d-none" alt="" />
                </a>

                <div class="banner-text">
                  <div class="banner-content">
                    <h3 class="mb-md-2 mb-0 spacing-text">
                      {{ banners.rightbanners.heading }}
                      <span class="theme-color">{{
                        banners.rightbanners.price
                      }}</span>
                    </h3>
                    <button class="btn default-light default-light-theme mt-md-2 mt-1 rounded"
                      @click.prevent="$router.push('/shop/shop_left_sidebar')">
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 ratio2_3" v-for="(banner, index) in banners.rightbanners.bottombanners" :key="index">
              <div class="collection-banner p-center text-center">
                <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                  class="banner-img sliderBackground bg-size" :style="{
                    'background-image': `url(${getImageUrl(banner.image)})`,
                  }">
                  <img :src="getImageUrl(banner.image)" class="bg-img d-none" alt="" />
                </a>
                <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                  class="contain-banner" v-if="banner.overlay">
                  <div class="banner-content spacing-banner with-bg">
                    <h3 class="mb-1">{{ banner.heading }}</h3>
                    <span>{{ useRuntimeConfig().public.const.Discount }} -{{ banner.discount }}%</span>
                  </div>
                </a>
              </div>
            </div>
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
