<template>
  <Head>
    <Title>FAQ</Title>
  </Head>
  <layout5 pageName="FAQ" parent="FAQ" :breadcrumb="false">
    <template v-slot:breadcrumb>
      <breadcrumb2 />
    </template>
    <PageFaqTop />

    <section class="faq-details section-b-space">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="faq-link-box">
              <ul>
                <li v-for="(question, index) in faqList.children" :key="index">
                  <a :href="'#' + question.id" >
                    <h4>{{ index + 1 }}</h4>
                    <h5>{{ question.question }}</h5>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-7 col-md-8">
            <div class="faq-heading" :id="faq.id" v-for="(faq) in faqList.children" :key="faq.id">
              <vue-feather type="help-circle" class="theme-color"></vue-feather>
              <div class="faq-option">
                <h3>{{ faq.question }}</h3>
                <h6 class="font-light">
                  {{ faq.answer }}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </layout5>
</template>

<script>
import layout5 from "~/layout/layouts/layout5.vue";
import breadcrumb2 from "~/layout/elements/breadcrumbs/breadcrumb2.vue";
import VueFeather from "vue-feather";
import { useInfoStore } from "~~/store/information";
export default {
  components: {
    layout5,
    breadcrumb2,
    VueFeather,
  },
  head() {
    return {
      title: "FAQ",
    };
  },
  computed: {
    faqList() {
      return useInfoStore().data.filter(
        (item) => item.type === "faqQuestions"
      )[0]
    },
  },
};
</script>