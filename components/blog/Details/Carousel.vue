<template>
<section class="section-b-space block-shadow-space ratio3_2">
    <div class="container">
        <div class="slide-4 product-wrapper">
            <swiper :modules="modules" v-bind="settings" class="swiper-wrapper">
                <swiper-slide class="swiper-slide" v-for="(blog, index) in relatedBlogs" :key="index">
                    <div class="card blog-categories">
                        <a href="javascript:void(0)" @click.prevent="$router.push('/blog/blog_details')" class="blog-img sliderBackground bg-size" :style="{
                  'background-image': `url(${getImageUrl(blog.image)})`,
                }">
                            <img :src="getImageUrl(blog.image)" alt="" class="card-img-top bg-img d-none" />
                        </a>
                        <div class="card-body">
                            <a href="javascript:void(0)" @click.prevent="$router.push('/blog/blog_details')">
                                <h2 class="card-title">{{ blog.heading }}</h2>
                            </a>
                            <div class="blog-profile">
                                <div class="image-name">
                                    <h3>{{ blog.author }}</h3>
                                    <h6>{{ blog.date }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</section>
</template>

<script>
import {
    Navigation,
    Pagination,
    Scrollbar,
} from 'swiper';
import {
    useBlogDataStore
} from "~~/store/blogData";
import {
    relatedBlogCarousel
} from "@/static/data/SliderSettingsData.js";
export default {
    data() {
        return {
            image: "/_nuxt/assets/images/inner-page/product/9.jpg",
            settings: relatedBlogCarousel,
            modules: [Navigation, Pagination, Scrollbar, ],
            settings: {
                loop: true,
                pagination: {
                    clickable: true,
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 36,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 36,
                    },
                    767: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    }
                }
            },
        };
    },
    computed: {
        relatedBlogs() {
            return useBlogDataStore().data.filter(
                (item) => item.type === "blogDetails"
            )[0].carouselItems
        },
    },
};
</script>
