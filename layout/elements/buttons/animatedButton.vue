<template>
  <button type="button" @click="toLocation" :class="buttonClasses">
    <vue-feather v-if="featherType" :type="featherType"></vue-feather>
    <span>{{ buttonContent }}</span>
    <slot></slot>
  </button>
</template>

<script>
import VueFeather from "vue-feather";
export default {
  components: {
    VueFeather,
  },
  props: ["featherType", "buttonContent", "buttonClasses", "headerLocation"],
  methods: {
    toLocation() {
      if (!this.headerLocation) {
        this.headerLocation = "#";
      }
      this.$router.push(this.headerLocation);
    },
  },
};
</script>