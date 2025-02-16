import axiosData from "../static/data/blogData.json";

export const useBlogDataStore = defineStore({
  id: "BlogData",
  state: () => {
    return {
      data: axiosData.data,
    };
  },
});
