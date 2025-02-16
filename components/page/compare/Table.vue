<template>
  <table class="table table-striped-1">
    <tbody>
      <tr class="table-product-details">
        <td></td>
        <td v-for="(product, index) in productsToCompare" :key="index">
          <div class="product-box">
            <div class="product-image">
              <a class="w-100" href="javascript:void(0)" @click.prevent="
                $router.push('/product/product_left_sidebar/' + product.id)
              ">
                <img :src="getImageUrl(product.images[0].src)" class="img-fluid bg-img" alt="" />
              </a>
            </div>
            <div class="product-details">
              <div>
                <a href="javascript:void(0)" @click.prevent="
                $router.push('/product/product_left_sidebar/' + product.id)
              ">
                  <h6 class="fw-bold">
                    {{ product.name }}
                  </h6>
                </a>
              </div>
              <div class="price-details mt-2">
                <h6 class="font-green">
                  {{ selectedCurrencySymbol }}{{ product.price }}
                  <span class="font-light mx-2">{{ selectedCurrencySymbol }}{{ product.mrp }}</span>
                  <span class="theme-color" v-if="product.discount != 0">{{ product.discount }}% off</span>
                </h6>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr class="table-cart-button">
        <td></td>
        <td v-for="(product, index) in productsToCompare" :key="'a' + index">
          <a href="javascript:void(0)" @click="addToCart(product)" to="/product/product_left_sidebar"
            class="btn btn-solid-blue">+ {{ useRuntimeConfig().public.const.Addtocart }}
          </a>
        </td>
      </tr>
      <tr>
        <td>{{ useRuntimeConfig().public.const.CustomerRating }}</td>
        <td v-for="(product, index) in productsToCompare" :key="'A' + index">
          <div class="d-flex align-items-center">
            <ul class="rating my-0">
              <li v-for="(stars, index3) in product.ratingStars" :key="index3">
                <i class="fas fa-star theme-color"></i>
              </li>
              <li>
                <i class="fas fa-star" v-for="(stars, index4) in 5 - product.ratingStars" :key="index4"></i>
              </li>
            </ul>
            <span class="font-light ms-2">({{ product.totalReviews }} reviews)</span>
          </div>
        </td>
      </tr>
      <tr>
        <td>BRAND</td>
        <td v-for="(product, index) in productsToCompare" :key="'C ' + index">
          {{ product.brand }}
        </td>
      </tr>
      <tr>
        <td>{{ useRuntimeConfig().public.const.GenericName }}</td>
        <td v-for="(product, index) in productsToCompare" :key="'D' + index">
          {{ product.category }}
        </td>
      </tr>
      <tr>
        <td>{{ useRuntimeConfig().public.const.Department }}</td>
        <td v-for="(product, index) in productsToCompare" :key="'E' + index">
          {{ product.department }}
        </td>
      </tr>
      <tr>
        <td>{{ useRuntimeConfig().public.const.Manufacturer }}</td>
        <td v-for="(product, index) in productsToCompare" :key="'F' + index">
          {{ product.manufacturer }}
        </td>
      </tr>
      <tr>
        <td>color</td>
        <td v-for="(product, index) in productsToCompare" :key="'G' + index">
          <span v-for="(color, index5) in product.colors" :key="index5">{{ color }}, &nbsp;
          </span>
        </td>
      </tr>
      <tr>
        <td>{{ useRuntimeConfig().public.const.DateFirstAvailable }}</td>
        <td v-for="(product, index) in productsToCompare" :key="'H' + index">
          {{ product.first_available_date }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useCartStore } from '~~/store/cart';
import { useClickStore } from '~~/store/clickEvents';
import { useCompareStore } from '~~/store/compare';
import { useLayout } from '~~/store/layout';

export default {
  props: ["productsToCompare"],
  computed: {
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  methods: {
    addToCart(product) {
      var item = { product, quantity: 1 };
      useCartStore().addToCart(item);

      useCompareStore().removeFromCompare(product);
      useClickStore().toggleSuccessfulModal({
        image: product.images[0].src,
        message: "Added to Cart",
        link: useRuntimeConfig().public.const.cartPagePath,
      });
    },
  },
};
</script>
