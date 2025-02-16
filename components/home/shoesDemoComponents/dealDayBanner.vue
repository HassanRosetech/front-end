<template>
  <section class="deal-section section-b-space">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="discount-image-details">
            <div class="discount-images">
              <div class="theme-circle"></div>
              <img :src="getImageUrl(banner.image)" alt="" class="img-fluid shoes-images-1" />
              <img :src="getImageUrl(banner.image)" alt="" class="img-fluid shoes-images-2" />
            </div>

            <div class="discount-details mt-xl-0 mt-4">
              <div>
                <div class="heart-button">
                  <i class="fas fa-heart theme-color"></i>
                </div>
                <h5 class="mt-3">
                  {{ banner.title }}
                  <span class="theme-color">{{ banner.discount }}</span>
                </h5>
                <h2 class="my-3 deal-text">
                  {{ banner.headingtop }}<br />{{ banner.headinbottom }}
                  <span class="theme-color">{{ banner.price }}</span>
                </h2>
                <div class="timer-style-2 mt-xl-1 my-2 justify-content-center d-flex shoes-timer">
                  <ul>
                    <li>
                      <div class="counter">
                        <div>
                          <h2 id="days1" class="theme-color">{{ days }}</h2>
                          {{ useRuntimeConfig().public.const.Days }}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="counter">
                        <div>
                          <h2 id="hours1" class="theme-color">{{ hours }}</h2>
                          {{ useRuntimeConfig().public.const.Hour }}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="counter">
                        <div>
                          <h2 id="minutes1" class="theme-color">
                            {{ minutes }}
                          </h2>
                          {{ useRuntimeConfig().public.const.Min }}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="counter">
                        <div>
                          <h2 id="seconds1" class="theme-color">
                            {{ seconds }}
                          </h2>
                          {{ useRuntimeConfig().public.const.Sec }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <nuxt-link to="/shop/shop_canvas_filter" type="button" class="btn default-light-theme default-theme mt-2">
                  {{ useRuntimeConfig().public.const.ShopNow }}
                </nuxt-link>
              </div>
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
  methods: {
    getImageUrl(path) {
      return ("/images/" + path)
    }
  },
  mounted() {
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
