import{c as e,o,a as s,t as l,j as d,s as u,_,F as p,x as m,b as h}from"./BCKidhl8.js";import{p as v}from"./BbPY5Eer.js";const g={class:"search-section"},f={class:"container"},b={class:"row"},x={class:"col-12"},y={class:"title title1 text-center"},V={class:"col-lg-6 col-md-8 mx-auto"},B={class:"search-bar"},S={class:"input-group search-bar w-100"},$=["value"],N={__name:"topBar",props:{modelValue:{default:"",type:String}},emits:["update:modelValue"],setup(a,{emit:n}){let r=n;const c=t=>{r("update:modelValue",t.target.value)};return(t,i)=>(o(),e("section",g,[s("div",f,[s("div",b,[s("div",x,[s("div",y,[s("h2",null,l(("useRuntimeConfig"in t?t.useRuntimeConfig:d(u))().public.const.SearchForProducts),1)])]),s("div",V,[s("div",B,[s("div",S,[s("input",{type:"text",class:"form-control",value:a.modelValue,onInput:c,placeholder:"Search"},null,40,$),i[0]||(i[0]=s("button",{class:"input-group-text",id:"basic-addon3"},[s("i",{class:"fas fa-search"})],-1))])])])])])]))}},w={class:"ratio_asos section-b-space"},C={class:"container"},k={class:"product-wrapper product-style-2 slide-4 p-0 light-arrow"},F={class:"grid-container"},L={__name:"productSlider",props:{productsList:Array},setup(a){return(n,r)=>(o(),e("section",w,[s("div",C,[s("div",k,[s("div",F,[(o(!0),e(p,null,m(a.productsList,(c,t)=>(o(),e("div",{key:t,class:"grid-item"},[h(v,{product:c},null,8,["product"])]))),128))])])])]))}},j=_(L,[["__scopeId","data-v-b392041b"]]);export{N as _,j as a};
