import axiosData from "../static/data/categoryMenu.json";
export const useCategoryMenuStore = defineStore({
  id: "CategoryMenu",
  state: () => {
    return {
      data: axiosData.data,
    };
  },
});
