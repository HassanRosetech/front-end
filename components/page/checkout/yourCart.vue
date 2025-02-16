<template>
  <div class="col-lg-4">
    <div class="your-cart-box">
      <h3 class="mb-3 d-flex text-capitalize">
        {{
          useRuntimeConfig().public.const.Yourcart
        }}<span class="badge bg-theme new-badge">{{ cartItems.length }}</span>
      </h3>
      <ul class="list-group mb-3" v-if="cartItems.length != 0">
        <li class="list-group-item d-flex justify-content-between lh-condensed" v-for="(item, index) in cartItems"
          :key="index">
          <div>
            <h6 class="my-0">{{ item.name }} X {{ item.quantity }}</h6>
            <small>{{ item.type }}</small>
          </div>
          <span>{{ selectedCurrencySymbol }}{{ item.price * item.quantity }}</span>
        </li>
        <li class="list-group-item d-flex lh-condensed justify-content-between">
          <span class="fw-bold">{{ useRuntimeConfig().public.const.TotalUSD }}</span>
          <strong>$ {{ cartTotal }}</strong>
        </li>
      </ul>
      <ul v-else>
        <li class="list-group-item d-flex lh-condensed justify-content-between">
          <span class="fw-bold">Your Cart Is Empty</span>
        </li>
      </ul>

      <form class="card border-0">
        <div class="input-group custome-imput-group">
          <input type="text" class="form-control" placeholder="Promo code" />
          <div class="input-group-append">
            <button type="submit" class="btn btn-solid-default rounded-0">
              Redeem
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "~~/store/cart";
import { useLayout } from "~~/store/layout";
export default {
  props: ["cartItems"],
  computed: {
    cartTotal() {
      return useCartStore().cartTotal
    },
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol;
    },
  },
};
</script>
