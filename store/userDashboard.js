import Data from "../static/data/userDashboard.json";
export const useUserDashboardStore = defineStore({
  id: "UserDashboard",

  state: () => {
    return {
      data: Data.data,
      user:{}
    };
  },
  actions:{
    setUser(payload){
      this.user = payload
      useCookie('user').value =JSON.stringify(payload)
      
    },
    logoutUser(){
      this.user = {}
      useCookie('user').value =undefined
    }
  }
});
