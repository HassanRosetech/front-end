<template>
  <section>
    <div class="container">
      <div class="row gx-4 gy-sm-5">
        <div class="col-12">
          <div class="details-items">
            <div class="row g-4">
              <productSlider1 />
              <productRightSection>
                <frequentlyBought />
              </productRightSection>
            </div>
          </div>
        </div>

        <tabs />
      </div>
    </div>
  </section>
</template>

<script>
import frequentlyBought from "./frequentlyBought.vue";
import productSlider1 from "~/layout/common/productsComponents/productSlider1.vue";
import productRightSection from "~/layout/common/productsComponents/productRightSection.vue";
import tabs from "~/layout/common/productsComponents/tabs.vue";
export default {
  components: {
    productSlider1,
    frequentlyBought,
    productRightSection,
    tabs,
  },
};
</script>