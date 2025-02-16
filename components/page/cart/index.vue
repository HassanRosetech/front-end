<template>
  <section class="cart-section section-b-space">
    <div class="container">
      <div class="row">
        <div class="d-flex flex-column align-items-center justify-content-center" v-if="cartItems.length === 0">
          <img :src="getImageUrl('cartEmpty.png')" class="img-fluid" />
          <animatedButton :buttonContent="useRuntimeConfig().public.const.ContinueShopping"
            buttonClasses="btn btn-solid-default btn-block mt-4" :headerLocation="'/shop/shop_canvas_filter'" />
        </div>
        <PageCartTable :cartItems="cartItems" v-if="cartItems.length != 0" />

        <div class="col-12 mt-md-5 mt-4" v-if="cartItems.length != 0">
          <div class="row">
            <div class="col-sm-7 col-5 order-1">
              <div class="left-side-button text-end d-flex d-block justify-content-end">
                <a href="javascript:void(0)" @click.prevent="clearCartItems"
                  class="text-decoration-underline theme-color d-block text-capitalize">{{
                    useRuntimeConfig().public.const.clearallitems
                  }}</a>
              </div>
            </div>
            <div class="col-sm-5 col-7">
              <div class="left-side-button float-start">
                <nuxt-link to="/home/fashion_demo" class="btn btn-solid-default btn fw-bold mb-0 ms-0">
                  <i class="fas fa-arrow-left"></i>
                  {{ useRuntimeConfig().public.const.ContinueShopping }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-checkout-section" v-if="cartItems.length != 0">
          <div class="row g-4">
            <div class="col-lg-4 col-sm-6">
              <div class="promo-section">
                <form class="row g-3">
                  <div class="col-7">
                    <input type="text" class="form-control" id="number" placeholder="Coupon Code" />
                  </div>
                  <div class="col-5">
                    <button class="btn btn-solid-default rounded btn">
                      {{ useRuntimeConfig().public.const.ApplyCoupon }}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="col-lg-4 col-sm-6" v-if="cartItems.length != 0">
              <div class="checkout-button">
                <a href="javascript:void(0)" @click.prevent="$router.push('/page/checkout')"
                  class="btn btn-solid-default btn fw-bold">
                  {{ useRuntimeConfig().public.const.CheckOut }} <i class="fas fa-arrow-right ms-1"></i></a>
              </div>
            </div>

            <div class="col-lg-4" v-if="cartItems.length != 0">
              <div class="cart-box">
                <div class="cart-box-details">
                  <div class="total-details">
                    <div class="top-details">
                      <h3>{{ useRuntimeConfig().public.const.CartTotals }}</h3>
                      <h6>
                        {{ useRuntimeConfig().public.const.TotalMRP }}
                        <span>{{ selectedCurrencySymbol }}{{ cartTotal }}</span>
                      </h6>
                      <h6>
                        {{ useRuntimeConfig().public.const.CouponDiscount }}
                        <span>-{{ selectedCurrencySymbol }}25.00</span>
                      </h6>
                      <h6>
                        {{ useRuntimeConfig().public.const.ConvenienceFee }}
                        <span><del>{{ selectedCurrencySymbol }}25.00</del></span>
                      </h6>
                    </div>
                    <div class="bottom-details">
                      <nuxt-link to="/page/checkout">{{
                        useRuntimeConfig().public.const.ProcessCheckout
                      }}</nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import animatedButton from "~/layout/elements/buttons/animatedButton.vue";
import { useCartStore } from "~~/store/cart";
import { useLayout } from "~~/store/layout";
export default {
  components: {
    animatedButton,
  },
  props: ["cartItems"],
  computed: {
    cartTotal() {
      return useCartStore().cartTotal
    },
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  methods: {
    clearCartItems() {
      useCartStore().clearAllCartItems()
    },
  },
};
</script>
