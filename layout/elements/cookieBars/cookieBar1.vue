<template>
  <div class="cookie-bar-section" :class="[{ hide: !show }, cookieBarClasses]">
    <img :src="getImageUrl('cookie.png')" alt="" />
    <div class="content">
      <h3>Cookies Consent</h3>
      <p class="font-light">
        This website use cookies to ensure you get the best experience on our
        website.
      </p>
      <div class="cookie-buttons">
        <button class="btn btn-solid-default" id="button" @click.prevent="setCookie">
          I understand
        </button>
        <a href="javascript:void(0)" class="btn default-light1">
          {{
  useRuntimeConfig().public.const.LearnMore
          }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cookieBarClasses"],
  data() {
    return {
      show: true,
    };
  },
  methods: {
    setCookie() {
      this.show = false;
      useCookie("cookieSet").value=true;
    },
  },
  created() {
    if (useCookie("cookieSet").value) this.show = false;
  },
};
</script>
