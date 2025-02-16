<template>
  <div class="col-md-6" :class="rightSectionClasses ? rightSectionClasses : ''">
    <div class="cloth-details-size">
      <productCount />

      <div class="details-image-concept">
        <h2>{{ currentProduct.name }}</h2>
      </div>

      <div class="label-section">
        <span class="badge badge-grey-color">{{ useRuntimeConfig().public.const.BestSeller }}</span>
        <span class="label-text">{{ useRuntimeConfig().public.const.infashion }}</span>
      </div>

      <h3 class="price-detail">
        {{ selectedCurrencySymbol }}{{ currentProduct.price }}
        <del>{{ selectedCurrencySymbol }}{{ currentProduct.mrp }}</del><span v-if="currentProduct.discount != 0">{{
          currentProduct.discount
        }}% off</span><span v-else>25% off</span>
      </h3>

      <selectColors v-if="currentProduct.colors.length > 0" />

      <selectSize :product="currentProduct" :submited="submited" @changeQuantityTo="changeQuantityTo"
        @setSelectedSize="setSelectedSize" />

      <div class="product-buttons">
        <a @click.prevent="addToWishlist(currentProduct)" class="btn btn-solid">
          <i class="fa fa-bookmark fz-16 me-2"></i>
          <span>{{ useRuntimeConfig().public.const.wishlist }}</span>
        </a>
        <a href="javascript:void(0)" @click="addToCart(currentProduct)" id="cartEffect"
          class="btn btn-solid hover-solid btn-animation">
          <i class="fa fa-shopping-cart" v-if="!addedToCart"></i>
          <span>{{
            addedToCart? useRuntimeConfig().public.const.AddedToBag : useRuntimeConfig().public.const.Addtocart
          }}</span>
        </a>
      </div>

      <ul class="product-count shipping-order">
        <li>
          <img src="/images/gif/truck.png" class="img-fluid" alt="image" />
          <span class="lang">Free shipping for orders above $500 USD</span>
        </li>
      </ul>

      <timer />

      <shareIt />
      <slot></slot>
    </div>
  </div>
</template>

<script>
import selectColors from "./selectColors.vue";
import selectSize from "./selectSize.vue";
import productCount from "./productCount.vue";
import timer from "./timer.vue";
import shareIt from "./shareIt.vue";
import { useCartStore } from "~~/store/cart";
import { useLayout } from "~~/store/layout";
import { useClickStore } from "~~/store/clickEvents";
import { useProductStore } from "~~/store/products";

export default {
  components: {
    shareIt,
    productCount,
    selectColors,
    selectSize,
    timer,
  },
  props: ["rightSectionClasses", "product"],
  data() {
    return {
      currentProduct: {},
      quantity: 1,
      selectedSize: "",
      submited: false,
      validEntries: false,
      addedToCart: false,
    };
  },
  watch: {
    cartItems(item) {
      if (this.inCartProductIds.includes(this.product?.id))
        this.addedToCart = true;
    },
  },
  computed: {
    inCartProductIds() {
      return useCartStore().inCartProductIds
    },
    cartItems() {
      return useCartStore().getCartItems;

    },
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  methods: {
    addToCart(product) {
      this.submited = true;
      if (product.sizeoption) {
        if (this.selectedSize != "") {
          product["selectedSize"] = this.selectedSize;
          this.validEntries = true;
        } else {
          this.validEntries = false;
        }
      } else {
        this.validEntries = true;
      }
      if (this.validEntries) {
        var item = { product: product, quantity: this.quantity };

        useCartStore().addToCart(item)
        useClickStore().changeProductId(product.id)
        
        useClickStore().toggleSuccessfulModal({
          image: product.images[0].src,
          message: "Item Added to cart",
          link: useRuntimeConfig().public.const.cartPagePath,
        })
      }
    },
    changeQuantityTo(quantity) {
      this.quantity = quantity;
    },
    setSelectedSize(size) {
      this.selectedSize = size;
    },
  },
  created() {
    if (this.product === undefined)
      this.currentProduct = useProductStore().data[0]
    else this.currentProduct = this.product;

    let indexOfProductInCart = this.inCartProductIds.indexOf(
      this.currentProduct.id
    );
    if (indexOfProductInCart > -1) {
      this.currentProduct = this.cartItems[indexOfProductInCart];
    }
    if (this.inCartProductIds.includes(this.currentProduct.id))
      this.addedToCart = true;
  },
};
</script>
