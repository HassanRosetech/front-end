<template>
  <div class="col-xl-9 col-lg-7 ratio3_2">
    <div class="row g-4">
      <div class="col-xl-4 col-sm-6" v-for="(card, index) in cardsData" :key="index" :style="{
        display:
          index + 1 > cardsToShow * currentPage - 9 &&
            index + 1 <= cardsToShow * currentPage
            ? 'block'
            : 'none',
      }">
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
    <div class="col-12">
      <nav class="page-section">
        <ul class="pagination">
          <li class="page-item">
            <a href="javascript:void(0)" class="page-link" @click="changePage(currentPage - 1)">
              <i class="fas fa-chevron-left"></i>
            </a>
          </li>
          <li class="page-item" v-for="i in pages" :key="i" :class="i === currentPage ? 'active' : ''">
            <a class="page-link" href="javascript:void(0)" @click.prevent="changePage(i)">{{ i }}
            </a>
          </li>

          <li class="page-item">
            <a href="javascript:void(0)" class="page-link" @click="changePage(currentPage + 1)">
              <i class="fas fa-chevron-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { useBlogDataStore } from "~~/store/blogData";
export default {
  data() {
    return {
      pages: [],
      cardsToShow: 9,
      totalCards: 8,
      currentPage: 1,
      totalPages: 2,
    };
  },
  computed: {
    cardsData() {
      return useBlogDataStore().data.filter(
        (item) => item.type === "blogRightSidebar"
      )[0].blogs
    },
  },
  methods: {
    loadCards() {
      this.cardsToShow += 3;
    },
    changePage(toPage) {
      if (toPage > 0 && toPage <= this.totalPages) {
        this.currentPage = toPage;
        this.calculatePages();
      }
    },
    calculatePages() {
      this.pages = [];
      var startPage, endPage;
      if (this.currentPage == 1) {
        startPage = 1;
        endPage = 4;
      } else {
        startPage = this.currentPage - 1;
        endPage = this.currentPage + 2;
      }
      for (var i = startPage; i < endPage; i++) {
        if (i <= this.totalPages) {
          this.pages.push(i);
        }
      }
    },
  },
  created() {
    this.totalCards = this.cardsData.length;
    this.totalPages = Math.ceil(this.totalCards / this.cardsToShow);
    this.calculatePages();
  },
};
</script>
