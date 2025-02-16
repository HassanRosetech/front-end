<template>
  <layout5 pageName="Portfolio Grid" parent="Portfolio">
    <PortfolioGrid :columnWidth="350" parentDivClasses="ratio_asos" childDivClasses="col-md-4" />
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
      title: "Portfolio 3 Grid",
    };
  },
};
</script>