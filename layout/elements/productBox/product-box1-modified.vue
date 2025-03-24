<template>
  <productBox1_skeletonLoader v-if="showSkeletonLoader" />
  <div class="product-box" :class="productBoxClasses" v-else>
    <!-- <div class="img-wrapper">
      <div @click="gotoProduct">
        <a
          @click="$router.push('/shop/shop_left_sidebar/' + product.name)"
          class="front sliderBackground bg-size"
          :style="{
            'background-image': `url(${getImageUrl(product.images[0].src)})`,
          }"
        >
          <img
            :src="getImageUrl(product.images[0].src)"
            class="bg-img d-none"
            alt=""
          />
        </a>
      </div>
      <div @click="gotoProduct">
        <a
          @click="$router.push('/shop/shop_left_sidebar/' + product.name)"
          class="back sliderBackground bg-size"
          :style="{
            'background-image': `url(${getImageUrl(
              product.images[1] ? product.images[1].src : product.images[0].src
            )})`,
          }"
        >
          <img
            :src="
              getImageUrl(
                product.images[1]
                  ? product.images[1].src
                  : product.images[0].src
              )
            "
            class="bg-img d-none"
            alt=""
          />
        </a>
      </div>
    </div> -->
    <div class="product-details">
      <div class="rating-details"></div>
      <div class="main-price">
        <a
          href="javascript:void(0)"
          @click.prevent="
            $router.push('/shop/shop_left_sidebar/' + product.name)
          "
          class="font-default"
        >
          <h6 style="width: fit-content; font-weight: bold">
            {{ product.name }}
          </h6>
        </a>
        <div class="listing-content">
          <span class="font-light">{{ product.size }}</span>
          <p class="font-light">{{ product.description }}</p>
        </div>
        <!-- <h3 class="theme-color">
            {{ selectedCurrencySymbol }}{{ product.price }}
          </h3> -->
        <button @click="toggleCartModal(product)" class="btn listing-content">
          {{ useRuntimeConfig().public.const.Addtocart }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VueFeather from "vue-feather";
import productBox1_skeletonLoader from "~/layout/elements/skeletonLoaders/productBox1_skeletonLoader.vue";
import { useClickStore } from "~~/store/clickEvents";
import { useLayout } from "~~/store/layout";
export default {
  components: {
    VueFeather,
    productBox1_skeletonLoader,
  },
  props: ["product", "productBoxClasses"],
  data() {
    return {
      showSkeletonLoader: true,
    };
  },
  computed: {
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol;
    },
  },
  methods: {
    gotoProduct() {
      this.$router.push({
        path: "/shop/shop_left_sidebar/" + this.product.name,
      });
    },
    toggleQuickViewModal(productId) {
      useClickStore().changeProductId(productId);
    },
    getImageUrl(path) {
      return "/images/" + path;
    },
  },
  mounted() {
    setTimeout(() => {
      this.showSkeletonLoader = false;
    }, 2000);
  },
};
</script>
<style>
.product-box .product-details {
  margin-top: 0px;
}
</style>
