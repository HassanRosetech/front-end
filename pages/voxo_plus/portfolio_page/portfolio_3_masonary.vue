<template>
  <layout5 parent="Portfolio" pageName="Portfolio Masonary">
    <PortfolioMasonary :column-width="400" masonaryParentClasses="g-3 masonry-container" masonaryItemClasses="col-lg-4 col-sm-6 "
      imageClasses="img-fluid" />
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
      title: "Portfolio 3 Masonary",
    };
  },
};
</script>