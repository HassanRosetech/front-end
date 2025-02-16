<template>
  <div class="theme-setting">
    <ul v-if="showThemeSettings">
      <li>
        <button id="darkButton" class="btn btn-sm p-0 dark-buttton" data-bs-toggle="modal" data-bs-target="#copySettings">
          Copy
        </button>
      </li>
      <li>
        <button id="darkButton" class="btn btn-sm p-0 dark-buttton" @click.prevent="createStyle">
          Dark
        </button>
      </li>
      <li>
        <button class="btn btn-sm p-0 rtl-button" @click.prevent="toggleLayout">
          <span v-if="layoutType === 'rtl'">{{ useRuntimeConfig().public.const.LTR }}</span>
          <span v-else>{{ useRuntimeConfig().public.const.RTL }}</span>
        </button>
      </li>
      <li class="color-picker">
        <input :value="primaryColor" @change="setLayoutValue" type="color" id="ColorPicker1" title="Choose your color" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useLayout } from "~~/store/layout";
import {
  useClickStore
} from "~~/store/clickEvents";
export default {
  props: ["showDarkButton"],
  data() {
    return {
      themeMode: "",
    };
  },
  computed: {
    ...mapState(useLayout, {
      themeSettings: 'themeConfig',
      primaryColor: 'primaryColor',
      layoutType: 'layoutType',
      layoutMode:'layoutMode',
      showThemeSettings:'showThemeSettings',
    }),
  },
  watch: {
    primaryColor: function () {
      document.body.style.setProperty("--theme-color", this.primaryColor);
    },
    layoutMode(){
      if(this.layoutMode=='dark'){
        document.documentElement.classList.add('dark')
      }else{
        document.documentElement.classList.remove('dark')
      }
      useCookie('colorMode').value = this.layoutMode || ""
    },
    layoutType(){
      if(this.layoutType=='rtl'){
        document.documentElement.dir = "rtl";
          document
            .getElementById("bootstrap-link")
            .setAttribute("href", "/css/bootstrap.rtl.min.css");
          useCookie('layoutType').value = 'rtl'
          document.body.classList.remove("ltr");
          document.body.classList.add("rtl");
      }else{
        document.documentElement.dir = "ltr";
          document
            .getElementById("bootstrap-link")
            .setAttribute("href", "/css/bootstrap.min.css");
          useCookie('layoutType').value = 'ltr'
          document.body.classList.remove("rtl");
          document.body.classList.add("ltr");
      }
    }
  },
  methods: {
    toggleLayout() {
      useLayout().setLayoutType(this.layoutType == 'ltr' ? 'rtl' : 'ltr')
    },
    createStyle() {
      useLayout().toggleLayoutMode();
    },
    setLayoutValue(event) {
      useLayout().setPrimaryColor({ primaryColor: event.target.value })
    },
    toggleCopySettings() {
      useClickStore().toggleCopySettings();
    },
  },
};

</script>
