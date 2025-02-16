<template>
  <section>
    <div class="container">
      <div class="row gx-4 gy-sm-5">
        <div class="col-12">
          <div class="details-items">
            <div class="row g-4">
              <productsImage />
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
import productsImage from "./productsImage.vue";
import tabs from "~/layout/common/productsComponents/tabs.vue";

export default {
  components: {
    productsImage,
    productRightSection,
    tabs,
  },
};
</script>