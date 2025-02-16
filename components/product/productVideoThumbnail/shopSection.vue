<template>
  <section>
    <div class="container">
      <div class="row gx-4 gy-5">
        <div class="col-lg-3 col-md-4 mt-lg-5 mt-0">
          <div class="category-option">
            <div class="button-close mb-3">
              <button class="btn p-0">
                <i data-feather="arrow-left"></i> {{ useRuntimeConfig().public.const.Close }}
              </button>
            </div>

            <leftSidebar />
          </div>
        </div>

        <div class="col-lg-9 col-12">
          <!-- filter button -->
          <div class="filter-button mb-3">
            <button class="danger-button danger-center btn btn-sm filter-btn">
              <i data-feather="align-left"></i> {{ useRuntimeConfig().public.const.Filter }}
            </button>
          </div>
          <!-- filter button -->
          <div class="details-items">
            <div class="row g-4">
              <productSliderVideo />
              <productRightSection />
            </div>
          </div>
        </div>

        <tabs />
      </div>
    </div>
    <videoPlayModal />
  </section>
</template>

<script>
import leftSidebar from "./leftSidebar.vue";
import tabs from "~/layout/common/productsComponents/tabs.vue";
import productRightSection from "~/layout/common/productsComponents/productRightSection.vue";
import productSliderVideo from "~/layout/common/productsComponents/productSliderVideo.vue";
import videoPlayModal from "~/layout/elements/modals/videoPlayModal.vue";
import { useClickStore } from '~~/store/clickEvents';
export default {
  components: {
    leftSidebar,
    productSliderVideo,
    tabs,
    productRightSection,
    videoPlayModal,
  },
  data() {
    return {
      sliderClass: "col-lg-5",
      rightSectionClasses: "col-lg-7 ",
    };
  },
  computed: {
    showVideoModal() {
      return useClickStore().showVideoModal
    },
  },
};
</script>
