<template>

  <div class="sticky-bottom-cart"  :style="{ bottom: showCart ? '0px' : '-192px' }">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="cart-content">
            <div class="product-image">
              <img :src="
                ('/images/' + currentProduct?.images[0]?.src)
              " class="img-fluid" alt="" />
              <div class="content">
                <h5>{{ currentProduct.name }}</h5>
                <h6>
                  {{ selectedCurrencySymbol }}{{
                    currentProduct.price
                  }}<del class="font-light">{{ selectedCurrencySymbol }}{{ currentProduct.mrp }}</del><span
                    v-if="currentProduct.discount != 0">{{ currentProduct.discount }}% off</span>
                </h6>
              </div>
            </div>
            <div class="selection-section">
              <div class="form-group mb-0">
                <select id="inputState" v-model="selectedColor" class="form-control form-select"
                  v-if="currentProduct.colors.length > 0">
                  <option disabled value="none" selected>
                    Choose color...
                  </option>
                  <option v-for="(color, index) in currentProduct.colors" :value="color" :key="index">
                    {{ color }}
                  </option>
                </select>
                <h6 class="error-message text-danger" :class="
                  submitted && selectedSize === 'none' ? 'd-block' : 'd-none'
                ">
                  please select a Color
                </h6>
              </div>
              <div class="form-group mb-0">
                <select id="input-state" v-model="selectedSize" class="form-control form-select" v-if="
                  Array.isArray(currentProduct.sizeoption) &&
                  currentProduct.sizeoption.length > 0
                ">
                  <option selected value="none" disabled>Choose size...</option>
                  <option v-for="(size, index) in currentProduct.sizeoption" :value="size" :key="'a' + index">
                    {{ size }}
                  </option>
                </select>
                <h6 class="error-message text-danger" :class="
                  submitted && selectedSize === 'none' ? 'd-block' : 'd-none'
                ">
                  {{ useRuntimeConfig().public.const.pleaseselectsize }}
                </h6>
              </div>
            </div>
            <div class="add-btn">
              <a class="btn default-light-theme default-theme default-theme-2 outline-button wishlist-btn"
                @click.prevent="addToWishlist(product)"><i class="fas fa-heart"></i>Wishlist</a>
              <a class="btn default-light-theme default-theme default-theme-2 outline-button"
                @click.prevent="addToCart(product)"><i class="fas fa-shopping-cart"></i> {{
                  useRuntimeConfig().public.const.Addtocart
                }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >

import { useWindowScroll } from '@vueuse/core'

import { useCartStore } from '~~/store/cart';
import { useClickStore } from '~~/store/clickEvents';
import { useLayout } from '~~/store/layout';
import { useProductStore } from '~~/store/products';
export default {
  props: ["showCartAt", "product"],
  data() {
    return {
      selectedSize: "none",
      selectedColor: "none",
      showCart: false,
      submitted: false,
      scrolled: useWindowScroll().y
    };
  },
  computed: {
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
    currentProduct(){
      return this.product?.length?this.product: useProductStore().data[0];
    }
  },
  watch: {
    scrolled: function () {
      this.handleScroll()
    }
  },
  methods: {
    addToCart(product) {
      this.submitted = true;
      var item = { product: product, quantity: 1 };
      if (this.selectedSize != "none" && this.selectedSize != "none") {
        useCartStore().addToCart(item)
        useClickStore().toggleSuccessfulModal({
          image: product.images[0].src,
          message: "Added To cart",
          link: useRuntimeConfig().public.const.cartPagePath,
        })
      }
    },
    handleScroll() {
      if (this.showCartAt < this.scrolled) {
        this.showCart = true;
      } else {
        this.showCart = false;
      }
    },
  },
  mounted() {
    if (this.product === undefined)
      this.initialProduct = useProductStore().data[0];
    else this.initialProduct = this.product;
  },
};
</script>
