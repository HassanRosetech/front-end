<template>
  <section class="service-section service-style-2 section-b-space">
    <div class="container">
      <div class="row g-4 g-sm-3">
        <div class="col-xl-3 col-sm-6" v-for="(service, index) in services" :key="index">
          <div class="service-wrap">
            <div class="service-icon">
              <svg>
                <use v-bind="{ 'xlink:href': `/svg/icons.svg${service.svg}`, }"></use>
              </svg>
            </div>
            <div class="service-content">
              <h3 class="mb-2">{{ service.title }}</h3>
              <span class="font-light">{{ service.subTitle }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      svg: "#customer",
      services: [
        {
          svg: "#customer",
          title: "Customer Services",
          subTitle: "Top notch customer service.",
        },
        {
          svg: "#shop",
          title: "Pickup At Any Store",
          subTitle: "Free shipping on orders over $65.",
        },
        {
          svg: "#secure-payment",
          title: "Secured Payment",
          subTitle: "We accept all major credit cards.",
        },
        {
          svg: "#return",
          title: "Free Returns",
          subTitle: "30-days free return policy.",
        },
      ],
    };
  },
};
</script>
