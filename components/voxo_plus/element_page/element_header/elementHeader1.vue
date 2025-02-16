<template>
  <div class="col-12">
    <div class="section-b-space">
      <div class="title title1 text-center">
        <h2>Header Style 1</h2>
      </div>

      <div class="contain-image-box">
        <header1 stopScrollWork="true" />
      </div>
    </div>
  </div>
</template>

<script>
import header1 from "~/layout/common/headers/header1.vue";
export default {
  components: {
    header1,
  },
};
</script>