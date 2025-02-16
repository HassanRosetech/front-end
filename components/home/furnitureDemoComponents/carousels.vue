<template>
  <section class="product-slider">
    <div>
      <div class="container">
        <div class="row g-3">
          <div class="col-lg-4" v-for="(items, index) in cards" :key="index">
            <div class="most-popular-box">
              <div class="title-3 pb-4 title-border">
                <h2>{{ items.heading }}</h2>
                <h5 class="theme-color">{{ items.subHeading }}</h5>
              </div>
              <div class="product-slider round-arrow">
                <div :id="`arrows${index}`"></div>
                <swiper  :loop="true" :navigation="true" :modules="modules" :slidesPerView="1" :spaceBetween="20"
                  class="swiper-wrapper">
                  <swiper-slide class="swiper-slide" v-for="(columns, index2) in Math.ceil(
                    items.children.length / 4
                  )" :key="index2">

                    <div class="row g-3">
                      <div class="col-lg-12 col-md-6 col-12" v-for="(card, index3) in getSlicedProducts(
                        (index2 + 1) * 4 - 4,
                        (index2 + 1) * 4,
                        items.children
                      )" :key="index3">
                        <div class="product-image">
                          <a href="javascript:void(0)" @click.prevent="
                            $router.push('/product/product_left_sidebar')
                          ">
                            <img :src="getImageUrl(card.image)" :alt="card.image" />
                          </a>
                          <div class="product-details">
                          <a href="javascript:void(0)">
                            <h6 class="font-light">{{ card.description }}</h6>
                            <h3>{{ card.type }}</h3>
                            <h4 class="font-light mt-1">
                                <del>{{ selectedCurrencySymbol }}{{ card.mrp }}</del>
                                <span class="theme-color">{{
                                  selectedCurrencySymbol
                                }}{{ card.price }}</span>
                              </h4>
                              <div class="cart-wrap">
                                <ul>
                                  <li data-bs-toggle="tooltip" data-bs-placement="top" title="Buy">
                                    <a href="javascript:void(0)" class="addtocart-btn" data-bs-toggle="modal"
                                      data-bs-target="#addtocart" @click="
                                        toggleCartModal(
                                          products.filter(
                                            (item) => item.id === card.id
                                          )[0]
                                        )
                                      ">
                                      <vue-feather type="shopping-bag"></vue-feather>
                                    </a>
                                  </li>
                                  <li data-bs-toggle="tooltip" data-bs-placement="top" title="Quick View">
                                    <a href="javascript:void(0)" data-bs-toggle="modal"
                                      @click="toggleQuickViewModal(card.id)" data-bs-target="#quick-view">
                                      <vue-feather type="eye"></vue-feather>
                                    </a>
                                  </li>
                                  <li data-bs-toggle="tooltip" data-bs-placement="top" title="Compare">
                                    <a href="javascript:void(0)" @click.prevent="addTocompare(card.id)">
                                      <vue-feather type="refresh-cw"></vue-feather>
                                    </a>
                                  </li>
                                  <li data-bs-toggle="tooltip" data-bs-placement="top" title="Wishlist">
                                    <a href="javascript:void(0)" @click.prevent="
                                      addToWishlist(
                                        products.filter(
                                          (item) => item.id === card.id
                                        )[0]
                                      )
                                    " class="wishlist">
                                      <vue-feather type="heart"></vue-feather>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import "swiper/css/navigation";
import { Navigation } from "swiper";
import VueFeather from "vue-feather";
import { mapState } from "pinia";
import { useProductStore } from "~~/store/products";
import { useLayout } from "~~/store/layout";
import { useCartStore } from "~~/store/cart";
import { useClickStore } from "~~/store/clickEvents";
import { useCompareStore } from '~~/store/compare';
import { usepopularCardsStore } from "~~/store/popularCards";
export default {
  components: {
    VueFeather,

  },
  data() {
    return {
      swiper: '',
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: "10px",
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        responsive: [
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(usepopularCardsStore, {
      cards: 'data',
    }),
    ...mapState(useProductStore, {
      products: 'data',

    }),
    selectedCurrencySymbol() {
      return useLayout().selectedCurrencySymbol
    },
  },
  methods: {
    getSlicedProducts(start, end, items) {
      var slicedArray = items.slice(start, end);
      return slicedArray;
    },
    handleSwipe() {
      this.swiper.slideTo(3)
    },

    toggleCartModal(product) {
      var item = { product: product, quantity: 1 };
      useCartStore().addToCart(item)
      useClickStore().changeProductId(product.id)

    },
    toggleQuickViewModal(productId) {
      useClickStore().changeProductId(productId)
    },
    addTocompare(productId) {
      let payload = {
        image: this.products.filter((item) => item.id === productId)[0]
          .images[0].src,
        message: "Added To compare",
        link: useRuntimeConfig().public.const.comparePagePath,
      };
      useCompareStore().addToCompare(productId)
      useClickStore().toggleSuccessfulModal(payload)
    },
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
};
</script>
