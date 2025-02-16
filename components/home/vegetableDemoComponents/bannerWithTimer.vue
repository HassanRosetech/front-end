<template>
  <section class="ratio2_1 section-b-space">
    <div class="container">
      <div class="row gy-3">
        <div class="col-xl-9 col-lg-8">
          <div class="timer-banner text-center sliderBackground bg-size" :style="{
            'background-image': `url(${getImageUrl(banner.backgroundimage)})`,
          }">
            <img class="bg-img d-none" alt="" :src="getImageUrl(banner.backgroundimage)" />
            <img :src="getImageUrl(banner.fruitsimage)" class="img-fluid veg-image" alt="" />
            <img :src="getImageUrl(banner.cirleimage)" class="round-circle" alt="" />
            <div class="coupon-code theme-color">DGR548548</div>
            <div class="discount-offer">
              <h5>
                {{ banner.lefttext }}
                <span class="theme-color">{{ banner.discount }}% OFF
                  <span class="wishlist-icon mt-2">
                    <i class="fas fa-heart"></i>
                  </span>
                </span>
              </h5>
            </div>

            <div class="timer">
              <ul class="light-color">
                <li>
                  <div class="counter">
                    <div>
                      <h2 id="days1">{{ days }}</h2>
                      {{ useRuntimeConfig().public.const.Days }}
                    </div>
                  </div>
                </li>
                <li>
                  <div class="counter">
                    <div>
                      <h2 id="hours1">{{ hours }}</h2>
                      {{ useRuntimeConfig().public.const.Hour }}
                    </div>
                  </div>
                </li>
                <li>
                  <div class="counter">
                    <div>
                      <h2 id="minutes1">{{ minutes }}</h2>
                      {{ useRuntimeConfig().public.const.Min }}
                    </div>
                  </div>
                </li>
                <li>
                  <div class="counter">
                    <div>
                      <h2 id="seconds1">{{ seconds }}</h2>
                      {{ useRuntimeConfig().public.const.Sec }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="banner-btn-group">
              <button href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')" type="button"
                class="btn btn-solid-default">
                {{ useRuntimeConfig().public.const.ShopNow }}
              </button>
            </div>

            <div class="social-media">
              <div class="social-icon" v-for="(social, index) in banner.socialmedia" :key="index">
                <img :src="getImageUrl(social.image)" class="img-fluid" alt="" />
                <h6>{{ social.title }}</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 small-banner">
          <div class="collection-banner text-center collection-center sliderBackground bg-size" :style="{
            'background-image': `url(${getImageUrl(
              banner.rightbackgroundimage
            )})`,
          }">
            <img :src="getImageUrl(banner.rightbackgroundimage)" class="bg-img d-none" alt="" />
            <div>
              <h6 class="theme-color mb-2">{{ banner.rightsmallheading }}</h6>
              <h2>{{ banner.rightheadingtop }}</h2>
              <h2>{{ banner.rightheadingbottom }}</h2>
              <p class="mt-2 mb-0 font-light">{{ banner.bottomsmalltop }}</p>
              <p class="font-light mb-0">{{ banner.bottomsmallbottom }}</p>
              <button href="javascript:void(0)" @click.prevent="$router.push('/shop/shop_left_sidebar')" type="button"
                class="btn btn-solid-default mt-4">
                Shop now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["banner"],
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  created() {
    var second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;
    var countDown = new Date("Aug 21, 2023 00:00:00").getTime();
    setInterval(() => {
      var now = new Date().getTime();
      this.days = Math.floor((countDown - now) / day);
      this.hours = Math.floor(((countDown - now) % day) / hour);
      this.minutes = Math.floor(((countDown - now) % hour) / minute);
      this.seconds = Math.floor(((countDown - now) % minute) / second);
    }, second);
  },
};
</script>
