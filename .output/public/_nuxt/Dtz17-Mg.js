import{s as g}from"./B8bbKuZA.js";import{_ as m,v as p,c as a,o as r,a as t,z as _,D as f,t as v,b,F as i,x as d}from"./BCKidhl8.js";const h={components:{VueFeather:g},props:["product"],methods:{getImageUrl(o){return"/images/"+o}}},k={class:"product-box product-box-6"},y={class:"img-wrapper squre-image"},x=["src"],B={class:"labels label-block theme-color"},S={key:0,class:"label-7"},C={class:"cart-info cart-bag"},F={class:"cart-contain"},V={class:"product-detail"},z={class:"rating mt-1"};function I(o,s,e,N,U,n){const u=p("vue-feather");return r(),a("div",k,[t("div",y,[t("div",{class:"front-img sliderBackground bg-size",style:_({"background-image":`url(${n.getImageUrl(e.product.images[0].src)})`})},[t("img",{class:"img-fluid bg-img d-none",alt:"",src:n.getImageUrl(e.product.images[0].src)},null,8,x)],4),t("div",B,[e.product.discount?(r(),a("span",S,v(e.product.discount)+"% off",1)):f("",!0)]),t("div",C,[t("div",F,[t("a",{href:"javascript:void(0)",class:"addtocart-btn","data-bs-toggle":"modal","data-bs-target":"#addtocart",onClick:s[0]||(s[0]=c=>o.toggleCartModal(e.product))},[b(u,{type:"shopping-bag"})])])])]),t("div",V,[s[3]||(s[3]=t("a",{href:"javascript:void(0)"},[t("h5",null,"Fresh Plum")],-1)),t("ul",z,[(r(!0),a(i,null,d(e.product.ratingStars,(c,l)=>(r(),a("li",{key:l},s[1]||(s[1]=[t("i",{class:"fa fa-star theme-color"},null,-1)])))),128)),(r(!0),a(i,null,d(5-e.product.ratingStars,(c,l)=>(r(),a("li",{key:"A"+l},s[2]||(s[2]=[t("i",{class:"fa fa-star"},null,-1)])))),128))])])])}const q=m(h,[["render",I]]);export{q as p};
