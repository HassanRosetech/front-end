<template>
  <div>
    <section class="timer-banner-style-2">
      <div class="container">
        <div class="row gy-3">
          <div class="col-lg-12">
            <div class="discount-image-details discount-spacing" :class="isLoaded ? 'sliderBackground bg-size' : ''"
              :style="{
                'background-image': `url(${getImageUrl(
                  banner.backgroundImage
                )})`,
              }">
              <img :src="('/images/' + banner.backgroundImage)" class="bg-img" alt=""
                :style="{ display: isLoaded ? 'none' : '' }" />
              <div class="discount-details">
                <div>
                  <div class="heart-button">
                    <i class="fas fa-heart theme-color"></i>
                  </div>
                  <h5 class="mt-3">
                    {{ banner.topHeading }}
                    <span class="theme-color">{{
                      banner.topHeadingColor
                    }}</span>
                  </h5>
                  <h2 class="my-3 deal-text">
                    {{ banner.mainHeading }}<br />{{ banner.mainHeadin2 }}
                    <span class="theme-color">{{
                      banner.mainHeading2Color
                    }}</span>
                  </h2>
                  <div class="timer-style-2 mt-xl-1 my-2 justify-content-center d-flex">
                    <ul>
                      <li>
                        <div class="counter">
                          <div>
                            <h2 id="days1" class="theme-color">
                              {{ days }}
                            </h2>
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
                  <button-animated buttonClasses="btn default-light-theme default-theme mt-2"
                    headerLocation="/shop/shop_left_sidebar" buttonContent="Shop Now" />
                  <div class="timer-bg timer-bg-center d-lg-block d-none">
                    <h3 class="mt-0">{{ banner.leftHeading }}</h3>
                    <span>{{ banner.leftSubHeading }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import buttonAnimated from "~/layout/elements/buttons/animatedButton.vue";
export default {
  components: { buttonAnimated },
  props: ["banner"],
  data() {
    return {
      isLoaded: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  created() {
    this.isLoaded = true;
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