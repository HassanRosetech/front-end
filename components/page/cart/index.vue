<template>
  <section class="cart-section section-b-space">
    <div class="container">
      <div class="row">
        <div
          class="d-flex flex-column align-items-center justify-content-center"
          v-if="cartItems.length === 0"
        >
          <img :src="getImageUrl('cartEmpty.png')" class="img-fluid" />
          <animatedButton
            :buttonContent="useRuntimeConfig().public.const.ContinueShopping"
            buttonClasses="btn btn-solid-default btn-block mt-4"
            :headerLocation="'/shop/shop_canvas_filter'"
          />
        </div>
        <PageCartTable :cartItems="cartItems" v-if="cartItems.length != 0" />

        <div class="col-12 mt-md-5 mt-4" v-if="cartItems.length != 0">
          <div class="row">
            <div class="col-sm-7 col-5 order-1">
              <div
                class="left-side-button text-end d-flex d-block justify-content-end"
              >
                <a
                  href="javascript:void(0)"
                  @click.prevent="clearCartItems"
                  class="text-decoration-underline theme-color d-block text-capitalize"
                  >{{ useRuntimeConfig().public.const.clearallitems }}</a
                >
              </div>
            </div>
            <div class="col-sm-5 col-7">
              <div class="left-side-button float-start">
                <nuxt-link
                  to="/home/fashion_demo"
                  class="btn btn-solid-default btn fw-bold mb-0 ms-0"
                >
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
                <!-- <form class="row g-3">
                  <div class="col-7">
                    <input
                      type="text"
                      class="form-control"
                      id="number"
                      placeholder="Coupon Code"
                    />
                  </div>
                  <div class="col-5">
                    <button class="btn btn-solid-default rounded btn">
                      {{ useRuntimeConfig().public.const.ApplyCoupon }}
                    </button>
                  </div>
                </form> -->
              </div>
            </div>

            <div class="col-lg-4 col-sm-6" v-if="cartItems.length != 0">
              <div class="checkout-button">
                <!-- <a
                  href="javascript:void(0)"
                  @click.prevent="$router.push('/page/checkout')"
                  class="btn btn-solid-default btn fw-bold"
                >
                  {{ useRuntimeConfig().public.const.CheckOut }}
                  <i class="fas fa-arrow-right ms-1"></i
                ></a> -->

                <button
                  @click="handleCheckout"
                  class="btn btn-solid-default btn fw-bold"
                >
                  {{ useRuntimeConfig().public.const.CheckOut }}
                  <i class="fas fa-arrow-right ms-1"></i>
                </button>
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
                      <!-- <h6>
                        {{ useRuntimeConfig().public.const.CouponDiscount }}
                        <span>-{{ selectedCurrencySymbol }}25.00</span>
                      </h6> -->
                      <h6>
                        {{ useRuntimeConfig().public.const.ConvenienceFee }}
                        <span
                          ><del>{{ selectedCurrencySymbol }}25.00</del></span
                        >
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
      return useCartStore().cartTotal;
    },
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol;
    },
  },
  methods: {
    clearCartItems() {
      useCartStore().clearAllCartItems();
    },

    getImageUrl(name) {
      return `/images/${name}`;
    },

    getCurrencyCode(symbol) {
      const map = {
        "€": "EUR",
        $: "USD",
        SEK: "SEK",
        kr: "SEK",
      };
      return map[symbol] || "SEK";
    },

    async handleCheckout() {
      try {
        const userAgent = navigator.userAgent;
        const currency = this.getCurrencyCode(this.selectedCurrencySymbol);
        const payeeReference = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        const totalAmount = this.cartTotal * 100;
        const vatAmount = Math.round(totalAmount * 0.25);

        const response = await fetch("/api/payex/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentorder: {
              operation: "Purchase",
              currency,
              amount: totalAmount,
              vatAmount,
              description: "Test Purchase",
              userAgent,
              language: "sv-SE",
              urls: {
                hostUrls: ["https://www.partsshop.se"],
                paymentUrl: "https://www.partsshop.se/payment/complete",
                completeUrl: "https://www.partsshop.se/payment/complete",
                cancelUrl: "https://www.partsshop.se/payment/cancelled",
                callbackUrl: "https://www.partsshop.se/payment/callback",
                logoUrl: "https://www.partsshop.se/logo.png",
                termsOfServiceUrl:
                  "https://www.partsshop.se/termsandconditoons.pdf",
              },
              payeeInfo: {
                payeeId: "6794ffe1-dc1f-4b4b-a885-952611f649b4",
                payeeReference,
                payeeName: "Hassan",
                orderReference: "or-" + payeeReference,
              },
            },
          }),
        });

        const result = await response.json();

        if (!response.ok || result.error) {
          console.error("Payment creation failed:", result);
          alert("Payment creation failed. Please try again.");
          return;
        }

        const viewOp = result.operations?.find(
          (op) => op.rel === "view-paymentorder"
        );
        if (!viewOp?.href) {
          console.error("Missing view-paymentorder in response", result);
          alert("Could not load checkout.");
          return;
        }

        const viewUrl = new URL(viewOp.href);
        const token = viewUrl.pathname.split("/").pop();
        const culture = viewUrl.searchParams.get("culture") || "sv-SE";
        const tcTid =
          viewUrl.searchParams.get("_tc_tid") || result._tc_tid || result.tcTid;

        if (!token || !tcTid) {
          console.error("Missing token or _tc_tid", { token, tcTid });
          alert("Invalid checkout data.");
          return;
        }

        const scriptSrc = `https://ecom.externalintegration.payex.com/checkout/client/${token}?culture=${culture}&_tc_tid=${tcTid}`;
        const newWindow = window.open("", "_blank", "width=800,height=600");

        const htmlContent = `
          <!DOCTYPE html>
          <html lang="${culture}">
            <head>
              <meta charset="UTF-8" />
              <title>Swedbank Pay Embedded Checkout</title>
            </head>
            <body>
              <h2>Checkout</h2>
              <div id="checkout-container"></div>
              <script src="${scriptSrc}"><\\/script>
              <script>
                payex.hostedView
                  .checkout({
                    container: { checkout: "checkout-container" },
                    culture: "${culture}"
                  })
                  .open();
              <\\/script>
            </body>
          </html>`;

        newWindow.document.write(htmlContent);
        newWindow.document.close();
      } catch (error) {
        console.error("Checkout error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    },
  },
};
</script>
