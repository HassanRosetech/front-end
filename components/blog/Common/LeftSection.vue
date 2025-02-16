<template>
  <div class="col-xl-3 col-lg-4">
    <div class="left-side">
      <!-- Search Bar Start -->
      <div class="search-section">
        <div class="input-group search-bar">
          <input type="search" class="form-control search-input" placeholder="Search" />
          <button class="input-group-text search-button" id="basic-addon3">
            <i class="fas fa-search text-color"></i>
          </button>
        </div>
      </div>
      <!-- Search Bar End -->
      <!-- Popular Post Start -->
      <div class="popular-post mt-4">
        <div class="popular-title">
          <h3>{{ useRuntimeConfig().public.const.PopularPosts }}</h3>
        </div>

        <div class="popular-image" v-for="(post, index) in blogData.popularPosts" :key="index">
          <div class="popular-number">
            <h4 class="theme-color">{{ post.number }}</h4>
          </div>
          <div class="popular-contain">
            <h3>{{ post.heading }}</h3>
            <p class="font-light mb-1">
              <span>{{ post.subHeading1 }}</span> in
              <span>{{ post.subHeading2 }}</span>
            </p>
            <div class="review-box">
              <span class="font-light clock-time">
                <vue-feather type="clock"></vue-feather> {{ post.time }}m ago
              </span>
              <span class="font-light eye-icon">
                <vue-feather type="eye"></vue-feather>
                {{ post.activity }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Popular Post End -->
      <!-- Category section Start -->
      <div class="category-section popular-post mt-4">
        <div class="popular-title">
          <h3>{{ useRuntimeConfig().public.const.Category }}</h3>
        </div>
        <ul>
          <li class="category-box" v-for="(category, index) in blogData.categories" :key="index">
            <a href="javascript:void(0)" @click.prevent="$router.push('/blog/blog_left_sidebar')">
              <div class="category-product">
                <div class="cate-shape">
                  <i :class="category.iconClasses"></i>
                </div>

                <div class="cate-contain">
                  <h5 class="text-color">{{ category.title }}</h5>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <!-- Category section End -->
    </div>
  </div>
</template>

<script>
import VueFeather from "vue-feather";
import { useBlogDataStore } from "~~/store/blogData";
export default {
  components: { VueFeather },
  computed: {
    blogData() {
      return useBlogDataStore().data[0]
    },
  },
};
</script>

<style lang="scss" scoped></style>
