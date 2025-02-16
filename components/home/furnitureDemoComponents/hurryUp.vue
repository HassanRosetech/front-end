<template>
  <section class="tab-section">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="title-3 text-center">
                    <h2>Hurry up!</h2>
                    <h5 class="theme-color">Special Offer</h5>
                </div>
                <WrapperTabs :tabs="tabList">
                  <template v-for="(tab, index) in tabList" :key="index" v-slot:[tab.id]>
                    <hurryUpCard productBoxClasses="product-box1"  :key="'Tabbox'+index" :tab="tab"  />
                  </template>
                </WrapperTabs>
            </div>
        </div>
    </div>
</section>
</template>
<script>
import hurryUpCard from "~/layout/elements/bannerBoxes/TabBox1.vue";
export default {
  components: {
    hurryUpCard,
},
  props: ["tabList"],
};
</script>
