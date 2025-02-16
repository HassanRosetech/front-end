<template>
  <div class="home-slider sliderBackground bg-size" :style="{
    'background-image': `url(${getImageUrl(slide.image)})`,
  }">
    <img :src="getImageUrl(slide.image)" class="bg-img d-none" alt="" />
    <div class="home-wrap row">
      <div class="col-lg-4 col-md-6 col-sm-9 left-content">
        <div>
          <div class="offer-wrap">
            <h4 class="theme-color mb-2 fadeInUp">{{ slide.left.top }}</h4>
            <h6 class="fadeInUp">{{ slide.left.topdescription }}</h6>
          </div>
          <div class="home-content">
            <h1 class="fadeInUp">{{ slide.left.headingtop }}</h1>
            <h1 class="mb-2 fadeInUp" data-delay-in="0.3">
              {{ slide.left.headingbottom }}
            </h1>
            <h2 class="mb-4 d-sm-block d-none fadeInUp" data-delay-in="0.4">
              {{ slide.left.tagline }}
            </h2>
            <h3 class="mb-3 fadeInUp" data-delay-in="0.5">
              <span class="theme-color">{{
                currencySymbol
              }}{{ slide.left.price * currencymultiple }}</span>
              <span class="text-decoration-line-through">{{
                currencySymbol
              }}{{ slide.left.mrp * currencymultiple }}</span>
            </h3>
            <p class="mb-0 d-sm-block d-none fadeInUp" data-delay-in="0.6">
              {{ slide.left.description }}
            </p>
            <div class="discover-block d-sm-block d-none fadeInUp" data-delay-in="0.7">
              <div class="d-flex">
                <a href="javascript:void(0)" class="play-icon theme-bg-color">
                  <i class="fas fa-play"></i>
                </a>
                <div class="discover-content">
                  <h4 class="theme-color mb-1 fadeInUp">
                    {{ slide.left.bottomheading }}
                  </h4>
                  <h6 class="fadeInUp">{{ slide.left.bottomsubheading }}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 offset-lg-5 right-content d-lg-flex d-none">
        <div>
          <h4 class="theme-color mb-2 fadeInUp">
            {{ slide.right.heading }}
          </h4>
          <h6 class="mb-4 fadeInUp" data-delay-in="0.3">
            {{ slide.right.subheading }}
          </h6>
          <p class="mb-0 fadeInUp" data-delay-in="0.4">
            {{ slide.right.description }}
          </p>
          <div class="product-img" data-delay-in="0.5">
            <ul>
              <li>
                <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                  :data-source="getImageUrl('electronics/slider/1.jpg')">
                  <img :src="getImageUrl(slide.right.image1)" class="img-fluid fadeInUp" alt="" />
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
                  :data-source="getImageUrl('electronics/slider/1.jpg')">
                  <img :src="getImageUrl(slide.right.image1)" class="img-fluid fadeInUp" alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="home-social">
          <ul>
            <li>
              <a href="javascript:void(0)" @click.prevent="$router.push('/product/product_left_sidebar')"
                class="font-default">
                <img :src="getImageUrl('social-icon/1.png')" class="img-fluid" alt="" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" @click.prevent="$router.push('/product/product_left_sidebar')"
                class="font-default">
                <img :src="getImageUrl('social-icon/2.png')" class="img-fluid" alt="" />
                <span>Instagram</span>
              </a>
            </li>
            <li class="mb-0">
              <a href="javascript:void(0)" @click.prevent="$router.push('/product/product_left_sidebar')"
                class="font-default">
                <img :src="getImageUrl('social-icon/3.png')" class="img-fluid" alt="" />
                <span>Twitter</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="group-btn">
      <button href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')" type="button"
        class="btn btn-solid-default">
        {{ useRuntimeConfig().public.const.Showdetails }}
      </button>
    </div>
  </div>
</template>

<script>
import { useLayout } from '~~/store/layout';

export default {
  props: ["slide"],
  computed: {
    currencySymbol() {
      return useLayout().selectedCurrencySymbol;

    },
    currencymultiple() {
      return useLayout().currencyConversionMultiple

    },
  },
};
</script>
