import{_ as f,r as I,o as a,c as d,a as e,t,i as c,j as v,F as y,k,l as w,v as R,m as _,q as p,B as S,b as h,w as E,d as b,y as z,au as N}from"./BHCayY3x.js";import{b as L}from"./d9pxFfhS.js";import{g}from"./CyZT7gpL.js";import{_ as F}from"./Bkge9E1g.js";import{s as O,b as H}from"./DmLktNm9.js";import{b as A}from"./uHVoZ7I_.js";import{l as D}from"./B0MW8jFb.js";import{u as M}from"./Cekp8wXF.js";import"./BZABzFC3.js";import"./prAsIpjU.js";import"./DhxlqMuE.js";import"./CZ-_-uzD.js";import"./CcY6dySL.js";import"./BcIfCn5G.js";import"./D-iVd-EU.js";const W={components:{bannerBox1:L},props:["banners"],data(){return{isLoaded:!1}},methods:{bannerClasses(n){return n.class?"col-lg-4":"col-lg-4 col-md-6"}},created(){this.isLoaded=!0}},q={class:"col-12"},T={class:"title title1 text-center"},G={class:"contain-image-box"},J={class:"ratio2_1 banner-style-2 pt-0"},K={class:"container p-0"},Q={class:"row gy-4"};function X(n,s,i,$,C,m){const o=I("bannerBox1");return a(),d("div",q,[e("div",null,[e("div",T,[e("h2",null,t(("useRuntimeConfig"in n?n.useRuntimeConfig:c(v))().public.const.Collection1),1)]),e("div",G,[e("section",J,[e("div",K,[e("div",Q,[(a(!0),d(y,null,k(i.banners,(r,l)=>(a(),w(o,{key:l,banner:r,bannerClasses:m.bannerClasses(r)},null,8,["banner","bannerClasses"]))),128))])])])])])])}const Y=f(W,[["render",X]]),Z={props:["banners"],methods:{getBannerClasses(n){return n.childtype==="middlebanner"?"col-xl-3  order-lg-0 order-md-1 order-0":"col-xl-5 col-md-6 custom-col"}}},x={class:"col-12"},ee={class:"section-t-space"},ne={class:"title title1 text-center"},se={class:"contain-image-box"},te={class:"ratio2_1 pt-0"},oe={class:"container p-0"},ie={class:"row gy-3"},ae={key:0,class:"collection-banner text-center collection-center"},le={class:"theme-color mb-2"},re={class:"mt-2"},ce={key:1,class:"collection-banner p-center text-center"},de=["src"],ue={class:"banner-content with-bg"},_e={class:"mb-2 mins-spacing"},ge={class:"s-spacing"};function me(n,s,i,$,C,m){return a(),d("div",x,[e("div",ee,[e("div",ne,[e("h2",null,t(("useRuntimeConfig"in n?n.useRuntimeConfig:c(v))().public.const.Collection2),1)]),e("div",se,[e("section",te,[e("div",oe,[e("div",ie,[(a(!0),d(y,null,k(i.banners,(o,r)=>(a(),d("div",{class:R(["col-lg-4",m.getBannerClasses(o)]),key:r},[o.childtype==="middlebanner"?(a(),d("div",ae,[e("h6",le,t(o.smallheading),1),e("h2",null,t(o.headingtop),1),e("h2",null,t(o.headingbottom),1),e("p",re,t(o.subheading),1),e("button",{href:"javascript:void(0)",onClick:s[0]||(s[0]=_(l=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),type:"button",class:"btn btn-solid-default"},t(("useRuntimeConfig"in n?n.useRuntimeConfig:c(v))().public.const.LearnMore),1)])):(a(),d("div",ce,[e("a",{href:"javascript:void(0)",onClick:s[1]||(s[1]=_(l=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"banner-img sliderBackground bg-size",style:p({"background-image":`url(${("getImageUrl"in n?n.getImageUrl:c(g))(o.image)})`})},[e("img",{src:("getImageUrl"in n?n.getImageUrl:c(g))(o.image),class:"bg-img d-none",alt:""},null,8,de)],4),e("a",{href:"javascript:void(0)",onClick:s[2]||(s[2]=_(l=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"contain-banner"},[e("div",ue,[e("h2",_e,t(o.heading),1),e("span",ge,t(o.subheading),1)])])]))],2))),128))])])])])])])}const he=f(Z,[["render",me]]),be={components:{VueFeather:O},props:["banners"],computed:{selectedCurrencySymbol(){return S().selectedCurrencySymbol}}},pe={class:"col-12"},ve={class:"section-t-space"},fe={class:"title title1 text-center"},$e={class:"contain-image-box"},Ce={class:"banner-section pt-0"},ye={class:"container-fluid p-0"},ke={class:"row g-3"},Be={class:"banner-image"},Ie=["src"],Ue={class:"banner-details"},we={class:"theme-color"},Re={class:"banner-price"},Ee={class:"theme-color"},je={class:"mb-0 mt-2"};function Pe(n,s,i,$,C,m){const o=F,r=I("vue-feather");return a(),d("div",pe,[e("div",ve,[e("div",fe,[e("h2",null,t(("useRuntimeConfig"in n?n.useRuntimeConfig:c(v))().public.const.Collection3),1)]),e("div",$e,[e("section",Ce,[e("div",null,[e("div",ye,[e("div",ke,[(a(!0),d(y,null,k(i.banners,(l,B)=>(a(),d("div",{class:R(["col-lg-4",l.bigResponsive?"":"col-md-6"]),key:B},[e("div",Be,[h(o,{to:l.link},{default:E(()=>[e("img",{src:("getImageUrl"in n?n.getImageUrl:c(g))(l.image),class:"w-100",alt:""},null,8,Ie)]),_:2},1032,["to"]),e("div",Ue,[e("a",{onClick:s[0]||(s[0]=_(U=>n.$router.push("/page/wishlist"),["prevent"])),class:"heart-button"},[s[2]||(s[2]=e("i",{"data-feather":"heart"},null,-1)),h(r,{type:"heart"})]),e("h4",null,[b(t(l.discount)+"% ",1),e("span",we,t(l.off),1)]),e("div",Re,[e("h2",null,t(l.price),1),e("h5",Ee,[e("del",null,t(m.selectedCurrencySymbol)+t(l.delprice),1)])])]),e("a",{href:"javascript:void(0)",onClick:s[1]||(s[1]=_(U=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"banner-shop text-center"},[e("div",null,[e("h5",null,t(l.heading),1),e("p",je,t(l.subHeading),1)])])])],2))),128))])])])])])])])}const Ve=f(be,[["render",Pe]]),Se={props:["banners"]},ze={class:"col-12"},Ne={class:"section-t-space"},Le={class:"title title1 text-center"},Fe={class:"contain-image-box"},Oe={class:"ratio2_1 banner-style-2 pt-0"},He={class:"container p-0"},Ae={class:"row gy-4"},De={class:"collection-banner p-bottom p-center text-center"},Me=["src"],We={class:"banner-detail"},qe={class:"font-dark-30"},Te={class:"banner-content banner-center with-bg"},Ge={class:"mb-2"};function Je(n,s,i,$,C,m){return a(),d("div",ze,[e("div",Ne,[e("div",Le,[e("h2",null,t(("useRuntimeConfig"in n?n.useRuntimeConfig:c(v))().public.const.Collection4),1)]),e("div",Fe,[e("section",Oe,[e("div",He,[e("div",Ae,[(a(!0),d(y,null,k(i.banners,(o,r)=>(a(),d("div",{class:R(["col-lg-4",o.bigResponsive?"":"col-md-6"]),key:r},[e("div",De,[e("a",{href:"javascript:void(0)",onClick:s[0]||(s[0]=_(l=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"banner-img sliderBackground bg-size",style:p({"background-image":`url(${("getImageUrl"in n?n.getImageUrl:c(g))(o.image)})`})},[e("img",{src:("getImageUrl"in n?n.getImageUrl:c(g))(o.image),class:"bg-img d-none",alt:""},null,8,Me)],4),e("div",We,[s[3]||(s[3]=e("a",{href:"javascript:void(0)",class:"heart-wishlist"},[e("i",{class:"far fa-heart"})],-1)),e("span",qe,[b(t(o.discount)+"% ",1),s[2]||(s[2]=e("span",null,"OFF",-1))])]),e("a",{href:"javascript:void(0)",onClick:s[1]||(s[1]=_(l=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"contain-banner contain-center"},[e("div",Te,[e("h2",Ge,t(o.heading),1),e("span",null,t(o.subHeading),1)])])])],2))),128))])])])])])])}const Ke=f(Se,[["render",Je]]),Qe={components:{buttonAnimated:H},props:["banners"]},Xe={class:"col-12"},Ye={class:"section-t-space"},Ze={class:"title title1 text-center"},xe={class:"home-section pt-3"},en={class:"banner-style-2 offer-banner pt-0"},nn={class:"container p-0"},sn={class:"row gy-4"},tn={class:"col-lg-6 ratio2_1"},on={class:"collection-banner p-right text-right"},an=["src"],ln={class:"banner-text"},rn={class:"banner-content"},cn={class:"span-top"},dn={class:"theme-color"},un={class:"theme-color"},_n={class:"col-lg-6"},gn={class:"row gy-4"},mn={class:"col-lg-12 ratio_40"},hn={class:"collection-banner p-left banner-title"},bn=["src"],pn={class:"banner-text"},vn={class:"banner-content"},fn={class:"h-bottom"},$n={class:"theme-color"},Cn={class:"collection-banner p-center text-center"},yn=["src"],kn={class:"banner-content with-bg"},Bn={class:"mb-1"};function In(n,s,i,$,C,m){const o=I("buttonAnimated");return a(),d("div",Xe,[e("div",Ye,[e("div",Ze,[e("h2",null,t(("useRuntimeConfig"in n?n.useRuntimeConfig:c(v))().public.const.Collection5),1)]),e("section",xe,[e("section",en,[e("div",nn,[e("div",sn,[e("div",tn,[e("div",on,[e("a",{href:"javascript:void(0)",onClick:s[0]||(s[0]=_(r=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"banner-img sliderBackground bg-size",style:p({"background-image":`url(${("getImageUrl"in n?n.getImageUrl:c(g))(i.banners.leftbanner.image)})`})},[e("img",{src:"/images/"+i.banners.leftbanner.image,class:"bg-img d-none",alt:""},null,8,an)],4),e("div",ln,[e("div",rn,[e("span",cn,[b(t(i.banners.leftbanner.topheadingleft)+" ",1),e("span",dn,t(i.banners.leftbanner.topheadingright),1)]),e("h2",null,[b(t(i.banners.leftbanner.heading)+" ",1),e("span",un,t(i.banners.leftbanner.price),1)]),h(o,{buttonClasses:"btn btn-solid-default",headerLocation:"/shop/shop_left_sidebar",buttonContent:"Shop Now"})])])])]),e("div",_n,[e("div",gn,[e("div",mn,[e("div",hn,[e("a",{href:"javascript:void(0)",onClick:s[1]||(s[1]=_(r=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"banner-img sliderBackground bg-size",style:p({"background-image":`url(${("getImageUrl"in n?n.getImageUrl:c(g))(i.banners.righttopbanner.image)})`})},[e("img",{src:"/images/"+i.banners.righttopbanner.image,class:"bg-img d-none",alt:""},null,8,bn)],4),e("div",pn,[e("div",vn,[e("h3",fn,[b(t(i.banners.righttopbanner.title)+" ",1),e("span",$n,t(i.banners.righttopbanner.price),1)]),h(o,{buttonContent:"Shop Now",buttonClasses:"btn btn-solid-default"})])])])]),(a(!0),d(y,null,k(i.banners.righttopbanner.rightbottom,(r,l)=>(a(),d("div",{class:"col-sm-6 ratio2_3",key:l},[e("div",Cn,[e("a",{href:"javascript:void(0)",onClick:s[2]||(s[2]=_(B=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"banner-img sliderBackground bg-size",style:p({"background-image":`url(${("getImageUrl"in n?n.getImageUrl:c(g))(r.image)})`})},[e("img",{src:"/images/"+r.image,class:"bg-img d-none",alt:""},null,8,yn)],4),e("a",{href:"javascript:void(0)",onClick:s[3]||(s[3]=_(B=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"contain-banner"},[e("div",kn,[e("h3",Bn,t(r.heading),1),e("span",null,t(r.discount),1)])])])]))),128))])])])])])])])])}const Un=f(Qe,[["render",In]]),wn={components:{bannerBox3:A},props:["banners"],methods:{bannerClasses(n){return n.class?"col-lg-6 mt-lg-0 mt-4":"col-lg-6"}}},Rn={class:"col-12"},En={class:"section-t-space"},jn={class:"contain-image-box"},Pn={class:"poster-section ratio2_1 pt-0"},Vn={class:"container p-0"},Sn={class:"row"};function zn(n,s,i,$,C,m){const o=I("bannerBox3");return a(),d("div",Rn,[e("div",En,[s[0]||(s[0]=e("div",{class:"title title1 text-center"},[e("h2",null,"Collection Banner 6")],-1)),e("div",jn,[e("section",Pn,[e("div",Vn,[e("div",Sn,[(a(!0),d(y,null,k(i.banners,(r,l)=>(a(),w(o,{key:l,bannerClasses:m.bannerClasses(r),item:r},null,8,["bannerClasses","item"]))),128))])])])])])])}const Nn=f(wn,[["render",zn]]),Ln={props:["banners"]},Fn={class:"col-12"},On={class:"section-t-space"},Hn={class:"title title1 text-center"},An={class:"contain-image-box"},Dn={class:"banner-style-2 offer-banner pt-0"},Mn={class:"container p-0"},Wn={class:"row gy-4"},qn={class:"col-lg-6 ratio2_1"},Tn={class:"collection-banner p-right text-right"},Gn=["src"],Jn={class:"banner-text"},Kn={class:"banner-content"},Qn={class:"theme-color"},Xn={class:"theme-color d-block"},Yn={class:"col-lg-6"},Zn={class:"row gy-4"},xn={class:"col-lg-12 ratio_40"},es={class:"collection-banner p-left banner-title"},ns=["src"],ss={class:"banner-text"},ts={class:"banner-content"},os={class:"mb-md-2 mb-0 spacing-text"},is={class:"theme-color"},as={class:"collection-banner p-center text-center"},ls=["src"],rs={class:"banner-content spacing-banner with-bg"},cs={class:"mb-1"};function ds(n,s,i,$,C,m){return a(),d("div",Fn,[e("div",On,[e("div",Hn,[e("h2",null,t(("useRuntimeConfig"in n?n.useRuntimeConfig:c(v))().public.const.Collection7),1)]),e("div",An,[e("section",Dn,[e("div",Mn,[e("div",Wn,[e("div",qn,[e("div",Tn,[e("a",{href:"javascript:void(0)",onClick:s[0]||(s[0]=_(o=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"banner-img sliderBackground bg-size",style:p({"background-image":`url(${("getImageUrl"in n?n.getImageUrl:c(g))(i.banners.leftbanner.image)})`})},[e("img",{src:("getImageUrl"in n?n.getImageUrl:c(g))(i.banners.leftbanner.image),class:"bg-img d-none",alt:""},null,8,Gn)],4),e("div",Jn,[e("div",Kn,[e("h6",null,[b(t(i.banners.leftbanner.titleleft)+" ",1),e("span",Qn,t(i.banners.leftbanner.titleright),1)]),e("h2",null,[b(t(i.banners.leftbanner.headingtop)+" ",1),s[4]||(s[4]=e("br",null,null,-1)),b(" "+t(i.banners.leftbanner.headingbottm),1),e("span",Xn,t(i.banners.leftbanner.price),1)]),s[5]||(s[5]=e("button",{class:"btn default-light default-theme mt-md-2 mt-1 rounded"}," SHOP NOW ",-1))])])])]),e("div",Yn,[e("div",Zn,[e("div",xn,[e("div",es,[e("a",{href:"javascript:void(0)",onClick:s[1]||(s[1]=_(o=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"banner-img sliderBackground bg-size",style:p({"background-image":`url(${("getImageUrl"in n?n.getImageUrl:c(g))(i.banners.rightbanners.image)})`})},[e("img",{src:("getImageUrl"in n?n.getImageUrl:c(g))(i.banners.rightbanners.image),class:"bg-img d-none",alt:""},null,8,ns)],4),e("div",ss,[e("div",ts,[e("h3",os,[b(t(i.banners.rightbanners.heading)+" ",1),e("span",is,t(i.banners.rightbanners.price),1)]),s[6]||(s[6]=e("button",{class:"btn default-light default-light-theme mt-md-2 mt-1 rounded"}," SHOP NOW ",-1))])])])]),(a(!0),d(y,null,k(i.banners.rightbanners.bottombanners,(o,r)=>(a(),d("div",{class:"col-md-6 ratio2_3",key:r},[e("div",as,[e("a",{href:"javascript:void(0)",onClick:s[2]||(s[2]=_(l=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"banner-img sliderBackground bg-size",style:p({"background-image":`url(${("getImageUrl"in n?n.getImageUrl:c(g))(o.image)})`})},[e("img",{src:("getImageUrl"in n?n.getImageUrl:c(g))(o.image),class:"bg-img d-none",alt:""},null,8,ls)],4),o.overlay?(a(),d("a",{key:0,href:"javascript:void(0)",onClick:s[3]||(s[3]=_(l=>n.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"contain-banner"},[e("div",rs,[e("h3",cs,t(o.heading),1),e("span",null,t(("useRuntimeConfig"in n?n.useRuntimeConfig:c(v))().public.const.Discount)+" -"+t(o.discount)+"%",1)])])):z("",!0)])]))),128))])])])])])])])])}const us=f(Ln,[["render",ds]]),_s={components:{layout5:D},head(){return{title:"Element Collection Banner"}},computed:{...N(M,{banners:"data"})}},gs={class:"container-fluid"},ms={class:"row g-4"};function hs(n,s,i,$,C,m){const o=Y,r=he,l=Ve,B=Ke,U=Un,j=Nn,P=us,V=I("layout5");return a(),w(V,{pageName:"Element Category",parent:"Element Category"},{default:E(()=>[e("section",null,[e("div",gs,[e("div",ms,[h(o,{banners:n.banners.filter(u=>u.type==="fashion"&&u.subtype==="topbanner")[0].children},null,8,["banners"]),h(r,{banners:n.banners.filter(u=>u.type==="electronic"&&u.subtype==="topbanner")[0].banners},null,8,["banners"]),h(l,{banners:n.banners.filter(u=>u.type==="furniture"&&u.subtype==="topbanner")[0].children},null,8,["banners"]),h(B,{banners:n.banners.filter(u=>u.type==="flower"&&u.subtype==="topbanner")[0].children},null,8,["banners"]),h(U,{banners:n.banners.filter(u=>u.type==="fashion"&&u.subtype==="newoffer")[0]},null,8,["banners"]),h(j,{banners:n.banners.filter(u=>u.type==="shoes"&&u.subtype==="topbanner")[0].banners},null,8,["banners"]),h(P,{banners:n.banners.filter(u=>u.type==="shoes"&&u.subtype==="newoffers")[0]},null,8,["banners"])])])])]),_:1})}const Ps=f(_s,[["render",hs]]);export{Ps as default};
