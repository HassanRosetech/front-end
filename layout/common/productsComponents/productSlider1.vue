<template>
  <div class="col-md-6" :class="sliderClass ? sliderClass : ''">
    <div class="degree-section">
      <div class="details-image ratio_asos">
        <swiper :loop="true" :spaceBetween="10" :thumbs="{ swiper: thumbsSwiper }" :modules="modules">
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
      <div class="details-image-option black-slide mt-4 rounded">
        <swiper @swiper="setThumbsSwiper" :loop="false" :spaceBetween="10" :slidesPerView="3" :freeMode="true"
          :watchSlidesProgress="true" :modules="modules" class="swiper-wrapper">
          <swiper-slide class="swiper-slide" v-for="(bottomImage, index2) in currentImages" :key="index2">
            <img :src="getImageUrl(bottomImage.src)" class="img-fluid" alt=""/>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "~~/store/products";
import { FreeMode, Navigation, Thumbs } from 'swiper';
export default {
  props: ["sliderClass", "images"],
  data() {
    return {
      zoomAmount: 0,
      currentImages: {},
      changeValue: 0,
      sliderSetting: {},
      thumbsSwiper: null,
      modules: [FreeMode, Navigation, Thumbs]
    };
  },
  computed: {
    backupImages() {
      return useProductStore().data.filter((item) => item.type === "fashion")[0].images
    }
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper
    }
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