<template>
  <Head>
    <Title>Blog No Sidebar</Title>
  </Head>
  <layout5 pageName="Blog No Sidebar" parent="Blog">
    <BlogNoSidebarMainSection />
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
      title: "Blog No Sidebar",
    };
  },
};
</script>