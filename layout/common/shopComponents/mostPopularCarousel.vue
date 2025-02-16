<template>
  <div class="most-popular">
    <div class="title title-2 text-lg-start">
      <h3>{{ useRuntimeConfig().public.const.Mostpopularss }}</h3>
    </div>

    <div class="product-slider border-top round-arrow1">
      <swiper :navigation="true" v-bind="swiperOption" class="swiper-wrapper">
        <swiper-slide v-for="(i, index) in Math.ceil(productsList.length / 3)" :key="index">
          <div class="row g-3">
            <div class="col-12" v-for="(product, index2) in productsList.slice(
              (index + 1) * 3 - 3,
              (index + 1) * 3
            )" :key="'a' + index2">
              <div class="product-image">
                <a @click.prevent="
                  $router.push('/product/product_left_sidebar/' + product.id)
                ">
                  <img :src="getImageUrl(product.images[0].src)" alt="" />
                </a>
                <div class="product-details">
                  <h6 class="font-light">{{ product.size }}</h6>
                  <a @click.prevent="
                    $router.push(
                      '/product/product_left_sidebar/' + product.id
                    )
                  " class="">
                    <h3>{{ product.name }}</h3>
                  </a>
                  <h4 class="font-light mt-1">
                    <del>{{ selectedCurrencySymbol }}{{ product.mrp }}</del>
                    <span class="theme-color">{{ selectedCurrencySymbol }}{{ product.price }}</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div>
        <div class="row g-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "~~/store/products";
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import { useLayout } from "~~/store/layout";
export default {
  data() {
    return {
      swiperOption: {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 20,
        freeMode: false,
        navigation: {
          clickable: true,
        },
      },
    };
  },
  computed: {
    productsList() {

      return useProductStore().data.filter((item) => item.type === "fashion")
    },
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol

    },
  },
};
</script>
