<template>
  <Head>
    <Title>Review</Title>
  </Head>
  <layout5 pageName="Review" parent="Review">
    <section class="review-section section-b-space">
      <div class="container">
        <div class="row g-3 grid">
      <masonry-wall  :items="banners" :gap="15" :ssr-columns="3" >
        <template #default="{ item }">
            <div  class="grid-item col-lg-4 col-sm-6 w-100">
              <div class="review-box">
                <div class="review-name">
                  <p>
                    {{ item.review }}
                  </p>

                  <p v-if="item.review2">
                    {{ item.review2 }}
                  </p>
                </div>
                <div class="review-image">
                  <div class="review-profile">
                    <img :src="getImageUrl(item.image)" class="img-fluid" alt="" />
                  </div>
                  <i class="fas fa-quote-right"></i>
                  <div class="image-name">
                    <h3>{{ useRuntimeConfig().public.const.Johnwick }}</h3>
                    <ul class="rating d-flex">
                      <li>
                        <i class="fas fa-star theme-color" v-for="(stars, index) in item.ratingStars"
                          :key="'a' + index"></i>
                      </li>
                      <li>
                        <i class="fas fa-star" v-for="(stars, index) in 5 - item.ratingStars" :key="'a' + index"></i>
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>
        </template>
      </masonry-wall>
    </div>
      </div>
    </section>
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import { useBannerStore } from "~~/store/banners";
export default {
  components: {
    layout5,
  },
  head() {
    return {
      title: "Review",
    };
  },
  computed: {
    banners() {
      return useBannerStore().data.filter(
        (item) => item.type === "reviews"
      )[0].children
    },
  },
};
</script>
