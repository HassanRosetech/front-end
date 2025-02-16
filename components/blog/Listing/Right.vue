<template>
  <div class="col-xl-9 col-lg-7 order-lg-1 ratio_square">
    <div class="row g-4 g-xl-5">
      <div class="col-12" v-for="(blog, index) in blogsList" :key="index" :style="{
        display:
          index + 1 > cardsToShow * currentPage - cardsToShow &&
            index + 1 <= cardsToShow * currentPage
            ? 'block'
            : 'none',
      }">
        <div class="masonary-blog box-shadow">
          <a href="javascript:void(0)" @click.prevent="$router.push('/blog/blog_details')"
            class="bg-size sliderBackground" :style="{
              'background-image': `url(${getImageUrl(blog.imagePath)})`,
            }">
            <img :src="getImageUrl(blog.imagePath)" class="card-img-top bg-img image-fit d-none" alt="" />
          </a>
          <div class="card-body card-body-width">
            <h6 class="masonary-name">{{ blog.title }}</h6>
            <a href="javascript:void(0)" @click.prevent="$router.push('/blog/blog_details')">
              <h2 class="card-title">
                {{ blog.heading }}
              </h2>
            </a>
            <p class="font-light">
              {{ blog.content }}
            </p>
            <div class="blog-profile">
              <div class="image-profile">
                <img :src="
                  getImageUrl(`inner-page/review-image/${blog.profileImage}`)
                " class="img-fluid" alt="" />
              </div>

              <div class="image-name">
                <h3>
                  by {{ blog.name }} on <span>{{ blog.date }}</span>
                </h3>
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
  props: ["cardsToShow", "currentPage", "blogsList"],
};
</script>
