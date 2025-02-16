<template>
  <section class="section-b-space">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="title-3 text-center mt-0">
            <h2>{{ useRuntimeConfig().public.const.OurUpdate }}</h2>
            <h5 class="theme-color">{{ useRuntimeConfig().public.const.OurBlog }}</h5>
          </div>
        </div>

        <div class="product-wrapper slide-3">
          <swiper v-bind="swiperOption" :slidesPerView="3" :spaceBetween="24" class="swiper-wrapper">
            <swiper-slide class="swiper-slide product-style-4 ratio2_3" v-for="(banner, index) in banners" :key="index">

              <div class="blog-header">
                <div class="blog-image sliderBackground bg-size" :style="{
                  'background-image': `url(${getImageUrl(banner.image)})`,
                }">
                  <img :src="getImageUrl(banner.image)" class="img-fluid bg-img d-none" alt="" />
                  <div class="blog-date gradient-color">
                    <div class="date-hover">
                      <div>
                        <h2>{{ banner.day }}</h2>
                        <h3>{{ banner.month }}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blog-footer">
                <h2 class="theme-color">{{ banner.watermark }}</h2>
                <h5 class="theme-color">{{ banner.title }}</h5>
                <h4>{{ banner.headingtop }}</h4>
                <h4 class="brand-name">{{ banner.headingbottom }}</h4>
                <nuxt-link to="/shop/shop_canvas_filter" type="button" class="btn default-theme">
                  {{ useRuntimeConfig().public.const.ReadMore }} <i class="fas fa-chevron-right"></i>
                </nuxt-link>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Pagination } from "swiper";

export default {
  props: ["banners"],
  data() {
    return {
      swiperOption: {
        modules: [Pagination],
        pagination: true,
        breakpoints: {
          1200: {
            slidesPerView: 3,
            spaceBetween: 24
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24
          },
          575: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 12,
          }
        }
      }
    };
  }
};
</script>
