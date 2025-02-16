<template>
  <Head>
    <Title>Order Success</Title>
  </Head>
  <layout5 :breadcrumb="false" pageName="Order Success" parent="Order Success">
    <template v-slot:breadcrumb>
      <breadcrumb3 />
    </template>
    <PageOrderSuccessDetails />
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import breadcrumb3 from "~/layout/elements/breadcrumbs/breadcrumb3.vue";
export default {
  components: {
    layout5,
    breadcrumb3,
  },
  head() {
    return {
      title: "Order Success",
    };
  },
};
</script>