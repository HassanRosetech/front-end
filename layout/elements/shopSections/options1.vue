<template>
  <div class="col-12">
    <div class="filter-options">
      <div class="select-options">
        <div class="page-view-filter">
          <div class="dropdown select-featured">
            <select class="btn dropdown-toggle" @change="changeProductsPerPage($event)">
              <option value="" selected disabled>Products per Page</option>
              <option class="dropdown-item" v-for="(page, index) in productsPerPage" :value="page" :key="index">
                {{ page }} products per page
              </option>
            </select>
          </div>
        </div>
        <div class="dropdown select-featured">
          <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
            aria-expanded="false">
            Select Sorting
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="(criteria, index) in sortingCriterias" :key="'d' + index"
              @click.prevent="selectedSortingCriteria = criteria.criteria">
              <a class="dropdown-item" href="javascript:void(0)">{{
                criteria.displayName
              }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="grid-options d-sm-inline-block d-none">
        <ul class="d-flex">
          <li class="two-grid" :class="cardsLayout == 2 ? 'active' : ''">
            <a href="javascript:void(0)" @click.prevent="changeCardLayout(2)">
              <img src="/svg/grid-2.svg" class="img-fluid" alt="" />
            </a>
          </li>
          <li class="three-grid d-md-inline-block d-none" :class="cardsLayout == 3 ? 'active' : ''">
            <a href="javascript:void(0)" @click.prevent="changeCardLayout(3)">
              <img src="/svg/grid-3.svg" class="img-fluid" alt="" />
            </a>
          </li>
          <li class="grid-btn d-lg-inline-block d-none" :class="cardsLayout == 4 ? 'active' : ''">
            <a href="javascript:void(0)" @click.prevent="changeCardLayout(4)">
              <img src="/svg/grid.svg" class="img-fluid" alt="" />
            </a>
          </li>

          <li class="list-btn" :class="cardsLayout == 6 ? 'active' : ''">
            <a href="javascript:void(0)" @click.prevent="changeCardLayout(6)">
              <img src="/svg/list.svg" class="img-fluid" alt="" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { usefilterStore } from '~~/store/filters';
export default {
  props: ["setCardsLayout"],
  data() {
    return {
      selectedSortingCriteria: "default",
      cardsLayout: 4,
      productsPerPage: [12, 24, 50],
    };
  },
  computed: {
    sortingCriterias() {
      return usefilterStore().sortingCriterias
    }
  },
  watch: {
    selectedSortingCriteria: function () {
      usefilterStore().setsSortingCriteria(this.selectedSortingCriteria)
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, sortBy: this.selectedSortingCriteria },
      });
    },
  },
  methods: {
    changeCardLayout(layout) {
      this.cardsLayout = layout;
      this.$emit("changeCardLayout", this.cardsLayout);
    },
    changeProductsPerPage(event) {
      this.$emit("changeProductsPerPage", event.target.value);
    },
  },
  mounted() {
    if (this.setCardsLayout != undefined)
      this.cardsLayout = this.setCardsLayout;
  },
};
</script>