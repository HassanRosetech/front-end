<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="title-3 text-center">
            <h2>{{ useRuntimeConfig().public.const.InstagramShop }}</h2>
            <h5 class="theme-color">{{ useRuntimeConfig().public.const.NewCollection }}</h5>
          </div>
          <div class="product-style-1">
            <div class="product-wrapper insta-slider instagram-wrap">
              <swiper v-bind="swiperOption" class="swiper-wrapper">
                <swiper-slide v-for="(banner, index) in banners" :key="index">
                  <div class="product-box product-box1">
                    <div class="img-wrapper">
                      <div class="top-wishlist">
                        <a href="javascript:void(0)" class="heart-wishlist ms-auto">
                          <i class="far fa-heart"></i>
                        </a>
                      </div>
                      <a href="javascript:void(0)" class="text-center">
                        <img :src="getImageUrl(banner.image)" class="img-fluid" alt="" />
                      </a>
                    </div>
                    <div class="insta-hover insta-hover-gradient text-center">
                      <div>
                        <h2>{{ banner.heading }}</h2>
                        <h5>{{ banner.discount }}</h5>
                        <h3 class="brand-name">{{ banner.title }}</h3>
                        <button href="javascript:void(0)" @click.prevent="
                          $router.push('/shop/shop_left_sidebar')
                        " type="button" class="btn btn-light-white">
                          Shop now <i class="fas fa-chevron-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
export default {
  props: ["banners"],
  data() {
    return {
      swiperOption: {
        modules: [Pagination],
        slidesPerView: 5,
        loop: true,
        pagination: {
          clickable: true,
        },
        breakpoints: {
          1630: {
            spaceBetween: 24,
            slidesPerView: 5
          },
          1200: {
            spaceBetween: 24,
            slidesPerView: 4
          },
          899: {
            spaceBetween: 24,
            slidesPerView: 3
          },
          575: {
            spaceBetween: 12,
            slidesPerView: 2
          },
          420: {
            spaceBetween: 12,
            slidesPerView: 1.1
          },
          0: {
            spaceBetween: 12,
            centeredSlides: true,
            slidesPerView: 1.1
          }
        }
      },
    }
  },
};
</script>
