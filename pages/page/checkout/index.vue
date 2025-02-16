<template>
  <Head>
    <Title>Checkout</Title>
  </Head>
  <layout5 parent="Checkout" pageName="Checkout">
    <PageCheckoutMain :cartItems="cartItems" />
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import { useCartStore } from "~~/store/cart";
export default {
  head() {
    return {
      title: "Checkout",
    };
  },
  components: {
    layout5,
  },
  computed: {
    cartItems() {
      return useCartStore().getCartItems
    }
  },
  created(){
if(!this.cartItems.length){
  this.$router.push('/page/cart')
}
  },
};
</script>