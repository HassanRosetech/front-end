<template>
    <swiper dir="rtl" :navigation="false" :modules="modules" effect="fade" :slidesPerView="auto">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <homeSlide :slide="slide" />
        </swiper-slide>
      </swiper>
</template>

<script>
    export default {
        props:['slides']
    }
</script>

<style lang="scss" scoped>

</style>