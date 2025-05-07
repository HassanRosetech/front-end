<template>
  <div class="tree-item">
    <span class="tree-label">PS4</span>
    <button @click="toggleCollapse('PS4')" class="tree-toggle">
      {{ collapsed["PS4"] ? "+" : "-" }}
    </button>
  </div>

  <ul v-show="!collapsed['PS4']" class="subcategory1 tree-children">
    <li>
      <NuxtLink to="/shop/shop_left_sidebar/PlayStation">Kablar</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/shop/shop_left_sidebar/PlayStation"
        >Laddningsstationer</NuxtLink
      >
    </li>
    <li>
      <NuxtLink
        v-show="!collapsed['Skydd och Grepp']"
        to="/shop/shop_left_sidebar/PlayStation"
        >Skydd och Grepp</NuxtLink
      >
      <div class="tree-item">
        <span class="tree-label" v-show="collapsed['Skydd och Grepp']"
          >Skydd och Grepp</span
        >
        <button @click="toggleCollapse('Skydd och Grepp')" class="tree-toggle">
          {{ collapsed["Skydd och Grepp"] ? "+" : "-" }}
        </button>

        <ul
          v-show="!collapsed['Skydd och Grepp']"
          class="subcategory1 tree-children"
        >
          <li>
            <NuxtLink to="/shop/shop_left_sidebar/PlayStation"
              >Spak grepp</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/shop/shop_left_sidebar/PlayStation"
              >Silikon hölje Kit</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/shop/shop_left_sidebar/PlayStation"
              >Handkontrollgrepp</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/shop/shop_left_sidebar/PlayStation"
              >Hel set</NuxtLink
            >
          </li>
        </ul>
      </div>
    </li>
    <li>
      <NuxtLink
        v-show="!collapsed['Väskor och fodral']"
        to="/shop/shop_left_sidebar/PlayStation"
        >Väskor och fodral</NuxtLink
      >
      <div class="tree-item">
        <span class="tree-label" v-show="collapsed['Väskor och fodral']"
          >Väskor och fodral</span
        >
        <button
          @click="toggleCollapse('Väskor och fodral')"
          class="tree-toggle"
        >
          {{ collapsed["Väskor och fodral"] ? "+" : "-" }}
        </button>

        <ul
          v-show="!collapsed['Väskor och fodral']"
          class="subcategory1 tree-children"
        >
          <li>
            <NuxtLink to="/shop/shop_left_sidebar/PlayStation"
              >Handkontroll</NuxtLink
            >
          </li>
        </ul>
      </div>
    </li>
    <li>
      <NuxtLink
        v-show="!collapsed['Franchise-produkter']"
        to="/shop/shop_left_sidebar/PlayStation"
        >Franchise-produkter</NuxtLink
      >

      <div class="tree-item">
        <span class="tree-label" v-show="collapsed['Franchise-produkter']"
          >Franchise-produkter</span
        >
        <button
          @click="toggleCollapse('Franchise-produkter')"
          class="tree-toggle"
        >
          {{ collapsed["Franchise-produkter"] ? "+" : "-" }}
        </button>

        <ul
          v-show="!collapsed['Franchise-produkter']"
          class="subcategory1 tree-children"
        >
          <li>
            <NuxtLink to="/shop/shop_left_sidebar/PlayStation"
              >DC Batman</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/shop/shop_left_sidebar/PlayStation"
              >Dragon Ball</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/shop/shop_left_sidebar/PlayStation"
              >One Piece</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/shop/shop_left_sidebar/PlayStation"
              >Resident Evil</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/shop/shop_left_sidebar/PlayStation"
              >Tanooki</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/shop/shop_left_sidebar/PlayStation"
              >Captain Tsubasa</NuxtLink
            >
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { ref } from "vue";

const collapsed = ref({
  PS4: true,
  "Skydd och Grepp": true,
  "Väskor och fodral": true,
  "Franchise-produkter": true,

  //   PS5: true,
  //   "PS4 + PS5": true,
  // Add more keys as needed
});
import { mapState } from "pinia";
import { useCategoryMenuStore } from "~~/store/categoryMenu";
export default {
  setup() {
    //const collapsed = ref({});

    const toggleCollapse = (key) => {
      collapsed.value[key] = !collapsed.value[key];
    };

    return {
      collapsed,
      toggleCollapse,
    };
  },
  computed: {
    ...mapState(useCategoryMenuStore, {
      categoryList: "data",
    }),
  },
};

//Collapse ul

const isCollapsed = ref(true);
</script>
<style scoped>
.subcategory1 {
  padding-left: 1rem;

  /* transition: max-height 0.3s ease-out;
  overflow: hidden; */
}
.tree-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin: 4px 0;
}

.tree-toggle {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  width: 24px;
  text-align: center;
  padding: 0;
  line-height: 1;
}

.tree-label {
  font-weight: 600;
  color: #333;
}

.tree-children {
  padding-left: 1.5rem; /* Indent children */
  margin-top: 4px;
}

.PS4,
.PS5,
.Grepp {
  display: none;
}
</style>
