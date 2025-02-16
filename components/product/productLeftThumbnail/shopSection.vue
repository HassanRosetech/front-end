<template>
  <section>
    <div class="container">
      <div class="row gx-4 gy-sm-5">
        <div class="col-12">
          <div class="details-items">
            <div class="row g-4">
              <productSlider2 />

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
import productSlider2 from "~/layout/common/productsComponents/productSlider2.vue";
export default {
  components: { tabs, productRightSection, productSlider2 },
};
</script>