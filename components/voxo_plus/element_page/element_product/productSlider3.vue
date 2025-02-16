<template>
  <div class="section-b-space">
    <div class="title title1 text-center">
      <h2>{{ useRuntimeConfig().public.const.Product3 }}</h2>
    </div>

    <div class="contain-image-box">
      <section class="ratio_asos pt-0">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="product-wrapper slide-6">
                <swiper v-bind="settings" ref="brandCarousel">
                  <swiper-slide v-for="(product, index) in products" :key="index">
                    <productBox_2 :product="product" productBoxClasses="product-box6" wrapperClasses="hover-image"
                      square />
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
import productBox_2 from "~/layout/elements/productBox/product-box2.vue";
export default {
  components: {
    productBox_2,
  },
  props: ["products"],
  data() {
    return {
      settings: {
        dots: true,
        spaceBetween: 20,
        loop: true,
        speed: 500,
        arrows: false,
        slidesPerView: 6,
        slidesToScroll: 1,
        breakpoints: {
          1630: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 5,
          },
          992: {
            slidesPerView: 4,
          },
          705: {
            slidesPerView: 3,
          },
          0: {
            slidesPerView: 2,
          }
        },
      },
    };
  },
};
</script>
