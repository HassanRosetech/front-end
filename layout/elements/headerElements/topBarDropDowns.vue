<template>
  <div class="col-auto">
    <ul class="border-list">
      <li v-for="(key, index) in dropdownKeys" :key="index">
        <div class="dropdown top-header-dropdown" ref="dropdowns">
<<<<<<< HEAD
          <a class="dropdown-toggle" @click.prevent="toggleDropdown(key)" href="javascript:void(0)" role="button"
            id="dropdownMenuLink" data-bs-toggle="dropdown">
=======
          <a
            class="dropdown-toggle"
            @click.prevent="toggleDropdown(key)"
            href="javascript:void(0)"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
          >
>>>>>>> b9947588 (Languages Menu Modifications)
            <span>{{
              selectedDropdowns[key] == ""
                ? dropdowns[key].title
                : selectedDropdowns[key]
            }}</span>
            <i class="fas fa-chevron-down"></i>
          </a>
<<<<<<< HEAD
          <ul class="dropdown-menu dropdown-menu-end" :class="[{ show: dropdowns[key].active }]"
            aria-labelledby="dropdownMenuLink">
            <li class="w-100" v-for="(link, index) in dropdowns[key].links" :key="'a' + index">
              <a href="javascript:void(0)" class="dropdown-item" @click.prevent="handleDropdown(key, link.code)"
                v-if="link.name">{{ link.name }}</a>
              <a v-else href="javascript:void(0)" class="dropdown-item" @click.prevent="handleDropdown(key, link)">{{
                link
              }}</a>
=======
          <ul
            class="dropdown-menu dropdown-menu-end"
            :class="[{ show: dropdowns[key].active }]"
            aria-labelledby="dropdownMenuLink"
          >
            <li
              class="w-100"
              v-for="(link, index) in dropdowns[key].links"
              :key="'a' + index"
            >
              <a
                href="javascript:void(0)"
                class="dropdown-item"
                @click.prevent="handleDropdown(key, link.code)"
                v-if="link.name"
                >{{ link.name }}</a
              >
              <a
                v-else
                href="javascript:void(0)"
                class="dropdown-item"
                @click.prevent="handleDropdown(key, link)"
                >{{ link }}</a
              >
>>>>>>> b9947588 (Languages Menu Modifications)
            </li>
          </ul>
        </div>
      </li>

      <li>
        <div class="dropdown top-header-dropdown" ref="dropdowns">
<<<<<<< HEAD
          <a class="dropdown-toggle"  href="javascript:void(0)" role="button"
            id="dropdownMenuLink" data-bs-toggle="dropdown">
            <span>{{"Language" }}</span>
            <i class="fas fa-chevron-down"></i>
          </a>
          <select id="locale-select" class="dropdown-menu dropdown-menu-end" v-model="$i18n.locale">
          <option   class="dropdown-item" value="en">English</option> 
          <option  class="dropdown-item" value="fr">French</option> 
          <option  class="dropdown-item" value="es">Spanish</option> 
=======
          <a
            class="dropdown-toggle"
            href="javascript:void(0)"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
          >
            <span>{{ "Language" }}</span>
            <i class="fas fa-chevron-down"></i>
          </a>
          <select
            id="locale-select"
            class="dropdown-menu dropdown-menu-end"
            v-model="$i18n.locale"
          >
            <option class="dropdown-item" value="se">Swedish</option>
            <option class="dropdown-item" value="en">English</option>
            <!-- <option class="dropdown-item" value="fr">French</option>
            <option class="dropdown-item" value="es">Spanish</option> -->
>>>>>>> b9947588 (Languages Menu Modifications)
          </select>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useLayout } from "~~/store/layout";
import { useProductStore } from "~~/store/products";
<<<<<<< HEAD
import {lang} from "~~/static/data/langname.json"
export default {
  data() {
    return {
      abcd : ["English", "Spanish", "Frrench"],
=======
import { lang } from "~~/static/data/langname.json";
export default {
  data() {
    return {
      abcd: ["English", "Spanish", "Frrench"],
>>>>>>> b9947588 (Languages Menu Modifications)
      selectedDropdowns: {
        loginAndRegister: "",
        currency: "",
        languages: "",
      },
      dropdowns: {
        loginAndRegister: {
          title: "Login & Register",
          active: false,
          links: ["login", "register"],
        },
        currency: {
          title: "Currency",
          active: false,
          links: ["Dollar", "Rupee", "Euro"],
        },
      },
      dropdownKeys: [],
    };
  },
  computed: {
    ...mapState(useLayout, {
<<<<<<< HEAD
      currencyList: 'currencyList',
      currencyConversionMultiple: 'currencyConversion',
    }), 
  },
  watch: {
    selectedDropdowns: {
      handler: function () {
      },
=======
      currencyList: "currencyList",
      currencyConversionMultiple: "currencyConversion",
    }),
  },
  watch: {
    selectedDropdowns: {
      handler: function () {},
>>>>>>> b9947588 (Languages Menu Modifications)
      deep: true,
    },
  },
  methods: {
    toggleDropdown(key) {
      this.dropdowns[key].active = !this.dropdowns[key].active;
    },
    handleDropdown(key, link) {
      this.dropdowns[key].active = false;
      this.selectedDropdowns[key] = link;
      this.$i18n.locale = link;
      if (key === "currency") {
<<<<<<< HEAD
        useLayout().setCurrency({ currency: link })
      }
      useProductStore().currencyChanged()
=======
        useLayout().setCurrency({ currency: link });
      }
      useProductStore().currencyChanged();
>>>>>>> b9947588 (Languages Menu Modifications)
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.dropdowns["loginAndRegister"].active = false;
        this.dropdowns["currency"].active = false;
      }
    },
  },
  created() {
    this.dropdownKeys = Object.keys(this.dropdowns);
    this.dropdowns.currency.links = [];
    this.currencyList.forEach((item) => {
      this.dropdowns.currency.links.push(item.currency);
    });
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
};
</script>

<<<<<<< HEAD
<style>

</style>
=======
<style></style>
>>>>>>> b9947588 (Languages Menu Modifications)
