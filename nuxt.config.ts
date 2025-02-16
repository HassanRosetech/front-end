import { constants } from "./public/const/index";
var boostrapCss = "/css/bootstrap.min.css";

export default defineNuxtConfig({
  css: ["@/assets/scss/app.scss"],
  ssr:false,
<<<<<<< HEAD
=======

>>>>>>> b9947588 (Languages Menu Modifications)
  app: {
    head: {
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          hid: "description",
          name: "description",
          content:
            "Buy VOXO - eCommerce VueJs Nuxt + Admin + Email  + Invoice Template by PixelStrap on ThemeForest.  VOXO - Multi-Purpose Responsive Ecommerce VueJs Nuxt Theme VOXO Ecommerce Theme with Multipurpose demos. ",
        },
        {
          name: "format-detection",
          content: "telephone=no",
        },
      ],
      script: [
        {
          src: "https://checkout.stripe.com/checkout.js",
        },
        {src: 'https://www.paypal.com/sdk/js?client-id=test&currency=USD'},
        {
          src: "https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/3.0.3/js-cloudimage-360-view.min.js",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.png",
        },

        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap",
        },

        {
          rel: "stylesheet",
          id: "bootstrap-link",
          href: boostrapCss,
        },
      ],
    },
  },
<<<<<<< HEAD
  alias: {
   // pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
    },
  modules: [[
    "@pinia/nuxt",
    {
      autoImports: ["defineStore", "acceptHMRUpdate"],
    },
  ], "@pinia/nuxt"],
  plugins: [
    { src: "~/plugins/plugins.js", mode: "client" } ],
=======

  alias: {
   // pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
    },

  modules: [    
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],

  plugins: [
    { src: "~/plugins/plugins.js", mode: "client" } ],

>>>>>>> b9947588 (Languages Menu Modifications)
  runtimeConfig: {
    public: {
      const: constants,
    },
  },
<<<<<<< HEAD
=======

  compatibilityDate: "2025-02-16",
>>>>>>> b9947588 (Languages Menu Modifications)
});