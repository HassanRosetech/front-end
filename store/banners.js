import axiosData from "../static/data/banners.json";
import axiosTabsBanner from "../static/data/tabsBanners.json";

export const useBannerStore = defineStore({
  id: "Banner",
  state: () => {
    return {
      data: axiosData.data,
      tabsBanners: axiosTabsBanner.data,
    };
  },
});
