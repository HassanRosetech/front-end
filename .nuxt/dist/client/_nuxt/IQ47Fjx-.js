import{_ as f,o as n,c as a,a as o,F as S,k as $,q as h,m as p,i as b,t as d,b as r,r as k,w as u,d as B,T as C,H as I}from"./BHCayY3x.js";import{g as v}from"./CyZT7gpL.js";import{u as w}from"./CHBcv6HN.js";import{_ as T}from"./iWGzzg5u.js";import{l as x}from"./B0MW8jFb.js";import"./DmLktNm9.js";import"./Bkge9E1g.js";import"./BZABzFC3.js";import"./prAsIpjU.js";import"./DhxlqMuE.js";import"./CZ-_-uzD.js";import"./CcY6dySL.js";import"./BcIfCn5G.js";import"./D-iVd-EU.js";const D={data(){return{cardsToShow:8,totalCards:8}},computed:{cardsData(){return w().data.filter(t=>t.type==="blogInfiniteScroll")[0].blogs}},methods:{loadCards(){this.cardsToShow+=3}},created(){this.totalCards=this.cardsData.length}},N={class:"col-xl-9 col-lg-7 order-lg-1 ratio3_2"},U={class:"row g-4 product-load-more"},M={class:"card blog-categories"},H=["src"],P={class:"card-body"},V={class:"card-title"},j={class:"blog-profile"},z={class:"image-name"},F={class:"load-more"},L={key:0},q={key:1};function E(t,e,_,m,l,i){return n(),a("div",N,[o("div",U,[(n(!0),a(S,null,$(i.cardsData,(s,c)=>(n(),a("div",{class:"col-xl-4 col-6 col-grid-box",key:c,style:h({display:c+1<=l.cardsToShow?"block":"none"})},[o("div",M,[o("a",{href:"javascript:void(0)",onClick:e[0]||(e[0]=p(g=>t.$router.push("/blog/blog_details"),["prevent"])),class:"blog-img sliderBackground bg-size",style:h({"background-image":`url(${("getImageUrl"in t?t.getImageUrl:b(v))(s.imagePath)})`})},[o("img",{src:("getImageUrl"in t?t.getImageUrl:b(v))(s.imagePath),alt:"",class:"card-img-top bg-img d-none"},null,8,H)],4),o("div",P,[o("h5",null,d(s.title),1),o("a",{href:"javascript:void(0)",onClick:e[1]||(e[1]=p(g=>t.$router.push("/blog/blog_details"),["prevent"]))},[o("h2",V,d(s.heading),1)]),o("div",j,[o("div",z,[o("h3",null,d(s.name),1),o("h6",null,d(s.date),1)])])])])],4))),128))]),o("div",F,[o("button",{class:"loadMore btn btn-submit btn-full",onClick:e[2]||(e[2]=p((...s)=>i.loadCards&&i.loadCards(...s),["prevent"]))},[l.cardsToShow<l.totalCards?(n(),a("span",L,"load more")):(n(),a("span",q,"No More Products"))])])])}const R=f(D,[["render",E]]),A={},G={id:"portfolio",class:"left-sidebar-section masonary-blog-section section-b-space"},J={class:"container"},K={class:"row g-4"};function O(t,e){const _=R,m=T;return n(),a("section",G,[o("div",J,[o("div",K,[r(_),r(m)])])])}const Q=f(A,[["render",O]]),W={components:{layout5:x},head(){return{title:"Blog Infinite Scroll"}}};function X(t,e,_,m,l,i){const s=C,c=I,g=Q,y=k("layout5");return n(),a(S,null,[r(c,null,{default:u(()=>[r(s,null,{default:u(()=>e[0]||(e[0]=[B("Blog Infinite Scroll")])),_:1})]),_:1}),r(y,{pageName:"Blog Infinite Scroll",parent:"Blog"},{default:u(()=>[r(g)]),_:1})],64)}const go=f(W,[["render",X]]);export{go as default};
