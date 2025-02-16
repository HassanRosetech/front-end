<template>
  <div>
    <slot />
    <theme-settings />
    <div class="tap-to-top" :class="showTapToTop ? 'show' : ''">
      <a href="#">
        <i class="fas fa-chevron-up"></i>
      </a>
    </div>
    <Teleport to="body">
      <div class="bg-overlay show" v-if="overlay" @click.prevent="closeOverlay"></div>
    </Teleport>
    <cartSuccessful :showModal="cartModal" />
    <quickView :showModal="quickViewModal" />
    <addedSuccessfulModal />
    <copySettingsModal :showModal="copySettingsView" />
    <threeSixtyModal />
    <button id="newsletterToggleButton" data-bs-toggle="modal" data-bs-target="#newsletter" class="d-none"> toggle modal </button>
  </div>
</template>
<script>
import { mapState } from "pinia";
import quickView from "~/layout/elements/modals/quickViewModal.vue";
import threeSixtyModal from "~/layout/elements/modals/threeSixtyModal.vue";
import cartSuccessful from "~/layout/elements/modals/cartSuccessful.vue";
import themeSettings from "~/layout/elements/themeSettings.vue";
import addedSuccessfulModal from "~/layout/elements/modals/addedSuccessful.vue";
import copySettingsModal from "~/layout/elements/modals/copySettings.vue";
import { useClickStore } from '~~/store/clickEvents';
import { useLayout } from '~~/store/layout';
import { useCartStore } from '~~/store/cart';
import { useMenuStore } from '~~/store/menu'
import { useCompareStore } from "~~/store/compare";
import { useProductStore } from "~~/store/products";
import { useUserDashboardStore } from "~~/store/userDashboard";

export default {
  components:
  {
    themeSettings,
    quickView,
    cartSuccessful,
    addedSuccessfulModal,
    copySettingsModal,
    threeSixtyModal,
  },
  data() {
    return {
      showDarkButton: true,
      themeCss: "/voxo/css/bootstrap.css",
    };
  },
  computed: {
    ...mapState(useLayout, {
      selectedCurrency: 'selectedCurrency',
      selectedCurrencySymbol: 'selectedCurrencySymbol',
      currencyConversionMultiple:
        'currencyConversionMultiple',
      layoutType: 'layoutType',
      primaryColor: 'primaryColor',
      selectedLanguage: 'selectedLanguage',
      showTapToTop:'showTapToTop'
    }),
    ...mapState(useClickStore, {
      cartModal: 'cartModal',
      quickViewModal: 'quickViewModal',
      overlay: 'overlay',
      copySettingsView: 'copySettings',
    }),
    ...mapState(useMenuStore, {
      allRoutes: 'data',
    }),
    cartItems() {
      return useCartStore().cartItems
    }
  },
  watch: {
    async $route(to, from) {
      if (to.path !== from.path) {
        window.scrollTo({
          behaviour: "smooth",
          top: 0,
        });
      }
      if (!to.path.includes("home")) {
        document.body.removeAttribute("class");
        document.body.classList.add("theme-color2");
      }
    },
  },
  methods: {
    handleScroll() {
        useLayout().setShowTapToTop({value:window.scrollY > 600});
    },
    closeOverlay() {
      useClickStore().closeOverlay();
    },
    beforeWindowUnload() {
      localStorage.setItem('cartItems',JSON.stringify(this.cartItems));
      localStorage.setItem('compare',JSON.stringify(useCompareStore().productsToCompare));
      localStorage.setItem('layoutMode',useLayout().layoutMode);
      localStorage.setItem('userInfo',JSON.stringify(useCartStore().userInfo));
      useCookie('primaryColor').value = this.primaryColor;
      useCookie('selectedCurrency').value = this.selectedCurrency
      useCookie('selectedCurrencySymbol').value = this.selectedCurrencySymbol
      useCookie('currencyConversionMultiple').value = this.currencyConversionMultiple
    },
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.beforeWindowUnload);
  },
  created() {
    useUserDashboardStore().setUser(useCookie('user').value||{}) 
    useProductStore().setLocalWishlist(useCookie('wishlist').value || [])
    useCookie('primaryColor').value && useLayout().setPrimaryColor({ primaryColor: useCookie('primaryColor').value });
    useLayout().setCurrency({
      currency: useCookie('selectedCurrency').value,
      currencySymbol: useCookie('selectedCurrencySymbol'),
      currencyConversionMultiple: useCookie('currencyConversionMultiple')
    });
  },
  mounted() {
    useCartStore().saveUserInfo(JSON.parse(localStorage.getItem('userInfo')||'{}'))
    useLayout().setLayoutMode(localStorage.getItem('layoutMode'));
    useCompareStore().setLocalProductsToCompare(JSON.parse(localStorage.getItem('compare')||'[]'))
    useCartStore().setLocalCart(JSON.parse(localStorage.getItem('cartItems')||'[]'));
    useLayout().setLayoutType(useCookie('layoutType').value || 'ltr')
    window.addEventListener("beforeunload", this.beforeWindowUnload);
    window.addEventListener("scroll", this.handleScroll);
    useLayout().setInitialValues();
   


  },
};
</script>
