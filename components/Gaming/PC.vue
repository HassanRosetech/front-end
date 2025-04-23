<template>
  <div class="tree-item">
    <span class="tree-label">PC</span>
    <button @click="toggleCollapse('PC')" class="tree-toggle">
      {{ collapsed["PC"] ? "+" : "-" }}
    </button>
  </div>

  <ul v-show="!collapsed['PC']" class="subcategory1 tree-children">
    <li><NuxtLink to="#">Tangentbord</NuxtLink></li>
    <li><NuxtLink to="#">Mus</NuxtLink></li>
    <li><NuxtLink to="#">Musmatta</NuxtLink></li>
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
            <NuxtLink to="#">Spak grepp</NuxtLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { ref } from "vue";

const collapsed = ref({
  PC: true,

  "Skydd och Grepp": true,

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
