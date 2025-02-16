<template>
  <Head>
    <Title>Compare</Title>
  </Head>
  <layout5 pageName="Compare" parent="Compare">
    <section class="section-b-space">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="comparemodal-body">
              <div class="table-wrapper table-responsive ratio_asos">
                <PageCompareTable :productsToCompare="productsToCompare" v-if="productsToCompare?.length" />
                <div v-else>
                  <div class="compare-empty-box">
                    <img :src="getImageUrl('empty-compare.png')" alt="" />
                    <animatedButton :buttonContent="useRuntimeConfig().public.const.ContinueShopping"
                      buttonClasses="btn btn-solid-default btn-block mt-4"
                      :headerLocation="'/shop/shop_canvas_filter'" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </layout5>
</template>
<script>
import layout5 from "~/layout/layouts/layout5.vue";
import animatedButton from "~/layout/elements/buttons/animatedButton.vue";
import { useCompareStore } from "~~/store/compare";
export default {
  components: {
    layout5,
    animatedButton,
  },
  head() {
    return {
      title: "Compare",
    };
  },
  computed: {
    productsToCompare() {
      return useCompareStore().compareItems
    }
  },
};
</script>