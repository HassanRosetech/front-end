import { createI18n } from "vue-i18n";
import en from "../static/data/en.json";
// import fr from "../static/data/fr.json";
// import es from "../static/data/es.json";
import se from "../static/data/se.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,

    locale: "se",
    messages: {
      se: se.data,
      en: en.data,
      // fr: fr.data,
      // es: es.data,
    },
  });

  vueApp.use(i18n);
});
