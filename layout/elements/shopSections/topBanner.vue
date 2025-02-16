<template>
  <div class="banner-deatils">
    <div class="banner-image">
      <img src="/images/fashion/banner.jpg" class="img-fluid bg-img" alt="" />
      <div class="banner-content">
        <div>
          <h3>{{ useRuntimeConfig().public.const.ShopTheLatestTrends }}</h3>
          <p>{{ useRuntimeConfig().public.const.shopdescription }}</p>
        </div>
      </div>
    </div>
    <div class="banner-contain mt-3 mb-5">
      <p class="font-light">
        {{ useRuntimeConfig().public.const.bannerdescription }}
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>
