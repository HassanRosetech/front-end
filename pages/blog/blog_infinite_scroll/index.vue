<template>
  <Head>
    <Title>Blog Infinite Scroll</Title>
  </Head>
  <layout5 pageName="Blog Infinite Scroll" parent="Blog">
    <BlogInfiniteScrollMainSection />
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
      title: "Blog Infinite Scroll",
    };
  },
};
</script>