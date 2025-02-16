<template>
  <Head>
    <Title>Blog Details</Title>
  </Head>
  <layout5 pageName="Blog Details" parent="Blog">
    <BlogDetailsMainSection />
    <BlogDetailsCarousel />
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
      title: "Blog Details",
    };
  },
};
</script>