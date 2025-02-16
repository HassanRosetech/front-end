<template>
    <section class="home-section home-section-1">
      <div class="container-fluid p-0">
        <div class="classic-arrow">
          <HomeElectronicDemoComponentsHomeSliderLtr :slides="slides" v-if="layoutDirection=='ltr'"/>
          <HomeElectronicDemoComponentsHomeSliderRtl :slides="slides" v-else/>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import homeSlide from "../homeSlide.vue";
  import { Navigation, EffectFade } from "swiper";
  import 'swiper/css/effect-fade';
import { useLayout } from "~~/store/layout";
  export default {
    components: {
      homeSlide
    },
    props: ["slides"],
    data() {
      return {
        modules: [Navigation, EffectFade]
      }
    },
    computed:{
      layoutDirection() {
        return useLayout().layoutType;
      },
    }
  };
  </script>
  
  <style>
  @-webkit-keyframes fadeInUpSD {
    0% {
      opacity: 0;
      -webkit-transform: translateY(100px);
      transform: translateY(100px);
    }
  
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  
  @keyframes fadeInUpSD {
    0% {
      opacity: 0;
      -webkit-transform: translateY(100px);
      transform: translateY(100px);
    }
  
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  
  .fadeInUpSD {
    -webkit-animation-name: fadeInUpSD;
    animation-name: fadeInUpSD;
  }
  
  .swiper-slide-active>.fadeInUp {
    animation-name: fadeInUpSD;
    animation-duration: 1s;
    opacity: 1;
    width: 100%;
    padding: 10px 20px 30px 0;
  }
  
  .swiper-slide.swiper-slide-active .fadeInUp {
    animation-name: fadeInUpSD;
    animation-duration: 1s;
    opacity: 1;
    width: 100%;
  }
  </style>
  