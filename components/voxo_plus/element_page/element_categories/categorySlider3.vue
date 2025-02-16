<template>
  <div class="col-12">
    <div class="section-b-space">
      <div class="title title1 text-center">
        <h2>Category Style 3</h2>
      </div>

      <div class="contain-image-box">
        <section class="category-section pt-3">
          <div class="container-fluid">
            <div class="category-wrapper category-slider white-arrow">
              <swiper v-bind="swiperOption" class="swiper-wrapper">
                <swiper-slide v-for="(category, index) in categories" :key="index">
                  <div class="category-wrap category-color">
                    <a href="javascript:void(0)" @click.prevent="
                      $router.push('/shop/shop_category_filter')
                    ">
                      <img :src="getImageUrl(category.image)" class="img-fluid" alt="category image" />
                      <div class="category-content category-text t-text">
                        <h3>{{ category.title }}</h3>
                        <span>{{
                          selectedCurrencySymbol
                        }}{{ category.startingPrice }} -
                          {{
                            selectedCurrencySymbol
                          }}{{ category.endingPrice }}</span>
                      </div>
                    </a>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { useCategoriesStore } from "~~/store/categories";
import { useLayout } from "~~/store/layout";
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 24,
        freeMode: false,
        breakpoints: {
          1501: {
            slidesPerView: 6,
            spaceBetween: 24
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 24
          },
          970: {
            slidesPerView: 4,
            spaceBetween: 24
          },
          767: {
            slidesPerView: 3,
            spaceBetween: 24
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 12
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 12
          }
        }
      },
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
};
</script>