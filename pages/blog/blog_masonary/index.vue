<template>
  <Head>
    <Title>Blog Masonary</Title>
  </Head>
  <layout5 pageName="Blog Listing" parent="Blog">
    <BlogMasonaryMain />
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
      title: "Blog Masonary",
    };
  },
};
</script>