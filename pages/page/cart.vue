<template>
	<Head>
		<Title>Cart</Title>
	  </Head>
	<layout5 pageName="Cart" parent="Cart">
		<PageCart :cartItems="cartItems" />
	</layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import { useCartStore } from "~~/store/cart";
export default {
	components: {
		layout5,
	},
	head() {
		return {
			title: "Cart",
		};
	},
	computed: {
		cartItems() {
			return useCartStore().getCartItems
		},
	},
};
</script>