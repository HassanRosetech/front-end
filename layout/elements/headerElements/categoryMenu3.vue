<template>
  <div class="category-menu">
    <button type="button" class="btn btn-solid-default toggle-category d-sm-block d-none">
      {{ useRuntimeConfig().public.const.Allcategories }}
      <i class="fas fa-chevron-down d-xl-inline-block d-none"></i>
    </button>
    <div class="category-dropdown">
      <div class="close-btn d-xl-none">
        {{ useRuntimeConfig().public.const.CategoryList }}
        <span class="back-category">
          <i class="fa fa-angle-left"></i>
        </span>
      </div>
      <ul>
        <li v-for="(items, index) in categoryList" :key="index" :class="items.children ? 'submenu' : ''">
          <a href="javascript:void(0)">{{ items.title }}</a>
          <ul class="category-mega-menu" v-if="items.children">
            <li>
              <div class="row">
                <div class="col-xl-3" v-for="(item, index) in items.children" :key="index">
                  <div class="category-childmenu">
                    <div class="title-category">
                      <h6>{{ item.heading }}</h6>
                    </div>
                    <ul>
                      <li v-for="(link, index) in item.items" :key="index">
                        <a href="shop-left-sidebar.html">{{ link.title }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-xl-3" v-if="items.bannerImage">
                  <div class="category-banner">
                    <img :src="getImageUrl(items.bannerImage)" class="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      categoryList: (state) => state.categoryMenu.data,
    }),
  },
};
</script>
