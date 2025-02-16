<template>
  <div class="banner-deatils">
    <div class="banner-image" :class="isLoaded ? 'sliderBackground bg-size' : ''" :style="{
      'background-image': `url(${getImageUrl(image)})`,
    }">
      <img :src="getImageUrl(image)" class="img-fluid bg-img" alt="" :style="{ display: isLoaded ? 'none' : '' }" />
      <div class="banner-content">
        <div>
          <h3>{{ useRuntimeConfig().public.const.ShopTheLatestTrends }}</h3>
          <p>
            {{ useRuntimeConfig().public.const.shopdescription }}
          </p>
        </div>
      </div>
    </div>
    <div class="banner-contain mt-3 mb-5">
      <p class="font-light">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: "fashion/banner.jpg",
      isLoaded: false,
    };
  },

  created() {
    this.isLoaded = true;
  },
};
</script>
