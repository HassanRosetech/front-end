import{g as h}from"./BHCayY3x.js";function _({swiper:e,extendParams:N,on:r,emit:o,params:i}){e.autoplay={running:!1,paused:!1,timeLeft:0},N({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let s,E,L=i&&i.autoplay?i.autoplay.delay:3e3,p=i&&i.autoplay?i.autoplay.delay:3e3,n,y=new Date().getTime,b,g,f,S,D,l;function O(t){!e||e.destroyed||!e.wrapperEl||t.target===e.wrapperEl&&(e.wrapperEl.removeEventListener("transitionend",O),d())}const A=()=>{if(e.destroyed||!e.autoplay.running)return;e.autoplay.paused?b=!0:b&&(p=n,b=!1);const t=e.autoplay.paused?n:y+p-new Date().getTime();e.autoplay.timeLeft=t,o("autoplayTimeLeft",t,t/L),E=requestAnimationFrame(()=>{A()})},q=()=>{let t;return e.virtual&&e.params.virtual.enabled?t=e.slides.filter(a=>a.classList.contains("swiper-slide-active"))[0]:t=e.slides[e.activeIndex],t?parseInt(t.getAttribute("data-swiper-autoplay"),10):void 0},v=t=>{if(e.destroyed||!e.autoplay.running)return;cancelAnimationFrame(E),A();let u=typeof t>"u"?e.params.autoplay.delay:t;L=e.params.autoplay.delay,p=e.params.autoplay.delay;const a=q();!Number.isNaN(a)&&a>0&&typeof t>"u"&&(u=a,L=a,p=a),n=u;const m=e.params.speed,C=()=>{!e||e.destroyed||(e.params.autoplay.reverseDirection?!e.isBeginning||e.params.loop||e.params.rewind?(e.slidePrev(m,!0,!0),o("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(e.slides.length-1,m,!0,!0),o("autoplay")):!e.isEnd||e.params.loop||e.params.rewind?(e.slideNext(m,!0,!0),o("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(0,m,!0,!0),o("autoplay")),e.params.cssMode&&(y=new Date().getTime(),requestAnimationFrame(()=>{v()})))};return u>0?(clearTimeout(s),s=setTimeout(()=>{C()},u)):requestAnimationFrame(()=>{C()}),u},I=()=>{e.autoplay.running=!0,v(),o("autoplayStart")},T=()=>{e.autoplay.running=!1,clearTimeout(s),cancelAnimationFrame(E),o("autoplayStop")},c=(t,u)=>{if(e.destroyed||!e.autoplay.running)return;clearTimeout(s),t||(l=!0);const a=()=>{o("autoplayPause"),e.params.autoplay.waitForTransition?e.wrapperEl.addEventListener("transitionend",O):d()};if(e.autoplay.paused=!0,u){D&&(n=e.params.autoplay.delay),D=!1,a();return}n=(n||e.params.autoplay.delay)-(new Date().getTime()-y),!(e.isEnd&&n<0&&!e.params.loop)&&(n<0&&(n=0),a())},d=()=>{e.isEnd&&n<0&&!e.params.loop||e.destroyed||!e.autoplay.running||(y=new Date().getTime(),l?(l=!1,v(n)):v(),e.autoplay.paused=!1,o("autoplayResume"))},M=()=>{if(e.destroyed||!e.autoplay.running)return;const t=h();t.visibilityState==="hidden"&&(l=!0,c(!0)),t.visibilityState==="visible"&&d()},F=t=>{t.pointerType==="mouse"&&(l=!0,c(!0))},P=t=>{t.pointerType==="mouse"&&e.autoplay.paused&&d()},x=()=>{e.params.autoplay.pauseOnMouseEnter&&(e.el.addEventListener("pointerenter",F),e.el.addEventListener("pointerleave",P))},B=()=>{e.el.removeEventListener("pointerenter",F),e.el.removeEventListener("pointerleave",P)},j=()=>{h().addEventListener("visibilitychange",M)},R=()=>{h().removeEventListener("visibilitychange",M)};r("init",()=>{e.params.autoplay.enabled&&(x(),j(),y=new Date().getTime(),I())}),r("destroy",()=>{B(),R(),e.autoplay.running&&T()}),r("beforeTransitionStart",(t,u,a)=>{e.destroyed||!e.autoplay.running||(a||!e.params.autoplay.disableOnInteraction?c(!0,!0):T())}),r("sliderFirstMove",()=>{if(!(e.destroyed||!e.autoplay.running)){if(e.params.autoplay.disableOnInteraction){T();return}g=!0,f=!1,l=!1,S=setTimeout(()=>{l=!0,f=!0,c(!0)},200)}}),r("touchEnd",()=>{if(!(e.destroyed||!e.autoplay.running||!g)){if(clearTimeout(S),clearTimeout(s),e.params.autoplay.disableOnInteraction){f=!1,g=!1;return}f&&e.params.cssMode&&d(),f=!1,g=!1}}),r("slideChange",()=>{e.destroyed||!e.autoplay.running||(D=!0)}),Object.assign(e.autoplay,{start:I,stop:T,pause:c,resume:d})}export{_ as A};
