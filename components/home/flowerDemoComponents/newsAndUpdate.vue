<template>
  <section class="section-b-space">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="title-3 text-center">
            <h2>{{ useRuntimeConfig().public.const.OurUpdate }}</h2>
            <h5>{{ useRuntimeConfig().public.const.OurBlog }}</h5>
          </div>
        </div>
        <div class="slide-3">
          <swiper :slidesPerView="3" :spaceBetween="20" class="swiper-wrapper">
            <swiper-slide class="swiper-slide product-style-4 ratio2_3" v-for="(banner, index) in banners" :key="index">
            
              <div class="blog-header">
                <div class="blog-image sliderBackground bg-size" :style="{
                  'background-image': `url(${getImageUrl(banner.image)})`,
                }">
                  <img :src="getImageUrl(banner.image)" class="img-fluid bg-img d-none" alt="" />
                  <div class="blog-date">
                    <div class="date-hover">
                      <div>
                        <h2>{{ banner.date }}</h2>
                        <h3>{{ banner.month }}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blog-footer">
                <h2 class="theme-color">{{ banner.title }}</h2>
                <h5 class="theme-color">{{ banner.discount }}</h5>
                <h4>{{ banner.fresh }}</h4>
                <h4 class="brand-name">{{ banner.pricetitle }}</h4>
                <button href="javascript:void(0)" @click.prevent="$router.push('/blog/blog_details')" type="button"
                  class="btn default-theme">
                  {{ banner.btn }} <i class="fas fa-chevron-right ms-2"></i>
                </button>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["banners"],
};
</script>
