<template>
  <div class="mobile-menu d-sm-none">
    <ul>
      <li>
        <nuxt-link to="/home/fashion_demo" :class="$route.path === '/home/fashion_demo' ? 'active' : ''">
          <vue-feather type="home"></vue-feather>
          <span>Home</span>
        </nuxt-link>
      </li>
      <li>
        <a href="javascript:void(0)" class="toggle-category" @click="openCategory">
          <vue-feather type="align-justify"></vue-feather>
          <span>{{ useRuntimeConfig().public.const.Category }}</span>
        </a>
      </li>
      <li>
        <nuxt-link to="/page/cart" :class="$route.path === '/page/cart' ? 'active' : ''">
          <vue-feather type="shopping-bag"></vue-feather>
          <span>Cart</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/page/wishlist" :class="$route.path === '/page/wishlist' ? 'active' : ''">
          <vue-feather type="heart"></vue-feather>
          <span>{{ useRuntimeConfig().public.const.wishlist }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/page/user_dashboard" :class="$route.path === '/page/user_dashboard' ? 'active' : ''">
          <vue-feather type="user"></vue-feather>
          <span>Account</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import VueFeather from "vue-feather";
import { useClickStore } from '~~/store/clickEvents';
export default {
  components: {
    VueFeather,
  },
  methods: {
    openCategory() {
      useClickStore().toggleCategoryMobileMenu()
    },
  },
};
</script>
