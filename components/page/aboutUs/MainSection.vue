<template>
  <div>
    <!-- team leader section Start -->
    <PageAboutUsTeamLeaderSection />

    <!-- team leader section End -->

    <!-- service section start -->
    <PageAboutUsServiceSection />
    <!-- service section end -->

    <!-- Leader section start -->
    <PageAboutUsLeaderSection :teamLeaders="teamLeaders" />

    <!-- leader section End -->
    <!-- testimonial section start -->
    <PageAboutUsTestimonialSection :testimonials="testimonials" />
  </div>
</template>

<script>
import { useBannerStore } from '~~/store/banners';

export default {
  computed: {
    testimonials() {
      return useBannerStore().data.filter(
        (item) => item.type == "aboutUsTestimonial"
      )[0].children
    },
    teamLeaders() {
      return useBannerStore().data.filter(
        (item) => item.type === "aboutTeamLeaders"
      )[0].children
    }
  },
};
</script>

<style>

</style>
