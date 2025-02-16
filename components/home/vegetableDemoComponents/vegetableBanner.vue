<template>
  <section class="ratio_landscape banner-style-2">
    <div class="container">
      <div class="row gy-3">
        <div class="col-lg-4" v-for="(banner, index) in banners" :key="index" :class="getBannerClasses(banner)">
          <div class="collection-banner text-center collection-center p-0" v-if="banner.childtype === 'middlebanner'">
            <div class="banner-img sliderBackground bg-size" :style="{
              'background-image': `url(${getImageUrl(banner.image)})`,
            }">
              <img :src="getImageUrl(banner.image)" class="bg-img d-none" alt="" />
            </div>
            <div class="contain-banner contain-center bottom-0">
              <div class="banner-content p-2">
                <h6 class="theme-color mb-2">{{ banner.smallheading }}</h6>
                <h2>{{ banner.headingtop }}</h2>
                <h2>{{ banner.headingbottom }}</h2>
                <p class="mt-2">{{ banner.subheading }}</p>
                <button href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                  class="btn btn-solid-default">
                  {{ useRuntimeConfig().public.const.LearnMore }}
                </button>
              </div>
            </div>
          </div>

          <div class="collection-banner text-center" v-else>
            <div class="banner-img sliderBackground bg-size" :style="{
              'background-image': `url(${getImageUrl(banner.image)})`,
            }">
              <img :src="getImageUrl(banner.image)" class="bg-img d-none" alt="" />
            </div>
            <div class="banner-detail">
              <a href="javascript:void(0)" class="heart-wishlist">
                <i class="far fa-heart"></i>
              </a>
              <span class="font-dark-30">{{ banner.discount }}% <span>OFF</span></span>
            </div>
            <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
              class="contain-banner contain-center bottom-0">
              <div class="banner-content with-bg">
                <h2 class="mb-2">{{ banner.heading }}</h2>
                <span>{{ banner.subheading }}</span>
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
  methods: {
    getBannerClasses(banner) {
      if (banner.class) return "col-xl-3 order-lg-0 order-md-1 order-0";
      else return "col-xl-5 col-md-6 custom-col";
    },
  },
};
</script>
