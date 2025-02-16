<template>
  <Head>
    <Title>Register</Title>
  </Head>
  <div class="login-section">
    <div class="materialContainer">
      <div class="box">
        <div class="login-title">
          <h2>Register</h2>
        </div>

        <div class="input">
          <label for="name" :style="[{ 'line-height': selected['name'] ? '18px' : '60px' }]">Name</label>
          <input type="text" name="name" id="name" v-model="auth.name" @focus.prevent="select('name')"
            v-on:blur="handleFocusOut('name')" />
          <span class="spin" :style="[{ width: selected['name'] ? '100%' : '0%' }]"></span>
        </div>

        <div class="input">
          <label for="emailname" :style="[{ 'line-height': selected['email'] ? '18px' : '60px' }]">Email Address</label>
          <input type="text" name="name" id="emailname" v-model="auth.email" @focus.prevent="select('email')"
            v-on:blur="handleFocusOut('email')" />
          <span class="spin" :style="[{ width: selected['email'] ? '100%' : '0%' }]"></span>
        </div>

        <div class="input">
          <label for="pass" :style="[{ 'line-height': selected['password'] ? '18px' : '60px' }]">Password</label>
          <input type="password" name="pass" id="pass" v-model="auth.password" @focus.prevent="select('password')"
            v-on:blur="handleFocusOut('password')" />
          <span class="spin" :style="[{ width: selected['password'] ? '100%' : '0%' }]"></span>
        </div>

        <div class="input">
          <label for="compass" :style="[
            { 'line-height': selected['confirmPassword'] ? '18px' : '60px' },
          ]">Confirm Password</label>
          <input type="password" name="pass" id="compass" v-model="auth.confirmPassword"
            @focus.prevent="select('confirmPassword')" v-on:blur="handleFocusOut('confirmPassword')" />
          <span class="spin" :style="[{ width: selected['confirmPassword'] ? '100%' : '0%' }]"></span>
        </div>

        <div class="button login">
          <button href="javascript:void(0)" @click.prevent="$router.push('/')">
            <span>Sign Up</span>
            <i class="fa fa-check"></i>
          </button>
        </div>

        <p class="sign-category">
          <span>Or sign up with</span>
        </p>

        <div class="row gx-md-3 gy-3">
          <div class="col-md-6">
            <a href="www.facebook.com">
              <div class="social-media fb-media">
                <img src="/images/inner-page/facebook.png" class="img-fluid" alt="" />
                <h6>Facebook</h6>
              </div>
            </a>
          </div>
          <div class="col-md-6">
            <a href="www.gmail.com">
              <div class="social-media google-media">
                <img src="/images/inner-page/google.png" class="img-fluid" alt="" />
                <h6>Google</h6>
              </div>
            </a>
          </div>
        </div>
        <p>
          <nuxt-link to="/page/login" class="theme-color">{{
            useRuntimeConfig().public.const.Alreadyhaveanaccount
          }}</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      themeCss: "/demo2.css",
      auth: { name: "", email: "", password: "", confirmPassword: "" },
      selected: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  },
  head() {
    return {
      title: "Register",
    };
  },
  methods: {
    handleFocusOut(field) {
      this.auth[field] === "" && (this.selected[field] = false);
    },
    select(textbox) {
      this.selected[textbox] = true;
    },
  },
  mounted() {
    let layoutMode = useCookie("layoutType").value || "light";

    if (layoutMode === "dark") this.themeCss = "/voxo/css/demo2_dark.css";
    else this.themeCss = "/voxo/css/demo2.css";
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/demo2.scss";
</style>
