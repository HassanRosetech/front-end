<template>
  <HomeFlowerDemoComponentsHomeSliderLtr v-if="layoutDirection == 'ltr'" />
  <HomeFlowerDemoComponentsHomeSliderRtl v-else />
</template>
  
<script setup>
import { storeToRefs } from 'pinia';
import { useLayout } from '~~/store/layout';

let { layoutType: layoutDirection } = storeToRefs(useLayout())
</script>
<style lang="scss" scoped>
.slider-nav {
  top: 425px;
}
</style>