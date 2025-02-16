<template>
  <section class="left-sidebar-section masonary-blog-section section-b-space">
    <div class="container">
      <div class="row g-4">
        <BlogRightSidebarLeft />
        <RightSection />
      </div>
    </div>
  </section>
</template>

<script>
import RightSection from './Right.vue';
export default {
  components: {
    RightSection
  }
}

</script>

