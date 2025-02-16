<template>
  <nav class="navigationbar">
    <div class="main-navbar">
      <div id="mainnav">
        <div class="toggle-nav ms-sm-3 ms-0" @click="toggleMobileNav">
          <i class="fa fa-bars sidebar-bar"></i>
        </div>
        <ul class="nav-menu" :style="{ right: openMobileNav ? '0px' : '-410px' }">
          <li class="back-btn d-xl-none" @click="closeMobileNav">
            <div class="close-btn">
              Menu
              <span class="mobile-back"><i class="fa fa-angle-left"></i> </span>
            </div>
          </li>

          <li v-for="(menuItem, index) in menuList" :key="index" class="dropdown" :class="getMenuClass(menuItem.title)">
            <a href="javascript:void(0)" class="nav-link menu-title" :class="
              menuItem.title === mobileListDropdown[0] && openMobileNav
                ? 'active'
                : ''
            " @click.prevent="openMobileViewList(menuItem.title)">
              <div v-if="menuItem.title == 'VOXO PLUS'" class="gradient-title">
                {{ $t(menuItem.title) }}
              </div>
              <span class="according-menu" v-if="openMobileNav && mobileListDropdown[0] !== menuItem.title">+</span>
              <span class="according-menu" v-if="mobileListDropdown[0] === menuItem.title && openMobileNav">-</span>
              <p class="m-0" v-if="menuItem.title != 'VOXO PLUS'">
                {{ $t(menuItem.title) }}
                <span class="according-menu" v-if="
                  openMobileNav && mobileListDropdown[0] !== menuItem.title
                ">+</span>
                <span class="according-menu" v-if="
                  mobileListDropdown[0] === menuItem.title && openMobileNav
                ">-</span>
              </p>
            </a>
            <div class="mega-menu-container menu-content" :style="{
              display: openMobileNav
                ? menuItem.title === mobileListDropdown[0]
                  ? 'block'
                  : 'none'
                : '',
            }" v-if="menuItem.title == 'HOME'">
              <div class="container-fluid">
                <div class="row">
                  <div class="col mega-box" v-for="(childrenItem, index) in menuItem.children" :key="index">
                    <div class="link-section">
                      <div class="opensubmegamenu">
                        <ul>
                          <li>
                            <a href="javascript:void(0)" @click.prevent="changePage(childrenItem.path)"
                              class="megamenu-image">
                              <img :src="getImageUrl(childrenItem.imagePath)" class="img-fluid" alt="" />
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div class="megamenu-image-title pb-0">
                        <h5 class="mb-0">
                          {{ childrenItem.title }}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="menuItem.title == 'VOXO PLUS'" class="mega-menu-container poster-bg-image menu-content"
              :style="{
                display: openMobileNav
                  ? menuItem.title === mobileListDropdown[0]
                    ? 'block'
                    : 'none'
                  : '',
              }">
              <div class="container-fluid">
                <div class="row row-cols-3">
                  <div class="col mega-box" v-for="(childrenItem, index) in menuItem.children" :key="index">
                    <div class="link-section" v-for="(row, index) in childrenItem.rows" :key="index">
                      <div class="submenu-title">
                        <h5>{{ row.title }}</h5>
                      </div>
                      <div class="submenu-content opensubmegamenu">
                        <ul class="list">
                          <li v-for="(subChildren, index) in row.children" :key="index">
                            <a href="javascript:void(0)" @click.prevent="changePage(subChildren.path)">
                              {{ subChildren.title }}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul v-else class="nav-submenu menu-content" :style="{
              display: openMobileNav
                ? menuItem.title === mobileListDropdown[0]
                  ? 'block'
                  : 'none'
                : '',
            }">
              <li v-for="(childrenItem, index) in menuItem.children" :key="index">
                <a href="javascript:void(0)" @click.prevent="changePage(childrenItem.path)">{{ childrenItem.title }}
                  <span v-if="childrenItem.badge" :class="childrenItem.badgeClass">{{ childrenItem.badge }}</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="mobile-poster d-flex d-xl-none" :style="{ right: openMobileNav ? '0px' : '-410px' }">
            <img src="/images/pwa.png" class="img-fluid" alt="" />
            <div class="mobile-contain">
              <h5>{{ useRuntimeConfig().public.const.EnjoyExperience }}</h5>
              <p class="font-light">
                {{ useRuntimeConfig().public.const.EnjoyExperienceDescription }}
              </p>
              <a href="javascript:void(0)" id="installApp" class="btn btn-solid-default btn-spacing w-100">ADD TO
                HOMESCREEN</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "pinia";
import { useClickStore } from "~~/store/clickEvents";
import { useMenuStore } from '~~/store/menu';
export default {
  data() {
    return {
      openMobileNav: false,
      mobileListDropdown: [],
      voxoSubLists: [],
    };
  },
  computed: {
    ...mapState(useMenuStore, {
      menuList: 'data',
    }),
    openMobileNavBar() {
      return this.openMobileNav =  useClickStore().shopFilterBar
    }
  },
  methods: {
    getImageUrl(path) {
      return ("/images/" + path)
    },
    openMobileViewList(title) {
      if (title === this.mobileListDropdown[0]) {
        this.mobileListDropdown = [];
      } else {
        this.mobileListDropdown = [];
        this.mobileListDropdown.push(title);
      }
    },
    toggleVoxoSubList(subLinkTitle) {
      if (subLinkTitle === this.voxoSubLists[0]) {
        this.voxoSubLists = [];
      } else {
        this.voxoSubLists = [];
        this.voxoSubLists.push(subLinkTitle);
      }
    },
    getMenuClass(title) {
      if (title === "HOME") {
        return "mega-menu home-menu";
      } else if (title === "VOXO PLUS") {
        return "mega-menu ratio_40";
      }
    },

    toggleMobileNav() {
      useClickStore().toggleMobileMenu()
    },
    closeMobileNav() {
      useClickStore().toggleShopFilterBar()
    },
    changePage(path) {
      this.$router.push(path);
    },
  },
};
</script>
