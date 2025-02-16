import axiosData from "../static/data/menu.json";

export const useMenuStore = defineStore({
  id: "menu",
  state: () => {
    return {
      data: axiosData.data,
    };
  },
});
