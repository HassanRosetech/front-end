<template>
  <section class="masonary-blog-section section-b-space">
    <div class="container">
      <masonry-wall :items="blogs" :ssr-columns="1" :column-width="300" :gap="24">
        <template #default="{ item }">
          <div class="row g-4 filter-gallery grid">
            <div class="grid-item col-lg-3 col-md-4 col-sm-6 w-100">
              <div class="card masonary-blog">
                <a href="javascript:void(0)" @click.prevent="$router.push('/blog/blog_details')" v-if="!item.type">
                  <img :src="getImageUrl(item.image)" alt="" class="card-img-top" />
                </a>
                <div class="card-body" :class="item.class">
                  <img v-if="item.type === 'quote'" :src="getImageUrl(item.image)" class="quote-image" alt="" />
                  <a href="javascript:void(0)" @click.prevent="$router.push('/blog/blog_details')">
                    <h2 class="card-title" :class="[{ 'quote-head': item.type === 'quote' }]">
                      {{ item.title }}
                    </h2>
                  </a>
                  <p class="font-light" v-if="item.description">
                    {{ item.description }}
                  </p>
                  <div class="blog-profile" :class="[{ 'box-center': item.type === 'quote' }]">
                    <div class="image-profile">
                      <img :src="getImageUrl(item.profileImage)" class="img-fluid" alt="" />
                    </div>
                    <div class="image-name">
                      <h3>{{ item.author }}</h3>
                      <h6>{{ item.date }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </masonry-wall>
    </div>
  </section>
</template>


<script setup>
import { useBlogDataStore } from '~~/store/blogData';
var blogs = computed(() => {
  return useBlogDataStore().data.filter(
    (item) => item.type === "blogMasonary"
  )[0].blogs;
})
</script>

<style lang="scss" scoped></style>
