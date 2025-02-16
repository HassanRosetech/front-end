<template>
  <section class="ratio2_1">
    <div class="container">
      <div class="row gy-3">
        <div class="col-lg-4" :class="getBannerClasses(banner)" v-for="(banner, index) in banners" :key="index">
          <div class="collection-banner text-center collection-center" v-if="banner.childtype === 'middlebanner'">
            <h6 class="theme-color mb-2">{{ banner.smallheading }}</h6>
            <h2>{{ banner.headingtop }}</h2>
            <h2>{{ banner.headingbottom }}</h2>
            <p class="mt-2">{{ banner.subheading }}</p>
            <button href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')" type="button"
              class="btn btn-solid-default">
              {{ useRuntimeConfig().public.const.LearnMore }}
            </button>
          </div>

          <div class="collection-banner p-center text-center" v-else>
            <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
              class="banner-img sliderBackground bg-size" :style="{
                'background-image': `url(${getImageUrl(banner.image)})`,
              }">
              <img :src="getImageUrl(banner.image)" class="bg-img d-none" alt="" />
            </a>
            <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
              class="contain-banner">
              <div class="banner-content with-bg">
                <h2 class="mb-2 mins-spacing">{{ banner.heading }}</h2>
                <span class="s-spacing">{{ banner.subheading }}</span>
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
      if (banner.childtype === "middlebanner")
        return "col-xl-3  order-lg-0 order-md-1 order-0";
      else return "col-xl-5 col-md-6 custom-col";
    },
  },
};
</script>
