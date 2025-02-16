import axiosData from "../static/data/popularCards.json";
export const usepopularCardsStore = defineStore({
  id: "popularCard",
  state: () => {
    return {
      data: axiosData.data,
    };
  },
});
