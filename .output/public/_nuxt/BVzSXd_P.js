import{_ as Q}from"./B1E4jwQw.js";import{_ as W}from"./CsUr8uEF.js";import{s as O}from"./B8bbKuZA.js";import{_ as C,v as g,c as i,o as r,a as e,F as h,x as _,C as N,b as u,w,A as y,d as k,t as o,f as L,j as $,s as j,e as q,ab as M,y as P,a9 as E,G as x,J as z,I,ao as G,aF as J,B as K,E as T}from"./BCKidhl8.js";import{p as H}from"./BQxV9Dio.js";import{s as X}from"./DU7liZe7.js";import{g as D}from"./FJEW03B6.js";/* empty css        */import{N as Z}from"./DM3LFi26.js";/* empty css        */import{P as ee}from"./MoqrdlUm.js";import{l as te}from"./D4Ef_GUA.js";import{n as se,c as re}from"./D_d2WRb8.js";import{u as U}from"./EmE-W5lJ.js";import{u as oe}from"./DmWgZK4b.js";import{c as ie}from"./CmkFvSRu.js";import"./uIF0iD68.js";import"./D6N3SPFj.js";import"./1koWxyZB.js";import"./BL5IN06U.js";import"./DFmPV37T.js";import"./jwRbRWa8.js";import"./C_vQX4HT.js";const ae={components:{VueFeather:O},props:["banners"],computed:{selectedCurrencySymbol(){return L().selectedCurrencySymbol}},methods:{getImageUrl(t){return"/images/"+t}}},ne={class:"banner-section pt-4"},le={class:"container-fluid"},ce={class:"row g-3"},de={class:"banner-image"},ue=["src"],pe={class:"banner-details"},me={class:"theme-color"},_e={class:"banner-price"},he={class:"theme-color"},ge={class:"mb-0 mt-2"};function fe(t,s,l,f,p,c){const a=W,d=g("vue-feather");return r(),i("section",ne,[e("div",null,[e("div",le,[e("div",ce,[(r(!0),i(h,null,_(l.banners,(n,m)=>(r(),i("div",{class:N(["col-lg-4",n.bigResponsive?"":"col-md-6"]),key:m},[e("div",de,[u(a,{to:n.link},{default:w(()=>[e("img",{src:c.getImageUrl(n.image),class:"w-100",alt:""},null,8,ue)]),_:2},1032,["to"]),e("div",pe,[e("a",{onClick:s[0]||(s[0]=y(v=>t.$router.push("/page/wishlist"),["prevent"])),class:"heart-button"},[s[2]||(s[2]=e("i",{"data-feather":"heart"},null,-1)),u(d,{type:"heart"})]),e("h4",null,[k(o(n.discount)+"% ",1),e("span",me,o(n.off),1)]),e("div",_e,[e("h2",null,o(n.price),1),e("h5",he,[e("del",null,o(c.selectedCurrencySymbol)+o(n.delprice),1)])])]),e("a",{href:"javascript:void(0)",onClick:s[1]||(s[1]=y(v=>t.$router.push("/shop/shop_left_sidebar"),["prevent"])),class:"banner-shop text-center"},[e("div",null,[e("h5",null,o(n.heading),1),e("p",ge,o(n.subHeading),1)])])])],2))),128))])])])])}const ve=C(ae,[["render",fe]]),be={components:{VueFeather:O,productBox3:H},props:["products"],data(){return{isLoaded:!1}}},ye={class:"ratio_asos overflow-hidden"},we={class:"container p-sm-0"},Ce={class:"row m-0"},$e={class:"col-12 p-0"},ke={class:"title-3 text-center"},je={class:"theme-color"},Fe={class:"row g-sm-4 g-3"};function Se(t,s,l,f,p,c){const a=g("productBox3");return r(),i("section",ye,[e("div",we,[e("div",Ce,[e("div",$e,[e("div",ke,[e("h2",null,o(("useRuntimeConfig"in t?t.useRuntimeConfig:$(j))().public.const.NewArrival),1),e("h5",je,o(("useRuntimeConfig"in t?t.useRuntimeConfig:$(j))().public.const.OurCollection),1)])])]),e("div",Fe,[(r(!0),i(h,null,_(l.products.slice(0,8),(d,n)=>(r(),i("div",{class:"col-xl-3 col-lg-4 col-6",key:n},[u(a,{product:d},null,8,["product"])]))),128))])])])}const Be=C(be,[["render",Se]]),Ne={components:{VueFeather:O},props:["banner"],data(){return{timer:{days:0,hours:0,minutes:0,seconds:0},keys:[]}},methods:{getImageUrl(t){return"/images/"+t}},mounted(){this.keys=Object.keys(this.timer);var t=1e3,s=t*60,l=s*60,f=l*24,p=new Date("Aug 21, 2023 00:00:00").getTime();X(()=>{var c=new Date().getTime();this.timer.days=Math.floor((p-c)/f),this.timer.hours=Math.floor((p-c)%f/l),this.timer.minutes=Math.floor((p-c)%l/s),this.timer.seconds=Math.floor((p-c)%s/t)},t)}},Re={class:"deal-section"},Ae={class:"container"},Pe={class:"row"},xe={class:"col-md-12 px-0"},Oe={class:"discount-image-details-1"},Ve={class:"discount-images"},Le=["src"],Me={class:"discount-details mt-xl-0 mt-4"},Te={class:"heart-button"},Ue={class:"discount-shop"},Ie={class:"text-spacing"},He={class:"mt-3"},De={class:"theme-color"},Ye={class:"my-2 deal-text"},Qe={class:"theme-color"},We={class:"timer-style-2 my-2 justify-content-center d-flex"},qe={class:"counter"},Ee={id:"days1",class:"theme-color"};function ze(t,s,l,f,p,c){const a=g("vue-feather");return r(),i("section",Re,[e("div",Ae,[e("div",Pe,[e("div",xe,[e("div",Oe,[e("div",Ve,[s[1]||(s[1]=e("div",{class:"theme-circle"},null,-1)),e("img",{src:c.getImageUrl(l.banner.image),class:"img-fluid shoes-images",alt:""},null,8,Le)]),e("div",Me,[e("div",null,[e("div",Te,[u(a,{type:"heart"})]),e("div",Ue,[e("h2",Ie,o(l.banner.lefthead),1),e("h6",null,o(l.banner.leftsubhead),1)]),e("h5",He,[k(o(l.banner.mainhead1)+" ",1),e("span",De,o(l.banner.offer),1)]),e("h2",Ye,[k(o(l.banner.mainhead2)+" ",1),s[2]||(s[2]=e("br",null,null,-1)),k(o(l.banner.mainhead3)+" ",1),e("span",Qe,o(l.banner.price),1)]),e("div",We,[e("ul",null,[(r(!0),i(h,null,_(p.keys,(d,n)=>(r(),i("li",{key:n},[e("div",qe,[e("div",null,[e("h2",Ee,o(p.timer[d]),1),k(" "+o(d),1)])])]))),128))])]),e("button",{href:"javascript:void(0)",onClick:s[0]||(s[0]=y(d=>t.$router.push("/shop/shop_left_sidebar"),["prevent"])),type:"button",class:"btn default-light-theme default-theme mt-2"},o(("useRuntimeConfig"in t?t.useRuntimeConfig:$(j))().public.const.ShopNow),1)])])])])])])])}const Ge=C(Ne,[["render",ze]]),Je=[{heading:"Most Popular",subHeading:"Our Collection",children:[{id:13,productName:"Orange Arm Chair",description:"Fully Comfortable",mrp:150,price:32.87,image:"furniture-images/new-arrival/1.jpg",type:"popular"},{id:14,productName:"Fancy Yellow Chair",description:"Fully Comfortable",mrp:150,price:32.45,image:"furniture-images/new-arrival/2.jpg",type:"popular"},{id:15,productName:"Orange Arm Chair",description:"Fully Comfortable",mrp:150,price:32.11,image:"furniture-images/new-arrival/3.jpg",type:"popular"},{id:16,productName:"Orange Arm Chair",description:"Fully Comfortable",mrp:150,price:32.68,image:"furniture-images/new-arrival/4.jpg",type:"popular"},{id:17,productName:"Orange Arm Chair",description:"Fully Comfortable",mrp:150,price:32.9,image:"furniture-images/new-arrival/5.jpg",type:"popular"},{id:18,productName:"Yellow Arm Chair",description:"Fully Comfortable",mrp:150,price:32.07,image:"furniture-images/new-arrival/7.jpg",type:"popular"},{id:19,productName:"Orange Arm Chair",description:"Fully Comfortable",mrp:150,price:32.87,image:"furniture-images/new-arrival/8.jpg",type:"popular"}]},{heading:"Recent Popular",subHeading:"Our Collection",children:[{id:20,productName:"Yellow Arm Chair",mrp:150,price:32.36,description:"Fully Comfortable",image:"furniture-images/new-arrival/9.jpg",type:"Recent popular"},{id:17,productName:"Yellow Arm Chair",description:"Fully Comfortable",mrp:150,price:32.9,image:"furniture-images/new-arrival/5.jpg",type:"Recent popular"},{id:14,productName:"Yellow Arm Chair",description:"Fully Comfortable",mrp:150,price:32.45,image:"furniture-images/new-arrival/2.jpg",type:"Recent popular"},{id:16,productName:"2Orange Arm Chair",mrp:150,price:32.68,description:"Fully Comfortable",image:"furniture-images/new-arrival/4.jpg",type:"Recent popular"},{id:18,productName:"Yellow Arm Chair",description:"Fully Comfortable",mrp:150,price:32.07,image:"furniture-images/new-arrival/7.jpg",type:"Recent popular"},{id:14,productName:"2Orange Arm Chair",description:"Fully Comfortable",mrp:150,price:32.45,image:"furniture-images/new-arrival/2.jpg",type:"Recent popular"},{id:16,productName:"Yellow Arm Chair",mrp:150,price:32.68,description:"Fully Comfortable",image:"furniture-images/new-arrival/4.jpg",type:"Recent popular"},{id:18,productName:"2Orange Arm Chair",description:"Fully Comfortable",mrp:150,price:32.07,image:"furniture-images/new-arrival/7.jpg",type:"Recent popular"},{id:20,productName:"Yellow Arm Chair",mrp:150,price:32.36,description:"Fully Comfortable",image:"furniture-images/new-arrival/9.jpg",type:"Recent popular"},{id:14,productName:"Yellow Arm Chair",description:"Fully Comfortable",mrp:150,price:32.45,image:"furniture-images/new-arrival/2.jpg",type:"Recent popular"}]},{heading:"Most Popular ",subHeading:"Our Collection",children:[{id:16,productName:"2Orange Arm Chair",mrp:150,price:32.68,description:"Fully Comfortable",image:"furniture-images/new-arrival/4.jpg",type:"Recent popular"},{id:14,productName:"2Orange Arm Chair",description:"Fully Comfortable",mrp:150,price:32.45,image:"furniture-images/new-arrival/2.jpg",type:"Recent popular"},{id:18,productName:"2Orange Arm Chair",description:"Fully Comfortable",mrp:150,price:32.07,image:"furniture-images/new-arrival/7.jpg",type:"Recent popular"},{id:16,productName:"2Orange Arm Chair",mrp:150,price:32.68,description:"Fully Comfortable",image:"furniture-images/new-arrival/4.jpg",type:"Recent popular"},{id:17,productName:"Yellow Arm Chair",description:"Fully Comfortable",mrp:150,price:32.9,image:"furniture-images/new-arrival/5.jpg",type:"Recent popular"},{id:14,productName:"2Orange Arm Chair",description:"Fully Comfortable",mrp:150,price:32.45,image:"furniture-images/new-arrival/2.jpg",type:"Recent popular"},{id:18,productName:"2Orange Arm Chair",description:"Fully Comfortable",mrp:150,price:32.07,image:"furniture-images/new-arrival/7.jpg",type:"Recent popular"},{id:17,productName:"Yellow Arm Chair",description:"Fully Comfortable",mrp:150,price:32.9,image:"furniture-images/new-arrival/5.jpg",type:"Recent popular"}]}],Ke={data:Je},Xe=q({id:"popularCard",state:()=>({data:Ke.data})}),Ze={components:{VueFeather:O},data(){return{swiper:"",settings:{arrows:!0,centerMode:!0,centerPadding:"10px",infinite:!0,slidesToShow:1,speed:500,responsive:[{breakpoint:1e3,settings:{slidesToShow:1,slidesToScroll:1,infinite:!0}}]}}},computed:{...M(Xe,{cards:"data"}),...M(I,{products:"data"}),selectedCurrencySymbol(){return L().selectedCurrencySymbol}},methods:{getSlicedProducts(t,s,l){var f=l.slice(t,s);return f},handleSwipe(){this.swiper.slideTo(3)},toggleCartModal(t){var s={product:t,quantity:1};z().addToCart(s),x().changeProductId(t.id)},toggleQuickViewModal(t){x().changeProductId(t)},addTocompare(t){let s={image:this.products.filter(l=>l.id===t)[0].images[0].src,message:"Added To compare",link:j().public.const.comparePagePath};E().addToCompare(t),x().toggleSuccessfulModal(s)}},setup(){return{modules:[Z]}}},et={class:"product-slider"},tt={class:"container"},st={class:"row g-3"},rt={class:"most-popular-box"},ot={class:"title-3 pb-4 title-border"},it={class:"theme-color"},at={class:"product-slider round-arrow"},nt=["id"],lt={class:"row g-3"},ct={class:"product-image"},dt=["src","alt"],ut={class:"product-details"},pt={href:"javascript:void(0)"},mt={class:"font-light"},_t={class:"font-light mt-1"},ht={class:"theme-color"},gt={class:"cart-wrap"},ft={"data-bs-toggle":"tooltip","data-bs-placement":"top",title:"Buy"},vt=["onClick"],bt={"data-bs-toggle":"tooltip","data-bs-placement":"top",title:"Quick View"},yt=["onClick"],wt={"data-bs-toggle":"tooltip","data-bs-placement":"top",title:"Compare"},Ct=["onClick"],$t={"data-bs-toggle":"tooltip","data-bs-placement":"top",title:"Wishlist"},kt=["onClick"];function jt(t,s,l,f,p,c){const a=g("vue-feather"),d=g("swiper-slide"),n=g("swiper");return r(),i("section",et,[e("div",null,[e("div",tt,[e("div",st,[(r(!0),i(h,null,_(t.cards,(m,v)=>(r(),i("div",{class:"col-lg-4",key:v},[e("div",rt,[e("div",ot,[e("h2",null,o(m.heading),1),e("h5",it,o(m.subHeading),1)]),e("div",at,[e("div",{id:`arrows${v}`},null,8,nt),u(n,{loop:!0,navigation:!0,modules:f.modules,slidesPerView:1,spaceBetween:20,class:"swiper-wrapper"},{default:w(()=>[(r(!0),i(h,null,_(Math.ceil(m.children.length/4),(S,R)=>(r(),P(d,{class:"swiper-slide",key:R},{default:w(()=>[e("div",lt,[(r(!0),i(h,null,_(c.getSlicedProducts((R+1)*4-4,(R+1)*4,m.children),(b,V)=>(r(),i("div",{class:"col-lg-12 col-md-6 col-12",key:V},[e("div",ct,[e("a",{href:"javascript:void(0)",onClick:s[0]||(s[0]=y(B=>t.$router.push("/product/product_left_sidebar"),["prevent"]))},[e("img",{src:("getImageUrl"in t?t.getImageUrl:$(D))(b.image),alt:b.image},null,8,dt)]),e("div",ut,[e("a",pt,[e("h6",mt,o(b.description),1),e("h3",null,o(b.type),1),e("h4",_t,[e("del",null,o(c.selectedCurrencySymbol)+o(b.mrp),1),e("span",ht,o(c.selectedCurrencySymbol)+o(b.price),1)]),e("div",gt,[e("ul",null,[e("li",ft,[e("a",{href:"javascript:void(0)",class:"addtocart-btn","data-bs-toggle":"modal","data-bs-target":"#addtocart",onClick:B=>c.toggleCartModal(t.products.filter(A=>A.id===b.id)[0])},[u(a,{type:"shopping-bag"})],8,vt)]),e("li",bt,[e("a",{href:"javascript:void(0)","data-bs-toggle":"modal",onClick:B=>c.toggleQuickViewModal(b.id),"data-bs-target":"#quick-view"},[u(a,{type:"eye"})],8,yt)]),e("li",wt,[e("a",{href:"javascript:void(0)",onClick:y(B=>c.addTocompare(b.id),["prevent"])},[u(a,{type:"refresh-cw"})],8,Ct)]),e("li",$t,[e("a",{href:"javascript:void(0)",onClick:y(B=>t.addToWishlist(t.products.filter(A=>A.id===b.id)[0]),["prevent"]),class:"wishlist"},[u(a,{type:"heart"})],8,kt)])])])])])])]))),128))])]),_:2},1024))),128))]),_:2},1032,["modules"])])])]))),128))])])])])}const Ft=C(Ze,[["render",jt]]),St={components:{productBox3:H},props:["products"],data(){return{swiperOption:{slidesPerView:5,spaceBetween:20,freeMode:!1,breakpoints:{1340:{slidesPerView:5},1030:{slidesPerView:4},750:{slidesPerView:3},0:{slidesPerView:2}}}}}},Bt={class:"ratio_asos"},Nt={class:"container-fluid"},Rt={class:"row"},At={class:"col-12"},Pt={class:"title-3 text-center"},xt={class:"theme-color"},Ot={class:"our-product"};function Vt(t,s,l,f,p,c){const a=g("productBox3"),d=g("swiper-slide"),n=g("swiper");return r(),i("section",Bt,[e("div",Nt,[e("div",Rt,[e("div",At,[e("div",Pt,[e("h2",null,o(("useRuntimeConfig"in t?t.useRuntimeConfig:$(j))().public.const.OurProduct),1),e("h5",xt,o(("useRuntimeConfig"in t?t.useRuntimeConfig:$(j))().public.const.OurCollection),1)])]),e("div",Ot,[u(n,{breakpoints:p.swiperOption.breakpoints,slidesPerView:4,spaceBetween:20,class:"swiper-wrapper"},{default:w(()=>[(r(!0),i(h,null,_(l.products,(m,v)=>(r(),P(d,{class:"swiper-slide",key:v},{default:w(()=>[u(a,{product:m},null,8,["product"])]),_:2},1024))),128))]),_:1},8,["breakpoints"])])])])])}const Lt=C(St,[["render",Vt]]),Mt={props:["tabs"]},Tt={class:"tab-wrap"},Ut={class:"nav nav-tabs",id:"myTab"},It=["id","data-bs-target"],Ht={class:"tab-content",id:"myTabContent"},Dt=["id"];function Yt(t,s,l,f,p,c){return r(),i("div",Tt,[e("ul",Ut,[(r(!0),i(h,null,_(l.tabs,(a,d)=>(r(),i("li",{class:"nav-item",key:"a"+d},[e("button",{class:N(["nav-link",[{active:d==0}]]),id:`${a.id}-tab`,"data-bs-toggle":"tab","data-bs-target":`#${a.id}`,type:"button"},o(a.name),11,It)]))),128))]),e("div",Ht,[(r(!0),i(h,null,_(l.tabs,(a,d)=>(r(),i("div",{class:N(["tab-pane fade",[{"show active":d==0}]]),id:a.id,role:"tabpanel",key:"tab"+d},[G(t.$slots,a.id)],10,Dt))),128))])])}const Qt=C(Mt,[["render",Yt]]),Wt={props:["tab","productBoxClasses"],methods:{getSectionClasses(t){return t.childtype==="middlebanner"?"order-lg-0 order-1":"col-md-6"},getImageUrl(t){return"/images/"+t}}},qt={class:"offer-wrap product-style-1"},Et={class:"row g-xl-4 g-3"},zt={key:0,class:"product-banner product-banner-circle"},Gt={class:"img-wrapper"},Jt={class:"label-block"},Kt={class:"label label-black"},Xt={class:"label label-theme"},Zt=["src"],es={class:"offer-end offer-end-demo4"},ts={class:"product-details text-center"},ss={class:"theme-color"},rs={class:"font-light ms-2"},os={href:"javascript:void(0)",class:"font-default",tabindex:"-1"},is={class:"main-title"},as={class:"rating rating-2"},ns={key:1,class:"product-list"},ls={class:"img-wrapper"},cs=["src"],ds={class:"product-details"},us={class:"theme-color"},ps={class:"font-light ms-2"},ms={class:"rating"};function _s(t,s,l,f,p,c){return r(),i("div",qt,[e("div",Et,[(r(!0),i(h,null,_(l.tab.children,(a,d)=>(r(),i("div",{class:N(["col-lg-4",c.getSectionClasses(a)]),key:d},[a.childtype==="middlebanner"?(r(),i("div",zt,[e("div",{class:N(["product-box",l.productBoxClasses])},[e("div",Gt,[e("div",Jt,[e("span",Kt,o(a.lefttag),1),e("span",Xt,o(a.righttag),1)]),e("a",{href:"javascript:void(0)",onClick:s[0]||(s[0]=y(n=>t.$router.push("/product/product_left_sidebar"),["prevent"]))},[e("img",{src:c.getImageUrl(a.image),class:"img-fluid",alt:""},null,8,Zt)]),e("div",es,[e("h3",null,o(a.heading),1),e("h6",null,o(a.subheading),1)])]),e("div",ts,[e("h3",ss,[k(o(a.price),1),e("span",rs,o(a.mrp),1)]),e("a",os,[e("h5",is,o(a.title),1)]),e("ul",as,[e("li",null,[(r(!0),i(h,null,_(a.ratingstars,(n,m)=>(r(),i("i",{class:"fas fa-star theme-color",key:"a"+m}))),128))]),e("li",null,[(r(!0),i(h,null,_(5-a.ratingstars,(n,m)=>(r(),i("i",{class:"fas fa-star",key:"b"+m}))),128))])])])],2)])):(r(),i("div",ns,[(r(!0),i(h,null,_(a.banners,(n,m)=>(r(),i("div",{class:N(["product-box",l.productBoxClasses]),key:"c"+m},[e("div",ls,[e("a",{href:"javascript:void(0)",onClick:s[1]||(s[1]=y(v=>t.$router.push("/product/product_left_sidebar"),["prevent"])),class:"text-center"},[e("img",{src:c.getImageUrl(n.image),class:"img-fluid",alt:""},null,8,cs)]),s[3]||(s[3]=e("div",{class:"circle-shape"},null,-1))]),e("div",ds,[e("h3",us,[k(o(n.price),1),e("span",ps,o(n.mrp),1)]),e("a",{href:"javascript:void(0)",onClick:s[2]||(s[2]=y(v=>t.$router.push("/product/product_left_sidebar"),["prevent"])),class:"font-default"},[e("h5",null,o(n.title),1)]),e("ul",ms,[(r(!0),i(h,null,_(n.ratingstars,(v,S)=>(r(),i("li",{key:"d"+S},s[4]||(s[4]=[e("i",{class:"fas fa-star theme-color"},null,-1)])))),128)),(r(!0),i(h,null,_(5-n.ratingstars,(v,S)=>(r(),i("li",{key:"e"+S},s[5]||(s[5]=[e("i",{class:"fas fa-star"},null,-1)])))),128))])])],2))),128))]))],2))),128))])])}const hs=C(Wt,[["render",_s]]),gs={components:{hurryUpCard:hs},props:["tabList"]},fs={class:"tab-section"},vs={class:"container"},bs={class:"row"},ys={class:"col"};function ws(t,s,l,f,p,c){const a=g("hurryUpCard"),d=Qt;return r(),i("section",fs,[e("div",vs,[e("div",bs,[e("div",ys,[s[0]||(s[0]=e("div",{class:"title-3 text-center"},[e("h2",null,"Hurry up!"),e("h5",{class:"theme-color"},"Special Offer")],-1)),u(d,{tabs:l.tabList},J({_:2},[_(l.tabList,(n,m)=>({name:n.id,fn:w(()=>[(r(),P(a,{productBoxClasses:"product-box1",key:"Tabbox"+m,tab:n},null,8,["tab"]))])}))]),1032,["tabs"])])])])])}const Cs=C(gs,[["render",ws]]),$s={props:["banners"],data(){return{swiperOption:{modules:[ee],slidesPerView:5,loop:!0,pagination:{clickable:!0},breakpoints:{1630:{spaceBetween:24,slidesPerView:5},1200:{spaceBetween:24,slidesPerView:4},899:{spaceBetween:24,slidesPerView:3},575:{spaceBetween:12,slidesPerView:2},420:{spaceBetween:12,slidesPerView:1.1},0:{spaceBetween:12,centeredSlides:!0,slidesPerView:1.1}}}}}},ks={class:"container-fluid"},js={class:"row"},Fs={class:"col"},Ss={class:"title-3 text-center"},Bs={class:"theme-color"},Ns={class:"product-style-1"},Rs={class:"product-wrapper insta-slider instagram-wrap"},As={class:"product-box product-box1"},Ps={class:"img-wrapper"},xs={href:"javascript:void(0)",class:"text-center"},Os=["src"],Vs={class:"insta-hover insta-hover-gradient text-center"},Ls={class:"brand-name"};function Ms(t,s,l,f,p,c){const a=g("swiper-slide"),d=g("swiper");return r(),i("section",null,[e("div",ks,[e("div",js,[e("div",Fs,[e("div",Ss,[e("h2",null,o(("useRuntimeConfig"in t?t.useRuntimeConfig:$(j))().public.const.InstagramShop),1),e("h5",Bs,o(("useRuntimeConfig"in t?t.useRuntimeConfig:$(j))().public.const.NewCollection),1)]),e("div",Ns,[e("div",Rs,[u(d,K(p.swiperOption,{class:"swiper-wrapper"}),{default:w(()=>[(r(!0),i(h,null,_(l.banners,(n,m)=>(r(),P(a,{key:m},{default:w(()=>[e("div",As,[e("div",Ps,[s[1]||(s[1]=e("div",{class:"top-wishlist"},[e("a",{href:"javascript:void(0)",class:"heart-wishlist ms-auto"},[e("i",{class:"far fa-heart"})])],-1)),e("a",xs,[e("img",{src:("getImageUrl"in t?t.getImageUrl:$(D))(n.image),class:"img-fluid",alt:""},null,8,Os)])]),e("div",Vs,[e("div",null,[e("h2",null,o(n.heading),1),e("h5",null,o(n.discount),1),e("h3",Ls,o(n.title),1),e("button",{href:"javascript:void(0)",onClick:s[0]||(s[0]=y(v=>t.$router.push("/shop/shop_left_sidebar"),["prevent"])),type:"button",class:"btn btn-light-white"},s[2]||(s[2]=[k(" Shop now "),e("i",{class:"fas fa-chevron-right ms-2"},null,-1)]))])])])]),_:2},1024))),128))]),_:1},16)])])])])])])}const Ts=C($s,[["render",Ms]]),Us={components:{layout1:te,cookieBar2:ie,service:re,newsLetterModal:se},head(){return{title:"Furniture Store",link:[{rel:"icon",type:"image/x-icon",href:"4.png"}]}},data(){return{products:[]}},computed:{bannersList(){return U().data.filter(t=>t.type==="furniture")},productsList(){return I().data.filter(t=>t.type==="furniture")},categories(){return oe().data.filter(t=>t.type==="flowers")[0].categories},hurryUpBannersList(){return U().tabsBanners.filter(t=>t.type==="furniture")}},methods:{productsArray(){this.productsList.map(t=>{t.type==="furniture"&&this.products.push(t)})}},mounted(){!T("newsLetterSet").value&&x().toggleNewsLetterModal(),L().setPrimaryColor({primaryColor:"#e87316"}),(T("layoutType").value||"light")==="dark"?this.themeCss="/voxo/css/demo4_dark.css":this.themeCss="/voxo/css/demo4.css"},created(){this.productsArray()}};function Is(t,s,l,f,p,c){const a=g("cookieBar2"),d=Q,n=ve,m=Be,v=Ge,S=Ft,R=Lt,b=Cs,V=Ts,B=g("service"),A=g("newsLetterModal"),Y=g("layout1");return r(),P(Y,{iconBgColor:"theme-bg-color",formControlColor:"color-4"},{cookieBar:w(()=>[u(a)]),default:w(()=>[u(d),u(n,{banners:c.bannersList.filter(F=>F.subtype==="topbanner")[0].children},null,8,["banners"]),u(m,{products:p.products},null,8,["products"]),u(v,{banner:c.bannersList.filter(F=>F.subtype==="deal")[0]},null,8,["banner"]),u(S),u(R,{products:p.products},null,8,["products"]),u(b,{tabList:c.hurryUpBannersList.filter(F=>F.subtype==="hurryup")[0].tabs},null,8,["tabList"]),u(V,{banners:c.bannersList.filter(F=>F.subtype==="instagramshop")[0].children},null,8,["banners"]),u(B,{serviceClasses:"service-style-2 section-b-space"}),u(A)]),_:1})}const dr=C(Us,[["render",Is]]);export{dr as default};
