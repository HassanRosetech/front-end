<template>
  <div class="product-box" :class="productBoxClasses">
    <div class="img-wrapper" :class="wrapperClasses">
      <a href="javascript:void(0)" @click.prevent="$router.push('/product/product_left_sidebar')">
        <img :src="getImageUrl(product.images[0].src)" class="img-fluid bg-img" alt="" />
      </a>
      <div class="label-block" v-if="product.new || product.discount">
        <span class="label label-black" v-if="product.new">{{
          useRuntimeConfig().public.const.NEW
        }}</span>
        <span class="label label-theme" v-if="product.discount">{{ product.discount }}% {{
          useRuntimeConfig().public.const.OFF
        }}</span>
      </div>
      <div class="cart-wrap">
        <ul>
          <li>
            <a href="javascript:void(0)" class="addtocart-btn" data-bs-toggle="modal" data-bs-target="#addtocart">
              <vue-feather type="shopping-bag"></vue-feather>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#quick-view">
              <vue-feather type="eye"></vue-feather>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" @click.prevent="$router.push('/page/compare')">
              <vue-feather type="refresh-cw"></vue-feather>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" @click.prevent="$router.push('/page/wishlist')" class="wishlist">
              <vue-feather type="heart"></vue-feather>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="product-details text-center">
      <h3 class="theme-color">
        ${{ product.price }}
        <span class="font-light ml-1">${{ product.mrp }}</span>
      </h3>
      <a href="javascript:void(0)" @click.prevent="$router.push('/product/product_left_sidebar')" class="font-default">
        <h5>{{ product.name }}</h5>
      </a>
      <ul class="rating">
        <li v-for="(stars, index) in product.ratingStars" :key="index">
          <i class="fas fa-star theme-color"></i>
        </li>
        <li v-for="(noStars, index) in 5 - product.ratingStars" :key="'A' + index">
          <i class="fas fa-star"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VueFeather from "vue-feather";

export default {
  components: {
    VueFeather,
  },
  props: ["product", "productBoxClasses", "wrapperClasses"],
  data() {
    return {
      isLoaded: false,
    };
  },
  mounted() {
    window.addEventListener("load", () => {
      const bgImg = document.querySelectorAll(".bg-img");
      for (var i = 0; i < bgImg.length; i++) {
        let bgImgEl = bgImg[i];
        
        if (bgImgEl.classList.contains("bg-top")) {
          bgImgEl.parentNode.classList.add("b-top");
        } else if (bgImgEl.classList.contains("bg-bottom")) {
          bgImgEl.parentNode.classList.add("b-buttom");
        } else if (bgImgEl.classList.contains("bg-center")) {
          bgImgEl.parentNode.classList.add("b-center");
        } else if (bgImgEl.classList.contains("bg-left")) {
          bgImgEl.parentNode.classList.add("b-left");
        } else if (bgImgEl.classList.contains("bg-right")) {
          bgImgEl.parentNode.classList.add("b-right");
        }

       
        if (bgImgEl.classList.contains("blur-up")) {
          bgImgEl.parentNode.classList.add("blur-up", "lazyload");
        }

       
        if (bgImgEl.classList.contains("bg_size_content")) {
          bgImgEl.parentNode.classList.add("b_size_content");
        }

    
        bgImgEl.parentNode.classList.add("bg-size");
        const bgSrc = bgImgEl.src;
        bgImgEl.style.display = "none";
        bgImgEl.parentNode.setAttribute(
          "style",
          `
        background-image: url(${bgSrc});
        background-size:cover;
        background-position: center;
        background-repeat: no-repeat;
        display: block;
        `
        );
      }
    });

    
  },
};
</script>
