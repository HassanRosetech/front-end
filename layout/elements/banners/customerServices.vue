<template>
  <section class="service-section" :class="serviceClasses">
    <div class="container">
      <div class="row g-4 g-sm-3">
        <div class="col-xl-3 col-sm-6" v-for="(service, index) in services" :key="index">
          <div class="service-wrap">
            <div class="service-icon">
              <svg>
                <use :xlink:href="('/svg/icons.svg') + service.svg"></use>
              </svg>
            </div>
            <div class="service-content">
              <h3 class="mb-2">{{ service.service }}</h3>
              <span class="font-light">{{ service.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useInfoStore } from '~~/store/information'
export default {
  props: ["serviceClasses"],
  data() {
    return {
      customerSvg: "#customer",
    };
  },
  computed: {
    services() {
      return useInfoStore().data.filter(
        (item) => item.type === "customerServices"
      )[0].children;
    },
  },
};
</script>
