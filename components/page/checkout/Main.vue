<template>
  <section class="section-b-space">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-8">
          <h3 class="mb-3">Billing address</h3>
          <form class="needs-validation">
            <PageCheckoutTopForm ref="checkoutForm" @formSubmitted="order" />
            <div class="form-check ps-0 mt-3 custome-form-check">
              <input class="checkbox_animated check-it" type="checkbox" id="flexCheckDefault11" value="saveInfo"
                v-model="saveUserInfo" />
              <label class="form-check-label checkout-label" for="flexCheckDefault11">{{
                useRuntimeConfig().public.const.SaveInfo
              }}</label>
            </div>

            <hr class="my-lg-5 my-4" />

            <h3 class="mb-3">{{ useRuntimeConfig().public.const.Payment }}</h3>

            <PageCheckoutPaymentForm @changePaymentMethod="changePaymentMethod" />
            <button v-if="paymentMethod === 'stripe'" class="btn btn-solid-default mt-4" type="button"
              @click.prevent="handleSubmitClick">
              {{ useRuntimeConfig().public.const.Continuecheckout }}
            </button>
          </form>
        </div>

        <PageCheckoutYourCart :cartItems="cartItems" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "~~/store/cart";

let props = defineProps({
  cartItems: Array
});

let saveUserInfo = ref(false), validInfo = ref(false), checkoutForm = ref(null), isLogin = ref(false), paymentMethod = ref('stripe'), userInfo = ref({}), user = ref({});
let { cartTotal } = storeToRefs(useCartStore());


function changePaymentMethod(method) {
  paymentMethod.value = method;
};

function handleSubmitClick() {
  checkoutForm.value.onSubmit()
}

function order(info) {
  isLogin.value = useCookie('user').value.isLoggedIn || false;
  userInfo.value = info;
  if (saveUserInfo.value) {
    useCartStore().saveUserInfo(userInfo.value)
  }
  if (isLogin.value) {
    payWithStripe();
  } else {
    useRouter().push("/page/login");
  }

}

function payWithStripe() {
  const handler = window.StripeCheckout.configure({
    key: "PUBLISHBLE_KEY", // 'PUBLISHBLE_KEY'
    locale: "auto",
    closed: function () {
      handler.close();
      useRouter().push("/order_success");
    },
    token: (token) => {
      useCartStore().createOrder({
        product: cart.value,
        userDetail: user.value,
        token: token.id,
        amt: cartTotal.value,
      })
      useRouter().push("/page/order_success");
    },
  });
  handler.open({
    name: "VOXO ",
    description: "Reach to your Dream",
    amount: cartTotal.value * 100,
  });

}

function isFormValid(value) {
  validInfo.value = value.infoValid;
}
onMounted(() => {
  isLogin.value = useCookie('user').value?.isLoggedIn || false;
  user.value = useCookie('user').value
  if (!user.value?.isLoggedIn) {
    useRouter().push("/page/login");
  }
})
</script>
