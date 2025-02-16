<template>
  <section id="portfolio" class="portfolio section-b-space">
    <vue-easy-lightbox :visible="visible" :index="ImageIndex" :imgs="lightBoxImages" @hide="handleHide">
    </vue-easy-lightbox>
    <div class="container">
      <div class="row gx-2">
        <div class="col-12">
          <div class="filters button filter-button-group">
            <ul>
              <li class="btn btn-submit" :class="{ active: isActive('all') }" data-filter="*"
                @click="updateFilter('all')">
                <h4>All</h4>
              </li>
              <li class="btn btn-submit" :class="{ active: isActive('app') }" data-filter=".app"
                @click="updateFilter('app')">
                <h4>App</h4>
              </li>
              <li class="btn btn-submit" :class="{ active: isActive('card') }" data-filter=".card"
                @click="updateFilter('card')">
                <h4>Card</h4>
              </li>
              <li class="btn btn-submit" :class="{ active: isActive('web') }" data-filter=".web"
                @click="updateFilter('web')">
                <h4>Web</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <masonry-wall :items="filteredImages" :column-width="columnWidth" :ssr-columns="2" :gap="10"
        :class="[parentDivClasses]">
        <template #default="{ item }">
          <div class="row mt-3 filter-gallery content grid">
            <div class="grid-item col-sm-6 w-100" :class="[item.filter, childDivClasses]">
              <div class="parent-container parent-container-size">
                <a @click="showImg(item.src)" class="back sliderBackground bg-size"
                  :style="{ backgroundImage: `url(${getImageUrl(item.src)})` }">
                  <img :src="getImageUrl(item.src)" class="img-fluid bg-img images d-none" alt="" />
                  <div class="overlay-color">
                    <div class="overlay-icon">
                      <h3>{{ item.title }}</h3>
                      <p class="font-light">
                        {{ item.description }}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
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
  props: {
    parentDivClasses: {
      type: String
    },
    childDivClasses: {
      type: String
    },
    columnWidth: {
      type: Number,
      default: 300
    }
  },
  components: {
    layout5,
  },
  data() {
    return {
      visible: false,
      galleryFilter: "all",
      lightBoxImages: [],
      ImageIndex: 3,
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
