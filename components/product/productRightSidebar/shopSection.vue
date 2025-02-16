<template>
  <section>
    <div class="container">
      <div class="row gx-4 gy-5">
        <div class="col-lg-9 col-12">
          <div class="filter-button mb-3">
            <button class="danger-button danger-center btn btn-sm filter-btn" >
              <svg xmlns="http://www.w3.org/2000/svg" height="18" class="me-2" viewBox="0 0 448 512"><path fill="white" d="M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg> {{ useRuntimeConfig().public.const.Filter }}
            </button>
          </div>
          <div class="details-items">
            <div class="row g-4">
              <productSlider1 :sliderClass="sliderClass" />

              <productRightSection :rightSectionClasses="rightSectionClasses" />
            </div>
          </div>
        </div>

        <rightSidebar />

        <tabs />
      </div>
    </div>
  </section>
</template>

<script>
import tabs from "~/layout/common/productsComponents/tabs.vue";
import rightSidebar from "./rightSidebar.vue";
import productSlider1 from "~/layout/common/productsComponents/productSlider1.vue";
import productRightSection from "~/layout/common/productsComponents/productRightSection.vue";
export default {
  components: {
    tabs,
    rightSidebar,
    productSlider1,
    productRightSection,
  },
  data() {
    return {
      sliderClass: "col-lg-5",
      rightSectionClasses: "col-lg-7",
      showSidebar:false
    };
  },
};
</script>
