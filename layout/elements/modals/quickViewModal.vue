<template>
  <div class="modal theme-modal fade quick-view-modal" id="quick-view">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content" ref="modal">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="modal-body">
          <div class="row gy-4">
            <div class="col-lg-6">
              <div class="quick-view-image">
                <div class="quick-view-slider ratio_2">

                  <swiper :loop="true" :spaceBetween="10" :thumbs="{ swiper: thumbsSwiper }" :modules="modules">
                    <swiper-slide v-for="(image, index) in product.images" :key="'a' + index">
                      <div class="sliderBackground bg-size" :style="{
                        'background-image': `url(${getImageUrl(image.src)})`,
                      }">
                        <img :src="getImageUrl(image.src)" class="img-fluid bg-img d-none" alt="product" />
                      </div>
                    </swiper-slide>
                  </swiper>
                </div>
                <div class="quick-nav">
                  <swiper @swiper="setThumbsSwiper" :spaceBetween="10" :slidesPerView="3" :freeMode="true"
                    :watchSlidesProgress="true" :style="{ height: '150px' }" :modules="modules" direction="vertical"
                    class="swiper-wrapper">
                    <swiper-slide class="swiper-slide" v-for="(vimage, index) in product.images" :key="'b' + index">

                      <img :src="getImageUrl(vimage.src)" class="img-fluid" alt="product" @click="slideTo1(index)" />
                    </swiper-slide>
                  </swiper>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="product-right">
                <h2 class="mb-2">{{ product.name }}</h2>
                <ul class="rating mt-1">
                  <li v-for="(star, index) in product.ratingStars" :key="index">
                    <i class="fas fa-star theme-color"></i>
                  </li>
                  <li v-for="(star, index) in 5 - product.ratingStars" :key="'a' + index">
                    <i class="fas fa-star"></i>
                  </li>

                  <li class="font-light" v-if="product.inStock > 1">
                    (In stock)
                  </li>
                  <li class="font-light" v-else>(Out Of stock)</li>
                </ul>
                <div class="price mt-3">
                  <h3>{{ selectedCurrencySymbol }}{{ product.price }}</h3>
                </div>
                <div class="color-types" v-if="product.colors.length != 0">
                  <h4>colors</h4>
                  <ul class="color-variant mb-0">
                    <li :class="selectedColor === color ? 'selected' : ''" :style="{ 'background-color': color }"
                      v-for="(color, index) in product.colors" @click.prevent="setSelectedColor(color)" :key="index">
                    </li>
                  </ul>
                  <h6 class="error-message text-danger" :class="
                    submited && selectedColor === '' ? 'd-block' : 'd-none'
                  ">
                    please select a Color
                  </h6>
                </div>
                <div class="size-detail" v-if="
                  Array.isArray(product.sizeoption) &&
                  product.sizeoption.length > 0
                ">
                  <h4>size</h4>
                  <ul class="">
                    <li v-for="(size, index) in product.sizeoption" :key="index"
                      :class="selectedSize === size ? 'selected' : ''" @click.prevent="selectSize(size)">
                      {{ size }}
                    </li>
                  </ul>
                  <h6 class="error-message text-danger" :class="
                    submited && selectedSize === '' ? 'd-block' : 'd-none'
                  ">
                    {{ useRuntimeConfig().public.const.pleaseselectsize }}
                  </h6>
                </div>
                <div class="product-details">
                  <h4>{{ useRuntimeConfig().public.const.productdetail }}</h4>
                  <ul>
                    <li>
                      <span class="font-light">{{ useRuntimeConfig().public.const.Brand }} :</span>
                      {{ product.brand }}
                    </li>
                    <li>
                      <span class="font-light">{{ useRuntimeConfig().public.const.Category }} :</span>
                      {{ product.category }}
                    </li>
                  </ul>
                </div>
                <div class="product-btn">
                  <a :data-bs-dismiss="validEntries ? 'modal' : ''" @click.prevent="addToCart(product)"
                    class="btn btn-solid-default btn-sm">
                    {{ useRuntimeConfig().public.const.Addtocart }}
                  </a>
                  <a @click.prevent="
                    redirectTo('/product/product_left_sidebar/', product.id)
                  " data-bs-dismiss="modal" class="btn btn-solid-default btn-sm ms-1">
                    {{ useRuntimeConfig().public.const.Viewdetails }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '~~/store/cart';
import { useClickStore } from '~~/store/clickEvents';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { useLayout } from '~~/store/layout';
export default {
  props: ["showModal"],
  data() {
    return {
      thumbsSwiper: null,
      selectedSize: "",
      selectedColor: "",
      validEntries: false,
      image: "/images/fashion/product/front/4.jpg",
      submited: false,
      modules: [FreeMode, Navigation, Thumbs]
    };
  },
  computed: {
    product() {
      return useClickStore().productToShow
    },
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  watch: {
    product: {
      handler: function () {
        if (
          Array.isArray(this.product.sizeoption) &&
          this.product.sizeoption.length === 0
        )
          this.validEntries = true;
      },
      deep: true,
    },
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper
    },
    setSelectedColor(color) {
      this.selectedColor = color;
      if (
        Array.isArray(this.product.sizeoption) &&
        this.product.sizeoption.length > 0
      ) {
        this.selectedSize != "" && (this.validEntries = true);
      } else {
        this.validEntries = true;
      }
    },
    selectSize(size) {
      this.selectedSize = size;
      if (this.product.colors.length > 0) {
        this.selectedColor != "" && (this.validEntries = true);
      } else {
        this.validEntries = true;
      }
    },
    addToCart(product) {
      this.submited = true;
      Array.isArray(this.product.sizeoption) &&
        this.product.sizeoption.length > 0 &&
        this.selectedSize != "" &&
        (product["selectedSize"] = this.selectedSize);
      this.product.colors.length > 0 &&
        this.selectedColor != "" &&
        (product["selectedColor"] = this.selectedColor);
      if (this.validEntries) {
        let payload = {
          image: this.product.images[0].src,
          message: "Added To Cart",
          link: this.useRuntimeConfig().public.const.cartPagePath,
        };
        var item = { product: product, quantity: 1 };
        useCartStore().addToCart(item)
        useClickStore().toggleSuccessfulModal(payload)
        useClickStore().closeOverlay

      }
    },

    redirectTo(path, productId) {
      if (productId != undefined) this.$router.push(path + productId);
      else this.$router.push(path);
    },
  },
  mounted() {

    if (this.product.sizeoption.length === 0) this.validEntries = true;
  },
};
</script>

<style lang="scss" scoped></style>
