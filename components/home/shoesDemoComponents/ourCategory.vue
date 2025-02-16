<template>
  <section class="category-section">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="title title-2 text-center">
            <h2>{{ useRuntimeConfig().public.const.OurCategory }}</h2>
            <h5>{{ useRuntimeConfig().public.const.OurCollection }}</h5>
          </div>
        </div>
      </div>

      <div class="category-wrapper category-slider white-arrow">
        <swiper v-bind="swiperOption" :slidesPerView="6" :spaceBetween="24" class="swiper-wrapper" :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }" :modules="modules">
          <swiper-slide class="swiper-slide" v-for="(category, index) in categories" :key="index">
            <div class="category-wrap category-color">
              <a href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_category_filter')">
                <img :src="getImageUrl(category.image)" class="img-fluid" alt="category image" />
                <div class="category-content category-text t-text">
                  <h3>{{ category.title }}</h3>
                  <span>{{ selectedCurrencySymbol }}{{ category.startingPrice }} -
                    {{ selectedCurrencySymbol }}{{ category.endingPrice }}</span>
                </div>
              </a>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { useCategoriesStore } from "~~/store/categories";
import { Autoplay } from "swiper";
import { useLayout } from "~~/store/layout";
export default {
  data() {
    return {
      swiperOption: {
        breakpoints: {
          1188: {
            slidesPerView: 5,
            spaceBetween: 24
          },
          978: {
            slidesPerView: 3,
            spaceBetween: 24
          },
          575: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          0: {
            slidesPerView: 2,
            spaceBetween: 12,
          }
        }
      }
    };
  },
  computed: {
    categories() {
      return useCategoriesStore().data.filter(
        (item) => item.type === "shoesCategories"
      )[0].children;
    },
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  setup() {
    return {
      modules: [Autoplay],
    };
  },
  mounted() { },
};
</script>