<template>
  <section class="banner-section pt-4">
    <div>
      <div class="container-fluid">
        <div class="row g-3">
          <div class="col-lg-4" v-for="(banner, index) in banners" :class="banner.bigResponsive ? '' : 'col-md-6'"
            :key="index">
            <div class="banner-image">
              <nuxt-link :to="banner.link">
                <img :src="getImageUrl(banner.image)" class="w-100" alt="" />
              </nuxt-link>
              <div class="banner-details">
                <a @click.prevent="$router.push('/page/wishlist')" class="heart-button">
                  <i data-feather="heart"></i>
                  <vue-feather type="heart"></vue-feather>
                </a>
                <h4>
                  {{ banner.discount }}%
                  <span class="theme-color">{{ banner.off }}</span>
                </h4>
                <div class="banner-price">
                  <h2>{{ banner.price }}</h2>
                  <h5 class="theme-color">
                    <del>{{ selectedCurrencySymbol }}{{ banner.delprice }}</del>
                  </h5>
                </div>
              </div>

              <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                class="banner-shop text-center">
                <div>
                  <h5>{{ banner.heading }}</h5>
                  <p class="mb-0 mt-2">{{ banner.subHeading }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueFeather from "vue-feather";
import { useLayout } from "~~/store/layout";
export default {
  components: { VueFeather },
  props: ["banners"],
  computed: {
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  methods: {
    getImageUrl(path) {
      return ("/images/" + path)
    }
  },
};
</script>
