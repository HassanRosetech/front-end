<template>
  <div class="col-12">
    <div class="section-b-space">
      <div class="title title1 text-center">
        <h2>Category Style 2</h2>
      </div>

      <div class="contain-image-box">
        <section class="ratio_asos pt-3 category-style-3">
          <div class="container">
            <div class="row">
              <div class="product-wrapper slide-4">
                <swiper v-bind="swiperOption" :modules="swiperOption.modules" :loop="true" class="swiper-wrapper">
                  <swiper-slide v-for="(banner, index) in banners" :key="index">
                    <div class="category-image-fruit">
                      <img :src="getImageUrl(banner.image)" class="img-fluid" alt="" />
                      <div class="category-contain">
                        <img :src="getImageUrl(banner.imagefront)" class="" alt="" />
                      </div>

                      <div class="category-text">
                        <h2>{{ banner.heading }}</h2>
                        <h5>{{ banner.subheading }}</h5>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { Pagination } from 'swiper';
export default {
  props: ["banners"],
  data() {
    return {
      swiperOption: {
        modules: [Pagination],
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
    };
  },
};
</script>
