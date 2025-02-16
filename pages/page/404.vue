<template>
  <Head>
    <Title>404 Page</Title>
  </Head>
  <layout5 pageName="404" parent="404">
    <section class="page-not-found section-b-space">
      <div class="container">
        <div class="row gx-md-2 gx-0 gy-md-0 gy-3">
          <div class="col-md-8 m-auto">
            <div class="page-image">
              <img :src="getImageUrl('/inner-page/404.png')" class="img-fluid" alt="" />
            </div>
          </div>

          <div class="col-md-8 mx-auto mt-md-5 mt-3">
            <div class="page-container pass-forgot">
              <div>
                <h2>{{ useRuntimeConfig().public.const.pagenotfound }}</h2>
                <p>
                  {{ useRuntimeConfig().public.const.pagedescription }}
                </p>
                <nuxt-link to="/home/fashion_demo" class="btn btn-solid-default">{{
                  useRuntimeConfig().public.const.BackHomePage
                }}</nuxt-link>
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
export default {
  components: {
    layout5,
  },
  head() {
    return {
      title: "404",
    };
  },
};
</script>
