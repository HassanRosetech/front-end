<template>
  <div class="col-xl-3 col-lg-4 col-sm-6 d-none d-sm-block">
    <div class="footer-newsletter">
      <h3>Let's stay in touch</h3>
      <form
        action="https://pixelstrap.us19.list-manage.com/subscribe/post?u=5a128856334b598b395f1fc9b&amp;id=082f74cbda"
        class="form-newsletter needs-validation" method="post" id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form" target="_blank">
        <div class="input-group mb-4">
          <input type="email" class="form-control" :class="formControlColor ? formControlColor : ''"
            placeholder="Your Email Address" />
          <span class="input-group-text" id="basic-addon4">
            <i class="fas fa-arrow-right"></i>
          </span>
        </div>
        <p class="font-dark mb-0">
          Keep up to date with our latest news and special offers.
        </p>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: ["formControlColor"],
};
</script>