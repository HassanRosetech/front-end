<<<<<<< HEAD
import { createI18n } from 'vue-i18n'
import en from "../static/data/en.json";
import fr from "../static/data/fr.json";
import es from "../static/data/es.json";

=======
import { createI18n } from "vue-i18n";
import en from "../static/data/en.json";
// import fr from "../static/data/fr.json";
// import es from "../static/data/es.json";
import se from "../static/data/se.json";
>>>>>>> b9947588 (Languages Menu Modifications)

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
<<<<<<< HEAD
    locale: 'en',
    messages: {
      en:en.data,
      fr:fr.data,
      es:es.data
    }
  })

  vueApp.use(i18n)
})
=======
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
>>>>>>> b9947588 (Languages Menu Modifications)
