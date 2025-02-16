<template>
  <div class="main-header">
    <div class="container-fluid-lg">
      <div class="row">
        <div class="col-lg-12">
          <div class="main-menu">
            <mainNavbar1 :openMobileNavProp="openMobileNav" @toggleMobileNav="toggleMobileNav" :hideToggleBars="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainNavbar1 from "~/layout/elements/headerElements/mainNavbar1.vue";
export default {
  components: { mainNavbar1 },
  props: ["openMobileNav"],
  watch: {
    openMobileNav: function () { },
  },
  methods: {
    toggleMobileNav(value) {
      this.$emit("toggleMobileNav", value);
    },
  },
};
</script>