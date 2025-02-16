<template>
  <div class="menu-right">
    <ul>
      <li>
        <div class="search-box d-flex" :class="iconBgColor" :style="{ color: iconBgColor ? 'white' : 'black' }"
          @click="openSearchBar">
          <vue-feather type="search"></vue-feather>
        </div>
      </li>
      <li class="onhover-dropdown">
        <div class="cart-media">
          <vue-feather type="user"></vue-feather>
        </div>
        <div class="onhover-div profile-dropdown">
          <ul v-if="user.isLoggedIn">
            
            <li >
              Welcome {{user.email}}
            </li>
            <li >
              <span @click.prevent="logoutUser"> Logout</span>
            </li>
          </ul>
          <ul v-else>
            
            <li >
              Welcome {{user.email}}
            </li>
            <li >
              <Nuxt-link to="/page/login"> Login</Nuxt-link>
            </li>
          </ul>
        </div>
      </li>
      <li class="onhover-dropdown wislist-dropdown">
        <div class="cart-media">
          <a href="javascript:void(0)" class="d-flex" @click.prevent="$router.push('/page/wishlist')">
            <vue-feather type="heart"></vue-feather>
            <span class="label label-theme rounded-pill">{{
              wishlist.length
            }}</span>
          </a>
        </div>
        <div class="onhover-div">
          <a @click.prevent="$router.push('/page/wishlist')">
            <div class="wishlist-empty">
              <i class="fab fa-gratipay"></i>
              <h6 class="mb-1" v-if="wishlist.length === 0">
                Your wislist empty !!
              </h6>
              <p class="font-light mb-0" v-if="wishlist.length === 0">
                explore more and shortlist items.
              </p>
              <h6 v-if="wishlist.length != 0">
                Your Wishlist has {{ wishlist.length }} items.
              </h6>
              <nuxt-link to="/page/wishlist" class="font-light mb-0" v-if="wishlist.length != 0">
                View Wishlist
              </nuxt-link>
            </div>
          </a>
        </div>
      </li>
      <li class="onhover-dropdown cart-dropdown" :class="isCartOpen ? 'show' : ''">
        <button type="button" @click="toggleCart" class="btn btn-solid-default btn-spacing">
          <vue-feather type="shopping-cart"></vue-feather>
          <span>$ {{ cartTotal }}</span>
        </button>
        <div class="onhover-div">
          <div class="cart-menu" v-if="getterCartItems.length != 0">
            <div class="cart-title">
              <h6>
                <vue-feather type="shopping-bag"></vue-feather>
                <span class="label label-theme rounded-pill">{{
                  getterCartItems.length
                }}</span>
              </h6>
              <span class="d-md-none d-block" @click="toggleCart">
                <i class="fas fa-arrow-right back-cart"></i>
              </span>
            </div>
            <ul class="custom-scroll">
              <li v-for="(item, index) in getterCartItems" :key="index">
                <div class="media">
                  <img :src="getImageUrl(item.images[0].src)" class="img-fluid" alt="no image" @click.prevent="
                    $router.push('/product/product_left_sidebar/' + item.id)
                  " />
                  <div class="media-body">
                    <h6 @click.prevent="
                      $router.push('/product/product_left_sidebar/' + item.id)
                    ">
                      {{ item.name }}
                    </h6>
                    <div class="qty-with-price">
                      <span>{{ currencySymbol }}{{ item.price }}</span>
                      <span>
                        <input type="number" class="form-control" min="1" :max="item.inStock" :value="item.quantity"
                          @blur="changeQuantityMixin($event, item)" @change.prevent="changeQuantityMixin($event, item)" />
                      </span>
                    </div>
                  </div>
                  <button type=" button" class="btn-close d-flex d-md-none" @click.prevent="removeItem(item.id)"
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
                  <img style="width: 100%" :src="'/images/cartEmptyHeader.png'" />
                </div>
              </li>
            </ul>
          </div>

          <div class="cart-btn" v-if="getterCartItems.length != 0">
            <h6 class="cart-total">
              <span>{{ useRuntimeConfig().public.const.Total }}:</span> {{ currencySymbol }}
              {{ cartTotal }}
            </h6>
            <animatedButton :buttonContent="useRuntimeConfig().public.const.ProceedTOPayment"
              buttonClasses="btn btn-solid-default btn-block" :headerLocation="'/page/cart'" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import VueFeather from "vue-feather";
import animatedButton from "~/layout/elements/buttons/animatedButton.vue";
import { useCartStore } from "~~/store/cart";
import { useLayout } from '~~/store/layout';
import { useProductStore } from '~~/store/products'
import { useUserDashboardStore } from "~~/store/userDashboard";
export default {
  components: {
    VueFeather,
    animatedButton,
  },
  props: ["iconBgColor"],
  data() {
    return {
      isCartOpen: false,
      searchBarOpen: false,
      cartItems: [],
      currencySymbol: useLayout().selectedCurrencySymbol
    };
  },
  computed: {
    cartItem() {
      return this.cartItems =  useCartStore().cartItems
    },
    cartTotal() {
      return useCartStore().cartTotal
    },
    getterCartItems() {
      return useCartStore().getCartItems
    },
    wishlist() {
      return useProductStore().wishlist
    },
    user(){
      return useUserDashboardStore().user
    }
  },
  methods: {
    removeItem(productId) {
      useCartStore().removeCartItem(productId)
    },
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },
    logoutUser() {
      useUserDashboardStore().logoutUser();
      this.$router.push('/page/login')
    },
    openSearchBar() {
      this.$emit("openSearchBar", true);
    },
  },
  mounted() {
    this.cartItems = this.getterCartItems;
  },
};
</script>