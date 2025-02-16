<template>
  <div class="col-12">
    <div class="section-b-space">
      <div class="title title1 text-center">
        <h2>Header Style 4</h2>
      </div>

      <div class="contain-image-box">
        <header3 :stopScrollWork="true" />
      </div>
    </div>
  </div>
</template>

<script>
import header3 from "~/layout/common/headers/header3.vue";
export default {
  components: {
    header3,
  },
};
</script>