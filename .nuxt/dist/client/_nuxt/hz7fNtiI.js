import{k as Y,l as K,n as Q,m as Z,p as w,_ as T,c as z,o as S,a as e,q as ss,t as d,j as b,s as y,b as C,v as P,w as k,F as j,x as es,y as ts,z as ls,A as M,B as as,T as os,d as rs,H as ns}from"./BCKidhl8.js";import{u as O}from"./VNuwG3qS.js";import{_ as is}from"./NzzkKtvw.js";import{_ as cs}from"./BFZ2o0f2.js";import{g as V}from"./FJEW03B6.js";import{N as ds}from"./DM3LFi26.js";import{P as ms}from"./MoqrdlUm.js";import{c as us}from"./1koWxyZB.js";import{r as fs}from"./0Sz5vd9s.js";import{l as gs}from"./D1RfBy6t.js";import"./B8bbKuZA.js";import"./CsUr8uEF.js";import"./BNx30NHC.js";import"./BL5IN06U.js";import"./DFmPV37T.js";import"./CsK_Ow4K.js";import"./BSj34--q.js";import"./jwRbRWa8.js";function ps({swiper:s,extendParams:o,on:u,emit:_}){const v=Y();let f=!1,$=null,D=null,g,c,m,L;o({scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag",scrollbarDisabledClass:"swiper-scrollbar-disabled",horizontalClass:"swiper-scrollbar-horizontal",verticalClass:"swiper-scrollbar-vertical"}}),s.scrollbar={el:null,dragEl:null};function B(){if(!s.params.scrollbar.el||!s.scrollbar.el)return;const{scrollbar:t,rtlTranslate:r}=s,{dragEl:l,el:a}=t,n=s.params.scrollbar,p=s.params.loop?s.progressLoop:s.progress;let h=c,i=(m-c)*p;r?(i=-i,i>0?(h=c-i,i=0):-i+c>m&&(h=m+i)):i<0?(h=c+i,i=0):i+c>m&&(h=m-i),s.isHorizontal()?(l.style.transform=`translate3d(${i}px, 0, 0)`,l.style.width=`${h}px`):(l.style.transform=`translate3d(0px, ${i}px, 0)`,l.style.height=`${h}px`),n.hide&&(clearTimeout($),a.style.opacity=1,$=setTimeout(()=>{a.style.opacity=0,a.style.transitionDuration="400ms"},1e3))}function U(t){!s.params.scrollbar.el||!s.scrollbar.el||(s.scrollbar.dragEl.style.transitionDuration=`${t}ms`)}function E(){if(!s.params.scrollbar.el||!s.scrollbar.el)return;const{scrollbar:t}=s,{dragEl:r,el:l}=t;r.style.width="",r.style.height="",m=s.isHorizontal()?l.offsetWidth:l.offsetHeight,L=s.size/(s.virtualSize+s.params.slidesOffsetBefore-(s.params.centeredSlides?s.snapGrid[0]:0)),s.params.scrollbar.dragSize==="auto"?c=m*L:c=parseInt(s.params.scrollbar.dragSize,10),s.isHorizontal()?r.style.width=`${c}px`:r.style.height=`${c}px`,L>=1?l.style.display="none":l.style.display="",s.params.scrollbar.hide&&(l.style.opacity=0),s.params.watchOverflow&&s.enabled&&t.el.classList[s.isLocked?"add":"remove"](s.params.scrollbar.lockClass)}function N(t){return s.isHorizontal()?t.clientX:t.clientY}function q(t){const{scrollbar:r,rtlTranslate:l}=s,{el:a}=r;let n;n=(N(t)-Z(a)[s.isHorizontal()?"left":"top"]-(g!==null?g:c/2))/(m-c),n=Math.max(Math.min(n,1),0),l&&(n=1-n);const p=s.minTranslate()+(s.maxTranslate()-s.minTranslate())*n;s.updateProgress(p),s.setTranslate(p),s.updateActiveIndex(),s.updateSlidesClasses()}function A(t){const r=s.params.scrollbar,{scrollbar:l,wrapperEl:a}=s,{el:n,dragEl:p}=l;f=!0,g=t.target===p?N(t)-t.target.getBoundingClientRect()[s.isHorizontal()?"left":"top"]:null,t.preventDefault(),t.stopPropagation(),a.style.transitionDuration="100ms",p.style.transitionDuration="100ms",q(t),clearTimeout(D),n.style.transitionDuration="0ms",r.hide&&(n.style.opacity=1),s.params.cssMode&&(s.wrapperEl.style["scroll-snap-type"]="none"),_("scrollbarDragStart",t)}function F(t){const{scrollbar:r,wrapperEl:l}=s,{el:a,dragEl:n}=r;f&&(t.preventDefault?t.preventDefault():t.returnValue=!1,q(t),l.style.transitionDuration="0ms",a.style.transitionDuration="0ms",n.style.transitionDuration="0ms",_("scrollbarDragMove",t))}function G(t){const r=s.params.scrollbar,{scrollbar:l,wrapperEl:a}=s,{el:n}=l;f&&(f=!1,s.params.cssMode&&(s.wrapperEl.style["scroll-snap-type"]="",a.style.transitionDuration=""),r.hide&&(clearTimeout(D),D=Q(()=>{n.style.opacity=0,n.style.transitionDuration="400ms"},1e3)),_("scrollbarDragEnd",t),r.snapOnRelease&&s.slideToClosest())}function H(t){const{scrollbar:r,params:l}=s,a=r.el;if(!a)return;const n=a,p=l.passiveListeners?{passive:!1,capture:!1}:!1,h=l.passiveListeners?{passive:!0,capture:!1}:!1;if(!n)return;const i=t==="on"?"addEventListener":"removeEventListener";n[i]("pointerdown",A,p),v[i]("pointermove",F,p),v[i]("pointerup",G,h)}function J(){!s.params.scrollbar.el||!s.scrollbar.el||H("on")}function W(){!s.params.scrollbar.el||!s.scrollbar.el||H("off")}function R(){const{scrollbar:t,el:r}=s;s.params.scrollbar=us(s,s.originalParams.scrollbar,s.params.scrollbar,{el:"swiper-scrollbar"});const l=s.params.scrollbar;if(!l.el)return;let a;typeof l.el=="string"&&s.isElement&&(a=s.el.shadowRoot.querySelector(l.el)),!a&&typeof l.el=="string"?a=v.querySelectorAll(l.el):a||(a=l.el),s.params.uniqueNavElements&&typeof l.el=="string"&&a.length>1&&r.querySelectorAll(l.el).length===1&&(a=r.querySelector(l.el)),a.length>0&&(a=a[0]),a.classList.add(s.isHorizontal()?l.horizontalClass:l.verticalClass);let n;a&&(n=a.querySelector(`.${s.params.scrollbar.dragClass}`),n||(n=K("div",s.params.scrollbar.dragClass),a.append(n))),Object.assign(t,{el:a,dragEl:n}),l.draggable&&J(),a&&a.classList[s.enabled?"remove":"add"](s.params.scrollbar.lockClass)}function x(){const t=s.params.scrollbar,r=s.scrollbar.el;r&&r.classList.remove(s.isHorizontal()?t.horizontalClass:t.verticalClass),W()}u("init",()=>{s.params.scrollbar.enabled===!1?I():(R(),E(),B())}),u("update resize observerUpdate lock unlock",()=>{E()}),u("setTranslate",()=>{B()}),u("setTransition",(t,r)=>{U(r)}),u("enable disable",()=>{const{el:t}=s.scrollbar;t&&t.classList[s.enabled?"remove":"add"](s.params.scrollbar.lockClass)}),u("destroy",()=>{x()});const X=()=>{s.el.classList.remove(s.params.scrollbar.scrollbarDisabledClass),s.scrollbar.el&&s.scrollbar.el.classList.remove(s.params.scrollbar.scrollbarDisabledClass),R(),E(),B()},I=()=>{s.el.classList.add(s.params.scrollbar.scrollbarDisabledClass),s.scrollbar.el&&s.scrollbar.el.classList.add(s.params.scrollbar.scrollbarDisabledClass),x()};Object.assign(s.scrollbar,{enable:X,disable:I,updateSize:E,setTranslate:B,init:R,destroy:x})}const bs=w("/images/inner-page/product/10.jpg"),_s={computed:{blogData(){return O().data}}},vs={class:"col-xl-9 col-lg-8 order-lg-1 ratio_square"},hs={class:"row g-4"},ys={class:"col-12"},Cs={class:"blog-details"},Ds={class:"blog-detail-contain"},$s={class:"card-title"},Ss={class:"font-light first-latter"},ks={class:"font-light"},zs={class:"font-light"},Bs={class:"blog-profile box-center mb-lg-5 mb-4"},Es={class:"image-name text-weight"},Ts={class:"row g-2"},Ls={class:"col-12"},Rs={class:"minus-spacing mb-2"},xs={class:"col-lg-4"},Ps={for:"fname",class:"form-label"},Ns={class:"col-lg-4"},qs={for:"lname",class:"form-label"},Hs={class:"col-12"},Is={for:"textarea",class:"form-label"},Ms={class:"col-12"},Vs={type:"submit",class:"btn btn-solid-default btn-spacing mt-2"};function js(s,o,u,_,v,f){return S(),z("div",vs,[e("div",hs,[e("div",ys,[e("div",Cs,[o[1]||(o[1]=ss('<div class="blog-image-box"><img src="'+bs+'" alt="" class="card-img-top"><div class="blog-title"><div><div class="social-media media-center"><a href="https://www.facebook.com/" target="new"><div class="social-icon-box social-color"><i class="fab fa-facebook-f"></i></div></a><a href="https://twitter.com/" target="new"><div class="social-icon-box social-color"><i class="fab fa-twitter"></i></div></a><a href="https://in.pinterest.com/" target="new"><div class="social-icon-box social-color"><i class="fab fa-pinterest-p"></i></div></a></div></div></div></div>',1)),e("div",Ds,[o[0]||(o[0]=e("span",{class:"font-light"},"August 15 2021",-1)),e("h2",$s,d(("useRuntimeConfig"in s?s.useRuntimeConfig:b(y))().public.const.Blogtitle),1),e("p",Ss,d(f.blogData[0].topText),1),e("p",ks,d(f.blogData[0].middleText),1),e("p",zs,d(f.blogData[0].bottomText),1)])]),e("div",Bs,[o[2]||(o[2]=e("div",{class:"image-profile"},[e("img",{src:is,class:"img-fluid",alt:""})],-1)),e("div",Es,[e("h3",null,d(("useRuntimeConfig"in s?s.useRuntimeConfig:b(y))().public.const.Johnwick),1),e("h6",null,d(("useRuntimeConfig"in s?s.useRuntimeConfig:b(y))().public.const.date),1)])]),e("div",Ts,[e("div",Ls,[e("div",Rs,[e("h3",null,d(("useRuntimeConfig"in s?s.useRuntimeConfig:b(y))().public.const.LeaveComments),1)])]),e("div",xs,[e("label",Ps,d(("useRuntimeConfig"in s?s.useRuntimeConfig:b(y))().public.const.FirstName),1),o[3]||(o[3]=e("input",{type:"text",class:"form-control",id:"fname",placeholder:"Enter First Name",required:""},null,-1))]),e("div",Ns,[e("label",qs,d(("useRuntimeConfig"in s?s.useRuntimeConfig:b(y))().public.const.LastName),1),o[4]||(o[4]=e("input",{type:"text",class:"form-control",id:"lname",placeholder:"Enter Last Name",required:""},null,-1))]),o[6]||(o[6]=e("div",{class:"col-lg-4"},[e("label",{for:"email",class:"form-label"},"Email address"),e("input",{type:"email",class:"form-control",id:"email",placeholder:"example@example.com",required:""})],-1)),e("div",Hs,[e("label",Is,d(("useRuntimeConfig"in s?s.useRuntimeConfig:b(y))().public.const.Comments),1),o[5]||(o[5]=e("textarea",{rows:"3",class:"form-control",id:"textarea",placeholder:"Leave a comment here",required:""},null,-1))]),e("div",Ms,[e("button",Vs,d(("useRuntimeConfig"in s?s.useRuntimeConfig:b(y))().public.const.Submit),1)])])])])])}const Os=T(_s,[["render",js]]),Us={},As={class:"masonary-blog-section"},Fs={class:"container"},Gs={class:"row g-4"};function Js(s,o){const u=Os,_=cs;return S(),z("section",As,[e("div",Fs,[e("div",Gs,[C(u),C(_)])])])}const Ws=T(Us,[["render",Js]]),Xs={data(){return{image:"/_nuxt/assets/images/inner-page/product/9.jpg",settings:fs,modules:[ds,ms,ps],settings:{loop:!0,pagination:{clickable:!0},breakpoints:{1200:{slidesPerView:4,spaceBetween:36},992:{slidesPerView:3,spaceBetween:36},767:{slidesPerView:2,spaceBetween:20},0:{slidesPerView:2,spaceBetween:20}}}}},computed:{relatedBlogs(){return O().data.filter(s=>s.type==="blogDetails")[0].carouselItems}}},Ys={class:"section-b-space block-shadow-space ratio3_2"},Ks={class:"container"},Qs={class:"slide-4 product-wrapper"},Zs={class:"card blog-categories"},ws=["src"],se={class:"card-body"},ee={class:"card-title"},te={class:"blog-profile"},le={class:"image-name"};function ae(s,o,u,_,v,f){const $=P("swiper-slide"),D=P("swiper");return S(),z("section",Ys,[e("div",Ks,[e("div",Qs,[C(D,as({modules:v.modules},v.settings,{class:"swiper-wrapper"}),{default:k(()=>[(S(!0),z(j,null,es(f.relatedBlogs,(g,c)=>(S(),ts($,{class:"swiper-slide",key:c},{default:k(()=>[e("div",Zs,[e("a",{href:"javascript:void(0)",onClick:o[0]||(o[0]=M(m=>s.$router.push("/blog/blog_details"),["prevent"])),class:"blog-img sliderBackground bg-size",style:ls({"background-image":`url(${("getImageUrl"in s?s.getImageUrl:b(V))(g.image)})`})},[e("img",{src:("getImageUrl"in s?s.getImageUrl:b(V))(g.image),alt:"",class:"card-img-top bg-img d-none"},null,8,ws)],4),e("div",se,[e("a",{href:"javascript:void(0)",onClick:o[1]||(o[1]=M(m=>s.$router.push("/blog/blog_details"),["prevent"]))},[e("h2",ee,d(g.heading),1)]),e("div",te,[e("div",le,[e("h3",null,d(g.author),1),e("h6",null,d(g.date),1)])])])])]),_:2},1024))),128))]),_:1},16,["modules"])])])])}const oe=T(Xs,[["render",ae]]),re={components:{layout5:gs},head(){return{title:"Blog Details"}}};function ne(s,o,u,_,v,f){const $=os,D=ns,g=Ws,c=oe,m=P("layout5");return S(),z(j,null,[C(D,null,{default:k(()=>[C($,null,{default:k(()=>o[0]||(o[0]=[rs("Blog Details")])),_:1})]),_:1}),C(m,{pageName:"Blog Details",parent:"Blog"},{default:k(()=>[C(g),C(c)]),_:1})],64)}const ze=T(re,[["render",ne]]);export{ze as default};
