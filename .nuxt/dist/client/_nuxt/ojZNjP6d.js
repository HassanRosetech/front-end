import{_ as y,r as d,o,c as a,b as i,w as r,d as k,a as e,t as c,y as R,i as u,j as b,F as m,k as _,T as C,H as N}from"./BHCayY3x.js";import{g as x}from"./CyZT7gpL.js";import{l as B}from"./B0MW8jFb.js";import{u as S}from"./Cekp8wXF.js";import"./BZABzFC3.js";import"./prAsIpjU.js";import"./Bkge9E1g.js";import"./DmLktNm9.js";import"./DhxlqMuE.js";import"./CZ-_-uzD.js";import"./CcY6dySL.js";import"./BcIfCn5G.js";import"./D-iVd-EU.js";const T={components:{layout5:B},head(){return{title:"Review"}},computed:{banners(){return S().data.filter(s=>s.type==="reviews")[0].children}}},V={class:"review-section section-b-space"},H={class:"container"},I={class:"row g-3 grid"},U={class:"grid-item col-lg-4 col-sm-6 w-100"},$={class:"review-box"},F={class:"review-name"},j={key:0},q={class:"review-image"},D={class:"review-profile"},E=["src"],J={class:"image-name"},L={class:"rating d-flex"};function z(s,n,A,G,K,p){const f=C,g=N,v=d("masonry-wall"),w=d("layout5");return o(),a(m,null,[i(g,null,{default:r(()=>[i(f,null,{default:r(()=>n[0]||(n[0]=[k("Review")])),_:1})]),_:1}),i(w,{pageName:"Review",parent:"Review"},{default:r(()=>[e("section",V,[e("div",H,[e("div",I,[i(v,{items:p.banners,gap:15,"ssr-columns":3},{default:r(({item:t})=>[e("div",U,[e("div",$,[e("div",F,[e("p",null,c(t.review),1),t.review2?(o(),a("p",j,c(t.review2),1)):R("",!0)]),e("div",q,[e("div",D,[e("img",{src:("getImageUrl"in s?s.getImageUrl:u(x))(t.image),class:"img-fluid",alt:""},null,8,E)]),n[1]||(n[1]=e("i",{class:"fas fa-quote-right"},null,-1)),e("div",J,[e("h3",null,c(("useRuntimeConfig"in s?s.useRuntimeConfig:u(b))().public.const.Johnwick),1),e("ul",L,[e("li",null,[(o(!0),a(m,null,_(t.ratingStars,(h,l)=>(o(),a("i",{class:"fas fa-star theme-color",key:"a"+l}))),128))]),e("li",null,[(o(!0),a(m,null,_(5-t.ratingStars,(h,l)=>(o(),a("i",{class:"fas fa-star",key:"a"+l}))),128))])])])])])])]),_:1},8,["items"])])])])]),_:1})],64)}const ne=y(T,[["render",z]]);export{ne as default};
