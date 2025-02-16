import { constants } from "../static/const/index";
import globalMixin from '~/mixins/mixins'
import VueSlider from 'vue-slider-component'
import { VueImageZoomer } from 'vue-image-zoomer'
import VueThreeSixty from 'vue-360'
import Lightbox from 'vue-easy-lightbox'
import 'vue-image-zoomer/dist/style.css';
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.mixin(globalMixin)
    nuxtApp.provide('const',constants)
    nuxtApp.vueApp.component('VueSlider',VueSlider)
    nuxtApp.vueApp.component('VueImageZoomer',VueImageZoomer)
    nuxtApp.vueApp.component('VueThreeSixty',VueThreeSixty)
    nuxtApp.vueApp.use(Lightbox);
   
})