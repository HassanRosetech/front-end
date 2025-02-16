<template>
    <section class="home-section home-section-2 p-0">
      <div class="container-fluid p-0">
        <div class="slick-2 dot-dark">
          <HomeFashionHeroSliderLtr :slides="slides" v-if="layoutDirection=='ltr'" />
          <HomeFashionHeroSliderRtl :slides="slides" v-else />
        </div>
      </div>
  
      <videoPlayModal />
    </section>
  </template>
  
  <script>
  import videoPlayModal from "~/layout/elements/modals/videoPlayModal.vue";
  import { useHomeSliderStore } from "~~/store/homeSliders";
  import { Pagination } from 'swiper';
  import { useLayout } from "~~/store/layout";
  export default {
    components: {
      videoPlayModal,
    },
    data() {
      return {
        swiperOptions: {
          loop: true,
          slidesPerView: 'auto',
          dir: 'ltr',
          pagination: true,
          modules: [Pagination]
        }
      }
    },
    computed: {
      slides() {
        return useHomeSliderStore().data.filter(
          (item) => item.type === "fashion"
        )[0].slides;
      },
      layoutDirection() {
        return useLayout().layoutType;
      },
    },
  };
  </script>