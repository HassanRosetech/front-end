<template>
  <header class="header-style-2" :class="{ 'nav-down': scrollDown, 'nav-up': scrollUp }" id="home">
    <div class="main-header navbar-searchbar">
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
                <categoryList1 />
              </div>
              <mainNavbar1 />
              <menuSideIcons1 @openSearchBar="openSearchBar($event)" :iconBgColor="iconBgColor" />
              <headerSearchBar1 :isopen="searchBarIsOpen" @closeSearchBar="closeSearchBar($event)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import menuSideIcons1 from "~/layout/elements/headerElements/menuSideIcons1.vue";
import categoryList1 from "~/layout/elements/headerElements/categoryMenu1.vue";
import headerSearchBar1 from "~/layout/elements/headerElements/headerSearchBar1.vue";
import mainNavbar1 from "~/layout/elements/headerElements/mainNavbar1.vue";
export default {
  components: {
    menuSideIcons1,
    categoryList1,
    headerSearchBar1,
    mainNavbar1,
  },
  props: ["iconBgColor", "stopScrollWork"],
  data() {
    return {
      searchBarIsOpen: false,
      headerDown: false,
      scrollTopDiff: 0,
      scrollUp: false,
      scrollDown: false,
    };
  },
  methods: {
    openSearchBar(changeStatus) {
      this.searchBarIsOpen = changeStatus;
    },
    closeSearchBar(changeStatus) {
      this.searchBarIsOpen = changeStatus;
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
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>