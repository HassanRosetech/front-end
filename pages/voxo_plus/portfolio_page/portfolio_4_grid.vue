<template>
  <layout5 pageName="Portfolio Grid" parent="Portfolio">
    <PortfolioGrid :column-width="300" parentDivClasses="ratio_square" childDivClasses="col-lg-3 col-md-4" />
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
      title: "Portfolio 4 Grid",
    };
  },
};
</script>