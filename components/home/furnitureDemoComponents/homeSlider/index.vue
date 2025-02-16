<template>
    <HomeFurnitureDemoComponentsHomeSliderLtr  v-if="layoutDirection=='ltr'"  />
    <HomeFurnitureDemoComponentsHomeSliderRtl  v-else  />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useLayout } from '~~/store/layout';

let {layoutType:layoutDirection} = storeToRefs(useLayout())
</script>
<style lang="scss" scoped>
.slider-nav{
top:425px;
}

</style>