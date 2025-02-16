<template>
  <div class="col-12">
    <div class="section-t-space">
      <div class="title title1 text-center">
        <h2>Collection Banner 6</h2>
      </div>

      <div class="contain-image-box">
        <section class="poster-section ratio2_1 pt-0">
          <div class="container p-0">
            <div class="row">
              <bannerBox3 v-for="(banner, index) in banners" :key="index" :bannerClasses="bannerClasses(banner)"
                :item="banner" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
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