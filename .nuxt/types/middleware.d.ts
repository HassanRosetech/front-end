import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = never
<<<<<<< HEAD
declare module "../../../node_modules/nuxt/dist/pages/runtime/composables" {
=======
declare module "../../node_modules/nuxt/dist/pages/runtime/composables" {
>>>>>>> b9947588 (Languages Menu Modifications)
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}
declare module 'nitropack' {
  interface NitroRouteConfig {
    appMiddleware?: MiddlewareKey | MiddlewareKey[] | Record<MiddlewareKey, boolean>
  }
}