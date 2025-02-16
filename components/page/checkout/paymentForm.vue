<template>
  <div>
    <div class="d-block my-3">
      <div class="form-check custome-radio-box">
        <input class="form-check-input" type="radio" name="flexRadioDefault" value="stripe" id="credit"
          v-model="paymentMethod" />
        <label class="form-check-label" for="stripe">Stripe </label>
      </div>

      <div class="form-check custome-radio-box">
        <input class="form-check-input" type="radio" name="flexRadioDefault" value="paypal" id="debit"
          v-model="paymentMethod" />
        <label class="form-check-label" for="paypal">Paypal</label>
      </div>
    </div>
    <div class="text-right" v-show="paymentMethod=='paypal'">
    <div id="paypal-button-container" class="w-50"  ></div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '~~/store/cart';

export default {
  data() {
    return {
      paymentMethod: "stripe",
      cartTotal: 1000,
      paypal: {
        sandbox: "Your_Sendbox_Key",
      },
      environment: "sandbox",
      button_style: {
        label: "checkout",
        size: "medium", // small | medium | large | responsive
        shape: "pill", // pill | rect
        color: "blue", // gold | blue | silver | black
      },
    };
  },
  watch: {
    paymentMethod(){
        this.$emit("changePaymentMethod", this.paymentMethod);
    },
  },
  methods: {
    getamt() {
      return this.cartTotal.toString();
    },
    onPaymentComplete: function (data) {
      useCartStore().createOrder({
        product: this.cart,
        userDetail: this.user,
        token: data.orderID,
        amt: this.cartTotal,
      })
      this.$router.push("/page/order-success");
    },
    
  },
  mounted(){
      window.paypal.Buttons({
    }).render('#paypal-button-container')
    }
};
</script>