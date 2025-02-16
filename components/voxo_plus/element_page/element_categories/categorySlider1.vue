<template>
  <div class="col-12">
    <div class="section-b-space">
      <div class="title title1 text-center">
        <h2>Category Style 1</h2>
      </div>

      <div class="contain-image-box overflow-hidden">
        <section class="category-section ratio_40 pt-3">
          <div class="container-fluid">
            <div class="row gy-3">
              <div class="col-xxl-2 col-lg-3">
                <div class="category-wrap category-padding category-block theme-bg-color">
                  <div>
                    <h2 class="light-text">Top</h2>
                    <h2 class="top-spacing">Our Top</h2>
                    <span>Categories</span>
                  </div>
                </div>
              </div>
              <div class="col-xxl-10 col-lg-9">
                <div class="category-wrapper category-slider1 white-arrow category-arrow">
                  <swiper :navigation="true" :modules="modules" :breakpoints="swiperOption.breakpoints"
                    :slidesPerView="4" :spaceBetween="10" :loop="true" class="swiper-wrapper">
                    <swiper-slide v-for="(category, index) in categories" :key="index">
                      <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                        class="category-wrap category-padding" :class="isLoaded ? 'sliderBackground bg-size' : ''"
                        :style="{
                          'background-image': `url(${getImageUrl(
                            category.image
                          )})`,
                        }">
                        <img :src="getImageUrl(category.image)" class="bg-img" alt="category image"
                          :style="{ display: isLoaded ? 'none' : '' }" />
                        <div class="category-content category-text-1">
                          <h3 class="theme-color">{{ category.title }}</h3>
                          <span class="text-dark">{{ category.subTitle }}</span>
                        </div>
                      </a>
                    </swiper-slide>
                  </swiper>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { Navigation } from "swiper";
export default {
  props: ["categories"],
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 20,
        freeMode: false,
        breakpoints: {
          1200: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          0: {
            slidesPerView: 2,
          }
        }
      },
      isLoaded: false,
      image: "/images/fashion/category/1.jpg",

    };
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
  created() {
    this.isLoaded = true;
  },
};
</script>
