<template>
  <div class="col-md-6" :class="sliderClass ? sliderClass : ''">
    <div class="degree-section">
      <div class="details-image ratio_asos">
        
        <swiper @swiper="onSwipe" :slidesPerView="1" :spaceBetween="20">
          <swiper-slide v-for="(topImage, index) in currentImages" :key="index">
            <div class="product-image-tag">
              <vue-image-zoomer :regular="getImageUrl(topImage.src)" img-class="img-fluid w-100 image_zoom_cls-0"
                hover-message="Click once on image" :zoom-amount="5" />
              <div class="label-tag">
                <h6>
                  <i class="fas fa-star"></i> 4.8
                  <span class="font-light">120</span>
                </h6>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="image-360" data-bs-toggle="modal" data-bs-target="#product-modal">
        <img src="/images/360-icon.png" alt="" class="img-fluid" />
      </div>

      <div class="details-image-option black-slide mt-4 rounded">
        
        <swiper :slidesPerView="3" :spaceBetween="24" class="swiper-wrapper">
          <swiper-slide class="swiper-slide" v-for="(bottomImage, index2) in currentImages" :key="index2">
            <img :src="getImageUrl(bottomImage.src)" class="img-fluid" alt="" @click="slideTo1(index2)" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "~~/store/products";

export default {
  props: ["sliderClass", "images"],
  data() {
    return {
      zoomAmount: 0,
      currentImages: {},
      changeValue: 0,
      sliderSetting: {},
    };
  },
  computed: {
    backupImages() {
      return useProductStore().data.filter((item) => item.type === "fashion")[0].images
    }
  },
  methods: {
    onSwipe(swiper) {

      this.swiper = swiper
    },
    slideTo1(id) {
      this.swiper.slideTo(id)
      this.slideId = id
    },
  },
  created() {
    if (this.images != undefined) this.currentImages = this.images;
    else this.currentImages = this.backupImages;
  },
};
</script>

<style lang="scss">
.product-image-tag {
  overflow: hidden;

  .vh--outer {
    display: block;

    picture {
      width: 100%;
    }

    .vh--holder {
      display: block;
      width: 100%;
    }
  }
}

.details-items {
  .details-image {
    .product-image-tag {
      img {
        &.vh--abs {
          position: absolute !important;
        }

        height: unset !important;
      }
    }
  }
}
</style>
