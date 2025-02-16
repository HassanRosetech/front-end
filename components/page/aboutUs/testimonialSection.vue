<template>
  <section class="testimonial-section section-b-space">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="title title1 text-center">
            <h2>Testimonial</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              assumenda hic porro odio voluptas qui quod sed.
            </p>
          </div>
        </div>
      </div>
      <div class="testimonial-slider product-wrapper slide-3-1">
        <swiper v-bind="settings" ref="brandCarousel">
          <swiper-slide v-for="(testimonial, index) in testimonials" :key="index">
            <div class="testimonial-contain">
              <div class="textimonial-image">
                <img :src="getImageUrl(testimonial.imageSrc)" class="img-fluid" alt="" />
              </div>

              <div class="testimonial-details">
                <ul class="rating">
                  <li v-for="(star, index) in testimonial.ratingStars" :key="'a' + index">
                    <i class="fas fa-star theme-color"></i>
                  </li>

                  <li v-for="(star, index) in 5 - testimonial.ratingStars" :key="'b' + index">
                    <i class="fas fa-star"></i>
                  </li>
                </ul>
                <h5 class="details-images">
                  <i class="fas fa-quote-left"></i>{{
                    testimonial.description
                  }}<i class="fas fa-quote-right"></i>
                </h5>
                <h5>
                  <strong>{{ testimonial.name }}</strong> /
                  {{ testimonial.name }}
                </h5>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { testimonialCarousel } from "@/static/data/SliderSettingsData";
export default {
  props: ["testimonials"],
  data() {
    return {
      settings: testimonialCarousel,
    };
  },
};
</script>

<style></style>
