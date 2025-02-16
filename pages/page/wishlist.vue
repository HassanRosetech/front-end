<template>
  <Head>
    <Title>Wishlist</Title>
  </Head>
  <layout5 pageName="Wishlist" parent="Wishlist">
    <section class="wish-list-section section-b-space">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 table-responsive" v-if="wishlist.length != 0">
            <table class="table cart-table wishlist-table">
              <thead>
                <tr class="table-head">
                  <th scope="col">image</th>
                  <th scope="col">product name</th>
                  <th scope="col">price</th>
                  <th scope="col">availability</th>
                  <th scope="col">action</th>
                </tr>
              </thead>
              <tbody v-for="product in wishlist" :key="product.id">
                <tr>
                  <td>
                    <nuxt-link :to="'/product/product_left_sidebar/' + product.id">
                      <img :src="getImageUrl(product.images[0].src)" alt="" />
                    </nuxt-link>
                  </td>
                  <td>
                    <nuxt-link :to="'/product/product_left_sidebar/' + product.id" class="font-light">{{ product.name }}
                    </nuxt-link>
                    <div class="mobile-cart-content row">
                      <div class="col">
                        <p>In Stock</p>
                      </div>
                      <div class="col">
                        <p class="fw-bold">$48.23</p>
                      </div>
                      <div class="col">
                        <h2 class="td-color">
                          <a href="javascript:void(0)" class="icon">
                            <i class="fas fa-times"></i>
                          </a>
                        </h2>
                        <h2 class="td-color">
                          <nuxt-link to="/page/cart" class="icon">
                            <i class="fas fa-shopping-cart"></i>
                          </nuxt-link>
                        </h2>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-bold">
                      {{ selectedCurrencySymbol }}{{ product.price }}
                    </p>
                  </td>
                  <td>
                    <p v-if="product.inStock > 1">In Stock</p>
                    <p v-else>Out of Stock</p>
                  </td>
                  <td>
                    <a href="javascript:void(0)" class="icon" @click.prevent="removeFromWishlist(product)">
                      <i class="fas fa-times"></i>
                    </a>
                    <a href="javascript:void(0)" @click.prevent="addToCart(product)" class="icon">
                      <i class="fas fa-shopping-cart"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex flex-column align-items-center justify-content-center" v-else>
            <img :src="getImageUrl('wishlistEmpty.png')" class="img-fluid" />
            <animatedButton :buttonContent="useRuntimeConfig().public.const.ContinueShopping"
              buttonClasses="btn btn-solid-default btn-block mt-4" :headerLocation="'/shop/shop_canvas_filter'" />
          </div>
        </div>
      </div>
    </section>
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import animatedButton from "~/layout/elements/buttons/animatedButton.vue";

import { useCartStore } from "~~/store/cart";
import { useClickStore } from "~~/store/clickEvents";
import { useProductStore } from "~~/store/products";
import { useLayout } from "~~/store/layout";
export default {
  components: {
    layout5,
    animatedButton,
  },
  head() {
    return {
      title: "Wishlist",
    };
  },
  computed: {
    wishlist() {
      return useProductStore().wishlist
    },
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  methods: {
    addToCart(product) {
      var item = { product: product, quantity: 1 };
      useCartStore().addToCart(item)
      useClickStore().toggleSuccessfulModal({
        image: product.images[0].src,
        message: "Added To cart",
        link: useRuntimeConfig().public.const.cartPagePath,
      })
      useProductStore().removeFromWishlist(product)
    },
    removeFromWishlist(product) {
      useProductStore().removeFromWishlist(product)
      useClickStore().toggleSuccessfulModal({
        image: product.images[0].src,
        message: "Item removed from wishlist",
      })

    },
  },
};
</script>