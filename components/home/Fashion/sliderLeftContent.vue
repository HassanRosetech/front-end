<template>
  <div class="col-xxl-9 col-lg-8 p-0 left-content sliderBackground bg-size" :style="{
    'background-image': `url(${getImageUrl(slide.mainImg)})`,
  }">
    <img :src="getImageUrl(slide.mainImg)" class="bg-img d-none" alt="" />
    <div class="home-content row">
      <div class="col-xxl-4 col-lg-4 col-md-4 col-sm-5 col-6">
        <h3>
          {{ useRuntimeConfig().public.const.Sale }} 
          <span class="theme-color">{{ slide.offer }}</span>
        </h3>
        <h1 class="fadeInUp1">{{ slide.New }}</h1>
        <h6 class="mb-4 fadeInUp2">
          {{ slide.buy }}<span class="theme-color">{{ slide.free }}</span>
        </h6>
        <div class="discover-block">
          <div class="d-flex fadeInUp3">
            <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#product-modal"
              class="play-icon theme-bg-color">
              <i class="fas fa-play"></i>
            </a>
            <div class="discover-content">
              <h4 class="theme-color mb-1">{{ slide.Discover }}</h4>
              <h6>{{ slide.Collection }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useClickStore } from '~~/store/clickEvents';
export default {
  props: ["slide"],
  data() {
    return {
      sliderImage: ("/images/fashion/slider/1.jpg"),
    };
  },
  methods: {
    toggleVideoModal() {
      useClickStore().toggleVideoModal
    },
  },

};
</script>
