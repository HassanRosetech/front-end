import{_ as b,c as y,o as k,b as d,a as e,w as r,T as C,d as u,H as x,q as _,t as m,j as p,s as g,a2 as f,z as a,aa as c,A as n,F,E as R}from"./BCKidhl8.js";import{_ as T}from"./CsUr8uEF.js";import{u as V}from"./DFmPV37T.js";import{_ as B,a as L}from"./D2Wi-i-a.js";const N={data(){return{themeCss:"/demo2.css",auth:{email:"test@gmail.com",password:"test@123"},selected:{email:!1,password:!1}}},head(){return{title:"Login",link:[{rel:"icon",type:"image/x-icon",href:"/favicon.png"}]}},methods:{select(t){this.selected[t]=!0},login(){this.auth.email=="test@gmail.com"&&this.auth.password=="test@123"&&(V().setUser({email:this.auth.email,isLoggedIn:!0}),this.$router.back())},handleFocusOut(t){this.auth[t]===""&&(this.selected[t]=!1)}},mounted(){(R("layoutType").value||"light")==="dark"?this.themeCss="/voxo/css/demo2_dark.css":this.themeCss="/voxo/css/demo2.css",this.auth.email.length!=0&&this.select("email"),this.auth.password.length!=0&&this.select("password")}},S={class:"login-section"},M={class:"materialContainer"},O={class:"box"},U={class:"login-title"},j={class:"input"},D={class:"input"},E={class:"button login"},H={class:"sign-category"};function I(t,s,P,q,o,l){const h=C,v=x,w=T;return k(),y(F,null,[d(v,null,{default:r(()=>[d(h,null,{default:r(()=>s[8]||(s[8]=[u("Login")])),_:1})]),_:1}),e("div",S,[e("div",M,[e("div",O,[e("div",U,[e("h2",null,m(("useRuntimeConfig"in t?t.useRuntimeConfig:p(g))().public.const.LogIn),1)]),e("div",j,[e("label",{for:"email",style:a([{"line-height":o.selected.email?"18px":"60px"}])},m(("useRuntimeConfig"in t?t.useRuntimeConfig:p(g))().public.const.Email),5),f(e("input",{type:"email",name:"email",id:"email",required:"",onBlur:s[0]||(s[0]=i=>l.handleFocusOut("email")),"onUpdate:modelValue":s[1]||(s[1]=i=>o.auth.email=i),onFocus:s[2]||(s[2]=n(i=>l.select("email"),["prevent"]))},null,544),[[c,o.auth.email]]),e("span",{class:"spin",style:a([{width:o.selected.email?"100%":"0%"}])},null,4),s[9]||(s[9]=e("div",{class:"valid-feedback"},"Please fill the name",-1))]),e("div",D,[e("label",{for:"password",style:a([{"line-height":o.selected.password?"18px":"60px"}])},"Password",4),f(e("input",{type:"password",name:"password",id:"password",onBlur:s[3]||(s[3]=i=>l.handleFocusOut("password")),"onUpdate:modelValue":s[4]||(s[4]=i=>o.auth.password=i),onFocus:s[5]||(s[5]=n(i=>l.select("password"),["prevent"]))},null,544),[[c,o.auth.password]]),e("span",{class:"spin",style:a([{width:o.selected.password?"100%":"0%"}])},null,4),s[10]||(s[10]=e("div",{class:"valid-feedback"},"Please fill the name",-1))]),e("a",{href:"javascript:void(0)",onClick:s[6]||(s[6]=n(i=>t.$router.push("/page/forgot_password"),["prevent"])),class:"pass-forgot"},"Forgot your password?"),e("div",E,[e("button",{href:"javascript:void(0)",onClick:s[7]||(s[7]=n((...i)=>l.login&&l.login(...i),["prevent"])),type:"submit"},s[11]||(s[11]=[e("span",null,"Log In",-1),e("i",{class:"fa fa-check"},null,-1)]))]),e("p",H,[e("span",null,m(("useRuntimeConfig"in t?t.useRuntimeConfig:p(g))().public.const.Orsigninwith),1)]),s[14]||(s[14]=_('<div class="row gx-md-3 gy-3"><div class="col-md-6"><a href="www.facebook.com"><div class="social-media fb-media"><img src="'+B+'" class="img-fluid" alt=""><h6>Facebook</h6></div></a></div><div class="col-md-6"><a href="www.gmail.com"><div class="social-media google-media"><img src="'+L+'" class="img-fluid" alt=""><h6>Google</h6></div></a></div></div>',1)),e("p",null,[s[13]||(s[13]=u(" Not a member? ")),d(w,{to:"/page/register",class:"theme-color"},{default:r(()=>s[12]||(s[12]=[u("Sign up now")])),_:1})])])])])],64)}const K=b(N,[["render",I]]);export{K as default};
