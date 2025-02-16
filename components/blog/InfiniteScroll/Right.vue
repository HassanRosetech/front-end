<template>
  <div class="col-xl-9 col-lg-7 order-lg-1 ratio3_2">
    <div class="row g-4 product-load-more">
      <div class="col-xl-4 col-6 col-grid-box" v-for="(card, index) in cardsData" :key="index"
        :style="{ display: index + 1 <= cardsToShow ? 'block' : 'none' }">
        <div class="card blog-categories">
          <a href="javascript:void(0)" @click.prevent="$router.push('/blog/blog_details')"
            class="blog-img sliderBackground bg-size" :style="{
              'background-image': `url(${getImageUrl(card.imagePath)})`,
            }">
            <img :src="getImageUrl(card.imagePath)" alt="" class="card-img-top bg-img d-none" />
          </a>
          <div class="card-body">
            <h5>{{ card.title }}</h5>
            <a href="javascript:void(0)" @click.prevent="$router.push('/blog/blog_details')">
              <h2 class="card-title">
                {{ card.heading }}
              </h2>
            </a>
            <div class="blog-profile">
              <div class="image-name">
                <h3>{{ card.name }}</h3>
                <h6>{{ card.date }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="load-more">
      <button class="loadMore btn btn-submit btn-full" @click.prevent="loadCards">
        <span v-if="cardsToShow < totalCards">load more</span>
        <span v-else>No More Products</span>
      </button>
    </div>
  </div>
</template>

<script>
import { useBlogDataStore } from "~~/store/blogData";

export default {
  data() {
    return {
      cardsToShow: 8,
      totalCards: 8,
    };
  },
  computed: {
    cardsData() {
      return useBlogDataStore().data.filter(
        (item) => item.type === "blogInfiniteScroll"
      )[0].blogs
    }
  },
  methods: {
    loadCards() {
      this.cardsToShow += 3;
    },
  },
  created() {
    this.totalCards = this.cardsData.length;
  },
};
</script>

<style lang="scss" scoped></style>
