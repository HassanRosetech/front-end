<template>
  <div class="cookie-bar-section-2 flower-cookirbar" :class="[
    { hide: !show },
    { 'd-none': !show },
    { 'd-md-flex': show },
    cookieBarClasses,
  ]">
    <div class="content">
      <img :src="getImageUrl('cookie.png')" alt="" />
      <p class="font-light">
        This website use cookies to ensure you get the best experience on our
        website.
      </p>
      <div class="cookie-buttons">
        <button class="btn default-theme" type="button" id="button" @click.prevent="setCookie">
          I understand
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import animatedButton from "~/layout/elements/buttons/animatedButton.vue";
export default {
  components: {
    animatedButton,
  },
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
  mounted() {
    if (useCookie("cookieSet").value) this.show = false;
  },
};
</script>