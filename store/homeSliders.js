import axiosData from "../static/data/homeSliders.json";

export const useHomeSliderStore = defineStore({
  id: "homeSlider",
  state: () => {
    return {
      data: axiosData.data,
    };
  },
});
