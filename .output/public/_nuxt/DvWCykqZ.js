import{g as o}from"./FJEW03B6.js";import{l as f}from"./D1RfBy6t.js";import{u as h}from"./C_vQX4HT.js";import{_ as b,v as d,c as p,o as _,b as c,a as t,C as a,w as I,z as y,j as g,t as m}from"./BCKidhl8.js";const x={props:{parentDivClasses:{type:String},childDivClasses:{type:String},columnWidth:{type:Number,default:300}},components:{layout5:f},data(){return{visible:!1,galleryFilter:"all",lightBoxImages:[],ImageIndex:3}},computed:{filteredImages:function(){return this.galleryFilter==="all"?this.images:this.images.filter(s=>s.filter===this.galleryFilter)},images(){let s=h().data.filter(e=>e.type==="portfolio")[0].children;return s.forEach(e=>this.lightBoxImages.push(o(e.src))),s}},methods:{showImg(s){let e=this.lightBoxImages.findIndex(n=>n.includes(s));this.ImageIndex=e,this.visible=!0},handleHide(){this.visible=!1},isActive:function(s){return this.galleryFilter===s},updateFilter(s){this.galleryFilter=s}}},C={id:"portfolio",class:"portfolio section-b-space"},w={class:"container"},k={class:"row gx-2"},F={class:"col-12"},B={class:"filters button filter-button-group"},A={class:"row mt-3 filter-gallery content grid"},z={class:"parent-container parent-container-size"},D=["onClick"],S=["src"],U={class:"overlay-color"},H={class:"overlay-icon"},N={class:"font-light"};function W(s,e,n,E,r,l){const u=d("vue-easy-lightbox"),v=d("masonry-wall");return _(),p("section",C,[c(u,{visible:r.visible,index:r.ImageIndex,imgs:r.lightBoxImages,onHide:l.handleHide},null,8,["visible","index","imgs","onHide"]),t("div",w,[t("div",k,[t("div",F,[t("div",B,[t("ul",null,[t("li",{class:a(["btn btn-submit",{active:l.isActive("all")}]),"data-filter":"*",onClick:e[0]||(e[0]=i=>l.updateFilter("all"))},e[4]||(e[4]=[t("h4",null,"All",-1)]),2),t("li",{class:a(["btn btn-submit",{active:l.isActive("app")}]),"data-filter":".app",onClick:e[1]||(e[1]=i=>l.updateFilter("app"))},e[5]||(e[5]=[t("h4",null,"App",-1)]),2),t("li",{class:a(["btn btn-submit",{active:l.isActive("card")}]),"data-filter":".card",onClick:e[2]||(e[2]=i=>l.updateFilter("card"))},e[6]||(e[6]=[t("h4",null,"Card",-1)]),2),t("li",{class:a(["btn btn-submit",{active:l.isActive("web")}]),"data-filter":".web",onClick:e[3]||(e[3]=i=>l.updateFilter("web"))},e[7]||(e[7]=[t("h4",null,"Web",-1)]),2)])])])]),c(v,{items:l.filteredImages,"column-width":n.columnWidth,"ssr-columns":2,gap:10,class:a([n.parentDivClasses])},{default:I(({item:i})=>[t("div",A,[t("div",{class:a(["grid-item col-sm-6 w-100",[i.filter,n.childDivClasses]])},[t("div",z,[t("a",{onClick:V=>l.showImg(i.src),class:"back sliderBackground bg-size",style:y({backgroundImage:`url(${("getImageUrl"in s?s.getImageUrl:g(o))(i.src)})`})},[t("img",{src:("getImageUrl"in s?s.getImageUrl:g(o))(i.src),class:"img-fluid bg-img images d-none",alt:""},null,8,S),t("div",U,[t("div",H,[t("h3",null,m(i.title),1),t("p",N,m(i.description),1)])])],12,D)])],2)])]),_:1},8,["items","column-width","class"])])])}const K=b(x,[["render",W]]);export{K as _};
