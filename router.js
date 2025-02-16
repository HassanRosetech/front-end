import { createRouter } from '@nuxtjs/router'
export function createMyRouter() {
    return createRouter({
      router: {
        trailingSlash: 'always',
        extendRoutes(routes, resolve) {
          routes.forEach(route => {
            route.path = route.path.replace(/\/?$/, '/voxo')
          })
        },
      },
    })
  }
  export default createMyRouter()
