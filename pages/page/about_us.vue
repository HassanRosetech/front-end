<template>
  <Head>
    <Title>About Us</Title>
  </Head>
  <layout5 pageName="About Us" parent="About us">
    <PageAboutUsMainSection />
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
      title: "About Us",
    };
  },
};
</script>
