<template>
  <div class="tree-item">
    <span class="tree-label">Switch (Original + Oled)</span>
    <button
      @click="toggleCollapse('Switch (Original + Oled)')"
      class="tree-toggle"
    >
      {{ collapsed["Switch (Original + Oled)"] ? "+" : "-" }}
    </button>
  </div>

  <ul
    v-show="!collapsed['Switch (Original + Oled)']"
    class="subcategory1 tree-children"
  >
    <li>
      <NuxtLink v-show="!collapsed['Skydd och Grepp']" to="#"
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
            <NuxtLink to="#">Hel set</NuxtLink>
          </li>
          <li>
            <NuxtLink to="#">Handkontrollgrepp</NuxtLink>
          </li>
        </ul>
      </div>
    </li>
    <li>
      <NuxtLink to="#">Kontroller</NuxtLink>
    </li>
    <li>
      <NuxtLink v-show="!collapsed['Franchise-produkter']" to="#"
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
            <NuxtLink to="#">DC Comics</NuxtLink>
          </li>
          <li>
            <NuxtLink to="#">Demon Slayer</NuxtLink>
          </li>
          <li>
            <NuxtLink to="#">Dragon Ball</NuxtLink>
          </li>
          <li>
            <NuxtLink to="#">WWE</NuxtLink>
          </li>
          <li>
            <NuxtLink to="#">Tanooki</NuxtLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { ref } from "vue";

const collapsed = ref({
  "Switch (Original + Oled)": true,
  "Skydd och Grepp": true,
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
