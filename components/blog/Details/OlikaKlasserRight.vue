<template>
  <div class="col-xl-9 col-lg-8 order-lg-1 ratio_square">
    <div class="row g-4">
      <div class="col-12">
        <div class="blog-details">
          <!-- <div class="blog-image-box">
              <img
                src="/images/inner-page/product/10.jpg"
                alt=""
                class="card-img-top"
              />
              <div class="blog-title">
                <div>
                  <div class="social-media media-center">
                    <a href="https://www.facebook.com/" target="new">
                      <div class="social-icon-box social-color">
                        <i class="fab fa-facebook-f"></i>
                      </div>
                    </a>
                    <a href="https://twitter.com/" target="new">
                      <div class="social-icon-box social-color">
                        <i class="fab fa-twitter"></i>
                      </div>
                    </a>
                    <a href="https://in.pinterest.com/" target="new">
                      <div class="social-icon-box social-color">
                        <i class="fab fa-pinterest-p"></i>
                      </div>
                    </a>
                  </div>
                </div>
              </div> 
            </div>-->
          <div class="blog-detail-contain">
            <span class="font-light">June 04 2024</span>
            <h2 class="card-title">Olika Klasser av Elsparkcyklar</h2>
            <p class="font-light first-latter">
              Elsparkcyklar delas in i olika klasser baserat på deras
              motoreffekt och hastighet. Här är de huvudsakliga klasserna:
              Cykelklass Elsparkcyklar: En elsparkcykel klassas som en cykel om
              den inte går fortare än 20 km/h och har en kontinuerlig märkeffekt
              på högst 250 watt1. Regler för cykelklass elsparkcyklar:
              Elsparkcyklar i denna klass ska köras på samma sätt som andra
              cyklar. Det innebär att du kan köra på cykelvägar och i viss
              utsträckning även på bilvägar. Elsparkcykeln måste ha bromsar och
              en ringklocka (det finns inga krav på hur klockan ska se ut eller
              låta). Vid mörkerkörning ska elsparkcykeln ha fram- och baklyse
              samt vara utrustad med reflexer. Om du är yngre än 15 år krävs
              hjälm, men vi rekommenderar att alla som cyklar använder ett
              huvudskydd.
              <br />

              Mopedklass II Elsparkcyklar: Om elsparkcykeln går snabbare än 20
              km/h eller har en högre kontinuerlig märkeffekt än 250 watt,
              klassas den inte längre som en cykel. Då kan den istället klassas
              som en moped med andra krav och förutsättningar för att få
              användas i trafik1. Regler för mopedklass II elsparkcyklar:
              Mopedklass II elsparkcyklar får ha en motoreffekt på max 1000 watt
              och en konstruerad hastighet upp till 25 km/h2.

              <br />

              Övriga Fall: Om elsparkcykeln är snabbare eller starkare än en
              cykel men inte uppfyller kraven som ställs på en moped, kan den
              inte klassas som vare sig cykel eller moped. Då får fordonet inte
              köras på allmän väg utan endast inom ett inhägnat område3.
              Sammanfattningsvis är det viktigt att känna till vilken klass din
              elsparkcykel tillhör och följa de gällande reglerna. Ha en trevlig
              och säker körning! 🛴
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useBlogDataStore } from "~~/store/blogData";
export default {
  computed: {
    blogData() {
      return useBlogDataStore().data;
    },
  },
};
</script>
