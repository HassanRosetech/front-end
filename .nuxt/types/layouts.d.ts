import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default"
<<<<<<< HEAD
declare module "../../../node_modules/nuxt/dist/pages/runtime/composables" {
=======
declare module "../../node_modules/nuxt/dist/pages/runtime/composables" {
>>>>>>> b9947588 (Languages Menu Modifications)
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}