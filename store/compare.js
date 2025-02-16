import axiosData from "../static/data/products.json";

export const useCompareStore = defineStore({
  id: "compare",
  state: () => {
    return {
      allProducts: axiosData.data,
      productsToCompare: [],
      currentType: "",
    };
  },
  getters: {
    compareItems(state) {
      return state.productsToCompare;
    },
  },
  actions: {
    addToCompare(payload) {
      var productIndex = indexFound(this.productsToCompare, payload);
      if (productIndex !== false) {
      } else {
        var itemToAdd = {},
          itemFound = false;
        this.allProducts.every((item) => {
          if (item.id === payload) {
            itemToAdd = item;
            itemFound = true;
            return false;
          } else return true;
        });
        if (this.currentType === "" || this.currentType === itemToAdd.type)
          this.currentType = itemToAdd.type;
        else {
          this.productsToCompare = [];
          this.currentType = itemToAdd.type;
        }
        if (itemFound) this.productsToCompare.push(itemToAdd);
        else

        if (this.productsToCompare.length === 1) {
          let similarProducts = this.allProducts.filter((item) => {
            if (item.type === itemToAdd.type) return true;
          });
          if (similarProducts[0].id === itemToAdd.id)
            this.productsToCompare.push(similarProducts[1]);
          else this.productsToCompare.push(similarProducts[0]);
        }
      }
    },
    removeAllFromCompare() {
      this.productsToCompare = [];
    },
    removeFromCompare(payload) {
      var index = indexFound(this.productsToCompare, payload.id);
      if (index !== false) {
        this.productsToCompare.splice(index, 1);
      } else alert("Item not Found in compare.");
    },
    setLocalProductsToCompare(payload){
      this.productsToCompare = payload || []
    }
  },
});

function indexFound(compareItems, itemToAdd) {
  let isPresent = false;
  compareItems.every((product, index) => {
    if (product.id === itemToAdd) {
      isPresent = index;
      return false;
    } else {
      return true;
    }
  });
  return isPresent;
}
