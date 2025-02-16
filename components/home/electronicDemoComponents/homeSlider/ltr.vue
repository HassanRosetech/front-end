<template>
    <swiper :loop="true" :navigation="false"  effect="fade" :slidesPerView="1">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <HomeElectronicDemoComponentsHomeSlide :slide="slide" />
        </swiper-slide>
      </swiper>
</template>

<script>

    export default {
    props: ['slides'],
}
</script>

<style lang="scss" scoped>

</style>