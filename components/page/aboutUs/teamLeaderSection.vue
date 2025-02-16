<template>
  <section class="overflow-hidden">
    <div class="container">
      <div class="row g-5">
        <div class="col-xl-5 offset-xl-1">
          <div class="row g-3">
            <div class="col-md-6">
              <img src="/images/inner-page/review-image/6.jpg" class="img-fluid rounded-3 about-image" alt="" />
            </div>
            <div class="col-md-6">
              <img src="/images/inner-page/review-image/7.jpg" class="img-fluid rounded-3 about-image" alt="" />
            </div>
            <div class="col-12 ratio_40">
              <div>
                <img src="/images/inner-page/review-image/8.jpg" class="img-fluid rounded-3 team-image bg-img" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-5">
          <div class="about-details">
            <div>
              <h2>{{ useRuntimeConfig().public.const.whoAreWe }}</h2>
              <h3>{{ useRuntimeConfig().public.const.largerFashion }}</h3>
              <p>
                {{ useRuntimeConfig().public.const.aboutUsDesc }}
              </p>
              <p>
                {{ useRuntimeConfig().public.const.aboutUsDesc2 }}
              </p>
              <button @click.prevent="$router.push('/shop/shop_left_sidebar')" type="button"
                class="btn btn-solid-default">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>

</style>
