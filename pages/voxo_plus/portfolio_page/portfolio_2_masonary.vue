<template>
  <layout5 pageName="Portfolio Masonary" parent="Portfolio">

    <PortfolioMasonary :column-width="600" masonaryParentClasses="g-3 masonry-container" masonaryItemClasses="col-sm-6"
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
      title: "Portfolio Masonary",
    };
  },
};
</script>