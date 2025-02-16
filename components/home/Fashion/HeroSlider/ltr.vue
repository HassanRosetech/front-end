<template>
    <swiper class="swiper-wrapper" v-bind="swiperOptions">
      <swiper-slide class="swiper-slide" v-for="(slide, index) in slides" :key="index">
        <div class="home-slider">
          <div class="home-wrap row m-0 p-0">
            <div class="col-xxl-3 col-lg-4 p-0 d-lg-block d-none">
              <div class="home-left-wrapper">
                <div>
                  <h2>{{ slide.title }}</h2>
  
                  <div class="d-flex">
                    <ul class="rating p-0 me-2 mb-0">
                      <li v-for="(j, index) in 5" :key="index">
                        <i class="fas fa-star theme-color"></i>
                      </li>
                    </ul>
                    <h6 class="text-light">( {{ slide.review }} )</h6>
                  </div>
  
                  <p>
                    {{ slide.contain }}
                  </p>
                  <h3>
                    ${{ slide.price }}
                    <span class="theme-color">${{ slide.mrp }}</span>
                  </h3>
                  <ul class="selection-wrap">
                    <li>
                      <div class="dark-select">
                        <select class="form-select">
                          <option selected>Size</option>
                          <option :value="size" v-for="(size, index) in slide.Size" :key="'a' + index">
                            {{ size }}
                          </option>
                        </select>
                        <i class="fas fa-chevron-down"></i>
                      </div>
                    </li>
                    <li>
                      <div class="dark-select">
                        <select class="form-select">
                          <option selected>Color</option>
                          <option value="color" v-for="(color, index) in slide.Color" :key="'b' + index">
                            {{ color }}
                          </option>
                        </select>
                        <i class="fas fa-chevron-down"></i>
                      </div>
                    </li>
                    <li>
                      <div class="dark-select">
                        <select class="form-select">
                          <option selected>Qty</option>
                          <option value="qty" v-for="(qty, index) in slide.Qty" :key="'c' + index">
                            {{ qty }}
                          </option>
                        </select>
                        <i class="fas fa-chevron-down"></i>
                      </div>
                    </li>
                  </ul>
                  <div class="add-btn">
                    <a @click.prevent="$router.push('/page/cart')" class="btn btn-white">
                      {{ useRuntimeConfig().public.const.Addtocart }}
                    </a>
                    <a href="javascript:void:(0)" @click.prevent="$router.push('/page/wishlist')"
                      class="btn btn-solid-default ms-2">
                      <i class="fas fa-heart"></i>
                    </a>
                  </div>
                  <sliderShareIcons />
                </div>
              </div>
            </div>
            <sliderLeftContent :slide="slide" />
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </template>
  
  <script>
  import { useRuntimeConfig } from "#app";
  import sliderLeftContent from "../sliderLeftContent.vue";
  import sliderShareIcons from "../sliderShareIcons.vue";
  import { Pagination } from 'swiper';
  export default {
    components: {
      sliderLeftContent,
      sliderShareIcons,
    },
    props:['slides'],
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
  };
  </script>