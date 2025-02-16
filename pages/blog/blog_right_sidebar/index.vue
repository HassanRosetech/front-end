<template>
  <Head>
    <Title>Blog Right Sidebar</Title>
  </Head>
  <layout5 pageName="Blog Right Sidebar" parent="Blog">
    <BlogRightSidebarMainSection />
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
      title: " Blog Right Sidebar",
    };
  },
};
</script>