<template>
  <div class="col-12">
    <div class="section-t-space">
      <div class="title title1 text-center">
        <h2>{{ useRuntimeConfig().public.const.Collection5 }}</h2>
      </div>

      <section class="home-section pt-3">
        <section class="banner-style-2 offer-banner pt-0">
          <div class="container p-0">
            <div class="row gy-4">
              <div class="col-lg-6 ratio2_1">
                <div class="collection-banner p-right text-right">
                  <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                    class="banner-img sliderBackground bg-size" :style="{
                      'background-image': `url(${getImageUrl(
                        banners.leftbanner.image
                      )})`,
                    }">
                    <img :src="
                      ('/images/' + banners.leftbanner.image)
                    " class="bg-img d-none" alt="" />
                  </a>
                  <div class="banner-text">
                    <div class="banner-content">
                      <span class="span-top">{{ banners.leftbanner.topheadingleft }}
                        <span class="theme-color">{{
                          banners.leftbanner.topheadingright
                        }}</span></span>
                      <h2>
                        {{ banners.leftbanner.heading }}
                        <span class="theme-color">{{
                          banners.leftbanner.price
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
                            banners.righttopbanner.image
                          )})`,
                        }">
                        <img :src="
                          ('/images/' +
                            banners.righttopbanner.image)
                        " class="bg-img d-none" alt="" />
                      </a>
                      <div class="banner-text">
                        <div class="banner-content">
                          <h3 class="h-bottom">
                            {{ banners.righttopbanner.title }}
                            <span class="theme-color">{{
                              banners.righttopbanner.price
                            }}</span>
                          </h3>

                          <buttonAnimated buttonContent="Shop Now" buttonClasses="btn btn-solid-default" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6 ratio2_3" v-for="(banner, index) in banners.righttopbanner
                  .rightbottom" :key="index">
                    <div class="collection-banner p-center text-center">
                      <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                        class="banner-img sliderBackground bg-size" :style="{
                          'background-image': `url(${getImageUrl(
                            banner.image
                          )})`,
                        }">
                        <img :src="('/images/' + banner.image)" class="bg-img d-none" alt="" />
                      </a>
                      <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                        class="contain-banner">
                        <div class="banner-content with-bg">
                          <h3 class="mb-1">{{ banner.heading }}</h3>
                          <span>{{ banner.discount }}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>
<script>
import buttonAnimated from "~/layout/elements/buttons/animatedButton.vue";
export default {
  components: { buttonAnimated },
  props: ["banners"],
};
</script>
