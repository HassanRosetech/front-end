<template>
  <Head>
    <Title>Blog Left Sidebar</Title>
  </Head>
  <layout5 pageName="Blog Left Side Bar" parent="Blog">
    <BlogLeftSidebarMainSection />
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
      title: "Blog Left Sidebar",
    };
  },
};
</script>