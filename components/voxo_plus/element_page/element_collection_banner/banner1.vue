<template>
  <div class="col-12">
    <div>
      <div class="title title1 text-center">
        <h2>{{ useRuntimeConfig().public.const.Collection1 }}</h2>
      </div>

      <div class="contain-image-box">
        <section class="ratio2_1 banner-style-2 pt-0">
          <div class="container p-0">
            <div class="row gy-4">
              <bannerBox1 v-for="(banner, index) in banners" :key="index" :banner="banner"
                :bannerClasses="bannerClasses(banner)" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import bannerBox1 from "~/layout/elements/bannerBoxes/bannerBox1.vue";
export default {
  components: {
    bannerBox1,
  },
  props: ["banners"],
  data() {
    return {
      isLoaded: false,
    };
  },
  methods: {
    bannerClasses(banner) {
      if (banner.class) return "col-lg-4";
      else return "col-lg-4 col-md-6";
    },
  },
  created() {
    this.isLoaded = true;
  },
};
</script>
