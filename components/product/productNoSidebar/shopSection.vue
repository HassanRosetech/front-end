<template>
  <section>
    <div class="container">
      <div class="row gx-4 gy-sm-5">
        <div class="col-12">
          <div class="details-items">
            <div class="row g-4">
              <productSlider />
              <productRightSection />
            </div>
          </div>
        </div>
        <tabs />
      </div>
    </div>
  </section>
</template>
<script>
import productRightSection from "~/layout/common/productsComponents/productRightSection.vue";
import productSlider from "~/layout/common/productsComponents/productSlider1.vue";
import tabs from "~/layout/common/productsComponents/tabs.vue";

export default {
  components: {
    productSlider,
    productRightSection,
    tabs,
  },
};
</script>