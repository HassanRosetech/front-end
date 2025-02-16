import bootstrap from '@/node_modules/bootstrap/dist/js/bootstrap.bundle'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('bootstrap', bootstrap)
   
})