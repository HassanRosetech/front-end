<template>
  <section>
    <div class="container">
      <div class="row gx-4 gy-5">
        <div class="col-lg-3 col-md-4 mt-lg-5 mt-0">
          <div class="category-option" :style="showSidebar?'left:0px':''">
            <div class="button-close mb-3">
              <button class="btn p-0" @click="showSidebar = false">
                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>{{ useRuntimeConfig().public.const.Close }}
              </button>
            </div>

            <leftSidebar />
          </div>
        </div>

        <div class="col-lg-9 col-12">
          <div class="filter-button mb-3">
            <button class="danger-button danger-center btn btn-sm filter-btn" @click="showSidebar = !showSidebar">
              <svg xmlns="http://www.w3.org/2000/svg" height="18" class="me-2" viewBox="0 0 448 512"><path fill="white" d="M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>   {{ useRuntimeConfig().public.const.Filter }}
            </button>
          </div>
          <div class="details-items">
            <div class="row g-4">
              <productSlider1 :sliderClass="sliderClass" :images="product.images" />
              <productRightSection :rightSectionClasses="rightSectionClasses" :product="product" />
            </div>
          </div>
        </div>

        <tabs />
      </div>
    </div>
  </section>
</template>

<script>
import VueFeather from "vue-feather";
import leftSidebar from "./leftSidebar.vue";
import tabs from "~/layout/common/productsComponents/tabs.vue";
import productRightSection from "~/layout/common/productsComponents/productRightSection.vue";
import productSlider1 from "~/layout/common/productsComponents/productSlider1.vue";
export default {
  components: {
    leftSidebar,
    productSlider1,
    tabs,
    productRightSection,
    VueFeather
  },
  props: ["product"],
  data() {
    return {
      sliderClass: "col-lg-5",
      rightSectionClasses: "col-lg-7 ",
      showSidebar:false
    };
  },
};
</script>
