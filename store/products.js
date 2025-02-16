import axiosData from "../static/data/products.json";
import { useLayout } from "./layout";

export const useProductStore = defineStore({
  id: "product",
  state: () => {
    return {
      originalProducts: axiosData.data,
      data: axiosData.data,
      axiosProducts: [],
      storeWishlist: [],
    };
  },
  getters: {
    wishlist(state) {
      return state.storeWishlist;
    },
  },
  actions: {
    setProductsData(payload) {
      this.axiosProducts = payload;
    },
    async addToWishlist(payload) {
      if (isPresentInWishlist(this.storeWishlist, payload)) return true;
      else {
        this.storeWishlist.push(payload);
        return false;
      }
    },
    removeFromWishlist(payload) {
      this.storeWishlist.every((item, index) => {
        if (item.id === payload.id) {
          this.storeWishlist.splice(index, 1);
          localStorage.setItem("wishlistItems", JSON.stringify(this.storeWishlist));
          return false;
        } else return true;
      });
    },
    currencyChanged() {
      let dataToSet = [];
      axiosData.data.forEach((item, index) => {
        dataToSet.push({
          ...axiosData.data[index],
        });
      });
      dataToSet.forEach((values) => {
        values.price = (
          values.price * useLayout().currencyConversionMultiple
        ).toFixed(2);
      });

      this.data = dataToSet;
    },
    setLocalWishlist(payload){
      this.storeWishlist = [...payload]
    }
  },
});

function isPresentInWishlist(wishl, productToAdd) {
  let flag = false;
  wishl.every((item) => {
    if (item.id === productToAdd.id) {
      flag = true;
      return false;
    } else return true;
  });
  return flag;
}
