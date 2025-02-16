<template>
  <div :class="bannerClasses">
    <div class="poster-image sliderBackground bg-size" :style="{
      'background-image': `url(${getImageUrl(item.image)})`,
    }">
      <img :src="getImageUrl(item.image)" class="img-fluid bg-img d-none" alt="" />
      <div class="poster-image-details">
        <div>
          <h5>{{ item.topTitle }}</h5>
          <h2>{{ item.heading }}</h2>
          <p class="d-sm-block d-none my-1">
            {{ item.feature }}
          </p>
          <h3>
            {{ selectedCurrencySymbol }}{{ item.price }}
            <span><del>{{ selectedCurrencySymbol }}{{ item.mrp }}</del></span>
          </h3>
          <button href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')"
            class="btn btn-solid-default">
            {{ useRuntimeConfig().public.const.BUYNOW }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLayout } from '~~/store/layout';

export default {
  props: ["bannerClasses", "item"],

  computed: {
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  methods: {
    getImageUrl(path) {
      return ("/images/" + path)
    }
  }
};
</script>
