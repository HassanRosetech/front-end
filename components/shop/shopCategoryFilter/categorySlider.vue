<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="slide-7-1 product-wrapper">
            <swiper v-bind="swiperOption"  class="swiper-wrapper">
              <swiper-slide v-for="(card, index) in categories" :key="index">
                  
                <div class="image-slider">
                  <div class="image-product">
                    <img :src="(`/images/${card.image}`)" class="w-100" alt="" />
                    <div class="image-contain">
                      <h5>{{ card.category }}</h5>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useCategoriesStore } from '~~/store/categories';
import "swiper/css/pagination";
import { Pagination } from "swiper";
export default {
  data() {
    return {
      swiperOption: {
        modules: [Pagination],
        pagination: {
          clickable: true,
        },
        slidesPerView: 7,
        spaceBetween: 28,
        freeMode: false,
        breakpoints: {
          1200: {
            slidesPerView: 7,
            spaceBetween: 28,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          0: {
            slidesPerView: 2,
          }
        }
      }
    };
  },
  computed: {
    categories() {
      return useCategoriesStore().data.filter(
        (item) => item.type === "topCategoryFilter"
      )[0].children;
    },
  },
};
</script>

<style lang="scss" scoped></style>