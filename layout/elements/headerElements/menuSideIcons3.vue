<template>
  <div class="menu-right">
    <ul>
      <li>
        <div class="search-box theme-bg-color mr-3" @click="openSearchBar">
          <vue-feather type="search"></vue-feather>
        </div>
      </li>
      <li class="onhover-dropdown wislist-dropdown">
        <div class="cart-media">
          <div class="cart-icon">
            <vue-feather type="heart"></vue-feather>
            <span class="label label-theme rounded-pill">0</span>
          </div>
          <div class="cart-content">
            <h6>Empty</h6>
            <span>Wish List</span>
          </div>
        </div>
        <div class="onhover-div">
          <a @click.prevent="$router.push('/page/wishlist')">
            <div class="wishlist-empty">
              <i class="fab fa-gratipay"></i>
              <h6 class="mb-1">Your wislist empty !!</h6>
              <p class="font-light mb-0">explore more and shortlist items.</p>
            </div>
          </a>
        </div>
      </li>

      <li class="onhover-dropdown cart-dropdown" :class="isCartOpen ? 'show' : ''">
        <button type="button" @click="toggleCart" class="btn btn-solid-default btn-spacing">
          <vue-feather type="shopping-cart"></vue-feather>
          <span>{{ currencySymbol }} {{ cartTotal }}</span>
        </button>
        <div class="onhover-div">
          <div class="cart-menu" v-if="getterCartItems.length != 0">
            <div class="cart-title">
              <h6>
                <vue-feather type="shopping-bag"></vue-feather>
                <span class="label label-theme rounded-pill">5</span>
              </h6>
              <span class="d-md-none d-block" @click="toggleCart">
                <i class="fas fa-arrow-right back-cart"></i>
              </span>
            </div>
            <ul class="custom-scroll">
              <li v-for="(item, index) in getterCartItems" :key="index">
                <div class="media">
                  <img :src="getImageUrl(item.images[0].src)" class="img-fluid" alt="no image" />
                  <div class="media-body">
                    <h6>{{ item.name }}</h6>
                    <div class="qty-with-price">
                      <span>{{ currencySymbol }} {{ item.price }}</span>
                      <span>
                        <input type="number" min="1" :max="item.inStock" class="form-control" :value="item.quantity"
                          @blur="changeQuantityMixin($event, item)" @change="changeQuantityMixin($event, item)" />
                      </span>
                    </div>
                  </div>
                  <button type="button" class="btn-close d-flex d-md-none" @click.prevent="removeItem(item.id)"
                    aria-label="Close">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div class="cart-menu" v-else>
            <div class="cart-title">
              <h6>
                <vue-feather type="shopping-bag"></vue-feather>
                <span class="label label-theme rounded-pill">0</span>
              </h6>
              <span class="d-md-none d-block" @click="toggleCart">
                <i class="fas fa-arrow-right back-cart"></i>
              </span>
            </div>
            <ul class="custom-scroll">
              <li>
                <div class="media">
                  <img style="width: 100%" :src="('/images/cartEmptyHeader.png')" />
                </div>
              </li>
            </ul>
          </div>
          <div class="cart-btn" v-if="getterCartItems.length != 0">
            <h6 class="cart-total">
              <span>{{ useRuntimeConfig().public.const.Total }}:</span> {{ currencySymbol }}
              {{ cartTotal }}
            </h6>
            <a @click="$router.push('/page/cart')" href="javascript:void(0)" class="btn btn-solid-default btn-block">{{
              useRuntimeConfig().public.const.ProceedTOPayment
            }}
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import VueFeather from "vue-feather";
import animatedButton from "~/layout/elements/buttons/animatedButton.vue";
import { useCartStore } from '~~/store/cart';
import { useLayout } from "~~/store/layout";
import { useProductStore } from "~~/store/products";
export default {
  components: {
    VueFeather,
    animatedButton,
  },
  data() {
    return {
      isCartOpen: false,
      searchBarOpen: false,
    };
  },
  computed: {
    cartTotal() {
      return useCartStore().cartTotal
    },
    getterCartItems() {
      return useCartStore().getCartItems
    },
    wishlist() {
      return useProductStore().wishlist
    },
    currencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  methods: {
    removeItem(productId) {
      useCartStore().removeCartItem(productId)
    },
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },
    openSearchBar() {
      this.$emit("openSearchBar");
    },
  },
};
</script>
