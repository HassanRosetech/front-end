import axiosData from "../static/data/footerLinks.json";
export const useFooterStore = defineStore({
  id: "footer",
  state: () => {
    return {
      data: axiosData.data,
    };
  },
});
