<template>
  <layout5 pageName="Element Header" parent="Element Header">
    <section>
      <div class="container-fluid">
        <div class="row">
          <VoxoPlusElementPageElementHeaderElementHeader1/>
          <VoxoPlusElementPageElementHeaderElementHeader2 />
          <VoxoPlusElementPageElementHeaderElementHeader3 />
          <VoxoPlusElementPageElementHeaderElementHeader4 />
          <VoxoPlusElementPageElementHeaderElementHeader5 />
        </div>
      </div>
    </section>
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
export default {
  components: {
    layout5,
  },
  head() {
    return {
      title: "Element Header",
    };
  },
};
</script>
<style lang="scss">
@import "~/assets/scss/element-header.scss";
</style>