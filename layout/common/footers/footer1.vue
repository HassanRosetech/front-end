<template>
  <footer class="footer-sm-space">
    <div class="main-footer">
      <div class="container">
        <div class="row gy-4">
          <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="footer-contact">
              <brandLogo1 />
              <ul class="contact-lists">
                <li>
                  <span>
                    <b>Phone :</b>
                    <span class="font-light"> + 185659635</span>
                  </span>
                </li>
                <li>
                  <span>
                    <b>{{ useRuntimeConfig().public.const.Address }}</b>
                    <span class="font-light">{{
                      useRuntimeConfig().public.const.ActualAddress
                    }}</span>
                  </span>
                </li>
                <li>
                  <span>
                    <b>{{ useRuntimeConfig().public.const.Email }} :</b>
                    <span class="font-light">voxo123@gmail.com</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div
            :class="headings.linkClasses ? headings.linkClasses : 'col-lg-2'"
            v-for="(headings, index) in links"
            :key="index"
          >
            <div class="footer-links">
              <div class="footer-title" @click="toggleFooterMenu(headings.id)">
                <h3>{{ headings.title }}</h3>
              </div>
              <div
                class="footer-content"
                :class="headings.menuOpen ? '' : 'd-none'"
              >
                <ul>
                  <li v-for="(links, index) in headings.items" :key="index">
                    <nuxt-link :to="{ path: links.path }" class="font-dark">{{
                      links.title
                    }}</nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <slot :class="windowSize === 'small' ? 'd-none' : ''"></slot>
        </div>
      </div>
    </div>
    <subFooter1 />
  </footer>
</template>

<script>
import { mapState } from "pinia";
import brandLogo1 from "~/layout/elements/logo/brandLogo1.vue";
import subFooter1 from "~/layout/elements/footerElements/subFooter1.vue";
import { useFooterStore } from "~~/store/footerLinks";
export default {
  components: {
    brandLogo1,
    subFooter1,
  },
  data() {
    return {
      windowWidth: 1500,
      windowSize: "large",
      clickingActive: false,
    };
  },
  computed: {
    ...mapState(useFooterStore, {
      links: "data",
    }),
  },
  watch: {
    windowSize: function () {
      if (this.windowSize === "small") this.clickingActive = true;
      else this.clickingActive = false;
    },
    data() {
      return {
        windowWidth: 1500,
        windowSize: "large",
        clickingActive: false,
        lastActiveLink: 0,
      };
    },
  },
  watch: {
    windowSize: function () {
      if (this.windowSize === "small") this.clickingActive = true;
      else this.clickingActive = false;
    },
    clickingActive: function () {
      if (!this.clickingActive) {
        this.links.forEach((item) => (item.menuOpen = true));
      } else {
        this.links.forEach((item) => (item.menuOpen = false));
      }
    },
  },
  methods: {
    getWindowWidth() {
      this.windowWidth = screen.availWidth;
      if (
        screen.availWidth < 750 &&
        screen.availWidth > 575 &&
        this.windowSize != "medium"
      )
        this.windowSize = "medium";
      else if (screen.availWidth < 575 && this.windowSize != "small")
        this.windowSize = "small";
      else if (screen.availWidth > 750 && this.windowSize != "large")
        this.windowSize = "large";
    },
    toggleFooterMenu(menuId) {
      if (this.clickingActive) {
        let isActive = this.links[menuId].menuOpen;
        this.links.forEach((item, index) => {
          this.links[index].menuOpen = false;
        });
        this.links[menuId].menuOpen = isActive;
        this.links[menuId].menuOpen = !this.links[menuId].menuOpen;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.getWindowWidth);
  },
  destroyed() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
};
</script>

<style></style>
