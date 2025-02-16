import {useLayout} from "@/store/layout"
const WithoutThemeSettings = ['page/comming_soon']
const noTapToTopArray = [ "/page/login", "/page/register", "/page/forgot_password", "/page/comming_soon", ]
export default defineNuxtRouteMiddleware(async(to, from) =>{
  useLayout().setPrimaryColor({primaryColor:'#e22454'});

  if(isPresent({path:to.path,list:WithoutThemeSettings})){
    useLayout().setShowThemeSettings({value:false})
  }else{
    useLayout().setShowThemeSettings({value:true})
  }

  if(isPresent({path:to.path,list:noTapToTopArray})){
    useLayout().setShowTapToTop({value:false})
  }else{
    useLayout().setShowTapToTop({value:true})
  }
})



const isPresent = ({path,list})=>{
  let toReturn = false;
  list.every(item=>{
    if(path.toLowerCase().includes(item.toLocaleLowerCase())){
      toReturn = true
    }
    return !toReturn
    
  })
  
  return toReturn
}
