<template>
  <section class="poster-section ratio2_1">
    <div>
      <div class="container">
        <div class="row">
          <bannerBox3 v-for="(banner, index) in banners" :key="index" :bannerClasses="bannerClasses(banner)"
            :item="banner" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import bannerBox3 from "~/layout/elements/bannerBoxes/bannerBox3.vue";
export default {
  components: { bannerBox3 },
  props: ["banners"],
  methods: {
    bannerClasses(banner) {
      if (banner.class) return "col-lg-6 mt-lg-0 mt-4";
      else return "col-lg-6";
    },
  },
};
</script>