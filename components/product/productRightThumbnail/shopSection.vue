<template>
  <section>
    <div class="container">
      <div class="row gx-4 gy-sm-5">
        <div class="col-12">
          <div class="details-items">
            <div class="row g-4">
              <productSlider3 />

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
import tabs from "~/layout/common/productsComponents/tabs.vue";
import productSlider3 from "~/layout/common/productsComponents/productSlider3.vue";
export default {
  components: { tabs, productRightSection, productSlider3 },
};
</script>