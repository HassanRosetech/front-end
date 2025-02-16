<template>
  <div class="col-lg-5">
    <div class="contact-details">
      <div>
        <h2>{{ useRuntimeConfig().public.const.LetTouch }}</h2>
        <h5 class="font-light">
          {{ useRuntimeConfig().public.const.SuggestionDesc }}
        </h5>
        <div class="contact-box">
          <div class="contact-icon">
            <vue-feather type="map-pin"></vue-feather>
          </div>
          <div class="contact-title">
            <h4>{{ useRuntimeConfig().public.const.Address }}</h4>
            <p>
              {{ useRuntimeConfig().public.const.ActualAddress }}
            </p>
          </div>
        </div>

        <div class="contact-box">
          <div class="contact-icon">
            <vue-feather type="phone"></vue-feather>
          </div>
          <div class="contact-title">
            <h4>{{ useRuntimeConfig().public.const.PhoneNumber }}</h4>
            <p>{{ useRuntimeConfig().public.const.num1 }}</p>
            <p>{{ useRuntimeConfig().public.const.num2 }}</p>
          </div>
        </div>

        <div class="contact-box">
          <div class="contact-icon">
            <vue-feather type="mail"></vue-feather>
          </div>
          <div class="contact-title">
            <h4>Email Address :</h4>
            <p>{{ useRuntimeConfig().public.const.ThemeEmail }}</p>
            <p>{{ useRuntimeConfig().public.const.ThemeEmail2 }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueFeather from "vue-feather";

export default {
  components: { VueFeather },
};
</script>
