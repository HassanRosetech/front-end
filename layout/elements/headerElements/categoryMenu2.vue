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
                            :class="`${link.title}`.replace(/[()]/g, '')"
                            :to="`/${link.path}`"
                            >{{ link.title }}</NuxtLink
                          >

                          <div v-if="link.title === 'PS4'">
                            <GamingPS4></GamingPS4>
                          </div>

                          <div v-if="link.title === 'PS5'">
                            <GamingPS5></GamingPS5>
                          </div>

                          <div v-if="link.title === 'PS4 + PS5'">
                            <GamingPS4Ps5></GamingPS4Ps5>
                          </div>

                          <div v-if="link.title === 'XSeries'">
                            <GamingXseries></GamingXseries>
                          </div>

                          <div v-if="link.title === 'XSeries + XOne'">
                            <GamingXseriesXone></GamingXseriesXone>
                          </div>

                          <div v-if="link.title === 'Switch (Original)'">
                            <GamingSwitchOriginal></GamingSwitchOriginal>
                          </div>
                          <div v-if="link.title === 'Switch (Lite)'">
                            <GamingSwitchLite></GamingSwitchLite>
                          </div>
                          <div v-if="link.title === 'Switch (Oled)'">
                            <GamingSwitchOled></GamingSwitchOled>
                          </div>
                          <div v-if="link.title === 'Switch (Original + Oled)'">
                            <GamingSwitchOriginalOled></GamingSwitchOriginalOled>
                          </div>
                          <div v-if="link.title === 'Switch (All models)'">
                            <GamingSwitchAllModels></GamingSwitchAllModels>
                          </div>
                          <div v-if="link.title === 'PC'">
                            <GamingPC></GamingPC>
                          </div>
                          <div v-if="link.title === 'ALL Consoles'">
                            <GamingAudioLjud></GamingAudioLjud>
                          </div>
                          <div v-if="link.title === 'ALL Consoles '">
                            <GamingAllconsoles1></GamingAllconsoles1>
                          </div>
                          <div v-if="link.title === 'Nintendo Switch & PC '">
                            <GamingNintendoSwitch></GamingNintendoSwitch>
                          </div>
                          <div v-if="link.title === ' PC '">
                            <GamingPC1></GamingPC1>
                          </div>

                          <div v-if="link.title === 'Väskor och fodral'">
                            <GamingVaskorochfodral></GamingVaskorochfodral>
                          </div>
                          <div
                            v-if="link.title === 'Taggar (för filterfunktion)'"
                          >
                            <GamingTaggarforfilterfunktion></GamingTaggarforfilterfunktion>
                          </div>
                          <!-- Scooter Section -->
                          <div v-if="link.title === 'Transportväska'">
                            <ScooterTransport></ScooterTransport>
                          </div>

                          <div v-if="link.title === 'Muttrar & skruvar'">
                            <ScooterMuttrarskruvar></ScooterMuttrarskruvar>
                          </div>

                          <div v-if="link.title === 'Dekoration & Reflexer'">
                            <ScooterDekorationReflexer></ScooterDekorationReflexer>
                          </div>

                          <div v-if="link.title === 'Bakskydd / kåpor'">
                            <ScooterBakskyddkapor></ScooterBakskyddkapor>
                          </div>
                          <div v-if="link.title === 'Framskydd / kåpor'">
                            <ScooterFramskyddkapor></ScooterFramskyddkapor>
                          </div>
                          <div v-if="link.title === 'Skyddstillbehör'">
                            <ScooterSkyddstillbehor></ScooterSkyddstillbehor>
                          </div>

                          <div v-if="link.title === 'Belysning'">
                            <ScooterBelysning></ScooterBelysning>
                          </div>
                          <div v-if="link.title === 'Displaymoduler (Styre)'">
                            <ScooterDisplaymodulerStyre></ScooterDisplaymodulerStyre>
                          </div>
                          <div
                            v-if="
                              link.title === 'Kablage & Kontakter (Mittsektion)'
                            "
                          >
                            <ScooterKablageKontakterESC></ScooterKablageKontakterESC>
                          </div>
                          <div
                            v-if="
                              link.title === 'Moderkort / ESC (Mittsektion)'
                            "
                          >
                            <ScooterModerkortESC></ScooterModerkortESC>
                          </div>

                          <div v-if="link.title === 'Bromsvajrar'">
                            <ScooterBromsvajrar></ScooterBromsvajrar>
                          </div>
                          <div v-if="link.title === 'Bromsok'">
                            <ScooterBromsok></ScooterBromsok>
                          </div>
                          <div v-if="link.title === 'Bromsskivor'">
                            <ScooterBromsskivor></ScooterBromsskivor>
                          </div>
                          <div v-if="link.title === 'Bromsbelägg'">
                            <ScooterBromsbelagg></ScooterBromsbelagg>
                          </div>

                          <div v-if="link.title === 'Framdel'">
                            <ScooterFramdel></ScooterFramdel>
                          </div>
                          <div v-if="link.title === 'Mittsektion'">
                            <ScooterMittsektion></ScooterMittsektion>
                          </div>
                          <div v-if="link.title === 'Bakdel'">
                            <ScooterBakdel></ScooterBakdel>
                          </div>
                          <div v-if="link.title === 'Laddare'">
                            <ScooterLaddare></ScooterLaddare>
                          </div>
                          <div v-if="link.title === 'Batteripaket'">
                            <ScooterBatteripaket></ScooterBatteripaket>
                          </div>

                          <div v-if="link.title === 'Solida Däck'">
                            <ScooterSolidaDack></ScooterSolidaDack>
                          </div>
                          <div v-if="link.title === 'Luftdäck'">
                            <ScooterLuftdack></ScooterLuftdack>
                          </div>
                          <div v-if="link.title === 'Innerslangar'">
                            <ScooterInnerslangar></ScooterInnerslangar>
                          </div>
                          <div v-if="link.title === 'Däcktillbehör'">
                            <ScooterDacktillbehor></ScooterDacktillbehor>
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
.PS4,
.PS5,
.Grepp,
.XSeries,
.XOne,
.Lite,
.Original,
.Oled,
.models,
.PC,
.Ljud,
.Consoles,
.fodral,
.filterfunktion,
.Transportväska,
.skruvar,
.Reflexer,
.kåpor,
.Skyddstillbehör,
.Belysning,
.Styre,
.Mittsektion,
.Bromsvajrar,
.Bromsok,
.Bromsskivor,
.Bromsbelägg,
.Framdel,
.Bakdel,
.Laddare,
.Batteripaket,
.Däck,
.Luftdäck,
.Innerslangar,
.Däcktillbehör {
  display: none;
}
</style>
