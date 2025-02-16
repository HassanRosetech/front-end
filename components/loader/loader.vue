<template>
  <div v-if="loading" class="loading-page">
    <div class="loading">
      <div class="topDiv"></div>
      <img src="/voxo/loader.gif" alt="" id="loader" />
      <div class="bottomDiv"></div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>
<style scoped>
.loading-page {
  overflow: hidden;
  z-index: 9853;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
}
</style>