<template>
  <div class="row g-4">
    <!-- filter button -->
    <div class="filter-button">
      <button class="danger-button danger-center btn btn-sm filter-btn">
        <i data-feather="align-left"></i> {{ useRuntimeConfig().public.const.Filter }}
      </button>
    </div>
    <!-- filter button -->

    <!-- label and featured section -->
    <div class="col-md-12">
      <ul class="short-name">
        <li>
          <div class="label-tag">
            <span>Shirts</span>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
        </li>
        <li>
          <div class="label-tag">
            <span>Kurtas</span>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
        </li>
        <li>
          <div class="label-tag">
            <span>Jackets</span>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
        </li>
        <li>
          <div class="label-tag">
            <span>Blazers</span>
            <button type="button" class="btn-close" aria-label="Close"></button>
          </div>
        </li>
        <li>
          <div class="label-tag">
            <a href="javascript:void(0)"><span>Clear All</span></a>
          </div>
        </li>
      </ul>
    </div>

    <div class="col-12">
      <div class="filter-options">
        <div class="select-options">
          <div class="page-view-filter">
            <div class="dropdown select-featured">
              <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">24 Page
                per view</button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">Alphabetically A-Z</a>
                </li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">Alphabetically Z-A</a>
                </li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">Price, High To Low</a>
                </li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">Price, Low To High</a>
                </li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">Date, Old To New</a>
                </li>
                <li>
                  <a class="dropdown-item" href="javascript:void(0)">Date, New To Old</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="dropdown select-featured">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
              aria-expanded="false">
              Select Featured
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item" href="javascript:void(0)">Jeans</a>
              </li>
              <li>
                <a class="dropdown-item" href="javascript:void(0)">T-Shirt</a>
              </li>
              <li>
                <a class="dropdown-item" href="javascript:void(0)">Shirt</a>
              </li>
              <li>
                <a class="dropdown-item" href="javascript:void(0)">Jacket</a>
              </li>
              <li>
                <a class="dropdown-item" href="javascript:void(0)">Hoodie</a>
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
            <li class="five-grid d-xl-inline-block d-none" :class="cardsLayout == 5 ? 'active' : ''">
              <a href="javascript:void(0)" @click.prevent="changeCardLayout(5)">
                <img src="/svg/grid-5.svg" class="img-fluid" alt="" />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardsLayout: 4,
    };
  },
  methods: {
    changeCardLayout(layout) {
      this.cardsLayout = layout;
      this.$emit("changeCardLayout", this.cardsLayout);
    },
  },
};
</script>

<style lang="scss" scoped></style>
