<template>
  <div class="section-b-space">
    <div class="title title1 text-center">
      <h2>{{ useRuntimeConfig().public.const.Product2 }}</h2>
    </div>

    <div class="contain-image-box">
      <section class="ratio_asos pt-0">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="product-wrapper slide-7 product-style-1">
                <swiper v-bind="swiperOption">
                  <swiper-slide v-for="(product, index) in products" :key="index">
                    <div class="product-box">
                      <div class="img-wrapper">
                        <div class="top-wishlist">
                          <span class="font-dark-30">{{ product.discount }}%</span>
                          <a @click.prevent="$router.push('/page/wishlist')" class="heart-wishlist wishlist"><i
                              class="far fa-heart"></i></a>
                        </div>
                        <nuxt-link :to="'/product/product_left_sidebar/' + product.id" class="text-center">
                          <img :src="getImageUrl(product.images[0].src)" class="img-fluid" alt="" />
                        </nuxt-link>
                      </div>
                      <div class="product-details text-center">
                        <h3 class="theme-color">
                          {{ selectedCurrencySymbol }}{{ product.price }}
                          <span class="font-light ml-1">{{ selectedCurrencySymbol }}{{ product.mrp }}</span>
                        </h3>
                        <a href="javascript:void(0)" @click.prevent="
                          $router.push('/product/product_left_sidebar')
                        " class="font-default">
                          <h5>{{ product.name }}</h5>
                        </a>
                        <ul class="rating">
                          <li v-for="(stars, index) in product.ratingStars" :key="'A' + index">
                            <i class="fas fa-star theme-color"></i>
                          </li>
                          <li v-for="(stars, index) in 5 - product.ratingStars" :key="'B' + index">
                            <i class="fas fa-star"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { VRSlider } from "~/static/data/SliderSettingsData";
import { Autoplay, Pagination } from "swiper";
import { useLayout } from "~~/store/layout";
export default {
  props: ["products"],
  data() {
    return {
      settings: VRSlider,
      swiperOption: {
        modules: [Autoplay, Pagination],
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        slidesPerView: 7,
        breakpoints: {
          1630: {
            slidesPerView: 7,
            spaceBetween: 24
          },
          1367: {
            slidesPerView: 7,
            spaceBetween: 24
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 24
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 24
          },
          705: {
            slidesPerView: 3,
            spaceBetween: 24
          },
          575: {
            spaceBetween: 12
          },
          481: {
            slidesPerView: 1,
            spaceBetween: 12
          },
          0: {
            spaceBetween: 12,
            slidesPerView: 1,
          }
        }
      }
    };
  },
  computed: {
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol;
    },
  },
};
</script>
