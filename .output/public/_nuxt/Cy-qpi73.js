import{_ as u,E as i,c,o as d,a as e,j as n,A as f,t as k,s as g,C as m}from"./BCKidhl8.js";import{g as h}from"./FJEW03B6.js";const p={props:["cookieBarClasses"],data(){return{show:!0}},methods:{setCookie(){this.show=!1,i("cookieSet").value=!0}},created(){i("cookieSet").value&&(this.show=!1)}},C=["src"],b={class:"content"},v={class:"cookie-buttons"},w={href:"javascript:void(0)",class:"btn default-light1"};function _(o,s,a,B,r,t){return d(),c("div",{class:m(["cookie-bar-section",[{hide:!r.show},a.cookieBarClasses]])},[e("img",{src:("getImageUrl"in o?o.getImageUrl:n(h))("cookie.png"),alt:""},null,8,C),e("div",b,[s[1]||(s[1]=e("h3",null,"Cookies Consent",-1)),s[2]||(s[2]=e("p",{class:"font-light"}," This website use cookies to ensure you get the best experience on our website. ",-1)),e("div",v,[e("button",{class:"btn btn-solid-default",id:"button",onClick:s[0]||(s[0]=f((...l)=>t.setCookie&&t.setCookie(...l),["prevent"]))}," I understand "),e("a",w,k(("useRuntimeConfig"in o?o.useRuntimeConfig:n(g))().public.const.LearnMore),1)])])],2)}const S=u(p,[["render",_]]);export{S as c};
