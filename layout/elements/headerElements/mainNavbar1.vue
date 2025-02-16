<template>
  <nav>
    <div class="main-navbar">
      <div id="mainnav">
        <div class="toggle-nav" @click="toggleMobileNav" v-if="!hideToggleBars">
          <i class="fa fa-bars sidebar-bar"></i>
        </div>
        <ul class="nav-menu" :style="{ right: openMobileNav ? '0px' : '-410px' }">
          <li class="back-btn d-xl-none" @click="toggleMobileNav">
            <div class="close-btn">
              Menu
              <span class="mobile-back"><i class="fa fa-angle-left"></i></span>
            </div>
          </li>

          <li class="dropdown" v-for="(items, index) in menuList" :key="index" :class="getClass(items.title)">
            <a href="javascript:void(0)" class="nav-link menu-title" :class="
              items.title === mobileListDropdown[0] && openMobileNav
                ? 'active'
                : ''
            " @click.prevent="openMobileViewList(items.title)">
              <div class="gradient-title" v-if="items.title == 'VOXO PLUS'">
                {{$t('Voxo plus')}}
              </div>
              <span class="according-menu" v-if="openMobileNav && mobileListDropdown[0] !== items.title">+</span>
              <span class="according-menu" v-if="mobileListDropdown[0] === items.title && openMobileNav">-</span>

              <span v-if="items.title != 'VOXO PLUS'">
                {{ $t(items.title) }}
                <span class="according-menu" v-if="openMobileNav && mobileListDropdown[0] !== items.title">+</span>
                <span class="according-menu" v-if="mobileListDropdown[0] === items.title && openMobileNav">-</span>
              </span>
            </a>

            <div class="mega-menu-container menu-content" :style="{
              display: openMobileNav
                ? items.title === mobileListDropdown[0]
                  ? 'block'
                  : 'none'
                : '',
            }" v-if="items.title == 'HOME'">
              <div class="container-fluid">
                <div class="row">
                  <div class="col mega-box" v-for="(link, index) in items.children" :key="'A' + index">
                    <div class="link-section">
                      <div class="opensubmegamenu">
                        <ul>
                          <li>
                            <a href="javascript:void(0)" @click.prevent="changePage(link.path)" class="megamenu-image">
                              <img :src="getImageUrl(link.imagePath)" class="img-fluid" alt="" />
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div class="megamenu-image-title pb-0">
                        <h5 class="mb-0">{{ link.title }}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ul class="nav-submenu menu-content" :style="{
              display: openMobileNav
                ? items.title === mobileListDropdown[0]
                  ? 'block'
                  : 'none'
                : '',
            }" v-if="items.title != 'HOME' && items.title != 'VOXO PLUS'">
              <li v-for="(link, index) in items.children" :key="'B' + index">
                <a href="javascript:void(0)" @click.prevent="changePage(link.path)">{{
                  link.title
                }}<span v-if="link.badge" :class="link.badgeClass">{{
  link.badge
}}</span></a>
              </li>
            </ul>
            <div class="mega-menu-container poster-bg-image menu-content" :style="{
              display: openMobileNav
                ? items.title === mobileListDropdown[0]
                  ? 'block'
                  : 'none'
                : '',
            }" v-if="items.title == 'VOXO PLUS'">
              <div class="container-fluid">
                <div class="row row-cols-3">
                  <div class="col mega-box" v-for="(item, index) in items.children" :key="'C' + index">
                    <div class="link-section" v-for="(subItem, index) in item.rows" :key="'D' + index">
                      <div class="submenu-title" @click.prevent="toggleVoxoSubList(subItem.title)">
                        <h5>
                          {{
                            subItem.title
                          }}<span class="according-menu" v-if="
  openMobileNav && voxoSubLists[0] === subItem.title
">-</span>
                          <span class="according-menu" v-if="
                            openMobileNav && voxoSubLists[0] !== subItem.title
                          ">+</span>
                        </h5>
                      </div>
                      <div class="submenu-content opensubmegamenu" :class="
                        openMobileNav
                          ? voxoSubLists[0] === subItem.title
                            ? ''
                            : 'd-none'
                          : ''
                      ">
                        <ul class="list">
                          <li v-for="(link, index) in subItem.children" :key="'E' + index">
                            <a href="javascript:void(0)" @click.prevent="changePage(link.path)">{{ link.title }}</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
import { useMenuStore } from '~~/store/menu';
import { useClickStore } from "~~/store/clickEvents";
export default {
  props: ["openMobileNavProp", "hideToggleBars"],
  data() {
    return {
      mobileListDropdown: [],
      voxoSubLists: [],
    };
  },
  computed: {
    ...mapState(useMenuStore, {
      menuList: 'data',
      ...mapState(useClickStore, {
        openMobileNav: 'mobileMenu',
      })
    }),
  },
  watch: {
    openMobileNavProp: function () {
      if (this.openMobileNavProp) this.openMobileNav = this.openMobileNavProp;
    },
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
    getClass(title) {
      if (title === "HOME") {
        return "mega-menu home-menu";
      } else if (title === "VOXO PLUS") {
        return "mega-menu ratio_40";
      }
    },
    toggleMobileNav() {
      useClickStore().toggleMobileMenu()
    },

    changePage(path) {
      this.$router.push(path);
    },
  },
};
</script>
