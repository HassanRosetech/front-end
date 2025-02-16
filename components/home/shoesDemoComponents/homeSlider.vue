<template>
  <section class="pt-0 overflow-hidden home-section home-section-3">
    <div>
      <div class="banner-slider">
        <swiper :loop="true" :navigation="true" :modules="modules" effect="fade" :slidesPerView="1">
          <swiper-slide v-for="(item, index) in slides" :key="index" class="banner-poster">
            <div class="slider-right-detail">
              <div class="labels">
                <ul class="label-15">
                  <li v-for="(social, index) in item.socialIcons" :key="'A' + index">
                    <a :href="social.website">
                      <img :src="getImageUrl(social.iconImage)" class="img-fluid" alt="facebook" draggable="false" />
                      <h5 class="d-lg-block d-none">{{ social.name }}</h5>
                    </a>
                  </li>
                </ul>
              </div>
              <h4>{{ item.title }}</h4>
              <div class="offer-box">
                <h6>{{ item.discount }}% off</h6>
              </div>
            </div>

            <div class="slider-bg">
              <div class="bg-text">
                <span>{{ item.product }}</span>
              </div>

              <div class="bg-circle" :class="item.circleClass"></div>
              <img :src="getImageUrl(item.bannerImage)" class="shoes-1 img-fluid" draggable="false" alt="" />
            </div>

            <div class="sugestion-product d-xl-block d-none">
              <h3>{{ item.leftTitle }}</h3>
              <h6>{{ item.leftSubtitle }}</h6>

              <a href="javascript:void(0)" @click.prevent="$router.push('/product/product_left_sidebar')"
                class="slider-shoes-image d-block">
                <div class="relative-shoes">
                  <img :src="getImageUrl(item.leftImage)" class="img-fluid" alt="" />
                  <div class="shoes-price">
                    <h5>{{ selectedCurrencySymbol }}{{ item.leftPrice }}</h5>
                    <h6>{{ item.leftProduct }}</h6>
                    <ul class="rating d-flex justify-content-between">
                      <li v-for="(stars, index2) in item.leftReviewStars" :key="index2">
                        <i class="fas fa-star theme-color"></i>
                      </li>
                      <li v-for="(stars, index2) in 5 - item.leftReviewStars" :key="'A' + index2">
                        <i class="fas fa-star"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </a>
            </div>

            <div class="price-number">
              <h2>
                {{ selectedCurrencySymbol }}{{
                  item.bottomPrice
                }}<span><del>{{ selectedCurrencySymbol }}{{ item.bottomMrp }}</del></span>
              </h2>
              <h6>{{ item.bottomDescription }}</h6>
            </div>

            <div class="slider-arrow-2">
              <div class="left-arrow d-lg-block d-none"></div>
              <div class="right-arrow d-lg-block d-none"></div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Navigation, EffectFade } from "swiper";
import { useLayout } from '~~/store/layout';
export default {
  props: ["slides"],
  computed: {
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol;

    },
    layoutType() {
      return useLayout().layoutType
    },
  },
  setup() {
    return {
      modules: [Navigation, EffectFade],
    };
  },
};
</script>
