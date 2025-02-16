import axiosData from "../static/data/products.json";
export const useClickStore = defineStore({
  id: "click",
  state: () => {
    return {
      lastAddedProduct: axiosData[0],
      allProducts: axiosData.data,
      categoryMobileMenu: false,
      cartModal: false,
      quickViewModal: false,
      overlay: false,
      productId: 1,
      copySettings: false,
      shopFilterBar: false,
      mobileMenu:false,
      successfulModal: false,
      lastAddedProduct: {},
      successfulModalImage: "fashion/banner/2.jpg",
      successfulModalMessage: "Item Added ",
      successfulModalLink: "javascript:void(0)",
      dashboardLinks: false,
      showAddAddressModal: false,
      showPaymentModal: false,
      showDeleteAccountModal: false,
      showConfirmDeleteAccount: false,
      showSizeChart: false,
      showEditProfileModal: false,
      showVideoModal: false,
      showNewsLetterModal: false,
    };
  },
  getters: {
    productToShow(state) {
      let productToReturn = {};
      productToReturn = state.allProducts.filter((product) => {
        if (product.id === state.productId) return true;
      })[0];
      return productToReturn;
    },
    relatedProducts(state) {
      let type = useClickStore().productToShow.type;
      let productsToReturn = [];
      productsToReturn = state.allProducts.filter((product) => {
        if (product.type === type) return true;
      });
      if (productsToReturn.length === 0) return state.allProducts.slice(0, 6);
      return productsToReturn;
    },
  },
  actions: {
    toggleCategoryMobileMenu() {
      this.categoryMobileMenu = !this.categoryMobileMenu;
      this.overlay = !this.overlay;
    },
    toggleQuickViewModal() {
      this.quickViewModal = !this.quickViewModal;
      this.overlay = !this.overlay;
    },
    closeOverlay() {
      this.overlay = false;
      this.categoryMobileMenu = false;
      this.cartModal = false;
      this.quickViewModal = false;
      this.shopFilterBar = false;
      this.copySettings = false;
      this.dashboardLinks = false;
      this.showAddAddressModal = false;
      this.showPaymentModal = false;
      this.showDeleteAccountModal = false;
      this.showConfirmDeleteAccount = false;
      this.showSizeChart = false;
      this.showEditProfileModal = false;
      this.showVideoModal = false;
      this.showNewsLetterModal = false;
      this.mobileMenu = false;
    },
    changeProductId(payload) {
      if (payload != undefined || payload > 1) {
        this.allProducts.every((item) => {
          if (item.id === payload) {
            this.lastAddedProduct = item;
            return false;
          } else return true;
        });
        this.productId = payload;
      } else {
        this.lastAddedProduct = this.allProducts[0];
        this.productId = 1;
      }
    },
    toggleOverlay() {
      this.overlay = !this.overlay;
    },
    toggleShopFilterBar() {
      this.shopFilterBar = !this.shopFilterBar;
      this.overlay = !this.overlay;
    },
    toggleShopFilterBarNoOverlay() {
      this.shopFilterBar = !this.shopFilterBar;
    },
    toggleSuccessfulModal(payload) {
      if (payload != undefined) {
        this.successfulModalImage = payload.image;
        this.successfulModalMessage = payload.message;
        if (payload.link) {
          this.successfulModalLink = payload.link;
        } else {
          this.successfulModalLink = "#";
        }
      }
      this.successfulModal = !this.successfulModal;
    },
    toggleCopySettings() {
      if (this.copySettings) {
        this.copySettings = false;
        this.overlay = false;
      } else {
        this.overlay = true;
        this.copySettings = true;
      }
    },
    toggleDashboardLinks() {
      this.dashboardLinks = !this.dashboardLinks;
      this.overlay = !this.overlay;
    },
    toggleAddAddressModal() {
      this.showAddAddressModal = !this.showAddAddressModal;
      this.overlay = !this.overlay;
    },
    togglePaymentModal() {
      this.showPaymentModal = !this.showPaymentModal;
      this.overlay = !this.overlay;
    },
    toggleDeleteAccountModal() {
      this.showDeleteAccountModal = !this.showDeleteAccountModal;
      this.overlay = !this.overlay;
    },
    toggleConfirmDeleteAccount() {
      this.showConfirmDeleteAccount = !this.showConfirmDeleteAccount;
      this.overlay = !this.overlay;
    },
    toggleSizeChart() {
      this.showSizeChart = !this.showSizeChart;
      this.overlay = !this.overlay;
    },
    toggleEditProfileModal() {
      this.showEditProfileModal = !this.showEditProfileModal;
      this.overlay = !this.overlay;
    },
    toggleVideoModal() {
      this.showVideoModal = !this.showVideoModal;
      this.overlay = !this.overlay;
    },
    toggleMobileMenu(){
      this.mobileMenu = !this.mobileMenu;
      this.overlay = !this.overlay;
    },
    toggleNewsLetterModal() {
      setTimeout(() => {
        document.getElementById("newsletterToggleButton").click();
      }, 2000);
    },
  },
});
