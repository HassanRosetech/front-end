<template>
  <div class="col-12">
    <div class="section-b-space">
      <div class="title title1 text-center">
        <h2>Header Style 5</h2>
      </div>

      <div class="contain-image-box">
        <header4 :stopScrollWork="true" />
      </div>
    </div>
  </div>
</template>

<script>
import header4 from "~/layout/common/headers/header4.vue";
export default {
  components: { header4 },
};
</script>