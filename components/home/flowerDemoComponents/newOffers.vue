<template>
  <div>
    <section class="banner-style-2 offer-banner">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="title title-2 text-center">
              <h2>{{ useRuntimeConfig().public.const.Newoffers }}</h2>
              <h5 class="text-color">{{ useRuntimeConfig().public.const.JustForYou }}</h5>
            </div>
          </div>
        </div>
        <div class="row gy-4">
          <div class="col-lg-6 ratio2_1">
            <div class="collection-banner p-right text-right">
              <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                class="banner-img sliderBackground bg-size" :style="{
                  'background-image': `url(${getImageUrl(
                    banner.leftbanner.image
                  )})`,
                }">
                <img :src="getImageUrl(banner.leftbanner.image)" class="bg-img d-none" alt="" />
              </a>
              <div class="banner-text">
                <div class="banner-content">
                  <span class="span-top">{{ banner.leftbanner.topheadingleft }}
                    <span class="theme-color">{{
                      banner.leftbanner.topheadingright
                    }}</span></span>
                  <h2>
                    {{ banner.leftbanner.heading }}
                    <span class="theme-color">{{
                      banner.leftbanner.price
                    }}</span>
                  </h2>
                  <buttonAnimated buttonClasses="btn btn-solid-default" headerLocation="/shop/shop_left_sidebar"
                    buttonContent="Shop Now" />
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
                        banner.righttopbanner.image
                      )})`,
                    }">
                    <img :src="getImageUrl(banner.righttopbanner.image)" class="bg-img d-none" alt="" />
                  </a>
                  <div class="banner-text">
                    <div class="banner-content">
                      <h3 class="h-bottom">
                        {{ banner.righttopbanner.title }}
                        <span class="theme-color">{{
                          banner.righttopbanner.price
                        }}</span>
                      </h3>

                      <buttonAnimated buttonContent="Shop Now" buttonClasses="btn btn-solid-default" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 ratio2_3" v-for="(bottomBanners, index) in banner.righttopbanner
              .rightbottom" :key="index">
                <div class="collection-banner p-center text-center">
                  <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                    class="banner-img sliderBackground bg-size" :style="{
                      'background-image': `url(${getImageUrl(
                        bottomBanners.image
                      )})`,
                    }">
                    <img :src="getImageUrl(bottomBanners.image)" class="bg-img d-none" alt="" />
                  </a>
                  <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                    class="contain-banner">
                    <div class="banner-content with-bg">
                      <h3 class="mb-1">{{ bottomBanners.heading }}</h3>
                      <span>{{ bottomBanners.discount }}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import buttonAnimated from "~/layout/elements/buttons/animatedButton.vue";
export default {
  components: { buttonAnimated },
  props: ["banner"],
};
</script>
