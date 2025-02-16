<template>
  <div class="modal fade cart-modal " id="addtocart" v-if="product.length !== 0">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" @click="dismiss"></button>
        </div>
        <div class="modal-body">
          <div class="modal-contain">
            <div>
              <div class="modal-messages">
                <i class="fas fa-check"></i> {{ product.name }}
                {{ useRuntimeConfig().public.const.SuccessAddtocart }}
              </div>
              <div class="modal-product">
                <div class="modal-contain-img">
                  <img :src="getImageUrl(product.images[0].src)" class="img-fluid" alt="" />
                </div>
                <div class="modal-contain-details">
                  <h4>{{ product.name }}</h4>
                  <p class="font-light my-2">Qty : {{ product.quantity }}</p>
                  <div class="product-total">
                    <h5>
                      {{ useRuntimeConfig().public.const.TOTAL }} :
                      <span>
                        {{ selectedCurrencySymbol }}
                        {{ product.price * product.quantity }}
                      </span>
                    </h5>
                  </div>
                  <div class="shop-cart-button mt-3">
                    <a href="javascript:void(0)"
                      class="btn default-light-theme conti-button default-theme default-theme-2 rounded"
                      data-bs-dismiss="modal">CONTINUE SHOPPING</a>
                    <a href="javascript:void(0)" @click.prevent="redirectTo('/page/cart')" data-bs-dismiss="modal"
                      class="btn default-light-theme conti-button default-theme default-theme-2 rounded">
                      {{ useRuntimeConfig().public.const.VIEWCART }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="ratio_asos mt-4">
            <div class="container">
              <div class="row m-0">
                <div class="col-sm-12 p-0">
                  <div class="product-style-2 slide-4 p-0 light-arrow spacing-slider">
                    <swiper :breakpoints="swiperOption.breakpoints" :slidesPerView="4" dir="rtl" class="swiper-wrapper">
                      <swiper-slide class="swiper-slide" v-for="(rproduct, index) in relatedProducts.filter(
                        (item) => item.category != 'vr'
                      )" :key="index">
                        <div class="product-box">
                          <div class="img-wrapper">
                            <div class="front">
                              <a href="javascript:void(0)" @click.prevent="changePage(rproduct.id)"
                                class="sliderBackground bg-size" :style="{
                                  'background-image': `url(${getImageUrl(
                                    rproduct.images[0].src
                                  )})`,
                                }">
                                <img :src="getImageUrl(rproduct.images[0].src)" class="bg-img d-none" alt="" /> </a>
                            </div>
                          </div>
                          <div class="product-details text-center">
                            <div class="rating-details d-block text-center">
                              <span class="font-light grid-content">{{
                                rproduct.name
                              }}</span>
                            </div>
                            <div class="main-price mt-0 d-block text-center">
                              <h3 class="theme-color">
                                {{ selectedCurrencySymbol }}{{ rproduct.price }}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </swiper-slide>
                    </swiper>
                  </div>
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
import { useCartStore } from "~~/store/cart"
import { useClickStore } from "~~/store/clickEvents";
import { useLayout } from "~~/store/layout";
export default {
  props: ["showModal"],
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 24,
        freeMode: false,
        breakpoints: {
          1200: {
            slidesPerView: 4,
            spaceBetween: 24
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 24
          },
          575: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          0: {
            spaceBetween: 12,
            slidesPerView: 2,
          }
        }
      }
    };
  },
  computed: {
    product() {
      return useCartStore().lastAddedProduct
    },
    relatedProducts() {
      return useClickStore().relatedProducts
    },
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol

    },
  },
  watch: {
    product: {
      handler(value) {
      }, deep: true
    }
  },
  methods: {
    changePage(productId) {
      this.$router.push("/product/product_left_sidebar/" + productId);
    },
    redirectTo(page) {
      this.$router.push(page);
    },
    getImageUrl(path) {
      return ('/images/' + path)
    },
    dismiss() {
      this.showModal = !this.showModal
    }
  },
};
</script>

<style lang="scss" scoped></style>
