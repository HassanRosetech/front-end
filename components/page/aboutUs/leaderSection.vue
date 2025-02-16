<template>
  <section class="section-b-space team-leader-section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="title title1 text-center">
            <h2>{{ useRuntimeConfig().public.const.meetOurTeam }}</h2>
            <p>
              {{ useRuntimeConfig().public.const.teamDesc }}
            </p>
          </div>
        </div>
      </div>
      <div class="product-wrapper leader-section slide-5_1 ratio_asos">
        <swiper v-bind="settings" ref="brandCarousel">
          <swiper-slide v-for="(leader, index) in teamLeaders" :key="index">
            <div class="leader-contain">
              <div class="leader-image sliderBackground bg-size" :style="{
                'background-image': `url(${getImageUrl(leader.imageSrc)})`,
              }">
                <img :src="getImageUrl(leader.imageSrc)" class="img-fluid bg-img d-none" alt="" />
                <ul class="social-media">
                  <li>
                    <a href="www.facebook.com">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                  </li>

                  <li>
                    <a href="www.twitter.com">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>

                  <li>
                    <a href="www.google.com">
                      <i class="fab fa-google-plus-g"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="leader-contain">
                <h3>{{ leader.name }}</h3>
                <h6>{{ leader.position }}</h6>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { teamleadersSlider } from "@/static/data/SliderSettingsData.js";
import { Pagination } from 'swiper';
import 'swiper/css/pagination';
export default {
  props: ["teamLeaders"],
  data() {
    return {
      settings: teamleadersSlider,
      modules: [Pagination],
      settings: {
        modules: [Pagination],
        pagination: {
          clickable: true,
        },
        slidesPerView: 5,
        breakpoints: {
          1630: {
            slidesPerView: 5,
            spaceBetween: 24
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 24
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 24
          },
          0: {
            slidesPerView: 2,
            spaceBetween: 24
          }
        }
      }
    };
  },
};
</script>

<style></style>
