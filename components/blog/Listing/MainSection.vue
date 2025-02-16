<template>
  <div>
    <section class="left-sidebar-section masonary-blog-section">
      <div class="container">
        <div class="row g-4">
          <BlogListingRight :cardsToShow="cardsToShow" :currentPage="currentPage" :blogsList="blogsList" />
          <BlogCommonLeftSection />
        </div>
      </div>
    </section>
    <section class="section-b-space">
      <div class="container">
        <div class="row">
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
      </div>
    </section>
  </div>
</template>

<script>
import { useBlogDataStore } from '~~/store/blogData';

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

    blogsList() {
      return useBlogDataStore().data.filter((item) => item.type === "blogListing")[0].blogs
    },
  },
  methods: {
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
    this.totalCards = this.blogsList.length;
    this.totalPages = Math.ceil(this.totalCards / 9);
    this.calculatePages();
  },
};
</script>