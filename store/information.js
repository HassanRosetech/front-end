import axiosData from "../static/data/information.json";
export const useInfoStore = defineStore({
  id: "info",
  state: () => {
    return {
      data: axiosData.data,
    };
  },
});
