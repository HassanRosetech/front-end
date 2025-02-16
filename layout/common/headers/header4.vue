<template>
  <header id="home" :class="{ 'nav-down': scrollDown, 'nav-up': scrollUp }">
    <topHeader :topBarClasses="topBarClasses" />
    <div class="main-header search-header navbar-searchbar">
      <div class="container-fluid-lg">
        <div class="row">
          <div class="col-lg-12">
            <div class="main-menu">
              <div class="menu-left">
                <div class="brand-logo">
                  <a href="javascript:void(0)" @click.prevent="$router.push('/home/fashion_demo')">
                    <svg class="svg-icon">
                      <use class="fill-color" xlink:href="/svg/icons.svg#logo"></use>
                    </svg>
                    <img src="/images/logo.png" class="img-fluid" alt="logo" />
                  </a>
                </div>

                <categoryList1 v-if="mobileView" />
                <categoryMenu v-else />
              </div>

              <searchBox />

              <menuRight @openSearchbar="toggleSearchbar" @showMobileNav="toggleMobileNav" />

              <headerSearchBar @closeSearchBar="toggleSearchbar" :isopen="isSearchbarOpen" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <mainNavbar :openMobileNav="mobileNav" @toggleMobileNav="toggleMobileNav" />
  </header>
</template>

<script>
import topHeader from "~/layout/elements/headerElements/topBar.vue";
import categoryMenu from "~/layout/elements/headerElements/categoryMenu2.vue";
import categoryList1 from "~/layout/elements/headerElements/categoryMenu1.vue";
import searchBox from "~/layout/elements/headerElements/searchBox.vue";
import menuRight from "~/layout/elements/headerElements/menuSideIcons2.vue";
import headerSearchBar from "~/layout/elements/headerElements/headerSearchBar1.vue";
import mainNavbar from "~/layout/elements/headerElements/mainNavbar3.vue";
export default {
  components: {
    topHeader,
    searchBox,
    categoryList1,
    menuRight,
    mainNavbar,
    headerSearchBar,
    categoryMenu,
  },
  props: ["stopScrollWork"],
  data() {
    return {
      topBarClasses: "top-header-black",
      isSearchbarOpen: false,
      mobileNav: false,
      mobileView: false,
      headerDown: false,
      scrollTopDiff: 0,
      scrollUp: false,
      scrollDown: false,
    };
  },
  methods: {
    toggleSearchbar() {
      this.isSearchbarOpen = !this.isSearchbarOpen;
    },
    getWindowWidth() {
      if (screen.availWidth < 750) this.mobileView = true;
      else this.mobileView = false;
    },
    toggleMobileNav(value) {
      this.mobileNav = !this.mobileNav;
    },
    handleScroll(event) {
      if (!this.stopScrollWork) {
        if (window.scrollY > 0) {
          if (!this.headerDown) {
            this.headerDown = true;
            this.scrollDown = false;
            this.scrollUp = false;
          }
          if (window.scrollY > this.scrollTopDiff) {
            this.scrollDown = true;
            this.scrollUp = false;
          } else {
            this.scrollUp = true;
          }
          this.scrollTopDiff = window.scrollY;
        } else if (window.scrollY === 0) {
          this.headerDown = false;
          this.scrollDown = false;
          this.scrollUp = false;
        }
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.getWindowWidth);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.getWindowWidth);
  },
};
</script>