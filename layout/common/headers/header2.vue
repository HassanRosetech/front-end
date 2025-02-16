<template>
  <header id="home" :class="{ 'nav-down': scrollDown, 'nav-up': scrollUp }">
    <div class="header-style-3">
      <div class="main-header navbar-searchbar">
        <div class="container-fluid-lg">
          <div class="row">
            <div class="col-lg-12">
              <div class="main-menu common-menu">
                <div class="top-header top-comman-header text-center ms-0">
                  <div class="brand-logo">
                    <a href="javascript:void(0)" @click="changePath('/home/fashion_demo')">
                      <svg class="svg-icon">
                        <use class="fill-color" xlink:href="/svg/icons.svg#logo"></use>
                      </svg>
                      <img src="/images/logo.png" class="img-fluid" alt="logo" />
                    </a>
                  </div>
                </div>
                <div class="menu-left" v-if="mobileView">
                  <categoryList1 :headerButtonVisible="true" />
                </div>
                <categoryMenu v-else />
                <mainNavbar />
                <menuSideIcons @openSearchBar="openSearchBar($event)" />
                <headerSearchBar :isopen="searchBarIsOpen" @closeSearchBar="closeSearchBar($event)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import categoryList1 from "~/layout/elements/headerElements/categoryMenu1.vue";
import mainNavbar from "~/layout/elements/headerElements/mainNavbar2.vue";
import categoryMenu from "~/layout/elements/headerElements/categoryMenu2.vue";
import menuSideIcons from "~/layout/elements/headerElements/menuSideIcons1.vue";
import headerSearchBar from "~/layout/elements/headerElements/headerSearchBar1.vue";
export default {
  components: {
    mainNavbar,
    categoryMenu,
    menuSideIcons,
    headerSearchBar,
    categoryList1,
  },
  props: ["stopScrollWork"],
  data() {
    return {
      showCL1: true,
      windowWidth: 0,
      mobileView: false,
      searchBarIsOpen: false,
      headerDown: false,
      scrollTopDiff: 0,
      scrollUp: false,
      scrollDown: false,
    };
  },
  watch: {
    windowWidth: function () {
      if (this.windowWidth < 1200) {
        this.showCL1 = false;
      } else {
        this.showCL1 = true;
      }
    },
  },
  methods: {
    changePath(path) {
      this.$router.push(path);
    },
    openSearchBar(changeStatus) {
      this.searchBarIsOpen = changeStatus;
    },
    closeSearchBar(changeStatus) {
      this.searchBarIsOpen = changeStatus;
    },
    getWindowWidth() {
      if (screen.availWidth < 750) this.mobileView = true;
      else this.mobileView = false;
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
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  },
  destroyed() {
      window.removeEventListener("resize", this.getWindowWidth);
      window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>