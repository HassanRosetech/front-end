<template>
  <layout5 pageName="Portfolio Grid" parent="Portfolio">
    <PortfolioGrid :column-width="600" parentDivClasses="ratio_square" />
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
      title: "Portfolio 2 Grid",
    };
  },
};
</script>