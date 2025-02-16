<template>
  <div class="mt-2 mt-md-3 border-product">
    <h6 class="product-title hurry-title d-block">
      Hurry Up! Left <span>10</span> in stock
    </h6>
    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: 78%"></div>
    </div>
    <div class="font-light timer-5">
      <h5>Order in the next to get</h5>
      <ul class="timer1">
        <li class="counter">
          <h5 id="days">{{ days }}</h5>
          {{ useRuntimeConfig().public.const.Days }} :
        </li>
        <li class="counter">
          <h5 id="hours">{{ hours }}</h5>
          {{ useRuntimeConfig().public.const.Hour }} :
        </li>
        <li class="counter">
          <h5 id="minutes">{{ minutes }}</h5>
          {{ useRuntimeConfig().public.const.Min }} :
        </li>
        <li class="counter">
          <h5 id="seconds">{{ seconds }}</h5>
          {{ useRuntimeConfig().public.const.Sec }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
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
