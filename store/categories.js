import axiosData from "../static/data/categories.json";
export const useCategoriesStore = defineStore({
  id: "categories",
  state: () => {
    return {
      data: axiosData.data,
    };
  },
});
