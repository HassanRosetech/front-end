<template>
  <Head>
    <Title>Order Tracking</Title>
  </Head>
  <layout5 pageName="Order Tracking" parent="Order Tracking">
    <section class="section-b-space">
      <div class="container">
        <div class="row">
          <PageOrderTrackingTop />
          <PageOrderTrackingBottom />
        </div>
      </div>
    </section>
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
      title: "Order Tracking",
    };
  },
};
</script>