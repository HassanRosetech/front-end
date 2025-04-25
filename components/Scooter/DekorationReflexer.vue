<template>
  <div class="tree-item">
    <span class="tree-label">Dekoration & Reflexer</span>
    <button
      @click="toggleCollapse('Dekoration & Reflexer')"
      class="tree-toggle"
    >
      {{ collapsed["Dekoration & Reflexer"] ? "+" : "-" }}
    </button>
  </div>

  <ul
    v-show="!collapsed['Dekoration & Reflexer']"
    class="subcategory1 tree-children"
  >
    <li><NuxtLink to="#">Färg: Röd, Orange, Vit, Grön, Blå, Gul</NuxtLink></li>
  </ul>
</template>

<script>
import { ref } from "vue";

const collapsed = ref({
  "Dekoration & Reflexer": true,

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
