<template>
  <section class="section-b-space pt-0">
    <div class="container-fluid">
      <div class="row g-4">
        <div class="col-12">
          <div class="title title1 text-center">
            <h2>Home Style 5</h2>
          </div>

          <div class="contain-image-box">
            <HomeShoesDemoComponentsHomeSlider :slides="slides" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useHomeSliderStore } from "~~/store/homeSliders";
export default {
  computed: {
    slides() {
      return useHomeSliderStore().data.filter(
        (item) => item.type === "shoes"
      )[0].slides;
    },
  },
};
</script>