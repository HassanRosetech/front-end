<template>
  <section class="tab-section">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="title text-center">
            <h5>{{ useRuntimeConfig().public.const.SpecialOffer }}</h5>
            <h2>{{ useRuntimeConfig().public.const.HurryUp }}</h2>
          </div>
          <div class="tab-wrap">
            <div class="tab-content" id="myTabContent">
              <div class="offer-wrap product-style-1">
                <div class="row g-xl-4 g-3">
                  <div class="col-lg-4" v-for="(banners, index) in bannersList" :class="getBannerClasses(banners)"
                    :key="index">
                    <div class="product-box bg-image" v-if="banners.childtype === 'middlebanner'">
                      <div class="img-wrapper bg-trans">
                        <div class="label-block">
                          <span class="label label-black">{{
                            useRuntimeConfig().public.const.NEW
                          }}</span>
                        </div>
                        <a href="javascript:void(0)">
                          <img :src="getImageUrl(banners.image1)" class="img-fluid" alt="" />
                          <img :src="getImageUrl(banners.image2)" class="round-circle" alt="" />
                        </a>
                      </div>
                      <div class="product-details text-center">
                        <h3 class="theme-color">
                          {{ selectedCurrencySymbol }}{{ banners.price }}
                          <span class="font-light ml-1">{{ selectedCurrencySymbol }}{{ banners.mrp }}</span>
                        </h3>
                        <a href="javascript:void(0)" class="font-default" tabindex="-1">
                          <h5 class="mx-auto">
                            {{ banners.title }}
                          </h5>
                        </a>
                        <ul class="rating mt-1">
                          <li v-for="(rating, index) in banners.ratingStars" :key="'C' + index">
                            <i class="fas fa-star theme-color"></i>
                          </li>

                          <li v-for="(rating, index) in 5 - banners.ratingStars" :key="'D' + index">
                            <i class="fas fa-star"></i>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="product-list" v-else>
                      <div class="product-box product-box-4" v-for="(banner, index) in banners.children" :key="index">
                        <div class="img-wrapper bg-trans">
                          <a href="javascript:void(0)" @click.prevent="
                            $router.push('/product/product_left_sidebar')
                          " class="text-center">
                            <img :src="getImageUrl(banner.image)" class="img-fluid" alt="" />
                          </a>
                        </div>
                        <div class="product-details">
                          <h3 class="theme-color">
                            {{ selectedCurrencySymbol }}{{ banner.mrp }}
                            <span class="font-light">{{
                              selectedCurrencySymbol
                            }}{{ banner.price }}</span>
                          </h3>
                          <a href="javascript:void(0)" @click.prevent="
                            $router.push('/product/product_left_sidebar')
                          " class="font-default">
                            <h5>{{ banner.title }}</h5>
                          </a>
                          <ul class="rating mt-1">
                            <li v-for="(rating, index) in banner.ratingStars" :key="'A' + index">
                              <i class="fas fa-star theme-color"></i>
                            </li>

                            <li v-for="(rating, index) in 5 - banner.ratingStars" :key="'B' + index">
                              <i class="fas fa-star"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useLayout } from '~~/store/layout';

export default {
  props: ["bannersList"],
  methods: {
    getBannerClasses(banner) {
      if (banner.childtype === "middlebanner") return "product-banner";
      else return "col-md-6";
    },
    getImageUrl(path) {
      return ("/images/" + path)
    }
  },
  computed: {
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
};
</script>
