<template>
  <section class="section-b-space">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="brand-slider">
            <swiper :spaceBetween="30" :slidesPerView="6" :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }" :modules="modules" class="mySwiper">
              <swiper-slide v-for="(image, index) in images" :key="index">
                <div class="brand-image">
                  <img :src="getImageUrl(image)" class="img-fluid" alt="brand logo" />
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
import { Autoplay } from "swiper";

export default {
  data() {
    return {
      images: [
        "brand/1.png",
        "brand/2.png",
        "brand/3.png",
        "brand/4.png",
        "brand/5.png",
        "brand/6.png",
        "brand/4.png",
      ],
    };
  },
  methods: {
    getImageUrl(path) {
      return ("/images/" + path)
    }
  },
  setup() {
    return {
      modules: [Autoplay],
    };
  },
};
</script>
