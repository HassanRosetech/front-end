<template>
  <div class="col-12">
    <div class="section-b-space">
      <div class="title title1 text-center">
        <h2>Header Style 2</h2>
      </div>

      <div class="contain-image-box">
        <header2 :stopScrollWork="true" />
      </div>
    </div>
  </div>
</template>

<script>
import header2 from "~/layout/common/headers/header2.vue";
export default {
  components: {
    header2,
  },
};
</script>