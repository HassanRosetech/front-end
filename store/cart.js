import axiosData from "../static/data/cart.json";
import axiosAllProucts from "../static/data/products.json";
import { useClickStore } from "./clickEvents";
import { useLayout } from "./layout";

export const useCartStore = defineStore({
  id: "cart",
  state: () => {
    return {
      allProducts: axiosAllProucts.data,
      data: axiosData,
      cartItems: [],
      order: [],
      lastAddedProduct1: 0,
      userInfo: {},
    };
  },
  getters: {
    cartTotal(state) {
      let total = 0;
      state.cartItems.forEach((item) => {
        let itemTotal = item.price * item.quantity * useLayout().currencyConversionMultiple;
        total += itemTotal;
      });
      return Math.round(total, 2);
    },
    inCartProductIds(state) {
      let cartProductIds = [];
      state.cartItems.forEach((item) => {
        cartProductIds.push(item.id);
      });
      return cartProductIds;
    },
    getCartItems(state) {
      let cartToSend = JSON.parse(JSON.stringify(state.cartItems))
      cartToSend.forEach((item) => {
        item.price = (
          item.price * useLayout().currencyConversionMultiple
        ).toFixed(2);
      });
      return cartToSend;
    },
    lastAddedProduct(state) {
      if (state.lastAddedProduct1 === 0) return state.allProducts[0];
      else return state.lastAddedProduct1;
    },
    getOrder: (state) => {
      return state.order;
    },
  },
  actions: {
    addToCart(payload) {
      var itemToAdd = {};
      var productIndex = indexFound(this.cartItems, payload);
      if (productIndex !== false) {
        this.cartItems[productIndex].quantity += payload.quantity;
        this.lastAddedProduct1 = this.cartItems[productIndex];
      } else {
        var itemFound = false;
        this.allProducts.every((item) => {
          if (item.id === payload.product.id) {
            itemToAdd = payload.product;
            itemToAdd["quantity"] = payload.quantity;
            itemFound = true;
            return false;
          } else return true;
        });
        if (itemFound) {
          this.cartItems.push(itemToAdd);
          this.lastAddedProduct1 = itemToAdd;
        } else alert("item not in JSON");
      }
    },
    changeQuantityTo( payload) {
      this.cartItems.every((item, index) => {
        if (item.id === payload.productId) {
          var objToReplace = JSON.parse(
            JSON.stringify(this.cartItems[index])
          );
          objToReplace.quantity = payload.quantity;
          this.cartItems.splice(index, 1, objToReplace);
          return false;
        } else return true;
      });
    },
    clearAllCartItems() {
      this.cartItems = [];
    },
    removeCartItem( payload) {
      this.cartItems.every((item, index) => {
        if (item.id === payload) {
          this.cartItems.splice(index, 1);
          return false;
        } else return true;
      });
    },
    createOrder ( payload) {
      this.order.push(payload);
    },
    saveUserInfo ( payload)  {
      this.userInfo = payload;
    },
    setLocalCart(payload){
      Array.isArray(payload) && payload.length && (this.cartItems = payload)
    }
  },
});

function indexFound(cartItems, itemToAdd) {
  let isPresent = false;
  cartItems.every((product, index) => {
    if (product.id === itemToAdd.product.id) {
      isPresent = index;
      return false;
    } else {
      return true;
    }
  });
  return isPresent;
}
