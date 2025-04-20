<template>
  <div class="menu-left">
    <div class="category-menu">
      <button
        type="button"
        class="btn btn-solid-default toggle-category d-sm-block d-none"
      >
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
          <li
            v-for="(items, index) in categoryList"
            :key="index"
            :class="items.children ? 'submenu' : ''"
          >
            <a href="javascript:void(0)">{{ items.title }} </a>
            <ul class="category-mega-menu" v-if="items.children">
              <li>
                <div class="row">
                  <div
                    class="col-xl-3"
                    :class="`${items.title}`"
                    v-for="(item, index) in items.children"
                    :key="index"
                  >
                    <div class="category-childmenu">
                      <div class="title-category">
                        <h6>{{ item.heading }}</h6>
                      </div>
                      <ul>
                        <li v-for="(link, index) in item.items" :key="index">
                          <NuxtLink
                            :class="`${link.title}`"
                            :to="`/${link.path}`"
                            >{{ link.title }}</NuxtLink
                          >

                          <div v-if="link.title === 'PS4'">
                            <div class="tree-item">
                              <span class="tree-label">PS4</span>
                              <button
                                @click="toggleCollapse('PS4')"
                                class="tree-toggle"
                              >
                                {{ collapsed["PS4"] ? "+" : "-" }}
                              </button>
                            </div>

                            <ul
                              v-show="!collapsed['PS4']"
                              class="subcategory1 tree-children"
                            >
                              <li><NuxtLink to="#">Kablar</NuxtLink></li>
                              <li>
                                <NuxtLink to="#">Laddningsstationer</NuxtLink>
                              </li>
                              <li>
                                <NuxtLink
                                  v-show="!collapsed['Skydd och Grepp']"
                                  to="#"
                                  >Skydd och Grepp</NuxtLink
                                >
                                <div class="tree-item">
                                  <span
                                    class="tree-label"
                                    v-show="collapsed['Skydd och Grepp']"
                                    >Skydd och Grepp</span
                                  >
                                  <button
                                    @click="toggleCollapse('Skydd och Grepp')"
                                    class="tree-toggle"
                                  >
                                    {{
                                      collapsed["Skydd och Grepp"] ? "+" : "-"
                                    }}
                                  </button>

                                  <ul
                                    v-show="!collapsed['Skydd och Grepp']"
                                    class="subcategory1 tree-children"
                                  >
                                    <li>
                                      <NuxtLink to="#">Spak grepp</NuxtLink>
                                    </li>
                                    <li>
                                      <NuxtLink to="#"
                                        >Silikon hölje Kit</NuxtLink
                                      >
                                    </li>
                                    <li>
                                      <NuxtLink to="#"
                                        >Handkontrollgrepp</NuxtLink
                                      >
                                    </li>
                                    <li><NuxtLink to="#">Hel set</NuxtLink></li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <NuxtLink
                                  v-show="!collapsed['Väskor och fodral']"
                                  to="#"
                                  >Väskor och fodral</NuxtLink
                                >
                                <div class="tree-item">
                                  <span
                                    class="tree-label"
                                    v-show="collapsed['Väskor och fodral']"
                                    >Väskor och fodral</span
                                  >
                                  <button
                                    @click="toggleCollapse('Väskor och fodral')"
                                    class="tree-toggle"
                                  >
                                    {{
                                      collapsed["Väskor och fodral"] ? "+" : "-"
                                    }}
                                  </button>

                                  <ul
                                    v-show="!collapsed['Väskor och fodral']"
                                    class="subcategory1 tree-children"
                                  >
                                    <li>
                                      <NuxtLink to="#">Handkontroll</NuxtLink>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <NuxtLink
                                  v-show="!collapsed['Franchise-produkter']"
                                  to="#"
                                  >Franchise-produkter</NuxtLink
                                >

                                <div class="tree-item">
                                  <span
                                    class="tree-label"
                                    v-show="collapsed['Franchise-produkter']"
                                    >Franchise-produkter</span
                                  >
                                  <button
                                    @click="
                                      toggleCollapse('Franchise-produkter')
                                    "
                                    class="tree-toggle"
                                  >
                                    {{
                                      collapsed["Franchise-produkter"]
                                        ? "+"
                                        : "-"
                                    }}
                                  </button>

                                  <ul
                                    v-show="!collapsed['Franchise-produkter']"
                                    class="subcategory1 tree-children"
                                  >
                                    <li>
                                      <NuxtLink to="#">DC Batman</NuxtLink>
                                    </li>
                                    <li>
                                      <NuxtLink to="#">Dragon Ball</NuxtLink>
                                    </li>
                                    <li>
                                      <NuxtLink to="#">One Piece</NuxtLink>
                                    </li>
                                    <li>
                                      <NuxtLink to="#">Resident Evil</NuxtLink>
                                    </li>
                                    <li>
                                      <NuxtLink to="#">Tanooki</NuxtLink>
                                    </li>
                                    <li>
                                      <NuxtLink to="#"
                                        >Captain Tsubasa</NuxtLink
                                      >
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </div>

                          <div v-if="link.title === 'PS5'">
                            <div class="tree-item">
                              <span class="tree-label">PS5</span>
                              <button
                                @click="toggleCollapse('PS5')"
                                class="tree-toggle"
                              >
                                {{ collapsed["PS5"] ? "+" : "-" }}
                              </button>
                            </div>

                            <ul
                              v-show="!collapsed['PS5']"
                              class="subcategory1 tree-children"
                            >
                              <li><NuxtLink to="#">Kablar</NuxtLink></li>
                              <li>
                                <NuxtLink to="#">Laddningsstationer</NuxtLink>
                              </li>
                              <li>
                                <NuxtLink
                                  v-show="!collapsed['Skydd och Grepp']"
                                  to="#"
                                  >Skydd och Grepp</NuxtLink
                                >
                                <div class="tree-item">
                                  <span
                                    class="tree-label"
                                    v-show="collapsed['Skydd och Grepp']"
                                    >Skydd och Grepp</span
                                  >
                                  <button
                                    @click="toggleCollapse('Skydd och Grepp')"
                                    class="tree-toggle"
                                  >
                                    {{
                                      collapsed["Skydd och Grepp"] ? "+" : "-"
                                    }}
                                  </button>

                                  <ul
                                    v-show="!collapsed['Skydd och Grepp']"
                                    class="subcategory1 tree-children"
                                  >
                                    <li>
                                      <NuxtLink to="#">Spak grepp</NuxtLink>
                                    </li>

                                    <li><NuxtLink to="#">Hel set</NuxtLink></li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <NuxtLink
                                  v-show="!collapsed['Väskor och fodral']"
                                  to="#"
                                  >Väskor och fodral</NuxtLink
                                >
                                <div class="tree-item">
                                  <span
                                    class="tree-label"
                                    v-show="collapsed['Väskor och fodral']"
                                    >Väskor och fodral</span
                                  >
                                  <button
                                    @click="toggleCollapse('Väskor och fodral')"
                                    class="tree-toggle"
                                  >
                                    {{
                                      collapsed["Väskor och fodral"] ? "+" : "-"
                                    }}
                                  </button>

                                  <ul
                                    v-show="!collapsed['Väskor och fodral']"
                                    class="subcategory1 tree-children"
                                  >
                                    <li>
                                      <NuxtLink to="#">Handkontroll</NuxtLink>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <NuxtLink
                                  v-show="!collapsed['Franchise-produkter']"
                                  to="#"
                                  >Franchise-produkter</NuxtLink
                                >

                                <div class="tree-item">
                                  <span
                                    class="tree-label"
                                    v-show="collapsed['Franchise-produkter']"
                                    >Franchise-produkter</span
                                  >
                                  <button
                                    @click="
                                      toggleCollapse('Franchise-produkter')
                                    "
                                    class="tree-toggle"
                                  >
                                    {{
                                      collapsed["Franchise-produkter"]
                                        ? "+"
                                        : "-"
                                    }}
                                  </button>

                                  <ul
                                    v-show="!collapsed['Franchise-produkter']"
                                    class="subcategory1 tree-children"
                                  >
                                    <li>
                                      <NuxtLink to="#">DC Batman</NuxtLink>
                                    </li>
                                    <li>
                                      <NuxtLink to="#">Dragon Ball</NuxtLink>
                                    </li>
                                    <li>
                                      <NuxtLink to="#">One Piece</NuxtLink>
                                    </li>
                                    <li>
                                      <NuxtLink to="#">Demon Slayer</NuxtLink>
                                    </li>
                                    <li>
                                      <NuxtLink to="#">Flash</NuxtLink>
                                    </li>
                                    <li>
                                      <NuxtLink to="#">Tanooki</NuxtLink>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </div>

                          <div v-if="link.title === 'PS4 + PS5'">
                            <div class="tree-item">
                              <span class="tree-label">PS4 + PS5</span>
                              <button
                                @click="toggleCollapse('PS4 + PS5')"
                                class="tree-toggle"
                              >
                                {{ collapsed["PS4 + PS5"] ? "+" : "-" }}
                              </button>
                            </div>

                            <ul
                              v-show="!collapsed['PS4 + PS5']"
                              class="subcategory1 tree-children"
                            >
                              <li>
                                <NuxtLink
                                  v-show="!collapsed['Skydd och Grepp']"
                                  to="#"
                                  >Skydd och Grepp</NuxtLink
                                >

                                <div class="tree-item">
                                  <span
                                    class="tree-label"
                                    v-show="collapsed['Skydd och Grepp']"
                                    >Skydd och Grepp</span
                                  >
                                  <button
                                    @click="toggleCollapse('Skydd och Grepp')"
                                    class="tree-toggle"
                                  >
                                    {{
                                      collapsed["Skydd och Grepp"] ? "+" : "-"
                                    }}
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
                              <li>
                                <NuxtLink
                                  v-show="!collapsed['Väskor och fodral']"
                                  to="#"
                                  >Väskor och fodral</NuxtLink
                                >

                                <div class="tree-item">
                                  <span
                                    class="tree-label"
                                    v-show="collapsed['Väskor och fodral']"
                                    >Väskor och fodral</span
                                  >
                                  <button
                                    @click="toggleCollapse('Väskor och fodral')"
                                    class="tree-toggle"
                                  >
                                    {{
                                      collapsed["Väskor och fodral"] ? "+" : "-"
                                    }}
                                  </button>

                                  <ul
                                    v-show="!collapsed['Väskor och fodral']"
                                    class="subcategory1 tree-children"
                                  >
                                    <li>
                                      <NuxtLink to="#">Handkontroll</NuxtLink>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <NuxtLink to="#">Kablar</NuxtLink>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="col-xl-3" v-if="items.bannerImage">
                    <div class="category-banner">
                      <img
                        :src="getImageUrl(items.bannerImage)"
                        class="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

const collapsed = ref({
  PS4: true,
  "Skydd och Grepp": true,
  "Väskor och fodral": true,
  "Franchise-produkter": true,

  PS5: true,
  "PS4 + PS5": true,
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
