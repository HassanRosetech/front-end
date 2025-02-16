<template>
  <div class="tab-pane fade" :class="tab.active ? 'show active' : ''" :id="tab.name" role="tabpanel">
    <div class="offer-wrap product-style-1">
      <div class="row g-xl-4 g-3">
        <div class="col-lg-4" v-for="(section, index) in tab.children" :key="index" :class="getSectionClasses(section)">
          <div class="product-banner product-banner-circle" v-if="section.childtype === 'middlebanner'">
            <div class="product-box" :class="productBoxClasses">
              <div class="img-wrapper">
                <div class="label-block">
                  <span class="label label-black">{{ section.lefttag }}</span>
                  <span class="label label-theme">{{ section.righttag }}</span>
                </div>
                <a href="javascript:void(0)" @click.prevent="$router.push('/product/product_left_sidebar')">
                  <img :src="getImageUrl(section.image)" class="img-fluid" alt="" />
                </a>
                <div class="offer-end offer-end-demo4">
                  <h3>{{ section.heading }}</h3>
                  <h6>{{ section.subheading }}</h6>
                </div>
              </div>
              <div class="product-details text-center">
                <h3 class="theme-color">
                  {{
                    section.price
                  }}<span class="font-light ms-2">{{ section.mrp }}</span>
                </h3>
                <a href="javascript:void(0)" class="font-default" tabindex="-1">
                  <h5 class="main-title">
                    {{ section.title }}
                  </h5>
                </a>
                <ul class="rating rating-2">
                  <li>
                    <i class="fas fa-star theme-color" v-for="(stars, index5) in section.ratingstars"
                      :key="'a' + index5"></i>
                  </li>
                  <li>
                    <i class="fas fa-star" v-for="(stars, index6) in 5 - section.ratingstars" :key="'b' + index6"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="product-list" v-else>
            <div class="product-box" :class="productBoxClasses" v-for="(banner, index2) in section.banners"
              :key="'c' + index2">
              <div class="img-wrapper">
                <a href="javascript:void(0)" @click.prevent="$router.push('/product/product_left_sidebar')"
                  class="text-center">
                  <img :src="getImageUrl(banner.image)" class="img-fluid" alt="" />
                </a>
                <div class="circle-shape"></div>
              </div>
              <div class="product-details">
                <h3 class="theme-color">
                  {{
                    banner.price
                  }}<span class="font-light ms-2">{{ banner.mrp }}</span>
                </h3>
                <a href="javascript:void(0)" @click.prevent="$router.push('/product/product_left_sidebar')"
                  class="font-default">
                  <h5>{{ banner.title }}</h5>
                </a>
                <ul class="rating">
                  <li v-for="(stars, index3) in banner.ratingstars" :key="'d' + index3">
                    <i class="fas fa-star theme-color"></i>
                  </li>

                  <li v-for="(stars, index4) in 5 - banner.ratingstars" :key="'e' + index4">
                    <i class="fas fa-star"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tab", "productBoxClasses"],
  methods: {
    getSectionClasses(section) {
      if (section.childtype === "middlebanner") return "order-lg-0 order-1";
      else return "col-md-6";
    },
    getImageUrl(path) {
      return ("/images/" + path)
    }
  },
};
</script>
