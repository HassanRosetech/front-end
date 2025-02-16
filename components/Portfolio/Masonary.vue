<template>
    <section id="portfolio" class="portfolio section-b-space">
        <vue-easy-lightbox :visible="visible" :index="ImageIndex" :imgs="lightBoxImages" @hide="handleHide">
        </vue-easy-lightbox>
        <div class="container">
            <div class="row gx-2" :class="rowClasses">
                <div class="col-12">
                    <div class="filters button filter-button-group">
                        <ul>
                            <li class="btn btn-submit" :class="{ active: isActive('all') }" data-filter="*">
                                <h4 @click="updateFilter('all')">All</h4>
                            </li>
                            <li class="btn btn-submit" :class="{ active: isActive('app') }" data-filter=" .app">
                                <h4 @click="updateFilter('app')">App</h4>
                            </li>
                            <li class="btn btn-submit" :class="{ active: isActive('card') }" data-filter=" .card">
                                <h4 @click="updateFilter('card')">Card</h4>
                            </li>
                            <li class="btn btn-submit" :class="{ active: isActive('web') }" data-filter=" .web">
                                <h4 @click="updateFilter('web')">Web</h4>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <masonry-wall :items="filteredImages" :gap="gap" :ssr-columns="4"
                :column-width="columnWidth ? columnWidth : 300" class="row filter-gallery mt-3 content grid"
                :class="masonaryParentClasses">
                <template #default="{ item }">
                    <div class="grid-item item w-100" :class="[item.filter, masonaryItemClasses]">
                        <div class="parent-container">
                            <a href="javascript:void(0)" @click="showImg(item.src)">
                                <img :src="getImageUrl(item.src)" class="images" :class="imageClasses" alt="" />
                                <div class="overlay-color">
                                    <div class="overlay-icon">
                                        <h3>{{ item.title }}asdasd</h3>
                                        <p class="font-light">
                                            {{ item.description }}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </template>
            </masonry-wall>
        </div>
    </section>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import { useInfoStore } from "~~/store/information";

export default {
    components: {
        layout5,
    },
    props: {
        rowClasses: { type: String },
        masonaryParentClasses: { type: String },
        masonaryItemClasses: { type: String },
        imageClasses: { type: String },
        columnWidth: { type: Number, default: 300 },
        gap: { type: Number, default: 20 },
    },
    data() {
        return {
            visible: false,
            galleryFilter: "all",
            lightBoxImages: [],
            ImageIndex: null,
        };
    },
    computed: {
        filteredImages: function () {
            if (this.galleryFilter === "all") {
                return this.images;
            } else {
                return this.images.filter((data) => data.filter === this.galleryFilter);
            }
        },
        images() {
            let allImages = useInfoStore().data.filter(
                (item) => item.type === "portfolio"
            )[0].children;
            allImages.forEach((item) =>
                this.lightBoxImages.push(getImageUrl(item.src))
            );
            return allImages;
        },
    },
    methods: {
        showImg(image) {
            let Index = this.lightBoxImages.findIndex(item => {
                return item.includes(image)
            })

            this.ImageIndex = Index
            this.visible = true
        },
        handleHide() {
            this.visible = false
        },
        isActive: function (menuItem) {
            return this.galleryFilter === menuItem;
        },
        updateFilter(filterName) {
            this.galleryFilter = filterName;
        },
    },
};
</script>
