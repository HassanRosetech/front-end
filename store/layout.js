import axiosData from "../static/data/themeSettings.json";

export const useLayout = defineStore({
  id: "layout",
  state: () => {
    return {
      currencyList: [{
          currency: "Dollar",
          currencySymbol: "$",
          currencyConversionMultiple: 1,
        },
        {
          currency: "Rupee",
          currencySymbol: "₹",
          currencyConversionMultiple: 78.6,
        },
        {
          currency: "Euro",
          currencySymbol: "€",
          currencyConversionMultiple: 0.98,
        },
      ],
      currencyConversionMultiple: Number(useCookie('currencyConversionMultiple').value) || 1,
      selectedCurrency: useCookie('selectedCurrency').value || "dollar",
      selectedCurrencySymbol: useCookie('selectedCurrencySymbol').value || "$",
      showThemeSettings:true,
      layoutType: "ltr",
      themeConfig: axiosData,
      layoutMode: "light",
      layoutFile: "demo2_dark.css",
      primaryColor: "#e22454",
      selectedLanguage: "english",
      showTapToTop:true,
    };
  },
  actions: {
    setShowThemeSettings({value=true}){
      this.showThemeSettings = value
    },
    setShowTapToTop({value=true}){
      this.showTapToTop = value
    },
    setLayoutType(payload) {
      this.layoutType = ["rtl",'ltr'].includes(payload)?payload:'ltr';
    },
    toggleLayoutMode(payload) {
      this.layoutMode=='dark'?this.layoutMode = 'light':this.layoutMode = 'dark'
    },
    setLayoutMode(payload){
      this.layoutMode== ['dark','light'].includes(payload)?payload:'light';
    },
    setCurrency(payload) {
      this.currencyList.every((currency) => {
        if (currency.currency === payload.currency) {
          this.selectedCurrency = currency.currency;
          this.selectedCurrencySymbol = currency.currencySymbol;
          this.currencyConversionMultiple = currency.currencyConversionMultiple;
          return false;
        } else return true;
      });
    },
    setPrimaryColor({
      primaryColor
    }) {
      this.primaryColor = primaryColor || '#000'
      useCookie('primaryColor').value = primaryColor
    },
    setLanguage(payload) {
      this.selectedLanguage = payload.languageCode;
    },
    setInitialValues(){
      if(this.themeConfig?.useTheseSettings){
        this.layoutType = this.themeConfig.layout||'ltr';
        this.layoutMode = this.themeConfig.darkMode?'dark':'light';
        this.primaryColor = this.themeConfig.primaryColor || '#e22454';
      }
    }
  },
});