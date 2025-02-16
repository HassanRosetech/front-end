<template>
  <Head>
    <Title>Shop No Sidebar</Title>
  </Head>
  <layout5 pageName="Shop Fashion" parent="Shop Listing">
    <shopnoBar />
  </layout5>
</template>
<script>
import layout5 from "~/layout/layouts/layout5.vue";
import shopnoBar from "~/layout/elements/shopSections/shopMain2.vue";
export default {
  components: { layout5, shopnoBar },
  head() {
    return {
      title: "Shop No Sidebar",
    };
  },
};
</script>