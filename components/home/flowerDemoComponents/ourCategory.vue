<template>
  <section class="category-section ratio_40 overflow-hidden">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="title title-2 text-center">
            <h2>{{ useRuntimeConfig().public.const.OurCategory }}</h2>
            <h5>{{ useRuntimeConfig().public.const.OurCollection }}</h5>
          </div>
        </div>
      </div>
      <div class="row gy-3">
        <div class="col-xxl-2 col-lg-3">
          <div class="category-wrap category-padding theme-bg-color">
            <div>
              <h2 class="light-text">Top</h2>
              <h2>Our Top</h2>
              <span>Categories</span>
            </div>
          </div>
        </div>
        <div class="col-xxl-10 col-lg-9 ps-lg-0">
          <div class="category-wrapper category-slider1 white-arrow product-wrapper">
            <swiper v-bind="swiperOption" class="swiper-wrapper">
              <swiper-slide class="swiper-slide" v-for="(category, index) in categories" :key="index">
                <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                  class="category-wrap sliderBackground bg-size" :style="{
                    'background-image': `url(${getImageUrl(category.image)})`,
                  }">
                  <img :src="('/images/' + category.image)" class="bg-img d-none" alt="category image" />
                  <div class="category-content category-spacing">
                    <h3 class="theme-color">{{ category.title }}</h3>
                    <span>{{ category.subTitle }}</span>
                  </div>
                </a>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["categories"],
  data() {
    return {
      isLoaded: false,
      image: "/_nuxt/assets/images/flower/categories/1.jpg",
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 24,
        breakpoints: {
          1200: {
            slidesPerView: 5,
            spaceBetween: 24
          },
          991: {
            slidesPerView: 4,
            spaceBetween: 24
          },
          575: {
            spaceBetween: 12
          },
          0: {
            spaceBetween: 12,
            slidesPerView: 2,
          }
        }
      }
    };
  },

};
</script>
