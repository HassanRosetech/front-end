import axiosData from "../static/data/products.json";
export const usefilterStore = defineStore({
  id: "filter",
  state: () => {
    return {
      showFilters: false,
      allCards: axiosData.data,
      cards: axiosData.data.filter((item) => item.type === "fashion"),
      filteredCards: [],
      maxPrice: 0,
      colorFilter: "",
      priceRange: [],
      selectedColorsList: "all",
      filtersList: [],
      category: "all",
      discount: 0,
      sortingCriteria: "byPopularity",
      selectedRatingStars: [],
      selectedSize: "",
    };
  },
  getters: {
    cardsToReturn(state) {
      var cardsToReturn = [];
      if (state.filtersList.length === 0) cardsToReturn = state.allCards;
      else cardsToReturn = state.filteredCards;

      cardsToReturn = cardsToReturn.filter((products) => {
        if (
          products.type === state.category &&
          products.discount >= state.discount
        )
          return true;
        if (
          (state.category === "all" || state.category === undefined) &&
          products.discount >= state.discount
        )
          return true;
      });

      if (state.priceRange.length != 0) {
        cardsToReturn = cardsToReturn.filter((product) => {
          if (
            product.price >= state.priceRange[0] &&
            product.price <= state.priceRange[1]
          )
            return true;
        });
      }
      if (state.selectedColorsList != "all") {
        var filterByColor = [];
        if (typeof state.selectedColorsList === "string") {
          cardsToReturn = filterByColor.filter((product) =>
            product.colors.includes(state.selectedColorsList)
          );
        } else {
          state.selectedColorsList.forEach((color) => {
            filterByColor.push(
              ...cardsToReturn.filter((product) => {
                if (product.colors.includes(color)) return true;
                else false;
              })
            );
          });
        }
        cardsToReturn = filterByColor;
      }
      if (state.selectedRatingStars.length > 0) {
        cardsToReturn = cardsToReturn.filter((card) =>
          state.selectedRatingStars.includes(card.ratingStars)
        );
      }
      if (state.selectedSize.length > 0) {
        cardsToReturn = cardsToReturn.filter((card) =>
          card.sizeoption.includes(state.selectedSize)
        );
      }

      cardsToReturn = [...new Set(cardsToReturn)];
      if (state.sortingCriteria != "default") {
        if (state.sortingCriteria === "byPrice")
          cardsToReturn.sort((a, b) => {
            return a.price - b.price;
          });
        else if (state.sortingCriteria === "byPriceHTL")
          cardsToReturn.sort((a, b) => {
            return b.price - a.price;
          });
        else if (state.sortingCriteria === "byName")
          cardsToReturn.sort((a, b) => {
            let fa = a.name.toLowerCase(),
              fb = b.name.toLowerCase();
            if (fa < fb) return -1;
            if (fa > fb) return 1;
            return 0;
          });
        else if (state.sortingCriteria === "byRating")
          cardsToReturn.sort((a, b) => {
            return b.ratingStars - a.ratingStars;
          });
        else if (state.sortingCriteria === "byPopularity")
          cardsToReturn.sort((a, b) => {
            return b.totalPurchases - a.totalPurchases;
          });
      }
      return cardsToReturn;
    },

    maxPrices(state, getters) {
      var allUniquePrices = [];
      if (state.category === "all" || state.category === undefined) {
        allUniquePrices = [
          ...new Set(
            state.allCards.map((product) => (product.price ? product.price : 0))
          ),
        ];
      } else {
        allUniquePrices = [
          ...new Set(
            state.allCards
              .filter((product) =>
                product.type === state.category ? true : false
              )
              .map((item) => (item.price ? item.price : 0))
          ),
        ];
      }
      if (allUniquePrices.length === 0) allUniquePrices = [100];
      return Math.ceil(Math.max(...allUniquePrices) / 100) * 100;
    },
    unroundedMaxPrice(state, getters) {
      var allUniquePrices = [];
      if (state.category === "all" || state.category === undefined) {
        allUniquePrices = [
          state.allCards.map((product) => (product.price ? product.price : 0)),
        ];
      } else {
        allUniquePrices = [
          state.allCards
            .filter((product) =>
              product.type === state.category ? true : false
            )
            .map((item) => (item.price ? item.price : 0)),
        ];
      }
      if (allUniquePrices.length === 0) allUniquePrices = [100];
      return Math.max(...allUniquePrices);
    },
    brandFilters: (state) => {
      const brands = [
        ...new Set(
          state.allCards
            .filter((product) => {
              if (state.category === "all" || state.category === undefined)
                return true;
              else if (state.category === product.type) return true;
            })
            .map((item) => item.brand)
        ),
      ];
      brands.splice(brands.indexOf("none"), 1);
      return brands;
    },
    categories: (state) => {
      const categories = [
        ...new Set(state.allCards.map((product) => product.type)),
      ];
      return categories;
    },
    sortingCriterias: () => {
      var criterias = [
        { criteria: "default", displayName: "Default" },
        { criteria: "byPrice", displayName: "Sort By Price" },
        { criteria: "byName", displayName: "Sort By Name" },
        { criteria: "byPopularity", displayName: "Sort By Popularity" },
        { criteria: "byRating", displayName: "Sort By Rating" },
        { criteria: "byPriceHTL", displayName: "Sort By Price High To Low" },
      ];
      return criterias;
    },
  },
  actions: {
    setFiltersList(payload) {
      this.filtersList = payload;
      this.filteredCards = setFilteredProducts(this.filtersList, this.allCards);
    },
    setCategory(payload) {
      this.category = payload;
    },
    toggleFilterBar() {
      this.showFilters = !this.showFilters;
    },

    clearAllFilters() {
      this.filtersList = [];
    },
    filterDiscount(payload) {
      this.discount = payload;
    },
    priceRangeChange(payload) {
      this.priceRange = payload;
    },
    setColorsList(payload) {
      if (payload.length != 0) this.selectedColorsList = payload;
      else this.selectedColorsList = "all";
    },
    setsSortingCriteria(payload) {
      if (payload === undefined) this.sortingCriteria = "default";
      else this.sortingCriteria = payload;
    },
    setRatingStarsFilter(payload) {
      this.selectedRatingStars = payload.selectedRatingStars;
    },
    setSelectedSize(payload) {
      this.selectedSize = payload.selectedSize;
    },
    removeFilter(payload) {
      var arrayToReturn = this.filtersList;
      arrayToReturn.splice(arrayToReturn.indexOf(payload), 1);
      usefilterStore().setFiltersList(arrayToReturn);
    },
  },
});
function setFilteredProducts(filteredList, allCards) {
  var allFilteredProducts = [],
    productsToReturn = [];
  filteredList.forEach((filter) => {
    allCards.forEach((product) => {
      if (product.brand === filter || product.type === filter) {
        allFilteredProducts.push(product);
      }
    });
  });
  productsToReturn = [...new Set(allFilteredProducts)];
  return productsToReturn;
}