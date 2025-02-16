<template>
  <section>
    <div class="container">
      <div class="row gx-4 gy-sm-5">
        <div class="col-12">
          <div class="details-items">
            <div class="row g-4">
              <productImages />
              <productRightSection :product="product" />
            </div>
          </div>
        </div>
        <tabs />
      </div>
    </div>
  </section>
</template>

<script>
import productImages from "./productImages.vue";
import productRightSection from "~/layout/common/productsComponents/productRightSection.vue";
import tabs from "~/layout/common/productsComponents/tabs.vue";
export default {
  components: {
    productImages,
    productRightSection,
    tabs,
  },
  props: ["product"],
};
</script>