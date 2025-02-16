<template>
  <section class="tab-section">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="title text-center">
            <h5>{{ useRuntimeConfig().public.const.SpecialOffer }}</h5>
            <h2>{{ useRuntimeConfig().public.const.HurryUp }}</h2>
          </div>
          <div class="tab-wrap">
            <ul class="nav nav-tabs" id="myTab">
              <li class="nav-item" v-for="(tab, index) in tabList" :key="index" @click="setActive(tab.name)">
                <button class="nav-link" :class="tab.active ? 'active' : ''" :id="tab.linkId" data-bs-toggle="tab"
                  :data-bs-target="tab.target" type="button">
                  {{ tab.displayTitle }}
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <hurryUpCard v-for="(tab, index) in tabList" :key="index" :tab="tab" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import hurryUpCard from "~/layout/elements/bannerBoxes/hurryUpBox.vue";
export default {
  components: {
    hurryUpCard,
  },
  props: ["tabList"],
  methods: {
    setActive(activeTab) {
      for (var i = 0; i < this.tabList.length; i++) {
        if (activeTab === this.tabList[i].name) {
          this.tabList[i].active = true;
        } else {
          this.tabList[i].active = false;
        }
      }
    },
  },
};
</script>
