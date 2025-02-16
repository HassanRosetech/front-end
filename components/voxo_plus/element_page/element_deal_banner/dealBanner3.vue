<template>
  <div class="section-b-space">
    <div class="title title1 text-center">
      <h2>{{ useRuntimeConfig().public.const.Deal3 }}</h2>
    </div>

    <div class="contain-image-box">
      <section class="deal-section pt-3">
        <div class="container">
          <div class="discount-image-details-1">
            <div class="discount-images">
              <div class="theme-circle"></div>
              <img :src="getImageUrl(banner.image)" class="img-fluid shoes-images" alt="" />
            </div>

            <div class="discount-details mt-xl-0 mt-4">
              <div>
                <div class="heart-button">
                  <i class="fas fa-heart theme-color"></i>
                </div>

                <div class="discount-shop">
                  <h2 class="text-spacing">{{ banner.lefthead }}</h2>
                  <h6>{{ banner.leftsubhead }}</h6>
                </div>

                <h5 class="mt-3">
                  {{ banner.mainhead1 }}
                  <span class="theme-color">{{ banner.offer }}</span>
                </h5>
                <h2 class="my-2 deal-text">
                  {{ banner.mainhead2 }} <br />{{ banner.mainhead3 }}
                  <span class="theme-color">{{ banner.price }}</span>
                </h2>
                <div class="timer-style-2 my-2 justify-content-center d-flex">
                  <ul>
                    <li v-for="(item, index) in keys" :key="index">
                      <div class="counter">
                        <div>
                          <h2 id="days1" class="theme-color">
                            {{ timer[item] }}
                          </h2>
                          {{ useRuntimeConfig().public.const.Days }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <button @click.prevent="$router.push('/shop/shop_left_sidebar')" type="button"
                  class="btn default-light-theme default-theme mt-2">
                  {{ useRuntimeConfig().public.const.ShopNow }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: ["banner"],
  data() {
    return {
      timer: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      keys: [],
    };
  },

  mounted() {
    this.keys = Object.keys(this.timer);
    var second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;
    var countDown = new Date("Aug 21, 2023 00:00:00").getTime();
    setInterval(() => {
      var now = new Date().getTime();
      this.timer["days"] = Math.floor((countDown - now) / day);
      this.timer["hours"] = Math.floor(((countDown - now) % day) / hour);
      this.timer["minutes"] = Math.floor(((countDown - now) % hour) / minute);
      this.timer["seconds"] = Math.floor(((countDown - now) % minute) / second);
    }, second);
  },
};
</script>
